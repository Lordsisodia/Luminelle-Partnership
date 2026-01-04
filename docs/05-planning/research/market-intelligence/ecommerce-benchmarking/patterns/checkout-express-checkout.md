# E-commerce Pattern Card

Pattern name: Checkout express buttons + trust cues above the fold

Funnel stage: checkout

Problem it solves: Checkout friction (form fatigue + trust doubt) causes drop-off, especially on mobile.

Why it works: Express payment options reduce time-to-complete while visible trust cues reassure shoppers at the highest-risk step.

Evidence (required):
- Store: Andie Swim
- Page URL: https://andieswim.com/cart/30701508821062:1?checkout
- Screenshot link: docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__express-buttons__20251231.png
- Tier‑B snapshot (HTML, checkout entry): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-checkout.html`
- Notes (what the evidence proves): Checkout shows express buttons (Shop + PayPal) above the fold and standard trust cues (secure/encrypted), validating the Tier‑B signal with UI placement proof.

Additional evidence:
- Carbon38 checkout (Shop + PayPal + G Pay above fold) — https://www.carbon38.com/cart/45353261269181:1?checkout — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__checkout__express-buttons__20251231.png`
- ThirdLove checkout (Shop + PayPal + G Pay above fold; Afterpay shown) — https://www.thirdlove.com/cart/5681628548:1?checkout — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__checkout__express-buttons__20251231.png`

Delivery estimate evidence (shipping method step):
- Andie Swim shipping methods — https://andieswim.com/cart/30701508821062:1?checkout — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__delivery-estimate__20251231.png`
- STAUD shipping methods — https://www.staud.clothing/cart/44883417071789:1?checkout — `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/staud/staud__desktop__checkout__delivery-estimate__20251231.png`
- Carbon38: blocked by Shop Pay bot challenge in headless capture (evidence file shows challenge overlay): `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__checkout__delivery-estimate__20251231.png`

Implementation notes (for our builds):
- UI placement: express buttons at the top of checkout; trust cues near payment/shipping.
- Copy guidance: clarify delivery estimate and return policy links.
- Data required: payment provider integrations, order/tax/shipping calculation, trust badge assets.
- Edge cases: guest vs account checkout, address validation, BNPL eligibility by region/cart value.

Tradeoffs / risks:
- Too many payment buttons can be visually noisy; prioritize by market.

Related patterns:
- Delivery estimate clarity
- Returns visibility in checkout
