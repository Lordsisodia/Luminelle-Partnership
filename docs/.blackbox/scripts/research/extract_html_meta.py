#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Meta:
    file: str
    title: str
    description: str
    og_description: str


TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)
META_DESC_RE = re.compile(
    r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\'][^>]*>',
    re.IGNORECASE | re.DOTALL,
)
OG_DESC_RE = re.compile(
    r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\'](.*?)["\'][^>]*>',
    re.IGNORECASE | re.DOTALL,
)


def clean(s: str) -> str:
    s = re.sub(r"\s+", " ", s.strip())
    s = html.unescape(s)
    return s


def extract(text: str) -> tuple[str, str, str]:
    title = ""
    desc = ""
    og_desc = ""
    m = TITLE_RE.search(text)
    if m:
        title = clean(m.group(1))
    m = META_DESC_RE.search(text)
    if m:
        desc = clean(m.group(1))
    m = OG_DESC_RE.search(text)
    if m:
        og_desc = clean(m.group(1))
    return title, desc, og_desc


def main() -> int:
    ap = argparse.ArgumentParser(description="Extract <title> + meta descriptions from snapshot HTML files.")
    ap.add_argument("--snapshots-dir", required=True, help="Directory containing *.html snapshots.")
    ap.add_argument("--out", required=True, help="Write a markdown report here.")
    ap.add_argument("--limit", type=int, default=0, help="Limit number of files processed (0 = all).")
    args = ap.parse_args()

    d = Path(args.snapshots_dir)
    files = sorted(d.glob("*.html"))
    if args.limit and args.limit > 0:
        files = files[: args.limit]

    rows: list[Meta] = []
    for f in files:
        text = f.read_text("utf-8", errors="replace")
        title, desc, og_desc = extract(text)
        rows.append(
            Meta(
                file=f.name,
                title=title,
                description=desc,
                og_description=og_desc,
            )
        )

    out = Path(args.out)
    lines: list[str] = []
    lines.append("# Snapshot Meta Extract")
    lines.append("")
    lines.append(f"Source: `{d}`")
    lines.append("")
    lines.append("Format:")
    lines.append("- `file`")
    lines.append("- `title`")
    lines.append("- `description` or `og:description` when available")
    lines.append("")

    for r in rows:
        best_desc = r.description or r.og_description
        lines.append(f"## {r.file}")
        lines.append("")
        lines.append(f"- title: {r.title or '(none)'}")
        lines.append(f"- description: {best_desc or '(none)'}")
        if r.description and r.og_description and r.description != r.og_description:
            lines.append(f"- og:description: {r.og_description}")
        lines.append("")

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote report: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

