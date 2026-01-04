#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "entry"


def entry_path_for_full_name(full_name: str) -> str:
    # Align with fetch_github_repos.py output naming (safe_slug(owner/repo)).
    return f"oss/entries/{safe_slug(full_name)}.md"


@dataclass(frozen=True)
class Row:
    full_name: str
    url: str
    score: int
    license_spdx: str
    license_bucket: str
    language: str
    stars: int
    updated_at: str
    tags: list[str]


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate an OSS deepening queue from artifacts/extracted.json.")
    ap.add_argument("--extracted-json", required=True, help="Path to artifacts/extracted.json")
    ap.add_argument("--out", required=True, help="Write markdown deepening queue here.")
    ap.add_argument("--top", type=int, default=20, help="Top N candidates to include.")
    args = ap.parse_args()

    extracted_path = Path(args.extracted_json)
    payload: dict[str, Any] = json.loads(extracted_path.read_text("utf-8"))
    candidates = payload.get("candidates") or []
    if not isinstance(candidates, list) or not candidates:
        out = Path(args.out)
        out.parent.mkdir(parents=True, exist_ok=True)
        lines: list[str] = []
        lines.append("# OSS Deepening Queue")
        lines.append("")
        lines.append(f"Source: `{extracted_path}`")
        lines.append("")
        lines.append("No candidates found in extracted.json.")
        lines.append("")
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Wrote deepening queue: {out}")
        return 0

    rows: list[Row] = []
    for c in candidates:
        if not isinstance(c, dict):
            continue
        rows.append(
            Row(
                full_name=str(c.get("full_name") or ""),
                url=str(c.get("url") or ""),
                score=int(c.get("score") or 0),
                license_spdx=str(c.get("license_spdx") or "UNKNOWN"),
                license_bucket=str(c.get("license_bucket") or "verify"),
                language=str(c.get("language") or "N/A"),
                stars=int(c.get("stars") or 0),
                updated_at=str(c.get("updated_at") or ""),
                tags=[str(t) for t in (c.get("tags") or [])],
            )
        )

    # Keep ordering as already sorted in extracted.json, but defensive sort anyway.
    rows.sort(key=lambda r: (r.score, r.stars), reverse=True)
    rows = rows[: max(1, int(args.top))]

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    lines.append("# OSS Deepening Queue")
    lines.append("")
    lines.append("Goal: turn high-scoring OSS candidates into *integration-ready picks*.")
    lines.append("")
    lines.append("For each item, fill its entry file with:")
    lines.append("- what we’d use it for (specific)")
    lines.append("- 1 day POC slice (concrete)")
    lines.append("- 1 week integration plan (concrete)")
    lines.append("- risks (maintenance/security/scope/license)")
    lines.append("")

    for i, r in enumerate(rows, 1):
        entry_path = entry_path_for_full_name(r.full_name)
        tags = ", ".join(r.tags[:10])
        lines.append(f"## {i}) {r.full_name}")
        lines.append("")
        lines.append(f"- Repo: {r.url}")
        lines.append(f"- Score: {r.score}")
        lines.append(f"- Stars: {r.stars}")
        lines.append(f"- License: {r.license_spdx} ({r.license_bucket})")
        lines.append(f"- Language: {r.language}")
        lines.append(f"- Updated: {r.updated_at or 'N/A'}")
        if tags:
            lines.append(f"- Tags: {tags}")
        lines.append(f"- Entry file: `{entry_path}`")
        lines.append("")
        lines.append("- [ ] Deepen (fill entry: use-case + POC + 1 week plan + risks)")
        lines.append("")

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote deepening queue: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
