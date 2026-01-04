---
status: draft
last_reviewed: 2025-12-29
owner: growth
---

# Pattern Capture Checklist (Screenshots → Pattern Cards → Backlog)

Goal: when an auditor captures a required screenshot, they can immediately:
1) paste the screenshot link into the correct pattern card
2) (optionally) mark the matching backlog item as evidence-backed

Inputs:
- evidence checklists: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence`
- pattern cards: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns`
- mapping: `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

How to use during an audit:
- For each screenshot you capture, find the row matching its `stage` + `feature`.
- Open the linked pattern card and replace `Screenshot link: pending...` with your real screenshot path.
- If the store uses a different mechanic than expected, create a new pattern card instead.

## Required screenshot → pattern mapping

| stage | feature | filename example | pattern card to update | backlog row |
|---|---|---|---|---|
| cart | promo | `alo-yoga__desktop__cart__promo__YYYYMMDD.png` | — (create new card if valuable) | — |
| cart | shipping-threshold | `alo-yoga__desktop__cart__shipping-threshold__YYYYMMDD.png` | — (create new card if valuable) | — |
| cart | variant-edit | `alo-yoga__desktop__cart__variant-edit__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-variant-editing.md` | Cart variant editing |
| checkout | delivery-estimate | `alo-yoga__desktop__checkout__delivery-estimate__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` | Checkout express + trust |
| checkout | express-buttons | `alo-yoga__desktop__checkout__express-buttons__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` | Checkout express + trust |
| checkout | trust-cues | `alo-yoga__desktop__checkout__trust-cues__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` | Checkout express + trust |
| homepage | country-selector | `alo-yoga__desktop__homepage__country-selector__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/global-region-routing.md` | Global region routing |
| homepage | entry-points | `alo-yoga__desktop__homepage__entry-points__YYYYMMDD.png` | — (create new card if valuable) | — |
| homepage | shipping-returns | `alo-yoga__desktop__homepage__shipping-returns__YYYYMMDD.png` | — (create new card if valuable) | — |
| pdp | complete-the-set | `alo-yoga__desktop__pdp__complete-the-set__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-complete-the-set-cross-sell.md` | PDP complete-the-set cross-sell |
| pdp | fabric-care | `alo-yoga__desktop__pdp__fabric-care__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fabric-confidence-module.md` | PDP fabric confidence module |
| pdp | fit-module | `alo-yoga__desktop__pdp__fit-module__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-confidence-module.md` | PDP fit confidence module |
| pdp | fit-quiz | `alo-yoga__desktop__pdp__fit-quiz__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-quiz.md` | PDP fit quiz entry point |
| pdp | reviews-module | `alo-yoga__desktop__pdp__reviews-module__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/reviews-filterable-by-fit.md` | Reviews filterable by fit |
| pdp | shipping-returns | `alo-yoga__desktop__pdp__shipping-returns__YYYYMMDD.png` | — (create new card if valuable) | — |
| pdp | variant-picker | `alo-yoga__desktop__pdp__variant-picker__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-confidence-module.md` | PDP fit confidence module |
| plp | filters-panel | `alo-yoga__desktop__plp__filters-panel__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/plp-occasion-filters.md` | PLP occasion filters |
| plp | occasion-filters | `alo-yoga__desktop__plp__occasion-filters__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/plp-occasion-filters.md` | PLP occasion filters |
| plp | product-cards | `alo-yoga__desktop__plp__product-cards__YYYYMMDD.png` | — (create new card if valuable) | — |
| plp | quick-add | `alo-yoga__desktop__plp__quick-add__YYYYMMDD.png` | — (create new card if valuable) | — |
| post-purchase | help-center | `alo-yoga__desktop__post-purchase__help-center__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/help-center-contextual-faq.md` | Contextual help center |
| post-purchase | returns-portal | `alo-yoga__desktop__post-purchase__returns-portal__YYYYMMDD.png` | `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md` | Self-serve returns portal |

## Notes

- This checklist intentionally focuses on the **minimum evidence set** (PLP filters, PDP fit/fabric/reviews, cart variant edit, checkout express/trust).
- Patterns like “Fit quiz”, “Complete the set”, “Returns portal”, and “Help center” often require *additional* screenshots beyond the minimum set; capture them when present:
  - `pdp-fit-quiz.md`: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-quiz.md`
  - `pdp-complete-the-set-cross-sell.md`: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-complete-the-set-cross-sell.md`
  - `returns-self-serve-portal.md`: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md`
  - `help-center-contextual-faq.md`: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/help-center-contextual-faq.md`

