#!/usr/bin/env python3
"""
Collect feature-research metrics for a synthesis plan.

Outputs a single JSON object to stdout (one line), suitable for JSONL logging.
No third-party dependencies.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class StepPlans:
    step01: Path
    step02: Path
    step03: Path
    step04: Path


def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def extract_step_plans_from_sources(sources_md: str) -> StepPlans:
    def grab(step: str) -> str:
        m = re.search(rf"^- Step {step} plan:\s*`([^`]+)`\s*$", sources_md, re.MULTILINE)
        if not m:
            raise ValueError(f"Missing Step {step} plan in sources.md")
        return m.group(1).strip()

    return StepPlans(
        step01=Path(grab("01")),
        step02=Path(grab("02")),
        step03=Path(grab("03")),
        step04=Path(grab("04")),
    )


def count_dir_files(dir_path: Path, *, suffix: str) -> int:
    if not dir_path.exists():
        return 0
    return len([p for p in dir_path.iterdir() if p.is_file() and p.suffix.lower() == suffix.lower()])


def count_step_files(plan_path: Path) -> int:
    steps = plan_path / "context" / "steps"
    if not steps.exists():
        return 0
    return len([p for p in steps.iterdir() if p.is_file() and p.suffix.lower() == ".md" and p.name.lower() != "readme.md"])


def count_compactions(plan_path: Path) -> int:
    comps = plan_path / "context" / "compactions"
    if not comps.exists():
        return 0
    return len([p for p in comps.iterdir() if p.is_file() and p.suffix.lower() == ".md" and p.name.lower() != "readme.md"])


def count_reviews(plan_path: Path) -> int:
    reviews = plan_path / "context" / "reviews"
    if not reviews.exists():
        return 0
    return len([p for p in reviews.iterdir() if p.is_file() and p.name.startswith("review-") and p.suffix.lower() == ".md"])


def expected_review_count(compactions: int) -> int:
    return compactions // 10


def parse_targets_from_config(cfg_text: str) -> dict[str, int]:
    targets: dict[str, int] = {}
    lines = cfg_text.splitlines()
    in_targets = False
    targets_indent = 0
    for raw in lines:
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        if not in_targets:
            m = re.match(r"^(\s*)targets:\s*$", raw)
            if m:
                in_targets = True
                targets_indent = len(m.group(1))
            continue
        cur_indent = len(raw) - len(raw.lstrip(" "))
        if cur_indent <= targets_indent:
            break
        m = re.match(r"^\s*([a-zA-Z0-9_]+):\s*([0-9]+)\s*(?:#.*)?$", raw)
        if not m:
            continue
        targets[m.group(1).strip()] = int(m.group(2))
    return targets


def parse_frontmatter_value(text: str, key: str) -> str | None:
    # naive: key: value, anywhere
    m = re.search(rf"^\s*{re.escape(key)}:\s*(.+?)\s*$", text, re.MULTILINE)
    if not m:
        return None
    raw = m.group(1).strip()
    if raw.startswith('"') and raw.endswith('"') and len(raw) >= 2:
        raw = raw[1:-1]
    return raw.strip()


def count_tranche_reports(synth_plan: Path) -> int:
    art = synth_plan / "artifacts"
    if not art.exists():
        return 0
    return len(list(art.glob("live-web-research-tranche-*.md"))) + len(list(art.glob("live-github-research-tranche-*.md")))


def count_license_reports(synth_plan: Path) -> int:
    art = synth_plan / "artifacts"
    if not art.exists():
        return 0
    return len(list(art.glob("license-verification-*.md")))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True, help="Path to synthesis plan (docs/.blackbox/.plans/<synth>).")
    ap.add_argument("--ts-utc", default="", help="UTC timestamp (ISO) from monitor loop (optional).")
    ap.add_argument("--run-index", type=int, default=0, help="Monitor iteration index (optional).")
    ap.add_argument("--validate-ok", default="", help="validate-loop ok=true/false (optional).")
    ap.add_argument("--feature-ok", default="", help="feature health ok=true/false (optional).")
    args = ap.parse_args()

    synth = Path(args.synth_plan)
    sources = synth / "artifacts" / "sources.md"
    if not sources.exists():
        raise SystemExit(f"Missing: {sources}")

    steps = extract_step_plans_from_sources(read_text(sources))

    competitors_core = count_dir_files(steps.step02 / "competitors" / "entries", suffix=".md")
    competitors_adj = count_dir_files(steps.step03 / "competitors" / "entries", suffix=".md")
    competitors_total = competitors_core + competitors_adj

    oss_json = count_dir_files(steps.step04 / "oss" / "entries", suffix=".json")
    thin_slices = count_dir_files(synth / "artifacts" / "thin-slices", suffix=".md") - (1 if (synth / "artifacts" / "thin-slices" / "README.md").exists() else 0)

    tranche_reports = count_tranche_reports(synth)
    license_reports = count_license_reports(synth)

    # Targets (optional)
    targets: dict[str, int] = {}
    cfg = synth / "artifacts" / "feature-research-config.yaml"
    if cfg.exists():
        try:
            targets = parse_targets_from_config(read_text(cfg))
        except Exception:
            targets = {}

    # Memory cadence metrics
    mem = {
        "step01_steps": count_step_files(steps.step01),
        "step02_steps": count_step_files(steps.step02),
        "step03_steps": count_step_files(steps.step03),
        "step04_steps": count_step_files(steps.step04),
        "synth_steps": count_step_files(synth),
        "synth_compactions": count_compactions(synth),
        "synth_reviews": count_reviews(synth),
    }
    mem["synth_reviews_expected"] = expected_review_count(int(mem["synth_compactions"]))

    # Ops signals (optional artifacts)
    tranche_audit = synth / "artifacts" / "tranche-audit-status.md"
    tranche_audit_sig = {}
    if tranche_audit.exists():
        t = read_text(tranche_audit)
        tranche_audit_sig = {
            "updated_at_utc": parse_frontmatter_value(t, "updated_at_utc") or "",
            "draft_like_tranches_count": int(parse_frontmatter_value(t, "draft_like_tranches_count") or "0"),
            "min_delta_exit_code": int(parse_frontmatter_value(t, "min_delta_exit_code") or "0"),
        }

    now_utc = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    ts_utc = args.ts_utc.strip() or now_utc

    payload = {
        "ts_utc": ts_utc,
        "run_index": int(args.run_index),
        "validate_ok": args.validate_ok,
        "feature_ok": args.feature_ok,
        "paths": {
            "synth_plan": str(synth),
            "step01_plan": str(steps.step01),
            "step02_plan": str(steps.step02),
            "step03_plan": str(steps.step03),
            "step04_plan": str(steps.step04),
        },
        "targets": targets,
        "kpis": {
            "competitors_core": competitors_core,
            "competitors_adjacent": competitors_adj,
            "competitors_total": competitors_total,
            "oss_repos_json": oss_json,
            "thin_slices": thin_slices,
            "tranche_reports": tranche_reports,
            "license_reports": license_reports,
        },
        "memory": mem,
        "ops": {
            "tranche_audit": tranche_audit_sig,
        },
    }

    print(json.dumps(payload, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

