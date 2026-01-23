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


def model_score(row: dict[str, str]) -> float:
    score = 0.0

    if not (row.get("blocked") or "").strip():
        score += 2.0

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

    if (row.get("features_to_steal") or "").strip():
        score += 1.0

    return score


def evidence_path(row: dict[str, str]) -> str:
    return (row.get("snapshot_path") or "").strip() or (row.get("url") or "").strip()


@dataclass(frozen=True)
class RankedRow:
    store: str
    niche: str
    archetype: str
    url: str
    segment: str
    score: float
    signals: str
    features_to_steal: str
    watchouts: str
    evidence: str


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Add segment + heuristic model score + signal summary to the women’s fashion store matrix; optionally output a top-N shortlist."
    )
    ap.add_argument("--input-csv", required=True, help="womens-fashion-stores-100.enriched.csv")
    ap.add_argument("--out-scored-csv", required=True, help="Write the full scored CSV here.")
    ap.add_argument("--out-top-md", default="", help="Optional: write a Top-N markdown shortlist here.")
    ap.add_argument("--top-n", type=int, default=25, help="Number of stores to include in the Top-N shortlist.")
    ap.add_argument(
        "--cap-per-segment",
        type=int,
        default=4,
        help="Max stores per segment in Top-N (0 disables cap).",
    )
    ap.add_argument(
        "--exclude-segments",
        default="",
        help="Comma-separated segment names to exclude from the Top-N shortlist (scored CSV is unaffected).",
    )
    args = ap.parse_args()

    input_csv = Path(args.input_csv)
    out_scored_csv = Path(args.out_scored_csv)
    out_top_md = Path(args.out_top_md) if args.out_top_md else None

    with input_csv.open("r", encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    # Write scored CSV (preserve original columns, append new ones)
    scored_rows: list[dict[str, str]] = []
    for r in rows:
        store = (r.get("store") or "").strip()
        url = (r.get("url") or "").strip()
        if not store or not url:
            continue
        seg = segment_for(r.get("niche", ""))
        score = model_score(r)
        sig = signal_summary(r)
        scored_rows.append(
            {
                **r,
                "segment": seg,
                "model_score": f"{score:.1f}",
                "signal_summary": sig,
            }
        )

    out_scored_csv.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = list(scored_rows[0].keys()) if scored_rows else []
    with out_scored_csv.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(scored_rows)
    print(f"Wrote: {out_scored_csv}")

    if not out_top_md:
        return 0

    excluded = {s.strip() for s in (args.exclude_segments or "").split(",") if s.strip()}

    ranked: list[RankedRow] = []
    for r in scored_rows:
        segment = (r.get("segment") or "").strip()
        if excluded and segment in excluded:
            continue
        ranked.append(
            RankedRow(
                store=(r.get("store") or "").strip(),
                niche=(r.get("niche") or "").strip(),
                archetype=(r.get("archetype") or "").strip(),
                url=(r.get("url") or "").strip(),
                segment=segment,
                score=float((r.get("model_score") or "0").strip() or "0"),
                signals=(r.get("signal_summary") or "").strip(),
                features_to_steal=(r.get("features_to_steal") or "").strip(),
                watchouts=(r.get("watchouts") or "").strip(),
                evidence=evidence_path(r),
            )
        )

    ranked = sorted(ranked, key=lambda x: (-x.score, x.store.lower()))

    picked: list[RankedRow] = []
    per_seg: dict[str, int] = defaultdict(int)
    for r in ranked:
        if len(picked) >= args.top_n:
            break
        if args.cap_per_segment and args.cap_per_segment > 0:
            if per_seg[r.segment] >= args.cap_per_segment:
                continue
        picked.append(r)
        per_seg[r.segment] += 1

    now = datetime.now(timezone.utc)
    now_stamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    today = now.strftime("%Y-%m-%d")

    lines: list[str] = []
    lines.append("---")
    lines.append("status: draft")
    lines.append(f"last_reviewed: {today}")
    lines.append("owner: growth")
    lines.append("---")
    lines.append("")
    lines.append(f"# Women’s Fashion — Top {args.top_n} Model Stores (evidence-linked)")
    lines.append("")
    lines.append("This is a heuristic shortlist derived from the enriched 100-store matrix.")
    lines.append("Use this to pick “who to copy” quickly, then confirm via manual funnel audits.")
    lines.append("")
    lines.append("Sources:")
    lines.append("- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.enriched.csv`")
    lines.append(f"- Generated at: `{now_stamp}`")
    lines.append("")
    lines.append("Notes:")
    lines.append("- Scores are heuristic (snapshot signals + keyword cues).")
    lines.append("- “Blocked” only reflects the saved snapshot, not the real site experience.")
    if excluded:
        lines.append(f"- Excluded segments: {', '.join(sorted(excluded))}")
    lines.append("")
    lines.append("| rank | store | segment | niche | archetype | score | signals | features to steal | watchouts | evidence |")
    lines.append("|---:|---|---|---|---:|---:|---|---|---|---|")
    for i, r in enumerate(picked, start=1):
        feats = safe_inline(r.features_to_steal)
        watch = safe_inline(r.watchouts)
        if len(feats) > 120:
            feats = feats[:117].rstrip() + "..."
        if len(watch) > 120:
            watch = watch[:117].rstrip() + "..."
        lines.append(
            "| "
            + " | ".join(
                [
                    str(i),
                    safe_inline(r.store),
                    safe_inline(r.segment),
                    safe_inline(r.niche),
                    safe_inline(r.archetype),
                    f"{r.score:.1f}",
                    safe_inline(r.signals),
                    feats or "—",
                    watch or "—",
                    f"`{r.evidence}`",
                ]
            )
            + " |"
        )

    out_top_md.parent.mkdir(parents=True, exist_ok=True)
    out_top_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_top_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
