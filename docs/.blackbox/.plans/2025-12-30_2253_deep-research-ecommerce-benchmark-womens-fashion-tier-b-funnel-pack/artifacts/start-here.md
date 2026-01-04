# Start Here — Women’s Fashion E‑commerce Benchmark (Tier‑B + Tier‑A enablement)

## What this plan folder is

- A Blackbox plan run that captures **Tier‑B evidence** (static HTML snapshots) for the women’s fashion **Top‑25 apparel-first** set and scaffolds a **Tier‑A screenshot audit workflow**.
- Goal: produce “who to copy” references + a conversion backlog that is **evidence-linked**, not opinion-driven.

## Where to look first (single pane of glass)

- Benchmark hub: `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`
- Executive summary: `05-planning/research/market-intelligence/ecommerce-benchmarking/EXECUTIVE-SUMMARY.md`
- Top‑25 audit dashboard (Tier‑A workflow): `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md`
- MVP backlog Top‑10: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-mvp-backlog-top10.md`

## Evidence artifacts (this plan folder)

- Funnel snapshots (Tier‑B): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/`
- Funnel patterns note: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-patterns.md`
- Cart/checkout supplement (Tier‑B): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-cart-checkout-patterns.md`

## How to continue (high-ROI)

- Tier‑A screenshots are the next bottleneck (cart + checkout UI is interactive/session-gated).
- Use the audit dashboard + ROI map to pick stores, capture screenshots into:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/<store-slug>/`
- Then run postprocess (see dashboard for copy/paste commands):
  - `.blackbox/scripts/research/postprocess_store_audit.py`
  - `.blackbox/scripts/research/postprocess_batch_audits.py`

