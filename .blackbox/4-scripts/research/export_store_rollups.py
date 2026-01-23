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


def fnum(s: str) -> float | None:
    s = (s or "").strip()
    if not s:
        return None
    try:
        return float(s)
    except ValueError:
        return None


def avg(vals: list[float]) -> float | None:
    if not vals:
        return None
    return sum(vals) / len(vals)


def main() -> int:
    ap = argparse.ArgumentParser(description="Export store-level rollups from a desktop+mobile scorecard.")
    ap.add_argument("--in-csv", required=True, help="Scorecard CSV with device rows.")
    ap.add_argument("--out-csv", required=True, help="Write store rollups CSV here.")
    args = ap.parse_args()

    in_csv = Path(args.in_csv)
    out_csv = Path(args.out_csv)

    rows: list[dict[str, str]] = []
    with in_csv.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            rows.append(row)

    grouped: dict[str, list[dict[str, str]]] = {}
    for row in rows:
        store = (row.get("store") or "").strip()
        if not store:
            continue
        grouped.setdefault(store, []).append(row)

    out_rows: list[dict[str, str]] = []
    for store, rs in sorted(grouped.items(), key=lambda x: x[0].lower()):
        url = (rs[0].get("url") or "").strip()
        niche = (rs[0].get("niche") or "").strip()
        archetype = (rs[0].get("archetype") or "").strip()
        devices = ", ".join(sorted({(r.get("device") or "").strip() for r in rs if (r.get("device") or "").strip()}))
        blocked_any = any((r.get("blocked") or "").strip().lower() == "yes" for r in rs)
        evidence_any = any((r.get("evidence_links") or "").strip() for r in rs)

        # average each component across available device scores
        comp_avgs: dict[str, float | None] = {}
        for f in SCORE_FIELDS:
            vals: list[float] = []
            for r in rs:
                v = fnum(r.get(f, ""))
                if v is not None:
                    vals.append(v)
            comp_avgs[f] = avg(vals)

        # weighted score only when all components have averages
        weighted = None
        if all(comp_avgs[f] is not None for f in SCORE_FIELDS):
            w = {
                "discovery_score": 0.15,
                "pdp_confidence_score": 0.35,
                "cart_score": 0.15,
                "checkout_score": 0.20,
                "post_purchase_returns_score": 0.15,
            }
            weighted = sum((comp_avgs[k] or 0.0) * w[k] for k in SCORE_FIELDS)

        out_rows.append(
            {
                "store": store,
                "url": url,
                "niche": niche,
                "archetype": archetype,
                "devices": devices,
                "blocked_any": "yes" if blocked_any else "no",
                "evidence_any": "yes" if evidence_any else "no",
                "discovery_avg": "" if comp_avgs["discovery_score"] is None else f"{comp_avgs['discovery_score']:.2f}",
                "pdp_confidence_avg": "" if comp_avgs["pdp_confidence_score"] is None else f"{comp_avgs['pdp_confidence_score']:.2f}",
                "cart_avg": "" if comp_avgs["cart_score"] is None else f"{comp_avgs['cart_score']:.2f}",
                "checkout_avg": "" if comp_avgs["checkout_score"] is None else f"{comp_avgs['checkout_score']:.2f}",
                "post_purchase_returns_avg": ""
                if comp_avgs["post_purchase_returns_score"] is None
                else f"{comp_avgs['post_purchase_returns_score']:.2f}",
                "weighted_avg": "" if weighted is None else f"{weighted:.2f}",
            }
        )

    out_csv.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "store",
        "url",
        "niche",
        "archetype",
        "devices",
        "blocked_any",
        "evidence_any",
        "discovery_avg",
        "pdp_confidence_avg",
        "cart_avg",
        "checkout_avg",
        "post_purchase_returns_avg",
        "weighted_avg",
    ]
    with out_csv.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in out_rows:
            w.writerow(r)

    print(f"Wrote: {out_csv}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

