#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path


def norm(s: str) -> str:
    return (s or "").strip().lower()


def main() -> int:
    ap = argparse.ArgumentParser(description="Stamp auditor/session_id/blocked onto scorecard rows for a store.")
    ap.add_argument("--scorecard", required=True, help="Path to scorecard.csv")
    ap.add_argument("--store", required=True, help="Store name (matches scorecard 'store' column, case-insensitive).")
    ap.add_argument("--auditor", default="", help="Value for 'auditor' column.")
    ap.add_argument("--session-id", default="", help="Value for 'session_id' column.")
    ap.add_argument("--blocked", default="", help="Set blocked to yes|no (or leave blank).")
    ap.add_argument(
        "--devices",
        default="desktop,mobile",
        help="Comma-separated devices to update (default: desktop,mobile).",
    )
    args = ap.parse_args()

    p = Path(args.scorecard)
    if not p.exists():
        raise SystemExit(f"Not found: {p}")

    target_store = norm(args.store)
    devices = {norm(x) for x in args.devices.split(",") if norm(x)}
    blocked = norm(args.blocked)
    if blocked and blocked not in {"yes", "no"}:
        raise SystemExit("--blocked must be yes|no (or empty)")

    with p.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        rows = list(reader)

    required_cols = {"store", "device"}
    missing = [c for c in required_cols if c not in fieldnames]
    if missing:
        raise SystemExit(f"Scorecard missing required columns: {', '.join(missing)}")

    updated = 0
    for r in rows:
        if norm(r.get("store", "")) != target_store:
            continue
        if norm(r.get("device", "")) not in devices:
            continue
        if args.auditor:
            r["auditor"] = args.auditor
        if args.session_id:
            r["session_id"] = args.session_id
        if args.blocked != "":
            r["blocked"] = args.blocked
        updated += 1

    if updated == 0:
        print("WARN: no rows updated (check store name and devices)", file=sys.stderr)

    with p.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow({k: r.get(k, "") for k in fieldnames})

    print(f"Updated {updated} row(s) in {p}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

