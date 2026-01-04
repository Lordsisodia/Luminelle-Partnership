# Evidence Extract — ShipBob

- slug: `shipbob`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/shipbob.html`
- title: Global Ecommerce Fulfillment Solution | ShipBob
- description: Ecommerce fulfillment across all channels. ShipBob empowers businesses to scale, offer 2-day shipping, and manage inventory and shipments.

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-ecommerce-fulfillment.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-fulfillment-services.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-product.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-shopify-integration.html`

## Variant details (signal)

### shipbob-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-blog.html`
- title: Blog Archive - ShipBob

### shipbob-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-docs.html`
- title: Page not found - ShipBob

### shipbob-ecommerce-fulfillment.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-ecommerce-fulfillment.html`
- title: Ecommerce Fulfillment 101: Definition + How the Fulfillment Process Works
- description: Learn about ecommerce fulfillment services from ShipBob, the #1 order fulfillment company for growing DTC brands.

### shipbob-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-features.html`
- title: Page not found - ShipBob

### shipbob-fulfillment-services.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-fulfillment-services.html`
- title: Page not found - ShipBob

### shipbob-home.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-home.html`
- title: Global Ecommerce Fulfillment Solution | ShipBob
- description: Ecommerce fulfillment across all channels. ShipBob empowers businesses to scale, offer 2-day shipping, and manage inventory and shipments.

### shipbob-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-pricing.html`
- title: ShipBob Pricing: ShipBob's Outsourced Fulfillment Service Costs
- description: Learn about ShipBob's core fulfillment fees when you outsource fulfillment, and request a customized pricing quote.

### shipbob-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-product.html`
- title: ShipBob's Product: Tech, Fulfillment Services, & Warehouses
- description: ShipBob combines best-in-class fulfillment services and technology across our network of warehouses to manage inventory and ship products.

---

# Tranche 04 Deep Dive — Fulfillment / 3PL ops (Analyst notes)

## 3 notable features (evidence-first)

1) Clear “scale + 2-day shipping” fulfillment positioning plus explicit inventory + shipments management.
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/shipbob.html` (meta description).

2) Product = “network of warehouses + technology” (control-plane + physical ops bundle).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-product.html` (meta description).

3) Pricing posture: core fulfillment fees + request customized quote (enterprise-style packaging signal).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-pricing.html` (meta description).

## 2 workflows worth copying (step-by-step)

### Workflow A — Shopify → 3PL fulfillment onboarding (merchant admin)

1) Merchant connects Shopify to the 3PL platform.
2) Product catalog + inventory sync is established (so orders can flow automatically).
3) Merchant ships inventory to the fulfillment network / warehouses.
4) Orders flow in from Shopify; 3PL executes pick/pack/ship.
5) Merchant monitors inventory + shipments in the ops dashboard and iterates on service levels (e.g., faster shipping).

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-shopify-integration.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/shipbob.html`

### Workflow B — Daily fulfillment ops loop (merchant + ops)

1) Monitor shipments status + exception queues (late shipments, inventory shortages).
2) Reconcile inventory positions (receive, counts, replenishment decisions).
3) Use network + routing capabilities to maintain delivery promises (e.g., 2-day shipping).
4) Review costs vs service level and adjust packaging/shipping policies.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/shipbob.html` (inventory + shipments + “2-day shipping” framing).
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shipbob-product.html`

## 3 “steal ideas” (easy/medium/hard)

- Easy: “scale + 2-day shipping” promise anchored in a single sentence (merchant-understandable value prop).
- Medium: Shopify integration onboarding UX that makes “automation of fulfillment” the default posture (connect store → operations run).
- Hard: distributed warehouse network + reliable inventory/shipment state model (hard ops + hard software).

## Evidence notes / gaps

- Several older ShipBob variant URLs snapshot as “Page not found” (likely path drift): `shipbob-docs.html`, `shipbob-features.html`, `shipbob-fulfillment-services.html`. Prefer home + product + pricing + Shopify integration snapshots above for durable claims.
