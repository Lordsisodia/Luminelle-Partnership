# Evidence Extract — Loop Returns

- slug: `loop-returns`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/loop-returns.html`
- title: Returns Management for Ecommerce Brands
- description: Loop is the returns management software that helps ecommerce brands save time and money, retain more revenue, and drive customer loyalty. Book a demo today.

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-product.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-shopify-app-store.html`

## Variant details (signal)

### loop-returns-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-blog.html`

### loop-returns-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-docs.html`
- title: Loop Returns
- description: Loop is the returns management software that helps ecommerce brands save time and money, retain more revenue, and drive customer loyalty. Book a demo today.

### loop-returns-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-features.html`

### loop-returns-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-pricing.html`
- title: Pricing | Loop Returns
- description: Browse Loop's different pricing plans to see which plan offers the right returns management solution for your ecommerce business.

### loop-returns-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-product.html`
- title: Loop Returns
- description: Loop is the returns management software that helps ecommerce brands save time and money, retain more revenue, and drive customer loyalty. Book a demo today.

### loop-returns-shopify-app-store.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-shopify-app-store.html`
- title: Loop Returns & Exchanges - Shopify Post-Purchase Software | Shopify App Store
- description: Loop helps 5,000+ Shopify brands manage returns, exchanges, tracking, and the entire post-purchase experience easily and without breaking the bank.

---

# Tranche 01 Deep Dive — Returns / Exchanges (Analyst notes)

## 3 notable features (evidence-first)

1) No‑code “Workflows” to customize return policy + flows (rules/outcomes).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/loop-returns.html` (contains a “Workflows” section with no‑code editor + rules by product/customer/order/return attributes).

2) Exchange-first mechanics (incl. “Instant exchange”).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-shopify-app-store.html` (Shopify App Store listing includes “Instant exchange” and other return-management features).

3) Fraud gates + manual review before issuing refunds.
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/loop-returns.html` (mentions flagging suspicious returns + triggering manual review).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-shopify-app-store.html` (Shopify App Store listing includes “Fraud prevention”).

## 2 workflows worth copying (step-by-step)

### Workflow A — Configure return policy with a rules/workflows editor (merchant admin)

1) Define the baseline policy: return window + eligible items + return reasons.
2) Create segments (VIP / first-time / high-risk) and attach different flows to each segment.
3) Configure outcomes beyond “refund” (e.g., exchange, store credit, “keep item”, “donate”) to reduce reverse logistics cost and retain revenue.
4) Add strategic friction for risk: flag suspicious returns → route to manual review before approving refund.
5) Track the outcomes as a dashboard loop (exchange %, store credit %, fraud caught, time-to-refund) and iterate on rules.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/loop-returns.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-shopify-app-store.html`

### Workflow B — Exchange-first self‑serve return flow (shopper → ops)

1) Shopper starts return in a self‑service portal (order lookup).
2) Shopper selects items + reason codes.
3) Offer exchange-first paths (instant exchange / variant exchange) before refund.
4) If refund: route to original payment or store credit (depending on policy/rules).
5) Generate return label / drop-off instructions and keep customer notified.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/loop-returns-shopify-app-store.html`

## 3 “steal ideas” (easy/medium/hard)

- Easy: prebuilt “return policy templates” + a no‑code rules UI for merchants.
- Medium: a dedicated “fraud review queue” (flag → evidence → approve/deny) that plugs into the refund step.
- Hard: instant exchanges with inventory reservation + swap logistics (strong coupling to OMS/warehouse + customer comms).

## Evidence notes / gaps

- Some Loop marketing subpages appear to resolve to redirects/404 shells in our snapshots (`loop-returns-features.html`, `loop-returns-product.html`, `loop-returns-docs.html`). Prefer the homepage + pricing + Shopify App Store snapshots above when citing features/pricing.
