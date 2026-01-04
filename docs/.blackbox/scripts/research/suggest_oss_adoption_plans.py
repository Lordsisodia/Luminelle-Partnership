#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class QueueItem:
    full_name: str
    stars: int
    license: str
    language: str
    use_cases: list[str]
    entry_file: str


def parse_queue(md: str) -> list[QueueItem]:
    items: list[QueueItem] = []

    cur_full = ""
    cur_stars = 0
    cur_license = ""
    cur_lang = ""
    cur_use_cases: list[str] = []
    cur_entry = ""

    def flush() -> None:
        nonlocal cur_full, cur_stars, cur_license, cur_lang, cur_use_cases, cur_entry
        if cur_full and cur_entry:
            items.append(
                QueueItem(
                    full_name=cur_full,
                    stars=cur_stars,
                    license=cur_license,
                    language=cur_lang,
                    use_cases=cur_use_cases,
                    entry_file=cur_entry,
                )
            )
        cur_full = ""
        cur_stars = 0
        cur_license = ""
        cur_lang = ""
        cur_use_cases = []
        cur_entry = ""

    for ln in md.splitlines():
        ln = ln.rstrip()
        if ln.startswith("## ") and ") " in ln:
            flush()
            # "## 1) n8n-io/n8n"
            cur_full = ln.split(") ", 1)[1].strip()
            continue
        if ln.strip().startswith("- Stars:"):
            try:
                cur_stars = int(ln.split(":", 1)[1].strip())
            except Exception:
                cur_stars = 0
        if ln.strip().startswith("- License:"):
            cur_license = ln.split(":", 1)[1].strip()
        if ln.strip().startswith("- Language:"):
            cur_lang = ln.split(":", 1)[1].strip()
        if ln.strip().startswith("- Suggested use-cases:"):
            raw = ln.split(":", 1)[1].strip()
            cur_use_cases = [x.strip() for x in raw.split(",") if x.strip()]
        if ln.strip().startswith("- Entry file:"):
            cur_entry = ln.split(":", 1)[1].strip().strip("`")

    flush()
    return items


def pick_primary_use_case(use_cases: list[str]) -> str:
    priority = [
        "commerce core",
        "admin scaffolding",
        "workflow automation",
        "search",
        "analytics",
        "feature flags",
        "cms/content",
    ]
    for p in priority:
        if p in use_cases:
            return p
    return use_cases[0] if use_cases else "general"


def suggestions(use_cases: list[str], language: str, license_str: str) -> dict[str, str]:
    primary = pick_primary_use_case(use_cases)

    stack_fit = (
        "TS/JS-native; can integrate via package, embed UI patterns, or run as a service with API boundary."
        if language in {"TypeScript", "JavaScript"}
        else "Non-TS core; integrate via service boundary (HTTP/API) and keep our admin as the primary UI."
    )

    license_risk = "Verify LICENSE file + terms (flag for legal review if copyleft/fair-code/unknown)."
    if "AGPL" in license_str or "GPL" in license_str or "LGPL" in license_str:
        license_risk = "Copyleft detected; treat as high-risk for embedding — verify obligations before use."
    if "NOASSERTION" in license_str or "unknown" in license_str.lower():
        license_risk = "License not asserted; confirm actual license + commercial terms before any integration."

    why = "Accelerates our admin build via proven patterns and off-the-shelf primitives."
    setup = "Assume Docker-based self-host first; keep it isolated behind an internal API."
    alignment = "Prefer read-only integration first (consume data) before allowing writes/automation."

    day = "Run it locally + prove a thin slice end-to-end in our admin."
    week = "Integrate auth + a single workflow/UI surface; document wiring and rollout."
    month = "Harden: monitoring, backups, security review, multi-tenant config, and upgrade strategy."

    if primary == "workflow automation":
        why = "Adds a durable automation layer (triggers → actions → approvals) without us building every integration."
        setup = "Run as a separate service (Docker). Integrate via webhooks/HTTP; mirror run logs back into our admin."
        alignment = "Model actions as idempotent tasks; store execution/audit logs in our DB for compliance."
        day = "Self-host + create 1 HTTP-triggered workflow that writes a run record into our system."
        week = "Add approvals UI + 2–3 core integrations (Shopify, email/SMS, Slack) + retries/timeouts."
        month = "Permissioned actions + per-client secrets vaulting + RBAC/audit log integration."

    if primary == "admin scaffolding":
        why = "Ships admin CRUD + bulk ops faster; reduces custom UI effort for internal tooling surfaces."
        setup = "Adopt as a UI layer or pattern library; keep our domain logic/APIs as the source of truth."
        alignment = "Map our existing resource APIs to the framework’s data provider adapters."
        day = "Stand up one resource (e.g., Products) with list/detail/edit + filters using our API."
        week = "Add RBAC gates, saved views, bulk actions, and a consistent design system wrapper."
        month = "Harden: codegen for resources, testing harness, and extension/plugin points."

    if primary == "cms/content":
        why = "Gives marketing/content ops a workflow (draft → review → publish) without engineering bottlenecks."
        setup = "Run as a separate service with a stable content API; connect via SSO if possible."
        alignment = "Treat CMS as content-of-record; sync only what we need into our app DB."
        day = "Create one content type + fetch/render it in our app (read-only)."
        week = "Add preview, publish gates, and a content QA checklist (SEO, images, links)."
        month = "Multi-client separation + migrations/versioning + backup/restore plan."

    if primary == "search":
        why = "Improves conversion via faster search + merchandising rules (synonyms/boosts) with minimal build time."
        setup = "Run the search engine as a service; feed it via a small indexing job."
        alignment = "Keep product truth in our DB; index is a derived cache (rebuildable)."
        day = "Index products + build a simple search endpoint + verify relevance."
        week = "Add synonyms/boost rules UI + incremental reindex + failure alerts."
        month = "Multi-tenant indexes + relevance tuning playbook + cost/perf benchmarks."

    if primary == "analytics":
        why = "Unlocks dashboards + funnels without building an analytics pipeline from scratch."
        setup = "Prefer event ingestion via existing SDKs; self-host behind auth where possible."
        alignment = "Only ingest the minimum event schema we need; keep PII handling explicit."
        day = "Ingest 5–10 key events + render a basic dashboard."
        week = "Add funnels/cohorts + anomaly alerts + per-client segmentation."
        month = "Data retention policy + RBAC + export pipelines."

    return {
        "stack_fit": stack_fit,
        "why": why,
        "setup": setup,
        "alignment": alignment,
        "day": day,
        "week": week,
        "month": month,
        "license_risk": license_risk,
    }


