#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


def slugify(name: str) -> str:
    s = (name or "").strip().lower()
    s = re.sub(r"&", " and ", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "store"


def parse_shortlist_md(md: str) -> list[str]:
    names: list[str] = []
    in_table = False
    for line in md.splitlines():
        if line.strip().startswith("| store |"):
            in_table = True
            continue
        if in_table and line.strip().startswith("|---"):
            continue
        if in_table:
            if not line.strip().startswith("|"):
                break
            parts = [p.strip() for p in line.strip().strip("|").split("|")]
            if len(parts) < 1:
                continue
            store = parts[0]
            if store:
                names.append(store)
    return names


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate a store→slug mapping from a shortlist markdown table.")
    ap.add_argument("--shortlist-md", required=True, help="shortlist-15.md containing a store table")
    ap.add_argument("--out-json", required=True, help="Write mapping JSON here")
    args = ap.parse_args()

    shortlist = Path(args.shortlist_md)
    out_json = Path(args.out_json)

    stores = parse_shortlist_md(shortlist.read_text("utf-8", errors="replace"))
    mapping: dict[str, str] = {}
    for s in stores:
        mapping[s] = slugify(s)

    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps(mapping, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Wrote: {out_json}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

