#!/usr/bin/env python3
"""
Generate/refresh a tranche ledger for a synthesis plan.

Writes:
  <synth-plan>/artifacts/tranche-ledger.md

Ledger is intended to be a "2 minute skim" view: each tranche becomes 1 line with a headline.

No third-party dependencies.
"""

from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class TrancheSummary:
    file_name: str
    kind: str
    headline: str


def classify(name: str) -> str:
    if name.startswith("live-web-research-tranche-"):
        return "live-web"
    if name.startswith("live-github-research-tranche-"):
        return "live-github"
    if name.startswith("license-verification-tranche-"):
        return "license"
    return "other"


def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def extract_headline(text: str) -> str:
    """
    Best-effort:
    - Look for the tranche headline section and use the next non-empty line.
    - Else fallback to the first H1.
    """
    lines = [ln.rstrip("\n") for ln in text.splitlines()]
    for i, ln in enumerate(lines):
        if ln.strip() == "## ✅ Tranche headline (one line)":
            for j in range(i + 1, min(i + 15, len(lines))):
                cand = lines[j].strip()
                if not cand:
                    continue
                # Strip markdown quotes/backticks.
                cand = cand.strip("`").strip('"').strip()
                # Avoid leaving placeholder-y angle brackets if possible.
                cand = re.sub(r"^<|>$", "", cand).strip()
                return cand or "(missing headline)"
    for ln in lines:
        if ln.startswith("# "):
            return ln[2:].strip()
    return "(missing headline)"


def extract_highlights(text: str, *, max_bullets: int = 3) -> list[str]:
    """
    Best-effort highlight extraction:
    - Prefer bullets under "What we learned".
    - Fallback to first bullets under "Stealable patterns".
    """
    lines = [ln.rstrip("\n") for ln in text.splitlines()]

    def bullets_after(section_title: str) -> list[str]:
        try:
            idx = next(i for i, ln in enumerate(lines) if ln.strip() == section_title)
        except StopIteration:
            return []
        bullets: list[str] = []
        for ln in lines[idx + 1 :]:
            if ln.startswith("## "):
                break
            m = re.match(r"^\s*-\s+(.*)$", ln.strip())
            if not m:
                continue
            val = m.group(1).strip()
            # ignore template placeholders
            if val.startswith("<") and val.endswith(">"):
                continue
            bullets.append(val)
            if len(bullets) >= max_bullets:
                break
        return bullets

    hl = bullets_after("## 🧠 What we learned (high signal, 5–12 bullets)")
    if hl:
        return hl[:max_bullets]
    hl = bullets_after("## ⚡ Stealable patterns (step-by-step, 2–6)")
    return hl[:max_bullets]


def list_tranche_files(artifacts: Path) -> list[Path]:
    return sorted(
        list(artifacts.glob("live-web-research-tranche-*.md"))
        + list(artifacts.glob("live-github-research-tranche-*.md"))
        + list(artifacts.glob("license-verification-tranche-*.md"))
    )


def build_ledger(synth_plan: Path) -> str:
    artifacts = synth_plan / "artifacts"
    if not artifacts.exists():
        raise SystemExit(f"Missing artifacts dir: {artifacts}")

    tranche_files = list_tranche_files(artifacts)
    summaries: list[TrancheSummary] = []
    for p in tranche_files:
        txt = read_text(p)
        summaries.append(
            TrancheSummary(
                file_name=p.name,
                kind=classify(p.name),
                headline=extract_headline(txt),
            )
        )

    icon = {"live-web": "🌐", "live-github": "🧠", "license": "⚖️", "other": "📄"}

    lines: list[str] = []
    lines.extend(
        [
            "---",
            "status: active",
            "last_reviewed: 2025-12-29",
            "owner: agent-zero",
            "---",
            "",
            "# Tranche Ledger (headlines)",
            "",
            "One line per tranche so humans can skim the last N hours in ~2 minutes.",
            "",
            "## Entries",
            "",
        ]
    )

    if not summaries:
        lines.append("- (none yet)")
        lines.append("")
        return "\n".join(lines)

    for s in summaries:
        p = artifacts / s.file_name
        highlights = extract_highlights(read_text(p), max_bullets=3)
        if highlights:
            hl_str = " | ".join(highlights)
            lines.append(f"- {icon.get(s.kind,'📄')} `{s.file_name}` — {s.headline} — Highlights: {hl_str}")
        else:
            lines.append(f"- {icon.get(s.kind,'📄')} `{s.file_name}` — {s.headline}")

    lines.append("")
    lines.append("Regenerate:")
    lines.append("```bash")
    lines.append(f"python3 .blackbox/scripts/research/update_tranche_ledger.py --synth-plan {synth_plan} --write")
    lines.append("```")
    lines.append("")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True, help="Path to synthesis plan (docs/.blackbox/.plans/<synth>).")
    ap.add_argument("--write", action="store_true", help="Write tranche-ledger.md (otherwise print).")
    args = ap.parse_args()

    synth_plan = Path(args.synth_plan)
    out = synth_plan / "artifacts" / "tranche-ledger.md"
    content = build_ledger(synth_plan)

    if args.write:
        out.write_text(content, encoding="utf-8")
        print(f"Wrote: {out}")
    else:
        print(content)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
