# E-commerce Pattern Card

Pattern name: Cart variant editing (change size/color without restarting)

Funnel stage: cart

Problem it solves: Shoppers often discover size/variant mistakes after adding to cart. If fixing it is hard, they abandon.

Why it works: Keeps the shopper “in flow” and prevents a costly backtrack to the PDP, reducing cart abandonment and support load.

Evidence (required):
- Store: pending (needs proof-grade capture)
- Page URL: pending (needs proof-grade capture)
- Screenshot link: pending (capture during manual audit)
- Notes (what the evidence must prove): Cart supports changing size/color on an existing line item (or a lightweight “Edit” flow) without forcing a full PDP backtrack.

Evidence attempts / adjacent (does NOT prove variant editing yet):
- Andie Swim cart (shows variant details + quantity/remove controls, but no clear size/color swap UI shown in capture) — https://andieswim.com/cart
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__cart__line-item-controls__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__mobile__cart__line-item-controls__20251231.png`
- Frankies Bikinis cart (shows variant details + quantity/remove controls, but no clear size/color swap UI shown in capture) — https://frankiesbikinis.com/cart
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/frankies-bikinis/frankies-bikinis__desktop__cart__line-item-controls__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/frankies-bikinis/frankies-bikinis__mobile__cart__line-item-controls__20251231.png`
- Rothy’s cart drawer (shows variant details like size, plus qty/remove, but no visible “change size/color” affordance) — https://rothys.com/cart
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/rothys/rothys__desktop__cart__line-item-controls-crop-topright__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/rothys/rothys__desktop__cart__variant-edit-attempt__20251231.png`
- Dolce Vita cart (shows size/color details + qty/remove, but no in-cart size/color swap UI shown) — https://www.dolcevita.com/cart
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/dolce-vita/dolce-vita__desktop__cart__line-item-controls__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/dolce-vita/dolce-vita__desktop__cart__line-item-controls-alt__20251231.png`
- Pink Blush Maternity cart (shows variant details + “Move to Love List” + cross-sells, but no in-cart size/color swap UI shown) — https://www.pinkblushmaternity.com/cart
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/pink-blush-maternity/pink-blush-maternity__desktop__cart__line-item-controls__20251231.png`

Implementation notes (for our builds):
- UI placement: inline edit controls in cart drawer/page.
- Copy guidance: “Edit” → “Size” / “Color” with clear confirmation.
- Data required: cart line item mutation API, inventory validation, promotion recalculation.
- Edge cases: out-of-stock variant swap; bundles; shipping threshold recalculation; promo persistence.

Tradeoffs / risks:
- Needs robust cart state handling; fragile updates cause trust issues.

Related patterns:
- PDP variant-picker clarity
- Cart shipping threshold messaging
