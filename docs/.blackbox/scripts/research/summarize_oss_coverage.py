#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class Candidate:
    full_name: str
    url: str
    score: int
    stars: int
    license_spdx: str
    license_bucket: str
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
                license_spdx=str(c.get("license_spdx") or "UNKNOWN"),
                license_bucket=str(c.get("license_bucket") or "verify"),
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


def main() -> int:
    ap = argparse.ArgumentParser(description="Summarize OSS discovery coverage (tags/licenses/langs) from extracted.json.")
    ap.add_argument("--extracted-json", required=True, help="Path to artifacts/extracted.json")
    ap.add_argument("--out", required=True, help="Write markdown summary here.")
    ap.add_argument("--top-per-tag", type=int, default=5, help="Show top N candidates per tag.")
    args = ap.parse_args()

    extracted_json = Path(args.extracted_json)
    candidates = load_candidates(extracted_json)
    if not candidates:
        out = Path(args.out)
        out.parent.mkdir(parents=True, exist_ok=True)
        lines: list[str] = []
        lines.append("# OSS Coverage + Risk Summary")
        lines.append("")
        lines.append(f"Source: `{extracted_json}`")
        lines.append("")
        lines.append("No candidates found in extracted.json.")
        lines.append("")
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Wrote coverage report: {out}")
        return 0

    tag_counts: Counter[str] = Counter()
    for c in candidates:
        tag_counts.update(set(c.tags))

    license_counts = Counter(c.license_bucket for c in candidates)
    lang_counts = Counter(c.language for c in candidates)

    by_tag: dict[str, list[Candidate]] = defaultdict(list)
    for c in candidates:
        for t in set(c.tags):
            by_tag[t].append(c)

    # Sort candidates in each tag bucket.
    for t in list(by_tag.keys()):
        by_tag[t].sort(key=lambda c: (c.score, c.stars), reverse=True)

    flagged = [c for c in candidates if c.license_bucket == "flagged"]
    verify = [c for c in candidates if c.license_bucket == "verify"]

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    lines.append("# OSS Coverage + Risk Summary")
    lines.append("")
    lines.append(f"Source: `{extracted_json}`")
    lines.append("")
    lines.append("## Snapshot")
    lines.append("")
    lines.append(f"- Total candidates: {len(candidates)}")
    lines.append(f"- License buckets: safe={license_counts.get('safe',0)}, verify={license_counts.get('verify',0)}, flagged={license_counts.get('flagged',0)}")
    lines.append("")
    lines.append("## Coverage by tag (count)")
    lines.append("")
    for tag, count in tag_counts.most_common(30):
        if not tag:
            continue
        lines.append(f"- {tag}: {count}")
    lines.append("")
    lines.append("## Coverage by language (count)")
    lines.append("")
    for lang, count in lang_counts.most_common(20):
        lines.append(f"- {lang}: {count}")
    lines.append("")
    lines.append("## License risks (flagged)")
    lines.append("")
    if not flagged:
        lines.append("- None in this tranche.")
    else:
        for c in flagged[:25]:
            lines.append(f"- {c.full_name} — {c.license_spdx} — score {c.score} — {c.url}")
    lines.append("")
    lines.append("## License needs verification")
    lines.append("")
    if not verify:
        lines.append("- None in this tranche.")
    else:
        for c in verify[:25]:
            lines.append(f"- {c.full_name} — {c.license_spdx} — score {c.score} — {c.url}")
    lines.append("")
    lines.append("## Top candidates per tag")
    lines.append("")
    for tag, _count in tag_counts.most_common(15):
        if not tag:
            continue
        lines.append(f"### {tag}")
        lines.append("")
        lines.append("| repo | score | stars | license | bucket | url |")
        lines.append("|---|---:|---:|---|---|---|")
        for c in by_tag.get(tag, [])[: args.top_per_tag]:
            lines.append(
                f"| {md_escape(c.full_name)} | {c.score} | {c.stars} | {md_escape(c.license_spdx)} | {md_escape(c.license_bucket)} | {md_escape(c.url)} |"
            )
        lines.append("")

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote coverage report: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
