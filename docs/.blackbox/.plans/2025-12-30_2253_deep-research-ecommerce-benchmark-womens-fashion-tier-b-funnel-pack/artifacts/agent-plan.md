# Agent Plan — Women’s Fashion Tier‑B Funnel Pack

- Plan folder: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack`

## Objective

- Generate Tier‑B (HTML) funnel snapshots for the women’s fashion Top‑25 apparel-first stores and promote evidence into checklists/mapping.

## Next actions

- **Cycle focus (now): Cart UX Tier‑A evidence (add-to-cart → /cart), N=4 stores**
  - Stores: `andie-swim`, `thirdlove`, `carbon38`, `staud`
  - Capture (desktop + mobile):
    - `cart__shipping-threshold` (progress / “spend X more” copy + placement)
    - If visible: `cart__variant-edit` (in-cart size/color swap) or capture as `cart__line-item-controls` for item controls + quantity.
  - Then update:
    - Pattern cards: `cart-shipping-threshold-messaging.md`, `cart-variant-editing.md`
    - Canonical mapping + shortlist: `pattern-to-backlog-mapping.md`, `womens-fashion-top25-apparel-first-backlog-shortlist.md`
  - Then run:
    - `python3 .blackbox/scripts/research/postprocess_batch_audits.py ... --stores andie-swim thirdlove carbon38 staud`

- **Cycle focus (next): Checkout express + trust (Tier‑A), N=3 stores**
  - Stores: `andie-swim`, `carbon38`, `alo-yoga`
  - Capture (desktop + mobile):
    - `checkout__express-buttons` (Shop Pay / Apple Pay / PayPal placement)
    - `checkout__trust-cues` (security/payment trust + returns link if present)
    - `checkout__delivery-estimate` (delivery promise copy near shipping step)
  - Then run:
    - `python3 .blackbox/scripts/research/postprocess_batch_audits.py ...`
  - Goal: remove `pending` from `patterns/checkout-express-checkout.md` and promote into mapping + shortlist.

- **Cycle focus (2025-12-31): Returns portal evidence (Tier‑A), N=3 stores**
  - Stores: `andie-swim`, `loveshackfancy`, `thirdlove`
  - Capture (desktop + mobile):
    - `post-purchase__returns-portal` (proof-grade portal UX vs static policy text)
    - If reachable without heavy friction: `pdp__shipping-returns` (returns summary surfaced in-funnel)
  - Then run:
    - `python3 .blackbox/scripts/research/postprocess_batch_audits.py ...`
    - Verify pattern cards auto-update: `returns-self-serve-portal.md`

- Start (or continue) Tier‑A screenshot capture using the checklist (PLP/PDP/cart/checkout-start/returns):
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/womens-top25-tier-a-screenshot-capture-checklist.md`
  - Evidence naming: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence-naming.md`
  - Evidence coverage: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence-coverage.md`
- For the next Tier‑A passes, explicitly capture proof-grade screenshots for the newly-added pattern cards (so they can be “marked complete”):
  - Cart free‑shipping threshold UI: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md`
  - Wishlist / saved items UI: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-wishlist-saved-items.md`
  - OOS “notify me” / waitlist UI: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-back-in-stock-waitlist.md`
- Next Tier‑A bottleneck to close: **Cart variant editing** (true size/color swap in cart)
  - Current captures labeled `cart__line-item-controls` are *not* sufficient proof; they show variant details + qty/remove only.
  - Action: identify a Shopify store with an actual “Edit” flow in cart (or a cart drawer) and capture that UI explicitly.
- Use the Top‑25 manual audit set (preflight injected) as the working surface for Tier‑A notes + scores:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md`
- After Tier‑A screenshots are captured, update the execution queue outputs (so “what to build” stays current):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
- After screenshots exist, run audit postprocessing + reports:
  - `.blackbox/scripts/research/postprocess_batch_audits.py`
  - `.blackbox/scripts/research/run_funnel_audit_reports.py`
  - (Validated wiring via: `python3 .blackbox/scripts/research/postprocess_store_audit.py --dry-run --store-slug andie-swim ...`)
