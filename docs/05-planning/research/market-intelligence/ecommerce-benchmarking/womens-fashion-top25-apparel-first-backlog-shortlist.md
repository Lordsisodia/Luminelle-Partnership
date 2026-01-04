---
status: draft
last_reviewed: 2025-12-31
owner: growth
---

# Women’s Fashion Top‑25 (apparel-first) — Backlog Shortlist (evidence-led)

Goal: turn the Top‑25 apparel-first Tier‑B evidence into a **prioritized build shortlist** (what to implement first, and which stores prove it matters).

Primary evidence (Tier‑B):
- Patterns note (prevalence + examples): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-patterns.md`
- Cart/checkout prevalence (express checkout signals): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-cart-checkout-patterns.md`
- Checkout signal triage (rank stores for Tier‑A checkout screenshots): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-checkout-signal-triage.md`
- Per-page summary: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-summary.csv`
- Snapshots dir: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel`

Backlog mapping (source of truth for feature names/acceptance):
- `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

Important: Tier‑B evidence is static HTML; cart/checkout interaction patterns require Tier‑A screenshots to confirm.

## Vendor prevalence (store-level)

### Returns / portal tooling

- **narvar** — 6/25 stores
- **loop_returns** — 6/25 stores
- **happy_returns** — 1/25 stores

### Reviews tooling

- **yotpo** — 10/25 stores
- **okendo** — 9/25 stores
- **bazaarvoice** — 7/25 stores
- **trustpilot** — 6/25 stores

### BNPL

- **afterpay** — 17/25 stores
- **klarna** — 15/25 stores
- **affirm** — 3/25 stores
- **zip** — 1/25 stores

### Search / personalization

- **nosto** — 6/25 stores
- **rebuy** — 3/25 stores
- **dynamic_yield** — 3/25 stores
- **algolia** — 2/25 stores
- **searchspring** — 1/25 stores

### Checkout / express pay (cart + checkout entry points)

- **express_checkout_any** — 22/25 stores
- **paypal** — 20/25 stores
- **apple_pay** — 19/25 stores
- **shop_pay** — 11/25 stores
- **accelerated_checkout** — 11/25 stores
- Note: this is Tier‑B (HTML) signal only; Tier‑A screenshots required to confirm placement above the fold.
- Evidence: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-cart-checkout-patterns.md`

## Backlog shortlist (Top‑25 evidence → what to build)

### 1) Returns portal (exchange-first posture)
- Why: reduces purchase anxiety, protects margin (exchanges/store credit), lowers support load.
- Vendor signal: **loop_returns** — 6/25 stores
- Evidence examples:
  - Andie Swim (returns) — https://andieswim.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-returns.html`
  - LoveShackFancy (returns) — https://www.loveshackfancy.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-returns.html`
  - ThirdLove (returns) — https://www.thirdlove.com/pages/returns-center — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-returns.html`
- Tier‑A screenshots (proof-grade):
  - ThirdLove returns center — https://www.thirdlove.com/pages/returns-center — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__post-purchase__returns-portal__20251231.png`
  - Andie Swim returns/exchange entry — https://andieswim.com/pages/returns — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__post-purchase__returns-portal__20251231.png`
- Vendor signal: **narvar** — 6/25 stores
- Evidence examples:
  - Eloquii (product) — https://www.eloquii.com/products/eloquii-e-gift-cards/5000078.html — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-eloquii-product.html`
  - Frankies Bikinis (product) — https://frankiesbikinis.com/products/gift-card — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-product.html`
  - Uniqlo (product) — https://www.uniqlo.com/us/en/products/E445174-000/00 — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-uniqlo-product.html`
- Vendor signal: **happy_returns** — 1/25 stores
- Evidence examples:
  - Eloquii (support) — https://www.eloquii.com/help-page?cid=sa-custservice-returnexchange — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-eloquii-support.html`
- Backlog rows: see **Self-serve returns portal** and **Self‑serve returns center** in `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

### 2) Reviews + UGC that answers fit doubt
- Why: generic ratings don’t resolve “will this fit me?”; photo + fit-context reviews reduce doubt and returns.
- Vendor signal: **yotpo** — 10/25 stores
- Evidence examples:
  - LoveShackFancy (returns) — https://www.loveshackfancy.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-returns.html`
  - Montce Swim (returns) — https://www.montce.com/pages/return-policy — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-montce-swim-returns.html`
  - Pink Blush Maternity (returns) — https://www.pinkblushmaternity.com/pages/return-policy — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-pink-blush-maternity-returns.html`
