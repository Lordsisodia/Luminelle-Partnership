#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any


PERMISSIVE = {"MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "0BSD", "MPL-2.0"}
COPYLEFT = {"GPL-2.0", "GPL-3.0", "AGPL-3.0", "LGPL-2.1", "LGPL-3.0"}


@dataclass(frozen=True)
class Repo:
    full_name: str
    url: str
    license: str
    language: str
    stars: int
    updated_at: str
    description: str


def license_bucket(spdx: str) -> str:
    if spdx in PERMISSIVE:
        return "permissive"
    if spdx in COPYLEFT:
        return "copyleft"
    if spdx in {"UNKNOWN", "NOASSERTION"}:
        return "unknown"
    return "other"


def main() -> int:
    ap = argparse.ArgumentParser(description="Build a top-N OSS shortlist for integration (vibe-coding).")
    ap.add_argument("--entries-dir", required=True, help="Directory containing *.json metadata.")
    ap.add_argument("--out", required=True, help="Write shortlist markdown here.")
    ap.add_argument("--top", type=int, default=20, help="Top N candidates.")
    ap.add_argument("--license-overrides", default="", help="Optional JSON mapping full_name -> SPDX (or PROPRIETARY).")
    args = ap.parse_args()

    entries_dir = Path(args.entries_dir)
    overrides: dict[str, str] = {}
    if args.license_overrides:
        p = Path(args.license_overrides)
        if p.exists():
            overrides = json.loads(p.read_text("utf-8"))

    repos: list[Repo] = []
    for p in sorted(entries_dir.glob("*.json")):
        meta = json.loads(p.read_text("utf-8"))
        full = meta.get("full_name") or p.stem
        url = meta.get("html_url") or ""
        lic = overrides.get(str(full), "UNKNOWN")
        if lic == "UNKNOWN" and meta.get("license"):
            lic = meta["license"].get("spdx_id") or meta["license"].get("key") or "UNKNOWN"
        lang = meta.get("language") or "N/A"
        stars = int(meta.get("stargazers_count") or 0)
        updated_at = meta.get("updated_at") or ""
        desc = (meta.get("description") or "").strip()
        repos.append(
            Repo(
                full_name=str(full),
                url=str(url),
                license=str(lic),
                language=str(lang),
                stars=stars,
                updated_at=str(updated_at),
                description=desc,
            )
        )

    # Heuristic: favor JS/TS + permissive licenses. Unknown/copy-left can still show up but are labeled.
    def sort_key(r: Repo) -> tuple[int, int, int]:
        lang_bonus = 1 if r.language in {"TypeScript", "JavaScript"} else 0
        lic_bucket = license_bucket(r.license)
        lic_bonus = 2 if lic_bucket == "permissive" else (1 if lic_bucket == "other" else 0)
        # stars dominates; keep bonuses small
        return (r.stars, lic_bonus, lang_bonus)

    repos.sort(key=sort_key, reverse=True)

    top = repos[: args.top]
    out = Path(args.out)
    lines: list[str] = []
    lines.append("# OSS Shortlist (Top 20, vibe-coding oriented)")
    lines.append("")
    lines.append("This shortlist is optimized for:")
    lines.append("- fast integration / MVP acceleration")
    lines.append("- React/TypeScript-heavy stacks")
    lines.append("- license safety (prefer permissive)")
    lines.append("")
    lines.append("Legend:")
    lines.append("- ✅ permissive: MIT/Apache/BSD/etc.")
    lines.append("- ⚠️ unknown: license not asserted in API metadata (verify manually)")
    lines.append("- 🧨 copyleft: GPL/AGPL/LGPL (flag for review)")
    lines.append("")

    for i, r in enumerate(top, 1):
        bucket = license_bucket(r.license)
        mark = "✅"
        if bucket == "unknown":
            mark = "⚠️"
        elif bucket == "copyleft":
            mark = "🧨"
        lines.append(f"## {i}) {r.full_name}")
        lines.append("")
        lines.append(f"- Repo: {r.url}")
        lines.append(f"- Stars: {r.stars}")
        lines.append(f"- License: {mark} {r.license}")
        lines.append(f"- Language: {r.language}")
        lines.append(f"- Updated: {r.updated_at or 'N/A'}")
        if r.description:
            lines.append(f"- Description: {r.description}")
        lines.append("")
        lines.append("Integration notes (fill):")
        lines.append("- What we’d use it for:")
        lines.append("- 1 day POC:")
        lines.append("- 1 week integration:")
        lines.append("- Risks:")
        lines.append("")

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote shortlist: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
