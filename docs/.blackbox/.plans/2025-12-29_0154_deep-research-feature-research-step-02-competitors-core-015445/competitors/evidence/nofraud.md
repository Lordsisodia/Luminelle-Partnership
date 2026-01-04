# Evidence Extract — NoFraud

- slug: `nofraud`

## Homepage snapshot

- missing snapshot file (blocked/timeout)

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/nofraud-shopify-app-store.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/nofraud-shopify-search.html`

## Variant details (signal)

### nofraud-shopify-app-store.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/nofraud-shopify-app-store.html`
- title: NoFraud Fraud Protection - NoFraud - Fraud Protection for eCommerce - Fraud Prevention | Shopify App Store
- description: NoFraud is fraud protection leader for eCommerce and revenue protection. We eliminate chargebacks while approving more orders, including Shopify subscriptions.

### nofraud-shopify-search.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/nofraud-shopify-search.html`
- title: Search results for "nofraud" – Ecommerce Plugins for Online Stores – Shopify App Store
- description: Shopify App Store: customize your online store and grow your business with Shopify-approved apps for marketing, store design, fulfillment, and more.

# Tranche 06 Deep Dive — Fraud / risk / chargebacks (Analyst notes)

## 3 notable features (evidence-first)

1) Chargebacks + “approve more orders” revenue-protection framing (includes subscriptions).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/nofraud-shopify-app-store.html` (meta description).

2) Merchant-facing risk ops UI surfaces (as shown in screenshots):
   - Interactive dashboard (“Instant Insights”)
   - Transparent screening decision details
   - Custom overrides / rule creation to stop abuse
   - Subscription fraud & abuse prevention surfaced explicitly
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/nofraud-shopify-app-store.html` (screenshot alt text).

3) Handle discovery (auditability): NoFraud’s Shopify app handle is not `nofraud` — it’s `nofraud-chargeback-prevention-and-protection`.
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shopify-category-security-fraud.html` (app card handle value and link).

## 2 workflows worth copying (step-by-step)

### Workflow A — Fraud protection setup + guardrails (merchant admin)

1) Install NoFraud via Shopify App Store (correct handle).
2) Configure fraud screening defaults.
3) Add “custom overrides” (rules) to stop abuse patterns specific to the store.
4) Use the dashboard + decision details to audit false positives/negatives and iterate.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/nofraud-shopify-app-store.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shopify-category-security-fraud.html`

### Workflow B — Subscription fraud ops (retention + trust)

1) Enable subscription fraud & abuse prevention mode (surfaced in listing screenshots).
2) Monitor subscription-related disputes/abuse patterns in the dashboard.
3) Automate workflows via settings; refine overrides as abuse changes.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/nofraud-shopify-app-store.html`

## 3 “steal ideas” (easy/medium/hard)

- Easy: “transparent screening decisions” UI (why was this blocked/approved?) as a default admin primitive.
- Medium: custom override / rules UI with testing mode (so merchants can respond to abuse quickly without engineering).
- Hard: subscription-specific fraud models and workflows that account for recurring billing + account takeover patterns.

## Evidence notes / gaps

- NoFraud vendor site is Cloudflare-challenged from this environment (403 / TLS issues); treat it as `blocked_evidence` and rely on Shopify App Store + category snapshots for auditable claims.
