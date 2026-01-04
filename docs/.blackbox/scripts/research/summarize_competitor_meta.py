#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Competitor:
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


def clean(s: str) -> str:
    s = re.sub(r"\s+", " ", s.strip())
    s = html.unescape(s)
    return s


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "competitor"


def parse_seed_line(line: str) -> Competitor | None:
    raw = line.strip()
    if not raw or raw.startswith("#"):
        return None
    parts = [p.strip() for p in raw.split("|")]
    while len(parts) < 4:
        parts.append("")
    name, category, website, notes = parts[:4]
    if not name:
        return None
    return Competitor(name=name, category=category or "unknown", website=website, notes=notes)


def extract_meta(html_text: str) -> tuple[str, str]:
    title = ""
    desc = ""
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
    return title, desc


def choose_latest_snapshot(snapshots_dir: Path, slug: str) -> Path | None:
    # Files look like: 20251228T134237Z__shopify.html
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
    # Blocked pages
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
    return tags


def table_cell(s: str) -> str:
    # Keep markdown tables stable.
    s = (s or "").replace("\n", " ").strip()
    s = s.replace("|", " / ")
    s = re.sub(r"\s{2,}", " ", s)
    return s


def main() -> int:
    ap = argparse.ArgumentParser(description="Summarize competitor snapshots into a triage table (title/desc/tags).")
    ap.add_argument("--seeds", required=True, help="competitor-seeds.txt")
    ap.add_argument("--snapshots-dir", required=True, help="Directory containing competitor homepage snapshots (*.html).")
    ap.add_argument("--out", required=True, help="Write markdown triage report here.")
    ap.add_argument("--limit", type=int, default=0, help="Only process first N competitors (0 = all).")
    args = ap.parse_args()

    seeds_path = Path(args.seeds)
    snapshots_dir = Path(args.snapshots_dir)
    out_path = Path(args.out)

    competitors: list[Competitor] = []
    for line in seeds_path.read_text("utf-8", errors="replace").splitlines():
        c = parse_seed_line(line)
        if c:
            competitors.append(c)

    if args.limit and args.limit > 0:
        competitors = competitors[: args.limit]

    rows: list[tuple[str, str, str, str, str, str]] = []
    for c in competitors:
        slug = safe_slug(c.name)
        snap = choose_latest_snapshot(snapshots_dir, slug)
        title = ""
        desc = ""
        snap_file = ""
        if snap and snap.exists():
            snap_file = snap.name
            html_text = snap.read_text("utf-8", errors="replace")
            title, desc = extract_meta(html_text)

        tags = tags_from_text(" ".join([title, desc]))
        tag_str = ", ".join(tags) if tags else ""
        rows.append((c.name, c.category, c.website, title, tag_str, snap_file))

    lines: list[str] = []
    lines.append("# Competitor Snapshot Triage (homepage)")
    lines.append("")
    lines.append("This is a fast triage view derived from homepage snapshots (title/description + keyword tags).")
    lines.append("")
    lines.append(f"- Seeds: `{seeds_path}`")
    lines.append(f"- Snapshots: `{snapshots_dir}`")
    lines.append("")
    lines.append("Columns:")
    lines.append("- name")
    lines.append("- category")
    lines.append("- website")
    lines.append("- title (from snapshot)")
    lines.append("- tags (heuristic)")
    lines.append("- snapshot file")
    lines.append("")
    lines.append("| name | category | website | title | tags | snapshot |")
    lines.append("|---|---|---|---|---|---|")
    for name, cat, site, title, tag_str, snap_file in rows:
        lines.append(
            f"| {table_cell(name)} | {table_cell(cat)} | {table_cell(site)} | {table_cell(title)} | {table_cell(tag_str)} | {table_cell(snap_file)} |"
        )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote triage report: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
