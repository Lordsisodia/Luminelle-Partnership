#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


def run(cmd: list[str]) -> None:
    print(f"$ {' '.join(cmd)}")
    subprocess.run(cmd, check=True)


def main() -> int:
    ap = argparse.ArgumentParser(description="Run validation + progress + ranking + pattern summaries for a scorecard.")
    ap.add_argument("--scorecard", required=True, help="Path to scorecard.csv")
    ap.add_argument("--plan-artifacts-dir", required=True, help="Plan artifacts directory (where reports should be written).")
    ap.add_argument(
        "--patterns-dir",
        required=True,
        help="Directory containing pattern cards (md).",
    )
    ap.add_argument(
        "--audits-dir",
        required=False,
        default="",
        help="Optional: directory containing per-store audit docs (md). If set, generates audit-doc completeness report.",
    )
    ap.add_argument(
        "--mapping-md",
        required=False,
        default="",
        help="Optional: pattern-to-backlog mapping markdown path. If set, exports backlog CSV/MD artifacts.",
    )
    ap.add_argument("--group-by-store", action="store_true", help="Compute store-level averages (desktop+mobile).")
    ap.add_argument("--progress-group-by-store", action="store_true", help="Show progress grouped by store (combines devices).")
    ap.add_argument("--strict", action="store_true", help="Use strict validation (requires narrative fields when scores are present).")
    args = ap.parse_args()

    scorecard = Path(args.scorecard)
    artifacts = Path(args.plan_artifacts_dir)
    patterns_dir = Path(args.patterns_dir)

    artifacts.mkdir(parents=True, exist_ok=True)

    # Resolve sibling scripts relative to this file so the runner works from any CWD.
    scripts_dir = Path(__file__).resolve().parent
    validate_script = scripts_dir / "validate_audit_scorecard.py"
    progress_script = scripts_dir / "report_audit_progress.py"
    score_script = scripts_dir / "score_funnel_audits.py"
    patterns_script = scripts_dir / "summarize_pattern_cards.py"
    rollup_script = scripts_dir / "export_store_rollups.py"
    audit_docs_script = scripts_dir / "check_audit_docs.py"
    triage_script = scripts_dir / "generate_audit_triage.py"
    backlog_script = scripts_dir / "export_backlog_from_mapping.py"
    backlog_validate_script = scripts_dir / "validate_backlog_mapping.py"
    pattern_validate_script = scripts_dir / "validate_pattern_cards.py"
    evidence_inventory_script = scripts_dir / "inventory_evidence_files.py"
    evidence_naming_script = scripts_dir / "validate_evidence_naming.py"
    slug_map_script = scripts_dir / "generate_store_slug_map.py"
    evidence_coverage_script = scripts_dir / "analyze_evidence_coverage.py"

    out_progress = artifacts / "progress.md"
    out_rankings = artifacts / "rankings.md"
    out_scored_csv = artifacts / "scorecard.scored.csv"
    out_patterns_summary = artifacts / "patterns-summary.md"
    out_rollups_csv = artifacts / "store-rollups.csv"
    out_audit_docs = artifacts / "audit-docs-progress.md"
    out_triage = artifacts / "triage.md"
    out_backlog_csv = artifacts / "backlog.csv"
    out_backlog_md = artifacts / "backlog.md"
    out_evidence_inventory = artifacts / "evidence-inventory.md"
    out_evidence_naming = artifacts / "evidence-naming.md"
    out_store_slug_map = artifacts / "store-slug-map.json"
    out_evidence_coverage = artifacts / "evidence-coverage.md"
    evidence_dir = artifacts / "evidence"

    validate_cmd = ["python3", str(validate_script), "--csv", str(scorecard)]
    if args.strict:
        validate_cmd.append("--strict")
    run(validate_cmd)
    progress_cmd = ["python3", str(progress_script), "--in-csv", str(scorecard), "--out-md", str(out_progress)]
    if args.progress_group_by_store:
        progress_cmd.append("--group-by-store")
    run(progress_cmd)
    score_cmd = ["python3", str(score_script), "--in-csv", str(scorecard), "--out-csv", str(out_scored_csv), "--out-md", str(out_rankings)]
    if args.group_by_store:
        score_cmd.append("--group-by-store")
    run(score_cmd)
    run(["python3", str(patterns_script), "--patterns-dir", str(patterns_dir), "--out-md", str(out_patterns_summary)])
    run(["python3", str(rollup_script), "--in-csv", str(scorecard), "--out-csv", str(out_rollups_csv)])

    # Evidence inventory: if the plan contains evidence folders, summarize them.
    if evidence_dir.exists():
        run(["python3", str(evidence_inventory_script), "--evidence-dir", str(evidence_dir), "--out-md", str(out_evidence_inventory)])
        # Always emit naming report; strict mode fails on issues.
        naming_cmd = ["python3", str(evidence_naming_script), "--evidence-dir", str(evidence_dir), "--out-md", str(out_evidence_naming)]
        if args.strict:
            naming_cmd.append("--strict")
        run(naming_cmd)
        run(["python3", str(evidence_coverage_script), "--evidence-dir", str(evidence_dir), "--out-md", str(out_evidence_coverage)])

    # Store slug map: useful for evidence matching. If shortlist is present, generate it.
    shortlist = artifacts / "shortlist-15.md"
    if shortlist.exists():
        run(["python3", str(slug_map_script), "--shortlist-md", str(shortlist), "--out-json", str(out_store_slug_map)])

    # Audit docs completeness report (optional).
    if args.audits_dir:
        run(["python3", str(audit_docs_script), "--audits-dir", args.audits_dir, "--out-md", str(out_audit_docs)])

    # Triage is most useful when it can see audit docs + evidence + store slug map.
    triage_cmd = ["python3", str(triage_script), "--scorecard", str(scorecard), "--out-md", str(out_triage)]
    if args.audits_dir:
        triage_cmd.extend(["--audit-docs-progress-md", str(out_audit_docs)])
    if evidence_dir.exists():
        triage_cmd.extend(["--evidence-inventory-md", str(out_evidence_inventory)])
        triage_cmd.extend(["--evidence-coverage-md", str(out_evidence_coverage)])
    if out_store_slug_map.exists():
        triage_cmd.extend(["--store-slug-map", str(out_store_slug_map)])
    if shortlist.exists():
        triage_cmd.extend(["--shortlist-md", str(shortlist)])
    run(triage_cmd)

    if args.mapping_md:
        if args.strict:
            run(["python3", str(backlog_validate_script), "--mapping-md", args.mapping_md, "--strict"])
        run(
            [
                "python3",
                str(backlog_script),
                "--mapping-md",
                args.mapping_md,
                "--out-csv",
                str(out_backlog_csv),
                "--out-md",
                str(out_backlog_md),
            ]
        )

    if args.strict:
        run(["python3", str(pattern_validate_script), "--patterns-dir", str(patterns_dir), "--strict"])

    print("\nWrote reports:")
    print(f"- {out_progress}")
    print(f"- {out_rankings}")
    print(f"- {out_scored_csv}")
    print(f"- {out_rollups_csv}")
    print(f"- {out_patterns_summary}")
    if args.audits_dir:
        print(f"- {out_audit_docs}")
    print(f"- {out_triage}")
    if args.mapping_md:
        print(f"- {out_backlog_csv}")
        print(f"- {out_backlog_md}")
    if evidence_dir.exists():
        print(f"- {out_evidence_inventory}")
        print(f"- {out_evidence_naming}")
        print(f"- {out_evidence_coverage}")
    if out_store_slug_map.exists():
        print(f"- {out_store_slug_map}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
