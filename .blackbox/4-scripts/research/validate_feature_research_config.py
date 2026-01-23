#!/usr/bin/env python3
"""
Validate that feature-research decisions are set (not TBD) across:
Step 01–04 + Synthesis plans.

Input: --synth-plan <path>
Derives step plans from: <synth-plan>/artifacts/sources.md
Checks: artifacts/feature-research-config.yaml in each plan.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def extract_step_plan_paths_from_sources(sources_md: str) -> list[str]:
    paths: list[str] = []
    for step_num in ("01", "02", "03", "04"):
        m = re.search(rf"^- Step {step_num} plan:\s*`([^`]+)`\s*$", sources_md, re.MULTILINE)
        if m:
            paths.append(m.group(1).strip())
    return paths


def parse_value(key: str, yaml_text: str) -> str | None:
    # Matches: key: "value" or key: value
    m = re.search(rf"^\s*{re.escape(key)}:\s*(.+?)\s*$", yaml_text, re.MULTILINE)
    if not m:
        return None
    raw = m.group(1).strip()

    # Drop inline comments (common in our templates), e.g.:
    #   target_user_first: "TBD"   # "merchant admins" | "internal ops"
    if "#" in raw:
        raw = raw.split("#", 1)[0].strip()

    if raw.startswith('"') and raw.endswith('"') and len(raw) >= 2:
        raw = raw[1:-1]
    return raw.strip()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True)
    args = ap.parse_args()

    synth_plan = Path(args.synth_plan).resolve()
    sources_file = synth_plan / "artifacts" / "sources.md"
    if not sources_file.exists():
        print(f"FAIL: missing {sources_file}")
        return 2

    sources_md = read_text(sources_file)
    step_plans = extract_step_plan_paths_from_sources(sources_md)
    if len(step_plans) != 4:
        print("FAIL: could not find all 4 step plan paths in synthesis artifacts/sources.md")
        return 2

    plan_paths = step_plans + [str(synth_plan)]
    failures: list[str] = []

    for plan_path in plan_paths:
        plan_dir = Path(plan_path).resolve()
        cfg = plan_dir / "artifacts" / "feature-research-config.yaml"
        if not cfg.exists():
            failures.append(f"missing config: {cfg}")
            continue
        txt = read_text(cfg)
        if "# AUTO-GENERATED: feature-research config" not in txt:
            failures.append(f"invalid config (missing marker): {cfg}")
            continue

        target_user = parse_value("target_user_first", txt)
        license_policy = parse_value("license_policy", txt)
        if not target_user or target_user.strip().upper() == "TBD":
            failures.append(f"TBD target_user_first: {cfg}")
        if not license_policy or license_policy.strip().upper() == "TBD":
            failures.append(f"TBD license_policy: {cfg}")

    if failures:
        print("FAIL: feature-research config not ready")
        for f in failures:
            print(f"- {f}")
        return 2

    print("OK: feature-research config ready (no TBD decisions)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
