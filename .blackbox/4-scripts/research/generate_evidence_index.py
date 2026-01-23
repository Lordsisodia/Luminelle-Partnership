#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


LINK_RE = re.compile(r"\[([^\]]+)\]\((https?://[^)]+)\)")
URL_RE = re.compile(r"(https?://[^\s)]+)")
FENCE_RE = re.compile(r"```.*?```", re.DOTALL)


@dataclass(frozen=True)
class FeatureCard:
    name: str
    target_user: str
    fastest_path: str
    competitors: list[str]
    oss: list[str]
    evidence: list[str]
    total_score: int | None


@dataclass(frozen=True)
class OssCard:
    full_name: str
    repo_url: str
    license_bucket: str
    total_score: int | None


def read_text(p: Path) -> str:
    return p.read_text("utf-8", errors="replace")


def clean_cell(s: str) -> str:
    s = (s or "").strip()
    s = s.replace("|", " / ")
    s = re.sub(r"\s{2,}", " ", s)
    return s


def extract_urls(text: str) -> list[str]:
    urls: list[str] = []
    for _, u in LINK_RE.findall(text):
        urls.append(u.strip())
    for u in URL_RE.findall(text):
        urls.append(u.strip())
    # De-dupe preserve order
    seen: set[str] = set()
    out: list[str] = []
    for u in urls:
        if u in seen:
            continue
        seen.add(u)
        out.append(u)
    return out


def strip_code_fences(md: str) -> str:
    # Scorecard templates include large fenced examples that can confuse parsing.
    # Remove them so we only parse "real" filled content.
    return FENCE_RE.sub("", md)


def extract_step_plan_paths_from_sources(sources_md: str) -> dict[str, str]:
    # Extract lines like:
    # - Step 01 plan: `<path>`
    out: dict[str, str] = {}
    for ln in sources_md.splitlines():
        m = re.match(r"^\-\s*Step\s+0?([1-4])\s+plan:\s*`([^`]+)`\s*$", ln.strip())
        if m:
            out[f"step-0{m.group(1)}"] = m.group(2)
    return out


def parse_top_list(md: str, section_markers: list[str], limit: int = 10) -> list[str]:
    """
    Extract a numbered list under a section header. Very forgiving:
    - finds the first matching marker line
    - captures lines like "1) Foo — ..." or "1. Foo — ..."
    """
    text = strip_code_fences(md)
    lines = text.splitlines()
    start = -1
    for i, ln in enumerate(lines):
        if any(m in ln for m in section_markers):
            start = i
            break
    if start == -1:
        return []

    out: list[str] = []
    for ln in lines[start + 1 :]:
        s = ln.strip()
        if not s:
            continue
        if s.startswith("## "):
            break
        m = re.match(r"^(\d+)[\)\.]\s+(.*)$", s)
        if not m:
            continue
        item = m.group(2).strip()
        if " — " in item:
            item = item.split(" — ", 1)[0].strip()
        out.append(item)
        if len(out) >= limit:
            break
    return out


def parse_total_score(block: str) -> int | None:
    # Accept: "Total (/50): 42" or "Total (/50): **42**"
    m = re.search(r"Total\s*\(/50\)\s*:\s*\**\s*([0-9]{1,2})\s*\**", block)
    if not m:
        return None
    try:
        return int(m.group(1))
    except Exception:
        return None


def section_list(block: str, header_line: str) -> list[str]:
    # Pull list items under a "- <header_line>:" row until next "- " line that looks like a new field.
    # We intentionally keep this forgiving; agents may format differently.
    # Example target:
    # - OSS accelerators (links):
    #   - https://github.com/foo/bar
    pattern = re.compile(
        rf"(?ms)^\-\s*{re.escape(header_line)}\s*\n(?P<body>(?:^\s*\-\s+.*\n)+)"
    )
    m = pattern.search(block)
    if not m:
        return []
    body = m.group("body")
    items: list[str] = []
    for ln in body.splitlines():
        ln = ln.strip()
        if not ln.startswith("-"):
            continue
        ln = ln.lstrip("-").strip()
        if not ln:
            continue
        items.append(ln)
    return items


