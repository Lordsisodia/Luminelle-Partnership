#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class QueueItem:
    name: str
    entry_rel: str  # entries/<slug>.md
    snapshot_rel: str  # ../logs/.../<file>.html (optional)
    website: str
    category: str


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


def parse_queue(md: str) -> list[QueueItem]:
    lines = md.splitlines()
    items: list[QueueItem] = []
    cur: dict[str, str] = {}

    def flush() -> None:
        nonlocal cur
        if not cur.get("entry_rel") or not cur.get("name"):
            cur = {}
            return
        items.append(
            QueueItem(
                name=cur.get("name", ""),
                entry_rel=cur.get("entry_rel", ""),
                snapshot_rel=cur.get("snapshot_rel", ""),
                website=cur.get("website", ""),
                category=cur.get("category", ""),
            )
        )
        cur = {}

    for ln in lines:
        if ln.startswith("## ") and ") " in ln:
            # New item
            flush()
            # "## 1) Name — score X"
            name = ln.split(") ", 1)[1].split(" — score", 1)[0].strip()
            cur["name"] = name
            continue
        if ln.strip().startswith("- Category:"):
            cur["category"] = ln.split(":", 1)[1].strip()
        if ln.strip().startswith("- Website:"):
            cur["website"] = ln.split(":", 1)[1].strip()
        if ln.strip().startswith("- Homepage snapshot:"):
            # - Homepage snapshot: `../logs/snapshots/competitors/file.html`
            snap = ln.split("`", 2)
            if len(snap) >= 2:
                cur["snapshot_rel"] = snap[1]
        if ln.strip().startswith("- Entry file:"):
            entry = ln.split("`", 2)
            if len(entry) >= 2:
                cur["entry_rel"] = entry[1]
    flush()
    return items


def write_entry(path: Path, item: QueueItem, snapshot_path: Path | None, title: str, desc: str, h1: str, tags: list[str]) -> None:
    lines: list[str] = []
    lines.append("# Competitor Entry")
    lines.append("")
    lines.append("## Identity")
    lines.append("")
    lines.append(f"- Name: {item.name}")
    lines.append(f"- Category: {item.category or '<fill>'}")
    lines.append(f"- Website: {item.website or '<add>'}")
    if snapshot_path:
        lines.append(f"- Homepage snapshot: `{snapshot_path}`")
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
    if item.website:
        lines.append(f"- {item.website}")
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

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Auto-fill competitor entry files based on the deepening queue + snapshots.")
    ap.add_argument("--queue", required=True, help="Path to competitors/deepening-queue.md")
    ap.add_argument("--plan-root", required=True, help="Plan folder root (so relative snapshot paths resolve)")
    ap.add_argument("--limit", type=int, default=25, help="Only process top N items")
    args = ap.parse_args()

    queue_path = Path(args.queue)
    plan_root = Path(args.plan_root)

    items = parse_queue(queue_path.read_text("utf-8", errors="replace"))
    items = items[: args.limit]

    # Prefer writing snapshot links as plan-relative paths (portable across machines).
    plan_id = plan_root.name

    updated = 0
    for it in items:
        entry_path = plan_root / "artifacts" / "market" / "competitors" / it.entry_rel
        snap_path = None
        snap_display: str | None = None
        title = desc = h1 = ""
        if it.snapshot_rel:
            # snapshot rel in queue is relative to competitors/ (../logs/...)
            snap_path = (plan_root / "artifacts" / "market" / "competitors" / it.snapshot_rel)
            snap_path = snap_path.resolve()
            if snap_path.exists():
                snap_display = f".blackbox/.plans/{plan_id}/artifacts/market/logs/snapshots/competitors/{snap_path.name}"
                html_text = snap_path.read_text("utf-8", errors="replace")
                title, desc, h1 = extract_meta(html_text)
        tags = tags_from_text(" ".join([title, desc, h1]))
        write_entry(
            entry_path,
            it,
            Path(snap_display) if snap_display else None,
            title,
            desc,
            h1,
            tags,
        )
        updated += 1

    print(f"Updated {updated} competitor entries from deepening queue.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
