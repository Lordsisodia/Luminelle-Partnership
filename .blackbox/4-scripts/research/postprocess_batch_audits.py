#!/usr/bin/env python3
"""
Batch helper for manual funnel audits.

Why this exists:
- Humans capture screenshots into evidence folders.
- We want one command that:
  1) shows which stores have screenshots,
  2) runs postprocess for stores that do,
  3) prints clear next actions for stores that don't.

Usage (from `docs/`):
  python3 .blackbox/scripts/research/postprocess_batch_audits.py \
    --plan-artifacts-dir .blackbox/.plans/<plan>/artifacts \
    --stores skims reformation sezane

Optional:
  --audits-dir        (override audit docs dir; e.g. Top-25 vs shortlist)
  --capture-checklist-md (override pattern capture checklist path)
  --patterns-dir      (override pattern cards dir)
  --mapping-md        (override pattern-to-backlog mapping path)
  --dry-run          (passes --dry-run through to postprocess_store_audit.py)
  --min-screenshots  (default: 1; use 10+ to enforce "enough evidence")
"""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


def _count_images(evidence_store_dir: Path) -> int:
    if not evidence_store_dir.exists():
        return 0
    patterns = ["*.png", "*.jpg", "*.jpeg", "*.PNG", "*.JPG", "*.JPEG"]
    count = 0
    for pattern in patterns:
        count += len(list(evidence_store_dir.glob(pattern)))
    return count


def _run(cmd: list[str]) -> int:
    print(f"$ {' '.join(cmd)}")
    return subprocess.call(cmd)


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify evidence + postprocess multiple stores.")
    parser.add_argument(
        "--plan-artifacts-dir",
        required=True,
        help="Path to the manual-audits plan artifacts dir (contains evidence/ and reports/).",
    )
    parser.add_argument(
        "--repo-root",
        default=None,
        help="Repo/docs root to run from. If omitted, defaults to the current working directory.",
    )
    parser.add_argument(
        "--audits-dir",
        default=None,
        help="Audit docs dir (relative to docs root). If omitted, postprocess_store_audit.py defaults are used.",
    )
    parser.add_argument(
        "--patterns-dir",
        default=None,
        help="Pattern cards dir (relative to docs root). If omitted, postprocess_store_audit.py defaults are used.",
    )
    parser.add_argument(
        "--mapping-md",
        default=None,
        help="Pattern-to-backlog mapping markdown (relative to docs root). If omitted, postprocess_store_audit.py defaults are used.",
    )
    parser.add_argument(
        "--capture-checklist-md",
        default=None,
        help="Pattern capture checklist markdown (relative to docs root). If omitted, postprocess_store_audit.py defaults are used.",
    )
    parser.add_argument(
        "--stores",
        nargs="+",
        required=True,
        help="Store slugs (must match evidence folder names).",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run postprocess in dry-run mode (no writes to pattern cards).",
    )
    parser.add_argument(
        "--min-screenshots",
        type=int,
        default=1,
        help="Minimum number of screenshots required to postprocess a store (default: 1).",
    )
    args = parser.parse_args()

    plan_artifacts_dir = Path(args.plan_artifacts_dir).resolve()
    evidence_dir = plan_artifacts_dir / "evidence"
    postprocess_py = Path(".blackbox/scripts/research/postprocess_store_audit.py").resolve()

    if not plan_artifacts_dir.exists():
        raise SystemExit(f"--plan-artifacts-dir does not exist: {plan_artifacts_dir}")
    if not evidence_dir.exists():
        raise SystemExit(f"Expected evidence dir missing: {evidence_dir}")
    if not postprocess_py.exists():
        raise SystemExit(f"Expected postprocess script missing: {postprocess_py}")

    print("Batch postprocess — evidence inventory")
    print(f"- plan artifacts: {plan_artifacts_dir}")
    print(f"- evidence dir: {evidence_dir}")
    print(f"- min screenshots: {args.min_screenshots}")
    print("")

    runnable: list[str] = []
    missing: list[str] = []

    for store in args.stores:
        store_dir = evidence_dir / store
        n = _count_images(store_dir)
        status = "OK" if n >= args.min_screenshots else "MISSING"
        print(f"- {store}: {n} screenshot(s) → {status} ({store_dir})")
        if n >= args.min_screenshots:
            runnable.append(store)
        else:
            missing.append(store)

    if missing:
        print("\nStores missing evidence (capture screenshots first):")
        for store in missing:
            print(f"- {store}: {evidence_dir / store}")

    if not runnable:
        print("\nNo stores meet the evidence threshold yet. Nothing to postprocess.")
        return 0

    print("\nRunning postprocess for stores with evidence:")
    rc = 0
    for store in runnable:
        cmd = [
            "python3",
            str(postprocess_py),
            "--store-slug",
            store,
            "--plan-artifacts-dir",
            str(plan_artifacts_dir),
        ]
        if args.repo_root:
            cmd += ["--repo-root", args.repo_root]
        if args.audits_dir:
            cmd += ["--audits-dir", args.audits_dir]
        if args.patterns_dir:
            cmd += ["--patterns-dir", args.patterns_dir]
        if args.mapping_md:
            cmd += ["--mapping-md", args.mapping_md]
        if args.capture_checklist_md:
            cmd += ["--capture-checklist-md", args.capture_checklist_md]
        if args.dry_run:
            cmd.append("--dry-run")
        rc = rc or _run(cmd)

    return rc


if __name__ == "__main__":
    raise SystemExit(main())
