#!/usr/bin/env python3
"""
Audit "what we haven't found yet" for a feature research synthesis plan.

Goal:
- turn existing local artifacts into actionable gaps + next actions
- keep everything in .md outputs so humans can ask "what did we miss?"

Inputs (expected in synth plan artifacts/):
- competitor-master-table.csv
- top-50-market-features.csv

Outputs (written to synth plan artifacts/):
- gaps-report.md
- next-actions.md

No third-party dependencies.
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path


def read_text(p: Path) -> str:
    return p.read_text(encoding="utf-8", errors="replace")


def write_text(p: Path, text: str) -> None:
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")


def safe_int(v, default: int = 0) -> int:
    try:
        return int(v)
    except Exception:
        return default


def now_utc() -> str:
    return dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


@dataclass(frozen=True)
class CompetitorRow:
    sweep: str
    name: str
    category: str
    website: str
    notes: str
    slug: str
    evidence_status: str
    snapshot_title: str
    snapshot_description: str
    evidence_file: str


def load_competitors(csv_path: Path) -> list[CompetitorRow]:
    rows: list[CompetitorRow] = []
    with csv_path.open(newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for raw in r:
            rows.append(
                CompetitorRow(
                    sweep=(raw.get("sweep") or "").strip(),
                    name=(raw.get("name") or "").strip(),
                    category=(raw.get("category") or "").strip(),
                    website=(raw.get("website") or "").strip(),
                    notes=(raw.get("notes") or "").strip(),
                    slug=(raw.get("slug") or "").strip(),
                    evidence_status=(raw.get("evidence_status") or "").strip(),
                    snapshot_title=(raw.get("snapshot_title") or "").strip(),
                    snapshot_description=(raw.get("snapshot_description") or "").strip(),
                    evidence_file=(raw.get("evidence_file") or "").strip(),
                )
            )
    return rows


@dataclass(frozen=True)
class FeatureRow:
    rank: int
    feature: str
    category: str
    target_user: str
    fastest_path: str
    thin_slice: str
    oss_accelerators: str
    competitor_proofs: str
    evidence_links: str


def load_features(csv_path: Path) -> list[FeatureRow]:
    rows: list[FeatureRow] = []
    with csv_path.open(newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for raw in r:
            rows.append(
                FeatureRow(
                    rank=safe_int(raw.get("rank", "0")),
                    feature=(raw.get("feature") or "").strip(),
                    category=(raw.get("category") or "").strip(),
                    target_user=(raw.get("target_user") or "").strip(),
                    fastest_path=(raw.get("fastest_path") or "").strip(),
                    thin_slice=(raw.get("thin_slice") or "").strip(),
                    oss_accelerators=(raw.get("oss_accelerators") or "").strip(),
                    competitor_proofs=(raw.get("competitor_proofs") or "").strip(),
                    evidence_links=(raw.get("evidence_links") or "").strip(),
                )
            )
    return sorted(rows, key=lambda x: x.rank)


def is_none_listed(cell: str) -> bool:
    s = cell.strip().lower()
    return s in {"(none listed)", "none", "n/a", ""}


def split_backticked_paths(cell: str) -> list[str]:
    # cell content is like: `path1`; `path2` ...
    return [m.group(1) for m in re.finditer(r"`([^`]+)`", cell)]


def summarize_license_gaps(step04_plan: Path) -> tuple[int, int, list[str]]:
    """
    Best-effort: scan step-04 oss/entries/*.json for license info.
    Return (total_json, unknown_license_count, examples)
    """
    entries_dir = step04_plan / "oss" / "entries"
    if not entries_dir.exists():
        return (0, 0, [])

    total = 0
    unknown = 0
    examples: list[str] = []

    for p in sorted(entries_dir.glob("*.json")):
        total += 1
        try:
            obj = json.loads(read_text(p))
        except Exception:
            unknown += 1
            if len(examples) < 10:
                examples.append(p.name)
            continue

        lic = obj.get("license")
        # GitHub API: license may be None or dict with "spdx_id"
        spdx = ""
        if isinstance(lic, dict):
            spdx = str(lic.get("spdx_id") or "").strip()
        if not spdx or spdx.upper() in {"NOASSERTION", "OTHER"}:
            unknown += 1
            if len(examples) < 10:
                examples.append(f"{p.stem} ({spdx or 'missing'})")

    return (total, unknown, examples)


def build_gaps_report(*, synth_plan: Path, competitors: list[CompetitorRow], features: list[FeatureRow], step04_plan: Path) -> str:
    updated = now_utc()

    # Competitor evidence gaps
    status_counts = Counter([c.evidence_status or "unknown" for c in competitors])
    missing_snapshot = [c for c in competitors if (c.evidence_status or "").strip() == "missing_snapshot"]
    missing_title = [c for c in competitors if (c.evidence_status or "").strip() == "ok" and not c.snapshot_title]
    missing_desc = [c for c in competitors if (c.evidence_status or "").strip() == "ok" and not c.snapshot_description]

    miss_by_cat = Counter([c.category or "unknown" for c in missing_snapshot])
    top_miss_cats = miss_by_cat.most_common(12)

    # Feature gaps
    oss_missing = [f for f in features if is_none_listed(f.oss_accelerators)]
    competitor_missing = [f for f in features if is_none_listed(f.competitor_proofs)]

    # License gaps (from OSS JSON metadata)
    total_oss_json, unknown_license, unknown_examples = summarize_license_gaps(step04_plan)

    lines: list[str] = []
    lines += [
        "---",
        "status: active",
        f"updated_at_utc: {updated}",
        "---",
        "",
        "# 🕵️ Intelligence Gaps Report (what we haven’t found yet)",
        "",
        "This report is auto-generated from existing local artifacts to surface the highest-leverage missing info.",
        "",
        "## ✅ Summary",
        "",
        f"- Updated (UTC): `{updated}`",
        f"- Competitors total: `{len(competitors)}`",
        f"- Feature rows (top-50 map): `{len(features)}`",
        f"- OSS JSON entries (step-04): `{total_oss_json}`",
        "",
        "## 🏪 Competitor evidence gaps",
        "",
        "### Evidence status counts",
        "",
    ]
    for k, v in status_counts.most_common():
        lines.append(f"- `{k}`: `{v}`")

    lines += [
        "",
        f"### Missing snapshots: `{len(missing_snapshot)}`",
        "",
        "These are competitors where we have an evidence file path but the snapshot is missing/unfinished.",
        "",
    ]
    if top_miss_cats:
        lines.append("Top categories with missing snapshots:")
        for cat, n in top_miss_cats:
            lines.append(f"- `{cat}`: `{n}`")
        lines.append("")

    for c in missing_snapshot[:25]:
        lines.append(f"- `{c.name}` — `{c.category}` — `{c.website}` (evidence: `{c.evidence_file}`)")

    lines += [
        "",
        f"### Snapshot metadata gaps (quality, not coverage)",
        "",
        f"- Missing snapshot title (status=ok): `{len(missing_title)}`",
        f"- Missing snapshot description (status=ok): `{len(missing_desc)}`",
        "",
        "## 🗺️ Feature map gaps (Top 50 execution map)",
        "",
        f"### Missing OSS accelerators: `{len(oss_missing)}`",
        "",
        "These are ranked features where we haven’t mapped any OSS building blocks yet (even if competitors exist).",
        "",
    ]
    for f in oss_missing[:20]:
        lines.append(f"- `#{f.rank}` {f.feature} — `{f.category}` (thin slice: {f.thin_slice})")

    lines += [
        "",
        f"### Missing competitor proofs: `{len(competitor_missing)}`",
        "",
        "These are ranked features where we haven’t linked any competitor evidence files yet.",
        "",
    ]
    for f in competitor_missing[:20]:
        lines.append(f"- `#{f.rank}` {f.feature} — `{f.category}`")

    lines += [
        "",
        "## ⚖️ OSS license verification gaps",
        "",
        f"- OSS JSON entries scanned: `{total_oss_json}`",
        f"- Unknown/unclear license (GitHub metadata): `{unknown_license}`",
        "",
    ]
    if unknown_examples:
        lines.append("Examples to verify next:")
        for ex in unknown_examples:
            lines.append(f"- `{ex}`")
        lines.append("")

    # Output pointers
    lines += [
        "## ➡️ Next actions",
        "",
        "See:",
        f"- `{(synth_plan / 'artifacts' / 'next-actions.md').as_posix()}`",
        "",
    ]
    return "\n".join(lines) + "\n"


def build_next_actions(*, synth_plan: Path, competitors: list[CompetitorRow], features: list[FeatureRow]) -> str:
    updated = now_utc()
    missing_snapshot = [c for c in competitors if (c.evidence_status or "").strip() == "missing_snapshot"]
    missing_snapshot = sorted(missing_snapshot, key=lambda x: (x.sweep, x.category, x.name))

    oss_missing = [f for f in features if is_none_listed(f.oss_accelerators)]
    competitor_missing = [f for f in features if is_none_listed(f.competitor_proofs)]

    lines: list[str] = []
    lines += [
        "---",
        "status: active",
        f"updated_at_utc: {updated}",
        "---",
        "",
        "# ✅ Next Actions (gap-driven intelligence loop)",
        "",
        "This is the actionable queue derived from `gaps-report.md`.",
        "",
        "## 🏪 Fix competitor evidence gaps (snapshots)",
        "",
        "Pick the next 10 and resolve `missing_snapshot` (create snapshot + fill metadata).",
        "",
    ]
    for c in missing_snapshot[:20]:
        lines.append(f"- [ ] `{c.name}` — `{c.category}` — `{c.website}` (evidence: `{c.evidence_file}`)")

    lines += [
        "",
        "## 🗺️ Fill feature map gaps (OSS accelerators)",
        "",
        "For each feature below: find at least 1 permissive OSS repo or explicitly mark “none exists / build it”.",
        "",
    ]
    for f in oss_missing[:15]:
        lines.append(f"- [ ] `#{f.rank}` {f.feature} — `{f.category}`")

    lines += [
        "",
        "## 🧾 Fill feature map gaps (competitor proofs)",
        "",
        "For each feature below: link at least 1 competitor evidence file showing it in the wild.",
        "",
    ]
    for f in competitor_missing[:15]:
        lines.append(f"- [ ] `#{f.rank}` {f.feature} — `{f.category}`")

    lines += [
        "",
        "## 🧠 Operator cadence (simple)",
        "",
        "- After each tranche, update at least 1 core artifact (top-50 map, OSS shortlist, thin slices).",
        "- Every ~10 steps, compact context.",
        "- Every 10 compactions (≈100 steps), do a review and prune drift.",
        "",
    ]
    return "\n".join(lines) + "\n"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--synth-plan", required=True, help="Path to synthesis plan (docs/.blackbox/.plans/<synth>).")
    ap.add_argument("--write", action="store_true", help="Write gaps-report.md and next-actions.md.")
    args = ap.parse_args()

    synth = Path(args.synth_plan)
    art = synth / "artifacts"
    comp_csv = art / "competitor-master-table.csv"
    feat_csv = art / "top-50-market-features.csv"
    sources = art / "sources.md"

    if not comp_csv.exists():
        raise SystemExit(f"Missing: {comp_csv}")
    if not feat_csv.exists():
        raise SystemExit(f"Missing: {feat_csv}")
    if not sources.exists():
        raise SystemExit(f"Missing: {sources}")

    # Infer step-04 plan path from sources.md
    src = read_text(sources)
    m = re.search(r"^- Step 04 plan:\s*`([^`]+)`\s*$", src, re.MULTILINE)
    if not m:
        raise SystemExit("Missing Step 04 plan in sources.md")
    step04 = Path(m.group(1).strip())

    competitors = load_competitors(comp_csv)
    features = load_features(feat_csv)

    gaps = build_gaps_report(synth_plan=synth, competitors=competitors, features=features, step04_plan=step04)
    next_actions = build_next_actions(synth_plan=synth, competitors=competitors, features=features)

    if args.write:
        write_text(art / "gaps-report.md", gaps)
        write_text(art / "next-actions.md", next_actions)
        return 0

    print(gaps)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

