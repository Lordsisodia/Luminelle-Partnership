# E-commerce Funnel Audit (Template)

Store:
- Name: Sweaty Betty
- URL: https://www.sweatybetty.com
- Niche: Women’s activewear
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
- top25-apparel: targets `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifact-seeds/womens-top25-apparel-funnel-seeds.txt`
- top25-apparel-cartcheckout: targets `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifact-seeds/womens-top25-apparel-cart-checkout-seeds.txt`
- top25-apparel: rollup `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-store-rollup.csv`
- top25-apparel-cartcheckout: rollup `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-cart-checkout-store-rollup.csv`
- top25-apparel: summary `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-summary.csv`
- top25-apparel-cartcheckout: summary `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-cart-checkout-summary.csv`

Bot defense (from HTML snapshots): 0/3 pages blocked (~0%).

Target URLs (use these to speed-run the funnel):
- collection: `https://www.sweatybetty.com/shop/edits/trending-now?limit=24&refine=c_size%3DXXS&sort=best-matches` (top25-apparel)
- cart: `https://www.sweatybetty.com/cart` (top25-apparel-cartcheckout)
- checkout: `https://www.sweatybetty.com/checkout` (top25-apparel-cartcheckout)

Detected tooling / signals (union across snapshots):
- platform: magento
- bnpl: afterpay, klarna
- reviews: bazaarvoice
- returns: narvar
- search_personalization: algolia, dynamic_yield
- tracking: ga, gtm, meta_pixel, tiktok_pixel
- ux_keywords: gift_cards, loyalty_rewards, newsletter_signup, returns_exchanges, size_fit, sustainability

<!-- PRE-FLIGHT:END -->

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
