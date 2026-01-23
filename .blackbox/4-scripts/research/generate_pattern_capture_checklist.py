#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


FILENAME_RE = re.compile(r"`([a-z0-9-]+)__([a-z]+)__([a-z-]+)__([a-z0-9-]+)__YYYYMMDD\.png`", re.IGNORECASE)


@dataclass(frozen=True)
class Example:
    store: str
    device: str
    stage: str
    feature: str
    filename_template: str


def key(stage: str, feature: str) -> str:
    return f"{stage.strip().lower()}::{feature.strip().lower()}"


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Generate a pattern-capture checklist mapping evidence screenshots to pattern cards + backlog rows."
    )
    ap.add_argument("--evidence-dir", required=True, help="Plan evidence dir containing <store>/CHECKLIST.md files.")
    ap.add_argument("--patterns-dir", required=True, help="Pattern cards directory (used for links).")
    ap.add_argument("--mapping-md", required=True, help="pattern-to-backlog-mapping.md (for context).")
    ap.add_argument("--out-md", required=True, help="Write checklist markdown here.")
    args = ap.parse_args()

    evidence_dir = Path(args.evidence_dir)
    patterns_dir = Path(args.patterns_dir)
    mapping_md = Path(args.mapping_md)
    out_md = Path(args.out_md)

    checklists = sorted(evidence_dir.glob("*/CHECKLIST.md"))
    if not checklists:
        raise SystemExit(f"No CHECKLIST.md files found under {evidence_dir}")

    # Collect unique stage/feature combos from any store checklist.
    examples_by_key: dict[str, Example] = {}
    for cl in checklists:
        text = cl.read_text("utf-8", errors="replace")
        for m in FILENAME_RE.finditer(text):
            store, device, stage, feature = [x.strip().lower() for x in m.groups()]
            k = key(stage, feature)
            if k in examples_by_key:
                continue
            examples_by_key[k] = Example(
                store=store,
                device=device,
                stage=stage,
                feature=feature,
                filename_template=m.group(1),
            )

    # Mapping: stage/feature -> pattern card file + backlog pattern name (optional)
    # Keep this minimal and aligned to our starter pack of patterns.
    mapping: dict[str, dict[str, str]] = {
        key("plp", "filters-panel"): {
            "pattern_card": "plp-occasion-filters.md",
            "backlog_pattern": "PLP occasion filters",
        },
        key("plp", "occasion-filters"): {
            "pattern_card": "plp-occasion-filters.md",
            "backlog_pattern": "PLP occasion filters",
        },
        key("pdp", "fit-module"): {
            "pattern_card": "pdp-fit-confidence-module.md",
            "backlog_pattern": "PDP fit confidence module",
        },
        key("pdp", "fabric-care"): {
            "pattern_card": "pdp-fabric-confidence-module.md",
            "backlog_pattern": "PDP fabric confidence module",
        },
        key("pdp", "reviews-module"): {
            "pattern_card": "reviews-filterable-by-fit.md",
            "backlog_pattern": "Reviews filterable by fit",
        },
        key("cart", "variant-edit"): {
            "pattern_card": "cart-variant-editing.md",
            "backlog_pattern": "Cart variant editing",
        },
        key("checkout", "express-buttons"): {
            "pattern_card": "checkout-express-checkout.md",
            "backlog_pattern": "Checkout express + trust",
        },
        # These are patterns that often show up on the same screenshots but not always.
        # Keep as optional reminders (auditors can add evidence if they see them).
        key("pdp", "variant-picker"): {
            "pattern_card": "pdp-fit-confidence-module.md",
            "backlog_pattern": "PDP fit confidence module",
        },
        key("checkout", "trust-cues"): {
            "pattern_card": "checkout-express-checkout.md",
            "backlog_pattern": "Checkout express + trust",
        },
        key("checkout", "delivery-estimate"): {
            "pattern_card": "checkout-express-checkout.md",
            "backlog_pattern": "Checkout express + trust",
        },
        # Optional extras (pattern-specific)
        key("pdp", "fit-quiz"): {
            "pattern_card": "pdp-fit-quiz.md",
            "backlog_pattern": "PDP fit quiz entry point",
        },
        key("pdp", "complete-the-set"): {
            "pattern_card": "pdp-complete-the-set-cross-sell.md",
            "backlog_pattern": "PDP complete-the-set cross-sell",
        },
        key("post-purchase", "returns-portal"): {
            "pattern_card": "returns-self-serve-portal.md",
            "backlog_pattern": "Self-serve returns portal",
        },
        key("post-purchase", "help-center"): {
            "pattern_card": "help-center-contextual-faq.md",
            "backlog_pattern": "Contextual help center",
        },
        key("homepage", "country-selector"): {
            "pattern_card": "global-region-routing.md",
            "backlog_pattern": "Global region routing",
        },
    }

    def link_card(filename: str) -> str:
        p = patterns_dir / filename
        return f"`{p}`" if p.exists() else f"`{patterns_dir / filename}` (missing)"

    lines: list[str] = []
    lines.append("---")
    lines.append("status: draft")
    lines.append("last_reviewed: 2025-12-29")
    lines.append("owner: growth")
    lines.append("---")
    lines.append("")
    lines.append("# Pattern Capture Checklist (Screenshots → Pattern Cards → Backlog)")
    lines.append("")
    lines.append("Goal: when an auditor captures a required screenshot, they can immediately:")
    lines.append("1) paste the screenshot link into the correct pattern card")
    lines.append("2) (optionally) mark the matching backlog item as evidence-backed")
    lines.append("")
    lines.append("Inputs:")
    lines.append(f"- evidence checklists: `{evidence_dir}`")
    lines.append(f"- pattern cards: `{patterns_dir}`")
    lines.append(f"- mapping: `{mapping_md}`")
    lines.append("")
    lines.append("How to use during an audit:")
    lines.append("- For each screenshot you capture, find the row matching its `stage` + `feature`.")
    lines.append("- Open the linked pattern card and replace `Screenshot link: pending...` with your real screenshot path.")
    lines.append("- If the store uses a different mechanic than expected, create a new pattern card instead.")
    lines.append("")
    lines.append("## Required screenshot → pattern mapping")
    lines.append("")
    lines.append("| stage | feature | filename example | pattern card to update | backlog row |")
    lines.append("|---|---|---|---|---|")

    rows = []
    for k, ex in sorted(examples_by_key.items(), key=lambda kv: kv[0]):
        info = mapping.get(k, {})
        card = info.get("pattern_card", "")
        backlog = info.get("backlog_pattern", "")
        filename_example = f"{ex.store}__{ex.device}__{ex.stage}__{ex.feature}__YYYYMMDD.png"
        rows.append(
            (
                ex.stage,
                ex.feature,
                filename_example,
                link_card(card) if card else "— (create new card if valuable)",
                backlog if backlog else "—",
            )
        )

    for stage, feature, filename_example, card_link, backlog in rows:
        lines.append(f"| {stage} | {feature} | `{filename_example}` | {card_link} | {backlog} |")

    lines.append("")
    lines.append("## Notes")
    lines.append("")
    lines.append("- This checklist intentionally focuses on the **minimum evidence set** (PLP filters, PDP fit/fabric/reviews, cart variant edit, checkout express/trust).")
    lines.append("- Patterns like “Fit quiz”, “Complete the set”, “Returns portal”, and “Help center” often require *additional* screenshots beyond the minimum set; capture them when present:")
    lines.append(f"  - `pdp-fit-quiz.md`: `{patterns_dir / 'pdp-fit-quiz.md'}`")
    lines.append(f"  - `pdp-complete-the-set-cross-sell.md`: `{patterns_dir / 'pdp-complete-the-set-cross-sell.md'}`")
    lines.append(f"  - `returns-self-serve-portal.md`: `{patterns_dir / 'returns-self-serve-portal.md'}`")
    lines.append(f"  - `help-center-contextual-faq.md`: `{patterns_dir / 'help-center-contextual-faq.md'}`")
    lines.append("")

    out_md.parent.mkdir(parents=True, exist_ok=True)
    out_md.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote: {out_md}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
