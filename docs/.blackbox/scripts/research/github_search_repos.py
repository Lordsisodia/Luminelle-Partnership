#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import socket
import time
import urllib.parse
import urllib.request
from urllib.error import HTTPError, URLError
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


COPyleft = {"GPL-2.0", "GPL-3.0", "AGPL-3.0", "LGPL-2.1", "LGPL-3.0"}
PERMISSIVE = {"MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "0BSD", "MPL-2.0"}


@dataclass(frozen=True)
class Repo:
    full_name: str
    html_url: str
    description: str
    stars: int
    language: str
    updated_at: str
    license_spdx: str


def fetch_json(url: str, token: str | None, timeout: int) -> dict[str, Any]:
    headers = {
        "User-Agent": "lumelle-docs-blackbox-research",
        "Accept": "application/vnd.github+json",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8", errors="replace")
            return json.loads(raw)
    except HTTPError as e:
        # Handle GitHub API rate limiting gracefully by returning a structured error.
        try:
            body = e.read().decode("utf-8", errors="replace")
        except Exception:
            body = ""
        return {
            "error": {
                "kind": "http",
                "http_status": e.code,
                "message": str(e),
                "url": url,
                "rate_limit_remaining": e.headers.get("X-RateLimit-Remaining", ""),
                "rate_limit_reset": e.headers.get("X-RateLimit-Reset", ""),
                "body": body[:1000],
            }
        }
    except (URLError, socket.timeout, TimeoutError) as e:
        # Transient network failure; caller may retry / continue.
        return {
            "error": {
                "kind": "network",
                "http_status": None,
                "message": str(e),
                "url": url,
            }
        }
    except Exception as e:
        # Unknown failure (JSON decode, SSL issues, etc). Treat as non-fatal unless caller decides otherwise.
        return {
            "error": {
                "kind": "unknown",
                "http_status": None,
                "message": str(e),
                "url": url,
            }
        }


def parse_repo(item: dict[str, Any]) -> Repo:
    lic = "UNKNOWN"
    if item.get("license"):
        lic = item["license"].get("spdx_id") or item["license"].get("key") or "UNKNOWN"
    return Repo(
        full_name=item.get("full_name") or "",
        html_url=item.get("html_url") or "",
        description=(item.get("description") or "").strip(),
        stars=int(item.get("stargazers_count") or 0),
        language=(item.get("language") or "N/A").strip(),
        updated_at=item.get("updated_at") or "",
        license_spdx=lic,
    )


def license_bucket(spdx: str) -> str:
    if not spdx or spdx in {"NOASSERTION", "NONE", "UNKNOWN"}:
        return "verify"
    if spdx in COPyleft:
        return "flagged"
    if spdx in PERMISSIVE:
        return "safe"
    return "verify"


def parse_dt(s: str) -> datetime | None:
    if not s:
        return None
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00"))
    except Exception:
        return None


def recency_score(updated_at: str) -> int:
    dt = parse_dt(updated_at)
    if not dt:
        return 0
    days = (datetime.now(timezone.utc) - dt).days
    if days <= 30:
        return 3
    if days <= 180:
        return 2
    if days <= 365:
        return 1
    return 0


def integration_score(repo: Repo) -> int:
    # Very rough “<1 week integration” proxy:
    score = 0
    if repo.language in {"TypeScript", "JavaScript"}:
        score += 3
    elif repo.language in {"Python", "Go"}:
        score += 2
    else:
        score += 1
    score += recency_score(repo.updated_at)
    if repo.stars >= 10000:
        score += 3
    elif repo.stars >= 2000:
        score += 2
    elif repo.stars >= 500:
        score += 1
    if license_bucket(repo.license_spdx) == "safe":
        score += 2
    elif license_bucket(repo.license_spdx) == "verify":
        score += 1
    return score


def load_query_groups_from_markdown(path: Path) -> list[tuple[str, list[str]]]:
    """
    Parse a lightweight query bank markdown file.

    Supported format:
    - `## <Group Name>` headings define groups
    - `- <query string>` bullet lines define queries
    - "Topics to browse" style bullets with comma-separated backticked tokens
      are converted into GitHub search queries `topic:<token>`
    """

    groups: list[tuple[str, list[str]]] = []
    current_group = "Ungrouped"
    current_queries: list[str] = []

    def flush() -> None:
        nonlocal current_group, current_queries
        if current_queries:
            groups.append((current_group, current_queries))
        current_queries = []

    for raw_line in path.read_text("utf-8", errors="replace").splitlines():
        line = raw_line.strip()
        if not line:
            continue
        if line.startswith("## "):
            flush()
            current_group = line.removeprefix("## ").strip() or "Ungrouped"
            continue
        if not line.startswith("- "):
            continue
        item = line.removeprefix("- ").strip()
        if not item:
            continue

        # If it's a "topic list" style item like: `ecommerce`, `shopify`, ...
        # convert to topic:<token> queries.
        if "`" in item and "," in item:
            cleaned = item.replace("`", "").strip()
            tokens = [t.strip() for t in cleaned.split(",") if t.strip()]
            if len(tokens) >= 2 and all(" " not in t for t in tokens):
                for t in tokens:
                    current_queries.append(f"topic:{t}")
                continue

        # Normal query line
        current_queries.append(item.strip("`"))

    flush()
    # Safety: never return empty groups
    return [(g, qs) for (g, qs) in groups if qs]


def main() -> int:
    ap = argparse.ArgumentParser(description="Live GitHub repo search (no cloning), emit a markdown report.")
    ap.add_argument("--out", required=True, help="Write markdown report here.")
    ap.add_argument("--token", default="", help="GitHub token (optional; increases rate limits).")
    ap.add_argument(
        "--title",
        default="Live GitHub Research — OSS Discovery",
        help="Markdown report title (H1).",
    )
    ap.add_argument("--min-stars", type=int, default=50, help="Append GitHub qualifier stars:>=N unless already present.")
    ap.add_argument(
        "--include-forks",
        action="store_true",
        help="Include forked repos in results (default excludes forks via fork:false).",
    )
    ap.add_argument(
        "--include-archived",
        action="store_true",
        help="Include archived repos in results (default excludes archived via archived:false).",
    )
    ap.add_argument(
        "--exclude-keyword",
        action="append",
        default=[],
        help="Exclude repos if keyword appears in name/description (repeatable).",
    )
    ap.add_argument(
        "--exclude-regex",
        default="",
        help="Exclude repos if this regex matches name/description (case-insensitive).",
    )
    ap.add_argument(
        "--queries-md",
        default="",
        help="Optional markdown query bank (## group headings + - bullets). If omitted, uses built-in query groups.",
    )
    ap.add_argument(
        "--out-repos",
        default="",
        help="Optional path to write a de-duped repo list (owner/repo per line), suitable for fetch_github_repos.py.",
    )
    ap.add_argument(
        "--out-search-json",
        default="",
        help="Optional path to write a machine-readable dump of de-duped repos from the GitHub Search API.",
    )
    ap.add_argument("--timeout", type=int, default=25, help="HTTP timeout seconds.")
    ap.add_argument("--per-query", type=int, default=12, help="Repos per query group.")
    ap.add_argument(
        "--max-queries-per-group",
        type=int,
        default=0,
        help="Limit queries per group (0 = no limit). Useful to avoid rate limits when using large query banks.",
    )
    ap.add_argument(
        "--max-total-queries",
        type=int,
        default=0,
        help="Hard cap on total queries across all groups (0 = no cap).",
    )
    ap.add_argument("--sleep-ms", type=int, default=850, help="Delay between API calls.")
    args = ap.parse_args()

    token = args.token.strip() or os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN") or None

    exclude_keywords = [k.strip().lower() for k in (args.exclude_keyword or []) if k.strip()]
    exclude_re: re.Pattern[str] | None = None
    if args.exclude_regex.strip():
        exclude_re = re.compile(args.exclude_regex.strip(), flags=re.IGNORECASE)

    def is_excluded(repo: Repo) -> tuple[bool, str]:
        blob = f"{repo.full_name} {repo.description}".lower()
        for k in exclude_keywords:
            if k and k in blob:
                return True, f"keyword:{k}"
        if exclude_re and exclude_re.search(f"{repo.full_name} {repo.description}"):
            return True, "regex"
        return False, ""

    def apply_qualifiers(q: str) -> str:
        out = q.strip()
        if args.min_stars and args.min_stars > 0 and "stars:" not in out:
            out = f"{out} stars:>={args.min_stars}"
        if not args.include_forks and "fork:" not in out:
            out = f"{out} fork:false"
        if not args.include_archived and "archived:" not in out:
            out = f"{out} archived:false"
        return out.strip()

    query_groups: list[tuple[str, list[str]]]
    if args.queries_md.strip():
        query_groups = load_query_groups_from_markdown(Path(args.queries_md))
        if not query_groups:
            raise SystemExit(f"No queries found in: {args.queries_md}")
    else:
        query_groups = [
            (
                "Returns / Exchanges / RMA",
                [
                    "rma returns management open source",
                    "returns portal ecommerce open source",
                    "reverse logistics returns open source",
                ],
            ),
            (
                "Shipping / Labels / Tracking",
                [
                    "shipping label api open source",
                    "tracking api open source",
                    "carrier rate shipping api open source",
                ],
            ),
            (
                "Helpdesk / Support / Inbox",
                [
                    "helpdesk open source ticketing",
                    "customer support ticketing open source",
                    "shared inbox open source helpdesk",
                ],
            ),
            (
                "Automation / Integrations (Zapier-like)",
                [
                    "workflow automation open source",
                    "integration platform open source workflows",
                    "webhook automation open source",
                ],
            ),
            (
                "Admin dashboards / internal tools",
                [
                    "admin dashboard react open source",
                    "internal tools builder open source",
                    "admin panel framework react typescript",
                ],
            ),
        ]

    if args.max_queries_per_group and args.max_queries_per_group > 0:
        query_groups = [(g, qs[: args.max_queries_per_group]) for (g, qs) in query_groups if qs]

    if args.max_total_queries and args.max_total_queries > 0:
        clipped: list[tuple[str, list[str]]] = []
        remaining = args.max_total_queries
        for g, qs in query_groups:
            if remaining <= 0:
                break
            take = qs[:remaining]
            if take:
                clipped.append((g, take))
                remaining -= len(take)
        query_groups = clipped

    dedup: dict[str, Repo] = {}
    hits_by_group: dict[str, list[Repo]] = {}
    raw_queries: list[str] = []
    excluded_count = 0
    excluded_samples: dict[str, int] = {}
    nonfatal_errors: list[dict[str, Any]] = []

    for group, queries in query_groups:
        group_dedup: dict[str, Repo] = {}
        for q in queries:
            qualified = apply_qualifiers(q)
            raw_queries.append(qualified)
            qp = urllib.parse.quote(qualified)
            url = f"https://api.github.com/search/repositories?q={qp}&sort=stars&order=desc&per_page={args.per_query}"
            data: dict[str, Any] | None = None
            # Retry once for transient failures (timeouts, 5xx, etc) with a longer timeout.
            for attempt in range(2):
                timeout = args.timeout if attempt == 0 else max(args.timeout, 60)
                data = fetch_json(url, token=token, timeout=timeout)
                if "error" not in data:
                    break
                err = data.get("error") or {}
                http_status = err.get("http_status")
                if http_status in {403, 429}:
                    # Rate limiting / blocked; handle below (fatal).
                    break
                # Transient error; sleep briefly and retry once.
                if attempt == 0:
                    time.sleep(1.25)
            if not data:
                continue
            if "error" in data:
                err = data.get("error") or {}
                http_status = err.get("http_status")
                if http_status in {403, 429}:
                    # Stop early; we'll emit a report with the error and instructions.
                    out_lines: list[str] = []
                    out_lines.append("---")
                    out_lines.append("status: blocked")
                    out_lines.append(f"last_reviewed: {datetime.now(timezone.utc).strftime('%Y-%m-%d')}")
                    out_lines.append("owner: agent-zero")
                    out_lines.append("---")
                    out_lines.append("")
                    out_lines.append(f"# {args.title}")
                    out_lines.append("")
                    if http_status == 429:
                        out_lines.append("This run was **blocked by GitHub API rate limiting** (HTTP 429).")
                    else:
                        out_lines.append("This run was **blocked by GitHub API rate limiting** (HTTP 403).")
                    out_lines.append("")
                    out_lines.append("## ✅ What to do next (fast)")
                    out_lines.append("")
                    out_lines.append("Provide a GitHub token so we can continue live repo research without rate limit blocks.")
                    out_lines.append("")
                    out_lines.append("### Option A: one-off (recommended)")
                    out_lines.append("")
                    out_lines.append("```bash")
                    out_lines.append("export GITHUB_TOKEN=\"<your_token_here>\"")
                    out_lines.append("python3 .blackbox/scripts/research/github_search_repos.py \\")
                    out_lines.append("  --out .blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/live-github-research-tranche-002.md \\")
                    out_lines.append("  --token \"$GITHUB_TOKEN\"")
                    out_lines.append("```")
                    out_lines.append("")
                    out_lines.append("### Option B: pass token inline")
                    out_lines.append("")
                    out_lines.append("```bash")
                    out_lines.append("python3 .blackbox/scripts/research/github_search_repos.py \\")
                    out_lines.append("  --out .blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/live-github-research-tranche-002.md \\")
                    out_lines.append("  --token \"<your_token_here>\"")
                    out_lines.append("```")
                    out_lines.append("")
                    out_lines.append("## 🔎 Error details (for debugging)")
                    out_lines.append("")
                    out_lines.append(f"- URL: `{err.get('url','')}`")
                    out_lines.append(f"- HTTP: `{err.get('http_status','')}`")
                    out_lines.append(f"- Message: `{err.get('message','')}`")
                    if err.get("rate_limit_remaining") != "":
                        out_lines.append(f"- X-RateLimit-Remaining: `{err.get('rate_limit_remaining')}`")
                    if err.get("rate_limit_reset") != "":
                        out_lines.append(f"- X-RateLimit-Reset: `{err.get('rate_limit_reset')}`")
                    Path(args.out).write_text("\n".join(out_lines) + "\n", encoding="utf-8")
                    print(f"Wrote (blocked): {args.out}")
                    if args.out_search_json.strip():
                        out_search = Path(args.out_search_json)
                        out_search.parent.mkdir(parents=True, exist_ok=True)
                        payload = {
                            "generated_at_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                            "blocked": True,
                            "blocked_reason": "github_search_rate_limit",
                            "count": 0,
                            "queries_used": raw_queries,
                            "repos": [],
                        }
                        out_search.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
                        print(f"Wrote search JSON (blocked): {out_search}")
                    return 0

                # Non-fatal error: record and continue with remaining queries.
                nonfatal_errors.append(
                    {
                        "group": group,
                        "query": qualified,
                        "kind": err.get("kind") or "error",
                        "http_status": http_status,
                        "message": err.get("message") or "",
                        "url": err.get("url") or url,
                    }
                )
                time.sleep(args.sleep_ms / 1000.0)
                continue
            items = data.get("items") or []
            for item in items:
                r = parse_repo(item)
                if not r.full_name:
                    continue
                excluded, reason = is_excluded(r)
                if excluded:
                    excluded_count += 1
                    if reason:
                        excluded_samples[reason] = excluded_samples.get(reason, 0) + 1
                    continue
                # Global de-dupe across all queries by full_name; keep max stars version
                prev = dedup.get(r.full_name)
                if not prev or r.stars > prev.stars:
                    dedup[r.full_name] = r

                # Track within-group hits for reporting (separate de-dupe)
                prev_g = group_dedup.get(r.full_name)
                if not prev_g or r.stars > prev_g.stars:
                    group_dedup[r.full_name] = r
            time.sleep(args.sleep_ms / 1000.0)

        hits_by_group[group] = sorted(group_dedup.values(), key=lambda r: r.stars, reverse=True)[: args.per_query]

    # Build “<1 week integration” shortlist across all results
    all_repos = sorted(dedup.values(), key=lambda r: (integration_score(r), r.stars), reverse=True)
    shortlist = all_repos[:25]

    def md_escape(s: str) -> str:
        return (s or "").replace("\n", " ").replace("|", " / ").strip()

    out_lines: list[str] = []
    out_lines.append("---")
    out_lines.append("status: draft")
    out_lines.append(f"last_reviewed: {datetime.now(timezone.utc).strftime('%Y-%m-%d')}")
    out_lines.append("owner: agent-zero")
    out_lines.append(f"generated_at_utc: {datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}")
    out_lines.append(f"total_unique_repos: {len(dedup)}")
    out_lines.append(f"min_stars: {args.min_stars}")
    out_lines.append(f"include_forks: {str(args.include_forks).lower()}")
    out_lines.append(f"include_archived: {str(args.include_archived).lower()}")
    out_lines.append(f"excluded_results_count: {excluded_count}")
    out_lines.append(f"nonfatal_query_errors_count: {len(nonfatal_errors)}")
    if exclude_keywords:
        out_lines.append(f"exclude_keywords: {', '.join(exclude_keywords[:25])}")
    if args.exclude_regex.strip():
        out_lines.append(f"exclude_regex: {args.exclude_regex.strip()}")
    out_lines.append("---")
    out_lines.append("")
    out_lines.append(f"# {args.title}")
    out_lines.append("")
    out_lines.append("This tranche is generated from live GitHub search queries (sorted by stars).")
    out_lines.append("Treat license values as **best-effort**; confirm in each repo before adoption.")
    out_lines.append("")
    out_lines.append("## 🔎 Search queries used")
    out_lines.append("")
    for q in raw_queries:
        out_lines.append(f"- {q}")
    out_lines.append("")
    if nonfatal_errors:
        out_lines.append("## ⚠️ Non-fatal query errors (retried / skipped)")
        out_lines.append("")
        out_lines.append("Some queries failed due to transient network/API issues. The run continued with remaining queries.")
        out_lines.append("")
        out_lines.append("| Group | Query | Kind | HTTP | Message |")
        out_lines.append("|---|---|---|---:|---|")
        for e in nonfatal_errors[:25]:
            msg = md_escape(str(e.get("message") or ""))[:180]
            out_lines.append(
                f"| {md_escape(str(e.get('group') or ''))} | {md_escape(str(e.get('query') or ''))} | {md_escape(str(e.get('kind') or ''))} | {md_escape(str(e.get('http_status') or ''))} | {msg} |"
            )
        if len(nonfatal_errors) > 25:
            out_lines.append("")
            out_lines.append(f"_({len(nonfatal_errors) - 25} more errors omitted)_")
        out_lines.append("")
    out_lines.append("## ⚡ Top 25 “<1 week integration” candidates (heuristic)")
    out_lines.append("")
    out_lines.append("| Rank | Repo | Stars | Lang | License | Bucket | Why it’s here |")
    out_lines.append("|---:|---|---:|---|---|---|---|")
    for i, r in enumerate(shortlist, start=1):
        bucket = license_bucket(r.license_spdx)
        why = f"score={integration_score(r)} (lang+recency+stars+license)"
        out_lines.append(
            f"| {i} | {md_escape(r.full_name)} — {r.html_url} | {r.stars} | {md_escape(r.language)} | {md_escape(r.license_spdx)} | {bucket} | {why} |"
        )
    out_lines.append("")

    for group, repos in hits_by_group.items():
        out_lines.append(f"## 📚 {group} (top by stars)")
        out_lines.append("")
        out_lines.append("| Repo | Stars | Lang | License | Bucket | Updated | Description |")
        out_lines.append("|---|---:|---|---|---|---|---|")
        for r in repos:
            bucket = license_bucket(r.license_spdx)
            out_lines.append(
                f"| {md_escape(r.full_name)} — {r.html_url} | {r.stars} | {md_escape(r.language)} | {md_escape(r.license_spdx)} | {bucket} | {md_escape(r.updated_at)} | {md_escape(r.description)} |"
            )
        out_lines.append("")

    Path(args.out).write_text("\n".join(out_lines) + "\n", encoding="utf-8")
    print(f"Wrote: {args.out}")
    print(f"Total unique repos captured: {len(dedup)}")

    if args.out_search_json.strip():
        out_search = Path(args.out_search_json)
        out_search.parent.mkdir(parents=True, exist_ok=True)
        repos_sorted = sorted(dedup.values(), key=lambda r: (integration_score(r), r.stars), reverse=True)
        payload = {
            "generated_at_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "title": args.title,
            "min_stars": args.min_stars,
            "include_forks": args.include_forks,
            "include_archived": args.include_archived,
            "exclude_keywords": exclude_keywords,
            "exclude_regex": (args.exclude_regex.strip() or None),
            "excluded_results_count": excluded_count,
            "queries_used": raw_queries,
            "count": len(repos_sorted),
            "repos": [
                {
                    "full_name": r.full_name,
                    "url": r.html_url,
                    "description": r.description,
                    "stars": r.stars,
                    "language": r.language,
                    "updated_at": r.updated_at,
                    "license_spdx": r.license_spdx,
                    "license_bucket": license_bucket(r.license_spdx),
                    "integration_score": integration_score(r),
                }
                for r in repos_sorted
            ],
        }
        out_search.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        print(f"Wrote search JSON: {out_search}")

    if args.out_repos.strip():
        out_repos = Path(args.out_repos)
        out_repos.parent.mkdir(parents=True, exist_ok=True)
        ordered = sorted(dedup.values(), key=lambda r: (integration_score(r), r.stars), reverse=True)
        lines: list[str] = []
        lines.append(f"# Generated by github_search_repos.py at {datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}")
        if args.queries_md.strip():
            lines.append(f"# Query bank: {args.queries_md}")
        for r in ordered:
            lines.append(r.full_name)
        out_repos.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Wrote repo list: {out_repos}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
