#!/usr/bin/env python3
"""
Update Feature Research Progress Dashboard KPIs.

Writes an auto-generated KPI section into:
  <synth-plan>/artifacts/progress-dashboard.md

No third-party dependencies.
"""

from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


AUTO_START = "<!-- AUTO-GENERATED: kpis start -->"
AUTO_END = "<!-- AUTO-GENERATED: kpis end -->"


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


def count_files(glob_path: Path) -> int:
    return len(list(glob_path.parent.glob(glob_path.name)))


def count_md_entries(dir_path: Path) -> int:
    if not dir_path.exists():
        return 0
    return len([p for p in dir_path.iterdir() if p.is_file() and p.suffix.lower() == ".md"])


def count_json_entries(dir_path: Path) -> int:
    if not dir_path.exists():
        return 0
    return len([p for p in dir_path.iterdir() if p.is_file() and p.suffix.lower() == ".json"])


def count_competitor_entries(plan_path: Path) -> int:
    return count_md_entries(plan_path / "competitors" / "entries")


def count_oss_entries(plan_path: Path) -> tuple[int, int]:
    entries = plan_path / "oss" / "entries"
    return (count_json_entries(entries), count_md_entries(entries))


def count_thin_slices(synth_plan: Path) -> int:
    thin = synth_plan / "artifacts" / "thin-slices"
    if not thin.exists():
        return 0
    return len([p for p in thin.iterdir() if p.is_file() and p.suffix.lower() == ".md" and p.name.lower() != "readme.md"])


def count_tranche_reports(synth_plan: Path) -> int:
    artifacts = synth_plan / "artifacts"
    if not artifacts.exists():
        return 0
    return len(list(artifacts.glob("live-web-research-tranche-*.md"))) + len(list(artifacts.glob("live-github-research-tranche-*.md")))


def count_license_reports(synth_plan: Path) -> int:
    artifacts = synth_plan / "artifacts"
    if not artifacts.exists():
        return 0
    return len(list(artifacts.glob("license-verification-*.md")))


def replace_auto_section(full_text: str, new_block: str) -> str:
    if AUTO_START not in full_text or AUTO_END not in full_text:
        raise ValueError("progress-dashboard.md missing AUTO-GENERATED KPI markers")
    before, rest = full_text.split(AUTO_START, 1)
    _, after = rest.split(AUTO_END, 1)
    return before + AUTO_START + "\n" + new_block.rstrip() + "\n" + AUTO_END + after


def parse_targets_from_config(cfg_text: str) -> dict[str, int]:
    """
    Extracts integer targets from a simple YAML-like block:

    targets:
      competitors: 100
      oss_repos: 20
      thin_slices: 10

    This is intentionally minimal (no full YAML parser).
    """
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
        # Stop when indentation returns to the same or less than targets:
        cur_indent = len(raw) - len(raw.lstrip(" "))
        if cur_indent <= targets_indent:
            break
        m = re.match(r"^\s*([a-zA-Z0-9_]+):\s*([0-9]+)\s*(?:#.*)?$", raw)
        if not m:
            continue
        key = m.group(1).strip()
        val = int(m.group(2))
        targets[key] = val
    return targets


