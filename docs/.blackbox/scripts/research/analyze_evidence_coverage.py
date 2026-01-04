#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


REQUIRED = {
    # Stage -> required feature prefixes (from filename segment after stage)
    # Files follow: <store>__<device>__<stage>__<feature>__YYYYMMDD.png
    "plp": ["filters"],
    "pdp": ["fit", "fabric", "reviews", "shipping", "returns"],
    "cart": ["variant", "edit", "promo", "shipping"],
    "checkout": ["express", "delivery", "trust"],
}


FILENAME_RE = re.compile(
    r"^(?P<store>[a-z0-9-]+)__(?P<device>desktop|mobile)__(?P<stage>[a-z0-9-]+)__(?P<feature>[a-z0-9-]+)__(?P<date>\d{8})$"
)


@dataclass(frozen=True)
class StoreCoverage:
    store_slug: str
    by_stage: dict[str, set[str]]


def feature_matches(required_prefix: str, feature: str) -> bool:
    f = feature.lower()
    rp = required_prefix.lower()
    return f == rp or f.startswith(rp + "-") or f.startswith(rp + "_") or rp in f


def main() -> int:
    ap = argparse.ArgumentParser(description="Analyze evidence coverage per store using screenshot filenames.")
    ap.add_argument("--evidence-dir", required=True, help="Plan evidence directory (contains per-store folders).")
    ap.add_argument("--out-md", required=True, help="Write markdown coverage report here.")
    ap.add_argument("--extensions", default="png,jpg,jpeg,webp", help="Comma-separated image extensions to include.")
    args = ap.parse_args()

    evidence_dir = Path(args.evidence_dir)
    out_md = Path(args.out_md)
    exts = {("." + e.strip().lower().lstrip(".")) for e in args.extensions.split(",") if e.strip()}

    if not evidence_dir.exists():
        raise SystemExit(f"Not found: {evidence_dir}")

    stores: list[StoreCoverage] = []
    for store_dir in sorted([p for p in evidence_dir.iterdir() if p.is_dir()]):
        by_stage: dict[str, set[str]] = {}
        for f in store_dir.rglob("*"):
            if not f.is_file() or f.suffix.lower() not in exts:
                continue
            m = FILENAME_RE.match(f.stem)
            if not m:
                continue
            stage = m.group("stage")
            feature = m.group("feature")
            by_stage.setdefault(stage, set()).add(feature)
        stores.append(StoreCoverage(store_slug=store_dir.name, by_stage=by_stage))

    lines: list[str] = []
    lines.append("# Evidence Coverage")
    lines.append("")
    lines.append("This report checks whether each store has the minimum recommended screenshots per funnel stage.")
    lines.append("")
    lines.append(f"Source: `{evidence_dir}`")
    lines.append("")

    # Summary table
    lines.append("| store | coverage | missing |")
    lines.append("|---|---:|---|")
    for s in stores:
        missing_bits: list[str] = []
        total_required = 0
        total_hit = 0
        for stage, reqs in REQUIRED.items():
            feats = s.by_stage.get(stage, set())
            for r in reqs:
                total_required += 1
                if any(feature_matches(r, f) for f in feats):
                    total_hit += 1
                else:
                    missing_bits.append(f"{stage}:{r}")
        coverage = f"{total_hit}/{total_required}" if total_required else "0/0"
        lines.append(f"| {s.store_slug} | {coverage} | {', '.join(missing_bits) if missing_bits else ''} |")

    lines.append("")
    lines.append("## Notes")
    lines.append("- Coverage is filename-driven; follow the naming convention for accurate detection.")
    lines.append("- You can exceed the minimum; this is just a baseline to prevent missing key evidence.")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

