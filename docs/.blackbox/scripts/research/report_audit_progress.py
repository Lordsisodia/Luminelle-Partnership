#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from pathlib import Path


SCORE_FIELDS = [
    "discovery_score",
    "pdp_confidence_score",
    "cart_score",
    "checkout_score",
    "post_purchase_returns_score",
]


def filled_scores(row: dict[str, str]) -> tuple[int, int]:
    filled = 0
    for f in SCORE_FIELDS:
        if (row.get(f) or "").strip():
            filled += 1
    return filled, len(SCORE_FIELDS)


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate a markdown progress report for funnel audit scorecards.")
    ap.add_argument("--in-csv", required=True, help="scorecard.csv")
    ap.add_argument("--out-md", required=True, help="Write progress markdown here.")
    ap.add_argument("--group-by-store", action="store_true", help="Summarize progress per store (combines devices).")
    args = ap.parse_args()

    in_csv = Path(args.in_csv)
    out_md = Path(args.out_md)

    rows: list[dict[str, str]] = []
    with in_csv.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            rows.append(row)

    total = len(rows)
    fully_scored = 0
    any_scored = 0
    missing_evidence = 0
    lines: list[str] = []

    lines.append("# Funnel Audit Progress")
    lines.append("")
    lines.append(f"Scorecard: `{in_csv}`")
    lines.append("")

    for row in rows:
        filled, denom = filled_scores(row)
        if filled > 0:
            any_scored += 1
        if filled == denom:
            fully_scored += 1
            if not (row.get("evidence_links") or "").strip():
                missing_evidence += 1

    lines.append("## Summary")
    lines.append(f"- total rows: {total}")
    lines.append(f"- rows with any scores: {any_scored}")
    lines.append(f"- fully scored rows (all 5 components): {fully_scored}")
    lines.append(f"- fully scored but missing evidence_links: {missing_evidence}")
    lines.append("")

    lines.append("## By store")
    if args.group_by_store:
        lines.append("| store | devices | rows | scores filled | evidence_links | blocked | next |")
        lines.append("|---|---|---:|---:|---|---|---|")
        grouped: dict[str, list[dict[str, str]]] = {}
        for row in rows:
            key = (row.get("store") or "").strip()
            if not key:
                continue
            grouped.setdefault(key, []).append(row)
        for store_name, rs in grouped.items():
            devices = ", ".join(sorted({(r.get("device") or "?").strip() for r in rs}))
            total_scores = sum(filled_scores(r)[0] for r in rs)
            total_possible = len(rs) * len(SCORE_FIELDS)
            any_evidence = any((r.get("evidence_links") or "").strip() for r in rs)
            any_blocked = any((r.get("blocked") or "").strip().lower() == "yes" for r in rs)
            # Next step heuristic:
            if total_scores == 0:
                nxt = "run audit"
            elif total_scores < total_possible:
                nxt = "finish scoring"
            elif not any_evidence:
                nxt = "add evidence links"
            else:
                nxt = "ready for ranking"
            lines.append(
                f"| {store_name.replace('|',' / ')} | {devices} | {len(rs)} | {total_scores}/{total_possible} | {'yes' if any_evidence else 'no'} | {'yes' if any_blocked else 'no'} | {nxt} |"
            )
    else:
        lines.append("| store | device | scores filled | evidence_links | next |")
        lines.append("|---|---|---:|---|---|")
        for row in rows:
            store = (row.get("store") or "").replace("|", " / ")
            device = (row.get("device") or "").strip() or "?"
            filled, denom = filled_scores(row)
            evidence = "yes" if (row.get("evidence_links") or "").strip() else "no"
            if filled == 0:
                nxt = "run audit"
            elif filled < denom:
                nxt = "finish scoring"
            elif evidence == "no":
                nxt = "add evidence links"
            else:
                nxt = "ready for ranking"
            lines.append(f"| {store} | {device} | {filled}/{denom} | {evidence} | {nxt} |")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
