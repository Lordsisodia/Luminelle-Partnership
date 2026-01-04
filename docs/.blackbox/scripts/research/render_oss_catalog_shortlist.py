#!/usr/bin/env python3
"""
Render a human shortlist by joining:
- cross-run catalog (auto)
- curation layer (human intent)
"""

from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from typing import Any, Dict, List


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


STATUS_ORDER = ["adopt", "poc", "deepen", "triage", "watch", "reject"]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--catalog", required=True, help="Path to .blackbox/oss-catalog/catalog.json")
    ap.add_argument("--curation", required=True, help="Path to .blackbox/oss-catalog/curation.json")
    ap.add_argument("--out", required=True, help="Markdown output path (e.g. .blackbox/oss-catalog/shortlist.md)")
    args = ap.parse_args()

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

    # Only include curated items that exist in the catalog; keep unknown as stubs
    curated: List[Dict[str, Any]] = []
    for it in items:
        if not isinstance(it, dict):
            continue
        full_name = safe_str(it.get("full_name")).strip()
        if not full_name:
            continue
        status = safe_str(it.get("status"), "triage").strip() or "triage"
        pr = safe_int(it.get("priority"), 0)
        curated.append(
            {
                "full_name": full_name,
                "status": status,
                "priority": pr,
                "owner": safe_str(it.get("owner"), "").strip(),
                "notes": safe_str(it.get("notes"), "").strip(),
                "tags": it.get("tags"),
            }
        )

    def status_rank(s: str) -> int:
        try:
            return STATUS_ORDER.index(s)
        except ValueError:
            return len(STATUS_ORDER)

    curated.sort(key=lambda x: (status_rank(x["status"]), -x["priority"], x["full_name"].lower()))

    lines: List[str] = []
    lines.append("# OSS Shortlist (curated)")
    lines.append("")
    lines.append(f"Updated: `{utc_now_iso()}`")
    lines.append("")
    lines.append("This file is generated from:")
    lines.append(f"- catalog: `{args.catalog}`")
    lines.append(f"- curation: `{args.curation}`")
    lines.append("")

    if not curated:
        lines.append("No curated items yet.")
        lines.append("")
        lines.append("Add one:")
        lines.append("")
        lines.append("```bash")
        lines.append("python3 ./.blackbox/scripts/research/oss_catalog_curate.py \\")
        lines.append("  --curation .blackbox/oss-catalog/curation.json \\")
        lines.append("  add owner/repo --status triage --priority 10 --owner \"<name>\" --notes \"why\"")
        lines.append("```")
        lines.append("")
    else:
        lines.append("## Items")
        lines.append("")
        for it in curated:
            full_name = it["full_name"]
            status = it["status"]
            pr = it["priority"]
            owner = it.get("owner") or "-"
            notes = it.get("notes") or ""

            r = by_name.get(full_name)
            if not r:
                lines.append(f"- **{full_name}** — status={status}, priority={pr}, owner={owner} (not in catalog yet) {notes}".rstrip())
                continue

            url = safe_str(r.get("url"))
            score = safe_int(r.get("score"), 0)
            stars = safe_int(r.get("stars"), 0)
            lb = safe_str(r.get("license_bucket"), "unknown")
            lang = safe_str(r.get("language"), "unknown")
            # Prefer curation tags (explicit overrides), fall back to catalog tags.
            tags = normalize_list(it.get("tags")) or normalize_list(r.get("tags"))
            tags = tags[:6]
            tag_str = ", ".join(tags) if tags else "—"
            desc = safe_str(r.get("description"), "").strip()
            desc = (desc[:140] + "…") if len(desc) > 141 else desc

            suffix = f"{notes}" if notes else ""
            lines.append(
                f"- **{full_name}** — status={status}, priority={pr}, owner={owner}, score={score}, stars={stars}, license={lb}, lang={lang}, tags={tag_str} ({url}) {suffix}".rstrip()
            )
            if desc:
                lines.append(f"  - {desc}")
        lines.append("")

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines).rstrip() + "\n")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
