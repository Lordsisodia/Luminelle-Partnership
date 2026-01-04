#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Seed:
    name: str
    category: str
    website: str
    notes: str


@dataclass(frozen=True)
class Triage:
    name: str
    title: str
    tags: list[str]
    snapshot: str


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "competitor"


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


def parse_markdown_table(md: str) -> list[dict[str, str]]:
    lines = [ln.rstrip("\n") for ln in md.splitlines()]
    header_idx = None
    for i, ln in enumerate(lines):
        if ln.startswith("| name |") and "snapshot" in ln:
            header_idx = i
            break
    if header_idx is None:
        return []
    rows: list[dict[str, str]] = []
    # skip header + separator
    for ln in lines[header_idx + 2 :]:
        if not ln.startswith("|"):
            continue
        parts = [p.strip() for p in ln.strip("|").split("|")]
        if len(parts) < 6:
            continue
        name, category, website, title, tags, snapshot = parts[:6]
        rows.append(
            {
                "name": name,
                "category": category,
                "website": website,
                "title": title,
                "tags": tags,
                "snapshot": snapshot,
            }
        )
    return rows


def score(seed: Seed, triage: Triage | None) -> tuple[int, str]:
    # Base relevance: favor things that overlap our build surface (admin + ops + workflows)
    cat = seed.category.lower()
    relevance = 8
    if cat in {"core-platform", "composable", "oss-commerce"}:
        relevance = 18
    elif cat in {"returns", "cx-support", "retention", "analytics", "search", "cms"}:
        relevance = 15
    elif cat in {"automation", "workflow-engine", "feature-flags", "internal-tools"}:
        relevance = 16
    elif cat in {"payments", "subscriptions", "loyalty", "reviews", "fulfillment"}:
        relevance = 12
    elif cat in {"infra"}:
        relevance = 10

    evidence = 0
    tags_bonus = 0
    blocked_penalty = 0
    if triage:
        if triage.snapshot:
            evidence = 10
        if "blocked" in triage.tags:
            blocked_penalty = 5
        # Cross-domain tags suggest feature coverage we care about.
        tags_bonus = min(10, len(set(triage.tags)) * 2)

    # Notes bonus if seed notes exist (curated relevance).
    notes_bonus = 3 if seed.notes else 0

    total = max(0, min(100, relevance + evidence + tags_bonus + notes_bonus - blocked_penalty))
    why = (
        f"relevance={relevance}, evidence={evidence}, tags_bonus={tags_bonus}, "
        f"notes_bonus={notes_bonus}, blocked_penalty={blocked_penalty}"
    )
    return total, why


def table_cell(s: str) -> str:
    s = (s or "").replace("\n", " ").strip()
    s = s.replace("|", " / ")
    s = re.sub(r"\s{2,}", " ", s)
    return s


def main() -> int:
    ap = argparse.ArgumentParser(description="Score and re-rank competitors using seed category + snapshot triage tags.")
    ap.add_argument("--seeds", required=True, help="competitor-seeds.txt")
    ap.add_argument("--triage", required=True, help="competitors/triage.md")
    ap.add_argument("--out-index", required=True, help="Rewrite competitors/index.md here.")
    ap.add_argument("--out-queue", required=True, help="Write deepening queue (top N) here.")
    ap.add_argument("--top", type=int, default=25, help="Top N for deepening queue.")
    args = ap.parse_args()

    seeds_path = Path(args.seeds)
    triage_path = Path(args.triage)

    seeds: list[Seed] = []
    for line in seeds_path.read_text("utf-8", errors="replace").splitlines():
        s = parse_seed_line(line)
        if s:
            seeds.append(s)

    triage_rows = parse_markdown_table(triage_path.read_text("utf-8", errors="replace"))
    triage_by_name: dict[str, Triage] = {}
    for r in triage_rows:
        tags = [t.strip() for t in (r.get("tags") or "").split(",") if t.strip()]
        triage_by_name[r.get("name", "")] = Triage(
            name=r.get("name", ""),
            title=r.get("title", ""),
            tags=tags,
            snapshot=r.get("snapshot", ""),
        )

    scored: list[tuple[int, str, Seed, Triage | None]] = []
    for s in seeds:
        tri = triage_by_name.get(s.name)
        sc, why = score(s, tri)
        scored.append((sc, why, s, tri))

    scored.sort(key=lambda x: x[0], reverse=True)

    # Write index (ranked)
    out_index = Path(args.out_index)
    lines: list[str] = []
    lines.append("# Competitors Index (target: 100)")
    lines.append("")
    lines.append("Scoring rubric: `../process/rubric.md`")
    lines.append("")
    lines.append("## ✅ Target")
    lines.append("")
    lines.append("- 100 competitors total (core + adjacent)")
    lines.append("")
    lines.append("## Index (ranked; scores are provisional)")
    lines.append("")
    lines.append("Format:")
    lines.append("- `Rank — Name — Category — Score — Website — Entry file — Notes`")
    lines.append("")
    for i, (sc, why, s, tri) in enumerate(scored, 1):
        entry = f"`entries/{safe_slug(s.name)}.md`"
        notes = s.notes
        if tri and tri.title and not notes:
            notes = tri.title
        if tri and "blocked" in tri.tags:
            notes = (notes + " | blocked").strip(" |")
        lines.append(
            f"{i}. {table_cell(s.name)} — {table_cell(s.category)} — {sc} — {table_cell(s.website)} — {entry} — {table_cell(notes)}"
        )
    out_index.write_text("\n".join(lines) + "\n", encoding="utf-8")

    # Write deepening queue
    out_queue = Path(args.out_queue)
    top = scored[: args.top]
    q: list[str] = []
    q.append("# Competitor Deepening Queue (top)")
    q.append("")
    q.append("Pick these first for manual deepening (workflows + features + pricing/docs evidence).")
    q.append("")
    for i, (sc, why, s, tri) in enumerate(top, 1):
        tags = ", ".join(tri.tags) if tri else ""
        q.append(f"## {i}) {s.name} — score {sc}")
        q.append("")
        q.append(f"- Category: {s.category}")
        q.append(f"- Website: {s.website}")
        if tags:
            q.append(f"- Tags: {tags}")
        if tri and tri.snapshot:
            q.append(f"- Homepage snapshot: `../logs/snapshots/competitors/{tri.snapshot}`")
        q.append(f"- Entry file: `entries/{safe_slug(s.name)}.md`")
        q.append(f"- Why score: {why}")
        if s.notes:
            q.append(f"- Seed notes: {s.notes}")
        q.append("")
    out_queue.write_text("\n".join(q) + "\n", encoding="utf-8")

    print(f"Wrote ranked index: {out_index}")
    print(f"Wrote deepening queue: {out_queue}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