- Vendor signal: **okendo** — 9/25 stores
- Evidence examples:
  - Andie Swim (returns) — https://andieswim.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-returns.html`
  - SKIMS (returns) — https://skims.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-skims-returns.html`
  - Andie Swim (product) — https://andieswim.com/products/the-amalfi-flat-black-classic — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-product.html`
- Vendor signal: **bazaarvoice** — 7/25 stores
- Evidence examples:
  - Alo Yoga (returns) — https://www.aloyoga.com/pages/returns-support — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-alo-yoga-returns.html`
  - Uniqlo (product) — https://www.uniqlo.com/us/en/products/E445174-000/00 — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-uniqlo-product.html`
  - Anthropologie (collection) — https://www.anthropologie.com/new-clothes — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-anthropologie-collection.html`
- Vendor signal: **trustpilot** — 6/25 stores
- Evidence examples:
  - Montce Swim (returns) — https://www.montce.com/pages/return-policy — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-montce-swim-returns.html`
  - Pink Blush Maternity (returns) — https://www.pinkblushmaternity.com/pages/return-policy — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-pink-blush-maternity-returns.html`
  - ThirdLove (returns) — https://www.thirdlove.com/pages/returns-center — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-returns.html`
- Backlog row: **Reviews filterable by fit** in `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

### 3) Conditional BNPL messaging (when AOV warrants)
- Why: can lift conversion for higher AOV carts; should be conditional to avoid clutter and compliance risk.
- Vendor signal: **afterpay** — 17/25 stores
- Evidence examples:
  - Alo Yoga (returns) — https://www.aloyoga.com/pages/returns-support — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-alo-yoga-returns.html`
  - Andie Swim (returns) — https://andieswim.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-returns.html`
  - Frankies Bikinis (returns) — https://frankiesbikinis.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-returns.html`
- Vendor signal: **klarna** — 15/25 stores
- Evidence examples:
  - Frankies Bikinis (returns) — https://frankiesbikinis.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-returns.html`
  - Ganni (returns) — https://www.ganni.com/en-vn/help-and-information/returns.html — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-returns.html`
  - Montce Swim (returns) — https://www.montce.com/pages/return-policy — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-montce-swim-returns.html`
- Vendor signal: **affirm** — 3/25 stores
- Evidence examples:
  - Eloquii (product) — https://www.eloquii.com/products/eloquii-e-gift-cards/5000078.html — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-eloquii-product.html`
  - Anthropologie (collection) — https://www.anthropologie.com/new-clothes — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-anthropologie-collection.html`
  - Eloquii (collection) — https://www.eloquii.com/zq/new/?ICID=NB|40OFF|CTA1|6-5-2023 — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-eloquii-collection.html`
- Vendor signal: **zip** — 1/25 stores
- Evidence examples:
  - Andie Swim (returns) — https://andieswim.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-returns.html`
  - Andie Swim (product) — https://andieswim.com/products/the-amalfi-flat-black-classic — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-product.html`
  - Andie Swim (collection) — https://andieswim.com/collections/new-arrivals — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-collection.html`
- Backlog row: **Conditional BNPL messaging** in `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

### 4) Personalization + cross-sell that feels helpful
- Why: increases AOV and reduces decision fatigue (complete-the-set, recommended items, recently viewed).
- Vendor signal: **nosto** — 6/25 stores
- Evidence examples:
  - Andie Swim (returns) — https://andieswim.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-returns.html`
  - Frankies Bikinis (returns) — https://frankiesbikinis.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-returns.html`
  - LoveShackFancy (returns) — https://www.loveshackfancy.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-returns.html`
- Vendor signal: **dynamic_yield** — 3/25 stores
- Evidence examples:
  - LoveShackFancy (returns) — https://www.loveshackfancy.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-returns.html`
  - SKIMS (returns) — https://skims.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-skims-returns.html`
  - LoveShackFancy (product) — https://www.loveshackfancy.com/products/harbor-bikini-lw092-3026 — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-product.html`
- Vendor signal: **rebuy** — 3/25 stores
- Evidence examples:
  - LoveShackFancy (returns) — https://www.loveshackfancy.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-returns.html`
  - LoveShackFancy (product) — https://www.loveshackfancy.com/products/harbor-bikini-lw092-3026 — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-product.html`
  - Negative Underwear (product) — https://negativeunderwear.com/products/sand-whipped-travel-wrap — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-negative-underwear-product.html`