def parse_feature_scorecards(md: str) -> list[FeatureCard]:
    md = strip_code_fences(md)
    # Split on headings: "### <Feature name>"
    cards: list[FeatureCard] = []
    parts = re.split(r"(?m)^###\s+", md)
    if len(parts) <= 1:
        return cards

    for part in parts[1:]:
        name = part.splitlines()[0].strip()
        # Ignore placeholder/template headings like "### <Feature name>"
        if "<" in name or ">" in name:
            continue
        block = "### " + part

        def field_value(label: str) -> str:
            m = re.search(rf"(?m)^\-\s*{re.escape(label)}\s*(.*)$", block)
            if not m:
                return ""
            return m.group(1).strip().lstrip(":").strip()

        target_user = field_value("Target user")
        fastest_path = field_value("Fastest path")

        competitors_raw = section_list(block, "Competitors proving demand (links):")
        oss_raw = section_list(block, "OSS accelerators (links):")
        evidence_raw = section_list(block, "Evidence links (2–5):")

        # Derive readable tokens for competitor/tool fields: keep first chunk before whitespace if it's a URL.
        competitors = []
        for v in competitors_raw:
            if v.startswith("http"):
                competitors.append(v)
            else:
                competitors.append(v)

        oss = []
        for v in oss_raw:
            oss.append(v)

        evidence = []
        for v in evidence_raw:
            evidence.append(v)

        total = parse_total_score(block)
        cards.append(
            FeatureCard(
                name=name,
                target_user=target_user or "…",
                fastest_path=fastest_path or "build / integrate / buy",
                competitors=competitors,
                oss=oss,
                evidence=evidence,
                total_score=total,
            )
        )

    # Prefer score-based ordering when present.
    with_scores = [c for c in cards if c.total_score is not None]
    without_scores = [c for c in cards if c.total_score is None]
    with_scores.sort(key=lambda c: c.total_score or 0, reverse=True)
    return with_scores + without_scores


def parse_oss_scorecards(md: str) -> list[OssCard]:
    md = strip_code_fences(md)
    cards: list[OssCard] = []
    parts = re.split(r"(?m)^###\s+", md)
    if len(parts) <= 1:
        return cards

    for part in parts[1:]:
        title = part.splitlines()[0].strip()
        # Ignore placeholder/template headings like "### <owner>/<repo>"
        if "<" in title or ">" in title:
            continue
        block = "### " + part
        repo_url = ""
        license_bucket = ""

        m = re.search(r"(?m)^\-\s*Repo URL:\s*(.*)$", block)
        if m:
            repo_url = m.group(1).strip()

        m = re.search(r"(?m)^\-\s*License:\s*(.*)$", block)
        if m:
            license_bucket = m.group(1).strip()

        total = parse_total_score(block)
        cards.append(OssCard(full_name=title, repo_url=repo_url, license_bucket=license_bucket, total_score=total))

    with_scores = [c for c in cards if c.total_score is not None]
    without_scores = [c for c in cards if c.total_score is None]
    with_scores.sort(key=lambda c: c.total_score or 0, reverse=True)
    return with_scores + without_scores


def format_refs(values: list[str], limit: int) -> str:
    vals = [v.strip() for v in values if v.strip()]
    vals = vals[:limit]
    if not vals:
        return "…"
    # Prefer turning URLs into short labels where possible.
    out: list[str] = []
    for v in vals:
        if v.startswith("http"):
            out.append(v)
        else:
            out.append(v)
    return clean_cell(", ".join(out))


