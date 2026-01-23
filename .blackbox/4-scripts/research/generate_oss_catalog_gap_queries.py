#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from collections import Counter
from pathlib import Path
from typing import Any


TARGET_TAGS = [
    "returns",
    "shipping",
    "support",
    "workflows",
    "policy",
    "auth",
    "admin",
    "commerce",
    "analytics",
    "search",
    "cms",
    "observability",
]


QUERY_SUGGESTIONS: dict[str, list[str]] = {
    "returns": [
        "returns portal ecommerce open source",
        "rma management open source",
        "reverse logistics open source",
        "exchange workflow ecommerce open source",
        "store credit wallet open source",
    ],
    "shipping": [
        "shipping label api open source",
        "carrier rates api open source",
        "package tracking api open source",
        "fulfillment management open source",
        "warehouse pick pack open source",
    ],
    "support": [
        "helpdesk open source ticketing",
        "customer support shared inbox open source",
        "live chat widget open source",
        "customer timeline open source",
        "knowledge base open source",
    ],
    "workflows": [
        "workflow automation open source",
        "workflow engine open source",
        "job queue dashboard open source",
        "event-driven orchestration open source",
        "webhook automation open source",
    ],
    "policy": [
        "rbac open source",
        "policy engine open source authorization",
        "abac open source",
        "audit log open source",
        "approval workflow open source",
    ],
    "auth": [
        "oidc provider open source",
        "sso open source",
        "authentication server open source",
        "multi-tenant auth open source",
        "user management open source",
    ],
    "admin": [
        "admin dashboard open source react typescript",
        "internal tools builder open source",
        "react admin panel open source",
        "crud dashboard open source",
        "data grid bulk actions open source react",
    ],
    "commerce": [
        "headless commerce open source",
        "ecommerce platform open source",
        "order management system open source",
        "cart checkout open source",
        "pricing promotions engine open source",
    ],
    "analytics": [
        "product analytics open source",
        "event tracking open source",
        "attribution analytics open source",
        "funnel analytics open source",
        "dashboard analytics open source",
    ],
    "search": [
        "search engine open source",
        "meilisearch admin dashboard open source",
        "typesense dashboard open source",
        "search merchandising open source",
        "synonyms typo tolerance search open source",
    ],
    "cms": [
        "headless cms open source",
        "media library open source react",
        "rich text editor open source react",
        "asset management open source",
        "content workflow open source",
    ],
    "observability": [
        "open source error tracking",
        "open source tracing",
        "open source log aggregation",
        "open source monitoring dashboard",
        "open source alerting",
    ],
}


def main() -> int:
    ap = argparse.ArgumentParser(description="Suggest additional OSS discovery queries based on catalog coverage gaps.")
    ap.add_argument("--catalog-json", required=True, help="Path to .blackbox/oss-catalog/catalog.json")
    ap.add_argument("--out", required=True, help="Write markdown suggestions here.")
    ap.add_argument("--min-count", type=int, default=3, help="Consider tag a gap if count < min-count.")
    args = ap.parse_args()

    catalog_path = Path(args.catalog_json)
    payload: dict[str, Any] = json.loads(catalog_path.read_text("utf-8"))
    repos = payload.get("repos") or []

    counts: Counter[str] = Counter()
    for r in repos:
        if not isinstance(r, dict):
            continue
        tags = r.get("tags") or []
        if isinstance(tags, list):
            counts.update(set(str(t) for t in tags if t))

    gaps = [(t, counts.get(t, 0)) for t in TARGET_TAGS if counts.get(t, 0) < args.min_count]
    gaps.sort(key=lambda x: x[1])  # smallest first

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    lines.append("# Gap Queries (OSS catalog)")
    lines.append("")
    lines.append(f"Source: `{catalog_path}`")
    lines.append(f"Threshold: tag_count < {args.min_count}")
    lines.append("")

    if not gaps:
        lines.append("No obvious tag gaps at the current threshold.")
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Wrote catalog gap queries: {out}")
        return 0

    lines.append("These tags look under-covered in the **cross-run catalog**; consider running these queries in the next cycles:")
    lines.append("")
    for tag, count in gaps:
        lines.append(f"## {tag} (count={count})")
        lines.append("")
        for q in QUERY_SUGGESTIONS.get(tag, []):
            lines.append(f"- {q}")
        lines.append("")

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote catalog gap queries: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

