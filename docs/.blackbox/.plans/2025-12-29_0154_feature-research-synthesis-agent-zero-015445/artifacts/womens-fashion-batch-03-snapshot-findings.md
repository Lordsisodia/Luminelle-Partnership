---
status: active
updated_at_utc: 2025-12-30T18:10:00Z
owner: synthesis-agent-zero
scope: "Batch-03 capture preflight from HTML snapshots (non-visual)"
stores:
  - rouje
  - ganni
  - universal-standard
limitations:
  - "HTML snapshots do not execute client-side JS; treat UX conclusions as provisional until screenshot audits land."
  - "Cart/checkout pages may render incomplete or empty without cookies/session; treat cart HTML with extra caution."
---

# Women’s Fashion — Batch 03 Snapshot Findings (HTML evidence)

- This is **desk research** extracted from raw HTML snapshots (no JS execution, no rendering).
- Use this to pre-populate “what to look for” and “what likely exists” before manual screenshot audits.
- Batch-03 has additional stores (DÔEN/SSENSE/thredUP/Lululemon) but many are bot-blocked in snapshots (see: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/BATCH-03.md`).

Snapshot folders:
- Batch‑03: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/`
- (Universal Standard uses Batch‑02 snapshots): `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/`

## Rouje (`rouje.com`)

Evidence (key pages):
- Home: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-home.html`
- PLP: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-plp.html`
- PDP (example): `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-pdp.html`
- Cart (snapshot is minimal): `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-cart-or-checkout.html`
- Size guide: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-size-fit.html`
- Returns: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-returns.html`

Snapshot-backed CRO signals to validate visually:
- Reviews infrastructure appears “multi-provider” (Okendo variables + Yotpo object payload present in the PDP HTML):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-pdp.html`
- Size/fit content is a first-class page with strong SEO metadata and footer navigation that includes returns management (“Gérer mon retour”):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-size-fit.html`
- Cart snapshot likely requires active session/cookies (HTML file is extremely small and indicates an empty cart payload):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-cart-or-checkout.html`

## GANNI (`ganni.com`)

Evidence (key pages):
- Home: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-home.html`
- PLP: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-plp.html`
- Cart: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-cart-or-checkout.html`
- Shipping: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-shipping.html`
- Returns: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-returns.html`
- Help/Info: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-help-support.html`

Snapshot-backed CRO signals to validate visually:
- Klarna BNPL placement is explicitly wired into the mini cart experience (“minicart-with-klarna-placement-test”):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-home.html`
- Klarna placement exists on the cart/checkout page markup as well:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-cart-or-checkout.html`
- “Gifts” is a top-level nav destination (suggests seasonal merchandising + category-based gifting flows):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-home.html`
- Instrumentation appears unusually detailed (explicit event names for size guide, mini cart, filters, begin checkout, etc.), which usually correlates with frequent iterative CRO:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-home.html`

## Universal Standard (`universalstandard.com`)

Evidence (key pages):
- Home: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-home.html`
- PLP: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-plp.html`
- PDP (example): `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-pdp.html`
- Returns: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-returns.html`
- Size/fit (Fit Liberty FAQ): `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-size-fit.html`

Snapshot-backed CRO signals to validate visually:
- Returns/exchanges appear to route through a Happy Returns portal (`universalstandard.happyreturns.com`):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-returns.html`
- Cross-border commerce tooling is present (Global‑e storefront scripts / pixel config):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-returns.html`
- Support/help center tooling is present (Gorgias help center loader script):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-returns.html`
- Yotpo product reviews tooling is present (Yotpo widget loader present in HTML):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-returns.html`
- A/B testing / experimentation appears explicitly configured via `pickedConfig` experiments (e.g., “Sticky add to cart experience”, “Free shipping experience”, “Size selector experience”):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-size-fit.html`

## What to validate next (needs screenshots)

- Placement + prominence (home/PLP/PDP/cart):
  - where Klarna messaging appears relative to price/ATC
  - how “Gifts” merchandising is exposed (nav vs homepage blocks)
  - how size/fit guidance is positioned on PDP (before/after ATC)
  - how returns portals are framed (exchange-first, self-serve steps, reassurance copy)
- Checkout trust cues + express pay buttons (must be captured visually).

Execution checklist (screenshots):
- `artifacts/womens-fashion-capture-todo-batch-03.md`
