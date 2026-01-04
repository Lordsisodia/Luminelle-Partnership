#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import time
import urllib.request
from urllib.error import HTTPError
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


@dataclass(frozen=True)
class UrlSpec:
    url: str
    label: str


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"^https?://", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "snapshot"


def parse_line(line: str) -> UrlSpec | None:
    raw = line.strip()
    if not raw or raw.startswith("#"):
        return None
    parts = raw.split()
    url = parts[0].strip()
    label = " ".join(parts[1:]).strip() if len(parts) > 1 else ""
    if not url.startswith(("http://", "https://")):
        return None
    return UrlSpec(url=url, label=label)


def fetch(url: str, user_agent: str, timeout: int) -> bytes:
    class Redirect308(urllib.request.HTTPRedirectHandler):
        # Some sites return 308 (Permanent Redirect). urllib may not follow by default in all versions.
        def http_error_308(self, req, fp, code, msg, headers):  # type: ignore[override]
            return self.http_error_302(req, fp, code, msg, headers)

    opener = urllib.request.build_opener(Redirect308)
    headers = {
        "User-Agent": user_agent,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with opener.open(req, timeout=timeout) as resp:
            return resp.read()
    except HTTPError as e:
        # Return body when available (sometimes useful even on non-200).
        try:
            return e.read()
        except Exception:  # noqa: BLE001
            raise


def main() -> int:
    ap = argparse.ArgumentParser(description="Snapshot URLs into raw HTML files (for durable research artifacts).")
    ap.add_argument("--input", required=True, help="Text file: one URL per line (optional label after URL).")
    ap.add_argument("--out-dir", required=True, help="Directory to write snapshots into.")
    ap.add_argument("--sleep-ms", type=int, default=800, help="Delay between requests.")
    ap.add_argument("--timeout", type=int, default=25, help="HTTP timeout seconds.")
    ap.add_argument("--max-bytes", type=int, default=2_000_000, help="Max bytes per snapshot file.")
    ap.add_argument(
        "--stable-names",
        action="store_true",
        help="Write stable filenames like <slug>.html instead of <timestamp>__<slug>.html (prevents unbounded growth).",
    )
    ap.add_argument("--offset", type=int, default=0, help="Skip the first N URLs (for batching/resume).")
    ap.add_argument("--limit", type=int, default=0, help="Only process up to N URLs (0 = no limit).")
    ap.add_argument("--skip-existing", action="store_true", help="Skip URLs already snapshot in out-dir for this run.")
    args = ap.parse_args()

    in_path = Path(args.input)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    specs: list[UrlSpec] = []
    for line in in_path.read_text("utf-8", errors="replace").splitlines():
        spec = parse_line(line)
        if spec:
            specs.append(spec)

    if not specs:
        raise SystemExit("No URLs found in input file.")

    ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36 lumelle-docs-blackbox-snapshot"
    ts = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")

    if args.offset:
        specs = specs[args.offset :]
    if args.limit and args.limit > 0:
        specs = specs[: args.limit]

    existing = set()
    if args.skip_existing and out_dir.exists():
        for p in out_dir.glob("*.html"):
            existing.add(p.name)

    ok = 0
    for spec in specs:
        slug = safe_slug(spec.label or spec.url)
        path = out_dir / (f"{slug}.html" if args.stable_names else f"{ts}__{slug}.html")
        if args.skip_existing and path.name in existing:
            continue
        try:
            body = fetch(spec.url, user_agent=ua, timeout=args.timeout)
        except Exception as e:  # noqa: BLE001
            print(f"WARN: failed {spec.url}: {e}")
            continue

        if len(body) > args.max_bytes:
            body = body[: args.max_bytes] + b"\n<!-- truncated -->\n"
        path.write_bytes(body)
        ok += 1
        time.sleep(args.sleep_ms / 1000.0)

    print(f"Saved {ok} snapshots to {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
