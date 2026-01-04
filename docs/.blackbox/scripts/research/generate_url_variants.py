#!/usr/bin/env python3
from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urlparse, urlunparse


@dataclass(frozen=True)
class Spec:
    url: str
    label: str


def parse_line(line: str) -> Spec | None:
    raw = line.strip()
    if not raw or raw.startswith("#"):
        return None
    parts = raw.split()
    url = parts[0].strip()
    label = " ".join(parts[1:]).strip() if len(parts) > 1 else url
    if not url.startswith(("http://", "https://")):
        return None
    return Spec(url=url, label=label)


def origin(url: str) -> str:
    p = urlparse(url)
    return urlunparse((p.scheme, p.netloc, "", "", "", ""))


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate common URL variants (pricing/docs/features) from a base url list.")
    ap.add_argument("--input", required=True, help="Input: url + label (one per line).")
    ap.add_argument("--output", required=True, help="Output file path.")
    ap.add_argument("--limit", type=int, default=0, help="Only use first N input URLs (0 = all).")
    args = ap.parse_args()

    in_path = Path(args.input)
    out_path = Path(args.output)

    specs: list[Spec] = []
    for line in in_path.read_text("utf-8", errors="replace").splitlines():
        s = parse_line(line)
        if s:
            specs.append(s)

    if args.limit and args.limit > 0:
        specs = specs[: args.limit]

    variants = [
        ("home", ""),
        ("pricing", "/pricing"),
        ("docs", "/docs"),
        ("features", "/features"),
        ("product", "/product"),
        ("blog", "/blog"),
    ]

    seen: set[str] = set()
    lines: list[str] = []
    for s in specs:
        base = origin(s.url)
        for tag, path in variants:
            u = f"{base}{path}"
            if u in seen:
                continue
            seen.add(u)
            lines.append(f"{u} {s.label} ({tag})")

    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {len(lines)} URL variants -> {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

