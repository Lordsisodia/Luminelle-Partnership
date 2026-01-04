#!/usr/bin/env python3
from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class StoreEvidence:
    store_slug: str
    files: list[str]


def main() -> int:
    ap = argparse.ArgumentParser(description="Inventory screenshot files under a plan evidence directory.")
    ap.add_argument("--evidence-dir", required=True, help="Directory containing per-store evidence folders.")
    ap.add_argument("--out-md", required=True, help="Write markdown inventory here.")
    ap.add_argument("--extensions", default="png,jpg,jpeg,webp", help="Comma-separated image extensions to include.")
    args = ap.parse_args()

    evidence_dir = Path(args.evidence_dir)
    out_md = Path(args.out_md)
    exts = {("." + e.strip().lower().lstrip(".")) for e in args.extensions.split(",") if e.strip()}

    if not evidence_dir.exists():
        raise SystemExit(f"Not found: {evidence_dir}")

    stores: list[StoreEvidence] = []
    for d in sorted([p for p in evidence_dir.iterdir() if p.is_dir()]):
        files = []
        for f in sorted(d.rglob("*")):
            if not f.is_file():
                continue
            if f.suffix.lower() in exts:
                files.append(str(f.relative_to(evidence_dir)))
        stores.append(StoreEvidence(store_slug=d.name, files=files))

    lines: list[str] = []
    lines.append("# Evidence Inventory")
    lines.append("")
    lines.append(f"Source: `{evidence_dir}`")
    lines.append("")
    lines.append("| store | files | example |")
    lines.append("|---|---:|---|")
    for s in stores:
        example = s.files[0] if s.files else ""
        lines.append(f"| {s.store_slug} | {len(s.files)} | {example} |")

    lines.append("")
    lines.append("## Details")
    for s in stores:
        lines.append(f"### {s.store_slug}")
        lines.append("")
        if not s.files:
            lines.append("- (no files)")
        else:
            for f in s.files[:50]:
                lines.append(f"- {f}")
            if len(s.files) > 50:
                lines.append(f"- … ({len(s.files) - 50} more)")
        lines.append("")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

