#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
import textwrap
from dataclasses import dataclass
from pathlib import Path
from typing import Any


PERMISSIVE = {"MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "0BSD", "MPL-2.0"}
COPYLEFT = {"GPL-2.0", "GPL-3.0", "AGPL-3.0", "LGPL-2.1", "LGPL-3.0"}


@dataclass(frozen=True)
class RepoMeta:
    full_name: str
    url: str
    license: str
    language: str
    stars: int
    updated_at: str
    default_branch: str
    description: str


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "entry"


def license_bucket(spdx: str) -> str:
    if spdx in PERMISSIVE:
        return "permissive"
    if spdx in COPYLEFT:
        return "copyleft"
    if spdx in {"UNKNOWN", "NOASSERTION"}:
        return "unknown"
    return "other"


def meta_from_raw(full_name: str, raw: dict[str, Any]) -> RepoMeta:
    url = raw.get("html_url") or f"https://github.com/{full_name}"
    lic = "UNKNOWN"
    if raw.get("license"):
        lic = raw["license"].get("spdx_id") or raw["license"].get("key") or "UNKNOWN"
    if raw.get("_license_override"):
        lic = str(raw["_license_override"])
    return RepoMeta(
        full_name=full_name,
        url=url,
        license=lic,
        language=raw.get("language") or "N/A",
        stars=int(raw.get("stargazers_count") or 0),
        updated_at=raw.get("updated_at") or "",
        default_branch=raw.get("default_branch") or "main",
        description=(raw.get("description") or "").strip(),
    )


def load_meta(entries_dir: Path, full_name: str) -> RepoMeta:
    p = entries_dir / f"{safe_slug(full_name)}.json"
    if not p.exists():
        raise FileNotFoundError(p)
    raw = json.loads(p.read_text("utf-8"))
    return meta_from_raw(full_name, raw)


def guess_integration_posture(meta: RepoMeta) -> str:
    """
    Heuristic only. We do not assume product choices; this gives a default.
    """
    text = (meta.full_name + " " + meta.description).lower()
    if "framework" in text or "admin" in text or "dashboard" in text:
        return "Embed UI into our admin"
    if any(w in text for w in ["server", "service", "platform", "orchestration", "workflow", "policy", "auth", "iam"]):
        return "Service boundary (run it separately, call via API)"
    return "Inspiration-only (copy patterns, not code)"


def md(meta: RepoMeta) -> str:
    bucket = license_bucket(meta.license)
    if meta.license in {"PROPRIETARY", "SUL-1.0", "BUSL-1.1", "ELv2"}:
        bucket = "restricted"
    lic_mark = "✅" if bucket == "permissive" else ("🧨" if bucket in {"copyleft", "restricted"} else "⚠️")
    readme_url = f"https://raw.githubusercontent.com/{meta.full_name}/{meta.default_branch}/README.md"
    posture = guess_integration_posture(meta)

    def b(s: str) -> str:
        return textwrap.dedent(s).strip("\n") + "\n"

    return (
        b(
            f"""---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
---

# OSS Deep Audit — {meta.full_name}

## 0) Identity (facts)

- Repo: {meta.url}
- License (SPDX): {lic_mark} {meta.license}
- Primary language: {meta.language}
- Stars: {meta.stars}
- Default branch: {meta.default_branch}
- Last updated: {meta.updated_at or 'N/A'}
"""
        )
        + (b(f"- Description: {meta.description}\n") if meta.description else "")
        + b(
            f"""
## 1) What we want from it (1 sentence)

- We want **{meta.full_name}** as a reusable building block so we can ship faster for merchant admins (and avoid re-building commodity primitives).

## 2) What feature row does it map to?

- Link the row(s) in `artifacts/top-50-market-features.md`:
  - TODO: add exact row number(s) after triage

## 3) Integration posture (pick one)

- Recommended default: **{posture}**
- Notes:
  - If license is ⚠️ unknown, treat as “pilot / verify” until confirmed.

## 4) The 1‑day POC (concrete)

- Inputs:
  - Minimal tenant context (tenant_id)
  - Minimal auth context (actor_id / role)
- Outputs:
  - A working demo proving the primitive works in our environment
- Minimal endpoints:
  - TODO: list the 1–3 endpoints we’d stand up (or proxy) for the POC
- Minimal UI:
  - TODO: the smallest UI surface we need to prove it (or an embedded admin page)
- “Done when” checklist:
  - [ ] We can run it locally (or in a sandbox)
  - [ ] We can connect it to our auth/tenant boundary (even if hacked)
  - [ ] We can demonstrate one real workflow using it

## 5) The 1‑week integration (concrete)

- Data model mapping:
  - TODO: identify the 2–5 core tables/objects we need to map
- Auth model (tenant boundaries):
  - TODO: enforce tenant scoping explicitly (no “trust the UI”)
- RBAC / permissions hooks:
  - TODO: define role gates for the riskiest actions
- Audit log hooks:
  - TODO: log all write actions (“who did what, when, to what”)
- Run logs / retries (if async):
  - TODO: define a `runs` concept for async actions (status, error, retry)
- Observability:
  - TODO: minimal metrics + error reporting

## 6) Extension points (how we customize)

- Plugins / hooks:
  - TODO: identify where customization happens (webhooks, plugins, config)
- Where code changes will happen:
  - TODO: list the file/module boundaries we’d fork/extend

## 7) Risk scan (short + honest)

- License risk: {lic_mark} {meta.license} ({bucket})
- Security risk: TODO (review auth boundaries + SSRF/webhooks + secrets handling)
- Maintenance risk: TODO (bus factor + release cadence)
- Scope mismatch risk: TODO (is it overkill vs our thin slice?)
- “Gotchas”: TODO

## 8) Recommendation (one line)

- TODO: Adopt / Pilot / Avoid

## 9) Evidence links

- Repo: {meta.url}
- README (raw): {readme_url}
"""
        )
    )


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate step-by-step OSS deep audit markdown files from GitHub metadata.")
    ap.add_argument("--entries-dir", required=True, help="Directory containing *.json GitHub metadata files.")
    ap.add_argument("--out-dir", required=True, help="Directory to write deep audit markdown files into.")
    ap.add_argument("--repos", required=True, help="Comma-separated list of owner/repo names.")
    ap.add_argument("--license-overrides", default="", help="Optional JSON mapping full_name -> SPDX (or PROPRIETARY/SUL-1.0/BUSL-1.1/ELv2).")
    args = ap.parse_args()

    entries_dir = Path(args.entries_dir)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    overrides: dict[str, str] = {}
    if args.license_overrides:
        ov = Path(args.license_overrides)
        if ov.exists():
            overrides = json.loads(ov.read_text("utf-8"))

    repos = [r.strip() for r in args.repos.split(",") if r.strip()]
    if not repos:
        print("No repos provided.", file=sys.stderr)
        return 2

    written = 0
    for full in repos:
        raw_meta_path = entries_dir / f"{safe_slug(full)}.json"
        raw = json.loads(raw_meta_path.read_text("utf-8"))
        if overrides and full in overrides:
            raw["_license_override"] = overrides[full]
        meta = meta_from_raw(full, raw)
        p = out_dir / f"{safe_slug(full)}.md"
        p.write_text(md(meta), encoding="utf-8")
        written += 1

    print(f"Generated {written} deep audit files in {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
