#!/usr/bin/env python3
"""
Render feature-research telemetry into markdown for easy “ask the agent what we did”.

Inputs (in synth plan artifacts):
- telemetry-latest.json (single JSON snapshot)
- telemetry.jsonl (append-only timeline, optional)

Outputs:
- telemetry-latest.md (human summary)
- telemetry-tail.md (last N snapshots summarized)

No third-party dependencies.
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path


def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def write_text(p: Path, text: str) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")


def load_json(p: Path) -> dict:
    return json.loads(read_text(p))


def safe_int(v, default: int = 0) -> int:
    try:
        return int(v)
    except Exception:
        return default


def fmt_boolish(v) -> str:
    s = str(v).strip().lower()
    if s in {"true", "1", "yes"}:
        return "✅ true"
    if s in {"false", "0", "no"}:
        return "❌ false"
    return f"⚪ {v}"


def md_latest(snapshot: dict, *, synth_plan: Path) -> str:
    kpis = snapshot.get("kpis") or {}
    targets = snapshot.get("targets") or {}
    memory = snapshot.get("memory") or {}
    ops = snapshot.get("ops") or {}
    tranche_audit = (ops.get("tranche_audit") or {}) if isinstance(ops, dict) else {}

    def pct(cur: int, tgt: int) -> str:
        if tgt <= 0:
            return "n/a"
        return f"{min(100, round((cur / tgt) * 100))}%"

    comp_total = safe_int(kpis.get("competitors_total"))
    oss_total = safe_int(kpis.get("oss_repos_json"))
    thin_total = safe_int(kpis.get("thin_slices"))
    tranche_total = safe_int(kpis.get("tranche_reports"))
    lic_total = safe_int(kpis.get("license_reports"))

    tgt_comp = safe_int(targets.get("competitors", 100))
    tgt_oss = safe_int(targets.get("oss_repos", 20))
    tgt_thin = safe_int(targets.get("thin_slices", 10))

    s = []
    s += [
        "---",
        "status: active",
        f"updated_at_utc: {snapshot.get('ts_utc', '')}",
        f"run_index: {snapshot.get('run_index', 0)}",
        "---",
        "",
        "# 📈 Telemetry (latest snapshot)",
        "",
        "This file is auto-generated so humans (and agents) can quickly answer:",
        "- “What did we do?”",
        "- “What changed since last hour?”",
        "- “Are we on track vs targets?”",
        "",
        "## ✅ Health",
        "",
        f"- validate_ok: {fmt_boolish(snapshot.get('validate_ok', ''))}",
        f"- feature_ok: {fmt_boolish(snapshot.get('feature_ok', ''))}",
        "",
        "## 🎯 KPIs vs targets",
        "",
        f"- 🏪 competitors_total: `{comp_total}` / `{tgt_comp}` ({pct(comp_total, tgt_comp)})",
        f"- 🧰 oss_repos_json: `{oss_total}` / `{tgt_oss}` ({pct(oss_total, tgt_oss)})",
        f"- 🧱 thin_slices: `{thin_total}` / `{tgt_thin}` ({pct(thin_total, tgt_thin)})",
        f"- 🧾 tranche_reports: `{tranche_total}`",
        f"- ⚖️ license_reports: `{lic_total}`",
        "",
        "## 🧠 Memory cadence",
        "",
        f"- step files (01/02/03/04/synth): `{safe_int(memory.get('step01_steps'))}` / `{safe_int(memory.get('step02_steps'))}` / `{safe_int(memory.get('step03_steps'))}` / `{safe_int(memory.get('step04_steps'))}` / `{safe_int(memory.get('synth_steps'))}`",
        f"- synth compactions: `{safe_int(memory.get('synth_compactions'))}`",
        f"- synth reviews present/expected: `{safe_int(memory.get('synth_reviews'))}` / `{safe_int(memory.get('synth_reviews_expected'))}`",
        "",
        "## 🧪 Tranche audit (anti-drift)",
        "",
        f"- draft_like_tranches_count: `{safe_int(tranche_audit.get('draft_like_tranches_count'))}`",
        f"- min_delta_exit_code: `{safe_int(tranche_audit.get('min_delta_exit_code'))}` (0 = OK)",
        f"- tranche_audit_updated_at_utc: `{tranche_audit.get('updated_at_utc', '')}`",
        "",
        "## 🔗 Where to look next",
        "",
        f"- 🧾 achievement log: `{(synth_plan / 'artifacts' / 'achievement-log.md').as_posix()}`",
        f"- 📊 progress dashboard: `{(synth_plan / 'artifacts' / 'progress-dashboard.md').as_posix()}`",
        f"- 🧪 tranche audit status: `{(synth_plan / 'artifacts' / 'tranche-audit-status.md').as_posix()}`",
        "",
        "## 🗂️ Raw data",
        "",
        f"- telemetry latest json: `{(synth_plan / 'artifacts' / 'telemetry-latest.json').as_posix()}`",
        f"- telemetry jsonl: `{(synth_plan / 'artifacts' / 'telemetry.jsonl').as_posix()}`",
        "",
    ]
    return "\n".join(s) + "\n"


@dataclass(frozen=True)
class TailRow:
    ts_utc: str
    run_index: int
    competitors_total: int
    oss_repos_json: int
    thin_slices: int
    validate_ok: str
    feature_ok: str


def parse_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    rows: list[dict] = []
    for line in read_text(path).splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            rows.append(json.loads(line))
        except Exception:
            continue
    return rows


def md_tail(rows: list[dict], *, synth_plan: Path, last_n: int) -> str:
    rows = rows[-last_n:]
    items: list[TailRow] = []
    for r in rows:
        k = r.get("kpis") or {}
        items.append(
            TailRow(
                ts_utc=str(r.get("ts_utc", "")),
                run_index=safe_int(r.get("run_index", 0)),
                competitors_total=safe_int(k.get("competitors_total", 0)),
                oss_repos_json=safe_int(k.get("oss_repos_json", 0)),
                thin_slices=safe_int(k.get("thin_slices", 0)),
                validate_ok=str(r.get("validate_ok", "")),
                feature_ok=str(r.get("feature_ok", "")),
            )
        )

    lines: list[str] = []
    lines += [
        "---",
        "status: active",
        "---",
        "",
        "# 🧾 Telemetry (tail)",
        "",
        f"Last `{len(items)}` telemetry snapshots from:",
        f"- `{(synth_plan / 'artifacts' / 'telemetry.jsonl').as_posix()}`",
        "",
        "| ts_utc | run | validate_ok | feature_ok | competitors | oss | thin_slices |",
        "| --- | ---: | --- | --- | ---: | ---: | ---: |",
    ]
    for it in items:
        lines.append(
            f"| `{it.ts_utc}` | `{it.run_index}` | `{it.validate_ok}` | `{it.feature_ok}` | `{it.competitors_total}` | `{it.oss_repos_json}` | `{it.thin_slices}` |"
        )
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True, help="Path to synthesis plan (docs/.blackbox/.plans/<synth>).")
    ap.add_argument("--last-n", type=int, default=20, help="How many telemetry snapshots to include in tail MD.")
    ap.add_argument("--write", action="store_true", help="Write markdown files (otherwise print latest MD).")
    args = ap.parse_args()

    synth = Path(args.synth_plan)
    art = synth / "artifacts"
    latest_json = art / "telemetry-latest.json"
    jsonl = art / "telemetry.jsonl"

    if not latest_json.exists():
        raise SystemExit(f"Missing: {latest_json}")

    snap = load_json(latest_json)
    latest_md = md_latest(snap, synth_plan=synth)
    tail_md = md_tail(parse_jsonl(jsonl), synth_plan=synth, last_n=max(1, args.last_n))

    if args.write:
        write_text(art / "telemetry-latest.md", latest_md)
        write_text(art / "telemetry-tail.md", tail_md + "\n")
        return 0

    print(latest_md)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

