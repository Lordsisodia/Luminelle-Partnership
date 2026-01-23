#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


PERMISSIVE = {"MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "0BSD", "MPL-2.0"}
COPYLEFT = {"GPL-2.0", "GPL-3.0", "AGPL-3.0", "LGPL-2.1", "LGPL-3.0"}


def parse_dt(s: str) -> datetime | None:
    if not s:
        return None
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00"))
    except Exception:  # noqa: BLE001
        return None


def clamp(n: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, n))


def license_bucket(spdx: str) -> str:
    if not spdx or spdx in {"NOASSERTION", "NONE", "UNKNOWN"}:
        return "verify"
    if spdx in COPYLEFT:
        return "flagged"
    if spdx in PERMISSIVE:
        return "safe"
    return "verify"


def infer_tags(meta: dict[str, Any]) -> list[str]:
    text = " ".join(
        [
            (meta.get("name") or ""),
            (meta.get("full_name") or ""),
            (meta.get("description") or ""),
            " ".join(meta.get("topics") or []),
        ]
    ).lower()

    def has_word(token: str) -> bool:
        """
        Safer than `"token" in text` for short/common tokens.
        - Uses a simple alnum boundary, so "return" won't match "returns" and won't
          match inside longer identifiers.
        """

        t = token.strip().lower()
        if not t:
            return False
        return re.search(rf"(?<![a-z0-9]){re.escape(t)}(?![a-z0-9])", text) is not None

    def has_any(needles: list[str]) -> bool:
        for n in needles:
            nn = (n or "").strip().lower()
            if not nn:
                continue
            # For phrases / topic-like tokens, substring match is OK.
            if " " in nn or "-" in nn or ":" in nn or "/" in nn:
                if nn in text:
                    return True
                continue
            if has_word(nn):
                return True
        return False

    commerce_context = [
        "ecommerce",
        "e-commerce",
        "shopify",
        "storefront",
        "cart",
        # Ecosystems where commerce primitives appear even without the word "ecommerce".
        "magento",
        "woocommerce",
        "spree",
        "solidus",
        "saleor",
        "vendure",
        "medusajs",
        "medusa",
    ]

    # Noise suppression:
    # - Crypto/ICO/token repos can collide with "exchange"/"returns" vocabulary.
    # - Paid extension marketing repos (esp. Magento/WooCommerce) often list dozens of
    #   unrelated product links, which makes naive keyword tagging explode.
    crypto_noise = ["erc20", "ethereum", "blockchain", "ico", "crowdsale", "airdrop", "defi"]
    if has_any(crypto_noise) and not has_any(commerce_context):
        return []

    commercial_extension_marketing = [
        "purchasing",
        "buy now",
        "download from our live site",
        "live site:",
        "ticksy.com",
        "codecanyon",
        "envato",
        "sources:",
    ]
    if has_any(["extension", "module", "plugin"]) and has_any(["magento", "woocommerce"]) and has_any(commercial_extension_marketing):
        return ["commerce"]

    rules = {
        # Keep commerce broad, but avoid extremely generic words like "order".
        "commerce": ["ecommerce", "e-commerce", "commerce", "shopify", "storefront", "cart", "checkout"],
        # Front-end storefront implementations / UI patterns (separate from generic commerce backends).
        "storefront": [
            "storefront",
            "storefront api",
            "storefront-api",
            "shopify-storefront-api",
            "shopify-hydrogen",
            "shopify/hydrogen",
            "shopify/hydrogen-v1",
            "vue-storefront",
            "vuestorefront",
            "saleor-storefront",
            "product-page",
            "product card",
            "product-card",
            "product grid",
            "cart drawer",
            "minicart",
            "collection filters",
            "facet filters",
            "pdp",
            "plp",
        ],
        "admin": ["admin", "dashboard", "internal-tools", "crud", "backoffice"],

        # Returns is very noisy if we match bare "return"/"returns" without context.
        # Use strong needles, or require commerce context for weak needles.
        "returns": [],  # handled below

        # Similar for shipping: require commerce context for weak signals.
        "shipping": [],  # handled below

        # Support is also noisy (e.g. "browser support"); handled below with stronger needles.
        "support": [],  # handled below

        # Content/blog primitives (rendering, pipelines, code blocks, markdown/MDX).
        "content": [
            "markdown",
            "markdown editor",
            "markdown-editor",
            "mdx",
            "mdxjs",
            "mdx-editor",
            "remark",
            "rehype",
            "unified",
            "shiki",
            "contentlayer",
            "docusaurus",
            "nextra",
            "docsify",
            # Avoid false positives from UI/lighting tooling that share the word "aurora".
            # (e.g. gaming RGB lighting projects)
            # Handled via early reject below.
        ],
        "blog": ["blog", "article", "articles", "reading time", "table of contents", "toc"],
        # Reserve CMS for actual CMS products/frameworks (avoid tagging every markdown tool as a CMS).
        "cms": [
            "cms",
            "headless cms",
            "headless-cms",
            "content management",
            "content-management",
            "strapi",
            "directus",
            "payloadcms",
            "payload cms",
            "sanity",
            "ghost",
            "wordpress",
            "drupal",
        ],
        "search": ["meilisearch", "typesense", "instantsearch", "autocomplete", "faceted search", "search"],
        "analytics": ["analytics", "product-analytics", "events", "telemetry"],
        "flags": ["feature-flag", "feature flag", "featureflags", "flags"],
        "experimentation": ["ab test", "a/b", "experiment", "experimentation"],
        # Avoid "jobs" keyword: it's too common; keep queue/orchestration/workflow.
        "workflows": ["workflow", "orchestration", "scheduler", "queue", "automation"],
        "auth": ["auth", "oauth", "oidc", "sso", "identity"],
        "policy": ["policy", "authorization", "rbac", "abac"],
        "observability": ["observability", "tracing", "logging", "monitoring"],
    }

    tags: list[str] = []
    for tag, needles in rules.items():
        if tag in {"returns", "shipping"}:
            continue
        if needles and has_any(needles):
            tags.append(tag)

    # "Aurora" is a common name for RGB lighting / theming projects; don't tag as content
    # just because the word appears.
    if has_any(["rgb", "lighting", "razer", "logitech", "corsair"]) and "content" in tags:
        tags = [t for t in tags if t != "content"]

    # NOTE: "rma" is ambiguous (common in hardware/IT); treat it as a weak signal that
    # still requires commerce context.
    returns_strong = ["reverse logistics", "return label", "returns portal", "return portal", "store credit", "store-credit"]
    # Avoid bare "return" (extremely common in programming docs).
    # Avoid bare "returns" (common verb in docs: "function returns X").
    returns_weak = ["exchange", "exchanges", "refund", "refunds", "rma"]
    if has_any(returns_strong) or (has_any(returns_weak) and has_any(commerce_context)):
        tags.append("returns")

    shipping_strong = [
        "shipping label",
        "shipping rates",
        "shipment tracking",
        "tracking number",
        "carrier rates",
        "warehouse management system",
        "warehouse-management-system",
        "warehouse execution system",
        "warehouse-execution-system",
        "3pl",
    ]
    # Keep weak needles tight: "tracking" alone is too generic (error tracking, event tracking, etc).
    shipping_weak = ["shipping", "carrier", "fulfillment", "label", "shipment"]
    shipping_ops_context = [
        "warehouse management system",
        "warehouse-management-system",
        "warehouse execution system",
        "warehouse-execution-system",
        "inventory management",
        "inventory-management",
        "logistics",
        "supply chain",
        "pick pack",
        "picking",
        "3pl",
    ]

    has_wms = has_word("wms")
    if has_any(shipping_strong) or (has_wms and has_any(shipping_ops_context)) or (has_any(shipping_weak) and (has_any(commerce_context) or has_any(shipping_ops_context))):
        tags.append("shipping")

    support_strong = [
        "helpdesk",
        "help desk",
        "help-desk",
        "ticketing",
        "ticket system",
        "shared inbox",
        "shared mailbox",
        "mailbox",
        "customer support",
        "support desk",
        "service desk",
        "live chat",
        "live-chat",
        "chat widget",
        "chat-widget",
        "omni-channel",
        "omnichannel",
        "customer messaging",
        "inbox",
        "conversation inbox",
    ]
    if has_any(support_strong):
        tags.append("support")
    return tags


