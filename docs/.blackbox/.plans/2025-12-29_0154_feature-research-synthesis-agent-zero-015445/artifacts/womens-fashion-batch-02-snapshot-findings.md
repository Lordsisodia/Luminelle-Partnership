---
status: active
updated_at_utc: 2025-12-30T10:55:32Z
owner: synthesis-agent-zero
scope: "Batch-02 desk research from HTML snapshots (non-visual)"
stores:
  - alo-yoga
  - summersalt
  - thirdlove
limitations:
  - "HTML snapshots do not execute client-side JS; treat UX conclusions as provisional until screenshot audits land."
---

# Women’s Fashion — Batch 02 Snapshot Findings (HTML evidence)

- This is **desk research** extracted from raw HTML snapshots (no JS execution, no rendering).
- Use this to pre-populate “what to look for” and “what likely exists” before manual screenshot audits.

Snapshot folder (Batch‑02):
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/`

## Alo Yoga (`aloyoga.com`)

Evidence (key pages):
- Home: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__aloyoga-home.html`
- PLP: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__aloyoga-plp.html`
- Cart: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__aloyoga-cart-or-checkout.html`
- Returns: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__aloyoga-returns.html`
- Size guide: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__aloyoga-size-fit.html`

Snapshot-backed CRO signals to validate visually:
- Shipping/returns reassurance is surfaced as a banner CTA (“FREE U.S. SHIPPING & EASY RETURNS”):
  - evidence: `.../20251229T115424Z__aloyoga-home.html`
- BNPL is present (Afterpay popup markup exists):
  - evidence: `.../20251229T115424Z__aloyoga-home.html`
- Loyalty program UI is present (react render targets for loyalty top panel):
  - evidence: `.../20251229T115424Z__aloyoga-home.html`
- Internationalization / cross-border tooling is present (Borderfree snippet is embedded):
  - evidence: `.../20251229T115424Z__aloyoga-home.html`
- Cart may hard-fail without cookies (“Enable cookies to use the shopping cart” copy exists):
  - evidence: `.../20251229T115424Z__aloyoga-home.html`

## Summersalt (`summersalt.com`)

Evidence (key pages):
- Home: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__summersalt-home.html`
- PLP: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__summersalt-plp.html`
- PDP: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__summersalt-pdp.html`
- Shipping: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__summersalt-shipping.html`
- Returns: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__summersalt-returns.html`
- Size guide: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__summersalt-size-fit.html`

Snapshot-backed CRO signals to validate visually:
- Modern storefront stack signal: multiple `cdn.shopify.com/oxygen-v2/...` assets + `react-router` hints suggest a Hydrogen/Remix storefront (performance + flexibility):
  - evidence: `.../20251229T115424Z__summersalt-home.html`
- Returns experience is implemented as a first-class routed page (`/pages/choose-returns`) in the app routing map:
  - evidence: `.../20251229T115424Z__summersalt-returns.html`
- Fit guidance is a prominent nav destination (“fit guide” URL present in embedded app data):
  - evidence: `.../20251229T115424Z__summersalt-home.html`

## ThirdLove (`thirdlove.com`)

Evidence (key pages):
- Home: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__thirdlove-home.html`
- PLP: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__thirdlove-plp.html`
- PDP: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__thirdlove-pdp.html`
- Returns: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__thirdlove-returns.html`
- Size/fit: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__thirdlove-size-fit.html`

Snapshot-backed CRO signals to validate visually:
- Fit confidence is a first-class “Fitting Room” experience (multiple nav links; explicit “Find your fit” copy exists):
  - evidence: `.../20251229T115424Z__thirdlove-home.html`
- Returns/exchanges posture is explicitly messaged (“Perfect fit guaranteed. Free exchanges for 60 days.”):
  - evidence: `.../20251229T115424Z__thirdlove-home.html`
- Returns tooling is present via Loop Returns Shopify extension assets:
  - evidence: `.../20251229T115424Z__thirdlove-home.html`

## What to validate next (needs screenshots)

- Placement + prominence (home/PLP/PDP/cart):
  - how visible shipping/returns reassurance is before users scroll
  - where fit/size guidance appears relative to variant picker and ATC
  - how returns/exchanges policy is positioned (confidence builder vs friction)
- Checkout trust cues + express pay buttons (must be captured visually).

Execution checklist (screenshots):
- `artifacts/womens-fashion-capture-todo-batch-02.md`

