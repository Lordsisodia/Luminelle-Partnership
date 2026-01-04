#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class StoreRow:
    store: str
    url: str
    niche: str
    archetype: str
    what_works: str
    watchouts: str
    features_to_steal: str


def read_rows(path: Path) -> list[StoreRow]:
    rows: list[StoreRow] = []
    with path.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        for d in r:
            rows.append(
                StoreRow(
                    store=(d.get("store") or "").strip(),
                    url=(d.get("url") or "").strip(),
                    niche=(d.get("niche") or "").strip(),
                    archetype=(d.get("archetype") or "").strip(),
                    what_works=(d.get("what_works") or "").strip(),
                    watchouts=(d.get("watchouts") or "").strip(),
                    features_to_steal=(d.get("features_to_steal") or "").strip(),
                )
            )
    return [x for x in rows if x.store and x.url]


def detect_blocked(snapshot_summary_csv: Path) -> set[str]:
    # Uses the automated scan output. If missing, return empty.
    if not snapshot_summary_csv.exists():
        return set()
    blocked: set[str] = set()
    with snapshot_summary_csv.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        for d in r:
            if (d.get("blocked") or "").strip():
                blocked.add((d.get("name") or "").strip())
    return blocked


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate a 15-store shortlist for manual funnel audits.")
    ap.add_argument("--stores-csv", required=True, help="womens-fashion-stores-100.csv")
    ap.add_argument(
        "--snapshot-summary-csv",
        required=False,
        default="",
        help="store-snapshots-summary.csv (optional) to tag blocked sites",
    )
    ap.add_argument("--out-md", required=True, help="Write shortlist markdown here.")
    args = ap.parse_args()

    stores_csv = Path(args.stores_csv)
    out_md = Path(args.out_md)
    snapshot_summary_csv = Path(args.snapshot_summary_csv) if args.snapshot_summary_csv else None

    rows = read_rows(stores_csv)
    by_name = {r.store.lower(): r for r in rows}

    blocked = detect_blocked(snapshot_summary_csv) if snapshot_summary_csv else set()

    # Curated shortlist by archetype for women’s fashion funnel audits.
    # Rationale: cover the main sub-niches where conversion mechanics differ.
    shortlist_names = [
        # Premium DTC womenswear
        "Sezane",
        "Reformation",
        "Doen",
        "Rouje",
        "Ganni",
        # Lingerie / shapewear
        "SKIMS",
        "ThirdLove",
        # Activewear
        "Lululemon",
        "Alo Yoga",
        # Swim
        "Summersalt",
        # Inclusive sizing
        "Universal Standard",
        # Luxury marketplace
        "Mytheresa",
        "SSENSE",
        # Resale / rental
        "thredUP",
        "Rent the Runway",
    ]

    picked: list[StoreRow] = []
    missing: list[str] = []
    for name in shortlist_names:
        r = by_name.get(name.lower())
        if not r:
            missing.append(name)
            continue
        picked.append(r)

    lines: list[str] = []
    lines.append("# Women’s Fashion Manual Audit Shortlist (15)")
    lines.append("")
    lines.append("Use this shortlist for deep manual audits (PDP/cart/checkout).")
    lines.append("")
    lines.append("Rubric:")
    lines.append("- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/manual-funnel-audit-rubric.md`")
    lines.append("")
    lines.append("| store | niche | archetype | url | notes |")
    lines.append("|---|---|---|---|---|")
    for r in picked:
        blocked_tag = " (blocked/bot-protected)" if r.store in blocked else ""
        notes = (r.features_to_steal or r.what_works or "").strip()
        notes = notes.replace("|", " / ")
        lines.append(f"| {r.store} | {r.niche} | {r.archetype} | {r.url} | {notes}{blocked_tag} |")

    if missing:
        lines.append("")
        lines.append("## Missing from source CSV")
        for m in missing:
            lines.append(f"- {m}")

    lines.append("")
    lines.append("## Audit queue (recommended order)")
    lines.append("1) Sezane / Reformation (premium DTC baseline)")
    lines.append("2) SKIMS / ThirdLove (fit-confidence mechanics)")
    lines.append("3) Lululemon / Alo (variant + benefits-led merchandising)")
    lines.append("4) Mytheresa / SSENSE (filters + discovery at scale)")
    lines.append("5) Universal Standard (inclusive sizing UX)")
    lines.append("6) Summersalt (fit/coverage framing)")
    lines.append("7) thredUP / Rent the Runway (repeat-visit loops + returns economics)")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote shortlist: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

