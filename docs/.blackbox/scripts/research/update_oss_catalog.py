#!/usr/bin/env python3
"""
Merge an OSS discovery run's extracted candidates into a cross-run catalog.

This intentionally stores *metadata only* (no cloning, no code ingestion).
"""

from __future__ import annotations

import argparse
import json
import os
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def read_json(path: str) -> Any:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path: str, payload: Any) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, sort_keys=True)
        f.write("\n")


def normalize_list(values: Any) -> List[str]:
    if not isinstance(values, list):
        return []
    out: List[str] = []
    for v in values:
        if isinstance(v, str):
            s = v.strip()
            if s:
                out.append(s)
    # stable de-dupe
    seen = set()
    uniq: List[str] = []
    for s in out:
        if s not in seen:
            uniq.append(s)
            seen.add(s)
    return uniq


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


@dataclass
class CatalogEntry:
    full_name: str
    url: str
    description: str
    language: str
    stars: int
    forks: int
    updated_at: str
    topics: List[str]
    tags: List[str]
    license_spdx: str
    license_bucket: str
    score: int
    rationale: str
    first_seen_at_utc: str
    last_seen_at_utc: str
    seen_in_runs: List[str]

    def to_dict(self) -> Dict[str, Any]:
        return {
            "full_name": self.full_name,
            "url": self.url,
            "description": self.description,
            "language": self.language,
            "stars": self.stars,
            "forks": self.forks,
            "updated_at": self.updated_at,
            "topics": self.topics,
            "tags": self.tags,
            "license_spdx": self.license_spdx,
            "license_bucket": self.license_bucket,
            "score": self.score,
            "rationale": self.rationale,
            "first_seen_at_utc": self.first_seen_at_utc,
            "last_seen_at_utc": self.last_seen_at_utc,
            "seen_in_runs": self.seen_in_runs,
        }


def run_id_from_run_path(run_path: str) -> str:
    run_path = run_path.rstrip("/").rstrip("\\")
    base = os.path.basename(run_path)
    return base or run_path


def load_existing_catalog(path: str) -> Tuple[Dict[str, Any], Dict[str, Dict[str, Any]]]:
    if not os.path.exists(path):
        base = {"generated_at_utc": utc_now_iso(), "count": 0, "repos": []}
        return base, {}

    payload = read_json(path)
    if not isinstance(payload, dict):
        payload = {"generated_at_utc": utc_now_iso(), "count": 0, "repos": []}
    repos = payload.get("repos", [])
    by_name: Dict[str, Dict[str, Any]] = {}
    if isinstance(repos, list):
        for r in repos:
            if isinstance(r, dict) and isinstance(r.get("full_name"), str):
                by_name[r["full_name"]] = r
    return payload, by_name


def merge_entry(existing: Optional[Dict[str, Any]], incoming: Dict[str, Any], run_id: str) -> CatalogEntry:
    now = utc_now_iso()
    full_name = safe_str(incoming.get("full_name")).strip()
    if not full_name:
        raise ValueError("candidate missing full_name")

    url = safe_str(incoming.get("url")).strip()
    description = safe_str(incoming.get("description")).strip()
    language = safe_str(incoming.get("language")).strip()
    updated_at = safe_str(incoming.get("updated_at")).strip()
    topics = normalize_list(incoming.get("topics"))
    tags = normalize_list(incoming.get("tags"))
    license_spdx = safe_str(incoming.get("license_spdx")).strip()
    license_bucket = safe_str(incoming.get("license_bucket")).strip()
    stars = safe_int(incoming.get("stars"), 0)
    forks = safe_int(incoming.get("forks"), 0)
    score = safe_int(incoming.get("score"), 0)
    rationale = safe_str(incoming.get("rationale")).strip()

    first_seen = now
    seen_in_runs: List[str] = [run_id]

    if isinstance(existing, dict):
        first_seen = safe_str(existing.get("first_seen_at_utc"), first_seen) or first_seen
        prev_runs = existing.get("seen_in_runs", [])
        if isinstance(prev_runs, list):
            seen_in_runs = [safe_str(x) for x in prev_runs if safe_str(x)]
            if run_id not in seen_in_runs:
                seen_in_runs.append(run_id)

    # Merge topics/tags with stable de-dupe
    merged_topics = normalize_list((existing or {}).get("topics", [])) + topics
    merged_tags = normalize_list((existing or {}).get("tags", [])) + tags

    merged_topics = normalize_list(merged_topics)
    merged_tags = normalize_list(merged_tags)

    # Prefer incoming values for fast-moving signals; keep existing if incoming missing
    def prefer(new_v: str, old_v: str) -> str:
        return new_v if new_v else old_v

    if isinstance(existing, dict):
        url = prefer(url, safe_str(existing.get("url")))
        description = prefer(description, safe_str(existing.get("description")))
        language = prefer(language, safe_str(existing.get("language")))
        updated_at = prefer(updated_at, safe_str(existing.get("updated_at")))
        def is_unknown_license(s: str) -> bool:
            v = (s or "").strip().upper()
            return v in {"", "UNKNOWN", "NOASSERTION", "NONE", "N/A"}

        # License signals:
        # - Prefer *specific* SPDX ids from incoming.
        # - Do not let "UNKNOWN/NOASSERTION" overwrite a previously verified SPDX/bucket.
        existing_spdx = safe_str(existing.get("license_spdx"))
        existing_bucket = safe_str(existing.get("license_bucket"))

        if is_unknown_license(license_spdx):
            license_spdx = existing_spdx
            license_bucket = existing_bucket
        else:
            license_spdx = prefer(license_spdx, existing_spdx)
            license_bucket = prefer(license_bucket, existing_bucket)

        rationale = prefer(rationale, safe_str(existing.get("rationale")))
        # For stars/forks/score, prefer the max we’ve seen
        stars = max(stars, safe_int(existing.get("stars"), 0))
        forks = max(forks, safe_int(existing.get("forks"), 0))
        score = max(score, safe_int(existing.get("score"), 0))

    return CatalogEntry(
        full_name=full_name,
        url=url,
        description=description,
        language=language,
        stars=stars,
        forks=forks,
        updated_at=updated_at,
        topics=merged_topics,
        tags=merged_tags,
        license_spdx=license_spdx,
        license_bucket=license_bucket,
        score=score,
        rationale=rationale,
        first_seen_at_utc=first_seen,
        last_seen_at_utc=now,
        seen_in_runs=seen_in_runs,
    )


