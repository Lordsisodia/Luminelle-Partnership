# E-commerce Funnel Audit (Template)

Store:
- Name: Universal Standard
- URL: https://www.universalstandard.com
- Niche: Inclusive womenswear
- Price point:
- Archetype: DTC brand

Audit date:
- YYYY-MM-DD

Device / context:
- Desktop:
- Mobile:
- Region (if relevant):

## Desk research preflight (auto)

<!-- PRE-FLIGHT:BEGIN -->

This section is auto-generated from Black Box snapshot runs to make the manual audit faster.
Treat it as triage (tooling + target URL list), not as UX truth.

Sources:
- batch-01: targets `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/targets/batch-01-urls.txt`
- batch-02: targets `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/targets/batch-02-urls.txt`
- batch-03: targets `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/targets/batch-03-urls.txt`
- batch-01: rollup `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-01-store-rollup.csv`
- batch-02: rollup `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-02/batch-02-store-rollup.csv`
- batch-03: rollup `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-03/batch-03-store-rollup.csv`
- batch-01: summary `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-01-snapshots-summary.csv`
- batch-02: summary `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-02/batch-02-snapshots-summary.csv`
- batch-03: summary `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-03/batch-03-snapshots-summary.csv`

Bot defense (from HTML snapshots): 0/6 pages blocked (~0%).

Target URLs (use these to speed-run the funnel):
- help_support: `https://www.universalstandard.com/pages/help-center` (batch-02)
- home: `https://www.universalstandard.com` (batch-02)
- pdp: `https://www.universalstandard.com/products/lou-high-rise-barrel-leg-jeans-princeton-blue` (batch-02)
- plp: `https://www.universalstandard.com/collections/new` (batch-02)
- returns: `https://www.universalstandard.com/pages/help-center?hcUrl=%2Fen-US%2Fwhat-is-your-return-and-exchange-policy-for-a-domestic-order-389722` (batch-02)
- size_fit: `https://www.universalstandard.com/pages/fit-liberty-faq` (batch-02)

Detected tooling / signals (union across snapshots):
- platform: magento, shopify
- reviews: okendo, yotpo
- support: gorgias
- tracking: gtm
- ux_keywords: free_shipping, gift_cards, newsletter_signup, returns_exchanges, size_fit, sustainability

<!-- PRE-FLIGHT:END -->

## Snapshot notes (non-visual; evidence-backed)

Use these as “what to verify visually” when doing the screenshot audit. HTML snapshots do not execute client-side JS.

- Fit/size guidance includes a dedicated “Fit Liberty FAQ” page (first-class navigation destination):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-size-fit.html`
- Returns/exchanges appear to route to a Happy Returns portal (`universalstandard.happyreturns.com`), including a “Fit Liberty Exchange” link:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-returns.html`
- Cross-border commerce tooling is present (Global‑e scripts/pixel configuration is embedded):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-returns.html`
- Support/help center tooling is present (Gorgias help center loader script):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-returns.html`
- Experimentation appears explicitly configured via `pickedConfig` experiments (e.g., “Sticky add to cart experience”, “Free shipping experience”, “Size selector experience”):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-size-fit.html`

## Quick verdict

- What this store does *better than most*:
- Where conversion friction shows up:
- What we should copy (top 3):
  1)
  2)
  3)
- What we should avoid (top 3):
  1)
  2)
  3)

## Funnel notes

### 1) Homepage (entry + merchandising)
- First impression / value prop clarity:
- “Where do I start?” entry points:
- Promos / shipping / returns visibility:
- Search presence & quality:
- Screenshot links:

### 2) PLP (collection/search results)
- Filters (size/color/price/occasion/fabric/fit):
- Sort options:
- Card design (what’s visible without clicking):
- Quick-add behavior:
- Screenshot links:

### 3) PDP (confidence builders)
- Media (zoom, video, UGC):
- Fit guidance:
- Size guide UX:
- Fabric/care clarity:
- Reviews UX (filters, photos):
- Shipping/returns visibility:
- Cross-sell modules (complete the look / alternatives / recently viewed):
- Screenshot links:

### 4) Cart
- Cart type (drawer vs page):
- Edit controls (variant/qty/remove):
- Promo code UX:
- Shipping threshold messaging:
- Upsell behavior (helpful vs intrusive):
- Screenshot links:

### 5) Checkout
- Express checkout (Shop Pay / Apple Pay / Google Pay):
- BNPL (Afterpay/Klarna/Affirm):
- Delivery estimate clarity:
- Trust cues:
- Screenshot links:

### 6) Post‑purchase / returns
- Order tracking UX:
- Returns/exchanges UX:
- Store credit incentives:
- Screenshot links:

## Scorecard (0–5)

Use the rubric:
- `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/manual-funnel-audit-rubric.md`

- Discovery & merchandising:
- PDP confidence:
- Cart UX:
- Checkout friction & trust:
- Post‑purchase & returns:

Weighted score (optional):

## Evidence index

| page | screenshot | note |
|---|---|---|
| homepage |  |  |
| plp |  |  |
| pdp |  |  |
| cart |  |  |
| checkout |  |  |
