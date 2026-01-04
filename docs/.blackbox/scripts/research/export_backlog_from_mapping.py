#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from pathlib import Path


def parse_markdown_table(md: str) -> list[list[str]]:
    rows: list[list[str]] = []
    in_table = False
    for line in md.splitlines():
        l = line.strip()
        if not l:
            continue
        if l.startswith("| pattern |") and "| module |" in l:
            in_table = True
            continue
        if in_table and l.startswith("|---"):
            continue
        if in_table:
            if not l.startswith("|"):
                break
            parts = [p.strip() for p in l.strip("|").split("|")]
            if parts:
                rows.append(parts)
    return rows


def main() -> int:
    ap = argparse.ArgumentParser(description="Export the pattern→backlog mapping table into CSV/MD artifacts.")
    ap.add_argument("--mapping-md", required=True, help="pattern-to-backlog-mapping.md path")
    ap.add_argument("--out-csv", required=True, help="Write backlog CSV here")
    ap.add_argument("--out-md", required=True, help="Write backlog markdown summary here")
    args = ap.parse_args()

    mapping = Path(args.mapping_md)
    out_csv = Path(args.out_csv)
    out_md = Path(args.out_md)

    text = mapping.read_text("utf-8", errors="replace")
    table_rows = parse_markdown_table(text)

    # Expected columns in mapping doc:
    # | pattern | module | feature | why | evidence | acceptance |
    cleaned: list[dict[str, str]] = []
    for r in table_rows:
        while len(r) < 6:
            r.append("")
        pattern, module, feature, why, evidence, acceptance = r[:6]
        cleaned.append(
            {
                "pattern": pattern,
                "module": module,
                "feature": feature,
                "why": why,
                "evidence": evidence,
                "acceptance": acceptance,
            }
        )

    out_csv.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = ["pattern", "module", "feature", "why", "evidence", "acceptance"]
    with out_csv.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for row in cleaned:
            w.writerow(row)

    # Markdown summary for quick review.
    lines: list[str] = []
    lines.append("# Backlog Export (Pattern → Feature)")
    lines.append("")
    lines.append(f"Source: `{mapping}`")
    lines.append(f"CSV: `{out_csv}`")
    lines.append("")
    if not cleaned:
        lines.append("No backlog rows found in mapping table yet.")
    else:
        lines.append("| pattern | module | feature |")
        lines.append("|---|---|---|")
        for row in cleaned:
            # Keep it short in the MD view.
            def cell(s: str) -> str:
                return (s or "").replace("\n", " ").replace("|", " / ").strip()

            lines.append(f"| {cell(row['pattern'])} | {cell(row['module'])} | {cell(row['feature'])} |")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"Wrote: {out_csv}")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