def build_index_md(repos: List[Dict[str, Any]], out_path: str) -> None:
    now = utc_now_iso()

    # Simple rollups
    tag_counts: Dict[str, int] = {}
    license_counts: Dict[str, int] = {}
    lang_counts: Dict[str, int] = {}
    for r in repos:
        for t in normalize_list(r.get("tags")):
            tag_counts[t] = tag_counts.get(t, 0) + 1
        lb = safe_str(r.get("license_bucket"), "unknown") or "unknown"
        license_counts[lb] = license_counts.get(lb, 0) + 1
        lang = safe_str(r.get("language"), "unknown") or "unknown"
        lang_counts[lang] = lang_counts.get(lang, 0) + 1

    def top_items(d: Dict[str, int], n: int = 20) -> List[Tuple[str, int]]:
        return sorted(d.items(), key=lambda kv: (-kv[1], kv[0].lower()))[:n]

    # Ranked lists
    ranked = sorted(
        repos,
        key=lambda r: (
            -safe_int(r.get("score"), 0),
            -safe_int(r.get("stars"), 0),
            safe_str(r.get("full_name")).lower(),
        ),
    )

    lines: List[str] = []
    lines.append("# OSS Catalog (cross-run index)")
    lines.append("")
    lines.append(f"Updated: `{now}`")
    lines.append(f"Total repos: **{len(repos)}**")
    lines.append("")

    lines.append("## Coverage snapshot")
    lines.append("")
    lines.append("### License buckets")
    for k, v in top_items(license_counts, n=20):
        lines.append(f"- `{k}`: {v}")
    lines.append("")

    lines.append("### Top languages")
    for k, v in top_items(lang_counts, n=20):
        lines.append(f"- `{k}`: {v}")
    lines.append("")

    lines.append("### Top tags")
    for k, v in top_items(tag_counts, n=30):
        lines.append(f"- `{k}`: {v}")
    lines.append("")

    lines.append("## Top 25 (score, then stars)")
    lines.append("")
    for r in ranked[:25]:
        full_name = safe_str(r.get("full_name"))
        url = safe_str(r.get("url"))
        score = safe_int(r.get("score"), 0)
        stars = safe_int(r.get("stars"), 0)
        lb = safe_str(r.get("license_bucket"), "unknown")
        tags = normalize_list(r.get("tags"))[:6]
        tag_str = ", ".join(tags) if tags else "—"
        lines.append(f"- **{full_name}** — score={score}, stars={stars}, license={lb}, tags={tag_str} ({url})")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines).rstrip() + "\n")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--run-path", required=True, help="Path to a single OSS discovery run folder under .blackbox/.plans/...")
    ap.add_argument("--extracted-json", required=True, help="Path to artifacts/extracted.json from that run")
    ap.add_argument("--out-catalog", required=True, help="Catalog JSON output path (e.g. .blackbox/oss-catalog/catalog.json)")
    ap.add_argument("--out-index", required=False, help="Optional markdown index output path (e.g. .blackbox/oss-catalog/index.md)")
    args = ap.parse_args()

    run_id = run_id_from_run_path(args.run_path)
    extracted = read_json(args.extracted_json)

    candidates = extracted.get("candidates", [])
    if not isinstance(candidates, list):
        raise SystemExit("extracted.json missing candidates[]")

    catalog_payload, by_name = load_existing_catalog(args.out_catalog)

    merged_count = 0
    for c in candidates:
        if not isinstance(c, dict):
            continue
        full_name = safe_str(c.get("full_name")).strip()
        if not full_name:
            continue
        existing = by_name.get(full_name)
        entry = merge_entry(existing, c, run_id)
        by_name[full_name] = entry.to_dict()
        merged_count += 1

    repos_list = [by_name[k] for k in sorted(by_name.keys(), key=lambda s: s.lower())]
    out_payload = {
        "generated_at_utc": utc_now_iso(),
        "count": len(repos_list),
        "runs_seen": len({rid for r in repos_list for rid in (r.get("seen_in_runs") or []) if isinstance(rid, str)}),
        "repos": repos_list,
        "last_merge": {
            "run_id": run_id,
            "merged_candidates": merged_count,
        },
    }
    write_json(args.out_catalog, out_payload)

    if args.out_index:
        build_index_md(repos_list, args.out_index)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
