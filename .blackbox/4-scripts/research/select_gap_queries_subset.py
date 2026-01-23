#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path


def extract_tag(heading_line: str) -> str:
    """
    Convert a section heading like:
      "## returns (count=0)"
    into:
      "returns"
    """
    s = heading_line.removeprefix("## ").strip()
    if not s:
        return ""
    # Prefer split before " (" if present.
    if " (" in s:
        s = s.split(" (", 1)[0].strip()
    # If still multiple words, take first token as "tag".
    return s.split(" ", 1)[0].strip()


def main() -> int:
    ap = argparse.ArgumentParser(description="Select the first N gap-tag sections from a gap-queries markdown file.")
    ap.add_argument("--in", dest="in_path", required=True, help="Input markdown (from suggest_oss_gap_queries.py)")
    ap.add_argument("--out", required=True, help="Output markdown containing only the selected sections")
    ap.add_argument("--max-tags", type=int, default=3, help="Maximum tag sections to include")
    ap.add_argument("--start-index", type=int, default=0, help="Start section index (0-based)")
    ap.add_argument("--wrap", action="store_true", help="Wrap around when selecting sections")
    ap.add_argument("--exclude-tags", default="", help="Comma-separated tag names to skip (best-effort).")
    ap.add_argument("--out-tags-json", default="", help="Optional: write selected tags metadata JSON here.")
    args = ap.parse_args()

    src = Path(args.in_path)
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)

    lines = src.read_text("utf-8", errors="replace").splitlines()
    header: list[str] = []
    sections: list[list[str]] = []

    current: list[str] | None = None
    for raw in lines:
        line = raw.rstrip("\n")
        if line.startswith("## "):
            if current is not None:
                sections.append(current)
            current = [line]
            continue
        if current is None:
            header.append(line)
        else:
            current.append(line)

    if current is not None:
        sections.append(current)

    excluded = {t.strip() for t in (args.exclude_tags or "").split(",") if t.strip()}

    # Pre-filter sections by excluded tag names (best-effort; keeps ordering).
    if excluded:
        filtered_sections: list[list[str]] = []
        for sec in sections:
            tag = extract_tag(sec[0]) if sec else ""
            if tag and tag in excluded:
                continue
            filtered_sections.append(sec)
        sections = filtered_sections

    selected: list[list[str]] = []
    if sections:
        max_tags = max(0, int(args.max_tags))
        start = int(args.start_index) if args.start_index is not None else 0
        if start < 0:
            start = 0
        if args.wrap:
            start = start % len(sections)
            for i in range(min(max_tags, len(sections))):
                selected.append(sections[(start + i) % len(sections)])
        else:
            start = min(start, len(sections))
            selected = sections[start : start + max_tags]

    # If there are no sections, keep the original header so downstream scripts can still parse.
    out_lines: list[str] = []
    out_lines.extend(header)
    if header and header[-1].strip() != "":
        out_lines.append("")
    for sec in selected:
        # Ensure blank line between sections
        if out_lines and out_lines[-1].strip() != "":
            out_lines.append("")
        out_lines.extend(sec)
    out.write_text("\n".join(out_lines).rstrip() + "\n", encoding="utf-8")

    if args.out_tags_json:
        selected_tags = []
        for sec in selected:
            if not sec:
                continue
            if sec[0].startswith("## "):
                t = extract_tag(sec[0])
                if t:
                    selected_tags.append(t)
        payload = {
            "generated_at_utc": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "source": str(src),
            "out": str(out),
            "excluded_tags": sorted(excluded),
            "selected_tags": selected_tags,
            "total_sections_after_exclude": len(sections),
            "max_tags": int(args.max_tags),
            "start_index": int(args.start_index),
            "wrap": bool(args.wrap),
        }
        Path(args.out_tags_json).parent.mkdir(parents=True, exist_ok=True)
        Path(args.out_tags_json).write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
