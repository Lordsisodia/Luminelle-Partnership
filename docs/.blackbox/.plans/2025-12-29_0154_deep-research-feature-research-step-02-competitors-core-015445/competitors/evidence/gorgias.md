# Evidence Extract — Gorgias

- slug: `gorgias`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/gorgias.html`
- title: The Conversational AI platform for Ecommerce | Gorgias

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-product.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-app-store.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-app-store-helpdesk.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-integration.html`

## Variant details (signal)

### gorgias-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-blog.html`
- title: CX & Ecommerce Content | Gorgias Blog

### gorgias-docs.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-docs.html`
- title: Not Found

### gorgias-features.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-features.html`
- title: The Conversational AI platform for Ecommerce | Gorgias

### gorgias-home.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-home.html`
- title: The Conversational AI platform for Ecommerce | Gorgias

### gorgias-pricing.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-pricing.html`
- title: Gorgias Pricing – Build the customer support suite that fits your needs

### gorgias-product.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-product.html`
- title: The Leading Customer Support Helpdesk for Ecommerce | Gorgias

### gorgias-shopify-app-store.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-app-store.html`
- title: Oh no! That page doesn’t exist.
- description: Shopify App Store: customize your online store and grow your business with Shopify-approved apps for marketing, store design, fulfillment, and more.

### gorgias-shopify-app-store-helpdesk.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-app-store-helpdesk.html`
- title: Gorgias: Helpdesk, Chat & FAQ - Gorgias | AI Customer support App for Shopify stores | Shopify App Store
- description: Resolve repetitive support inquiries with automation & AI. One helpdesk for all your support channels, with live chat & FAQ. Start your free trial today!

### gorgias-shopify-integration.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-integration.html`
- title: Sell on Shopify and support with Gorgias' helpdesk

---

# Tranche 03 Deep Dive — Support inbox + order context (Analyst notes)

## 3 notable features (evidence-first)

1) AI Agent + helpdesk suite positioned specifically for ecommerce (and explicitly lists Chat + FAQ).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/gorgias.html` (meta description mentions “AI Agent… Helpdesk… Chat, FAQ”; page also lists “Shopify integration” + “Order management”).

2) Shopify-first positioning (“helpdesk for Shopify stores”).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-integration.html` (title + description).

3) “Order management” called out as a first-class capability (support tool claims it can *do* more than reply).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/gorgias.html` (capabilities list includes “Order management”).

## 2 workflows worth copying (step-by-step)

### Workflow A — Inbox triage with embedded ecommerce context

1) Customer message arrives (email/chat/social) in a unified helpdesk inbox.
2) Agent views commerce context (store integration) and quickly identifies the underlying “order issue” vs “policy issue”.
3) Agent applies a saved response / macro (shipping ETA, returns policy, address change, etc.).
4) If needed, agent uses order tools (order management) to resolve and then replies from the same surface.
5) Close ticket; log outcome for reporting and automation tuning.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/gorgias.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-integration.html`

### Workflow B — AI Agent deflection + human handoff (guardrailed)

1) Customer asks a common question (WISMO, returns eligibility, sizing, etc.).
2) AI Agent attempts to answer using help content (FAQ) and store context.
3) If confidence is low or customer sentiment is negative, hand off to a human agent.
4) Human agent continues in the same thread with full context.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/gorgias.html` (AI Agent + FAQ called out).

## 3 “steal ideas” (easy/medium/hard)

- Easy: “Capabilities list” marketing that maps 1:1 to admin primitives (AI Agent, unified inbox, live chat, Shopify integration, order management).
- Medium: Shopify-first helpdesk onboarding that immediately anchors to order context (reduce context switching).
- Hard: AI Agent that can safely take commerce actions (requires permissions, audit trail, and reversal workflows).

## Evidence notes / gaps

- Direct listing URL `https://apps.shopify.com/gorgias` appears incorrect/blocked in snapshotting (returns “Oh no! That page doesn’t exist.”): `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-app-store.html`.
- Shopify App Store listing for Gorgias appears to use handle `helpdesk` and snapshots successfully (use this for durable feature/positioning claims): `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-app-store-helpdesk.html`.
- Docs snapshot currently returns “Not Found”: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-docs.html`. Rely on homepage + Shopify integration page for durable claims.
