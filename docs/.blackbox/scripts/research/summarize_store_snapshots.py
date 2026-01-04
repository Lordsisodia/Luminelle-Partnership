#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import html
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Seed:
    url: str
    name: str


TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.IGNORECASE | re.DOTALL)
META_DESC_RE = re.compile(
    r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\'][^>]*>',
    re.IGNORECASE | re.DOTALL,
)
OG_DESC_RE = re.compile(
    r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\'](.*?)["\'][^>]*>',
    re.IGNORECASE | re.DOTALL,
)


def clean(s: str) -> str:
    s = re.sub(r"\s+", " ", (s or "").strip())
    return html.unescape(s)


def safe_slug(s: str) -> str:
    s = (s or "").lower().strip()
    s = re.sub(r"^https?://", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "snapshot"


def find_snapshot_file(snapshots_dir: Path, slug: str) -> Path | None:
    """
    Find the snapshot file for a given slug.

    Supports both naming schemes:
      - stable: <slug>.html
      - timestamped: <timestamp>__<slug>.html (choose the latest lexicographically)
    """
    stable = snapshots_dir / f"{slug}.html"
    if stable.exists():
        return stable

    candidates = sorted(snapshots_dir.glob(f"*__{slug}.html"))
    if candidates:
        return candidates[-1]
    return None


def parse_seed_line(line: str) -> Seed | None:
    raw = line.strip()
    if not raw or raw.startswith("#"):
        return None
    parts = raw.split()
    url = parts[0].strip()
    name = " ".join(parts[1:]).strip()
    if not url.startswith(("https://", "http://")):
        return None
    if not name:
        name = url
    return Seed(url=url, name=name)


def extract_meta(text: str) -> tuple[str, str]:
    title = ""
    desc = ""
    m = TITLE_RE.search(text)
    if m:
        title = clean(m.group(1))
    m = META_DESC_RE.search(text)
    if m:
        desc = clean(m.group(1))
    if not desc:
        m = OG_DESC_RE.search(text)
        if m:
            desc = clean(m.group(1))
    return title, desc


def detect_signals(text: str) -> dict[str, str]:
    t = text.lower()
    signals: dict[str, list[str]] = {
        "blocked": [],
        "platform": [],
        "bnpl": [],
        "reviews": [],
        "support": [],
        "subscriptions": [],
        "returns": [],
        "search_personalization": [],
        "tracking": [],
        "ux_keywords": [],
    }

    # Block/edge cases
    # Note: many legitimate sites include "cloudflare" in assets/headers; keep this conservative.
    if any(x in t for x in ["just a moment", "access denied", "attention required", "checking your browser"]):
        signals["blocked"].append("bot_protection_or_blocked")

    # Platform (heuristic)
    if any(x in t for x in ["cdn.shopify.com", "myshopify.com", "shopify-section", "shopify-features", "shopify-pay"]):
        signals["platform"].append("shopify")
    if "woocommerce" in t:
        signals["platform"].append("woocommerce")
    if any(x in t for x in ["bigcommerce", "stencil-utils", "cornerstone"]):
        signals["platform"].append("bigcommerce")
    if any(x in t for x in ["magento", "mage/", "varien", "magento_init"]):
        signals["platform"].append("magento")

    # BNPL / payments
    bnpl_rules = {
        "afterpay": ["afterpay"],
        "klarna": ["klarna"],
        "affirm": ["affirm"],
        "sezzle": ["sezzle"],
        "zip": ["zip.co", "quadpay", "zip pay", "zipmoney"],
        "shop_pay_installments": ["shop pay installments"],
    }
    for name, needles in bnpl_rules.items():
        if any(n in t for n in needles):
            signals["bnpl"].append(name)

    # Reviews / social proof
    reviews_rules = {
        "yotpo": ["yotpo"],
        "okendo": ["okendo"],
        "judge_me": ["judge.me", "judgeme"],
        "bazaarvoice": ["bazaarvoice"],
        "powerreviews": ["powerreviews"],
        "trustpilot": ["trustpilot"],
    }
    for name, needles in reviews_rules.items():
        if any(n in t for n in needles):
            signals["reviews"].append(name)

    # Support
    support_rules = {
        "gorgias": ["gorgias"],
        "zendesk": ["zendesk"],
        "intercom": ["intercom"],
        "helpscout": ["helpscout", "help scout"],
    }
    for name, needles in support_rules.items():
        if any(n in t for n in needles):
            signals["support"].append(name)

    # Subscriptions
    subs_rules = {
        "recharge": ["recharge"],
        "skio": ["skio"],
        "bold_subscriptions": ["bold subscriptions", "bold-commerce"],
        "subscribe_pro": ["subscribe pro"],
    }
    for name, needles in subs_rules.items():
        if any(n in t for n in needles):
            signals["subscriptions"].append(name)

    # Returns / post-purchase
    returns_rules = {
        "loop_returns": ["loopreturns", "loop returns"],
        "aftership": ["aftership"],
        "narvar": ["narvar"],
        "happy_returns": ["happy returns"],
        "returnly": ["returnly"],
    }
    for name, needles in returns_rules.items():
        if any(n in t for n in needles):
            signals["returns"].append(name)

    # Search / personalization / upsell
    search_rules = {
        "algolia": ["algolia"],
        "klevu": ["klevu"],
        "searchspring": ["searchspring"],
        "boost_commerce": ["boostcommerce", "boost commerce"],
        "nosto": ["nosto"],
        "rebuy": ["rebuy"],
        "dynamic_yield": ["dynamic yield", "dynamicyield"],
        "constructor": ["constructor.io", "constructorio"],
    }
    for name, needles in search_rules.items():
        if any(n in t for n in needles):
            signals["search_personalization"].append(name)

    # Tracking / measurement
    tracking_rules = {
        "gtm": ["googletagmanager", "gtm.js"],
        "ga": ["google-analytics.com", "gtag(", "ga("],
        "meta_pixel": ["connect.facebook.net", "fbq("],
        "tiktok_pixel": ["analytics.tiktok.com", "tiktok pixel"],
    }
    for name, needles in tracking_rules.items():
        if any(n in t for n in needles):
            signals["tracking"].append(name)

    # Keyword-only UX cues (homepage-oriented; noisy but useful at scale)
    ux_needles = [
        ("free_shipping", ["free shipping"]),
        ("returns_exchanges", ["returns", "exchanges"]),
        ("size_fit", ["size guide", "fit guide", "find your size"]),
        ("store_locator", ["store locator", "find a store"]),
        ("gift_cards", ["gift card"]),
        ("newsletter_signup", ["newsletter", "sign up", "subscribe"]),
        ("loyalty_rewards", ["rewards", "loyalty"]),
        ("sustainability", ["sustainab", "eco", "recycled", "carbon"]),
    ]
    for name, needles in ux_needles:
        if any(n in t for n in needles):
            signals["ux_keywords"].append(name)

    # Flatten to CSV-friendly strings
    return {k: ", ".join(v) for k, v in signals.items()}


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Summarize e-commerce homepage snapshots into a CSV/MD (meta + conversion tooling signals)."
    )
    ap.add_argument("--seeds", required=True, help="Seed file (URL then label).")
    ap.add_argument("--snapshots-dir", required=True, help="Directory containing stable snapshot files (*.html).")
    ap.add_argument("--out-csv", required=True, help="Write CSV summary here.")
    ap.add_argument("--out-md", required=True, help="Write Markdown summary here.")
    ap.add_argument("--limit", type=int, default=0, help="Only process first N seeds (0=all).")
    args = ap.parse_args()

    seeds_path = Path(args.seeds)
    snapshots_dir = Path(args.snapshots_dir)
    out_csv = Path(args.out_csv)
    out_md = Path(args.out_md)

    seeds: list[Seed] = []
    for line in seeds_path.read_text("utf-8", errors="replace").splitlines():
        s = parse_seed_line(line)
        if s:
            seeds.append(s)

    if args.limit and args.limit > 0:
        seeds = seeds[: args.limit]

    rows: list[dict[str, str]] = []
    for s in seeds:
        slug = safe_slug(s.name)
        snap = find_snapshot_file(snapshots_dir, slug)
        html_text = ""
        if snap and snap.exists():
            html_text = snap.read_text("utf-8", errors="replace")

        title, desc = extract_meta(html_text)
        signals = detect_signals(html_text)

        rows.append(
            {
                "name": s.name,
                "url": s.url,
                "snapshot_file": snap.name if (snap and snap.exists()) else "",
                "title": title,
                "description": desc,
                **signals,
            }
        )

    out_csv.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "name",
        "url",
        "snapshot_file",
        "title",
        "description",
        "blocked",
        "platform",
        "bnpl",
        "reviews",
        "support",
        "subscriptions",
        "returns",
        "search_personalization",
        "tracking",
        "ux_keywords",
    ]
    with out_csv.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows:
            w.writerow({k: r.get(k, "") for k in fieldnames})

    # Markdown summary: quick counts
    def count_nonempty(key: str) -> int:
        return sum(1 for r in rows if (r.get(key) or "").strip())

    lines: list[str] = []
    lines.append("# Store Snapshot Summary (HTML snapshots)")
    lines.append("")
    lines.append("This is an automated scan over saved HTML snapshots (meta + common conversion tooling signals).")
    lines.append("Treat this as a *triage layer* before deeper manual UX audits (especially PDP, cart, checkout).")
    lines.append("")
    lines.append(f"- seeds: `{seeds_path}`")
    lines.append(f"- snapshots: `{snapshots_dir}`")
    lines.append(f"- csv: `{out_csv}`")
    lines.append("")
    lines.append("Coverage:")
    lines.append(f"- total seeds parsed: {len(seeds)}")
    lines.append(f"- snapshots found: {sum(1 for r in rows if r['snapshot_file'])}")
    lines.append(f"- blocked/defended (heuristic): {count_nonempty('blocked')}")
    lines.append("")
    lines.append("Detected signals (non-empty rows):")
    for k in [
        "platform",
        "bnpl",
        "reviews",
        "support",
        "subscriptions",
        "returns",
        "search_personalization",
        "tracking",
        "ux_keywords",
    ]:
        lines.append(f"- {k}: {count_nonempty(k)}")
    lines.append("")
    lines.append("Next step recommendation:")
    lines.append("- Pick the top ~15 stores by relevance (women’s fashion + similar price point) and do a manual funnel audit:")
    lines.append("  - homepage → PLP → PDP → cart → checkout → post-purchase")
    lines.append("  - capture screenshots and note UX patterns + copy patterns")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"Wrote: {out_csv}")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
