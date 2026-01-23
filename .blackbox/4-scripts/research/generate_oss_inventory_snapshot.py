#!/usr/bin/env python3
"""
Generate an OSS catalog inventory snapshot (human-scannable).

This is a lightweight "what we have" view that complements:
- index.md (catalog rollups)
- shortlist.md / poc-backlog.md (curation execution surfaces)
- risk.md (health + license risk)

Inventory focuses on:
- counts (catalog + curation)
- focus-tag coverage
- curated highlights per lane/tag (non-reject)

Stays metadata-only (no cloning).
"""

from __future__ import annotations

import argparse
import json
import os
from collections import Counter
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Dict, Iterable, List, Optional, Tuple


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def read_json(path: str) -> Any:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def safe_str(v: Any, default: str = "") -> str:
    if isinstance(v, str):
        return v
    if v is None:
        return default
    return str(v)


def safe_int(v: Any, default: int = 0) -> int:
    try:
        return int(v)
    except Exception:
        return default


def normalize_list(v: Any) -> List[str]:
    if v is None:
        return []
    if isinstance(v, list):
        out: List[str] = []
        for x in v:
            s = safe_str(x).strip()
            if s:
                out.append(s)
        # stable de-dupe
        seen = set()
        deduped: List[str] = []
        for s in out:
            if s in seen:
                continue
            seen.add(s)
            deduped.append(s)
        return deduped
    # tolerate comma-separated strings
    if isinstance(v, str):
        parts = [p.strip() for p in v.split(",")]
        return [p for p in parts if p]
    return []


def md_escape(s: str) -> str:
    return s.replace("|", "\\|")


@dataclass(frozen=True)
class CuratedRow:
    full_name: str
    status: str
    priority: int
    stars: int
    license_bucket: str
    license_spdx: str
    language: str
    url: str


STATUS_RANK = {
    "adopt": 5,
    "poc": 4,
    "deepen": 3,
    "watch": 2,
    "triage": 1,
    "reject": 0,
}


def status_rank(status: str) -> int:
    return STATUS_RANK.get((status or "").strip().lower(), 0)


def top_counts(items: Iterable[Dict[str, Any]], key: str, limit: int = 20) -> List[Tuple[str, int]]:
    c: Counter[str] = Counter()
    for it in items:
        if not isinstance(it, dict):
            continue
        c[safe_str(it.get(key), "unknown") or "unknown"] += 1
    return sorted(c.items(), key=lambda kv: (-kv[1], kv[0].lower()))[:limit]


