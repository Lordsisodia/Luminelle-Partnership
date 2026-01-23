#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


def split_list(s: str) -> list[str]:
    return [p.strip() for p in (s or "").split(",") if p.strip()]


def safe_inline(s: str) -> str:
    return (s or "").replace("|", " / ").strip()


def segment_for(niche: str) -> str:
    t = (niche or "").lower()
    if "premium dtc" in t and "womenswear" in t:
        return "Premium DTC Womenswear"
    if "contemporary" in t and "womenswear" in t:
        return "Contemporary Womenswear"
    if any(x in t for x in ["shapewear", "lingerie", "intimates"]):
        return "Intimates / Shapewear"
    if any(x in t for x in ["activewear", "athleisure"]):
        return "Activewear / Athleisure"
    if "swim" in t:
        return "Swimwear"
    if "plus-size" in t or "plus size" in t:
        return "Plus-size / Inclusive"
    if "maternity" in t:
        return "Maternity"
    if "resale" in t:
        return "Resale / Secondhand"
    if "rental" in t:
        return "Rental / Subscription"
    if "luxury" in t and "marketplace" in t:
        return "Luxury Marketplace"
    if "department store" in t:
        return "Department Store"
    if "jewelry" in t:
        return "Jewelry"
    if "shoes" in t or "footwear" in t:
        return "Footwear"
    if "accessories" in t or "bags" in t:
        return "Accessories"
    if "marketplace" in t:
        return "Marketplace (Other)"
    if "womenswear" in t or "women" in t:
        return "Womenswear (Other)"
    return "Other"


def score_row(row: dict[str, str]) -> float:
    score = 0.0

    # Reachability / auditability
    if not (row.get("blocked") or "").strip():
        score += 2.0

    # Signals: heuristics from static HTML.
    if (row.get("platform") or "").strip():
        score += 1.0
    if (row.get("tracking") or "").strip():
        score += 1.0
    if (row.get("bnpl") or "").strip():
        score += 2.0
    if (row.get("reviews") or "").strip():
        score += 2.0
    if (row.get("returns") or "").strip():
        score += 2.0
    if (row.get("search_personalization") or "").strip():
        score += 1.0
    if (row.get("support") or "").strip():
        score += 0.5
    if (row.get("subscriptions") or "").strip():
        score += 0.5

    # Keyword-only cues (noisy but useful at scale)
    ux = set(split_list(row.get("ux_keywords", "")))
    if "size_fit" in ux:
        score += 2.0
    if "returns_exchanges" in ux:
        score += 1.0
    if "free_shipping" in ux:
        score += 1.0
    if "loyalty_rewards" in ux:
        score += 0.5
    if "store_locator" in ux:
        score += 0.5

    # Human notes exist
    if (row.get("features_to_steal") or "").strip():
        score += 1.0

    return score


def signal_summary(row: dict[str, str]) -> str:
    parts: list[str] = []
    if (row.get("blocked") or "").strip():
        parts.append("blocked")
    for key, label in [
        ("platform", "platform"),
        ("bnpl", "bnpl"),
        ("reviews", "reviews"),
        ("returns", "returns"),
        ("search_personalization", "search"),
    ]:
        val = (row.get(key) or "").strip()
        if val:
            parts.append(f"{label}: {val}")
    return "; ".join(parts) if parts else "—"


@dataclass(frozen=True)
class Pick:
    store: str
    niche: str
    archetype: str
    url: str
    score: float
    signals: str
    features_to_steal: str
    watchouts: str
    evidence: str


