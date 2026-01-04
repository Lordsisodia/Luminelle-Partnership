# E-commerce Pattern Card

Pattern name: Wishlist / saved items (persistent, low-friction “heart”)

Funnel stage: PDP + PLP (pre‑purchase retention)

Problem it solves: Many shoppers aren’t ready to buy in a single session; without a save mechanism, intent is lost and comparison shopping increases drop‑off.

Why it works: Captures “soft intent” and gives shoppers a low-commitment action (save now, decide later). Also powers retention loops (email capture, back‑in‑stock, price drop alerts) without forcing checkout.

Evidence (required):
- Store: Triangl
- Page URL: https://triangl.com/pages/wishlist
- Screenshot link: docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/triangl/triangl__desktop__plp__wishlist-page__20251231.png
- Tier‑B snapshot (HTML, wishlist page): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-triangl-wishlist.html`
- Notes (what the evidence proves): Dedicated wishlist page exists (`/pages/wishlist`) with first-class wishlist components (e.g., `fostr-wishlist` + wishlist modal assets) present in HTML.

Additional Tier‑B evidence (supporting examples):
- Ganni wishlist entry point + wishlist analytics events (captured on returns page):
  - URL: https://www.ganni.com/en-vn/help-and-information/returns.html
  - Snapshot: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-returns.html`
- Ganni wishlist URL is login-gated in this region snapshot (useful as a “what to avoid” signal if we want guest-friendly saves):
  - URL: https://www.ganni.com/en-vn/wishlist
  - Snapshot: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-wishlist.html`

Implementation notes (for our builds):
- UX: support guest wishlists (local storage / cookie) and optionally merge on login.
- Placement: heart icon on PLP cards + PDP; allow “save this size/color” when relevant.
- Data required: product/variant IDs, optional account/session identity, persistence/merge strategy, analytics events.
- Edge cases: privacy constraints; cross-device sync; shareable lists; inventory changes; saved item variant selection.

Tradeoffs / risks:
- If wishlists require account creation too early, it becomes friction (and reduces usage).

Related patterns:
- Back‑in‑stock / waitlist capture
- PDP complete-the-set cross-sell
- Reviews filterable by fit
