#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from datetime import datetime, timezone
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
    tags: str
    description: str


def parse_dt(s: str) -> datetime | None:
    if not s:
        return None
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00"))
    except Exception:  # noqa: BLE001
        return None


def table_cell(s: str) -> str:
    s = (s or "").replace("\n", " ").strip()
    s = s.replace("|", " / ")
    s = re.sub(r"\s{2,}", " ", s)
    return s


def infer_tags(meta: dict[str, Any]) -> list[str]:
    text = " ".join(
        [
            (meta.get("name") or ""),
            (meta.get("full_name") or ""),
            (meta.get("description") or ""),
            " ".join(meta.get("topics") or []),
        ]
    ).lower()
    tags: list[str] = []
    rules = {
        "commerce": ["commerce", "ecommerce", "shop", "store", "cart", "checkout"],
        "admin": ["admin", "dashboard", "internal-tools", "crud"],
        "cms": ["cms", "content", "headless"],
        "search": ["search", "meilisearch", "typesense"],
        "analytics": ["analytics", "product-analytics", "events", "telemetry"],
        "flags": ["feature-flag", "featureflags", "flags"],
        "experimentation": ["ab", "a-b", "experiment", "experimentation"],
        "workflows": ["workflow", "orchestration", "scheduler", "jobs", "queue"],
        "observability": ["observability", "tracing", "logging", "monitoring"],
    }
    for tag, needles in rules.items():
        for n in needles:
            if n in text:
                tags.append(tag)
                break
    return tags


def main() -> int:
    ap = argparse.ArgumentParser(description="Summarize OSS json metadata into a triage table.")
    ap.add_argument("--entries-dir", required=True, help="Directory containing *.json metadata files.")
    ap.add_argument("--out", required=True, help="Write markdown report here.")
    ap.add_argument("--limit", type=int, default=0, help="Only include top N by stars (0 = all).")
    ap.add_argument("--license-overrides", default="", help="Optional JSON mapping full_name -> SPDX (or PROPRIETARY).")
    args = ap.parse_args()

    entries_dir = Path(args.entries_dir)
    json_files = sorted(entries_dir.glob("*.json"))
    if not json_files:
        raise SystemExit("No *.json metadata files found.")

    overrides: dict[str, str] = {}
    if args.license_overrides:
        p = Path(args.license_overrides)
        if p.exists():
            overrides = json.loads(p.read_text("utf-8"))

    rows: list[Row] = []
    for p in json_files:
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
        tags = ", ".join(infer_tags(meta))
        rows.append(
            Row(
                full_name=str(full),
                url=str(url),
                license=str(lic),
                language=str(lang),
                stars=stars,
                updated_at=str(updated_at),
                tags=str(tags),
                description=desc,
            )
        )

    rows.sort(key=lambda r: r.stars, reverse=True)
    if args.limit and args.limit > 0:
        rows = rows[: args.limit]

    out = Path(args.out)
    lines: list[str] = []
    lines.append("# OSS Triage (from GitHub metadata)")
    lines.append("")
    lines.append(f"Source: `{entries_dir}`")
    lines.append("")
    lines.append("| repo | stars | license | lang | updated | tags | url | description |")
    lines.append("|---|---:|---|---|---|---|---|---|")
    for r in rows:
        lines.append(
            "| "
            + " | ".join(
                [
                    table_cell(r.full_name),
                    str(r.stars),
                    table_cell(r.license),
                    table_cell(r.language),
                    table_cell(r.updated_at),
                    table_cell(r.tags),
                    table_cell(r.url),
                    table_cell(r.description),
                ]
            )
            + " |"
        )

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote report: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
