#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Weights:
    discovery: float = 0.15
    pdp: float = 0.35
    cart: float = 0.15
    checkout: float = 0.20
    post_purchase: float = 0.15


def fnum(s: str) -> float | None:
    s = (s or "").strip()
    if not s:
        return None
    try:
        return float(s)
    except ValueError:
        return None


def clamp_0_5(x: float) -> float:
    return max(0.0, min(5.0, x))


def compute_weighted(
    discovery: float | None,
    pdp: float | None,
    cart: float | None,
    checkout: float | None,
    post_purchase: float | None,
    w: Weights,
) -> float | None:
    vals = {
        "discovery": discovery,
        "pdp": pdp,
        "cart": cart,
        "checkout": checkout,
        "post_purchase": post_purchase,
    }
    # Only compute when all components are present.
    if any(v is None for v in vals.values()):
        return None
    return (
        clamp_0_5(discovery or 0) * w.discovery
        + clamp_0_5(pdp or 0) * w.pdp
        + clamp_0_5(cart or 0) * w.cart
        + clamp_0_5(checkout or 0) * w.checkout
        + clamp_0_5(post_purchase or 0) * w.post_purchase
    )


def main() -> int:
    ap = argparse.ArgumentParser(description="Compute weighted funnel audit scores and emit a ranked CSV + Markdown.")
    ap.add_argument("--in-csv", required=True, help="Scorecard CSV (with component scores).")
    ap.add_argument("--out-csv", required=True, help="Write scored CSV here.")
    ap.add_argument("--out-md", required=True, help="Write ranked markdown here.")
    ap.add_argument(
        "--group-by-store",
        action="store_true",
        help="Aggregate desktop+mobile rows into a single store score by averaging each component when available.",
    )
    args = ap.parse_args()

    in_csv = Path(args.in_csv)
    out_csv = Path(args.out_csv)
    out_md = Path(args.out_md)

    w = Weights()

    rows: list[dict[str, str]] = []
    with in_csv.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        for r in reader:
            discovery = fnum(r.get("discovery_score", ""))
            pdp = fnum(r.get("pdp_confidence_score", ""))
            cart = fnum(r.get("cart_score", ""))
            checkout = fnum(r.get("checkout_score", ""))
            post_purchase = fnum(r.get("post_purchase_returns_score", ""))
            weighted = compute_weighted(discovery, pdp, cart, checkout, post_purchase, w)
            r["weighted_score"] = "" if weighted is None else f"{weighted:.2f}"
            rows.append(r)

    if args.group_by_store:
        grouped: dict[str, list[dict[str, str]]] = {}
        for r in rows:
            key = (r.get("store") or r.get("name") or "").strip().lower()
            if not key:
                continue
            grouped.setdefault(key, []).append(r)

        agg_rows: list[dict[str, str]] = []
        for key, rs in grouped.items():
            # Use the first row as base metadata.
            base = dict(rs[0])
            base["device"] = "avg(desktop+mobile)"

            def avg_field(field: str) -> float | None:
                vals: list[float] = []
                for rr in rs:
                    v = fnum(rr.get(field, ""))
                    if v is not None:
                        vals.append(v)
                if not vals:
                    return None
                return sum(vals) / len(vals)

            discovery = avg_field("discovery_score")
            pdp = avg_field("pdp_confidence_score")
            cart = avg_field("cart_score")
            checkout = avg_field("checkout_score")
            post_purchase = avg_field("post_purchase_returns_score")

            weighted = compute_weighted(discovery, pdp, cart, checkout, post_purchase, w)
            base["discovery_score"] = "" if discovery is None else f"{discovery:.2f}"
            base["pdp_confidence_score"] = "" if pdp is None else f"{pdp:.2f}"
            base["cart_score"] = "" if cart is None else f"{cart:.2f}"
            base["checkout_score"] = "" if checkout is None else f"{checkout:.2f}"
            base["post_purchase_returns_score"] = "" if post_purchase is None else f"{post_purchase:.2f}"
            base["weighted_score"] = "" if weighted is None else f"{weighted:.2f}"
            agg_rows.append(base)

        rows = agg_rows

    # Ensure field exists
    if "weighted_score" not in (fieldnames or []):
        fieldnames = [*fieldnames, "weighted_score"]

    out_csv.parent.mkdir(parents=True, exist_ok=True)
    with out_csv.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow({k: r.get(k, "") for k in fieldnames})

    scored = [r for r in rows if (r.get("weighted_score") or "").strip()]
    scored.sort(key=lambda r: float(r["weighted_score"]), reverse=True)

    lines: list[str] = []
    lines.append("# Funnel Audit Rankings")
    lines.append("")
    lines.append("Weighted scoring uses the women’s fashion rubric weights:")
    lines.append("- Discovery 15%")
    lines.append("- PDP confidence 35%")
    lines.append("- Cart 15%")
    lines.append("- Checkout 20%")
    lines.append("- Post‑purchase/returns 15%")
    lines.append("")
    if not scored:
        lines.append("No fully-scored rows yet (fill all 5 component scores to compute weighted ranking).")
    else:
        lines.append("| rank | store | weighted | notes |")
        lines.append("|---:|---|---:|---|")
        for i, r in enumerate(scored, start=1):
            store = (r.get("store") or r.get("name") or "").replace("|", " / ")
            note = (r.get("top_3_patterns") or r.get("notes") or "").replace("|", " / ")
            lines.append(f"| {i} | {store} | {r['weighted_score']} | {note} |")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"Wrote: {out_csv}")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
