# E-commerce Pattern Card

Pattern name: Back‑in‑stock / waitlist capture for out‑of‑stock variants

Funnel stage: PDP (and PLP/navigation as a supporting entry point)

Problem it solves: In women’s fashion, stockouts are common; without a “notify me” path, shoppers bounce and demand is lost.

Why it works: Converts “out of stock” into a demand capture loop (email/SMS) and provides merchandising signal for restocks/drops.

Evidence (required):
- Store: Frankies Bikinis
- Page URL: https://frankiesbikinis.com/collections/back-in-stock
- Screenshot link: docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/frankies-bikinis/frankies-bikinis__desktop__plp__back-in-stock__20251231.png
- Tier‑B snapshot (HTML, waitlist modal components): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-sizing.html`
- Notes (what the evidence proves): Screenshot proves a dedicated “Back in stock” collection exists as a browseable re-entry point; Tier‑B HTML also contains Klaviyo Back‑In‑Stock (BIS) modal copy (e.g., “We’ll email you when … is back in stock.” + “Join the waitlist”).

Additional Tier‑B evidence (supporting examples):
- Frankies “Back in stock” browse entry point:
  - URL: https://frankiesbikinis.com/collections/back-in-stock
  - Snapshot: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-back-in-stock.html`
- Frankies nav includes “back in stock” link (captured on shipping page):
  - URL: https://frankiesbikinis.com/pages/shipping
  - Snapshot: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-shipping.html`
- Ganni analytics events include explicit OOS/notify-me + waitlist event names (signals capability; Tier‑A required for UI placement proof):
  - URL: https://www.ganni.com/en-vn/help-and-information/returns.html
  - Snapshot: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-returns.html`

Implementation notes (for our builds):
- UI placement: replace “Add to cart” with “Notify me” when variant is OOS; allow variant selection (size/color) before capture.
- Copy guidance: set expectation (“notify when back” vs “preorder”); avoid false urgency.
- Data required: inventory availability per variant, contact capture, consent tracking, back-in-stock trigger rules, send history.
- Edge cases: “final sale” items; items not restocking; partial restock (some sizes only); multi-region inventory; rate limiting; unsubscribe/compliance.

Tradeoffs / risks:
- Deliverability and compliance (SMS/email consent) are non-negotiable; “notify me” spam erodes trust quickly.

Related patterns:
- Wishlist / saved items
- PDP fit confidence module (especially when recommended size is OOS)
- Campaign collections (“new / best / drops”)
