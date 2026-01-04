#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Evidence:
    name: str
    title: str
    description: str
    headings: list[str]
    links: list[str]


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "competitor"


def parse_evidence(md: str) -> Evidence:
    name = ""
    title = ""
    description = ""
    headings: list[str] = []
    links: list[str] = []

    # Name from header: "# Evidence Extract — X"
    for ln in md.splitlines():
        if ln.startswith("# Evidence Extract"):
            name = ln.split("—", 1)[-1].strip()
            break

    for ln in md.splitlines():
        ln = ln.strip()
        if ln.startswith("- title:"):
            title = ln.split(":", 1)[1].strip()
        if ln.startswith("- description:"):
            description = ln.split(":", 1)[1].strip()
        if ln.startswith("- h") and ": " in ln:
            headings.append(ln.removeprefix("- ").strip())
        if ln.startswith("- http"):
            links.append(ln.lstrip("- ").strip())

    # De-dupe preserve order
    seen_h: set[str] = set()
    headings_d: list[str] = []
    for h in headings:
        if h in seen_h:
            continue
        seen_h.add(h)
        headings_d.append(h)

    seen_l: set[str] = set()
    links_d: list[str] = []
    for l in links:
        if l in seen_l:
            continue
        seen_l.add(l)
        links_d.append(l)

    return Evidence(name=name, title=title, description=description, headings=headings_d, links=links_d)


def infer_feature_bullets(text: str) -> list[str]:
    t = text.lower()
    bullets: list[str] = []

    rules = [
        ("RBAC + permissions + audit logs", ["role", "permission", "audit", "governance"]),
        ("Feature flags + rollout strategies", ["feature flag", "rollout", "experiment", "targeting"]),
        ("Workflow automation + integrations", ["workflow", "automation", "integrat", "orchestration"]),
        ("Headless CMS + publishing workflows", ["cms", "content", "publish", "editor", "headless"]),
        ("Search + merchandising rules", ["search", "merchandising", "synonym", "boost", "recommendation"]),
        ("Analytics: funnels/cohorts/attribution", ["analytics", "funnel", "cohort", "attribution", "insights"]),
        ("Commerce core: catalog/orders/checkout", ["commerce", "ecommerce", "checkout", "order", "catalog"]),
        ("Admin/internal tools builder", ["admin", "dashboard", "internal tool", "studio"]),
        ("AI assist / AI-first positioning", ["ai", "agent", "copilot", "assistant"]),
    ]

    for label, needles in rules:
        if any(n in t for n in needles):
            bullets.append(label)

    # Always keep at least 3 placeholders for manual fill
    if not bullets:
        bullets = ["(extract features from pricing/docs pages)", "(extract workflows from docs)", "(extract integrations + APIs)"]

    return bullets[:10]


def suggest_workflows(name: str, category: str, text: str) -> list[str]:
    # Provide generic but actionable workflows based on category and text signals.
    t = text.lower()
    flows: list[str] = []

    if category in {"feature-flags", "experimentation"} or "flag" in t:
        flows.append("Define a flag → target an environment/segment → roll out gradually → monitor metrics → rollback if needed.")
        flows.append("Create an experiment → assign variants → track outcomes → declare winner → promote to default.")

    if category in {"cms"} or "cms" in t or "content" in t:
        flows.append("Create content → preview → approve → publish → monitor SEO/engagement → iterate.")

    if category in {"automation", "workflow-engine"} or "workflow" in t:
        flows.append("Select trigger → define steps/actions → test on sandbox data → enable → monitor runs/errors → adjust.")

    if category in {"analytics"} or "analytics" in t:
        flows.append("Instrument events → define funnel/cohort → create dashboards → set alerts → investigate anomalies.")

    if category in {"oss-commerce", "core-platform", "composable"} or "commerce" in t:
        flows.append("Configure catalog → set pricing/promos → launch → monitor orders → manage returns/exchanges.")

    if category in {"internal-tools"} or "internal" in t or "admin" in t:
        flows.append("Connect data source → build list/detail views → add filters/bulk actions → add RBAC → deploy to team.")

    if not flows:
        flows.append("Identify core workflow → map steps → define admin UI surface → implement MVP → add auditability.")
        flows.append("Document the workflow → add stop conditions → add success metrics → iterate.")

    # Return 2–4 flows
    return flows[:4]


