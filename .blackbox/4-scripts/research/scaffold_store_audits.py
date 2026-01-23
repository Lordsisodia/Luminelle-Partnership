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


def parse_shortlist_md(md: str) -> list[tuple[str, str, str, str]]:
    # Very small parser: reads the markdown table from shortlist-15.md and returns rows.
    rows: list[tuple[str, str, str, str]] = []
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
            if len(parts) < 4:
                continue
            store, niche, archetype, url = parts[:4]
            if store and url.startswith("http"):
                rows.append((store, url, niche, archetype))
    return rows


def apply_template(template: str, store: str, url: str, niche: str, archetype: str) -> str:
    # Minimal substitution: keep the template structure but prefill store metadata.
    lines = template.splitlines()
    out: list[str] = []
    for line in lines:
        if line.startswith("- Name:"):
            out.append(f"- Name: {store}")
            continue
        if line.startswith("- URL:"):
            out.append(f"- URL: {url}")
            continue
        if line.startswith("- Niche:"):
            out.append(f"- Niche: {niche}")
            continue
        if line.startswith("- Archetype:"):
            # Store archetype values are already (DTC / Marketplace / Legacy retail etc.)
            out.append(f"- Archetype: {archetype}")
            continue
        out.append(line)
    return "\n".join(out).rstrip() + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(description="Scaffold per-store manual audit docs from the shortlist.")
    ap.add_argument("--shortlist-md", required=True, help="shortlist markdown containing a table.")
    ap.add_argument("--template", required=True, help="Audit template markdown file.")
    ap.add_argument("--out-dir", required=True, help="Directory to write per-store audit md files.")
    ap.add_argument("--overwrite", action="store_true", help="Overwrite existing files.")
    args = ap.parse_args()

    shortlist_path = Path(args.shortlist_md)
    template_path = Path(args.template)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    rows = parse_shortlist_md(shortlist_path.read_text("utf-8", errors="replace"))
    template = template_path.read_text("utf-8", errors="replace")

    written = 0
    skipped = 0
    for store, url, niche, archetype in rows:
        out_path = out_dir / f"{slugify(store)}.md"
        if out_path.exists() and not args.overwrite:
            skipped += 1
            continue
        out_path.write_text(apply_template(template, store, url, niche, archetype), encoding="utf-8")
        written += 1

    print(f"Scaffolded audits: written={written} skipped={skipped} out_dir={out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

