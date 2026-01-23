#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import html as _html
import re
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urljoin, urlparse


HREF_RE = re.compile(r'href=["\']([^"\']+)["\']', re.IGNORECASE)
STATIC_EXTENSIONS = {
    ".css",
    ".js",
    ".mjs",
    ".map",
    ".json",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".eot",
    ".pdf",
    ".zip",
    ".mp4",
    ".webm",
    ".mp3",
}


@dataclass(frozen=True)
class Target:
    store: str
    url: str
    niche: str
    snapshot_file: str
    snapshot_path: str
    blocked: str


def read_csv_dicts(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        return [{k: (v or "").strip() for k, v in row.items()} for row in r]


def normalize_href(url: str) -> str:
    u = (url or "").strip()
    if not u:
        return ""
    if u.startswith(("mailto:", "tel:", "javascript:")):
        return ""
    u = _html.unescape(u)
    u = u.replace("\\/", "/")
    u = u.replace("\\u002F", "/").replace("\\u002f", "/")
    u = u.replace("\\u0026", "&").replace("\\u003D", "=").replace("\\u003d", "=")
    u = u.split("#", 1)[0]
    return u


def classify(path: str) -> str:
    p = (path or "").lower()
    if any(x in p for x in ["/products/", "/product/", "/p/"]):
        return "product"
    if any(x in p for x in ["/collections/", "/category/", "/shop/", "/new", "/best", "/bestseller"]):
        return "collection"
    if any(x in p for x in ["/returns", "/return", "/exchanges", "/exchange"]):
        return "returns"
    if any(x in p for x in ["/shipping", "/delivery"]):
        return "shipping"
    if any(x in p for x in ["/size", "/fit", "/size-guide", "/sizing"]):
        return "sizing"
    if any(x in p for x in ["/help", "/support", "/faq", "/contact"]):
        return "support"
    if "/cart" in p or "/checkout" in p or re.search(r"/bag(?:/|\?|$)", p):
        return "cart_checkout"
    return "other"


def extract_candidates(html_text: str, base_url: str, per_kind: int) -> dict[str, list[str]]:
    base = base_url.rstrip("/") + "/"
    base_host = urlparse(base).netloc.lower()
    seen: set[str] = set()
    buckets: dict[str, list[str]] = {k: [] for k in ["product", "collection", "returns", "shipping", "sizing", "support", "cart_checkout", "other"]}

    for href in HREF_RE.findall(html_text):
        href = normalize_href(href)
        if not href:
            continue
        abs_url = urljoin(base, href)
        p = urlparse(abs_url)
        if not p.scheme.startswith("http"):
            continue
        path_lower = (p.path or "").lower()
        if any(path_lower.endswith(ext) for ext in STATIC_EXTENSIONS):
            continue
        if path_lower.startswith("/cdn/") or "/cdn/" in path_lower:
            continue
        if path_lower.startswith("/assets/") or "/assets/" in path_lower:
            continue
        if p.netloc.lower() and p.netloc.lower() != base_host:
            continue
        abs_url = p._replace(fragment="").geturl()
        if abs_url in seen:
            continue
        seen.add(abs_url)
        kind = classify(p.path)
        buckets[kind].append(abs_url)

    # Deterministic: preserve discovery order but cap.
    for k in buckets:
        buckets[k] = buckets[k][:per_kind]
    return buckets


def pick_first(buckets: dict[str, list[str]], kind: str) -> str:
    urls = buckets.get(kind, [])
    return urls[0] if urls else ""


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Build a funnel snapshot seed set from homepage HTML snapshots (top N stores)."
    )
    ap.add_argument("--enriched-csv", required=True, help="adjacent-best-in-class-100.enriched.csv")
    ap.add_argument("--ranked-csv", required=True, help="adjacent-best-in-class-100.ranked.csv (for top-N selection)")
    ap.add_argument("--homepage-snapshots-dir", required=True, help="Directory containing homepage snapshots (*.html).")
    ap.add_argument("--top-n", type=int, default=15, help="Select top N stores from ranked-csv (ignored if --per-niche > 0).")
    ap.add_argument("--per-niche", type=int, default=0, help="If set, select top K stores per niche (based on ranked-csv ordering).")
    ap.add_argument("--max-stores", type=int, default=0, help="Hard cap on total stores selected (0 = no cap).")
    ap.add_argument(
        "--label-prefix",
        default="adjacent",
        help="Prefix for snapshot labels (used in filenames). Example: 'adjacent-top15' or 'adjacent-per-niche'.",
    )
    ap.add_argument("--per-kind", type=int, default=8, help="How many candidate URLs to keep per category.")
    ap.add_argument("--out-seeds", required=True, help="Write snapshot seed list here (txt).")
    ap.add_argument("--out-md", required=True, help="Write markdown summary here.")
    args = ap.parse_args()

    enriched_csv = Path(args.enriched_csv)
    ranked_csv = Path(args.ranked_csv)
    home_dir = Path(args.homepage_snapshots_dir)
    out_seeds = Path(args.out_seeds)
    out_md = Path(args.out_md)

    enriched_rows = read_csv_dicts(enriched_csv)
    by_store: dict[str, dict[str, str]] = {(r.get("store") or "").strip(): r for r in enriched_rows if (r.get("store") or "").strip()}

    ranked_rows = read_csv_dicts(ranked_csv)
    selected: list[str] = []
    if args.per_niche and args.per_niche > 0:
        per_niche_counts: dict[str, int] = {}
        for rr in ranked_rows:
            store = (rr.get("store") or "").strip()
            niche = (rr.get("niche") or "").strip() or "Other"
            if not store:
                continue
            if per_niche_counts.get(niche, 0) >= args.per_niche:
                continue
            per_niche_counts[niche] = per_niche_counts.get(niche, 0) + 1
            selected.append(store)
            if args.max_stores and len(selected) >= args.max_stores:
                break
    else:
        for rr in ranked_rows:
            store = (rr.get("store") or "").strip()
            if not store:
                continue
            selected.append(store)
            if len(selected) >= args.top_n:
                break

    targets: list[Target] = []
    for store in selected:
        r = by_store.get(store, {})
        url = (r.get("url") or "").strip()
        targets.append(
            Target(
                store=store,
                url=url,
                niche=(r.get("niche") or "").strip(),
                snapshot_file=(r.get("snapshot_file") or "").strip(),
                snapshot_path=(r.get("snapshot_path") or "").strip(),
                blocked=(r.get("blocked") or "").strip(),
            )
        )

    seed_lines: list[str] = []
    md_lines: list[str] = []
    md_lines.append("# Funnel Snapshot Seed Set — Adjacent Top Picks")
    md_lines.append("")
    md_lines.append("Goal: generate Tier‑B HTML snapshots beyond homepage (collection/product + policies) for the top adjacent exemplars.")
    md_lines.append("")
    md_lines.append(f"- enriched: `{enriched_csv}`")
    md_lines.append(f"- ranked: `{ranked_csv}`")
    md_lines.append(f"- homepage snapshots: `{home_dir}`")
    md_lines.append(f"- selection mode: per_niche={args.per_niche} top_n={args.top_n} max_stores={args.max_stores or '—'} label_prefix={args.label_prefix}")
    md_lines.append("")

    for t in targets:
        md_lines.append(f"## {t.store} ({t.niche or '—'})")
        md_lines.append("")
        md_lines.append(f"- url: {t.url}")
        if t.snapshot_path:
            md_lines.append(f"- homepage snapshot: `{t.snapshot_path}`")
        elif t.snapshot_file:
            md_lines.append(f"- homepage snapshot file: `{t.snapshot_file}`")
        else:
            md_lines.append("- homepage snapshot: (missing)")
        if t.blocked:
            md_lines.append(f"- blocked flag (homepage): `{t.blocked}`")
        md_lines.append("")

        snap_path = Path(t.snapshot_path) if t.snapshot_path else (home_dir / t.snapshot_file if t.snapshot_file else None)
        html_text = ""
        if snap_path and snap_path.exists():
            html_text = snap_path.read_text("utf-8", errors="replace")

        if not html_text or not t.url:
            md_lines.append("- candidates: (none — missing snapshot or url)")
            md_lines.append("")
            continue

        buckets = extract_candidates(html_text, base_url=t.url, per_kind=args.per_kind)
        picks = {
            "returns": pick_first(buckets, "returns"),
            "shipping": pick_first(buckets, "shipping"),
            "sizing": pick_first(buckets, "sizing"),
            "support": pick_first(buckets, "support"),
            "collection": pick_first(buckets, "collection"),
            "product": pick_first(buckets, "product"),
        }

        md_lines.append("### Selected URLs to snapshot")
        md_lines.append("")
        for kind in ["collection", "product", "sizing", "shipping", "returns", "support"]:
            u = picks.get(kind, "")
            if not u:
                continue
            label = f"{args.label_prefix} {t.store} {kind}"
            seed_lines.append(f"{u} {label}")
            md_lines.append(f"- {kind}: {u}")
        if all(not v for v in picks.values()):
            md_lines.append("- (none extracted)")

        md_lines.append("")
        md_lines.append("### Candidate URLs (from homepage snapshot)")
        md_lines.append("")
        for kind in ["collection", "product", "sizing", "shipping", "returns", "support", "cart_checkout"]:
            urls = buckets.get(kind, [])
            if not urls:
                continue
            md_lines.append(f"- {kind} ({len(urls)}):")
            for u in urls:
                md_lines.append(f"  - {u}")
        md_lines.append("")

    out_seeds.parent.mkdir(parents=True, exist_ok=True)
    out_seeds.write_text("\n".join(seed_lines).strip() + "\n", encoding="utf-8")
    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(md_lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_seeds}")
    print(f"Wrote: {out_md}")
    print(f"Seed URLs: {len(seed_lines)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
