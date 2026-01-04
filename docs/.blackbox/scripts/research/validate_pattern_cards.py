#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Issue:
    file: str
    message: str


def get_value(lines: list[str], prefix: str) -> str:
    low_prefix = prefix.lower()
    for line in lines:
        l = line.strip()
        if l.lower().startswith(low_prefix):
            return l.split(":", 1)[1].strip() if ":" in l else ""
    return ""


def main() -> int:
    ap = argparse.ArgumentParser(description="Validate ecommerce pattern cards (evidence required).")
    ap.add_argument("--patterns-dir", required=True, help="Directory containing pattern card .md files.")
    ap.add_argument("--strict", action="store_true", help="Fail on placeholders (empty evidence, missing mechanism).")
    args = ap.parse_args()

    d = Path(args.patterns_dir)
    if not d.exists():
        raise SystemExit(f"Not found: {d}")

    files = sorted([p for p in d.glob("*.md") if p.name.lower() != "readme.md"])
    issues: list[Issue] = []

    for p in files:
        lines = p.read_text("utf-8", errors="replace").splitlines()
        store = get_value(lines, "- Store")
        url = get_value(lines, "- Page URL")
        screenshot = get_value(lines, "- Screenshot link")
        stage = get_value(lines, "Funnel stage")
        problem = get_value(lines, "Problem it solves")
        why = get_value(lines, "Why it works")

        if not stage:
            issues.append(Issue(file=p.name, message="missing Funnel stage"))
        if not problem:
            issues.append(Issue(file=p.name, message="missing Problem it solves"))
        if args.strict and not why:
            issues.append(Issue(file=p.name, message="missing Why it works (mechanism)"))

        if not store or not url or not screenshot:
            issues.append(Issue(file=p.name, message="missing evidence (Store/Page URL/Screenshot link)"))

        if args.strict:
            for val, label in [(store, "Store"), (url, "Page URL"), (screenshot, "Screenshot link")]:
                low = (val or "").lower()
                if "http" not in low and label != "Store":
                    issues.append(Issue(file=p.name, message=f"{label} does not look like a URL"))
                if "store" in low and "url" in low and "screenshot" in low:
                    issues.append(Issue(file=p.name, message=f"{label} looks like placeholder text"))

    if issues:
        print(f"Found {len(issues)} issues in {d}:")
        for iss in issues[:200]:
            print(f"- {iss.file}: {iss.message}")
        if len(issues) > 200:
            print(f"(truncated; showing first 200 of {len(issues)})")
        return 1

    print(f"OK: {d} (no issues)")
    return 0


if __name__ == "__main__":
    sys.exit(main())

