# Evidence Extract — Shippo

- slug: `shippo`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/shippo.html`
- title: Best Multi-Carrier Shipping Software for Businesses | Shippo

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-product.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-shipping-api.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-shopify-app-store.html`

## Variant details (signal)

### shippo-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-blog.html`
- title: E-commerce Shipping Blog | Shippo

### shippo-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-docs.html`
- title: About the Shippo API
- description: The shipping layer of the internet.

### shippo-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-features.html`
- title: Shipping Solutions - Print Labels, Compare Rates, Track Packages

### shippo-home.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-home.html`
- title: Best Multi-Carrier Shipping Software for Businesses | Shippo

### shippo-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-pricing.html`
- title: Shipping Software Pricing - Compare Shippo Pricing Plans

### shippo-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-product.html`
- title: Not Found

### shippo-shipping-api.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-shipping-api.html`
- title: About the Shippo API
- description: The shipping layer of the internet.

### shippo-shopify-app-store.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-shopify-app-store.html`
- title: Shippo ‑ Simplified Shipping - Simplify shipping, save, and grow your business | Shopify App Store
- description: Shippo is the leading shipping platform for modern e-commerce, helping merchants ship faster while saving up to 90% across top carriers. Manage eve...

---

# Tranche 02 Deep Dive — Shipping ops / labels / rate shopping (Analyst notes)

## 3 notable features (evidence-first)

1) Multi-carrier shipping platform framing (labels + rate shopping + tracking).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-features.html`

2) Shipping API + developer docs (“shipping layer of the internet” posture).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-docs.html`
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-shipping-api.html`

3) Merchant-facing plan packaging with explicit label volume tiers + “connect your own carrier accounts”.
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-shopify-app-store.html` (Starter “up to 30 labels/month”; Professional “up to 10K labels/mo”; “connect your own carrier accounts”; “free 30-day trial”).

## 2 workflows worth copying (step-by-step)

### Workflow A — Shipping setup + daily label loop (merchant admin)

1) Connect Shopify store and import orders.
2) Connect carrier accounts (or use platform rates).
3) Configure package presets + service defaults.
4) Buy/print labels in batches.
5) Send tracking updates and handle returns labels as needed.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-shopify-app-store.html`

### Workflow B — API-first shipping primitives (developer / platform team)

1) Use Shippo API for rates + label purchase.
2) Store label + tracking identifiers in your order system.
3) Provide customer tracking experience (in-product and/or via branded tracking pages).
4) Reconcile refunds/cancellations as an ops flow.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shippo-docs.html`

## 3 “steal ideas” (easy/medium/hard)

- Easy: pricing that scales by label volume with a clear free tier (“up to N labels/mo”) to reduce adoption friction.
- Medium: “connect your own carrier accounts” as a first-class setup step (keeps enterprise migration possible).
- Hard: shipping API reliability + carrier normalization across many carriers + refund/cancel lifecycle edge cases.

