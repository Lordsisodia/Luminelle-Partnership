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
class OssRef:
    raw: str
    kind: str  # path | repo | text
    slug: str  # unleash-unleash or apache-superset etc (for kind=path)
    full_name: str  # owner/repo when known, else ""


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "entry"


def license_mark(spdx: str) -> tuple[str, str]:
    if spdx in PERMISSIVE:
        return "✅", spdx
    if spdx in COPYLEFT:
        return "🧨", spdx
    if spdx in RESTRICTED:
        return "🧨", spdx
    if spdx in {"UNKNOWN", "NOASSERTION", ""}:
        return "⚠️", spdx or "UNKNOWN"
    return "⚠️", spdx


def extract_oss_refs(cell: str) -> list[OssRef]:
    """
    OSS column can contain:
    - `.blackbox/.../oss/entries/<slug>.md`
    - 'OpenSearch (Apache-2.0)'
    - 'Unleash; Flagsmith'
    - '(none listed)'
    """
    cell = (cell or "").strip()
    if not cell or cell in {"(none listed)", "(build)", "(none)", "TBD"}:
        return []

    parts = [p.strip() for p in cell.split(";") if p.strip()]
    out: list[OssRef] = []
    for p in parts:
        # Match ".../oss/entries/<slug>.md"
        m = re.search(r"oss/entries/([a-z0-9-]+)\.md", p)
        if m:
            slug = m.group(1)
            out.append(OssRef(raw=p, kind="path", slug=slug, full_name=""))
            continue
        # direct owner/repo?
        m2 = re.match(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$", p)
        if m2:
            out.append(OssRef(raw=p, kind="repo", slug=safe_slug(p), full_name=p))
            continue
        out.append(OssRef(raw=p, kind="text", slug=safe_slug(p), full_name=""))
    return out


def try_read_md_identity(md_path: Path) -> tuple[str, str]:
    """
    Returns (full_name, repo_url) if discoverable.
    """
    txt = md_path.read_text("utf-8", errors="replace")
    full = ""
    repo = ""
    for line in txt.splitlines():
        if line.startswith("- Full name:"):
            full = line.split(":", 1)[1].strip()
        if line.startswith("- Repo:"):
            repo = line.split(":", 1)[1].strip()
        if full and repo:
            break
    # fallback: repo url -> owner/repo
    if not full and repo and "github.com/" in repo:
        full = repo.split("github.com/")[1].strip("/").split("/")[0:2]
        full = "/".join(full) if len(full) == 2 else ""
    return full, repo


def resolve_license_for_ref(
    ref: OssRef, entries_dir: Path, overrides: dict[str, str]
) -> tuple[str, str, str]:
    """
    Returns: (mark, spdx, display_name)
    """
    # By explicit override via full_name
    if ref.full_name and ref.full_name in overrides:
        spdx = overrides[ref.full_name]
        mark, spdx_norm = license_mark(spdx)
        return mark, spdx_norm, ref.full_name

    if ref.kind == "path":
        # Try slug.json
        json_path = entries_dir / f"{ref.slug}.json"
        if json_path.exists():
            meta = json.loads(json_path.read_text("utf-8"))
            full = meta.get("full_name") or ""
            if full and full in overrides:
                spdx = overrides[full]
            else:
                lic = meta.get("license") or {}
                spdx = lic.get("spdx_id") or lic.get("key") or "UNKNOWN"
            mark, spdx_norm = license_mark(str(spdx))
            display = full or ref.slug
            return mark, spdx_norm, display

        # Try slug.md identity
        md_path = entries_dir / f"{ref.slug}.md"
        if md_path.exists():
            full, _repo = try_read_md_identity(md_path)
            if full and full in overrides:
                spdx = overrides[full]
                mark, spdx_norm = license_mark(spdx)
                return mark, spdx_norm, full
            # unknown
            return "⚠️", "UNKNOWN", full or ref.slug

        return "⚠️", "UNKNOWN", ref.slug

    if ref.kind == "repo":
        spdx = overrides.get(ref.full_name, "UNKNOWN")
        mark, spdx_norm = license_mark(spdx)
        return mark, spdx_norm, ref.full_name

    # text fallback: we can't reliably map to repo
    return "⚠️", "UNKNOWN", ref.raw


def annotate_cell(cell: str, entries_dir: Path, overrides: dict[str, str]) -> str:
    refs = extract_oss_refs(cell)
    if not refs:
        return cell

    annotated_parts: list[str] = []
    for ref in refs:
        mark, spdx, display = resolve_license_for_ref(ref, entries_dir, overrides)
        # Keep the original path text but append a license badge when we can.
        if ref.kind == "path":
            annotated_parts.append(f"{ref.raw} ({mark} {spdx})")
        elif ref.kind == "repo":
            annotated_parts.append(f"{display} ({mark} {spdx})")
        else:
            annotated_parts.append(f"{ref.raw} ({mark} {spdx})" if spdx != "UNKNOWN" else ref.raw)

    return "; ".join(annotated_parts)


def main() -> int:
    ap = argparse.ArgumentParser(description="Annotate Top-50 market features OSS column with license flags.")
    ap.add_argument("--top-csv", required=True, help="Path to top-50-market-features.csv")
    ap.add_argument("--top-md", required=True, help="Path to top-50-market-features.md (will be overwritten)")
    ap.add_argument("--entries-dir", required=True, help="Path to Step-04 oss/entries directory")
    ap.add_argument("--license-overrides", required=True, help="Path to license-overrides.json")
    args = ap.parse_args()

    entries_dir = Path(args.entries_dir)
    overrides = json.loads(Path(args.license_overrides).read_text("utf-8"))

    in_csv = Path(args.top_csv)
    rows: list[dict[str, str]] = []
    with in_csv.open(newline="", encoding="utf-8") as f:
        r = csv.DictReader(f)
        for row in r:
            rows.append(dict(row))

    # annotate oss_accelerators
    for row in rows:
        row["oss_accelerators"] = annotate_cell(row.get("oss_accelerators", ""), entries_dir, overrides)

    # rewrite markdown
    out_md = Path(args.top_md)
    lines: list[str] = []
    lines.append("# Top 50 Market Features (Execution Map)")
    lines.append("")
    lines.append("This table is license-aware:")
    lines.append("- ✅ permissive (safe default)")
    lines.append("- 🧨 copyleft / source-available / proprietary (flag by default)")
    lines.append("- ⚠️ unknown (verify)")
    lines.append("")
    lines.append("Source data:")
    lines.append(f"- CSV: `{in_csv}`")
    lines.append(f"- License overrides: `{args.license_overrides}`")
    lines.append("")
    lines.append("| Rank | Feature | Category | Target user | Fastest path | Thin slice (1–3 days) | OSS (license-aware) | Competitors | Evidence |")
    lines.append("|---:|---|---|---|---|---|---|---|---|")
    for row in rows:
        lines.append(
            "| "
            + " | ".join(
                [
                    row.get("rank", ""),
                    (row.get("feature", "") or "").replace("|", " / "),
                    (row.get("category", "") or "").replace("|", " / "),
                    (row.get("target_user", "") or "").replace("|", " / "),
                    (row.get("fastest_path", "") or "").replace("|", " / "),
                    (row.get("thin_slice", "") or "").replace("|", " / "),
                    (row.get("oss_accelerators", "") or "").replace("|", " / "),
                    (row.get("competitor_proofs", "") or "").replace("|", " / "),
                    (row.get("evidence_links", "") or "").replace("|", " / "),
                ]
            )
            + " |"
        )

    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