def build_kpi_block(*, synth_plan: Path, steps: StepPlans) -> str:
    core_competitors = count_competitor_entries(steps.step02)
    adjacent_competitors = count_competitor_entries(steps.step03)
    total_competitors = core_competitors + adjacent_competitors

    oss_json, oss_md = count_oss_entries(steps.step04)
    thin_slices = count_thin_slices(synth_plan)

    tranche_reports = count_tranche_reports(synth_plan)
    license_reports = count_license_reports(synth_plan)

    # Ops artifacts (best-effort)
    telemetry_latest = synth_plan / "artifacts" / "telemetry-latest.json"
    telemetry_latest_md = synth_plan / "artifacts" / "telemetry-latest.md"
    telemetry_tail_md = synth_plan / "artifacts" / "telemetry-tail.md"
    achievement_log = synth_plan / "artifacts" / "achievement-log.md"
    gaps_report = synth_plan / "artifacts" / "gaps-report.md"
    next_actions = synth_plan / "artifacts" / "next-actions.md"
    tranche_audit = synth_plan / "artifacts" / "tranche-audit-status.md"
    review_status = synth_plan / "context" / "reviews" / "review-status.md"

    # Targets (defaults, but can be overridden in artifacts/feature-research-config.yaml under `targets:`)
    target_competitors = 100
    target_oss_json = 20
    target_thin_slices = 10

    cfg = synth_plan / "artifacts" / "feature-research-config.yaml"
    if cfg.exists():
        try:
            cfg_targets = parse_targets_from_config(read_text(cfg))
            target_competitors = int(cfg_targets.get("competitors", target_competitors))
            target_oss_json = int(cfg_targets.get("oss_repos", target_oss_json))
            target_thin_slices = int(cfg_targets.get("thin_slices", target_thin_slices))
        except Exception:
            # Keep defaults on any parsing issues.
            pass

    def pct(current: int, target: int) -> str:
        if target <= 0:
            return "n/a"
        return f"{min(100, round((current / target) * 100))}%"

    return "\n".join(
        [
            "## 📌 KPIs (auto-generated)",
            "",
            "### Targets (simple defaults)",
            "",
            f"- 🏪 competitors: `{target_competitors}`",
            f"- 🧰 OSS repos (metadata): `{target_oss_json}`",
            f"- 🧱 thin slices: `{target_thin_slices}`",
            "",
            "### Current",
            "",
            f"- 🏪 Competitors deepened: `{total_competitors}` / `{target_competitors}` ({pct(total_competitors, target_competitors)}) (core `{core_competitors}`, adjacent `{adjacent_competitors}`)",
            f"- 🧰 OSS entries: `{oss_json}` / `{target_oss_json}` ({pct(oss_json, target_oss_json)}) JSON metadata + `{oss_md}` MD notes",
            f"- 🧱 Thin slice specs: `{thin_slices}` / `{target_thin_slices}` ({pct(thin_slices, target_thin_slices)})",
            f"- 🧾 Tranche reports: `{tranche_reports}`",
            f"- ⚖️ License verification reports: `{license_reports}`",
            "",
            "### Ops signals",
            "",
            f"- 🧾 achievement log: `{'present' if achievement_log.exists() else 'missing'}` (`{achievement_log}`)",
            f"- 📈 telemetry latest: `{'present' if telemetry_latest.exists() else 'missing'}` (`{telemetry_latest}`)",
            f"- 📝 telemetry latest (md): `{'present' if telemetry_latest_md.exists() else 'missing'}` (`{telemetry_latest_md}`)",
            f"- 🗂️ telemetry tail (md): `{'present' if telemetry_tail_md.exists() else 'missing'}` (`{telemetry_tail_md}`)",
            f"- 🕵️ gaps report: `{'present' if gaps_report.exists() else 'missing'}` (`{gaps_report}`)",
            f"- ✅ next actions: `{'present' if next_actions.exists() else 'missing'}` (`{next_actions}`)",
            f"- 🧪 tranche audit status: `{'present' if tranche_audit.exists() else 'missing'}` (`{tranche_audit}`)",
            f"- 🧠 compaction review status: `{'present' if review_status.exists() else 'missing'}` (`{review_status}`)",
            "",
            "Regenerate:",
            "```bash",
            f"python3 .blackbox/scripts/research/update_progress_dashboard.py --synth-plan {synth_plan} --write",
            "```",
        ]
    )


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True, help="Path to synthesis plan (docs/.blackbox/.plans/<synth>).")
    ap.add_argument("--write", action="store_true", help="Write updated dashboard (otherwise print).")
    args = ap.parse_args()

    synth_plan = Path(args.synth_plan)
    sources = synth_plan / "artifacts" / "sources.md"
    dash = synth_plan / "artifacts" / "progress-dashboard.md"

    if not sources.exists():
        raise SystemExit(f"Missing: {sources}")
    if not dash.exists():
        raise SystemExit(f"Missing: {dash}")

    steps = extract_step_plans_from_sources(read_text(sources))
    kpi_block = build_kpi_block(synth_plan=synth_plan, steps=steps)

    updated = replace_auto_section(read_text(dash), kpi_block)

    if args.write:
        dash.write_text(updated, encoding="utf-8")
        print(f"Wrote: {dash}")
    else:
        print(updated)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
