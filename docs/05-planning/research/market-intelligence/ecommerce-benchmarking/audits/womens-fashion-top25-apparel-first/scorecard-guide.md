---
status: draft
last_reviewed: 2025-12-31
owner: growth
---

# Scorecard Guide (Women’s Fashion Top‑25 apparel-first)

Scorecard file:
- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/scorecard.csv`

## Column meanings

- `store` / `url` / `niche` / `archetype` — identifiers (don’t change unless the store changes).
- `device` — `desktop` or `mobile` (one row per device).
- `auditor` — who did the audit (short name).
- `session_id` — optional; use a timestamp-like id for a batch session (example: `2025-12-31-am`).
- `blocked` — optional; set to `yes` if bot protection or forced blocks prevented completing the flow.

### Scoring fields (0–5)

Fill these only when you actually audited that part of the funnel:
- `discovery_score`
- `pdp_confidence_score`
- `cart_score`
- `checkout_score`
- `post_purchase_returns_score`

Rules:
- Use whole or half points (e.g. `3`, `3.5`, `4`).
- Leave blank if you couldn’t evaluate (then add a note).

### Narrative fields (recommended once scored)

Once you add scores for a row, also fill:
- `top_3_patterns` — short list; specific patterns
- `top_3_pitfalls` — short list; specific friction points
- `evidence_links` — links to screenshots and/or doc anchors
- `notes` — anything special (region, gating, membership, etc.)

## Validate

```bash
python3 .blackbox/scripts/research/validate_audit_scorecard.py \
  --csv 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/scorecard.csv
```

