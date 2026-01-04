---
status: active
updated_at_utc: 2025-12-30T10:47:23Z
owner: synthesis-agent-zero
scope: "Batch-01 desk research from HTML snapshots (non-visual)"
stores:
  - skims
  - reformation
  - sezane
limitations:
  - "HTML snapshots do not execute client-side JS; treat UI conclusions as provisional until screenshot audits land."
---

# Women’s Fashion — Batch 01 Snapshot Findings (HTML evidence)

- This is **desk research** extracted from raw HTML snapshots (no JS execution, no rendering).
- Use this to pre-populate “what to look for” and “what likely exists” before manual screenshot audits.

Snapshot folder (Batch‑01):
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/`

## SKIMS (`skims.com`)

Evidence (key pages):
- PDP snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__skims-pdp-tshirt-bra.html`
- Shipping snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__skims-shipping.html`
- Returns snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__skims-returns.html`
- Homepage snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__skims-home.html`

What likely improves conversion (snapshot-backed signals):
- Reviews trust + scale: Okendo is present and the PDP includes structured Okendo review summary payloads (rating + review count). Evidence: `.../20251229T114102Z__skims-pdp-tshirt-bra.html`.
- Rich PDP media: PDP includes product video elements in the HTML (video tags + mp4 source). Evidence: `.../20251229T114102Z__skims-pdp-tshirt-bra.html`.
- “Fit confidence” modules exist as first-class content promises (e.g., “How It Compares”, “completeTheLookProductsPromise” signals in embedded data). Evidence: `.../20251229T114102Z__skims-pdp-tshirt-bra.html`.
- Global checkout / localization: Global-e storefront script is loaded (internationalization + duties/taxes experience). Evidence: `.../20251229T114102Z__skims-returns.html` and `.../20251229T114102Z__skims-shipping.html`.
- Returns portal flow: Returns page links out to region-specific flows including a dedicated returns domain (`returns.skims.com`) and “Track a DHL Return”. Evidence: `.../20251229T114102Z__skims-returns.html`.

Notes / risks (snapshot-backed):
- PDP canonical in the snapshot shows a locale path (`/en-vn/`) and includes `robots noindex,nofollow` in the captured HTML (could be geo/UA dependent). Evidence: `.../20251229T114102Z__skims-pdp-tshirt-bra.html`.

## Reformation (`thereformation.com`)

Evidence (key pages):
- PDP snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__reformation-pdp-kastoria-dress.html`
- Cart snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__reformation-cart.html`
- Size guide snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__reformation-size-guide.html`
- PLP snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__reformation-plp-new-dresses.html`

What likely improves conversion (snapshot-backed signals):
- Clear shipping incentive: the PDP contains a “Free express shipping” message/link. Evidence: `.../20251229T114102Z__reformation-pdp-kastoria-dress.html`.
- Fit guidance as a structured component: PDP includes “Designed to be fitted…” fit-intent copy plus a “See our size guide” modal trigger. Evidence: `.../20251229T114102Z__reformation-pdp-kastoria-dress.html`.
- PDP media richness: PDP includes video tags for the product gallery. Evidence: `.../20251229T114102Z__reformation-pdp-kastoria-dress.html`.
- BNPL present on PDP: Afterpay module exists as a PDP component + modal trigger. Evidence: `.../20251229T114102Z__reformation-pdp-kastoria-dress.html`.
- Returns constraints are explicit: PDP HTML contains explicit “final sale items not eligible for returns” language (reduces downstream support cost, but may increase friction if over-emphasized). Evidence: `.../20251229T114102Z__reformation-pdp-kastoria-dress.html`.

## Sézane (`sezane.com`)

Evidence (key pages):
- PLP snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__sezane-plp-dresses-us.html`
- Help snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__sezane-help-us.html`
- Home snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__sezane-home-us.html`

What likely improves conversion (snapshot-backed signals):
- Geolocation confirmation flow exists (reduces “wrong country/site” confusion): PLP HTML contains “HELLO!” geoloc dialog copy asking to confirm shipping country + language. Evidence: `.../20251229T114102Z__sezane-plp-dresses-us.html`.
- Returns self-serve entry point exists: PLP HTML references “We offer free and seamless returns” and includes a “My Returns” link to account/returns. Evidence: `.../20251229T114102Z__sezane-plp-dresses-us.html`.

## What to validate next (needs screenshots)

- For each store, confirm the *visual* implementations (placement, prominence, friction) of:
  - PDP fit/size mechanics (fit notes, size guide UX, model measurements, fit quiz entry points)
  - Reviews UX (filters, photos, “by fit” facets)
  - Cart edit controls (variant change, shipping threshold messaging)
  - Checkout express pay buttons + trust cues (actual rendered buttons and order)

Execution checklist for screenshot audits:
- `artifacts/womens-fashion-capture-todo-batch-01.md`
