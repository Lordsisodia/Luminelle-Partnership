#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Issue:
    row: int
    field: str
    message: str


def parse_markdown_table(md: str) -> list[list[str]]:
    rows: list[list[str]] = []
    in_table = False
    for line in md.splitlines():
        l = line.strip()
        if not l:
            continue
        if l.startswith("| pattern |") and "| module |" in l and "| feature |" in l:
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
    ap = argparse.ArgumentParser(description="Validate the pattern→backlog mapping markdown table.")
    ap.add_argument("--mapping-md", required=True, help="pattern-to-backlog-mapping.md")
    ap.add_argument("--strict", action="store_true", help="Fail on placeholder evidence text.")
    args = ap.parse_args()

    p = Path(args.mapping_md)
    if not p.exists():
        raise SystemExit(f"Not found: {p}")

    text = p.read_text("utf-8", errors="replace")
    rows = parse_markdown_table(text)
    issues: list[Issue] = []

    if not rows:
        issues.append(Issue(row=0, field="table", message="no mapping rows found (expected a markdown table)"))
    else:
        for i, r in enumerate(rows, start=1):
            while len(r) < 6:
                r.append("")
            pattern, module, feature, why, evidence, acceptance = [x.strip() for x in r[:6]]
            if not pattern:
                issues.append(Issue(row=i, field="pattern", message="missing"))
            if not module:
                issues.append(Issue(row=i, field="module", message="missing"))
            if not feature:
                issues.append(Issue(row=i, field="feature", message="missing"))
            if not why:
                issues.append(Issue(row=i, field="why", message="missing"))
            if not evidence:
                issues.append(Issue(row=i, field="evidence", message="missing"))
            if not acceptance:
                issues.append(Issue(row=i, field="acceptance", message="missing"))

            if args.strict and evidence:
                low = evidence.lower()
                if "store / url / screenshot" in low or low.strip() in {"store / url / screenshot", "store/url/screenshot"}:
                    issues.append(Issue(row=i, field="evidence", message="placeholder text; replace with real store+URL+screenshot"))

    if issues:
        print(f"Found {len(issues)} issues in {p}:")
        for iss in issues[:200]:
            loc = "header" if iss.row == 0 else f"row {iss.row}"
            print(f"- {loc}: {iss.field} — {iss.message}")
        if len(issues) > 200:
            print(f"(truncated; showing first 200 of {len(issues)})")
        return 1

    print(f"OK: {p} (no issues)")
    return 0


if __name__ == "__main__":
    sys.exit(main())

