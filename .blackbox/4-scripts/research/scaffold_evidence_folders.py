#!/usr/bin/env python3
from __future__ import annotations

import argparse
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
            if not parts:
                continue
            store = parts[0]
            if store:
                names.append(store)
    return names


def main() -> int:
    ap = argparse.ArgumentParser(description="Scaffold evidence folders per store in a plan artifacts directory.")
    ap.add_argument("--shortlist-md", required=True, help="shortlist markdown containing store table.")
    ap.add_argument("--evidence-dir", required=True, help="Base evidence directory to create per-store folders in.")
    ap.add_argument("--touch-readme", action="store_true", help="Create a README.md in each store evidence folder.")
    args = ap.parse_args()

    shortlist_path = Path(args.shortlist_md)
    evidence_dir = Path(args.evidence_dir)
    evidence_dir.mkdir(parents=True, exist_ok=True)

    stores = parse_shortlist_md(shortlist_path.read_text("utf-8", errors="replace"))
    created = 0
    for store in stores:
        slug = slugify(store)
        d = evidence_dir / slug
        d.mkdir(parents=True, exist_ok=True)
        created += 1
        if args.touch_readme:
            (d / "README.md").write_text(
                f"# Evidence — {store}\n\nPut screenshots here and link them from the audit doc + pattern cards.\n",
                encoding="utf-8",
            )

    print(f"Created/ensured {created} evidence folders in {evidence_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

