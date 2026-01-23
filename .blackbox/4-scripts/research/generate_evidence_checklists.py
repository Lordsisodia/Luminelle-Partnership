#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path


REQUIRED = {
    # Stage -> list of recommended feature slugs
    "homepage": ["entry-points", "shipping-returns"],
    "plp": ["filters-panel", "product-cards", "quick-add"],
    "pdp": ["fit-module", "fabric-care", "reviews-module", "shipping-returns", "variant-picker"],
    "cart": ["variant-edit", "promo", "shipping-threshold"],
    "checkout": ["express-buttons", "delivery-estimate", "trust-cues"],
}

OPTIONAL_PATTERN_EXTRAS = {
    # These are pattern-specific captures that often exist, but aren't required for baseline coverage.
    # They map directly to pattern cards/backlog items.
    "homepage": ["country-selector"],
    "plp": ["occasion-filters"],
    "pdp": ["fit-quiz", "complete-the-set"],
    "post-purchase": ["returns-portal", "help-center"],
}


def render(store_slug: str, store_name: str, date_token: str) -> str:
    lines: list[str] = []
    lines.append(f"# Evidence Checklist — {store_name}")
    lines.append("")
    lines.append("Naming convention (required for automation):")
    lines.append("`<store>__<device>__<stage>__<feature>__YYYYMMDD.png`")
    lines.append("")
    lines.append("Devices:")
    for device in ["desktop", "mobile"]:
        lines.append(f"## {device}")
        lines.append("")
        for stage, features in REQUIRED.items():
            lines.append(f"### {stage}")
            lines.append("")
            for feature in features:
                fname = f"{store_slug}__{device}__{stage}__{feature}__{date_token}.png"
                lines.append(f"- [ ] `{fname}`")
            lines.append("")

    lines.append("## Optional (pattern capture extras)")
    lines.append("")
    lines.append("Capture these when present; they map to reusable pattern cards/backlog items.")
    lines.append("")
    for device in ["desktop", "mobile"]:
        lines.append(f"### {device}")
        lines.append("")
        for stage, features in OPTIONAL_PATTERN_EXTRAS.items():
            lines.append(f"#### {stage}")
            lines.append("")
            for feature in features:
                fname = f"{store_slug}__{device}__{stage}__{feature}__{date_token}.png"
                lines.append(f"- [ ] `{fname}`")
            lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate per-store evidence CHECKLIST.md files in evidence folders.")
    ap.add_argument("--store-slug-map", required=True, help="Path to store-slug-map.json")
    ap.add_argument("--evidence-dir", required=True, help="Plan evidence directory (contains per-store folders).")
    ap.add_argument("--date-token", default="YYYYMMDD", help="Date token to place in filenames (default: YYYYMMDD).")
    ap.add_argument("--overwrite", action="store_true", help="Overwrite existing CHECKLIST.md files.")
    args = ap.parse_args()

    mapping_path = Path(args.store_slug_map)
    evidence_dir = Path(args.evidence_dir)
    mapping = json.loads(mapping_path.read_text("utf-8", errors="replace"))

    evidence_dir.mkdir(parents=True, exist_ok=True)

    written = 0
    for store_name, slug in mapping.items():
        store_folder = evidence_dir / slug
        store_folder.mkdir(parents=True, exist_ok=True)
        out = store_folder / "CHECKLIST.md"
        if out.exists() and not args.overwrite:
            continue
        out.write_text(render(slug, store_name, args.date_token), encoding="utf-8")
        written += 1

    print(f"Wrote {written} checklist(s) under {evidence_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
