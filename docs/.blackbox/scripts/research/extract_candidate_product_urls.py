#!/usr/bin/env python3
from __future__ import annotations

import argparse
import html as _html
import re
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urljoin, urlparse


@dataclass(frozen=True)
class Candidate:
    url: str
    reason: str


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


def normalize(url: str) -> str:
    # Drop fragments; keep query for now (sometimes contains variant).
    u = url.strip()
    if not u:
        return ""
    if u.startswith(("mailto:", "tel:", "javascript:")):
        return ""
    # Some sites embed URLs in JSON/JS strings; normalize common escaping.
    # Examples: "\/pages\/returns", "\u002Fpages\u002Freturns", "&amp;"
    u = _html.unescape(u)
    u = u.replace("\\/", "/")
    u = u.replace("\\u002F", "/").replace("\\u002f", "/")
    u = u.replace("\\u0026", "&").replace("\\u0026", "&")
    u = u.replace("\\u003D", "=").replace("\\u003d", "=")
    # Remove fragments
    u = u.split("#", 1)[0]
    return u


def classify(path: str) -> str:
    p = path.lower()
    # Common product patterns across DTC sites
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
    # Cart/checkout: be careful with "/bags" category URLs.
    if "/cart" in p or "/checkout" in p or re.search(r"/bag(?:/|\?|$)", p):
        return "cart_checkout"
    return "other"


def main() -> int:
    ap = argparse.ArgumentParser(description="Extract candidate product + policy URLs from an HTML snapshot.")
    ap.add_argument("--snapshot", required=True, help="Path to an HTML snapshot.")
    ap.add_argument("--base-url", required=True, help="Base URL for resolving relative links (e.g., https://example.com).")
    ap.add_argument("--out", required=True, help="Write markdown output here.")
    ap.add_argument("--limit", type=int, default=25, help="Max URLs per category.")
    args = ap.parse_args()

    snap = Path(args.snapshot)
    base = args.base_url.rstrip("/") + "/"
    html = snap.read_text("utf-8", errors="replace")

    seen: set[str] = set()
    buckets: dict[str, list[Candidate]] = {k: [] for k in ["product", "collection", "returns", "shipping", "sizing", "support", "cart_checkout", "other"]}

    base_host = urlparse(base).netloc.lower()

    for href in HREF_RE.findall(html):
        href = normalize(href)
        if not href:
            continue
        abs_url = urljoin(base, href)
        p = urlparse(abs_url)
        if not p.scheme.startswith("http"):
            continue
        # Ignore static assets (keeps candidate lists actionable).
        path_lower = (p.path or "").lower()
        if any(path_lower.endswith(ext) for ext in STATIC_EXTENSIONS):
            continue
        # Ignore obvious CDN paths that are not navigational.
        if path_lower.startswith("/cdn/") or "/cdn/" in path_lower:
            continue
        if path_lower.startswith("/assets/") or "/assets/" in path_lower:
            continue
        # Keep same-host only (reduces trackers/social links)
        if p.netloc.lower() and p.netloc.lower() != base_host:
            continue
        abs_url = p._replace(fragment="").geturl()
        if abs_url in seen:
            continue
        seen.add(abs_url)
        kind = classify(p.path)
        buckets[kind].append(Candidate(url=abs_url, reason=kind))

    # Keep deterministic ordering
    for k in buckets:
        buckets[k] = buckets[k][: args.limit]

    lines: list[str] = []
    lines.append("# Candidate URLs (from snapshot)")
    lines.append("")
    lines.append(f"- snapshot: `{snap}`")
    lines.append(f"- base: `{base}`")
    lines.append("")
    for k in ["product", "collection", "sizing", "shipping", "returns", "cart_checkout", "support", "other"]:
        urls = buckets.get(k, [])
        if not urls:
            continue
        lines.append(f"## {k} ({len(urls)})")
        lines.append("")
        for c in urls:
            lines.append(f"- {c.url}")
        lines.append("")

    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
