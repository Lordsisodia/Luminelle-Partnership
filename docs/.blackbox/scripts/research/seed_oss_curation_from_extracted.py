#!/usr/bin/env python3
"""
Seed OSS catalog curation from a single run's extracted candidates JSON.

Why:
- A discovery run produces `artifacts/extracted.json` (ranked candidates).
- Curation is the durable "human intent" layer (triage/deepen/poc/adopt/...).
- This script lets you bulk-add the top N candidates to curation quickly, without
  manually copy/pasting owner/repo one by one.

This does NOT overwrite existing curated items by default.
"""

from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from typing import Any, Dict, List
from pathlib import Path


VALID_STATUSES = {"triage", "deepen", "poc", "adopt", "watch", "reject"}


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def read_json(path: str) -> Any:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path: str, payload: Any) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, sort_keys=True)
        f.write("\n")


def normalize_full_name(v: Any) -> str:
    if not isinstance(v, str):
        return ""
    s = v.strip()
    if not s or "/" not in s:
        return ""
    return s


def safe_int(v: Any, default: int = 0) -> int:
    try:
        return int(v)
    except Exception:
        return default


def safe_str(v: Any) -> str:
    if isinstance(v, str):
        return v.strip()
    return ""


def upsert_metadata(existing: Dict[str, Any], candidate: Dict[str, Any]) -> None:
    """
    Populate curation items with stable metadata that helps humans scan quickly.

    We intentionally only fill missing/empty fields to avoid clobbering human edits.
    """
    url = safe_str(candidate.get("url"))
    if url and not safe_str(existing.get("url")):
        existing["url"] = url

    description = safe_str(candidate.get("description"))
    if description and not safe_str(existing.get("description")):
        existing["description"] = description

    language = safe_str(candidate.get("language"))
    if language and not safe_str(existing.get("language")):
        existing["language"] = language

    license_spdx = safe_str(candidate.get("license_spdx"))
    if license_spdx and not safe_str(existing.get("license_spdx")):
        existing["license_spdx"] = license_spdx

    license_bucket = safe_str(candidate.get("license_bucket"))
    if license_bucket and not safe_str(existing.get("license_bucket")):
        existing["license_bucket"] = license_bucket

    stars = safe_int(candidate.get("stars"), 0)
    if stars and not safe_int(existing.get("stars"), 0):
        existing["stars"] = stars

    tags = candidate.get("tags")
    if isinstance(tags, list) and tags and not isinstance(existing.get("tags"), list):
        existing["tags"] = [t for t in tags if isinstance(t, str) and t.strip()]


def load_or_init_curation(path: str) -> Dict[str, Any]:
    if not os.path.exists(path):
        return {"generated_at_utc": utc_now_iso(), "items": []}
    payload = read_json(path)
    if not isinstance(payload, dict):
        return {"generated_at_utc": utc_now_iso(), "items": []}
    if "items" not in payload or not isinstance(payload.get("items"), list):
        payload["items"] = []
    return payload


def find_item(items: List[Dict[str, Any]], full_name: str) -> Dict[str, Any] | None:
    for it in items:
        if isinstance(it, dict) and it.get("full_name") == full_name:
            return it
    return None


def resolve_extracted_json(extracted_json: str, plan: str, latest: bool, docs_root: str) -> str:
    if extracted_json.strip():
        return extracted_json.strip()

    if plan.strip():
        p = plan.strip()
        if p.startswith("docs/"):
            p = p[len("docs/") :]
        if os.path.isabs(p):
            plan_path = p
        else:
            plan_path = os.path.join(docs_root, p)
        return os.path.join(plan_path, "artifacts", "extracted.json")

    if latest:
        plans_dir = Path(docs_root) / ".blackbox" / ".plans"
        if not plans_dir.exists():
            raise SystemExit(f"Plans folder not found: {plans_dir}")
        candidates: List[Path] = []
        for child in plans_dir.iterdir():
            if not child.is_dir():
                continue
            ex = child / "artifacts" / "extracted.json"
            if ex.exists():
                candidates.append(ex)
        if not candidates:
            raise SystemExit(f"No runs with artifacts/extracted.json found under: {plans_dir}")
        candidates.sort(key=lambda p: p.stat().st_mtime, reverse=True)
        return str(candidates[0])

    raise SystemExit("Provide one of: --extracted-json, --plan, or --latest.")