def score_repo(meta: dict[str, Any]) -> tuple[int, str]:
    """
    Heuristic score from GitHub metadata only.
    """
    stars = int(meta.get("stargazers_count") or 0)
    updated_at = meta.get("updated_at") or ""
    lang = (meta.get("language") or "").strip()

    lic = "UNKNOWN"
    if meta.get("license"):
        lic = meta["license"].get("spdx_id") or meta["license"].get("key") or "UNKNOWN"

    usefulness = 10  # baseline; humans/agents refine later

    if lang in {"TypeScript", "JavaScript"}:
        integration = 22
    elif lang in {"Python", "Go"}:
        integration = 16
    else:
        integration = 12

    stars_component = clamp((stars**0.5) * 2.0, 0, 14)
    recency_component = 0.0
    dt = parse_dt(updated_at)
    if dt:
        days = (datetime.now(timezone.utc) - dt).days
        if days <= 30:
            recency_component = 6
        elif days <= 180:
            recency_component = 4
        elif days <= 365:
            recency_component = 2
    maintenance = int(clamp(stars_component + recency_component, 0, 20))

    if lic in PERMISSIVE:
        license_score = 15
    elif lic in COPYLEFT:
        license_score = 7
    elif lic == "UNKNOWN":
        license_score = 5
    else:
        license_score = 10

    ttv = 5
    if stars >= 5000:
        ttv += 3
    elif stars >= 1000:
        ttv += 2
    if lang in {"TypeScript", "JavaScript"}:
        ttv += 2
    ttv = int(clamp(ttv, 0, 10))

    total = int(clamp(usefulness + integration + maintenance + license_score + ttv, 0, 100))
    rationale = (
        f"usefulness={usefulness}/30 baseline; integration={integration}/25 ({lang or 'N/A'}); "
        f"maintenance={maintenance}/20 (stars={stars}, updated={updated_at or 'N/A'}); "
        f"license={license_score}/15 ({lic}); time_to_value={ttv}/10"
    )
    return total, rationale


