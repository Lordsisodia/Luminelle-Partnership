#!/usr/bin/env python3
"""
Audit tranche drafts in a synthesis plan.

Goal: find tranche files that still look like template stubs (placeholders like "<Example:" or "<do 1>")
so they don’t silently accumulate during long runs.

This tool is intentionally conservative: it only reports and exits non-zero optionally.
No third-party dependencies.
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path


PLACEHOLDER_PATTERNS = [
    r"<Example:",
    r"<1 sentence>",
    r"<insight>",
    r"<do 1>",
    r"<do 2>",
    r"<short-topic>",
    r"<name>",
    r"<link",
    r"<repo",
]


@dataclass(frozen=True)
class Finding:
    path: Path
    matches: list[str]


def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def scan_file(p: Path) -> Finding | None:
    text = read_text(p)
    matches: list[str] = []
    for pat in PLACEHOLDER_PATTERNS:
        if re.search(pat, text):
            matches.append(pat)
    if matches:
        return Finding(path=p, matches=matches)
    return None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True, help="Path to synthesis plan (docs/.blackbox/.plans/<synth>).")
    ap.add_argument("--fail-on-drafts", action="store_true", help="Exit 1 if any drafts are detected.")
    args = ap.parse_args()

    synth = Path(args.synth_plan)
    artifacts = synth / "artifacts"
    if not artifacts.exists():
        print(f"ERROR: missing artifacts dir: {artifacts}", file=sys.stderr)
        return 2

    tranche_files = sorted(
        list(artifacts.glob("live-web-research-tranche-*.md"))
        + list(artifacts.glob("live-github-research-tranche-*.md"))
        + list(artifacts.glob("license-verification-tranche-*.md"))
    )

    findings: list[Finding] = []
    for p in tranche_files:
        f = scan_file(p)
        if f:
            findings.append(f)

    if not tranche_files:
        print("OK: no tranche files found")
        return 0

    if not findings:
        print(f"OK: {len(tranche_files)} tranche files; no template placeholders detected")
        return 0

    print(f"WARN: {len(findings)}/{len(tranche_files)} tranche files look like drafts (template placeholders)")
    for f in findings:
        rel = f.path.name
        print(f"- {rel} (matches: {', '.join(f.matches)})")

    if args.fail_on_drafts:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

