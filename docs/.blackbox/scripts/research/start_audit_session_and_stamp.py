#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import sys
from datetime import datetime
from pathlib import Path


def norm(s: str) -> str:
    return (s or "").strip()


def norm_key(s: str) -> str:
    return norm(s).lower()


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Create an audit session (append-only log) and stamp auditor/session_id onto scorecard rows for given stores."
    )
    ap.add_argument("--plan-artifacts-dir", required=True, help="Plan artifacts directory (writes audit-sessions.md).")
    ap.add_argument("--scorecard", required=True, help="Path to scorecard.csv to update.")
    ap.add_argument("--auditor", required=True, help="Auditor name/handle.")
    ap.add_argument("--stores", required=True, help="Comma-separated store names (must match scorecard store names).")
    ap.add_argument("--notes", default="", help="Optional session notes.")
    ap.add_argument("--blocked", default="", help="Optional: set blocked yes|no for stamped rows.")
    args = ap.parse_args()

    artifacts = Path(args.plan_artifacts_dir)
    artifacts.mkdir(parents=True, exist_ok=True)
    scorecard = Path(args.scorecard)
    if not scorecard.exists():
        raise SystemExit(f"Not found: {scorecard}")

    blocked = norm_key(args.blocked)
    if blocked and blocked not in {"yes", "no"}:
        raise SystemExit("--blocked must be yes|no (or empty)")

    # 1) Create a session log entry
    ts = datetime.now().strftime("%Y-%m-%d %H:%M")
    session_id = datetime.now().strftime("%Y%m%d-%H%M")
    log_path = artifacts / "audit-sessions.md"

    line = f"- {ts} — session_id: `{session_id}` — auditor: `{args.auditor}`"
    if norm(args.notes):
        line += f" — notes: {norm(args.notes)}"

    if log_path.exists():
        existing = log_path.read_text("utf-8", errors="replace")
    else:
        existing = "# Audit Sessions (append-only)\n\n"
    if not existing.endswith("\n"):
        existing += "\n"
    existing += line + "\n"
    log_path.write_text(existing, encoding="utf-8")

    # 2) Stamp rows in scorecard
    target_stores = {norm_key(s) for s in args.stores.split(",") if norm_key(s)}
    if not target_stores:
        raise SystemExit("No stores provided.")

    with scorecard.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        rows = list(reader)

    for col in ["store", "device", "auditor", "session_id"]:
        if col not in fieldnames:
            raise SystemExit(f"Scorecard missing required column: {col}")

    updated = 0
    missing: set[str] = set(target_stores)
    for r in rows:
        store = norm_key(r.get("store", ""))
        if store not in target_stores:
            continue
        missing.discard(store)
        r["auditor"] = args.auditor
        r["session_id"] = session_id
        if args.blocked != "":
            r["blocked"] = args.blocked
        updated += 1

    with scorecard.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow({k: r.get(k, "") for k in fieldnames})

    if missing:
        print(f"WARN: stores not found in scorecard: {', '.join(sorted(missing))}", file=sys.stderr)

    print(session_id)
    print(f"Stamped {updated} row(s) in {scorecard}")
    print(f"Appended session to {log_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