def main() -> int:
    ap = argparse.ArgumentParser(description="Seed curation.json from a run's artifacts/extracted.json.")
    ap.add_argument("--extracted-json", default="", help="Path to run artifacts/extracted.json")
    ap.add_argument("--plan", default="", help="Plan folder containing artifacts/extracted.json (e.g. .blackbox/.plans/<run>)")
    ap.add_argument("--latest", action="store_true", help="Auto-pick the newest run under .blackbox/.plans/ that has artifacts/extracted.json")
    ap.add_argument("--curation", required=True, help="Path to .blackbox/oss-catalog/curation.json")
    ap.add_argument("--top", type=int, default=15, help="How many candidates to seed (default 15)")
    ap.add_argument("--status", default="triage", help="Status to assign to seeded items (default triage)")
    ap.add_argument("--owner", default="", help="Default owner to set (optional)")
    ap.add_argument("--priority-base", type=int, default=0, help="Base priority to add (default 0)")
    ap.add_argument("--note-prefix", default="", help="Optional prefix to add to notes (e.g. 'Seeded from run X: ')")
    ap.add_argument(
        "--update-existing",
        action="store_true",
        help="If set, update status/priority/owner for existing curated items too.",
    )
    ap.add_argument(
        "--update-existing-metadata",
        action="store_true",
        help="If set, backfill missing url/description/license/stars/tags for existing curated items too.",
    )
    args = ap.parse_args()

    if args.status not in VALID_STATUSES:
        raise SystemExit(f"Invalid --status: {args.status}")

    docs_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    extracted_path = resolve_extracted_json(args.extracted_json, args.plan, bool(args.latest), docs_root)
    if not os.path.exists(extracted_path):
        raise SystemExit(f"extracted.json not found: {extracted_path}")

    extracted = read_json(extracted_path)
    candidates = extracted.get("candidates") or []
    if not isinstance(candidates, list):
        raise SystemExit("extracted.json missing candidates[]")

    top_n = max(0, int(args.top))
    candidates = candidates[:top_n]

    cur = load_or_init_curation(args.curation)
    items = cur.get("items") or []
    if not isinstance(items, list):
        items = []

    added = 0
    skipped_existing = 0
    updated = 0

    for idx, c in enumerate(candidates, start=1):
        if not isinstance(c, dict):
            continue
        full_name = normalize_full_name(c.get("full_name"))
        if not full_name:
            continue

        # Rank 1 should get highest priority.
        computed_priority = int(args.priority_base) + max(0, (top_n - idx + 1))

        existing = find_item(items, full_name)
        is_new = existing is None

        if existing and not args.update_existing and not args.update_existing_metadata:
            skipped_existing += 1
            continue

        if is_new:
            existing = {"full_name": full_name}
            items.append(existing)
            added += 1
        elif args.update_existing:
            updated += 1

        # Always attempt to backfill metadata, even if we aren't changing status/priority.
        upsert_metadata(existing, c)

        if is_new or args.update_existing:
            existing["status"] = args.status
            existing["priority"] = computed_priority
            if args.owner.strip():
                existing["owner"] = args.owner.strip()

        existing["updated_at_utc"] = utc_now_iso()

        existing_notes = existing.get("notes")
        if not isinstance(existing_notes, str):
            existing_notes = ""
        existing_notes = existing_notes.strip()

        # Only add a small note if it's empty, to avoid clobbering human notes.
        if not existing_notes:
            note = args.note_prefix.strip()
            # Provide minimal provenance + quick metadata for scanning.
            stars = safe_int(c.get("stars"), 0)
            score = safe_int(c.get("score"), 0)
            tags = c.get("tags")
            tag_str = ""
            if isinstance(tags, list):
                tag_str = ", ".join([t for t in tags if isinstance(t, str) and t.strip()][:8])
            bits = [f"seeded rank={idx}/{top_n}", f"score={score}", f"stars={stars}"]
            if tag_str:
                bits.append(f"tags={tag_str}")
            note_line = " ; ".join(bits)
            existing["notes"] = (note + note_line).strip()

    # Preserve any extra fields on items; sorting is handled by the curate tool.
    out = {"generated_at_utc": utc_now_iso(), "items": items}
    write_json(args.curation, out)

    print(f"Seeded curation: {args.curation}")
    print(f"- extracted: {extracted_path}")
    print(f"- requested top: {top_n}")
    print(f"- added: {added}")
    print(f"- updated: {updated}" if args.update_existing else f"- updated: 0 (update disabled)")
    print(f"- skipped_existing: {skipped_existing}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
