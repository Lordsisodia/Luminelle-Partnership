#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class Row:
    full_name: str
    url: str
    license: str
    language: str
    stars: int
    updated_at: str
    entry_md: str
    use_cases: list[str]


def infer_use_cases(meta: dict[str, Any]) -> list[str]:
    text = " ".join(
        [
            (meta.get("name") or ""),
            (meta.get("full_name") or ""),
            (meta.get("description") or ""),
            " ".join(meta.get("topics") or []),
        ]
    ).lower()
    rules = {
        "admin scaffolding": ["react-admin", "admin", "dashboard", "internal tools", "crud"],
        "workflow automation": ["workflow", "orchestration", "scheduler", "automation", "queue"],
        "commerce core": ["commerce", "ecommerce", "shop", "cart", "checkout"],
        "cms/content": ["cms", "content", "headless", "editor"],
        "search": ["search", "meilisearch", "typesense"],
        "analytics": ["analytics", "events", "session replay", "tracking", "attribution"],
        "feature flags": ["feature flag", "feature-flag", "flags"],
        "observability": ["tracing", "logging", "monitoring", "observability"],
    }
    found: list[str] = []
    for use, needles in rules.items():
        for n in needles:
            if n in text:
                found.append(use)
                break
    return found or ["(fill)"]


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate an OSS deepening queue (top N) with entry paths + use-cases.")
    ap.add_argument("--entries-dir", required=True, help="Directory containing *.json metadata files.")
    ap.add_argument("--plan-id", required=True, help="Plan folder name (for stable links).")
    ap.add_argument("--out", required=True, help="Write markdown queue here.")
    ap.add_argument("--top", type=int, default=20, help="Top N by stars.")
    args = ap.parse_args()

    d = Path(args.entries_dir)
    json_files = sorted(d.glob("*.json"))
    if not json_files:
        raise SystemExit("No *.json files found.")

    rows: list[Row] = []
    for p in json_files:
        meta = json.loads(p.read_text("utf-8"))
        full = meta.get("full_name") or p.stem
        url = meta.get("html_url") or ""
        lic = "UNKNOWN"
        if meta.get("license"):
            lic = meta["license"].get("spdx_id") or meta["license"].get("key") or "UNKNOWN"
        lang = meta.get("language") or "N/A"
        stars = int(meta.get("stargazers_count") or 0)
        updated_at = meta.get("updated_at") or ""
        use_cases = infer_use_cases(meta)
        entry_md = f".blackbox/.plans/{args.plan_id}/artifacts/market/oss/entries/{full.lower().replace('/', '-')}.md"
        rows.append(
            Row(
                full_name=str(full),
                url=str(url),
                license=str(lic),
                language=str(lang),
                stars=stars,
                updated_at=str(updated_at),
                entry_md=entry_md,
                use_cases=use_cases,
            )
        )

    rows.sort(key=lambda r: r.stars, reverse=True)
    rows = rows[: args.top]

    out = Path(args.out)
    lines: list[str] = []
    lines.append("# OSS Deepening Queue (top)")
    lines.append("")
    lines.append("Goal: turn the top OSS candidates into *integration-ready picks* (vibe coding).")
    lines.append("")
    lines.append("For each item, fill in its entry file:")
    lines.append("- what we’d use it for")
    lines.append("- 1 day POC slice")
    lines.append("- 1 week integration plan")
    lines.append("- risks + license notes")
    lines.append("")

    for i, r in enumerate(rows, 1):
        lines.append(f"## {i}) {r.full_name}")
        lines.append("")
        lines.append(f"- Repo: {r.url}")
        lines.append(f"- Stars: {r.stars}")
        lines.append(f"- License: {r.license}")
        lines.append(f"- Language: {r.language}")
        lines.append(f"- Updated: {r.updated_at or 'N/A'}")
        lines.append(f"- Suggested use-cases: {', '.join(r.use_cases)}")
        lines.append(f"- Entry file: `{r.entry_md}`")
        lines.append("")

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote OSS deepening queue: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

