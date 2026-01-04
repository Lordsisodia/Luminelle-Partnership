# E-commerce Pattern Card

Pattern name: Self-serve returns portal (returns/exchanges-first flow)

Funnel stage: post‑purchase

Problem it solves: Returns ambiguity increases purchase anxiety and raises support load.

Why it works: Makes “what happens if it doesn’t fit” concrete and low-friction; reduces support tickets and can steer customers toward exchanges/store credit.

Evidence (required):
- Store: ThirdLove
- Page URL: https://www.thirdlove.com/pages/returns-center
- Screenshot link: docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__post-purchase__returns-portal__20251231.png
- Tier‑B snapshot (HTML, returns page): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-returns.html`
- Notes (what the evidence proves): The returns center exposes a structured “order lookup → start a return” flow (self‑serve), making the post‑purchase path concrete.

Additional evidence:
- Andie Swim (Loop Returns signal + exchange-first entry point)
  - Page URL: https://andieswim.com/pages/returns
  - Screenshot: `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__post-purchase__returns-portal__20251231.png`
  - Tier‑B snapshot: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-returns.html`
  - Notes: Returns page shows clear Exchange vs Return CTAs; Tier‑B snapshot includes Loop Returns assets/scripts (implementation signal).

Implementation notes (for our builds):
- UI placement: footer + PDP near shipping/returns + order confirmation email.
- Copy guidance: be explicit about timelines, condition rules, and exchange incentives.
- Data required: order lookup, return reasons, label generation, exchange catalog rules.
- Edge cases: final sale items; multi-ship orders; international returns; gift orders.

Tradeoffs / risks:
- Operational readiness required; if the portal fails, trust collapses.

Related patterns:
- PDP returns “summary” module (above the fold on mobile)
- Exchange-first offers (store credit bonus)
