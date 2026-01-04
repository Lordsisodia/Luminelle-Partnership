#!/usr/bin/env python3
"""
Generate/refresh a tranche index for a synthesis plan.

Writes:
  <synth-plan>/artifacts/tranche-index.md

No third-party dependencies.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class TrancheFile:
    path: Path
    kind: str  # live-web | live-github | license | other


def classify(name: str) -> str:
    if name.startswith("live-web-research-tranche-"):
        return "live-web"
    if name.startswith("live-github-research-tranche-"):
        return "live-github"
    if name.startswith("license-verification-tranche-"):
        return "license"
    return "other"


def list_tranches(artifacts_dir: Path) -> list[TrancheFile]:
    files: list[TrancheFile] = []
    for p in sorted(artifacts_dir.glob("*tranche-*.md")):
        files.append(TrancheFile(path=p, kind=classify(p.name)))
    return files


def rel(p: Path, base: Path) -> str:
    try:
        return str(p.relative_to(base))
    except Exception:
        return str(p)


def build_index(*, synth_plan: Path) -> str:
    artifacts = synth_plan / "artifacts"
    if not artifacts.exists():
        raise SystemExit(f"Missing artifacts dir: {artifacts}")

    tranches = list_tranches(artifacts)
    counts = {"live-web": 0, "live-github": 0, "license": 0, "other": 0}
    for t in tranches:
        counts[t.kind] = counts.get(t.kind, 0) + 1

    lines: list[str] = []
    lines.extend(
        [
            "---",
            "status: active",
            "last_reviewed: 2025-12-29",
            "owner: agent-zero",
            "---",
            "",
            "# Tranche Index",
            "",
            "Browse tranche outputs quickly (newest last, by filename sort).",
            "",
            "## Counts",
            "",
            f"- 🌐 live-web: `{counts['live-web']}`",
            f"- 🧠 live-github: `{counts['live-github']}`",
            f"- ⚖️ license: `{counts['license']}`",
            "",
            "## Files",
            "",
        ]
    )

    if not tranches:
        lines.append("- (none yet)")
        return "\n".join(lines) + "\n"

    for t in tranches:
        label = {
            "live-web": "🌐",
            "live-github": "🧠",
            "license": "⚖️",
            "other": "📄",
        }.get(t.kind, "📄")
        lines.append(f"- {label} `{rel(t.path, artifacts)}`")

    lines.append("")
    lines.append("Regenerate:")
    lines.append("```bash")
    lines.append(f"python3 .blackbox/scripts/research/update_tranche_index.py --synth-plan {synth_plan} --write")
    lines.append("```")
    lines.append("")

    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True, help="Path to synthesis plan (docs/.blackbox/.plans/<synth>).")
    ap.add_argument("--write", action="store_true", help="Write tranche-index.md (otherwise print).")
    args = ap.parse_args()

    synth_plan = Path(args.synth_plan)
    out = synth_plan / "artifacts" / "tranche-index.md"
    content = build_index(synth_plan=synth_plan)
    if args.write:
        out.write_text(content, encoding="utf-8")
        print(f"Wrote: {out}")
    else:
        print(content)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

