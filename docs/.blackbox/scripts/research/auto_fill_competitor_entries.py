#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Seed:
    name: str
    category: str
    website: str
    notes: str


TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)
META_DESC_RE = re.compile(
    r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\'][^>]*>',
    re.IGNORECASE | re.DOTALL,
)
OG_DESC_RE = re.compile(
    r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\'](.*?)["\'][^>]*>',
    re.IGNORECASE | re.DOTALL,
)
H1_RE = re.compile(r"<h1[^>]*>(.*?)</h1>", re.IGNORECASE | re.DOTALL)


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "competitor"


def clean(s: str) -> str:
    s = re.sub(r"<[^>]+>", " ", s)
    s = html.unescape(s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def extract_meta(html_text: str) -> tuple[str, str, str]:
    title = ""
    desc = ""
    h1 = ""
    m = TITLE_RE.search(html_text)
    if m:
        title = clean(m.group(1))
    m = META_DESC_RE.search(html_text)
    if m:
        desc = clean(m.group(1))
    if not desc:
        m = OG_DESC_RE.search(html_text)
        if m:
            desc = clean(m.group(1))
    m = H1_RE.search(html_text)
    if m:
        h1 = clean(m.group(1))
    return title, desc, h1


def parse_seed_line(line: str) -> Seed | None:
    raw = line.strip()
    if not raw or raw.startswith("#"):
        return None
    parts = [p.strip() for p in raw.split("|")]
    while len(parts) < 4:
        parts.append("")
    name, cat, site, notes = parts[:4]
    if not name:
        return None
    return Seed(name=name, category=cat or "unknown", website=site, notes=notes)


def choose_latest_snapshot(snapshots_dir: Path, slug: str) -> Path | None:
    stable = snapshots_dir / f"{slug}.html"
    if stable.exists():
        return stable
    candidates = sorted(snapshots_dir.glob(f"*__{slug}.html"))
    if candidates:
        return candidates[-1]
    return None


def tags_from_text(text: str) -> list[str]:
    t = text.lower()
    tags: list[str] = []
    if any(x in t for x in ["just a moment", "access denied", "forbidden", "attention required"]):
        tags.append("blocked")
    rules = {
        "returns": ["return", "exchange", "rma"],
        "support": ["support", "helpdesk", "ticket", "customer service"],
        "analytics": ["analytics", "attribution", "cohort", "funnel", "insight"],
        "experimentation": ["experiment", "a/b", "ab test", "feature flag"],
        "search": ["search", "discovery", "retrieval"],
        "personalization": ["personalization", "recommendation", "upsell", "cross-sell"],
        "subscriptions": ["subscription", "membership"],
        "shipping": ["shipping", "tracking", "fulfillment", "delivery"],
        "cms": ["cms", "content", "headless", "page builder"],
        "automation": ["automation", "workflow", "orchestration"],
        "internal-tools": ["internal tool", "dashboard", "admin"],
    }
    for tag, needles in rules.items():
        for n in needles:
            if n in t:
                tags.append(tag)
                break
    return sorted(set(tags))


def fill_entry(seed: Seed, entry_path: Path, snapshot_rel: str, title: str, desc: str, h1: str, tags: list[str]) -> None:
    lines: list[str] = []
    lines.append("# Competitor Entry")
    lines.append("")
    lines.append("## Identity")
    lines.append("")
    lines.append(f"- Name: {seed.name}")
    lines.append(f"- Category: {seed.category}")
    lines.append(f"- Website: {seed.website or '<add>'}")
    if snapshot_rel:
        lines.append(f"- Homepage snapshot: `{snapshot_rel}`")
    if tags:
        lines.append(f"- Tags (heuristic): {', '.join(tags)}")
    lines.append("")

    lines.append("## What they sell (1–3 bullets)")
    lines.append("")
    if desc:
        lines.append(f"- {desc}")
    elif title:
        lines.append(f"- {title}")
    else:
        lines.append("- …")
    if seed.notes:
        lines.append(f"- Seed notes: {seed.notes}")
    lines.append("")

    lines.append("## Notable features (to extract next)")
    lines.append("")
    lines.append("- …")
    lines.append("")

    lines.append("## Workflows worth copying (step-by-step)")
    lines.append("")
    lines.append("1) …")
    lines.append("2) …")
    lines.append("")

    lines.append("## What we can steal (vibe-coding friendly)")
    lines.append("")
    lines.append("- Easy copy ideas:")
    lines.append("- Medium ideas:")
    lines.append("- Hard but high leverage ideas:")
    lines.append("")

    lines.append("## Evidence / sources")
    lines.append("")
    if seed.website:
        lines.append(f"- {seed.website}")
    if title:
        lines.append(f"- Homepage title: {title}")
    if h1:
        lines.append(f"- Homepage H1: {h1}")
    lines.append("")

    lines.append("## Score (0–100) + reasoning")
    lines.append("")
    lines.append("- Score: …")
    lines.append("- Why: …")
    lines.append("")

    entry_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Auto-fill competitor entry stubs using homepage snapshot meta.")
    ap.add_argument("--seeds", required=True, help="competitor-seeds.txt")
    ap.add_argument("--entries-dir", required=True, help="competitors/entries/")
    ap.add_argument("--snapshots-dir", required=True, help="snapshots/competitors/")
    ap.add_argument("--top", type=int, default=15, help="Only fill first N seeds (default 15).")
    ap.add_argument("--offset", type=int, default=0, help="Skip first N seeds.")
    args = ap.parse_args()

    seeds_path = Path(args.seeds)
    entries_dir = Path(args.entries_dir)
    snapshots_dir = Path(args.snapshots_dir)

    seeds: list[Seed] = []
    for line in seeds_path.read_text("utf-8", errors="replace").splitlines():
        s = parse_seed_line(line)
        if s:
            seeds.append(s)

    seeds = seeds[args.offset : args.offset + args.top]

    updated = 0
    for seed in seeds:
        slug = safe_slug(seed.name)
        entry_path = entries_dir / f"{slug}.md"
        snap = choose_latest_snapshot(snapshots_dir, slug)
        title = desc = h1 = ""
        snapshot_rel = ""
        if snap and snap.exists():
            html_text = snap.read_text("utf-8", errors="replace")
            title, desc, h1 = extract_meta(html_text)
            snapshot_rel = str(snap)
        tags = tags_from_text(" ".join([title, desc, h1]))
        fill_entry(seed, entry_path, snapshot_rel, title, desc, h1, tags)
        updated += 1

    print(f"Updated {updated} competitor entry files in {entries_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
