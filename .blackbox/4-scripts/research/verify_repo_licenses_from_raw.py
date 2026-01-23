#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


COMMON_LICENSE_FILES = [
    "LICENSE",
    "LICENSE.md",
    "LICENSE.txt",
    "LICENSE.rst",
    "COPYING",
    "COPYING.txt",
]


@dataclass(frozen=True)
class Result:
    full_name: str
    branch: str
    raw_url: str
    spdx_guess: str
    notes: str


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "entry"


def guess_spdx_from_text(text: str) -> tuple[str, str]:
    t = (text or "").upper()
    if not t:
        return "UNKNOWN", "empty license text"

    if "BUSINESS SOURCE LICENSE" in t and "1.1" in t:
        return "BUSL-1.1", "Business Source License detected (not open source)"
    if "SUSTAINABLE USE LICENSE" in t:
        return "SUL-1.0", "Sustainable Use License detected (not open source)"
    if "ELASTIC LICENSE 2.0" in t or "ELV2" in t:
        return "ELv2", "Elastic License 2.0 detected (not open source)"

    if "GNU AFFERO GENERAL PUBLIC LICENSE" in t:
        return "AGPL-3.0", "AGPL detected from license text"
    if "GNU LESSER GENERAL PUBLIC LICENSE" in t and "VERSION 3" in t:
        return "LGPL-3.0", "LGPLv3 detected from license text"
    if "GNU GENERAL PUBLIC LICENSE" in t and "VERSION 3" in t:
        return "GPL-3.0", "GPLv3 detected from license text"
    if "GPLV3" in t or "GPL V3" in t:
        return "GPL-3.0", "GPLv3 mentioned in license text"

    if "APACHE LICENSE" in t and "VERSION 2.0" in t:
        return "Apache-2.0", "Apache 2.0 detected from license text"
    if "PERMISSION IS HEREBY GRANTED, FREE OF CHARGE" in t and "THE SOFTWARE IS PROVIDED \"AS IS\"" in t:
        return "MIT", "MIT-style detected from license text"
    if "REDISTRIBUTION AND USE IN SOURCE AND BINARY FORMS" in t and "BSD" in t:
        return "BSD-3-Clause", "BSD-style detected from license text (verify clause count)"

    if "PROPRIETARY SOFTWARE LICENSE" in t or "APPROVAL REQUIRED" in t:
        return "PROPRIETARY", "proprietary/commercial restrictions detected"

    # Common dual-license phrasing (still unknown, but flag)
    if "COMMERCIAL LICENSE" in t and ("GPL" in t or "AGPL" in t):
        return "UNKNOWN", "dual-license language detected (treat as copyleft unless commercial terms)"

    return "UNKNOWN", "could not confidently classify from text"


def http_get_text(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "lumelle-docs-blackbox-research"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


def load_entry_meta(entries_dir: Path, full_name: str) -> dict[str, Any]:
    p = entries_dir / f"{safe_slug(full_name)}.json"
    if not p.exists():
        raise FileNotFoundError(p)
    return json.loads(p.read_text("utf-8"))


def try_fetch_license(full_name: str, branch: str) -> tuple[str, str]:
    last_err = ""
    for fname in COMMON_LICENSE_FILES:
        raw = f"https://raw.githubusercontent.com/{full_name}/{branch}/{fname}"
        try:
            txt = http_get_text(raw)
        except urllib.error.HTTPError as e:
            last_err = f"HTTP {e.code} for {raw}"
            continue
        except Exception as e:  # noqa: BLE001
            last_err = str(e)
            continue
        # If it fetched something tiny that looks like 404 page, still accept but warn
        if "404: Not Found" in txt and len(txt) < 200:
            last_err = f"404 body for {raw}"
            continue
        return raw, txt
    raise RuntimeError(last_err or "no license file found")


def main() -> int:
    ap = argparse.ArgumentParser(description="Verify repo licenses by fetching raw LICENSE files using local metadata (no GitHub API needed).")
    ap.add_argument("--entries-dir", required=True, help="Directory containing *.json GitHub metadata files.")
    ap.add_argument("--repos", required=True, help="Comma-separated owner/repo list (must exist in entries-dir).")
    ap.add_argument("--out-md", required=True, help="Write report here.")
    ap.add_argument("--out-json", required=True, help="Write JSON results here.")
    args = ap.parse_args()

    entries_dir = Path(args.entries_dir)
    repos = [r.strip() for r in args.repos.split(",") if r.strip()]
    if not repos:
        print("No repos provided.", file=sys.stderr)
        return 2

    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    results: list[Result] = []

    for full in repos:
        meta = load_entry_meta(entries_dir, full)
        branch = meta.get("default_branch") or "main"
        try:
            raw_url, txt = try_fetch_license(full, branch)
            spdx, notes = guess_spdx_from_text(txt)
            results.append(Result(full_name=full, branch=branch, raw_url=raw_url, spdx_guess=spdx, notes=notes))
        except Exception as e:  # noqa: BLE001
            results.append(Result(full_name=full, branch=branch, raw_url="", spdx_guess="UNKNOWN", notes=str(e)))

    out_md = Path(args.out_md)
    out_md.parent.mkdir(parents=True, exist_ok=True)
    lines: list[str] = []
    lines.append("# License Verification Report (raw LICENSE fetch; no GitHub API)")
    lines.append("")
    lines.append(f"- Timestamp: {now}")
    lines.append("")
    lines.append("| repo | branch | guess | raw url | notes |")
    lines.append("|---|---|---|---|---|")
    for r in results:
        lines.append(f"| {r.full_name} | {r.branch} | {r.spdx_guess} | {r.raw_url or ''} | {r.notes} |")
    lines.append("")
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")

    out_json = Path(args.out_json)
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps([r.__dict__ for r in results], indent=2), encoding="utf-8")

    print(f"Wrote: {out_md}")
    print(f"Wrote: {out_json}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
