#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path


def split_list(s: str) -> list[str]:
    return [p.strip() for p in (s or "").split(",") if p.strip()]


def safe_inline(s: str) -> str:
    return (s or "").replace("|", " / ").strip()


def evidence_path(row: dict[str, str]) -> str:
    return (row.get("snapshot_path") or "").strip() or (row.get("url") or "").strip()


def sort_rows_for_examples(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    def key(r: dict[str, str]) -> tuple[int, str]:
        blocked = 1 if (r.get("blocked") or "").strip() else 0
        return (blocked, (r.get("store") or "").strip().lower())

    return sorted(rows, key=key)


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Generate a women’s fashion feature adoption matrix (tooling + UX cues) from the enriched 100-store dataset."
    )
    ap.add_argument("--input-csv", required=True, help="womens-fashion-stores-100.enriched.csv")
    ap.add_argument("--out-md", required=True, help="Write markdown here.")
    ap.add_argument("--examples", type=int, default=6, help="Examples per vendor/feature.")
    args = ap.parse_args()

    input_csv = Path(args.input_csv)
    out_md = Path(args.out_md)

    with input_csv.open("r", encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    now = datetime.now(timezone.utc)
    now_stamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    today = now.strftime("%Y-%m-%d")

    vendor_categories = [
        ("bnpl", "BNPL (Pay-over-time)"),
        ("reviews", "Reviews / Social proof tooling"),
        ("returns", "Returns / Post-purchase tooling"),
        ("search_personalization", "Search / Personalization / Upsell tooling"),
        ("support", "Support tooling"),
        ("subscriptions", "Subscriptions tooling"),
        ("tracking", "Tracking pixels / analytics"),
        ("platform", "Platform (heuristic)"),
    ]

    ux_keyword_categories = [
        ("free_shipping", "Free shipping messaging"),
        ("returns_exchanges", "Returns/exchanges messaging"),
        ("size_fit", "Size/fit guidance cues"),
        ("store_locator", "Store locator / retail presence cues"),
        ("gift_cards", "Gift cards"),
        ("newsletter_signup", "Newsletter signup"),
        ("loyalty_rewards", "Loyalty / rewards cues"),
        ("sustainability", "Sustainability messaging cues"),
    ]

    lines: list[str] = []
    lines.append("---")
    lines.append("status: draft")
    lines.append(f"last_reviewed: {today}")
    lines.append("owner: growth")
    lines.append("---")
    lines.append("")
    lines.append("# Women’s Fashion — Feature Adoption Matrix (from snapshot signals)")
    lines.append("")
    lines.append("This is a feature/tooling adoption scan across the 100-store women’s fashion benchmark.")
    lines.append("All detections are from saved HTML snapshots (no JS execution).")
    lines.append("")
    lines.append("Evidence sources:")
    lines.append("- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.enriched.csv`")
    lines.append("- `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/reports/store-snapshots-summary.csv`")
    lines.append("")
    lines.append("Generated at:")
    lines.append(f"- `{now_stamp}`")
    lines.append("")

    total = len([r for r in rows if (r.get("store") or "").strip()])
    blocked = sum(1 for r in rows if (r.get("blocked") or "").strip())
    lines.append("## Coverage")
    lines.append("")
    lines.append(f"- Stores in dataset: {total}")
    lines.append(f"- Blocked/bot-protected snapshot detected: {blocked}")
    lines.append("")

    lines.append("## Tooling + vendor signals")
    lines.append("")

    for key, title in vendor_categories:
        vendor_map: dict[str, list[dict[str, str]]] = defaultdict(list)
        for r in rows:
            for v in split_list(r.get(key, "")):
                vendor_map[v].append(r)

        if not vendor_map:
            continue

        counts = Counter({v: len(vendor_map[v]) for v in vendor_map})
        lines.append(f"### {title}")
        lines.append("")
        lines.append("| vendor / signal | count | example stores (evidence) |")
        lines.append("|---|---:|---|")

        for vendor, count in counts.most_common():
            example_rows = sort_rows_for_examples(vendor_map[vendor])[: args.examples]
            examples: list[str] = []
            for er in example_rows:
                examples.append(f"{safe_inline(er.get('store',''))} — `{evidence_path(er)}`")
            lines.append(f"| {vendor} | {count} | " + "<br>".join(examples) + " |")

        lines.append("")

    lines.append("## UX cues (keyword-only, non-vendor)")
    lines.append("")
    lines.append("These are keyword cues detected in the saved HTML; they are noisier than tooling detection.")
    lines.append("")
    lines.append("| UX cue | count | example stores (evidence) |")
    lines.append("|---|---:|---|")

    ux_rows: dict[str, list[dict[str, str]]] = {k: [] for k, _ in ux_keyword_categories}
    for r in rows:
        ux = set(split_list(r.get("ux_keywords", "")))
        for k, _ in ux_keyword_categories:
            if k in ux:
                ux_rows[k].append(r)

    for k, label in ux_keyword_categories:
        example_rows = sort_rows_for_examples(ux_rows[k])[: args.examples]
        examples = [f"{safe_inline(er.get('store',''))} — `{evidence_path(er)}`" for er in example_rows]
        lines.append(f"| {label} (`{k}`) | {len(ux_rows[k])} | " + "<br>".join(examples) + " |")

    lines.append("")
    lines.append("## How to use this")
    lines.append("")
    lines.append("- Treat this as a prioritization/triage layer (what shows up at scale).")
    lines.append("- Convert high-impact items into screenshot-proof patterns via manual funnel audits (PDP/cart/checkout).")
    lines.append("- For per-store qualitative notes, use:")
    lines.append("  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.csv`")
    lines.append("  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.enriched.csv`")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

