---
status: draft
last_reviewed: 2025-12-31
owner: growth
---

# Pattern Capture Checklist (Screenshots → Pattern Cards → Backlog)

Goal: when an auditor captures a required screenshot, they can immediately:
1) paste the screenshot link into the correct pattern card
2) (optionally) mark the matching backlog item as evidence-backed

Inputs:
- evidence checklists: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence`
- pattern cards: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns`
- mapping: `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

How to use during an audit:
- For each screenshot you capture, find the row matching its `stage` + `feature`.
- Open the linked pattern card and replace `Screenshot link: pending...` with your real screenshot path.
- If the store uses a different mechanic than expected, create a new pattern card instead.

## Required screenshot → pattern mapping

| stage | feature | filename example | pattern card to update | backlog row |
|---|---|---|---|---|
| cart | promo | `allsaints__desktop__cart__promo__YYYYMMDD.png` | — (create new card if valuable) | — |
| cart | shipping-threshold | `allsaints__desktop__cart__shipping-threshold__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md` | Cart shipping threshold messaging |
| cart | variant-edit | `allsaints__desktop__cart__variant-edit__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-variant-editing.md` | Cart variant editing |
| checkout | delivery-estimate | `allsaints__desktop__checkout__delivery-estimate__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` | Checkout express + trust |
| checkout | express-buttons | `allsaints__desktop__checkout__express-buttons__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` | Checkout express + trust |
| checkout | trust-cues | `allsaints__desktop__checkout__trust-cues__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` | Checkout express + trust |
| homepage | country-selector | `allsaints__desktop__homepage__country-selector__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/global-region-routing.md` | Global region routing |
| homepage | entry-points | `allsaints__desktop__homepage__entry-points__YYYYMMDD.png` | — (create new card if valuable) | — |
| homepage | shipping-returns | `allsaints__desktop__homepage__shipping-returns__YYYYMMDD.png` | — (create new card if valuable) | — |
| pdp | complete-the-set | `allsaints__desktop__pdp__complete-the-set__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-complete-the-set-cross-sell.md` | PDP complete-the-set cross-sell |
| pdp | fabric-care | `allsaints__desktop__pdp__fabric-care__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fabric-confidence-module.md` | PDP fabric confidence module |
| pdp | fit-module | `allsaints__desktop__pdp__fit-module__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-confidence-module.md` | PDP fit confidence module |
| pdp | fit-quiz | `allsaints__desktop__pdp__fit-quiz__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-quiz.md` | PDP fit quiz entry point |
| pdp | reviews-module | `allsaints__desktop__pdp__reviews-module__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/reviews-filterable-by-fit.md` | Reviews filterable by fit |
| pdp | shipping-returns | `allsaints__desktop__pdp__shipping-returns__YYYYMMDD.png` | — (create new card if valuable) | — |
| pdp | variant-picker | `allsaints__desktop__pdp__variant-picker__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-confidence-module.md` | PDP fit confidence module |
| plp | filters-panel | `allsaints__desktop__plp__filters-panel__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/plp-occasion-filters.md` | PLP occasion filters |
| plp | occasion-filters | `allsaints__desktop__plp__occasion-filters__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/plp-occasion-filters.md` | PLP occasion filters |
| plp | wishlist-page | `triangl__desktop__plp__wishlist-page__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-wishlist-saved-items.md` | Wishlist / saved items |
| plp | back-in-stock | `frankies-bikinis__desktop__plp__back-in-stock__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-back-in-stock-waitlist.md` | PDP back‑in‑stock waitlist |
| plp | product-cards | `allsaints__desktop__plp__product-cards__YYYYMMDD.png` | — (create new card if valuable) | — |
| plp | quick-add | `allsaints__desktop__plp__quick-add__YYYYMMDD.png` | — (create new card if valuable) | — |
| post-purchase | help-center | `allsaints__desktop__post-purchase__help-center__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/help-center-contextual-faq.md` | Contextual help center |
| post-purchase | returns-portal | `allsaints__desktop__post-purchase__returns-portal__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md` | Self-serve returns portal |

## Notes

- This checklist intentionally focuses on the **minimum evidence set** (PLP filters, PDP fit/fabric/reviews, cart variant edit, checkout express/trust).
- Patterns like “Fit quiz”, “Complete the set”, “Returns portal”, and “Help center” often require *additional* screenshots beyond the minimum set; capture them when present:
  - `pdp-fit-quiz.md`: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-quiz.md`
  - `pdp-complete-the-set-cross-sell.md`: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-complete-the-set-cross-sell.md`
  - `returns-self-serve-portal.md`: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md`
  - `help-center-contextual-faq.md`: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/help-center-contextual-faq.md`
