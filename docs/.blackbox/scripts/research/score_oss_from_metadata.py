#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


PERMISSIVE = {"MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "0BSD", "MPL-2.0"}
COPYLEFT = {"GPL-2.0", "GPL-3.0", "AGPL-3.0", "LGPL-2.1", "LGPL-3.0"}


@dataclass(frozen=True)
class ScoredRepo:
    full_name: str
    url: str
    license: str
    language: str
    stars: int
    updated_at: str
    score: int
    rationale: str


def parse_dt(s: str) -> datetime | None:
    if not s:
        return None
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00"))
    except Exception:  # noqa: BLE001
        return None


def clamp(n: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, n))


def score_repo(meta: dict[str, Any]) -> tuple[int, str]:
    stars = int(meta.get("stargazers_count") or 0)
    updated_at = meta.get("updated_at") or ""
    lang = (meta.get("language") or "").strip()

    lic = "UNKNOWN"
    if meta.get("license"):
        lic = meta["license"].get("spdx_id") or meta["license"].get("key") or "UNKNOWN"
    # Optional override (set externally before calling score_repo)
    if meta.get("_license_override"):
        lic = str(meta["_license_override"])

    # Heuristic scoring: we only use what we can justify from metadata.
    # Usefulness is left as a baseline until humans/agents fill the entry.
    usefulness = 10  # /30 baseline

    # Integration ease: favor JS/TS; unknown languages get neutral.
    if lang in {"TypeScript", "JavaScript"}:
        integration = 22
    elif lang in {"Python", "Go"}:
        integration = 16
    else:
        integration = 12

    # Maintenance: combine stars + recency.
    stars_component = clamp((stars ** 0.5) * 2.0, 0, 14)  # ~0-14
    recency_component = 0.0
    dt = parse_dt(updated_at)
    if dt:
        days = (datetime.now(timezone.utc) - dt).days
        if days <= 30:
            recency_component = 6
        elif days <= 180:
            recency_component = 4
        elif days <= 365:
            recency_component = 2
        else:
            recency_component = 0
    maintenance = int(clamp(stars_component + recency_component, 0, 20))

    # License friendliness
    if lic in {"PROPRIETARY", "SUL-1.0", "BUSL-1.1", "ELv2"}:
        license_score = 0
    elif lic in PERMISSIVE:
        license_score = 15
    elif lic in COPYLEFT:
        license_score = 7
    elif lic == "UNKNOWN":
        license_score = 5
    else:
        license_score = 10

    # Time-to-value: more stars + JS/TS suggests easier adoption.
    ttv = 5
    if stars >= 5000:
        ttv += 3
    elif stars >= 1000:
        ttv += 2
    if lang in {"TypeScript", "JavaScript"}:
        ttv += 2
    ttv = int(clamp(ttv, 0, 10))

    total = int(clamp(usefulness + integration + maintenance + license_score + ttv, 0, 100))

    rationale = (
        f"usefulness={usefulness}/30 baseline; integration={integration}/25 ({lang or 'N/A'}); "
        f"maintenance={maintenance}/20 (stars={stars}, updated={updated_at or 'N/A'}); "
        f"license={license_score}/15 ({lic}); time_to_value={ttv}/10"
    )
    return total, rationale


def main() -> int:
    ap = argparse.ArgumentParser(description="Score OSS candidates using GitHub metadata (heuristic).")
    ap.add_argument("--entries-dir", required=True, help="Directory containing *.json metadata files.")
    ap.add_argument("--out-index", required=True, help="Write a scored index markdown file here.")
    ap.add_argument("--out-ranked", required=True, help="Write a ranked short list markdown file here.")
    ap.add_argument("--license-overrides", default="", help="Optional JSON mapping full_name -> SPDX (or PROPRIETARY).")
    args = ap.parse_args()

    entries_dir = Path(args.entries_dir)
    json_files = sorted(entries_dir.glob("*.json"))
    if not json_files:
        raise SystemExit("No *.json files found in entries-dir. Run fetch_github_repos.py with --dump-json first.")

    overrides: dict[str, str] = {}
    if args.license_overrides:
        ov_path = Path(args.license_overrides)
        if ov_path.exists():
            overrides = json.loads(ov_path.read_text("utf-8"))

    scored: list[ScoredRepo] = []
    for p in json_files:
        meta = json.loads(p.read_text("utf-8"))
        full = meta.get("full_name") or p.stem
        if overrides and full in overrides:
            meta["_license_override"] = overrides[full]
        score, rationale = score_repo(meta)
        url = meta.get("html_url") or ""
        lic = "UNKNOWN"
        if meta.get("_license_override"):
            lic = str(meta["_license_override"])
        elif meta.get("license"):
            lic = meta["license"].get("spdx_id") or meta["license"].get("key") or "UNKNOWN"
        lang = meta.get("language") or "N/A"
        stars = int(meta.get("stargazers_count") or 0)
        updated_at = meta.get("updated_at") or ""
        scored.append(
            ScoredRepo(
                full_name=full,
                url=url,
                license=lic,
                language=lang,
                stars=stars,
                updated_at=updated_at,
                score=score,
                rationale=rationale,
            )
        )

    scored.sort(key=lambda r: (r.score, r.stars), reverse=True)

    out_index = Path(args.out_index)
    lines: list[str] = []
    lines.append("# OSS Index (scored from GitHub metadata; provisional)")
    lines.append("")
    lines.append("Rubric: `../process/rubric.md`")
    lines.append("")
    if args.license_overrides:
        lines.append(f"License overrides: `{args.license_overrides}`")
        lines.append("")
    lines.append("Note: Scores are heuristic-only until entries are manually reviewed (usefulness remains baseline).")
    lines.append("")
    lines.append("Format:")
    lines.append("- `Rank — Repo — Score — Stars — License — Language — Updated — URL`")
    lines.append("")
    for i, r in enumerate(scored, 1):
        lines.append(
            f"{i}. {r.full_name} — {r.score} — {r.stars} — {r.license} — {r.language} — {r.updated_at or 'N/A'} — {r.url}"
        )
    out_index.write_text("\n".join(lines) + "\n", encoding="utf-8")

    out_ranked = Path(args.out_ranked)
    top = scored[:25]
    lines = []
    lines.append("# OSS Ranked Shortlist (top 25, provisional)")
    lines.append("")
    lines.append("These are ranked using GitHub metadata only (stars/recency/license/lang).")
    if args.license_overrides:
        lines.append(f"License overrides applied: `{args.license_overrides}`")
    lines.append("Next step: fill usefulness + integration notes inside each entry markdown file.")
    lines.append("")
    for i, r in enumerate(top, 1):
        lines.append(f"## {i}) {r.full_name} — score {r.score}")
        lines.append("")
        lines.append(f"- URL: {r.url}")
        lines.append(f"- License: {r.license}")
        lines.append(f"- Language: {r.language}")
        lines.append(f"- Stars: {r.stars}")
        lines.append(f"- Updated: {r.updated_at or 'N/A'}")
        lines.append(f"- Rationale: {r.rationale}")
        lines.append("")
    out_ranked.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"Wrote scored index: {out_index}")
    print(f"Wrote ranked shortlist: {out_ranked}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
