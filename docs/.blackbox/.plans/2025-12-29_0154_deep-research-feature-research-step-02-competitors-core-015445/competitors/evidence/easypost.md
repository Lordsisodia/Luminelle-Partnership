# Evidence Extract — EasyPost

- slug: `easypost`

## Homepage snapshot

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/easypost.html`
- title: The Simple Shipping API - EasyPost
- description: EasyPost's best-in-class Shipping APIs provide end-to-end flexibility and more control over parcel shipping and logistics processes.

## Variant snapshots (pricing/docs/features)

- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-blog.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-api.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-guide.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site-api.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site-api2.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site-guide.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site-guide2.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-features.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-home.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-pricing.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-product.html`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-shipping-api.html`

## Variant details (signal)

### easypost-blog.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-blog.html`
- title: Blog - EasyPost

### easypost-docs-api.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-api.html`
- title: Page not found - EasyPost

### easypost-docs-guide.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-guide.html`
- title: Page not found - EasyPost

### easypost-docs-site-api.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site-api.html`
- title: 404 - EasyPost

### easypost-docs-site-api2.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site-api2.html`
- title: 404 - EasyPost

### easypost-docs-site-guide.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site-guide.html`
- title: 404 - EasyPost

### easypost-docs-site-guide2.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site-guide2.html`
- title: 404 - EasyPost

### easypost-docs-site.html

- file: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site.html`
- title: EasyPost API Docs - EasyPost
- description: Docs for the EasyPost Shipping API with access to the UPS API, USPS API, FedEx API, DHL API, and more.

---

# Tranche 02 Deep Dive — Shipping API primitives (Analyst notes)

## 3 notable features (evidence-first)

1) Shipping API covers core primitives: rate shopping, label purchase/printing, address verification, tracking, and shipment insurance (explicitly called out).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/easypost.html` (includes a paragraph describing these primitives + “AI and automation”).

2) Carrier breadth positioned via docs site (UPS/USPS/FedEx/DHL and more).
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site.html`

3) Pricing posture: “simple pricing” with “no monthly fees or hidden charges”.
   - Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-pricing.html`

## 2 workflows worth copying (step-by-step)

### Workflow A — Platform build: unify shipping primitives behind one abstraction (developer/platform)

1) Store address + parcel details and request carrier rates.
2) Run rate shopping to choose a service.
3) Buy and print a label; store the label + tracking identifiers.
4) Track shipment events and sync status into the order timeline.
5) Optionally insure shipments and reconcile claims/insurance events.

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-home/easypost.html`

### Workflow B — “Docs-first” developer onboarding (developer experience)

1) Start at the docs landing page.
2) Identify supported carriers and core API capabilities.
3) Implement minimal end-to-end flow: rate → label → tracking.
4) Expand into “ops edge cases” (address validation, insurance).

Evidence:
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/easypost-docs-site.html`

## 3 “steal ideas” (easy/medium/hard)

- Easy: docs landing page that states supported carriers + capability checklist (sets scope immediately).
- Medium: “rate shop” as a first-class primitive and default workflow (encourages optimization).
- Hard: consistent carrier normalization + reliable tracking event ingestion at scale.

## Evidence notes / gaps

- Several `www.easypost.com/docs*` snapshot URLs resolved to 404 pages in this run (`easypost-docs.html`, `easypost-docs-api.html`, etc.). Use `easypost-docs-site.html` for docs evidence.
