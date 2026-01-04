#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Competitor:
    name: str
    category: str
    website: str
    notes: str


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "competitor"


def parse_line(line: str) -> Competitor | None:
    raw = line.strip()
    if not raw or raw.startswith("#"):
        return None
    parts = [p.strip() for p in raw.split("|")]
    while len(parts) < 4:
        parts.append("")
    name, category, website, notes = parts[:4]
    if not name:
        return None
    return Competitor(name=name, category=category or "adjacent", website=website, notes=notes)


def entry_md(c: Competitor) -> str:
    lines: list[str] = []
    lines.append("# Competitor Entry")
    lines.append("")
    lines.append("## Identity")
    lines.append("")
    lines.append(f"- Name: {c.name}")
    lines.append(f"- Category: {c.category}")
    if c.website:
        lines.append(f"- Website: {c.website}")
    else:
        lines.append("- Website: <add>")
    lines.append("")
    lines.append("## What they sell (1–3 bullets)")
    lines.append("")
    lines.append("- …")
    lines.append("")
    lines.append("## Notable features")
    lines.append("")
    lines.append("- …")
    lines.append("")
    lines.append("## Workflows worth copying (step-by-step)")
    lines.append("")
    lines.append("1) …")
    lines.append("2) …")
    lines.append("")
    lines.append("## What we can steal (vibe-coding friendly)")
    lines.append("")
    lines.append("- Easy copy ideas:")
    lines.append("- Medium ideas:")
    lines.append("- Hard but high leverage ideas:")
    lines.append("")
    lines.append("## Evidence / sources")
    lines.append("")
    if c.website:
        lines.append(f"- {c.website}")
    else:
        lines.append("- <add links>")
    lines.append("")
    lines.append("## Score (0–100) + reasoning")
    lines.append("")
    lines.append("- Score: …")
    lines.append("- Why: …")
    lines.append("")
    if c.notes:
        lines.append("---")
        lines.append("")
        lines.append("## Seed notes")
        lines.append("")
        lines.append(c.notes)
        lines.append("")
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate competitor entry stubs and an index from a seed list.")
    ap.add_argument("--input", required=True, help="Seed list file (pipe-delimited: name|category|website|notes).")
    ap.add_argument("--out-dir", required=True, help="Directory to write competitor entry files into.")
    ap.add_argument("--index", required=True, help="Path to competitors/index.md to write.")
    ap.add_argument("--limit", type=int, default=100, help="Max competitors to generate (default 100).")
    args = ap.parse_args()

    in_path = Path(args.input)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    competitors: list[Competitor] = []
    for line in in_path.read_text("utf-8", errors="replace").splitlines():
        c = parse_line(line)
        if c:
            competitors.append(c)

    if not competitors:
        raise SystemExit("No competitors found in input.")

    competitors = competitors[: args.limit]

    idx_lines: list[str] = []
    idx_lines.append("# Competitors Index (target: 100)")
    idx_lines.append("")
    idx_lines.append("Scoring rubric: `../process/rubric.md`")
    idx_lines.append("")
    idx_lines.append("## ✅ Target")
    idx_lines.append("")
    idx_lines.append("- 100 competitors total (core + adjacent)")
    idx_lines.append("")
    idx_lines.append("## Index (seeded; ranking is provisional)")
    idx_lines.append("")
    idx_lines.append("Format:")
    idx_lines.append("- `Rank — Name — Category — Score — Website — Entry file — Notes`")
    idx_lines.append("")

    for i, c in enumerate(competitors, 1):
        slug = safe_slug(c.name)
        entry_path = out_dir / f"{slug}.md"
        entry_path.write_text(entry_md(c), encoding="utf-8")

        score = "—"
        website = c.website or ""
        notes = c.notes
        idx_lines.append(
            f"{i}. {c.name} — {c.category} — {score} — {website} — `entries/{slug}.md` — {notes}"
        )

    Path(args.index).write_text("\n".join(idx_lines) + "\n", encoding="utf-8")
    print(f"Generated {len(competitors)} competitor stubs in {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

