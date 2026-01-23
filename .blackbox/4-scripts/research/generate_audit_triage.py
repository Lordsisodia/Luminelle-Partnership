#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
from dataclasses import dataclass
from pathlib import Path


SCORE_FIELDS = [
    "discovery_score",
    "pdp_confidence_score",
    "cart_score",
    "checkout_score",
    "post_purchase_returns_score",
]

NARRATIVE_FIELDS = [
    "top_3_patterns",
    "top_3_pitfalls",
    "evidence_links",
]


def filled_scores(row: dict[str, str]) -> int:
    return sum(1 for f in SCORE_FIELDS if (row.get(f) or "").strip())


@dataclass(frozen=True)
class StoreTriage:
    store: str
    url: str
    devices: set[str]
    total_scores: int
    total_possible: int
    any_evidence_links: bool
    any_blocked: bool
    any_audit_doc_evidence: bool
    missing_narrative: bool
    missing_devices: bool
    next_action: str
    priority: int


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate a triage report (next actions) for manual funnel audits.")
    ap.add_argument("--scorecard", required=True, help="Scorecard CSV path.")
    ap.add_argument("--audit-docs-progress-md", required=False, default="", help="audit-docs-progress.md path (optional).")
    ap.add_argument("--evidence-inventory-md", required=False, default="", help="evidence-inventory.md path (optional).")
    ap.add_argument("--evidence-coverage-md", required=False, default="", help="evidence-coverage.md path (optional).")
    ap.add_argument("--store-slug-map", required=False, default="", help="Optional store→slug JSON map (improves evidence matching).")
    ap.add_argument("--shortlist-md", required=False, default="", help="shortlist markdown to preserve recommended order (optional).")
    ap.add_argument("--out-md", required=True, help="Write triage markdown here.")
    args = ap.parse_args()

    scorecard = Path(args.scorecard)
    out_md = Path(args.out_md)
    audit_docs_progress = Path(args.audit_docs_progress_md) if args.audit_docs_progress_md else None
    evidence_inventory = Path(args.evidence_inventory_md) if args.evidence_inventory_md else None
    evidence_coverage = Path(args.evidence_coverage_md) if args.evidence_coverage_md else None
    store_slug_map_path = Path(args.store_slug_map) if args.store_slug_map else None
    shortlist_md = Path(args.shortlist_md) if args.shortlist_md else None

    # Parse audit-docs-progress.md to see if evidence rows are filled.
    audit_doc_has_evidence: dict[str, bool] = {}
    if audit_docs_progress and audit_docs_progress.exists():
        text = audit_docs_progress.read_text("utf-8", errors="replace")
        for line in text.splitlines():
            if not line.startswith("|") or line.startswith("|---") or " store " in line:
                continue
            parts = [p.strip() for p in line.strip().strip("|").split("|")]
            if len(parts) < 4:
                continue
            store = parts[0]
            evidence = parts[3]  # "0/5"
            try:
                filled = int(evidence.split("/")[0])
            except Exception:
                filled = 0
            audit_doc_has_evidence[store] = filled > 0

    evidence_has_files: dict[str, bool] = {}
    if evidence_inventory and evidence_inventory.exists():
        for line in evidence_inventory.read_text("utf-8", errors="replace").splitlines():
            if not line.startswith("|") or line.startswith("|---") or " store " in line:
                continue
            parts = [p.strip() for p in line.strip().strip("|").split("|")]
            if len(parts) < 2:
                continue
            store_slug = parts[0]
            try:
                count = int(parts[1])
            except Exception:
                count = 0
            evidence_has_files[store_slug] = count > 0

    coverage_missing: dict[str, str] = {}
    if evidence_coverage and evidence_coverage.exists():
        for line in evidence_coverage.read_text("utf-8", errors="replace").splitlines():
            if not line.startswith("|") or line.startswith("|---") or " store " in line:
                continue
            parts = [p.strip() for p in line.strip().strip("|").split("|")]
            if len(parts) < 3:
                continue
            store_slug = parts[0]
            missing = parts[2]
            coverage_missing[store_slug] = missing

    store_to_slug: dict[str, str] = {}
    if store_slug_map_path and store_slug_map_path.exists():
        try:
            store_to_slug = json.loads(store_slug_map_path.read_text("utf-8", errors="replace"))
        except Exception:
            store_to_slug = {}

    shortlist_order: dict[str, int] = {}
    if shortlist_md and shortlist_md.exists():
        in_table = False
        rank = 1
        for line in shortlist_md.read_text("utf-8", errors="replace").splitlines():
            if line.strip().startswith("| store |"):
                in_table = True
                continue
            if in_table and line.strip().startswith("|---"):
                continue
            if in_table:
                if not line.strip().startswith("|"):
                    break
                parts = [p.strip() for p in line.strip().strip("|").split("|")]
                if len(parts) < 1:
                    continue
                store = parts[0]
                if store and store not in shortlist_order:
                    shortlist_order[store] = rank
                    rank += 1

    rows: list[dict[str, str]] = []
    with scorecard.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        for row in r:
            rows.append(row)

    grouped: dict[str, list[dict[str, str]]] = {}
    for row in rows:
        store = (row.get("store") or "").strip()
        if not store:
            continue
        grouped.setdefault(store, []).append(row)

    triage: list[StoreTriage] = []
    for store, rs in grouped.items():
        url = (rs[0].get("url") or "").strip()
        devices = {(r.get("device") or "").strip() for r in rs if (r.get("device") or "").strip()}
        missing_devices = devices != {"desktop", "mobile"}
        total_scores = sum(filled_scores(r) for r in rs)
        total_possible = len(rs) * len(SCORE_FIELDS)
        any_evidence_links = any((r.get("evidence_links") or "").strip() for r in rs)
        any_blocked = any((r.get("blocked") or "").strip().lower() == "yes" for r in rs)
        any_doc_evidence = audit_doc_has_evidence.get(store, False)
        # Evidence folder uses slug; prefer explicit mapping, else fallback guess.
        store_slug_guess = store_to_slug.get(store, store.lower().replace(" ", "-"))
        any_file_evidence = evidence_has_files.get(store_slug_guess, False)
        missing_narrative = False
        for r in rs:
            if filled_scores(r) > 0:
                for nf in NARRATIVE_FIELDS:
                    if not (r.get(nf) or "").strip():
                        missing_narrative = True
                        break

        # Priority heuristic:
        # 1) Not started
        # 2) Partially scored
        # 3) Fully scored but missing evidence
        # 4) Fully scored + evidence but missing narrative
        # 5) Fully scored + evidence + narrative
        if total_scores == 0:
            next_action = "run audit (desktop+mobile)"
            priority = 1
        elif total_scores < total_possible:
            next_action = "finish scoring (missing components/devices)"
            priority = 2
        elif not any_evidence_links and not any_doc_evidence and not any_file_evidence:
            next_action = "add evidence links + screenshots"
            priority = 3
        elif missing_narrative:
            next_action = "add patterns/pitfalls writeup + evidence_links"
            priority = 4
        else:
            next_action = "ready for pattern extraction"
            priority = 5

        if any_blocked and priority <= 2:
            # Still needs work, but with special handling.
            next_action += " (bot-protected; use playbook)"
        if missing_devices and priority <= 2:
            next_action += " (ensure both desktop+mobile rows)"

        triage.append(
            StoreTriage(
                store=store,
                url=url,
                devices=devices,
                total_scores=total_scores,
                total_possible=total_possible,
                any_evidence_links=any_evidence_links,
                any_blocked=any_blocked,
                any_audit_doc_evidence=any_doc_evidence,
                missing_narrative=missing_narrative,
                missing_devices=missing_devices,
                next_action=next_action,
                priority=priority,
            )
        )

    def sort_key(t: StoreTriage) -> tuple[int, int, str]:
        # priority first, then shortlist order if available, then name
        order = shortlist_order.get(t.store, 10_000)
        return (t.priority, order, t.store.lower())

    triage.sort(key=sort_key)

    lines: list[str] = []
    lines.append("# Manual Audit Triage (Next Actions)")
    lines.append("")
    lines.append(f"- scorecard: `{scorecard}`")
    if audit_docs_progress:
        lines.append(f"- audit docs progress: `{audit_docs_progress}`")
    if evidence_inventory:
        lines.append(f"- evidence inventory: `{evidence_inventory}`")
    if evidence_coverage:
        lines.append(f"- evidence coverage: `{evidence_coverage}`")
    if store_slug_map_path:
        lines.append(f"- store slug map: `{store_slug_map_path}`")
    if shortlist_md:
        lines.append(f"- shortlist: `{shortlist_md}`")
    lines.append("")
    # Summary counts
    counts: dict[int, int] = {}
    for t in triage:
        counts[t.priority] = counts.get(t.priority, 0) + 1
    lines.append("## Summary")
    for p in sorted(counts.keys()):
        lines.append(f"- priority {p}: {counts[p]}")
    lines.append("")
    lines.append("| priority | store | devices | progress | blocked | evidence | next action |")
    lines.append("|---:|---|---|---:|---|---|---|")
    for t in triage:
        devices_str = ", ".join(sorted(t.devices)) if t.devices else "?"
        progress = f"{t.total_scores}/{t.total_possible}"
        blocked = "yes" if t.any_blocked else "no"
        slug = store_to_slug.get(t.store, t.store.lower().replace(" ", "-"))
        evidence = "yes" if (t.any_evidence_links or t.any_audit_doc_evidence or evidence_has_files.get(slug, False)) else "no"
        action = t.next_action
        if evidence == "yes" and coverage_missing.get(slug):
            action += f" (missing evidence: {coverage_missing[slug]})"
        lines.append(f"| {t.priority} | {t.store.replace('|',' / ')} | {devices_str} | {progress} | {blocked} | {evidence} | {action.replace('|',' / ')} |")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