def build_catalog_index(repos: List[Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
    by: Dict[str, Dict[str, Any]] = {}
    for r in repos:
        if not isinstance(r, dict):
            continue
        full_name = safe_str(r.get("full_name")).strip()
        if not full_name:
            continue
        by[full_name] = r
    return by


def curated_rows(
    *,
    curation_items: List[Dict[str, Any]],
    catalog_by_name: Dict[str, Dict[str, Any]],
    include_statuses: Optional[set[str]] = None,
) -> List[CuratedRow]:
    rows: List[CuratedRow] = []
    for it in curation_items:
        if not isinstance(it, dict):
            continue
        full_name = safe_str(it.get("full_name")).strip()
        if not full_name:
            continue
        st = safe_str(it.get("status")).strip().lower()
        if include_statuses is not None and st not in include_statuses:
            continue

        cat = catalog_by_name.get(full_name, {})
        url = safe_str(it.get("url") or cat.get("url")).strip()
        stars = safe_int(it.get("stars"), safe_int(cat.get("stars"), 0))
        lang = safe_str(it.get("language") or cat.get("language"), "N/A").strip() or "N/A"
        lb = safe_str(it.get("license_bucket") or cat.get("license_bucket"), "verify").strip() or "verify"
        spdx = safe_str(it.get("license_spdx") or cat.get("license_spdx"), "UNKNOWN").strip() or "UNKNOWN"
        priority = safe_int(it.get("priority"), 0)

        rows.append(
            CuratedRow(
                full_name=full_name,
                status=st,
                priority=priority,
                stars=stars,
                license_bucket=lb,
                license_spdx=spdx,
                language=lang,
                url=url,
            )
        )
    return rows


def format_row(r: CuratedRow) -> str:
    lic = f"{r.license_bucket}/{r.license_spdx}"
    return f"- `{r.full_name}` — status={r.status}, priority={r.priority}, stars={r.stars}, license={lic}, lang={r.language} ({r.url})"


def select_highlights(
    rows: List[CuratedRow],
    tags: List[str],
    *,
    catalog_by_name: Dict[str, Dict[str, Any]],
    curation_by_name: Dict[str, Dict[str, Any]],
    limit: int,
) -> List[CuratedRow]:
    wanted = {t.strip() for t in tags if t.strip()}
    picked: List[CuratedRow] = []
    for r in rows:
        meta = catalog_by_name.get(r.full_name, {})
        cur = curation_by_name.get(r.full_name, {})
        # Use our deliberate tag system (catalog tags + curation tags), not GitHub topics
        # (topics are noisy and cause unrelated items to appear in sections).
        rt = set(normalize_list(meta.get("tags"))) | set(normalize_list(cur.get("tags")))
        if wanted and not (rt & wanted):
            continue
        picked.append(r)

    picked.sort(
        key=lambda x: (
            -status_rank(x.status),
            -x.priority,
            -x.stars,
            x.full_name.lower(),
        )
    )
    return picked[:limit]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--catalog", required=True, help="Path to .blackbox/oss-catalog/catalog.json")
    ap.add_argument("--curation", required=True, help="Path to .blackbox/oss-catalog/curation.json")
    ap.add_argument("--out", required=True, help="Markdown output path (e.g. .blackbox/oss-catalog/inventory.md)")
    ap.add_argument("--max-items", type=int, default=20, help="Max items per highlight section (default: 20)")
    ap.add_argument(
        "--focus-tags",
        default="policy,auth,workflows,returns,shipping,support,search,admin,storefront,content,blog,cms,analytics,observability",
        help="CSV of focus tags to count from catalog tags (default: common Lumelle focus tags)",
    )
    args = ap.parse_args()

    cat = read_json(args.catalog)
    cur = read_json(args.curation)

    repos = cat.get("repos", [])
    if not isinstance(repos, list):
        raise SystemExit("catalog.json missing repos[]")
    curation_items = cur.get("items", [])
    if not isinstance(curation_items, list):
        raise SystemExit("curation.json missing items[]")

    catalog_by_name = build_catalog_index(repos)
    curation_by_name = build_catalog_index(curation_items)

    now = utc_now_iso()

    # Rollups
    status_counts: Counter[str] = Counter()
    for it in curation_items:
        if not isinstance(it, dict):
            continue
        status_counts[safe_str(it.get("status"), "unknown") or "unknown"] += 1

    license_bucket_counts = Counter(safe_str(r.get("license_bucket"), "unknown") or "unknown" for r in repos if isinstance(r, dict))

    # Tag coverage from catalog tags
    tag_counts: Counter[str] = Counter()
    for r in repos:
        if not isinstance(r, dict):
            continue
        for t in normalize_list(r.get("tags")):
            tag_counts[t] += 1

    focus_tags = [t.strip() for t in (args.focus_tags or "").split(",") if t.strip()]

    curated_non_reject = curated_rows(
        curation_items=curation_items,
        catalog_by_name=catalog_by_name,
        include_statuses={"adopt", "poc", "deepen", "watch", "triage"},
    )

    def section(title: str, tag_group: List[str]) -> List[str]:
        lines: List[str] = []
        lines.append(f"### {title}")
        picked = select_highlights(
            curated_non_reject,
            tag_group,
            catalog_by_name=catalog_by_name,
            curation_by_name=curation_by_name,
            limit=args.max_items,
        )
        if not picked:
            lines.append("- (none)")
            return lines
        for r in picked:
            lines.append(format_row(r))
        return lines

    lines: List[str] = []
    lines.append("# OSS Catalog Inventory Snapshot")
    lines.append("")
    lines.append(f"Updated: `{now}`")
    lines.append("")

    lines.append("## Totals")
    lines.append(f"- Catalog repos: **{len(repos)}**")
    lines.append(f"- Curation items: **{len(curation_items)}**")
    lines.append("")

    lines.append("## Curation status counts")
    for k, v in sorted(status_counts.items(), key=lambda kv: (-kv[1], kv[0].lower())):
        lines.append(f"- `{md_escape(k)}`: {v}")
    lines.append("")

    lines.append("## License buckets (catalog)")
    for k, v in sorted(license_bucket_counts.items(), key=lambda kv: (-kv[1], kv[0].lower())):
        lines.append(f"- `{md_escape(k)}`: {v}")
    lines.append("")

    lines.append("## Focus tag coverage (catalog counts)")
    for t in focus_tags:
        lines.append(f"- `{md_escape(t)}`: {tag_counts.get(t, 0)}")
    lines.append("")

    # Quick "weakest tags" cue (helps decide next sourcing direction)
    weakest = sorted(((t, tag_counts.get(t, 0)) for t in focus_tags), key=lambda kv: (kv[1], kv[0].lower()))[:6]
    lines.append("## Weak spots (by tag count)")
    lines.append("- " + ", ".join([f"`{md_escape(t)}`={n}" for t, n in weakest]))
    lines.append("")

    lines.append("## Lane highlights (curated, non-reject)")
    lines.append("")
    lines += section("Storefront (pattern mining)", ["storefront"])
    lines.append("")
    lines += section("Blog/content components", ["blog", "content", "mdx", "markdown"])
    lines.append("")
    lines += section("Sections/components (FAQ/pricing/testimonials/newsletter)", ["sections", "content"])
    lines.append("")
    lines += section("Admin + bulk ops surfaces", ["admin"])
    lines.append("")
    lines += section("Support timeline/helpdesk primitives", ["support"])
    lines.append("")
    lines += section("Returns / store credit", ["returns"])
    lines.append("")
    lines += section("Search facets/autocomplete/adapters", ["search"])
    lines.append("")
    lines += section("Workflow/audit/policy/auth primitives", ["workflows", "policy", "auth"])
    lines.append("")

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines).rstrip() + "\n")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
