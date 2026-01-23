#!/usr/bin/env python3
"""
Maintain a human-readable, append-only achievement log for a synthesis plan.

Why:
- The run generates many artifacts; this gives a single chronological narrative.
- Entries are backed by a compact JSON metrics snapshot embedded in an HTML comment,
  so we can compute deltas deterministically without parsing markdown tables.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
from pathlib import Path


METRICS_RE = re.compile(r"<!--\\s*metrics:(.+?)-->", re.DOTALL)


def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def write_text(p: Path, text: str) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")


def load_latest_metrics(*, synth_plan: Path) -> dict:
    latest = synth_plan / "artifacts" / "telemetry-latest.json"
    if latest.exists():
        try:
            return json.loads(read_text(latest))
        except Exception:
            return {}
    return {}


def last_metrics_from_log(text: str) -> dict | None:
    matches = METRICS_RE.findall(text)
    if not matches:
        return None
    raw = matches[-1].strip()
    try:
        return json.loads(raw)
    except Exception:
        return None


def fmt_delta(cur: int, prev: int) -> str:
    d = cur - prev
    if d == 0:
        return "0"
    sign = "+" if d > 0 else ""
    return f"{sign}{d}"


def ensure_header(path: Path) -> None:
    if path.exists():
        return
    write_text(
        path,
        "\n".join(
            [
                "---",
                "status: active",
                "owner: agents",
                "last_reviewed: 2025-12-29",
                "---",
                "",
                "# 🧾 Achievement Log (append-only)",
                "",
                "This file is a single chronological narrative of what the feature research run achieved.",
                "",
                "Rules:",
                "- Append-only (don’t rewrite history; add a new entry if something changes).",
                "- Each entry embeds a compact metrics snapshot so deltas are deterministic.",
                "",
                "Generated/maintained by:",
                "- `docs/.blackbox/scripts/research/update_achievement_log.py`",
                "- typically called from `docs/.blackbox/scripts/validate-loop.sh`",
                "",
                "---",
                "",
            ]
        )
        + "\n",
    )


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True, help="Path to synthesis plan (docs/.blackbox/.plans/<synth>).")
    ap.add_argument("--write", action="store_true", help="Write/update achievement log (otherwise print planned entry).")
    ap.add_argument("--note", default="", help="Optional short note (e.g., tranche topic).")
    args = ap.parse_args()

    synth = Path(args.synth_plan)
    log_path = synth / "artifacts" / "achievement-log.md"
    ensure_header(log_path)

    text = read_text(log_path)
    prev = last_metrics_from_log(text) or {}
    cur = load_latest_metrics(synth_plan=synth) or {}

    # If no telemetry exists yet, don’t spam entries.
    if not cur:
        return 0

    prev_kpis = (prev.get("kpis") or {}) if isinstance(prev, dict) else {}
    cur_kpis = (cur.get("kpis") or {}) if isinstance(cur, dict) else {}

    # Skip if totals didn’t change (prevents log spam on every monitor tick).
    key_fields = ["competitors_total", "oss_repos_json", "thin_slices", "tranche_reports", "license_reports"]
    if all(int(cur_kpis.get(k, 0)) == int(prev_kpis.get(k, 0)) for k in key_fields):
        return 0

    ts = str(cur.get("ts_utc") or dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"))
    run_idx = int(cur.get("run_index") or 0)
    note = args.note.strip()
    note_line = f" — {note}" if note else ""

    entry_lines: list[str] = []
    entry_lines += [
        f"## {ts}{note_line}",
        "",
        f"- 🧾 monitor run: `{run_idx}`",
        "",
        "### KPI deltas (since last entry)",
        "",
        f"- 🏪 competitors_total: `{cur_kpis.get('competitors_total', 0)}` ({fmt_delta(int(cur_kpis.get('competitors_total', 0)), int(prev_kpis.get('competitors_total', 0)))})",
        f"- 🧰 oss_repos_json: `{cur_kpis.get('oss_repos_json', 0)}` ({fmt_delta(int(cur_kpis.get('oss_repos_json', 0)), int(prev_kpis.get('oss_repos_json', 0)))})",
        f"- 🧱 thin_slices: `{cur_kpis.get('thin_slices', 0)}` ({fmt_delta(int(cur_kpis.get('thin_slices', 0)), int(prev_kpis.get('thin_slices', 0)))})",
        f"- 🧾 tranche_reports: `{cur_kpis.get('tranche_reports', 0)}` ({fmt_delta(int(cur_kpis.get('tranche_reports', 0)), int(prev_kpis.get('tranche_reports', 0)))})",
        f"- ⚖️ license_reports: `{cur_kpis.get('license_reports', 0)}` ({fmt_delta(int(cur_kpis.get('license_reports', 0)), int(prev_kpis.get('license_reports', 0)))})",
        "",
        "<!-- metrics:" + json.dumps(cur, sort_keys=True) + " -->",
        "",
    ]

    entry = "\n".join(entry_lines) + "\n"

    if args.write:
        write_text(log_path, text.rstrip() + "\n\n" + entry)
    else:
        print(entry)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

