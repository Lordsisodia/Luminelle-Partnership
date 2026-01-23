#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any


def load_json(path: Path) -> Any:
    return json.loads(path.read_text("utf-8"))


def main() -> int:
    ap = argparse.ArgumentParser(description="Merge license verification JSON outputs into a single overrides map.")
    ap.add_argument("--overrides", required=True, help="Existing overrides JSON to update (in-place).")
    ap.add_argument("--reports", required=True, nargs="+", help="One or more report JSON files to merge in.")
    ap.add_argument("--dry-run", action="store_true", help="Print changes but do not write.")
    args = ap.parse_args()

    overrides_path = Path(args.overrides)
    overrides: dict[str, str] = {}
    if overrides_path.exists():
        overrides = load_json(overrides_path)
    if not isinstance(overrides, dict):
        raise SystemExit("Overrides file must be a JSON object mapping owner/repo -> SPDX.")

    changes: list[tuple[str, str, str]] = []

    for rp in args.reports:
        p = Path(rp)
        data = load_json(p)
        if not isinstance(data, list):
            raise SystemExit(f"Report must be a JSON list: {p}")
        for row in data:
            if not isinstance(row, dict):
                continue
            full = row.get("full_name") or row.get("full") or row.get("repo") or ""
            full = str(full).strip()
            if not full or "/" not in full:
                continue
            guess = row.get("spdx_guess") or row.get("guess") or ""
            guess = str(guess).strip()
            if not guess or guess == "UNKNOWN":
                continue
            prev = overrides.get(full)
            if prev != guess:
                changes.append((full, prev or "", guess))
                overrides[full] = guess

    if args.dry_run:
        for full, prev, new in changes:
            print(f"{full}: {prev or '(none)'} -> {new}")
        print(f"Would update {len(changes)} entries.")
        return 0

    overrides_path.parent.mkdir(parents=True, exist_ok=True)
    overrides_path.write_text(json.dumps(overrides, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Updated overrides: {overrides_path}")
    print(f"Changes applied: {len(changes)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

