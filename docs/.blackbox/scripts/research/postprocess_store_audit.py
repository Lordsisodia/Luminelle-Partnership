#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Cmd:
    argv: list[str]
    name: str


def run(cmd: Cmd, *, cwd: Path | None = None) -> int:
    print(f"$ {' '.join(cmd.argv)}")
    p = subprocess.run(cmd.argv, cwd=str(cwd) if cwd else None)
    return int(p.returncode)


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Postprocess a store manual-audit drop: validate evidence, apply to patterns, refresh artifacts."
    )
    ap.add_argument("--store-slug", required=True, help="Store slug (evidence folder name). Example: skims")
    ap.add_argument(
        "--repo-root",
        default=".",
        help="Repo root or docs root. If a `docs/` folder exists, the runner auto-detects and uses `docs/` as the docs root.",
    )
    ap.add_argument(
        "--plan-artifacts-dir",
        default=".blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts",
        help="Plan artifacts dir (relative to docs root; where evidence/reports live).",
    )
    ap.add_argument(
        "--audits-dir",
        default="05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15",
        help="Audit docs dir (relative to docs root).",
    )
    ap.add_argument(
        "--patterns-dir",
        default="05-planning/research/market-intelligence/ecommerce-benchmarking/patterns",
        help="Pattern cards dir (relative to docs root).",
    )
    ap.add_argument(
        "--mapping-md",
        default="05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md",
        help="Pattern-to-backlog mapping markdown (relative to docs root).",
    )
    ap.add_argument(
        "--capture-checklist-md",
        default="05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/PATTERN-CAPTURE-CHECKLIST.md",
        help="Pattern capture checklist markdown (relative to docs root).",
    )
    ap.add_argument("--dry-run", action="store_true", help="Do not write pattern cards; still generates reports.")
    args = ap.parse_args()

    repo_root = Path(args.repo_root).resolve()
    # Allow running from the repo root or from within `docs/`.
    # If `docs/` exists and looks like the docs root, use it.
    docs_root = repo_root
    if (repo_root / "docs").exists() and (repo_root / "docs" / ".blackbox").exists() and not (repo_root / ".blackbox").exists():
        docs_root = repo_root / "docs"

    plan_artifacts_dir = (docs_root / args.plan_artifacts_dir).resolve()
    audits_dir = (docs_root / args.audits_dir).resolve()
    patterns_dir = (docs_root / args.patterns_dir).resolve()
    mapping_md = (docs_root / args.mapping_md).resolve()
    capture_md = (docs_root / args.capture_checklist_md).resolve()

    store_slug = args.store_slug.strip().lower()
    evidence_dir = plan_artifacts_dir / "evidence"
    audit_doc = audits_dir / f"{store_slug}.md"
    reports_dir = plan_artifacts_dir / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)

    suggest_out = reports_dir / f"{store_slug}-pattern-update-suggestions.md"
    autoapply_out = reports_dir / f"{store_slug}-pattern-autoapply.md"

    python = sys.executable or "python3"
    scripts_dir = docs_root / ".blackbox/scripts/research"

    cmds: list[Cmd] = [
        Cmd(
            name="validate_evidence_naming",
            argv=[
                python,
                str(scripts_dir / "validate_evidence_naming.py"),
                "--evidence-dir",
                str(evidence_dir),
                "--out-md",
                str(plan_artifacts_dir / "evidence-naming.md"),
            ],
        ),
        Cmd(
            name="evidence_coverage",
            argv=[
                python,
                str(scripts_dir / "analyze_evidence_coverage.py"),
                "--evidence-dir",
                str(evidence_dir),
                "--out-md",
                str(plan_artifacts_dir / "evidence-coverage.md"),
            ],
        ),
        Cmd(
            name="suggest_updates",
            argv=[
                python,
                str(scripts_dir / "suggest_pattern_updates_from_evidence.py"),
                "--store-slug",
                store_slug,
                "--evidence-dir",
                str(evidence_dir),
                "--audit-doc",
                str(audit_doc),
                "--pattern-capture-md",
                str(capture_md),
                "--out-md",
                str(suggest_out),
            ],
        ),
    ]

    # Auto-apply is optional but default-on; dry-run supported.
    apply_cmd = Cmd(
        name="auto_apply_patterns",
        argv=[
            python,
            str(scripts_dir / "apply_evidence_to_patterns.py"),
            "--store-slug",
            store_slug,
            "--evidence-dir",
            str(evidence_dir),
            "--audit-doc",
            str(audit_doc),
            "--pattern-capture-md",
            str(capture_md),
            "--patterns-dir",
            str(patterns_dir),
            "--out-md",
            str(autoapply_out),
        ]
        + (["--dry-run"] if args.dry_run else []),
    )
    cmds.append(apply_cmd)

    # Refresh all artifacts (rankings/backlog/pattern summary/etc.)
    cmds.append(
        Cmd(
            name="refresh_reports",
            argv=[
                python,
                str(scripts_dir / "run_funnel_audit_reports.py"),
                "--scorecard",
                str(audits_dir / "scorecard.csv"),
                "--plan-artifacts-dir",
                str(plan_artifacts_dir),
                "--patterns-dir",
                str(patterns_dir),
                "--audits-dir",
                str(audits_dir),
                "--mapping-md",
                str(mapping_md),
                "--group-by-store",
                "--progress-group-by-store",
            ],
        )
    )

    # Execute
    failures = 0
    for c in cmds:
        rc = run(c, cwd=docs_root)
        if rc != 0:
            failures += 1
            print(f"!! step failed ({c.name}) exit={rc}")

    print("")
    print("Outputs:")
    print(f"- Suggestions: {suggest_out}")
    print(f"- Auto-apply report: {autoapply_out}")
    print(f"- Evidence naming: {plan_artifacts_dir / 'evidence-naming.md'}")
    print(f"- Evidence coverage: {plan_artifacts_dir / 'evidence-coverage.md'}")
    print(f"- Backlog: {plan_artifacts_dir / 'backlog.md'}")
    print(f"- Rankings: {plan_artifacts_dir / 'rankings.md'}")
    print("")
    if failures:
        print(f"Completed with {failures} failing step(s).")
        return 1
    print("Completed OK.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