def table_cell(s: str) -> str:
    s = (s or "").replace("\n", " ").strip()
    s = s.replace("|", " / ")
    s = re.sub(r"\s{2,}", " ", s)
    return s


@dataclass(frozen=True)
class Candidate:
    full_name: str
    url: str
    license_spdx: str
    license_bucket: str
    language: str
    stars: int
    forks: int
    updated_at: str
    topics: list[str]
    tags: list[str]
    description: str
    score: int
    rationale: str


def load_candidates(entries_dir: Path) -> list[Candidate]:
    json_files = sorted(entries_dir.glob("*.json"))
    if not json_files:
        raise SystemExit("No *.json metadata files found.")

    out: list[Candidate] = []
    for p in json_files:
        meta: dict[str, Any] = json.loads(p.read_text("utf-8"))
        full = str(meta.get("full_name") or p.stem)
        url = str(meta.get("html_url") or "")
        lic = "UNKNOWN"
        if meta.get("license"):
            lic = meta["license"].get("spdx_id") or meta["license"].get("key") or "UNKNOWN"
        bucket = license_bucket(str(lic))
        lang = str(meta.get("language") or "N/A")
        stars = int(meta.get("stargazers_count") or 0)
        forks = int(meta.get("forks_count") or 0)
        updated_at = str(meta.get("updated_at") or "")
        topics = [str(t) for t in (meta.get("topics") or [])]
        desc = str((meta.get("description") or "")).strip()
        tags = infer_tags(meta)
        score, rationale = score_repo(meta)
        out.append(
            Candidate(
                full_name=full,
                url=url,
                license_spdx=str(lic),
                license_bucket=bucket,
                language=lang,
                stars=stars,
                forks=forks,
                updated_at=updated_at,
                topics=topics,
                tags=tags,
                description=desc,
                score=score,
                rationale=rationale,
            )
        )

    out.sort(key=lambda c: (c.score, c.stars), reverse=True)
    return out


