#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


BUCKET_RE = re.compile(r"^##\s+([a-z_]+)\s*\(", re.IGNORECASE)
URL_RE = re.compile(r"^-\s+(https?://\S+)", re.IGNORECASE)


@dataclass(frozen=True)
class StoreSpec:
    store: str
    base_url: str
    candidates_md: Path


def parse_candidates(md_path: Path) -> dict[str, list[str]]:
    buckets: dict[str, list[str]] = {}
    current: str | None = None
    for line in md_path.read_text("utf-8", errors="replace").splitlines():
        m = BUCKET_RE.match(line.strip())
        if m:
            current = m.group(1).lower().strip()
            buckets.setdefault(current, [])
            continue
        m = URL_RE.match(line.strip())
        if m and current:
            buckets.setdefault(current, []).append(m.group(1))
    return buckets


def score_url(url: str, prefer_no_locale: bool = True) -> tuple[int, int, int]:
    """
    Lower is better.
    - penalize locale-prefixed paths (e.g., /en-vn/...)
    - penalize URLs with many query params
    """
    u = url.lower()
    locale_penalty = 0
    if prefer_no_locale and re.search(r"/[a-z]{2}-[a-z]{2}/", u):
        locale_penalty = 10
    query_penalty = 0
    if "?" in u:
        query_penalty = min(5, u.count("&") + 1)
    length_penalty = min(5, max(0, len(u) - 120) // 40)
    return (locale_penalty, query_penalty, length_penalty)


def pick_first(urls: list[str], *, prefer_no_locale: bool = True) -> str | None:
    if not urls:
        return None
    urls_sorted = sorted(urls, key=lambda u: score_url(u, prefer_no_locale=prefer_no_locale))
    return urls_sorted[0]


def pick_from_buckets(buckets: dict[str, list[str]], *, kind: str) -> str | None:
    urls = buckets.get(kind, [])[:]
    if not urls:
        return None
    return pick_first(urls)


def pick_fallback(buckets: dict[str, list[str]], *, contains_any: list[str]) -> str | None:
    # Look across known "other-ish" buckets for useful policy pages.
    candidates: list[str] = []
    for k in ["other", "support", "collection", "cart_checkout", "returns", "shipping", "sizing", "product"]:
        candidates.extend(buckets.get(k, []))
    needles = [n.lower() for n in contains_any]

    def match(u: str, needle: str) -> bool:
        uu = u.lower()
        if needle.startswith("/"):
            return needle in uu
        # Avoid false positives like "outfits" matching "fit".
        segmentish = [f"/{needle}", f"-{needle}", f"_{needle}", f"{needle}/", f"{needle}?", f"{needle}&", f"{needle}="]
        return any(s in uu for s in segmentish)

    hits = [u for u in candidates if any(match(u, n) for n in needles)]
    return pick_first(hits) if hits else None


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Build a batch-URLs target list from candidate-link markdown files (one store per file)."
    )
    ap.add_argument("--stores", required=True, help="CSV: store,base_url,candidates_md (paths relative to repo ok).")
    ap.add_argument("--out", required=True, help="Write batch target urls txt here.")
    args = ap.parse_args()

    stores_csv = Path(args.stores)
    out_path = Path(args.out)

    stores: list[StoreSpec] = []
    for raw in stores_csv.read_text("utf-8", errors="replace").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = [p.strip() for p in line.split(",", 2)]
        if len(parts) != 3:
            raise SystemExit(f"Invalid line (expected 3 comma-separated fields): {raw}")
        store, base_url, md = parts
        stores.append(StoreSpec(store=store, base_url=base_url, candidates_md=Path(md)))

    lines: list[str] = []
    lines.append("# Batch targets generated from homepage link candidates")
    lines.append("# Format: <url> <label>")
    lines.append("")

    for s in stores:
        buckets = parse_candidates(s.candidates_md) if s.candidates_md.exists() else {}
        lines.append(f"# {s.store}")
        lines.append(f"{s.base_url} {s.store}__home")

        # Core pages
        plp = pick_from_buckets(buckets, kind="collection") or pick_fallback(buckets, contains_any=["/collections/", "/shop/"])
        pdp = pick_from_buckets(buckets, kind="product")
        cart = pick_from_buckets(buckets, kind="cart_checkout") or pick_fallback(buckets, contains_any=["/cart", "/bag", "/checkout"])
        sizing = pick_from_buckets(buckets, kind="sizing") or pick_fallback(buckets, contains_any=["size", "fit"])
        shipping = pick_from_buckets(buckets, kind="shipping") or pick_fallback(buckets, contains_any=["shipping", "delivery"])
        returns = pick_from_buckets(buckets, kind="returns") or pick_fallback(buckets, contains_any=["returns", "return", "exchanges", "exchange"])
        support = pick_from_buckets(buckets, kind="support") or pick_fallback(buckets, contains_any=["help", "support", "faq", "contact"])

        if plp:
            lines.append(f"{plp} {s.store}__plp")
        if pdp:
            lines.append(f"{pdp} {s.store}__pdp")
        if cart:
            lines.append(f"{cart} {s.store}__cart_or_checkout")
        if sizing:
            lines.append(f"{sizing} {s.store}__size_fit")
        if shipping:
            lines.append(f"{shipping} {s.store}__shipping")
        if returns:
            lines.append(f"{returns} {s.store}__returns")
        if support:
            lines.append(f"{support} {s.store}__help_support")
        lines.append("")

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(f"Wrote: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
