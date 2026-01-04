#!/usr/bin/env python3
"""
Generate a lightweight risk/health report from the cross-run OSS catalog.

Focus:
- license risk buckets
- staleness (updated_at)
- "unknown/missing" metadata

This stays metadata-only (no cloning).
"""

from __future__ import annotations

import argparse
import json
import os
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Tuple


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def utc_now_iso() -> str:
    return utc_now().strftime("%Y-%m-%dT%H:%M:%SZ")


def read_json(path: str) -> Any:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def safe_int(v: Any, default: int = 0) -> int:
    try:
        return int(v)
    except Exception:
        return default


def safe_str(v: Any, default: str = "") -> str:
    if isinstance(v, str):
        return v
    if v is None:
        return default
    return str(v)


def parse_github_time(s: str) -> datetime | None:
    s = (s or "").strip()
    if not s:
        return None
    # Most GitHub fields are RFC3339-ish: 2025-12-28T23:39:45Z
    try:
        if s.endswith("Z"):
            return datetime.strptime(s, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
        # fallback: best-effort
        return datetime.fromisoformat(s.replace("Z", "+00:00")).astimezone(timezone.utc)
    except Exception:
        return None


def top_counts(items: List[Dict[str, Any]], key: str, limit: int = 20) -> List[Tuple[str, int]]:
    counts: Dict[str, int] = {}
    for it in items:
        k = safe_str(it.get(key), "unknown") or "unknown"
        counts[k] = counts.get(k, 0) + 1
    return sorted(counts.items(), key=lambda kv: (-kv[1], kv[0].lower()))[:limit]


@dataclass
class Finding:
    full_name: str
    url: str
    reason: str


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--catalog", required=True, help="Path to .blackbox/oss-catalog/catalog.json")
    ap.add_argument("--out", required=True, help="Markdown output path (e.g. .blackbox/oss-catalog/risk.md)")
    ap.add_argument("--stale-days", type=int, default=365, help="Flag repos not updated in this many days (default: 365)")
    ap.add_argument("--very-stale-days", type=int, default=730, help="Flag repos not updated in this many days (default: 730)")
    ap.add_argument("--max-items", type=int, default=50, help="Max rows per section")
    args = ap.parse_args()

    payload = read_json(args.catalog)
    repos = payload.get("repos", [])
    if not isinstance(repos, list):
        raise SystemExit("catalog.json missing repos[]")

    now = utc_now()
    stale_cutoff = now - timedelta(days=args.stale_days)
    very_stale_cutoff = now - timedelta(days=args.very_stale_days)

    flagged_license: List[Finding] = []
    verify_license: List[Finding] = []
    missing_license: List[Finding] = []
    stale: List[Finding] = []
    very_stale: List[Finding] = []
    missing_language: List[Finding] = []

    for r in repos:
        if not isinstance(r, dict):
            continue
        full_name = safe_str(r.get("full_name")).strip()
        url = safe_str(r.get("url")).strip()
        if not full_name:
            continue

        lb = safe_str(r.get("license_bucket"), "").strip()
        spdx = safe_str(r.get("license_spdx"), "").strip()
        lang = safe_str(r.get("language"), "").strip()
        updated_at = safe_str(r.get("updated_at"), "").strip()

        if not spdx or spdx in {"UNKNOWN", "N/A", "None"}:
            missing_license.append(Finding(full_name, url, "license_spdx missing"))
        elif lb == "flagged":
            flagged_license.append(Finding(full_name, url, f"license_bucket=flagged ({spdx})"))
        elif lb == "verify":
            verify_license.append(Finding(full_name, url, f"license_bucket=verify ({spdx})"))

        if not lang or lang in {"N/A", "None", "unknown"}:
            missing_language.append(Finding(full_name, url, "language missing/unknown"))

        dt = parse_github_time(updated_at)
        if dt is not None:
            if dt < very_stale_cutoff:
                very_stale.append(Finding(full_name, url, f"updated_at={updated_at} (> {args.very_stale_days}d stale)"))
            elif dt < stale_cutoff:
                stale.append(Finding(full_name, url, f"updated_at={updated_at} (> {args.stale_days}d stale)"))

    def section(title: str, findings: List[Finding]) -> List[str]:
        lines: List[str] = []
        lines.append(f"## {title} ({len(findings)})")
        lines.append("")
        if not findings:
            lines.append("- (none)")
            lines.append("")
            return lines
        for f in findings[: args.max_items]:
            reason = f.reason.replace("\n", " ").strip()
            lines.append(f"- **{f.full_name}** — {reason} ({f.url})")
        if len(findings) > args.max_items:
            lines.append(f"- … {len(findings) - args.max_items} more")
        lines.append("")
        return lines

    lines: List[str] = []
    lines.append("# OSS Catalog Risk & Health Report")
    lines.append("")
    lines.append(f"Updated: `{utc_now_iso()}`")
    lines.append(f"Catalog repos: **{len(repos)}**")
    lines.append("")

    lines.append("## Summary counts")
    lines.append("")
    for k, v in top_counts(repos, "license_bucket", limit=10):
        lines.append(f"- license_bucket `{k}`: {v}")
    lines.append("")
    for k, v in top_counts(repos, "language", limit=10):
        lines.append(f"- language `{k}`: {v}")
    lines.append("")

    # High-signal sections first
    lines += section("License flagged (copyleft/unknown risk)", flagged_license)
    lines += section("License verify (needs confirmation)", verify_license)
    lines += section("Missing license metadata", missing_license)
    lines += section(f"Very stale (>{args.very_stale_days} days)", very_stale)
    lines += section(f"Stale (>{args.stale_days} days)", stale)
    lines += section("Missing/unknown language", missing_language)

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        f.write("\n".join(lines).rstrip() + "\n")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

