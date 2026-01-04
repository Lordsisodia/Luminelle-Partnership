#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path


def safe_inline(s: str) -> str:
    return (s or "").replace("|", " / ").strip()


def split_list(s: str) -> list[str]:
    return [p.strip() for p in (s or "").split(",") if p.strip()]


def signal_summary(row: dict[str, str]) -> str:
    parts: list[str] = []
    if (row.get("blocked") or "").strip():
        parts.append("blocked")
    for key, label in [
        ("platform", "platform"),
        ("bnpl", "bnpl"),
        ("reviews", "reviews"),
        ("returns", "returns"),
        ("search_personalization", "search"),
        ("subscriptions", "subs"),
    ]:
        val = (row.get(key) or "").strip()
        if val:
            parts.append(f"{label}: {val}")
    return "; ".join(parts) if parts else "—"


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Generate a playbook from the adjacent best-in-class list enriched with snapshot signals."
    )
    ap.add_argument("--input-csv", required=True, help="Input enriched CSV (must include snapshot signals columns).")
    ap.add_argument("--out-md", required=True, help="Write markdown playbook here.")
    args = ap.parse_args()

    input_csv = Path(args.input_csv)
    out_md = Path(args.out_md)

    with input_csv.open("r", encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    now = datetime.now(timezone.utc)
    now_stamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    today = now.strftime("%Y-%m-%d")

    by_niche: dict[str, list[dict[str, str]]] = defaultdict(list)
    for r in rows:
        niche = (r.get("niche") or "").strip() or "Other"
        by_niche[niche].append(r)

    # Stable ordering: larger niches first, then alpha
    niches = sorted(by_niche.keys(), key=lambda n: (-len(by_niche[n]), n.lower()))

    lines: list[str] = []
    lines.append("---")
    lines.append("status: draft")
    lines.append(f"last_reviewed: {today}")
    lines.append("owner: growth")
    lines.append("---")
    lines.append("")
    lines.append("# Adjacent Best-in-Class — Playbook (non-fashion patterns to steal)")
    lines.append("")
    lines.append("These are non-fashion e-commerce exemplars worth copying mechanics from (discovery, trust, subscriptions, loyalty, etc).")
    lines.append("This doc merges the curated list with automated snapshot signals (static HTML only).")
    lines.append("")
    lines.append("Sources:")
    # Prefer to include both the enriched CSV and its corresponding base CSV when available.
    base_csv = input_csv
    if base_csv.name.endswith(".enriched.csv"):
        base_csv = base_csv.with_name(base_csv.name.replace(".enriched.csv", ".csv"))
    if base_csv.exists():
        lines.append(f"- `{base_csv.as_posix()}`")
    lines.append(f"- `{input_csv.as_posix()}`")
    lines.append(f"- Generated at: `{now_stamp}`")
    lines.append("")
    lines.append("Limitations:")
    lines.append("- Snapshot signals are heuristic (no JS execution). Use as triage before manual audits.")
    lines.append("")

    for niche in niches:
        lines.append(f"## {safe_inline(niche)}")
        lines.append("")
        lines.append("| store | why it matters | features to steal | signals (homepage snapshot) | evidence |")
        lines.append("|---|---|---|---|---|")
        for r in sorted(by_niche[niche], key=lambda d: (d.get("store") or "").lower()):
            store = safe_inline(r.get("store", ""))
            why = safe_inline(r.get("why_it_matters", ""))
            feats = safe_inline(r.get("features_to_steal", ""))
            sig = safe_inline(signal_summary(r))
            evidence = (r.get("snapshot_path") or "").strip() or (r.get("url") or "").strip()
            if len(why) > 120:
                why = why[:117].rstrip() + "..."
            if len(feats) > 140:
                feats = feats[:137].rstrip() + "..."
            lines.append(f"| {store} | {why or '—'} | {feats or '—'} | {sig} | `{evidence}` |")
        lines.append("")

    lines.append("## Quick cross-niche signals (counts)")
    lines.append("")
    total = len(rows)
    blocked = sum(1 for r in rows if (r.get("blocked") or "").strip())
    lines.append(f"- stores: {total}")
    lines.append(f"- blocked (heuristic): {blocked}")
    for key, label in [
        ("bnpl", "bnpl"),
        ("reviews", "reviews"),
        ("returns", "returns"),
        ("subscriptions", "subscriptions"),
        ("search_personalization", "search/personalization"),
        ("tracking", "tracking"),
    ]:
        lines.append(f"- {label}: {sum(1 for r in rows if (r.get(key) or '').strip())}")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
