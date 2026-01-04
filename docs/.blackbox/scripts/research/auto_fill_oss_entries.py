#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


PERMISSIVE = {"MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "0BSD", "MPL-2.0"}
COPYLEFT = {"GPL-2.0", "GPL-3.0", "AGPL-3.0", "LGPL-2.1", "LGPL-3.0"}


@dataclass(frozen=True)
class Meta:
    full_name: str
    url: str
    license: str
    language: str
    stars: int
    updated_at: str
    topics: list[str]
    description: str


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "entry"


def license_bucket(spdx: str) -> str:
    if spdx in PERMISSIVE:
        return "permissive"
    if spdx in COPYLEFT:
        return "copyleft"
    if spdx in {"UNKNOWN", "NOASSERTION"}:
        return "unknown"
    return "other"


def load_meta(p: Path) -> Meta:
    meta: dict[str, Any] = json.loads(p.read_text("utf-8"))
    full = meta.get("full_name") or p.stem
    url = meta.get("html_url") or ""
    lic = "UNKNOWN"
    if meta.get("license"):
        lic = meta["license"].get("spdx_id") or meta["license"].get("key") or "UNKNOWN"
    language = meta.get("language") or "N/A"
    stars = int(meta.get("stargazers_count") or 0)
    updated_at = meta.get("updated_at") or ""
    topics = meta.get("topics") or []
    desc = (meta.get("description") or "").strip()
    return Meta(
        full_name=str(full),
        url=str(url),
        license=str(lic),
        language=str(language),
        stars=stars,
        updated_at=str(updated_at),
        topics=[str(t) for t in topics],
        description=desc,
    )


def infer_use_cases(m: Meta) -> list[str]:
    text = " ".join([m.full_name, m.description, " ".join(m.topics)]).lower()
    rules = {
        "admin scaffolding": ["react-admin", "admin", "dashboard", "crud", "internal tools"],
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


def write_entry(md_path: Path, m: Meta) -> None:
    bucket = license_bucket(m.license)
    lic_note = {
        "permissive": "✅ permissive",
        "copyleft": "🧨 copyleft (flag)",
        "unknown": "⚠️ unknown (verify)",
        "other": "⚠️ other (verify)",
    }[bucket]

    use_cases = infer_use_cases(m)

    lines: list[str] = []
    lines.append("# OSS Project Entry")
    lines.append("")
    lines.append("## Identity")
    lines.append("")
    lines.append(f"- Name: {m.full_name.split('/')[-1]}")
    lines.append(f"- Repo: {m.url}")
    lines.append(f"- Full name: {m.full_name}")
    lines.append(f"- License: {lic_note} — {m.license}")
    lines.append(f"- Stars (approx): {m.stars}")
    lines.append(f"- Primary language: {m.language}")
    lines.append(f"- Last updated: {m.updated_at or 'N/A'}")
    if m.topics:
        lines.append(f"- Topics: {', '.join(m.topics[:25])}")
    lines.append("")

    lines.append("## What it gives us (plain English)")
    lines.append("")
    if m.description:
        lines.append(f"- {m.description}")
    lines.append("- (fill) Why this matters for Lumelle admins/ops")
    lines.append("")

    lines.append("## What feature(s) it maps to")
    lines.append("")
    for u in use_cases:
        lines.append(f"- {u}")
    lines.append("")

    lines.append("## Integration notes (vibe-coding lens)")
    lines.append("")
    lines.append("- Stack fit (React/TS, API, DB, auth):")
    if m.language in {"TypeScript", "JavaScript"}:
        lines.append("  - Likely strong fit for our TS stack; verify embedding model (SDK vs separate app).")
    else:
        lines.append("  - Non-TS core; integration likely via API/service boundary.")
    lines.append("- Setup friction (self-host? SaaS? Docker?):")
    lines.append("- Data model alignment:")
    lines.append("")

    lines.append("## Adoption path")
    lines.append("")
    lines.append("- 1 day POC: prove it runs + integrate one thin slice")
    lines.append("- 1 week integration: wire into our admin + auth + data flows")
    lines.append("- 1 month hardening: monitoring, migrations, multi-client config, security review")
    lines.append("")

    lines.append("## Risks")
    lines.append("")
    lines.append("- Maintenance risk:")
    lines.append("- Security risk:")
    lines.append("- Scope mismatch:")
    lines.append(f"- License risk: {lic_note}")
    lines.append("")

    lines.append("## Sources")
    lines.append("")
    lines.append(f"- {m.url}")
    lines.append("")

    lines.append("## Score (0–100) + reasoning")
    lines.append("")
    lines.append("- Score: …")
    lines.append("- Why: …")
    lines.append("")

    md_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Auto-fill OSS entry markdown files from GitHub JSON metadata.")
    ap.add_argument("--entries-dir", required=True, help="Directory containing *.json metadata.")
    ap.add_argument("--out-dir", required=True, help="Directory to write *.md entries into.")
    ap.add_argument("--top", type=int, default=20, help="Only fill top N by stars.")
    args = ap.parse_args()

    entries_dir = Path(args.entries_dir)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    metas: list[Meta] = [load_meta(p) for p in sorted(entries_dir.glob("*.json"))]
    metas.sort(key=lambda m: m.stars, reverse=True)
    metas = metas[: args.top]

    for m in metas:
        slug = safe_slug(m.full_name)
        md_path = out_dir / f"{slug}.md"
        write_entry(md_path, m)

    print(f"Wrote {len(metas)} OSS entry md files to {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
