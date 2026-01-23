#!/usr/bin/env python3
"""
Small curation layer for the cross-run OSS catalog.

Why:
- The catalog is auto-merged from runs and is intentionally "best effort".
- Curation adds durable human intent (triage/deepen/POC/adopt/reject) without
  fighting the automation.
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


def write_json(path: str, payload: Any) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, sort_keys=True)
        f.write("\n")


VALID_STATUSES = {
    "triage",         # looks promising; needs human scan
    "deepen",         # deep-dive planned (integration notes)
    "poc",            # in progress / POC scoped
    "adopt",          # preferred candidate to integrate
    "watch",          # keep monitoring / revisit later
    "reject",         # do not use (license/risk/fit)
}


def load_or_init(path: str) -> Dict[str, Any]:
    if not os.path.exists(path):
        return {"generated_at_utc": utc_now_iso(), "items": []}
    payload = read_json(path)
    if not isinstance(payload, dict):
        return {"generated_at_utc": utc_now_iso(), "items": []}
    if "items" not in payload or not isinstance(payload.get("items"), list):
        payload["items"] = []
    return payload


def normalize_items(items: List[Any]) -> List[Dict[str, Any]]:
    out: List[Dict[str, Any]] = []
    for it in items:
        if not isinstance(it, dict):
            continue
        full_name = it.get("full_name")
        if not isinstance(full_name, str) or not full_name.strip():
            continue
        # Preserve extra fields (e.g. poc scope/notes) but normalize core keys.
        base: Dict[str, Any] = dict(it)
        status = it.get("status", "triage")
        if not isinstance(status, str) or status not in VALID_STATUSES:
            status = "triage"
        base["full_name"] = full_name.strip()
        base["status"] = status
        base["priority"] = int(it.get("priority", 0) or 0)
        base["owner"] = (it.get("owner") if isinstance(it.get("owner"), str) else "").strip()
        base["notes"] = (it.get("notes") if isinstance(it.get("notes"), str) else "").strip()
        base["updated_at_utc"] = (it.get("updated_at_utc") if isinstance(it.get("updated_at_utc"), str) else "").strip() or utc_now_iso()
        out.append(base)
    # stable sort: priority desc, then full_name
    out.sort(key=lambda x: (-int(x.get("priority", 0)), str(x.get("full_name")).lower()))
    return out


def upsert_item(items: List[Dict[str, Any]], full_name: str) -> Dict[str, Any]:
    for it in items:
        if it.get("full_name") == full_name:
            return it
    it = {"full_name": full_name, "status": "triage", "priority": 0, "owner": "", "notes": "", "updated_at_utc": utc_now_iso()}
    items.append(it)
    return it


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--curation", required=True, help="Curation JSON path (e.g. .blackbox/oss-catalog/curation.json)")

    sub = ap.add_subparsers(dest="cmd", required=True)

    add = sub.add_parser("add", help="Add a repo to curation (or update if already present).")
    add.add_argument("full_name", help="owner/repo")
    add.add_argument("--status", default="triage", help=f"One of: {', '.join(sorted(VALID_STATUSES))}")
    add.add_argument("--priority", type=int, default=0, help="Higher = earlier in shortlist")
    add.add_argument("--owner", default="", help="Internal owner (who’s driving the evaluation)")
    add.add_argument("--notes", default="", help="Short notes")

    set_status = sub.add_parser("set-status", help="Update status for an existing curation item (creates if missing).")
    set_status.add_argument("full_name", help="owner/repo")
    set_status.add_argument("status", help=f"One of: {', '.join(sorted(VALID_STATUSES))}")

    remove = sub.add_parser("remove", help="Remove a repo from curation.")
    remove.add_argument("full_name", help="owner/repo")

    ls = sub.add_parser("list", help="List curated items (optionally filtered by status).")
    ls.add_argument("--status", default="", help="Filter by status")

    args = ap.parse_args()

    payload = load_or_init(args.curation)
    items = normalize_items(payload.get("items", []))

    if args.cmd == "add":
        if args.status not in VALID_STATUSES:
            raise SystemExit(f"Invalid status: {args.status}")
        it = upsert_item(items, args.full_name.strip())
        it["status"] = args.status
        it["priority"] = int(args.priority)
        if args.owner:
            it["owner"] = args.owner.strip()
        if args.notes:
            it["notes"] = args.notes.strip()
        it["updated_at_utc"] = utc_now_iso()

    elif args.cmd == "set-status":
        if args.status not in VALID_STATUSES:
            raise SystemExit(f"Invalid status: {args.status}")
        it = upsert_item(items, args.full_name.strip())
        it["status"] = args.status
        it["updated_at_utc"] = utc_now_iso()

    elif args.cmd == "remove":
        full_name = args.full_name.strip()
        items = [it for it in items if it.get("full_name") != full_name]

    elif args.cmd == "list":
        status = args.status.strip()
        filtered = items
        if status:
            filtered = [it for it in items if it.get("status") == status]
        for it in filtered:
            owner = it.get("owner") or "-"
            notes = it.get("notes") or ""
            pr = int(it.get("priority", 0))
            print(f"{it.get('full_name')}  status={it.get('status')}  priority={pr}  owner={owner}  {notes}".rstrip())
        return 0

    else:
        raise SystemExit("Unknown command")

    out = {"generated_at_utc": utc_now_iso(), "items": normalize_items(items)}
    write_json(args.curation, out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
