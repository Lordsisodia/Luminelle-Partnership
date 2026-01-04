#!/usr/bin/env python3
from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path


def main() -> int:
    ap = argparse.ArgumentParser(description="Create a lightweight audit session log entry and return the session id.")
    ap.add_argument("--plan-artifacts-dir", required=True, help="Plan artifacts directory.")
    ap.add_argument("--auditor", required=True, help="Auditor name/handle.")
    ap.add_argument("--notes", default="", help="Optional session notes.")
    args = ap.parse_args()

    artifacts = Path(args.plan_artifacts_dir)
    artifacts.mkdir(parents=True, exist_ok=True)
    log_path = artifacts / "audit-sessions.md"

    ts = datetime.now().strftime("%Y-%m-%d %H:%M")
    session_id = datetime.now().strftime("%Y%m%d-%H%M")

    line = f"- {ts} — session_id: `{session_id}` — auditor: `{args.auditor}`"
    if args.notes.strip():
        line += f" — notes: {args.notes.strip()}"

    if log_path.exists():
        existing = log_path.read_text("utf-8", errors="replace")
    else:
        existing = "# Audit Sessions (append-only)\n\n"
    if not existing.endswith("\n"):
        existing += "\n"
    existing += line + "\n"
    log_path.write_text(existing, encoding="utf-8")

    print(session_id)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

