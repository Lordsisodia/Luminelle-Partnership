#!/usr/bin/env python3
"""
Feature Research Run Status (4 agents + synthesis)

Given a synthesis plan folder, summarize:
- decisions (target user, license policy)
- artifact presence + size + mtime for each plan
- memory step/compaction cadence (how many step files)

No third-party dependencies.
"""

from __future__ import annotations

import argparse
import datetime as dt
import os
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class PlanSpec:
    label: str
    plan_path: Path
    required_artifacts: tuple[str, ...]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_value(key: str, yaml_text: str) -> str | None:
    m = re.search(rf"^\s*{re.escape(key)}:\s*(.+?)\s*$", yaml_text, re.MULTILINE)
    if not m:
        return None
    raw = m.group(1).strip()
    if "#" in raw:
        raw = raw.split("#", 1)[0].strip()
    if raw.startswith('"') and raw.endswith('"') and len(raw) >= 2:
        raw = raw[1:-1]
    return raw.strip()


def extract_step_plan_paths_from_sources(sources_md: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for step_num in ("01", "02", "03", "04"):
        m = re.search(rf"^- Step {step_num} plan:\s*`([^`]+)`\s*$", sources_md, re.MULTILINE)
        if m:
            out[step_num] = m.group(1).strip()
    return out


def fmt_dt(ts: float) -> str:
    # local time, short
    return dt.datetime.fromtimestamp(ts).strftime("%Y-%m-%d %H:%M")


def fmt_bytes(n: int) -> str:
    if n < 1024:
        return f"{n} B"
    if n < 1024 * 1024:
        return f"{n / 1024:.1f} KB"
    return f"{n / (1024 * 1024):.1f} MB"


def file_info(path: Path) -> tuple[str, str]:
    """
    Returns (size_str, mtime_str). If missing, returns ("MISSING", "").
    """
    if not path.exists():
        return ("MISSING", "")
    st = path.stat()
    return (fmt_bytes(st.st_size), fmt_dt(st.st_mtime))


def count_step_files(plan_path: Path) -> int:
    steps_dir = plan_path / "context" / "steps"
    if not steps_dir.exists():
        return 0
    return len(
        [
            p
            for p in steps_dir.iterdir()
            if p.is_file() and p.suffix == ".md" and p.name.lower() != "readme.md"
        ]
    )


def count_compactions(plan_path: Path) -> int:
    # We don’t assume exact naming; count any markdown files under context/compactions if it exists.
    comp_dir = plan_path / "context" / "compactions"
    if not comp_dir.exists():
        return 0
    return len(
        [
            p
            for p in comp_dir.iterdir()
            if p.is_file() and p.suffix == ".md" and p.name.lower() != "readme.md"
        ]
    )


def load_decisions(plan_path: Path) -> dict[str, str]:
    cfg = plan_path / "artifacts" / "feature-research-config.yaml"
    if not cfg.exists():
        return {}
    txt = read_text(cfg)
    return {
        "target_user_first": parse_value("target_user_first", txt) or "",
        "license_policy": parse_value("license_policy", txt) or "",
    }


def load_targets(plan_path: Path) -> dict[str, int]:
    """
    Extract targets from artifacts/feature-research-config.yaml under:

    targets:
      competitors: 100
      oss_repos: 20
      thin_slices: 10

    Conservative line-based parsing (no YAML deps).
    """
    cfg = plan_path / "artifacts" / "feature-research-config.yaml"
    if not cfg.exists():
        return {}
    txt = read_text(cfg)

    targets: dict[str, int] = {}
    lines = txt.splitlines()
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


def pct(current: int, target: int) -> str:
    if target <= 0:
        return "n/a"
    return f"{min(100, round((current / target) * 100))}%"


def count_dir_files(dir_path: Path, *, suffix: str) -> int:
    if not dir_path.exists():
        return 0
    return len([p for p in dir_path.iterdir() if p.is_file() and p.suffix.lower() == suffix.lower()])


def count_competitor_entries(plan_path: Path) -> int:
    return count_dir_files(plan_path / "competitors" / "entries", suffix=".md")


def count_oss_entries_json(plan_path: Path) -> int:
    return count_dir_files(plan_path / "oss" / "entries", suffix=".json")


def count_thin_slices(synth_plan: Path) -> int:
    thin = synth_plan / "artifacts" / "thin-slices"
    if not thin.exists():
        return 0
    return len([p for p in thin.iterdir() if p.is_file() and p.suffix.lower() == ".md" and p.name.lower() != "readme.md"])


def is_tbd(value: str) -> bool:
    return value.strip().upper() in {"", "TBD", "TO BE DETERMINED"}


def count_competitor_seed_entries(text: str) -> int:
    n = 0
    for line in text.splitlines():
        raw = line.strip()
        if not raw or raw.startswith("#"):
            continue
        if "|" not in raw:
            continue
        if "http://" not in raw and "https://" not in raw:
            continue
        n += 1
    return n


def competitor_seed_count(plan_path: Path) -> int | None:
    seeds = plan_path / "artifacts" / "competitor-seeds.txt"
    if not seeds.exists():
        return None
    try:
        return count_competitor_seed_entries(read_text(seeds))
    except Exception:
        return None


def build_specs(step_plans: dict[str, Path], synth_plan: Path) -> list[PlanSpec]:
    return [
        PlanSpec(
            label="Step 01 (features + oss)",
            plan_path=step_plans["01"],
            required_artifacts=(
                "feature-research-config.yaml",
                "start-here.md",
                "features-catalog.md",
                "oss-catalog.md",
                "search-log.md",
                "summary.md",
                "sources.md",
            ),
        ),
        PlanSpec(
            label="Step 02 (competitors core)",
            plan_path=step_plans["02"],
            required_artifacts=(
                "feature-research-config.yaml",
                "start-here.md",
                "competitor-seeds.txt",
                "competitor-matrix.md",
                "summary.md",
                "sources.md",
            ),
        ),
        PlanSpec(
            label="Step 03 (competitors adjacent)",
            plan_path=step_plans["03"],
            required_artifacts=(
                "feature-research-config.yaml",
                "start-here.md",
                "competitor-seeds.txt",
                "competitor-matrix.md",
                "summary.md",
                "sources.md",
            ),
        ),
        PlanSpec(
            label="Step 04 (oss harvesting)",
            plan_path=step_plans["04"],
            required_artifacts=(
                "feature-research-config.yaml",
                "start-here.md",
                "oss-candidates.md",
                "build-vs-buy.md",
                "summary.md",
                "sources.md",
            ),
        ),
        PlanSpec(
            label="Synthesis (agent zero)",
            plan_path=synth_plan,
            required_artifacts=(
                "feature-research-config.yaml",
                "start-here.md",
                "kickoff.md",
                "final-synthesis.md",
                "features-ranked.md",
                "oss-ranked.md",
                "open-questions.md",
                "evidence-index.md",
                "summary.md",
                "sources.md",
            ),
        ),
    ]


def render_status(synth_plan: Path) -> str:
    sources = synth_plan / "artifacts" / "sources.md"
    if not sources.exists():
        raise SystemExit(f"Missing synthesis sources file: {sources}")
    step_paths = extract_step_plan_paths_from_sources(read_text(sources))
    if set(step_paths.keys()) != {"01", "02", "03", "04"}:
        raise SystemExit("Could not read all step plan paths from synthesis artifacts/sources.md")

    step_plans = {k: Path(v).resolve() for k, v in step_paths.items()}
    synth_plan = synth_plan.resolve()

    # Decisions should be consistent; report synthesis as source of truth and flag drifts.
    synth_decisions = load_decisions(synth_plan)
    target_user = synth_decisions.get("target_user_first", "")
    license_policy = synth_decisions.get("license_policy", "")
    synth_targets = load_targets(synth_plan)
    target_competitors = int(synth_targets.get("competitors", 100))
    target_oss = int(synth_targets.get("oss_repos", 20))
    target_thin = int(synth_targets.get("thin_slices", 10))

    lines: list[str] = []
    lines.append("# ✅ Feature Research — Run Status")
    lines.append("")
    lines.append(f"- 🗂️ Synthesis plan: `{synth_plan}`")
    lines.append("")
    lines.append("## 🎛️ Decisions (from synthesis config)")
    lines.append("")
    lines.append(f"- 🎯 target_user_first: `{target_user or 'MISSING'}`")
    lines.append(f"- 📜 license_policy: `{license_policy or 'MISSING'}`")
    if is_tbd(target_user) or is_tbd(license_policy):
        lines.append("")
        lines.append("- ⚠️ Status: NOT READY (decisions still TBD)")
    else:
        lines.append("")
        lines.append("- ✅ Status: READY (decisions set)")

    # Progress vs targets (high-level)
    lines.append("")
    lines.append("## 📈 Progress (vs targets)")
    lines.append("")

    step02 = step_plans.get("02")
    step03 = step_plans.get("03")
    step04 = step_plans.get("04")
    deepened_core = count_competitor_entries(step02) if step02 else 0
    deepened_adj = count_competitor_entries(step03) if step03 else 0
    deepened_total = deepened_core + deepened_adj

    oss_json = count_oss_entries_json(step04) if step04 else 0
    thin_slices = count_thin_slices(synth_plan)

    lines.append(f"- 🏪 competitors deepened: `{deepened_total}` / `{target_competitors}` ({pct(deepened_total, target_competitors)})")
    lines.append(f"  - core: `{deepened_core}`, adjacent: `{deepened_adj}`")
    lines.append(f"- 🧰 oss repos (metadata): `{oss_json}` / `{target_oss}` ({pct(oss_json, target_oss)})")
    lines.append(f"- 🧱 thin slice specs: `{thin_slices}` / `{target_thin}` ({pct(thin_slices, target_thin)})")

    lines.append("")
    lines.append("## 📦 Plans + artifacts (size + last modified)")
    lines.append("")

    specs = build_specs(step_plans, synth_plan)
    for spec in specs:
        lines.append(f"### {spec.label}")
        lines.append(f"- 📁 plan: `{spec.plan_path}`")

        # Memory cadence
        steps = count_step_files(spec.plan_path)
        compactions = count_compactions(spec.plan_path)
        lines.append(f"- 🧠 context steps: `{steps}` (next auto-compact at {((steps // 10) + 1) * 10})")
        if compactions:
            lines.append(f"- 📦 compactions: `{compactions}`")

        # Seeds progress (for competitor steps)
        if "competitors" in spec.label.lower():
            seed_n = competitor_seed_count(spec.plan_path)
            if seed_n is not None:
                lines.append(f"- 🧾 competitor seeds: `{seed_n}` entries")

        # Decisions drift detection
        d = load_decisions(spec.plan_path)
        drift_notes: list[str] = []
        if d:
            if target_user and d.get("target_user_first", "") and d.get("target_user_first") != target_user:
                drift_notes.append("target_user_first mismatch")
            if license_policy and d.get("license_policy", "") and d.get("license_policy") != license_policy:
                drift_notes.append("license_policy mismatch")
        if drift_notes:
            lines.append(f"- ⚠️ config drift: `{', '.join(drift_notes)}`")

        # Artifacts
        lines.append("- 📄 artifacts:")
        for rel in spec.required_artifacts:
            p = spec.plan_path / "artifacts" / rel
            size, mtime = file_info(p)
            if size == "MISSING":
                lines.append(f"  - ❌ `{rel}` — missing")
            else:
                lines.append(f"  - ✅ `{rel}` — {size} — {mtime}")
        lines.append("")

    lines.append("## 🧭 Next actions (fast)")
    lines.append("")
    lines.append("- 🧩 If decisions are TBD: set them once via the synthesis kickoff portal, or run the setter script.")
    lines.append("- 🏃 Start agents by opening each plan’s `artifacts/start-here.md` and pasting the listed prompt pack.")
    lines.append("- 🧠 Every checkpoint: run `./docs/.blackbox/scripts/new-step.sh --plan <plan> \"Checkpoint: ...\"`")
    lines.append("")

    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True)
    ap.add_argument("--write", action="store_true", help="Write to <synth-plan>/artifacts/run-status.md")
    args = ap.parse_args()

    synth_plan = Path(args.synth_plan)
    report = render_status(synth_plan)
    print(report)

    if args.write:
        out = synth_plan / "artifacts" / "run-status.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(report + "\n", encoding="utf-8")
        print("")
        print(f"Wrote: {out}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
