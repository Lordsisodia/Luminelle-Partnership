# E-commerce Funnel Audit (Template)

Store:
- Name: Ganni
- URL: https://www.ganni.com
- Niche: Contemporary womenswear
- Price point:
- Archetype: Legacy retail

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

Bot defense (from HTML snapshots): 0/7 pages blocked (~0%).

Target URLs (use these to speed-run the funnel):
- cart_or_checkout: `https://www.ganni.com/en-vn/cart` (batch-03)
- help_support: `https://www.ganni.com/en-vn/legal/help-information.html` (batch-03)
- home: `https://www.ganni.com` (batch-03)
- plp: `https://www.ganni.com/en-vn/new-in/` (batch-03)
- returns: `https://www.ganni.com/en-vn/help-and-information/returns.html` (batch-03)
- shipping: `https://www.ganni.com/en-vn/help-and-information/delivery.html` (batch-03)
- size_fit: `https://www.ganni.com/en-vn/extended-sizes/` (batch-03)

Detected tooling / signals (union across snapshots):
- platform: magento
- bnpl: klarna
- support: zendesk
- tracking: ga, gtm
- ux_keywords: free_shipping, gift_cards, newsletter_signup, returns_exchanges, size_fit, store_locator, sustainability

<!-- PRE-FLIGHT:END -->

## Snapshot notes (non-visual; evidence-backed)

Use these as “what to verify visually” when doing the screenshot audit. HTML snapshots do not execute client-side JS.

- Klarna is explicitly wired into the mini cart experience (placement test class names present):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-home.html`
- Klarna placement markup exists on the cart/checkout page:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-cart-or-checkout.html`
- “Gifts” is a top-level nav destination and appears in analytics promotion tracking payloads:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-home.html`
- Instrumentation is unusually detailed (explicit event names for size guide, filters, mini cart, begin checkout, etc.):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-home.html`

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
