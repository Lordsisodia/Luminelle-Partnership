#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def tag_counts(repos: list[dict[str, Any]]) -> Counter[str]:
    c: Counter[str] = Counter()
    for r in repos:
        tags = r.get("tags") or []
        if isinstance(tags, list):
            c.update(set(str(t) for t in tags if t))
    return c


def main() -> int:
    ap = argparse.ArgumentParser(description="Retag an existing OSS catalog in-place using current heuristics.")
    ap.add_argument("--catalog-json", required=True, help="Path to .blackbox/oss-catalog/catalog.json")
    ap.add_argument(
        "--write",
        action="store_true",
        help="Write changes in-place (default: dry-run).",
    )
    ap.add_argument(
        "--reindex",
        action="store_true",
        help="Also regenerate catalog index.md next to catalog.json (requires update_oss_catalog.py).",
    )
    args = ap.parse_args()

    catalog_path = Path(args.catalog_json)
    payload: dict[str, Any] = json.loads(catalog_path.read_text("utf-8"))
    repos_raw = payload.get("repos") or []
    repos: list[dict[str, Any]] = [r for r in repos_raw if isinstance(r, dict)]

    before = tag_counts(repos)

    # Import current tag inference from export_oss_candidates.py (same folder).
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    from export_oss_candidates import infer_tags  # noqa: PLC0415

    changed = 0
    for r in repos:
        full_name = str(r.get("full_name") or "").strip()
        name = full_name.split("/")[-1] if "/" in full_name else full_name
        meta = {
            "name": name,
            "full_name": full_name,
            "description": r.get("description") or "",
            "topics": r.get("topics") or [],
        }
        new_tags = infer_tags(meta)
        old_tags = r.get("tags") or []
        if old_tags != new_tags:
            r["tags"] = new_tags
            changed += 1

    payload["repos"] = repos
    payload["count"] = len(repos)
    payload["generated_at_utc"] = utc_now_iso()

    after = tag_counts(repos)

    print(f"Catalog repos: {len(repos)}")
    print(f"Entries retagged: {changed}")
    print("")
    print("Top tags (before → after):")
    for tag, _count in before.most_common(15):
        print(f"- {tag}: {before.get(tag,0)} → {after.get(tag,0)}")

    if not args.write:
        print("")
        print("Dry-run only. Re-run with --write to apply changes.")
        return 0

    catalog_path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Wrote catalog: {catalog_path}")

    if args.reindex:
        try:
            from update_oss_catalog import build_index_md  # noqa: PLC0415
        except Exception as e:  # noqa: BLE001
            print(f"WARN: could not import build_index_md (skipping index.md): {e}", file=sys.stderr)
            return 0

        index_path = catalog_path.parent / "index.md"
        build_index_md(repos, str(index_path))
        print(f"Wrote index: {index_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

