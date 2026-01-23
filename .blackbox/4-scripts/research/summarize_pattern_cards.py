#!/usr/bin/env python3
from __future__ import annotations

import argparse
from pathlib import Path


def extract_field(text: str, prefix: str) -> str:
    for line in text.splitlines():
        if line.strip().lower().startswith(prefix.lower()):
            return line.split(":", 1)[1].strip() if ":" in line else ""
    return ""


def main() -> int:
    ap = argparse.ArgumentParser(description="Summarize pattern cards into a markdown table.")
    ap.add_argument("--patterns-dir", required=True, help="Directory containing pattern card .md files.")
    ap.add_argument("--out-md", required=True, help="Write markdown summary here.")
    args = ap.parse_args()

    d = Path(args.patterns_dir)
    out = Path(args.out_md)
    cards = sorted([p for p in d.glob("*.md") if p.name.lower() != "readme.md"])

    lines: list[str] = []
    lines.append("# Pattern Cards Summary")
    lines.append("")
    lines.append(f"Source: `{d}`")
    lines.append("")
    if not cards:
        lines.append("No pattern cards yet.")
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Wrote: {out}")
        return 0

    lines.append("| file | stage | problem | evidence |")
    lines.append("|---|---|---|---|")
    for p in cards:
        text = p.read_text("utf-8", errors="replace")
        stage = extract_field(text, "Funnel stage")
        problem = extract_field(text, "Problem it solves")
        # Evidence lines
        evidence_store = ""
        evidence_url = ""
        evidence_shot = ""
        for line in text.splitlines():
            l = line.strip()
            if l.lower().startswith("- store:"):
                evidence_store = l.split(":", 1)[1].strip()
            if l.lower().startswith("- page url:"):
                evidence_url = l.split(":", 1)[1].strip()
            if l.lower().startswith("- screenshot link:"):
                evidence_shot = l.split(":", 1)[1].strip()
        evidence = " / ".join([x for x in [evidence_store, evidence_url, evidence_shot] if x]) or ""
        # Table-safe
        def cell(s: str) -> str:
            return (s or "").replace("\n", " ").replace("|", " / ").strip()

        lines.append(f"| {cell(p.name)} | {cell(stage)} | {cell(problem)} | {cell(evidence)} |")

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