def main() -> int:
    ap = argparse.ArgumentParser(description="Generate a browse-friendly evidence index crosswalk for a synthesis plan.")
    ap.add_argument("--synth-plan", required=True, help="Synthesis plan folder (docs/.blackbox/.plans/<run>).")
    ap.add_argument("--top", type=int, default=10, help="How many rows to generate.")
    args = ap.parse_args()

    plan = Path(args.synth_plan)
    artifacts = plan / "artifacts"
    out_path = artifacts / "evidence-index.md"

    features_path = artifacts / "features-ranked.md"
    oss_path = artifacts / "oss-ranked.md"
    sources_path = artifacts / "sources.md"

    features_md = read_text(features_path) if features_path.exists() else ""
    oss_md = read_text(oss_path) if oss_path.exists() else ""
    sources_md = read_text(sources_path) if sources_path.exists() else ""

    features = parse_feature_scorecards(features_md)
    oss = parse_oss_scorecards(oss_md)

    # Optional fallback competitor lists, discovered from step plan folders.
    step_plans = extract_step_plan_paths_from_sources(sources_md)
    step2_plan = Path(step_plans.get("step-02", "")) if step_plans.get("step-02") else None
    step3_plan = Path(step_plans.get("step-03", "")) if step_plans.get("step-03") else None

    top_core_competitors: list[str] = []
    if step2_plan and (step2_plan / "artifacts/summary.md").exists():
        top_core_competitors = parse_top_list(
            read_text(step2_plan / "artifacts/summary.md"),
            section_markers=["Top 10 competitors", "competitors to keep tracking"],
            limit=10,
        )

    top_adjacent_tools: list[str] = []
    if step3_plan and (step3_plan / "artifacts/summary.md").exists():
        top_adjacent_tools = parse_top_list(
            read_text(step3_plan / "artifacts/summary.md"),
            section_markers=["Top 10 adjacent tools", "adjacent tools with transferable patterns"],
            limit=10,
        )

    fallback_competitors = top_core_competitors[:3] or top_adjacent_tools[:3]

    top_n = max(1, args.top)
    features = features[:top_n] if features else []

    lines: list[str] = []
    lines.append("---")
    lines.append("status: draft")
    lines.append("last_reviewed: 2025-12-28")
    lines.append("owner: agent-zero")
    lines.append("---")
    lines.append("")
    lines.append("# Evidence Index (Ranked, Browse-Friendly)")
    lines.append("")
    lines.append("Purpose: make the research corpus easy to browse without hunting through folders.")
    lines.append("")
    lines.append("This is a **crosswalk**:")
    lines.append("- feature idea → competitors proving demand → OSS accelerators → evidence links")
    lines.append("")
    lines.append("## 🔥 Top 10 crosswalk (generated)")
    lines.append("")
    lines.append("| Rank | Feature (short) | Target user | Best competitors (2–3) | Best OSS (1–2) | Fastest path | Evidence links |")
    lines.append("| --- | --- | --- | --- | --- | --- | --- |")

    if not features:
        for i in range(1, top_n + 1):
            lines.append(f"| {i} | … | … | … | … | build / integrate / buy | `artifacts/` |")
    else:
        for i, f in enumerate(features, 1):
            # Best competitors/OSS come from the scorecard lists (when filled).
            competitors = format_refs(f.competitors, 3)
            if competitors == "…" and fallback_competitors:
                competitors = clean_cell(", ".join(fallback_competitors))
            best_oss = format_refs(f.oss, 2)

            # If the feature has no OSS accelerators yet, fall back to top OSS overall (first 2).
            if best_oss == "…" and oss:
                best_oss = clean_cell(", ".join([c.full_name for c in oss[:2] if c.full_name][:2])) or "…"

            evidence = f.evidence[:5] if f.evidence else []
            if not evidence:
                # fallback: point to the scorecard artifact
                evidence = ["`artifacts/features-ranked.md`"]
            evidence_cell = clean_cell(", ".join(evidence))

            lines.append(
                "| "
                + " | ".join(
                    [
                        str(i),
                        clean_cell(f.name),
                        clean_cell(f.target_user),
                        competitors,
                        best_oss,
                        clean_cell(f.fastest_path),
                        evidence_cell,
                    ]
                )
                + " |"
            )

    lines.append("")
    lines.append("## 🧠 Notes / heuristics")
    lines.append("")
    lines.append("- Prefer at least 2 competitor proofs per top feature.")
    lines.append("- Prefer at least 1 OSS accelerator (or clearly state “build”).")
    lines.append("- If OSS is copyleft/unknown/fair-code, mark it clearly.")
    lines.append("")
    lines.append("## 📍 Key artifacts")
    lines.append("")
    lines.append("- Final synthesis: `artifacts/final-synthesis.md`")
    lines.append("- Features ranked: `artifacts/features-ranked.md`")
    lines.append("- OSS ranked: `artifacts/oss-ranked.md`")
    lines.append("- Decision log: `artifacts/open-questions.md`")
    lines.append("- Sources: `artifacts/sources.md`")
    lines.append("")
    lines.append("## 🔧 Regenerate")
    lines.append("")
    lines.append("```bash")
    lines.append("python3 .blackbox/scripts/research/generate_evidence_index.py --synth-plan " + str(plan))
    lines.append("```")

    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
