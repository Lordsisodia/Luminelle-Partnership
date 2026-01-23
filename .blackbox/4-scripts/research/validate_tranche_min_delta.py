#!/usr/bin/env python3
"""
Validate that tranche reports aren't "empty rituals".

Heuristics:
- Minimum checklist completion: count "- [x]" items in the tranche file.
- Minimum deltas: tranche should mention at least one key artifact updated OR list at least one competitor/repo.

This is intentionally not perfect; it’s a guardrail against low-signal tranche spam.

Exit codes:
- 0: OK
- 1: violations found
- 2: usage/input errors
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path


KEY_ARTIFACT_TOKENS = [
    "artifacts/top-50-market-features.md",
    "artifacts/oss-ranked.md",
    "artifacts/features-ranked.md",
    "artifacts/thin-slices/",
    "Step 04/oss/entries",
]


@dataclass(frozen=True)
class Violation:
    file: str
    reason: str


def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def checklist_done_count(text: str) -> int:
    return len(re.findall(r"^- \\[x\\] ", text, flags=re.MULTILINE | re.IGNORECASE))


def has_checklist_section(text: str) -> bool:
    return "## ✅ Minimum tranche delta checklist" in text


def seems_to_have_any_delta(text: str) -> bool:
    # Mention of key artifacts is a strong signal.
    if any(tok in text for tok in KEY_ARTIFACT_TOKENS):
        return True
    # Evidence pointers into our corpus are also real deltas.
    if ".blackbox/.plans/" in text:
        return True
    # Otherwise, look for at least one plausible competitor/oss list bullet with a URL or repo-ish string.
    if re.search(r"https?://", text):
        return True
    if re.search(r"^\d+\)\s+[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", text, flags=re.MULTILINE):
        return True
    return False


def list_tranche_files(artifacts: Path) -> list[Path]:
    return sorted(
        list(artifacts.glob("live-web-research-tranche-*.md"))
        + list(artifacts.glob("live-github-research-tranche-*.md"))
        + list(artifacts.glob("license-verification-tranche-*.md"))
    )


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True, help="Path to synthesis plan (docs/.blackbox/.plans/<synth>).")
    ap.add_argument("--min-checked", type=int, default=2, help="Minimum number of checked checklist items (default: 2).")
    ap.add_argument(
        "--enforce-checklist",
        action="store_true",
        help="Enforce checklist completion even if tranche file is legacy (no checklist section).",
    )
    ap.add_argument("--last-n", type=int, default=0, help="Only validate the last N tranche files (0 = all).")
    args = ap.parse_args()

    synth = Path(args.synth_plan)
    artifacts = synth / "artifacts"
    if not artifacts.exists():
        print(f"ERROR: missing artifacts dir: {artifacts}", file=sys.stderr)
        return 2

    tranches = list_tranche_files(artifacts)
    if args.last_n and args.last_n > 0:
        tranches = tranches[-args.last_n :]

    if not tranches:
        print("OK: no tranche files found")
        return 0

    violations: list[Violation] = []
    for p in tranches:
        txt = read_text(p)
        if args.enforce_checklist or has_checklist_section(txt):
            done = checklist_done_count(txt)
            if done < args.min_checked:
                violations.append(Violation(p.name, f"only {done} checklist items checked (min {args.min_checked})"))
        if not seems_to_have_any_delta(txt):
            violations.append(Violation(p.name, "no obvious deltas (no key artifact mentions, URLs, or repo strings)"))

    if not violations:
        print(f"OK: validated {len(tranches)} tranche files (min_checked={args.min_checked})")
        return 0

    print(f"FAIL: tranche min-delta violations ({len(violations)})")
    for v in violations:
        print(f"- {v.file}: {v.reason}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
