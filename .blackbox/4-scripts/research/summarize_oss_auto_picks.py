#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any


KEY_TAGS = ["returns", "shipping", "support", "workflows", "policy", "auth", "commerce", "admin", "analytics", "search", "cms"]


@dataclass(frozen=True)
class Candidate:
    full_name: str
    url: str
    score: int
    stars: int
    license_bucket: str
    license_spdx: str
    language: str
    updated_at: str
    tags: list[str]
    description: str


def load_candidates(extracted_json: Path) -> list[Candidate]:
    payload: dict[str, Any] = json.loads(extracted_json.read_text("utf-8"))
    raw = payload.get("candidates") or []
    out: list[Candidate] = []
    for c in raw:
        if not isinstance(c, dict):
            continue
        out.append(
            Candidate(
                full_name=str(c.get("full_name") or ""),
                url=str(c.get("url") or ""),
                score=int(c.get("score") or 0),
                stars=int(c.get("stars") or 0),
                license_bucket=str(c.get("license_bucket") or "verify"),
                license_spdx=str(c.get("license_spdx") or "UNKNOWN"),
                language=str(c.get("language") or "N/A"),
                updated_at=str(c.get("updated_at") or ""),
                tags=[str(t) for t in (c.get("tags") or [])],
                description=str(c.get("description") or ""),
            )
        )
    out = [c for c in out if c.full_name]
    out.sort(key=lambda c: (c.score, c.stars), reverse=True)
    return out


def md_escape(s: str) -> str:
    return (s or "").replace("\n", " ").replace("|", " / ").strip()


def is_quick_win(c: Candidate) -> bool:
    if c.license_bucket != "safe":
        return False
    if c.score < 72:
        return False
    if c.language not in {"TypeScript", "JavaScript", "Python"}:
        return False
    return True


def main() -> int:
    ap = argparse.ArgumentParser(description="Auto-picks summary from OSS extracted.json")
    ap.add_argument("--extracted-json", required=True, help="Path to artifacts/extracted.json")
    ap.add_argument("--out", required=True, help="Write markdown summary here.")
    ap.add_argument("--top", type=int, default=10, help="Top N overall picks.")
    ap.add_argument("--top-per-tag", type=int, default=3, help="Top N per key tag.")
    args = ap.parse_args()

    extracted = Path(args.extracted_json)
    candidates = load_candidates(extracted)

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    lines.append("# Auto Picks (OSS discovery)")
    lines.append("")
    lines.append(f"Source: `{extracted}`")
    lines.append("")

    if not candidates:
        lines.append("No candidates found.")
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Wrote auto picks: {out}")
        return 0

    lines.append("## Top overall (heuristic)")
    lines.append("")
    lines.append("| rank | repo | score | stars | license | lang | tags | url |")
    lines.append("|---:|---|---:|---:|---|---|---|---|")
    for i, c in enumerate(candidates[: args.top], 1):
        tags = ", ".join(c.tags[:6])
        lic = f"{c.license_spdx} ({c.license_bucket})"
        lines.append(
            f"| {i} | {md_escape(c.full_name)} | {c.score} | {c.stars} | {md_escape(lic)} | {md_escape(c.language)} | {md_escape(tags)} | {md_escape(c.url)} |"
        )
    lines.append("")

    quick_wins = [c for c in candidates if is_quick_win(c)]
    lines.append("## Quick wins (fastest POC candidates)")
    lines.append("")
    if not quick_wins:
        lines.append("- None match the current heuristic (safe license + high score + common language).")
    else:
        for c in quick_wins[:10]:
            lines.append(f"- {c.full_name} — score {c.score} — {c.license_spdx} — {c.url}")
    lines.append("")

    by_tag: dict[str, list[Candidate]] = defaultdict(list)
    for c in candidates:
        for t in set(c.tags):
            by_tag[t].append(c)
    for t in list(by_tag.keys()):
        by_tag[t].sort(key=lambda c: (c.score, c.stars), reverse=True)

    lines.append("## Top per key tag")
    lines.append("")
    for tag in KEY_TAGS:
        bucket = by_tag.get(tag, [])
        lines.append(f"### {tag}")
        lines.append("")
        if not bucket:
            lines.append("- No candidates in this tranche.")
            lines.append("")
            continue
        for c in bucket[: args.top_per_tag]:
            lines.append(f"- {c.full_name} — score {c.score} — {c.license_spdx} ({c.license_bucket}) — {c.url}")
        lines.append("")

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote auto picks: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

