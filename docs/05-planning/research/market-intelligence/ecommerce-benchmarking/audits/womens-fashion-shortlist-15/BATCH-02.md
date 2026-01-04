---
status: draft
last_reviewed: 2025-12-29
owner: growth
---

# Batch 02 — Manual Audit Queue (fit confidence + resale/rental + luxury)

Batch 02 is designed to broaden our benchmark beyond “premium DTC apparel” into:
- **fit-first lingerie** (conversion = sizing confidence + returns clarity)
- **inclusive sizing** (conversion = size system trust + UX clarity)
- **swimwear** (conversion = coverage framing + model info + returns economics)
- **athleisure** (conversion = merchandising + trust cues + potentially bot-protected)
- **rental/subscription** (conversion = membership framing + inventory discovery)
- **luxury marketplace** (conversion = trust + returns + logistics + discovery)

## Desk research (already captured)

Targets + HTML snapshots:
- Batch 02 target URLs: `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/targets/batch-02-urls.txt`
- Batch 02 snapshot folder: `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/`

Automated tooling signals (triage only):
- Per-page signals: `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-02/batch-02-snapshots-summary.csv`
- Store rollup: `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-02/batch-02-store-rollup.csv`
- Findings note (by store): `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-02/batch-02-findings-by-store.md`

Notable signals to validate manually (PDP/cart/checkout):
- **ThirdLove**: BNPL (Afterpay + Klarna), upsell/personalization (Rebuy), returns tooling (Loop Returns), heavy reviews stack
- **Summersalt**: returns tooling (Loop Returns), on-site search (Searchspring)
- **Universal Standard**: support tooling (Gorgias), inclusive sizing + Fit Liberty mechanics
- **Alo Yoga**: appears partially bot-protected on some pages (treat as “manual-only”)
- **Rent the Runway**: membership/subscription conversion mechanics (not BNPL-driven)
- **Mytheresa**: luxury trust/logistics UX (note: some pages may be dynamic)

## What to do (per store)

For each store, do both **desktop** + **mobile**:
1) Homepage → PLP (category) → PDP (best-seller) → cart → checkout start → shipping/returns/size guide
2) Capture screenshots following the checklist:
   - `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/CHECKLIST.md`
3) Fill the store audit doc:
   - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/<store>.md`
4) Fill the scorecard rows (desktop + mobile):
   - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`

Tip:
- For bot-protected pages (Alo, some marketplaces), prioritize:
  - size/fit guidance
  - returns/exchanges clarity
  - cart friction + checkout start (if reachable)
  - and log “blocked” in the scorecard rows if needed

