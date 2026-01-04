# Summary

Durable insights from this run (append-only).

## 2025-12-30

- Tier‑B funnel snapshots (collection/product/policy/help pages) are a strong evidence layer for women’s fashion: 76/76 captured with 0 “blocked” detections in this pack.
- Returns tooling shows up frequently once you look beyond the homepage (Loop Returns and Narvar both appear across the pack), so “self‑serve returns” is closer to table-stakes than optional.
- Fit/size guidance is not just a PDP widget; many top stores maintain dedicated sizing/fit pages worth linking directly from PDP.
- Once Tier‑B evidence exists, creating a milestone roadmap is straightforward and avoids “random feature grab-bags”; the roadmap should be the default bridge from research → backlog.
- The Top‑25 apparel-first Tier‑B pack is now complete at 88/88 snapshots after adding manual seeds for Andie Swim + Uniqlo; Uniqlo PLP/PDP snapshots are heuristically flagged as bot-protected, so treat them as “manual audit required” for Tier‑A proof.
- The per-store rollup + patterns note turns the snapshot evidence into an actionable feature prevalence view (returns vendors, reviews vendors, BNPL prevalence) without reading 88 HTML files by hand:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-store-findings.md`
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-patterns.md`

## 2025-12-31

- Preflight tooling now supports `<prefix> <store> <stage>` seed labels end-to-end, so rollups and audit preflight injection work on the same Tier‑B seed sets (no relabeling required).
- Tier‑A is unblocked for the Top‑25 apparel-first set via a scaffolded audit folder with preflight injected for all stores:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/`
- Adding `/cart` + `/checkout` Tier‑B snapshots materially increases confidence on “checkout must-haves” before Tier‑A screenshots:
  - Express checkout signals appear in 22/25 Top‑25 stores (PayPal 20/25, Apple Pay 19/25, Shop Pay 11/25).
  - Evidence report: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-cart-checkout-patterns.md`
- The checkout signal triage + checkout-focused batch turns “Tier‑A required” into an executable queue:
  - Triage (ranked): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-checkout-signal-triage.md`
  - Batch: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-CHECKOUT.md`
- Returns portals are sufficiently prevalent (Loop + Narvar in 12/25 stores combined) to justify a dedicated Tier‑A capture batch:
  - Batch: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-RETURNS.md`
- Even without a dedicated “wishlist page” snapshot, Tier‑B HTML frequently exposes wishlist/save mechanics via header links and analytics events, which is enough to justify a reusable pattern card and backlog primitive (Tier‑A still needed for UI details):
  - Ganni wishlist link + events in: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-returns.html`
- Back‑in‑stock/waitlist tooling can be detected reliably in Tier‑B via vendor/component markers and modal copy (e.g., Klaviyo BIS), which makes it a high-confidence “demand capture” feature to spec before screenshots:
  - Frankies BIS modal copy in: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-sizing.html`
- Cart free‑shipping threshold mechanics often include both (1) explicit copy templates and (2) progress UI elements, so the critical engineering requirement is **consistency** between cart messaging and checkout eligibility rules:
  - Carbon38 threshold + progress in: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-carbon38-cart.html`
  - ThirdLove cart threshold templates in: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-cart.html`
- Once pattern cards exist, promoting them into the Top‑25 evidence-led backlog shortlist is the fastest way to keep execution aligned with evidence (prevents “feature drift” back to opinions):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`
- Tier‑A returns evidence confirms two distinct “returns UX” levels in this cohort:
  - Returns **center/portal** (order lookup + start return): ThirdLove — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__post-purchase__returns-portal__20251231.png`
  - Returns **policy + exchange/return entry CTAs** (portal likely JS/overlay): Andie Swim — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__post-purchase__returns-portal__20251231.png`
- Checkout Tier‑A screenshots confirm express buttons are genuinely “above the fold” on Shopify checkout for this cohort (not just HTML tokens):
  - Andie Swim — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__express-buttons__20251231.png`
  - Carbon38 — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__checkout__express-buttons__20251231.png`
  - ThirdLove — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__checkout__express-buttons__20251231.png`

- Delivery promises are only “provable” at the shipping method step, not at checkout entry:
  - Andie Swim shows multiple shipping methods with explicit delivery windows (standard/expedited) once address fields are filled — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__delivery-estimate__20251231.png`
  - STAUD surfaces shipping method and duties/taxes messaging at the same step — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/staud/staud__desktop__checkout__delivery-estimate__20251231.png`
  - Some stores may block headless delivery estimate capture with a Shop Pay challenge (Carbon38 evidence shows the blocker) — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__checkout__delivery-estimate__20251231.png`

- Cart Tier‑A evidence is automatable for many Shopify stores by using the `/cart/add?id=<variant>&quantity=1` endpoint and then capturing `/cart`, which removes a big manual bottleneck for cart UX patterns (threshold messaging, line-item controls).
- “Free shipping threshold” shows up in at least two UI forms in this cohort:
  - In-cart “spend X more” + progress (Carbon38 proof lives in Tier‑B cart HTML: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-carbon38-cart.html`).
  - Global/free-shipping banner surfaced while in-cart (varies by locale/currency), e.g. Alo Yoga cart — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/alo-yoga/alo-yoga__desktop__cart__shipping-threshold__20251231.png`.
- Tier‑A cart threshold examples captured (useful for UI placement references even when the exact mechanic differs by store/theme):
  - Carbon38 — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__cart__shipping-threshold__20251231.png`
  - ThirdLove — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__cart__shipping-threshold__20251231.png`