- Vendor signal: **algolia** — 2/25 stores
- Evidence examples:
  - SKIMS (returns) — https://skims.com/pages/returns — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-skims-returns.html`
  - SKIMS (product) — https://skims.com/products/cotton-jersey-long-sleeve-t-shirt-marble — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-skims-product.html`
  - SKIMS (collection) — https://skims.com/collections/new-arrivals — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-skims-collection.html`
- Vendor signal: **searchspring** — 1/25 stores
- Evidence examples:
  - Pink Blush Maternity (returns) — https://www.pinkblushmaternity.com/pages/return-policy — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-pink-blush-maternity-returns.html`
  - Pink Blush Maternity (collection) — https://www.pinkblushmaternity.com/collections/maternity-whats-new — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-pink-blush-maternity-collection.html`
  - Pink Blush Maternity (shipping) — https://www.pinkblushmaternity.com/pages/shipping — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-pink-blush-maternity-shipping.html`
- Backlog rows: **PDP complete-the-set cross-sell** and **Search relevance + merchandising rules** in `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

### 5) Demand capture loops (wishlist + back‑in‑stock)

- Why: women’s fashion has high “browse now / decide later” behavior and frequent stockouts; capturing soft intent prevents losing demand to comparison shopping.
- Evidence examples (Tier‑B signals; validate UX placement in Tier‑A):
  - Ganni (wishlist entry point + wishlist analytics events present in HTML) — https://www.ganni.com/en-vn/help-and-information/returns.html — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-returns.html`
  - Triangl (wishlist link/components present in header) — https://triangl.com/pages/faqs — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-triangl-support.html`
  - Frankies Bikinis (Klaviyo BIS modal copy present) — https://frankiesbikinis.com/pages/fit-guide — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-sizing.html`
  - Frankies Bikinis (“back in stock” collection link in nav) — https://frankiesbikinis.com/pages/shipping — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-shipping.html`
- Backlog rows: **Wishlist / saved items** and **PDP back‑in‑stock waitlist** in `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
- Pattern cards:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-wishlist-saved-items.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-back-in-stock-waitlist.md`

### 6) Tier‑A-required (cart + checkout friction removal)
- These patterns are high-impact but cannot be proven from Tier‑B HTML alone (interactive UI).
- Use the Top‑25 audit workflow + postprocess to capture and apply evidence: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md`
- Backlog rows: **Cart variant editing**, **Cart shipping threshold messaging**, and **Checkout express + trust** in `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
- Tier‑B evidence examples for cart threshold messaging (still validate UX in Tier‑A):
  - Carbon38 cart threshold + progress: https://carbon38.com/en-vn/cart — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-carbon38-cart.html`
  - ThirdLove cart threshold templates: https://www.thirdlove.com/cart — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-cart.html`
- Tier‑B (cart/checkout entry) signal: express checkout is close to table-stakes in this cohort (22/25 stores):
  - Andie Swim (checkout) — https://andieswim.com/checkout — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-checkout.html`
  - LoveShackFancy (checkout) — https://www.loveshackfancy.com/checkout — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-checkout.html`
  - ThirdLove (checkout) — https://www.thirdlove.com/checkout — `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-checkout.html`

Tier‑A proof captured (example):

Tier‑A proof captured (cart threshold examples):
- Carbon38 cart threshold messaging — https://www.carbon38.com/cart — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__cart__shipping-threshold__20251231.png`
- ThirdLove cart threshold cue — https://www.thirdlove.com/cart — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__cart__shipping-threshold__20251231.png`

Tier‑A proof status (cart variant editing):
- Still pending for “proof-grade” evidence (an actual in-cart size/color swap UI). Current captures mostly show variant details + qty/remove controls; see pattern card: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-variant-editing.md`

Tier‑A proof captured (delivery estimate examples):
- Andie Swim shipping methods (standard + expedited windows shown) — https://andieswim.com/cart/30701508821062:1?checkout — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__delivery-estimate__20251231.png`
- STAUD shipping methods (shipping method + duties/taxes messaging) — https://www.staud.clothing/cart/44883417071789:1?checkout — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/staud/staud__desktop__checkout__delivery-estimate__20251231.png`
- Andie Swim checkout (express buttons above fold) — https://andieswim.com/cart/30701508821062:1?checkout — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__express-buttons__20251231.png`
- Recommended Tier‑A screenshot targets for checkout UX validation (highest signal density first):
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-checkout-signal-triage.md`
