#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any


GITHUB_API = "https://api.github.com"


@dataclass(frozen=True)
class RepoSpec:
    full_name: str  # owner/repo


def parse_repo_line(line: str) -> str | None:
    raw = line.strip()
    if not raw or raw.startswith("#"):
        return None
    raw = raw.split()[0].strip()
    if raw.startswith("https://github.com/"):
        raw = raw.removeprefix("https://github.com/").strip("/")
    if re.match(r"^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$", raw):
        return raw
    return None


def http_get_json(url: str, token: str | None) -> dict[str, Any]:
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "lumelle-docs-blackbox-research",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = resp.read()
    return json.loads(body.decode("utf-8"))


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "entry"


def repo_to_md(repo: dict[str, Any]) -> str:
    name = repo.get("name", "")
    full_name = repo.get("full_name", "")
    html_url = repo.get("html_url", "")
    desc = (repo.get("description") or "").strip()
    stars = repo.get("stargazers_count")
    forks = repo.get("forks_count")
    updated_at = repo.get("updated_at", "")
    topics = repo.get("topics") or []
    language = repo.get("language") or ""
    license_spdx = None
    if repo.get("license"):
        license_spdx = repo["license"].get("spdx_id") or repo["license"].get("key")

    lines: list[str] = []
    lines.append("# OSS Project Entry")
    lines.append("")
    lines.append("## Identity")
    lines.append("")
    lines.append(f"- Name: {name}")
    lines.append(f"- Repo: {html_url}")
    lines.append(f"- Full name: {full_name}")
    lines.append(f"- License: {license_spdx or 'UNKNOWN'}")
    lines.append(f"- Stars (approx): {stars}")
    lines.append(f"- Forks (approx): {forks}")
    lines.append(f"- Primary language: {language or 'N/A'}")
    lines.append(f"- Last updated: {updated_at}")
    if topics:
        lines.append(f"- Topics: {', '.join(topics[:25])}")
    lines.append("")

    lines.append("## What it gives us (plain English)")
    lines.append("")
    lines.append("- …")
    lines.append("")

    lines.append("## What feature(s) it maps to")
    lines.append("")
    lines.append("- …")
    lines.append("")

    lines.append("## Integration notes (vibe-coding lens)")
    lines.append("")
    lines.append("- Stack fit (React/TS, API, DB, auth):")
    lines.append("- Setup friction (self-host? SaaS? Docker?):")
    lines.append("- Data model alignment:")
    lines.append("")

    lines.append("## Adoption path")
    lines.append("")
    lines.append("- 1 day POC:")
    lines.append("- 1 week integration:")
    lines.append("- 1 month hardening:")
    lines.append("")

    lines.append("## Risks")
    lines.append("")
    lines.append("- Maintenance risk:")
    lines.append("- Security risk:")
    lines.append("- Scope mismatch:")
    lines.append("- License risk:")
    lines.append("")

    lines.append("## Sources")
    lines.append("")
    lines.append(f"- {html_url}")
    lines.append("")

    lines.append("## Score (0–100) + reasoning")
    lines.append("")
    lines.append("- Score: …")
    lines.append("- Why: …")
    lines.append("")

    if desc:
        lines.append("---")
        lines.append("")
        lines.append("## Repo description (from GitHub)")
        lines.append("")
        lines.append(desc)
        lines.append("")

    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(description="Fetch GitHub repo metadata and generate OSS entry markdown files.")
    ap.add_argument("--input", required=True, help="Path to a text file containing owner/repo per line.")
    ap.add_argument("--out-dir", required=True, help="Directory to write entry markdown files into.")
    ap.add_argument("--sleep-ms", type=int, default=350, help="Delay between API calls (rate-limit friendly).")
    ap.add_argument("--dump-json", action="store_true", help="Also dump raw JSON next to each entry.")
    args = ap.parse_args()

    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")

    in_path = Path(args.input)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    specs: list[RepoSpec] = []
    for line in in_path.read_text("utf-8", errors="replace").splitlines():
        maybe = parse_repo_line(line)
        if maybe:
            specs.append(RepoSpec(full_name=maybe))

    if not specs:
        print("No repos found in input file (expected owner/repo per line).", file=sys.stderr)
        return 2

    fetched = 0
    for spec in specs:
        url = f"{GITHUB_API}/repos/{spec.full_name}"
        try:
            repo = http_get_json(url, token)
        except Exception as e:  # noqa: BLE001
            print(f"WARN: failed to fetch {spec.full_name}: {e}", file=sys.stderr)
            continue

        slug = safe_slug(spec.full_name)
        md_path = out_dir / f"{slug}.md"
        md_path.write_text(repo_to_md(repo), encoding="utf-8")

        if args.dump_json:
            (out_dir / f"{slug}.json").write_text(json.dumps(repo, indent=2), encoding="utf-8")

        fetched += 1
        time.sleep(args.sleep_ms / 1000.0)

    print(f"Generated {fetched} OSS entry files in {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