def load_candidates_from_search_dump(search_json: Path) -> list[Candidate]:
    payload: dict[str, Any] = json.loads(search_json.read_text("utf-8"))
    repos = payload.get("repos") or []
    if not isinstance(repos, list) or not repos:
        return []

    out: list[Candidate] = []
    for r in repos:
        if not isinstance(r, dict):
            continue
        full = str(r.get("full_name") or "")
        url = str(r.get("url") or "")
        if not full:
            continue
        lic = str(r.get("license_spdx") or "UNKNOWN")
        bucket = str(r.get("license_bucket") or license_bucket(lic))
        lang = str(r.get("language") or "N/A")
        stars = int(r.get("stars") or 0)
        forks = int(r.get("forks") or 0)
        updated_at = str(r.get("updated_at") or "")
        desc = str((r.get("description") or "")).strip()
        tags = infer_tags({"name": full.split("/")[-1], "full_name": full, "description": desc, "topics": []})
        score, rationale = score_repo(
            {
                "stargazers_count": stars,
                "updated_at": updated_at,
                "language": lang,
                "license": {"spdx_id": lic},
            }
        )
        out.append(
            Candidate(
                full_name=full,
                url=url,
                license_spdx=lic,
                license_bucket=bucket,
                language=lang,
                stars=stars,
                forks=forks,
                updated_at=updated_at,
                topics=[],
                tags=tags,
                description=desc,
                score=score,
                rationale=rationale,
            )
        )

    out.sort(key=lambda c: (c.score, c.stars), reverse=True)
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description="Export OSS candidates (JSON + optional markdown) from GitHub metadata.")
    ap.add_argument("--entries-dir", default="", help="Directory containing *.json metadata files.")
    ap.add_argument("--search-json", default="", help="Search dump JSON from github_search_repos.py --out-search-json.")
    ap.add_argument("--out-json", required=True, help="Write extracted candidates JSON here.")
    ap.add_argument("--out-md", default="", help="Optional: write a markdown table here.")
    ap.add_argument("--limit", type=int, default=0, help="Limit number of candidates (0 = all).")
    args = ap.parse_args()

    if bool(args.entries_dir.strip()) == bool(args.search_json.strip()):
        raise SystemExit("Provide exactly one of --entries-dir or --search-json.")

    candidates: list[Candidate]
    source: dict[str, Any]
    if args.entries_dir.strip():
        entries_dir = Path(args.entries_dir)
        candidates = load_candidates(entries_dir)
        source = {"entries_dir": str(entries_dir)}
    else:
        search_path = Path(args.search_json)
        candidates = load_candidates_from_search_dump(search_path)
        source = {"search_json": str(search_path)}

    if args.limit and args.limit > 0:
        candidates = candidates[: args.limit]

    payload = {
        "generated_at_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "source": source,
        "count": len(candidates),
        "candidates": [c.__dict__ for c in candidates],
    }

    out_json = Path(args.out_json)
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Wrote extracted JSON: {out_json}")

    if args.out_md.strip():
        out_md = Path(args.out_md)
        out_md.parent.mkdir(parents=True, exist_ok=True)
        lines: list[str] = []
        lines.append("# OSS Candidates (extracted)")
        lines.append("")
        lines.append(f"Source: `{source}`")
        lines.append("")
        lines.append("| rank | repo | score | stars | license | bucket | lang | updated | tags | url |")
        lines.append("|---:|---|---:|---:|---|---|---|---|---|---|")
        for i, c in enumerate(candidates, 1):
            lines.append(
                "| "
                + " | ".join(
                    [
                        str(i),
                        table_cell(c.full_name),
                        str(c.score),
                        str(c.stars),
                        table_cell(c.license_spdx),
                        table_cell(c.license_bucket),
                        table_cell(c.language),
                        table_cell(c.updated_at),
                        table_cell(", ".join(c.tags[:8])),
                        table_cell(c.url),
                    ]
                )
                + " |"
            )
        out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"Wrote extracted markdown: {out_md}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
