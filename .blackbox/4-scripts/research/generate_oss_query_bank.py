#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path


def clean_feature_text(s: str) -> str:
    s = s.strip()
    s = re.sub(r"\([^)]*\)", "", s).strip()
    s = s.replace("/", " ")
    s = re.sub(r"[^A-Za-z0-9+ -]+", "", s)
    s = re.sub(r"\s{2,}", " ", s).strip()
    return s


def feature_to_query(feature: str) -> str | None:
    f = clean_feature_text(feature)
    if not f:
        return None
    # Avoid ultra-generic bullets that create low-signal GitHub results.
    if f.lower() in {"seo controls", "gift cards", "fraud checks"}:
        return None
    # Prefer phrases that map to real OSS repos.
    return f"{f} open source"


def parse_feature_map_sections(md: str) -> dict[str, list[str]]:
    """
    Extract features from the competitor feature map sections.

    We consider headings like:
      ### 2.4 Returns & Exchanges (a major buyer pain)
    and bullets under them.
    """
    sections: dict[str, list[str]] = {}
    current: str | None = None
    for raw in md.splitlines():
        line = raw.strip()
        if line.startswith("### 2."):
            # Strip leading numbering, keep the human-readable label.
            title = line.removeprefix("### ").strip()
            title = re.sub(r"^2\.\d+\s*", "", title).strip()
            title = clean_feature_text(title)
            current = title or None
            if current and current not in sections:
                sections[current] = []
            continue
        if current and line.startswith("- "):
            item = line.removeprefix("- ").strip()
            if item:
                sections[current].append(item)
    return sections


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate an OSS discovery query bank from the competitor feature map.")
    ap.add_argument(
        "--feature-map",
        required=True,
        help="Path to docs/05-planning/research/competitor-feature-map.md (or equivalent).",
    )
    ap.add_argument("--out", required=True, help="Write markdown query bank here.")
    ap.add_argument(
        "--max-per-section",
        type=int,
        default=10,
        help="Limit derived queries per section (keeps API calls sane).",
    )
    args = ap.parse_args()

    src = Path(args.feature_map)
    if not src.exists():
        raise SystemExit(f"Missing feature map: {src}")

    md = src.read_text("utf-8", errors="replace")
    sections = parse_feature_map_sections(md)
    if not sections:
        raise SystemExit("No sections found. Expected headings like: '### 2.x ...' in the feature map.")

    # Focus on OSS-friendly areas where GitHub search yields practical components.
    allow = {
        "Orders Fulfillment Ops",
        "Returns Exchanges",
        "Customer Support CX",
        "Automation Workflows",
        "Admin UX where you can be best",
        "Analytics Finance",
        "Content Brand Ops",
        "Checkout Payments Taxes",
        "Storefront Merchandising",
    }

    def normalize_section_title(title: str) -> str:
        t = title
        t = t.replace("&", " ")
        t = re.sub(r"[^A-Za-z0-9 ]+", " ", t)
        t = re.sub(r"\s{2,}", " ", t).strip()
        return t

    # Map verbose titles to stable buckets.
    bucket_map: dict[str, str] = {}
    for title in sections.keys():
        norm = normalize_section_title(title).lower()
        if "returns" in norm:
            bucket_map[title] = "Returns / Exchanges"
        elif "orders" in norm or "fulfillment" in norm:
            bucket_map[title] = "Orders / Fulfillment Ops"
        elif "support" in norm or "cx" in norm:
            bucket_map[title] = "Customer Support / CX"
        elif "automation" in norm or "workflow" in norm:
            bucket_map[title] = "Automation / Workflows"
        elif "admin" in norm:
            bucket_map[title] = "Admin UX primitives"
        elif "analytics" in norm or "finance" in norm:
            bucket_map[title] = "Analytics"
        elif "content" in norm or "brand" in norm:
            bucket_map[title] = "Content / CMS"
        elif "checkout" in norm or "payments" in norm or "tax" in norm:
            bucket_map[title] = "Checkout / Payments / Taxes"
        elif "storefront" in norm or "merchandising" in norm:
            bucket_map[title] = "Storefront / Merchandising"
        else:
            # Skip unknown/unmapped buckets by default (keeps search focused).
            bucket_map[title] = ""

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    lines.append("# OSS Discovery Queries (derived from feature map)")
    lines.append("")
    lines.append(f"Source: `{src}`")
    lines.append("")
    lines.append("These are auto-generated and intentionally capped per section.")
    lines.append("")

    # Build bucket -> queries
    buckets: dict[str, list[str]] = {}
    for title, items in sections.items():
        bucket = bucket_map.get(title, "")
        if not bucket:
            continue
        for item in items[: args.max_per_section]:
            q = feature_to_query(item)
            if not q:
                continue
            buckets.setdefault(bucket, []).append(q)

    # Add a few opinionated “bridge” queries that consistently find useful primitives.
    buckets.setdefault("Admin UX primitives", []).extend(
        [
            "audit log open source",
            "rbac open source",
            "approval workflow open source",
            "csv import mapping open source",
        ]
    )
    buckets.setdefault("Automation / Workflows", []).extend(
        [
            "workflow engine open source",
            "job queue dashboard open source",
            "idempotency keys open source",
            "webhook ingestion open source",
        ]
    )
    buckets.setdefault("Returns / Exchanges", []).extend(
        [
            "returns portal ecommerce open source",
            "rma management open source",
            "wismo where is my order portal open source",
        ]
    )

    # Dedup + write in a stable order
    for bucket in sorted(buckets.keys()):
        qs = []
        seen = set()
        for q in buckets[bucket]:
            qq = q.strip()
            if not qq:
                continue
            if qq.lower() in seen:
                continue
            seen.add(qq.lower())
            qs.append(qq)
        if not qs:
            continue
        lines.append(f"## {bucket}")
        lines.append("")
        for q in qs:
            lines.append(f"- {q}")
        lines.append("")

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote query bank: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

