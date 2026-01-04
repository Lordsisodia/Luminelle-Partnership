# Evidence Extract — Bolt

- slug: `bolt`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/bolt.html`
- title: Get the Bolt SuperApp
- description: Bolt lets you send, spend, and manage your cash and crypto and more—all in one place.

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-checkout.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-checkoutos.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-conversions.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-help.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-platform.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-pricing.html`

## Variant details (signal)

### bolt-checkout.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-checkout.html`
- title: Bolt | Meet Bolt Checkout
- description: Backed by 10+ years of innovation, Bolt blends UX, conversion tools, and an 80M+ shopper network to boost revenue.

### bolt-checkoutos.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-checkoutos.html`

### bolt-conversions.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-conversions.html`
- title: Bolt | Improve Conversions
- description: Get shoppers  to the finish line: Bolt One-Click Checkout converts more shoppers  into buyers compared to guest checkout.

### bolt-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-docs.html`

### bolt-help.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-help.html`
- title: Bolt Merchant Help
- description: Documentation Bolt Checkout

### bolt-platform.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-platform.html`

### bolt-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-pricing.html`
- title: Bolt | Pricing

# Tranche 07 Deep Dive — Payments / checkout ops (Analyst notes)

## 3 notable features (evidence-first)

1) Checkout positioning combines UX + conversion tools + an “80M+ shopper network” to boost revenue.
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-checkout.html` (meta description).

2) “One-click checkout” is explicitly framed as a conversion lift over guest checkout.
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-conversions.html` (meta description).

3) Merchant help / documentation is a first-class surface (“Bolt Merchant Help” / “Documentation Bolt Checkout”).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-help.html` (title + description).

## 2 workflows worth copying (step-by-step)

### Workflow A — Launch one-click checkout (merchant + dev)

1) Adopt Bolt Checkout as the checkout surface.
2) Use merchant help/docs to implement the checkout integration.
3) Validate checkout UX and go live.
4) Measure conversion lift vs guest checkout baseline (explicitly positioned as the success metric).

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-checkout.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-help.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-conversions.html`

### Workflow B — Conversion optimization loop (growth ops)

1) Compare one-click checkout performance vs guest checkout.
2) Iterate checkout configuration and conversion tools.
3) Repeat as an ongoing CRO program.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/bolt-conversions.html`

## 3 “steal ideas” (easy/medium/hard)

- Easy: make “one-click checkout vs guest checkout” the default benchmark framing (merchant-friendly metric).
- Medium: ship a checkout integration that bundles UX + conversion tooling rather than forcing merchants to stitch multiple apps.
- Hard: a large-scale shopper network that reduces friction across stores (cross-merchant identity / saved checkout state).

## Evidence notes / gaps

- Bolt’s homepage snapshot is consumer-app framed (“Bolt SuperApp”), while merchant checkout evidence lives on `/checkout` + merchant help pages; use those variant snapshots as the durable tranche‑07 evidence base.
