#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html
import re
from dataclasses import dataclass
from pathlib import Path


TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)
META_DESC_RE = re.compile(
    r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\'][^>]*>',
    re.IGNORECASE | re.DOTALL,
)
OG_DESC_RE = re.compile(
    r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\'](.*?)["\'][^>]*>',
    re.IGNORECASE | re.DOTALL,
)
H_RE = re.compile(r"<h([1-4])[^>]*>(.*?)</h\\1>", re.IGNORECASE | re.DOTALL)
A_RE = re.compile(r'<a\\s+[^>]*href=["\\\']([^"\\\']+)["\\\'][^>]*>(.*?)</a>', re.IGNORECASE | re.DOTALL)


def clean_text(s: str) -> str:
    s = re.sub(r"<[^>]+>", " ", s)
    s = html.unescape(s)
    s = re.sub(r"\\s+", " ", s).strip()
    return s


def safe_slug(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "competitor"


@dataclass(frozen=True)
class Evidence:
    title: str
    description: str
    headings: list[str]
    links: list[tuple[str, str]]


def extract(html_text: str, link_keywords: list[str]) -> Evidence:
    title = ""
    desc = ""

    m = TITLE_RE.search(html_text)
    if m:
        title = clean_text(m.group(1))

    m = META_DESC_RE.search(html_text)
    if m:
        desc = clean_text(m.group(1))
    if not desc:
        m = OG_DESC_RE.search(html_text)
        if m:
            desc = clean_text(m.group(1))

    headings: list[str] = []
    for level, body in H_RE.findall(html_text):
        txt = clean_text(body)
        if not txt:
            continue
        # Keep headings tight; avoid nav spam
        if len(txt) > 140:
            txt = txt[:140].rstrip() + "…"
        headings.append(f"h{level}: {txt}")

    # De-dupe headings preserving order
    seen_h: set[str] = set()
    headings_dedup: list[str] = []
    for h in headings:
        if h in seen_h:
            continue
        seen_h.add(h)
        headings_dedup.append(h)

    links: list[tuple[str, str]] = []
    for href, body in A_RE.findall(html_text):
        href = href.strip()
        if not href or href.startswith(("#", "javascript:", "mailto:")):
            continue
        text = clean_text(body)
        blob = (href + " " + text).lower()
        if not any(k in blob for k in link_keywords):
            continue
        if len(text) > 120:
            text = text[:120].rstrip() + "…"
        links.append((href, text))

    # De-dupe links
    seen_l: set[str] = set()
    links_dedup: list[tuple[str, str]] = []
    for href, text in links:
        key = f"{href}|{text}"
        if key in seen_l:
            continue
        seen_l.add(key)
        links_dedup.append((href, text))

    return Evidence(title=title, description=desc, headings=headings_dedup, links=links_dedup)


def find_latest_snapshot(snapshot_dir: Path, slug: str) -> Path | None:
    stable = snapshot_dir / f"{slug}.html"
    if stable.exists():
        return stable
    candidates = sorted(snapshot_dir.glob(f"*__{slug}.html"))
    if candidates:
        return candidates[-1]
    return None


def find_variant_snapshots(variants_dir: Path, slug: str) -> list[Path]:
    # Variant snapshots may be written as:
    # - <timestamp>__<slug>-pricing.html (legacy/default)
    # - <slug>-pricing.html (stable-names mode)
    candidates = sorted(variants_dir.glob(f"*__{slug}-*.html"))
    candidates += sorted(variants_dir.glob(f"{slug}-*.html"))

    # De-dupe preserving order
    seen: set[str] = set()
    out: list[Path] = []
    for p in candidates:
        if p.name in seen:
            continue
        seen.add(p.name)
        out.append(p)
    return out


def display_path(p: Path) -> str:
    """
    Prefer a path relative to the current working directory when possible.
    Otherwise, fall back to an absolute path.
    """
    try:
        rp = p.resolve()
    except Exception:
        rp = p

    try:
        cwd = Path.cwd().resolve()
        return str(rp.relative_to(cwd))
    except Exception:
        return str(rp)


def main() -> int:
    ap = argparse.ArgumentParser(description="Extract headings + key links from competitor snapshots into an evidence note.")
    ap.add_argument("--plan-id", required=True, help="Plan folder name (for stable paths).")
    ap.add_argument("--name", required=True, help="Competitor name (used for slug).")
    ap.add_argument("--snapshots-dir", required=True, help="Homepage snapshots dir.")
    ap.add_argument("--variants-dir", required=True, help="Variants snapshots dir.")
    ap.add_argument("--out", required=True, help="Write evidence markdown here.")
    ap.add_argument("--max-headings", type=int, default=35, help="Max headings to keep.")
    ap.add_argument("--max-links", type=int, default=35, help="Max links to keep.")
    ap.add_argument("--variant-max-headings", type=int, default=14, help="Max headings per variant snapshot.")
    ap.add_argument("--variant-max-links", type=int, default=14, help="Max links per variant snapshot.")
    ap.add_argument("--variant-limit", type=int, default=8, help="Only extract details for the first N variants.")
    args = ap.parse_args()

    slug = safe_slug(args.name)
    home_dir = Path(args.snapshots_dir)
    variants_dir = Path(args.variants_dir)

    home = find_latest_snapshot(home_dir, slug)
    variants = find_variant_snapshots(variants_dir, slug)

    keywords = [
        "pricing",
        "price",
        "feature",
        "features",
        "docs",
        "documentation",
        "developers",
        "api",
        "platform",
        "workflow",
        "automation",
        "returns",
        "exchange",
        "support",
        "helpdesk",
        "analytics",
        "experiment",
        "flag",
    ]

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)

    lines: list[str] = []
    lines.append(f"# Evidence Extract — {args.name}")
    lines.append("")
    lines.append(f"- slug: `{slug}`")
    lines.append("")

    if home and home.exists():
        html_text = home.read_text("utf-8", errors="replace")
        ev = extract(html_text, link_keywords=keywords)
        lines.append("## Homepage snapshot")
        lines.append("")
        lines.append(f"- file: `{display_path(home)}`")
        if ev.title:
            lines.append(f"- title: {ev.title}")
        if ev.description:
            lines.append(f"- description: {ev.description}")
        lines.append("")
        if ev.headings:
            lines.append("### Headings (signal)")
            lines.append("")
            for h in ev.headings[: args.max_headings]:
                lines.append(f"- {h}")
            lines.append("")
        if ev.links:
            lines.append("### Links (filtered)")
            lines.append("")
            for href, text in ev.links[: args.max_links]:
                label = f" — {text}" if text else ""
                lines.append(f"- {href}{label}")
            lines.append("")
    else:
        lines.append("## Homepage snapshot")
        lines.append("")
        lines.append("- missing snapshot file (blocked/timeout)")
        lines.append("")

    lines.append("## Variant snapshots (pricing/docs/features)")
    lines.append("")
    if not variants:
        lines.append("- none found yet")
    else:
        for v in variants[:25]:
            lines.append(f"- `{display_path(v)}`")
    lines.append("")

    # Extract a small amount of signal from variant snapshots too (often where the real feature list lives).
    if variants:
        lines.append("## Variant details (signal)")
        lines.append("")
        for v in variants[: args.variant_limit]:
            try:
                v_html = v.read_text("utf-8", errors="replace")
            except Exception:
                continue
            v_ev = extract(v_html, link_keywords=keywords)
            lines.append(f"### {v.name}")
            lines.append("")
            lines.append(f"- file: `{display_path(v)}`")
            if v_ev.title:
                lines.append(f"- title: {v_ev.title}")
            if v_ev.description:
                lines.append(f"- description: {v_ev.description}")
            lines.append("")
            if v_ev.headings:
                lines.append("- headings:")
                for h in v_ev.headings[: args.variant_max_headings]:
                    lines.append(f"  - {h}")
                lines.append("")
            if v_ev.links:
                lines.append("- links:")
                for href, text in v_ev.links[: args.variant_max_links]:
                    label = f" — {text}" if text else ""
                    lines.append(f"  - {href}{label}")
                lines.append("")

    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote evidence: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
