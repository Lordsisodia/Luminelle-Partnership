#!/usr/bin/env python3
"""
Generate an execution-ready POC backlog from the cross-run OSS catalog + curation.

Why:
- Discovery produces many candidates; curation adds intent.
- This backlog turns "intent" into a lightweight execution queue:
  owners, timeboxes, acceptance criteria, and decision dates.

Inputs:
- catalog.json: auto-merged list of repos + metadata
- curation.json: human intent + optional POC details

Output:
- Markdown file (poc-backlog.md)
"""

from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def read_json(path: str) -> Any:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def safe_int(v: Any, default: int = 0) -> int:
    try:
        return int(v)
    except Exception:
        return default


def safe_str(v: Any, default: str = "") -> str:
    if isinstance(v, str):
        return v
    if v is None:
        return default
    return str(v)


def normalize_list(values: Any) -> List[str]:
    if not isinstance(values, list):
        return []
    out: List[str] = []
    for v in values:
        if isinstance(v, str):
            s = v.strip()
            if s:
                out.append(s)
    seen = set()
    uniq: List[str] = []
    for s in out:
        if s not in seen:
            uniq.append(s)
            seen.add(s)
    return uniq


STATUS_ORDER = ["poc", "deepen", "adopt", "triage", "watch", "reject"]


def status_rank(s: str) -> int:
    try:
        return STATUS_ORDER.index(s)
    except ValueError:
        return len(STATUS_ORDER)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--catalog", required=True, help="Path to .blackbox/oss-catalog/catalog.json")
    ap.add_argument("--curation", required=True, help="Path to .blackbox/oss-catalog/curation.json")
    ap.add_argument("--out", required=True, help="Markdown output path (e.g. .blackbox/oss-catalog/poc-backlog.md)")
    ap.add_argument(
        "--include-statuses",
        default="poc,deepen,adopt",
        help="Comma-separated statuses to include (default: poc,deepen,adopt)",
    )
    ap.add_argument("--max", type=int, default=50, help="Max items to include (default 50)")
    args = ap.parse_args()

    include_statuses = {s.strip() for s in (args.include_statuses or "").split(",") if s.strip()}
    if not include_statuses:
        include_statuses = {"poc", "deepen", "adopt"}

    catalog = read_json(args.catalog)
    repos = catalog.get("repos", [])
    if not isinstance(repos, list):
        raise SystemExit("catalog.json missing repos[]")

    by_name: Dict[str, Dict[str, Any]] = {}
    for r in repos:
        if isinstance(r, dict) and isinstance(r.get("full_name"), str):
            by_name[r["full_name"]] = r

    cur = read_json(args.curation)
    items = cur.get("items", [])
    if not isinstance(items, list):
        items = []

    curated: List[Dict[str, Any]] = []
    for it in items:
        if not isinstance(it, dict):
            continue
        full_name = safe_str(it.get("full_name")).strip()
        if not full_name:
            continue
        status = safe_str(it.get("status"), "triage").strip() or "triage"
        if status not in include_statuses:
            continue
        curated.append(it)

    def sort_key(it: Dict[str, Any]) -> Any:
        status = safe_str(it.get("status"), "triage")
        pr = safe_int(it.get("priority"), 0)
        full_name = safe_str(it.get("full_name"))
        return (status_rank(status), -pr, full_name.lower())

    curated.sort(key=sort_key)
    curated = curated[: max(0, int(args.max))]

    lines: List[str] = []
    lines.append("# OSS POC Backlog")
    lines.append("")
    lines.append(f"Updated: `{utc_now_iso()}`")
    lines.append("")
    lines.append("Generated from:")
    lines.append(f"- catalog: `{args.catalog}`")
    lines.append(f"- curation: `{args.curation}`")
    lines.append("")
    lines.append("Included statuses: " + ", ".join(sorted(include_statuses)))
    lines.append("")

    if not curated:
        lines.append("No items in backlog yet.")
        lines.append("")
        lines.append("Next:")
        lines.append("- Add items to curation with `status=poc` or `status=deepen`.")
        lines.append("- Re-render shortlist and backlog.")
        lines.append("")
    else:
        lines.append("## Items")
        lines.append("")
        for it in curated:
            full_name = safe_str(it.get("full_name")).strip()
            status = safe_str(it.get("status"), "triage").strip() or "triage"
            pr = safe_int(it.get("priority"), 0)
            owner = safe_str(it.get("owner"), "").strip() or "—"
            notes = safe_str(it.get("notes"), "").strip()

            poc = it.get("poc")
            if not isinstance(poc, dict):
                poc = {}
            timebox_days = safe_int(poc.get("timebox_days"), 2)
            scope = safe_str(poc.get("scope"), "").strip()
            acceptance = safe_str(poc.get("acceptance_criteria"), "").strip()
            decision_by = safe_str(poc.get("decision_by"), "").strip()

            r = by_name.get(full_name, {})
            url = safe_str(r.get("url"), "")
            stars = safe_int(r.get("stars"), 0)
            lb = safe_str(r.get("license_bucket"), "unknown")
            lang = safe_str(r.get("language"), "unknown")
            # Prefer curation tags (explicit overrides), fall back to catalog tags.
            tags = normalize_list(it.get("tags")) or normalize_list(r.get("tags"))
            tags = tags[:8]
            tag_str = ", ".join(tags) if tags else "—"
            pushed_at = safe_str(r.get("pushed_at"), "").strip()

            header = f"- **{full_name}** — status={status}, priority={pr}, owner={owner}"
            meta = f"  - stars={stars}, license={lb}, lang={lang}, tags={tag_str}"
            if pushed_at:
                meta += f", pushed_at={pushed_at}"
            if url:
                meta += f" ({url})"
            lines.append(header)
            lines.append(meta)
            if notes:
                lines.append(f"  - Notes: {notes}")
            lines.append(f"  - POC timebox: {timebox_days} day(s)")
            lines.append(f"  - POC scope: {scope if scope else 'TODO: define concrete scope'}")
            lines.append(f"  - Acceptance: {acceptance if acceptance else 'TODO: define measurable acceptance criteria'}")
            lines.append(f"  - Decision by: {decision_by if decision_by else 'TODO: set a decision date'}")
            lines.append("")

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines).rstrip() + "\n")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
