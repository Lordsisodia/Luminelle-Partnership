#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class AuditDoc:
    file: Path
    store: str
    filled_fields: int
    total_fields: int
    filled_evidence_rows: int
    evidence_rows: int


FIELD_PATTERNS = [
    # These should match the audit template lines; a line counts as "filled" if it has content after ':'.
    re.compile(r"^- Name:\s*(.+)$"),
    re.compile(r"^- URL:\s*(.+)$"),
    re.compile(r"^- Niche:\s*(.+)$"),
    re.compile(r"^- Price point:\s*(.+)$"),
    re.compile(r"^- Archetype:\s*(.+)$"),
    re.compile(r"^- Desktop:\s*(.+)$"),
    re.compile(r"^- Mobile:\s*(.+)$"),
    re.compile(r"^- Region \(if relevant\):\s*(.+)$"),
]


def count_filled_fields(text: str) -> tuple[int, int]:
    filled = 0
    total = len(FIELD_PATTERNS)
    for pat in FIELD_PATTERNS:
        m = pat.search(text)
        if not m:
            continue
        v = (m.group(1) or "").strip()
        if v and v not in {"-", "—"} and "YYYY-MM-DD" not in v:
            filled += 1
    return filled, total


def parse_store_name(text: str, fallback: str) -> str:
    m = re.search(r"^- Name:\s*(.+)$", text, flags=re.MULTILINE)
    if m:
        return m.group(1).strip() or fallback
    return fallback


def count_evidence_rows(text: str) -> tuple[int, int]:
    # Detect the Evidence index table and count how many rows have screenshot filled.
    # We consider a row filled if the "screenshot" cell is non-empty.
    lines = text.splitlines()
    try:
        idx = next(i for i, l in enumerate(lines) if l.strip() == "## Evidence index")
    except StopIteration:
        return 0, 0

    # Search for table header after idx.
    table_start = None
    for i in range(idx, min(idx + 40, len(lines))):
        if lines[i].strip().startswith("| page |") and "screenshot" in lines[i]:
            table_start = i
            break
    if table_start is None:
        return 0, 0

    # Rows start after header + separator.
    rows = []
    for i in range(table_start + 2, len(lines)):
        line = lines[i].strip()
        if not line.startswith("|"):
            break
        rows.append(line)

    total = 0
    filled = 0
    for r in rows:
        parts = [p.strip() for p in r.strip("|").split("|")]
        if len(parts) < 3:
            continue
        total += 1
        screenshot_cell = parts[1]
        if screenshot_cell and screenshot_cell not in {"", "-"}:
            filled += 1
    return filled, total


def main() -> int:
    ap = argparse.ArgumentParser(description="Check manual audit docs for completeness (placeholders vs filled).")
    ap.add_argument("--audits-dir", required=True, help="Directory containing per-store audit md files.")
    ap.add_argument("--out-md", required=True, help="Write markdown report here.")
    args = ap.parse_args()

    audits_dir = Path(args.audits_dir)
    out_md = Path(args.out_md)

    ignore = {
        "readme.md",
        "dashboard.md",
        "scorecard-guide.md",
        "scorecard.csv",
    }
    files = sorted([p for p in audits_dir.glob("*.md") if p.name.lower() not in ignore])
    audits: list[AuditDoc] = []
    for p in files:
        text = p.read_text("utf-8", errors="replace")
        # Basic heuristic: ignore docs that aren't per-store funnel audits.
        if "## Funnel notes" not in text:
            continue
        store = parse_store_name(text, fallback=p.stem)
        filled_fields, total_fields = count_filled_fields(text)
        filled_evidence, evidence_rows = count_evidence_rows(text)
        audits.append(
            AuditDoc(
                file=p,
                store=store,
                filled_fields=filled_fields,
                total_fields=total_fields,
                filled_evidence_rows=filled_evidence,
                evidence_rows=evidence_rows,
            )
        )

    lines: list[str] = []
    lines.append("# Audit Docs Completeness")
    lines.append("")
    lines.append(f"Source: `{audits_dir}`")
    lines.append("")
    if not audits:
        lines.append("No audit docs found.")
    else:
        lines.append("| store | file | key fields | evidence rows | next |")
        lines.append("|---|---|---:|---:|---|")
        for a in audits:
            key = f"{a.filled_fields}/{a.total_fields}"
            evid = f"{a.filled_evidence_rows}/{a.evidence_rows}" if a.evidence_rows else "0/0"
            if a.filled_fields == 0 and a.filled_evidence_rows == 0:
                nxt = "run audit"
            elif a.filled_evidence_rows == 0:
                nxt = "add screenshots/urls"
            else:
                nxt = "refine notes + pattern cards"
            lines.append(f"| {a.store.replace('|',' / ')} | {a.file.name} | {key} | {evid} | {nxt} |")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
