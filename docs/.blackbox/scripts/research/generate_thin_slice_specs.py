#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


PERMISSIVE = {"MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "0BSD", "MPL-2.0"}
COPYLEFT = {"GPL-2.0", "GPL-3.0", "AGPL-3.0", "LGPL-2.1", "LGPL-3.0"}
RESTRICTED = {"PROPRIETARY", "SUL-1.0", "BUSL-1.1", "ELv2"}


@dataclass(frozen=True)
class Row:
    rank: int
    feature: str
    category: str
    target_user: str
    fastest_path: str
    thin_slice: str
    oss: str
    competitors: str
    evidence: str


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "entry"


def license_mark(spdx: str) -> str:
    if spdx in PERMISSIVE:
        return "✅"
    if spdx in COPYLEFT or spdx in RESTRICTED:
        return "🧨"
    if spdx in {"UNKNOWN", "NOASSERTION", ""}:
        return "⚠️"
    return "⚠️"


def parse_rows(csv_path: Path) -> list[Row]:
    rows: list[Row] = []
    with csv_path.open(newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for raw in r:
            try:
                rank = int(raw.get("rank") or 0)
            except ValueError:
                continue
            if rank <= 0:
                continue
            rows.append(
                Row(
                    rank=rank,
                    feature=str(raw.get("feature") or "").strip(),
                    category=str(raw.get("category") or "").strip(),
                    target_user=str(raw.get("target_user") or "").strip(),
                    fastest_path=str(raw.get("fastest_path") or "").strip(),
                    thin_slice=str(raw.get("thin_slice") or "").strip(),
                    oss=str(raw.get("oss_accelerators") or "").strip(),
                    competitors=str(raw.get("competitor_proofs") or "").strip(),
                    evidence=str(raw.get("evidence_links") or "").strip(),
                )
            )
    rows.sort(key=lambda x: x.rank)
    return rows


def extract_entry_slugs(oss_cell: str) -> list[str]:
    slugs: list[str] = []
    for part in [p.strip() for p in (oss_cell or "").split(";") if p.strip()]:
        m = re.search(r"oss/entries/([a-z0-9-]+)\.md", part)
        if m:
            slugs.append(m.group(1))
    return slugs


def load_license_for_slug(entries_dir: Path, slug: str, overrides: dict[str, str]) -> tuple[str, str]:
    """
    Returns (display, license_spdx)
    """
    p = entries_dir / f"{slug}.json"
    if p.exists():
        meta = json.loads(p.read_text("utf-8"))
        full = meta.get("full_name") or slug
        if full in overrides:
            return full, overrides[full]
        lic = meta.get("license") or {}
        return full, (lic.get("spdx_id") or lic.get("key") or "UNKNOWN")

    # fallback to md entry
    md = entries_dir / f"{slug}.md"
    if md.exists():
        txt = md.read_text("utf-8", errors="replace")
        full = ""
        lic = ""
        for line in txt.splitlines():
            if line.startswith("- Full name:"):
                full = line.split(":", 1)[1].strip()
            if line.startswith("- License:"):
                lic = line.split(":", 1)[1].strip()
        if full and full in overrides:
            return full, overrides[full]
        return full or slug, lic or "UNKNOWN"

    return slug, "UNKNOWN"


def pick_recommended_oss(entries_dir: Path, oss_cell: str, overrides: dict[str, str]) -> tuple[str, list[str]]:
    """
    Pick a safe default:
    - first permissive OSS entry
    - else first available entry (flagged)
    - else empty
    Returns: (recommended string, details list)
    """
    slugs = extract_entry_slugs(oss_cell)
    if not slugs:
        return "", []

    details: list[str] = []
    resolved: list[tuple[str, str]] = []
    for slug in slugs:
        name, lic = load_license_for_slug(entries_dir, slug, overrides)
        resolved.append((name, lic))
        details.append(f"- {name} ({license_mark(lic)} {lic})")

    for name, lic in resolved:
        if lic in PERMISSIVE:
            return f"{name} (✅ {lic})", details
    # fallback
    name, lic = resolved[0]
    return f"{name} ({license_mark(lic)} {lic})", details


def write_spec(out_dir: Path, row: Row, entries_dir: Path, overrides: dict[str, str]) -> Path:
    slug = f"{row.rank:02d}_{safe_slug(row.feature)}.md"
    out = out_dir / slug

    recommended, options = pick_recommended_oss(entries_dir, row.oss, overrides)

    lines: list[str] = []
    lines.append("---")
    lines.append("status: draft")
    lines.append("last_reviewed: 2025-12-29")
    lines.append("owner: agent-zero")
    lines.append(f"rank: {row.rank}")
    lines.append("---")
    lines.append("")
    lines.append(f"# Thin Slice Spec — {row.feature}")
    lines.append("")
    lines.append("## 🎯 Goal (1 sentence)")
    lines.append("")
    lines.append(f"- {row.target_user}: deliver the smallest version of **{row.feature}** that creates real value and can ship safely.")
    lines.append("")
    lines.append("## ✅ Decision snapshot")
    lines.append("")
    lines.append(f"- Category: {row.category or 'TBD'}")
    lines.append(f"- Fastest path: {row.fastest_path or 'TBD'}")
    lines.append(f"- Recommended OSS default: {recommended or '(build)'}")
    if options:
        lines.append("")
        lines.append("OSS options (license-aware):")
        lines.extend(options)
    lines.append("")
    lines.append("## 🧩 Thin slice (1 day) — exact steps")
    lines.append("")
    # keep this consistent and runnable
    lines.append("1) Define the single “unit of work” and states")
    lines.append("2) Add the minimal DB tables")
    lines.append("3) Add the minimal API endpoints")
    lines.append("4) Build the minimal UI screen")
    lines.append("5) Add guardrails (RBAC + audit log + idempotency)")
    lines.append("6) Add a demo seed + verify end-to-end")
    lines.append("")
    lines.append("### 🗄️ Minimal data model (starter)")
    lines.append("")
    lines.append("- Tables (create only what’s needed):")
    lines.append("  - `audit_log` (actor_id, tenant_id, action, entity_type, entity_id, payload_json, created_at)")
    lines.append("  - `runs` (tenant_id, kind, status, error, started_at, finished_at) — only if async")
    lines.append("")
    lines.append("### 🔌 Minimal API (starter)")
    lines.append("")
    lines.append("- Endpoints:")
    lines.append("  - `GET /admin/<resource>` (list/read)")
    lines.append("  - `POST /admin/<resource>` (create/update one safe action)")
    lines.append("")
    lines.append("### 🖥️ Minimal UI (starter)")
    lines.append("")
    lines.append("- One page in the admin:")
    lines.append("  - list view + detail drawer")
    lines.append("  - one safe write action (guarded)")
    lines.append("")
    lines.append("## 🗓️ 1‑week slice (what gets hardened)")
    lines.append("")
    lines.append("- Add filters/search and bulk actions (if relevant)")
    lines.append("- Add approvals (if action is risky)")
    lines.append("- Add retries + failure reasons (if async)")
    lines.append("- Add alerts/notifications (optional)")
    lines.append("")
    lines.append("## 🛡️ Guardrails (non-negotiable)")
    lines.append("")
    lines.append("- RBAC: role gates for every write action")
    lines.append("- Audit log: log all writes + include before/after when feasible")
    lines.append("- Idempotency: protect write endpoints (especially “retry”/“run” actions)")
    lines.append("")
    lines.append("## ✅ Acceptance criteria")
    lines.append("")
    lines.append("- [ ] A teammate can demo the workflow in <5 minutes")
    lines.append("- [ ] Every write action produces an audit log entry")
    lines.append("- [ ] The thin slice can be safely disabled (feature flag or config)")
    lines.append("")
    if row.evidence:
        lines.append("## 🔗 Evidence links (for audit)")
        lines.append("")
        lines.append(f"- {row.evidence}")
        lines.append("")
    if row.competitors:
        lines.append("## 🏪 Competitors proving demand (summary)")
        lines.append("")
        lines.append(f"- {row.competitors}")
        lines.append("")

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return out


def write_index(out_dir: Path, specs: list[Path]) -> None:
    idx = out_dir / "README.md"
    lines: list[str] = []
    lines.append("# Thin Slice Specs (Top features)")
    lines.append("")
    lines.append("Each file is a single, build-ready step spec:")
    lines.append("- 1-day thin slice")
    lines.append("- 1-week hardening slice")
    lines.append("- guardrails + acceptance criteria")
    lines.append("")
    lines.append("## Index")
    lines.append("")
    for p in specs:
        lines.append(f"- `{p.name}`")
    lines.append("")
    idx.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate thin-slice specs for the Top-N market features.")
    ap.add_argument("--top-csv", required=True, help="Path to top-50-market-features.csv")
    ap.add_argument("--out-dir", required=True, help="Directory to write specs into")
    ap.add_argument("--entries-dir", required=True, help="Path to Step-04 oss/entries dir")
    ap.add_argument("--license-overrides", required=True, help="Path to license-overrides.json")
    ap.add_argument("--top", type=int, default=10, help="Generate top N specs")
    args = ap.parse_args()

    rows = parse_rows(Path(args.top_csv))[: args.top]
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    entries_dir = Path(args.entries_dir)
    overrides = json.loads(Path(args.license_overrides).read_text("utf-8"))

    specs: list[Path] = []
    for row in rows:
        specs.append(write_spec(out_dir, row, entries_dir, overrides))

    write_index(out_dir, specs)
    print(f"Wrote {len(specs)} specs to {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
