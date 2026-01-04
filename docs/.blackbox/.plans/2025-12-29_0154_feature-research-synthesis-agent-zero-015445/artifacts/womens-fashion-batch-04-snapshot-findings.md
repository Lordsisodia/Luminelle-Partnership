---
status: active
updated_at_utc: 2025-12-30T18:20:00Z
owner: synthesis-agent-zero
scope: "Batch-04 capture preflight from HTML snapshots (non-visual)"
stores:
  - mytheresa
  - rent-the-runway
limitations:
  - "HTML snapshots do not execute client-side JS; treat UX conclusions as provisional until screenshot audits land."
  - "Some sites may serve anti-bot failover HTML that looks like a normal page title; treat snapshot signals as triage only."
---

# Women’s Fashion — Batch 04 Snapshot Findings (HTML evidence)

- This batch covers the remaining “0% blocked” shortlist stores that were not yet annotated with snapshot notes:
  - `mytheresa` (luxury marketplace)
  - `rent-the-runway` (subscription rental)
- Goal: reduce “discovery time” during manual screenshot audits by pre-identifying likely conversion levers and pitfalls.

Snapshot folder:
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/`

## Mytheresa (`mytheresa.com`)

Evidence (key pages; note: may be failover HTML):
- Home: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__mytheresa-home.html`
- PLP: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__mytheresa-plp-clothing.html`
- PDP example: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__mytheresa-pdp-example.html`
- Returns: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__mytheresa-returns.html`
- Help/support: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__mytheresa-help-support.html`

Snapshot-backed CRO signals / constraints to validate visually:
- The snapshot HTML explicitly flags itself as a bot/failover page (`window.isBotPage = true`) and ships “Something went wrong” copy:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__mytheresa-home.html`
- The snapshot is `noindex,nofollow` and references a “failover” stylesheet path:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__mytheresa-home.html`

Practical implication:
- Treat Mytheresa as “manual-only” for UX learnings (screenshots from a real browser session are required).

## Rent the Runway (`renttherunway.com`)

Evidence (key pages):
- Home: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__renttherunway-home.html`
- PLP / new arrivals: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__renttherunway-plp.html`
- Returns: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__renttherunway-returns.html`
- Find your fit: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__renttherunway-size-fit.html`
- Help/support: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__renttherunway-help-support.html`

Snapshot-backed CRO signals to validate visually:
- Subscription is framed as the core offering (“clothing rental subscription for every day”) with a direct “Join Now” CTA and explicit first-month pricing callout:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__renttherunway-home.html`
- Homepage experiment hint exists (`ab_variant=treatment` in the rendered Next.js payload):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__renttherunway-home.html`
- Returns flow is not “returns in the ecom sense” — it’s an operational loop (garment bag, labels, UPS drop-offs, occasional home pickup; FAQ content is extensive):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__renttherunway-returns.html`
- Fit guidance is positioned as “data-backed tools + reviews” and explicitly differentiates membership vs one-time rentals (backup size included for 4/8-day rentals):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__renttherunway-size-fit.html`

## What to validate next (needs screenshots)

- Mytheresa:
  - Can we reach real content without bot/failover?
  - What trust cues are used for luxury (authenticity, returns, duties/taxes, shipping speed)?
  - How “size/fit” is handled at luxury price points.
- Rent the Runway:
  - Exact membership offer placement (hero, sticky headers, pricing modal) on desktop + mobile.
  - How they reduce risk: backup sizes, fit tools, returns logistics, damage policy messaging.