def replace_section(entry: str, header: str, new_lines: list[str]) -> str:
    # Replace the first bullet placeholder after a section header.
    # Sections look like:
    # ## Notable features ...
    # - …
    # NOTE: use a lookahead so we don't consume the next section header.
    pattern = re.compile(rf"({re.escape(header)}\n\n)(.*?)(?=\n\n## |\Z)", re.DOTALL)
    m = pattern.search(entry)
    if not m:
        return entry
    before = m.group(1)

    body = []
    for ln in new_lines:
        body.append(f"- {ln}")
    new_block = before + "\n".join(body)
    return entry[: m.start()] + new_block + entry[m.end() :]


def replace_numbered_steps(entry: str, header: str, steps: list[str]) -> str:
    pattern = re.compile(rf"({re.escape(header)}\n\n)(.*?)(?=\n\n## |\Z)", re.DOTALL)
    m = pattern.search(entry)
    if not m:
        return entry
    before = m.group(1)
    body = []
    for i, s in enumerate(steps, 1):
        body.append(f"{i}) {s}")
    new_block = before + "\n".join(body)
    return entry[: m.start()] + new_block + entry[m.end() :]


def main() -> int:
    ap = argparse.ArgumentParser(description="Suggest workflows/features from evidence extracts and update competitor entries.")
    ap.add_argument("--plan-id", required=True, help="Plan folder name.")
    ap.add_argument("--queue", required=True, help="Path to competitors/deepening-queue.md")
    ap.add_argument("--entries-dir", required=True, help="Competitor entries directory.")
    ap.add_argument("--evidence-dir", required=True, help="Competitor evidence directory.")
    ap.add_argument("--top", type=int, default=10, help="How many competitors from the queue to update.")
    args = ap.parse_args()

    queue_md = Path(args.queue).read_text("utf-8", errors="replace")
    # Extract names + categories from queue
    items: list[tuple[str, str]] = []
    cur_name = ""
    cur_cat = ""
    for ln in queue_md.splitlines():
        if ln.startswith("## ") and ") " in ln:
            if cur_name:
                items.append((cur_name, cur_cat))
            cur_name = ln.split(") ", 1)[1].split(" — score", 1)[0].strip()
            cur_cat = ""
            continue
        if ln.strip().startswith("- Category:"):
            cur_cat = ln.split(":", 1)[1].strip()
    if cur_name:
        items.append((cur_name, cur_cat))

    items = items[: args.top]

    plan_id = args.plan_id
    entries_dir = Path(args.entries_dir)
    evidence_dir = Path(args.evidence_dir)

    updated = 0
    for name, cat in items:
        slug = safe_slug(name)
        entry_path = entries_dir / f"{slug}.md"
        evidence_path = evidence_dir / f"{slug}.md"
        if not entry_path.exists() or not evidence_path.exists():
            continue

        ev = parse_evidence(evidence_path.read_text("utf-8", errors="replace"))
        text_blob = " ".join([ev.title, ev.description, " ".join(ev.headings), " ".join(ev.links)])

        feature_bullets = infer_feature_bullets(text_blob)
        workflows = suggest_workflows(name=name, category=cat, text=text_blob)

        entry = entry_path.read_text("utf-8", errors="replace")

        # Replace sections
        entry = replace_section(entry, "## Notable features (to extract next)", feature_bullets)
        entry = replace_numbered_steps(entry, "## Workflows worth copying (step-by-step)", workflows)

        # Add evidence link if missing
        evidence_link = f".blackbox/.plans/{plan_id}/artifacts/market/competitors/evidence/{slug}.md"
        if evidence_link not in entry:
            if "## Evidence / sources" in entry:
                entry = entry.replace("## Evidence / sources\n\n", f"## Evidence / sources\n\n- Evidence extract: `{evidence_link}`\n", 1)
            else:
                entry += f"\n\n## Evidence / sources\n\n- Evidence extract: `{evidence_link}`\n"

        entry_path.write_text(entry, encoding="utf-8")
        updated += 1

    print(f"Updated {updated} competitor entries with suggested features/workflows (top {args.top}).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