SEGMENT_ORDER = [
    "Premium DTC Womenswear",
    "Contemporary Womenswear",
    "Intimates / Shapewear",
    "Activewear / Athleisure",
    "Swimwear",
    "Luxury Marketplace",
    "Resale / Secondhand",
    "Rental / Subscription",
    "Plus-size / Inclusive",
    "Maternity",
    "Department Store",
    "Jewelry",
    "Footwear",
    "Accessories",
    "Marketplace (Other)",
    "Womenswear (Other)",
    "Other",
]


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Generate a women’s fashion niche playbook (model stores per niche, evidence-linked) from the enriched 100-store matrix."
    )
    ap.add_argument("--input-csv", required=True, help="Enriched CSV (womens-fashion-stores-100.enriched.csv).")
    ap.add_argument("--out-md", required=True, help="Write niche playbook markdown here.")
    ap.add_argument("--out-csv", default="", help="Optional: write top-picks CSV here.")
    ap.add_argument("--top-n", type=int, default=3, help="Top N stores per segment.")
    args = ap.parse_args()

    input_csv = Path(args.input_csv)
    out_md = Path(args.out_md)
    out_csv = Path(args.out_csv) if args.out_csv else None

    with input_csv.open("r", encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    by_segment: dict[str, list[Pick]] = defaultdict(list)
    top_rows_for_csv: list[dict[str, str]] = []

    for r in rows:
        store = (r.get("store") or "").strip()
        url = (r.get("url") or "").strip()
        niche = (r.get("niche") or "").strip()
        archetype = (r.get("archetype") or "").strip()
        if not store or not url:
            continue

        seg = segment_for(niche)
        score = score_row(r)
        evidence = (r.get("snapshot_path") or "").strip() or url
        by_segment[seg].append(
            Pick(
                store=store,
                niche=niche,
                archetype=archetype,
                url=url,
                score=score,
                signals=signal_summary(r),
                features_to_steal=(r.get("features_to_steal") or "").strip(),
                watchouts=(r.get("watchouts") or "").strip(),
                evidence=evidence,
            )
        )

    # Segment ordering (stable)
    def seg_key(s: str) -> tuple[int, str]:
        try:
            idx = SEGMENT_ORDER.index(s)
        except ValueError:
            idx = 999
        return (idx, s.lower())

    # Sort stores within segment by score desc, then name
    for seg in list(by_segment.keys()):
        by_segment[seg] = sorted(by_segment[seg], key=lambda p: (-p.score, p.store.lower()))

    now_utc = datetime.now(timezone.utc)
    now_stamp = now_utc.strftime("%Y-%m-%dT%H:%M:%SZ")
    today = now_utc.strftime("%Y-%m-%d")

    lines: list[str] = []
    lines.append("---")
    lines.append("status: draft")
    lines.append(f"last_reviewed: {today}")
    lines.append("owner: growth")
    lines.append("---")
    lines.append("")
    lines.append("# Women’s Fashion — Niche Playbook (Model Stores + Patterns)")
    lines.append("")
    lines.append("This is a practical breakdown of women’s fashion sub-niches with **model stores** to copy patterns from.")
    lines.append("Built from our 100-store matrix + automated snapshot signal detection (static HTML).")
    lines.append("")
    lines.append("Evidence + data sources:")
    lines.append("- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.enriched.csv`")
    lines.append("- `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/reports/store-snapshots-summary.csv`")
    lines.append("- `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/`")
    lines.append("")
    lines.append("Limitations (important):")
    lines.append("- Snapshot signals are **heuristics** from saved HTML (no JS execution); absence ≠ feature missing.")
    lines.append("- “Blocked” means the saved snapshot looked like bot protection; automation is unreliable for that store.")
    lines.append("")
    lines.append("Scoring heuristic (used only to pick top examples per niche):")
    lines.append("- Higher score = more conversion tooling signals + auditability + stronger notes.")
    lines.append(f"- Generated at: `{now_stamp}`")
    lines.append("")
    lines.append("## Model stores by niche (top picks)")
    lines.append("")

    for seg in sorted(by_segment.keys(), key=seg_key):
        picks = by_segment[seg][: max(1, args.top_n)]
        if not picks:
            continue

        lines.append(f"### {seg}")
        lines.append("")
        lines.append("| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |")
        lines.append("|---|---|---:|---:|---|---|---|---|")

        for p in picks:
            feats = safe_inline(p.features_to_steal)
            watch = safe_inline(p.watchouts)
            if len(feats) > 140:
                feats = feats[:137].rstrip() + "..."
            if len(watch) > 120:
                watch = watch[:117].rstrip() + "..."

            cells = [
                safe_inline(p.store),
                safe_inline(p.niche),
                safe_inline(p.archetype),
                f"{p.score:.1f}",
                safe_inline(p.signals),
                feats or "—",
                watch or "—",
                f"`{p.evidence}`",
            ]
            lines.append("| " + " | ".join(cells) + " |")

            top_rows_for_csv.append(
                {
                    "segment": seg,
                    "store": p.store,
                    "niche": p.niche,
                    "archetype": p.archetype,
                    "url": p.url,
                    "score": f"{p.score:.1f}",
                    "signals": p.signals,
                    "features_to_steal": p.features_to_steal,
                    "watchouts": p.watchouts,
                    "evidence": p.evidence,
                }
            )

        lines.append("")

    lines.append("## Next step (to make this screenshot-proof)")
    lines.append("")
    lines.append("- Run Batch‑01 manual funnel audits (SKIMS / Reformation / Sézane) to capture PDP → cart → checkout evidence:")
    lines.append("  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/DASHBOARD.md`")
    lines.append("  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/womens-fashion-capture-todo-batch-01.md`")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")

    if out_csv:
        out_csv.parent.mkdir(parents=True, exist_ok=True)
        fieldnames = [
            "segment",
            "store",
            "niche",
            "archetype",
            "url",
            "score",
            "signals",
            "features_to_steal",
            "watchouts",
            "evidence",
        ]
        with out_csv.open("w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=fieldnames)
            w.writeheader()
            for r in top_rows_for_csv:
                w.writerow({k: r.get(k, "") for k in fieldnames})
        print(f"Wrote: {out_csv}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