def patch_lines(lines: list[str], repl: dict[str, str]) -> list[str]:
    out: list[str] = []
    for ln in lines:
        s = ln.rstrip("\n")

        if s.strip() == "- (fill) Why this matters for Lumelle admins/ops":
            out.append(f"- Why this matters: {repl['why']}")
            continue

        if s.strip() == "- Setup friction (self-host? SaaS? Docker?):":
            out.append(f"- Setup friction (self-host? SaaS? Docker?): {repl['setup']}")
            continue

        if s.strip() == "- Data model alignment:":
            out.append(f"- Data model alignment: {repl['alignment']}")
            continue

        if s.strip() == "- 1 day POC: prove it runs + integrate one thin slice":
            out.append(f"- 1 day POC: {repl['day']}")
            continue
        if s.strip() == "- 1 week integration: wire into our admin + auth + data flows":
            out.append(f"- 1 week integration: {repl['week']}")
            continue
        if s.strip() == "- 1 month hardening: monitoring, migrations, multi-client config, security review":
            out.append(f"- 1 month hardening: {repl['month']}")
            continue

        if s.strip() == "- Maintenance risk:":
            out.append("- Maintenance risk: upgrades + ecosystem drift; mitigate with pinning + quarterly update cadence.")
            continue
        if s.strip() == "- Security risk:":
            out.append("- Security risk: treat as privileged system; isolate network + secrets; audit write actions.")
            continue
        if s.strip() == "- Scope mismatch:":
            out.append("- Scope mismatch: avoid \"replace our platform\" scope; extract one slice at a time.")
            continue
        if s.strip().startswith("- License risk:"):
            out.append(f"- License risk: {repl['license_risk']}")
            continue

        if s.strip().startswith("- Stack fit (React/TS, API, DB, auth):"):
            out.append(s)
            # Keep the next bullet if present; we'll replace the generic one later if it exists.
            continue

        if s.strip() == "- Likely strong fit for our TS stack; verify embedding model (SDK vs separate app).":
            out.append(f"  - {repl['stack_fit']}")
            continue

        if s.strip() == "- Non-TS core; integration likely via API/service boundary.":
            out.append(f"  - {repl['stack_fit']}")
            continue

        out.append(s)

    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Fill OSS entries with concrete adoption plans from the deepening queue.")
    ap.add_argument("--queue", required=True, help="Path to oss/deepening-queue.md")
    ap.add_argument("--top", type=int, default=10, help="How many OSS items to update.")
    args = ap.parse_args()

    queue_path = Path(args.queue)
    items = parse_queue(queue_path.read_text("utf-8", errors="replace"))[: args.top]

    updated = 0
    for it in items:
        entry_path = Path(it.entry_file)
        if not entry_path.exists():
            continue
        repl = suggestions(use_cases=it.use_cases, language=it.language, license_str=it.license)
        lines = entry_path.read_text("utf-8", errors="replace").splitlines()
        new_lines = patch_lines(lines, repl=repl)
        entry_path.write_text("\n".join(new_lines) + "\n", encoding="utf-8")
        updated += 1

    print(f"Updated {updated} OSS entries (top {args.top}).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
