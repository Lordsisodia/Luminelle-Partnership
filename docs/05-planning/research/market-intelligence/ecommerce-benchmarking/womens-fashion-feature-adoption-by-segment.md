---
status: draft
last_reviewed: 2025-12-31
owner: growth
---

# Women’s Fashion — Feature Adoption by Segment (evidence-linked)

Goal: break down conversion tooling + UX cues by **segment** so we can decide which segments are best to model for specific features.

Evidence tier: snapshot-derived (Tier‑C / homepage signals) + matrix notes. Use Tier‑A audits for cart/checkout truth.

Sources:
- scored matrix: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.scored.csv`
- evidence paths live in the `snapshot_path` column (Tier‑C)

## Segment overview

| segment | stores | median_model_score | blocked_snapshots | top signals (quick) |
|---|---:|---:|---:|---|
| Other | 18 | 8.0 | 5 | ux_keywords:12/18, platform:11/18, bnpl:9/18 |
| Womenswear (Other) | 10 | 7.0 | 3 | platform:7/10, ux_keywords:6/10, reviews:5/10 |
| Activewear / Athleisure | 8 | 9.5 | 1 | ux_keywords:7/8, platform:6/8, reviews:5/8 |
| Contemporary Womenswear | 7 | 8.5 | 1 | platform:5/7, ux_keywords:5/7, bnpl:3/7 |
| Intimates / Shapewear | 7 | 11.0 | 0 | bnpl:5/7, platform:5/7, ux_keywords:5/7 |
| Jewelry | 7 | 12.5 | 0 | platform:7/7, ux_keywords:7/7, bnpl:5/7 |
| Accessories | 6 | 3.2 | 3 | platform:3/6, ux_keywords:3/6, bnpl:1/6 |
| Resale / Secondhand | 6 | 4.2 | 3 | platform:5/6, ux_keywords:3/6, bnpl:2/6 |
| Footwear | 5 | 14.5 | 1 | platform:5/5, reviews:5/5, ux_keywords:5/5 |
| Swimwear | 5 | 12.5 | 0 | platform:5/5, ux_keywords:5/5, bnpl:4/5 |
| Department Store | 4 | 3.0 | 1 | bnpl:1/4, platform:1/4, search_personalization:1/4 |
| Luxury Marketplace | 4 | 2.5 | 2 | platform:1/4, ux_keywords:1/4, bnpl:0/4 |
| Maternity | 3 | 9.5 | 0 | platform:3/3, reviews:3/3, support:3/3 |
| Plus-size / Inclusive | 3 | 10.5 | 0 | bnpl:2/3, platform:2/3, ux_keywords:2/3 |
| Premium DTC Womenswear | 3 | 6.0 | 1 | platform:3/3, ux_keywords:3/3, bnpl:0/3 |
| Marketplace (Other) | 2 | 3.0 | 0 | bnpl:0/2, platform:0/2, returns:0/2 |
| Rental / Subscription | 2 | 8.8 | 0 | platform:2/2, ux_keywords:2/2, support:1/2 |

## Segment breakdowns

Each segment includes: top model stores + top vendor/tooling signals + evidence pointers.

## Segment → pattern card cheat sheet (build-ready)

Use this to translate a segment choice into concrete mechanics to model/build (pattern cards are evidence-backed and map to backlog items).

- Swimwear:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-confidence-module.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-quiz.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md`
- Intimates / Shapewear:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-quiz.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/reviews-filterable-by-fit.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-variant-editing.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md`
- Activewear / Athleisure:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fabric-confidence-module.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-confidence-module.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/plp-occasion-filters.md` (adapt to “activity/fit” filters)
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md`
- Contemporary / Occasion-led womenswear:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/plp-occasion-filters.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-complete-the-set-cross-sell.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fabric-confidence-module.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md`
- Maternity / Plus-size / Inclusive:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-fit-confidence-module.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/reviews-filterable-by-fit.md` (adapt to “body stage / fit needs”)
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/help-center-contextual-faq.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md`
- International-heavy segments (any):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/global-region-routing.md`

### Other

- stores: 18
- blocked snapshots (heuristic): 5/18

Top model stores (by model_score):
- Marc Jacobs — Designer fashion — score 14.5 — https://www.marcjacobs.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/marc-jacobs.html`
- Uniqlo — Basics and functional apparel — score 14.5 — https://www.uniqlo.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/uniqlo.html`
- Urban Outfitters — Youth fashion + streetwear — score 14.5 — https://www.urbanoutfitters.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/urban-outfitters.html`
- LoveShackFancy — Feminine occasion fashion — score 13.0 — https://www.loveshackfancy.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/loveshackfancy.html`
- Veiled — Modest fashion — score 11.5 — https://veiled.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/veiled.html`

Top tooling signals (within segment):
- platform: magento (10); shopify (4); bigcommerce (1)
- bnpl: klarna (7); afterpay (4); affirm (2); zip (1)
- reviews: bazaarvoice (2); yotpo (2); okendo (1)
- returns: narvar (2); aftership (1)
- search_personalization: nosto (4); algolia (1); dynamic_yield (1); rebuy (1)
- support: zendesk (2); gorgias (1)
- subscriptions: subscribe_pro (1)

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Womenswear (Other)

- stores: 10
- blocked snapshots (heuristic): 3/10

Top model stores (by model_score):
- Free People — Boho womenswear — score 13.0 — https://www.freepeople.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/free-people.html`
- Anthropologie — Boho womenswear + lifestyle — score 11.5 — https://www.anthropologie.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/anthropologie.html`
- Universal Standard — Inclusive womenswear — score 9.5 — https://www.universalstandard.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/universal-standard.html`
- Everlane — Modern essentials womenswear — score 8.5 — https://www.everlane.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/everlane.html`
- Rouje — Parisian DTC womenswear — score 7.5 — https://www.rouje.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/rouje.html`

Top tooling signals (within segment):
- platform: magento (7); shopify (3)
- bnpl: affirm (2); afterpay (2); klarna (2)
- reviews: bazaarvoice (2); yotpo (2); judge_me (1); okendo (1)
- returns: —
- search_personalization: algolia (1); rebuy (1)
- support: gorgias (1); zendesk (1)
- subscriptions: subscribe_pro (2)

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Activewear / Athleisure

- stores: 8
- blocked snapshots (heuristic): 1/8

Top model stores (by model_score):
- Sweaty Betty — Women’s activewear — score 15.5 — https://www.sweatybetty.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/sweaty-betty.html`
- Alo Yoga — Premium athleisure — score 13.5 — https://www.aloyoga.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/alo-yoga.html`
- Carbon38 — Premium activewear marketplace — score 12.0 — https://www.carbon38.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/carbon38.html`
- Athleta — Women’s activewear — score 10.0 — https://www.athleta.gap.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/athleta.html`
- Girlfriend Collective — Sustainable activewear — score 9.0 — https://www.girlfriend.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/girlfriend-collective.html`

Top tooling signals (within segment):
- platform: magento (6); shopify (4)
- bnpl: afterpay (4); klarna (3)
- reviews: bazaarvoice (2); okendo (2); yotpo (2); trustpilot (1)
- returns: narvar (1)
- search_personalization: algolia (1); dynamic_yield (1)
- support: gorgias (2)
- subscriptions: —

What to prioritize (typical activewear anxieties):
- fabric/performance confidence modules
- PLP filters for activity/fit + easy size guide access
- returns clarity + shipping threshold messaging

### Contemporary Womenswear

- stores: 7
- blocked snapshots (heuristic): 1/7

Top model stores (by model_score):
- Staud — Contemporary womenswear — score 13.0 — https://www.staud.clothing — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/staud.html`
- AllSaints — Contemporary womenswear — score 12.0 — https://www.allsaints.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/allsaints.html`
- Ganni — Contemporary womenswear — score 10.0 — https://www.ganni.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/ganni.html`
- Maje — Contemporary womenswear — score 8.5 — https://us.maje.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/maje.html`
- Sandro — Contemporary womenswear — score 8.0 — https://us.sandro-paris.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/sandro.html`

Top tooling signals (within segment):
- platform: magento (5); shopify (1)
- bnpl: klarna (3); afterpay (2)
- reviews: trustpilot (1); yotpo (1)
- returns: loop_returns (1)
- search_personalization: searchspring (1)
- support: zendesk (1)
- subscriptions: —

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Intimates / Shapewear

- stores: 7
- blocked snapshots (heuristic): 0/7

Top model stores (by model_score):
- Negative Underwear — Premium minimal lingerie — score 14.0 — https://negativeunderwear.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/negative-underwear.html`
- SKIMS — Shapewear + intimates — score 14.0 — https://skims.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/skims.html`
- ThirdLove — Fit-first lingerie — score 13.0 — https://www.thirdlove.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/thirdlove.html`
- Victoria's Secret — Lingerie + intimates — score 11.0 — https://www.victoriassecret.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/victorias-secret.html`
- CUUP — Premium lingerie — score 10.5 — https://www.cuup.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/cuup.html`

Top tooling signals (within segment):
- platform: magento (5); shopify (3)
- bnpl: afterpay (4); klarna (3); affirm (1)
- reviews: okendo (2); bazaarvoice (1); trustpilot (1); yotpo (1)
- returns: narvar (2); loop_returns (1)
- search_personalization: rebuy (2); algolia (1); dynamic_yield (1)
- support: gorgias (1)
- subscriptions: —

What to prioritize (typical intimates anxieties):
- fit quiz / sizing helper + “runs small/large” clarity
- reviews filterable by fit + photos
- checkout trust cues + discreet shipping/returns clarity

### Jewelry

- stores: 7
- blocked snapshots (heuristic): 0/7

Top model stores (by model_score):
- Gorjana — Jewelry — score 14.0 — https://www.gorjana.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/gorjana.html`
- Kendra Scott — Jewelry — score 14.0 — https://www.kendrascott.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/kendra-scott.html`
- Missoma — Jewelry — score 13.0 — https://www.missoma.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/missoma.html`
- Mejuri — Jewelry — score 12.5 — https://mejuri.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/mejuri.html`
- Catbird — Jewelry — score 11.5 — https://www.catbirdnyc.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/catbird.html`

Top tooling signals (within segment):
- platform: magento (7); shopify (4)
- bnpl: klarna (4); affirm (1); afterpay (1)
- reviews: bazaarvoice (2); yotpo (2); okendo (1)
- returns: loop_returns (1)
- search_personalization: algolia (1); klevu (1); nosto (1); searchspring (1)
- support: —
- subscriptions: —

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Accessories

- stores: 6
- blocked snapshots (heuristic): 3/6

Top model stores (by model_score):
- Telfar — Streetwear accessories — score 8.5 — https://telfar.net — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/telfar.html`
- Longchamp — Accessories — score 6.0 — https://www.longchamp.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/longchamp.html`
- Tory Burch — Accessories + womenswear — score 5.5 — https://www.toryburch.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/tory-burch.html`
- Coach — Accessories — score 1.0 — https://www.coach.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/coach.html`
- Kate Spade — Accessories — score 1.0 — https://www.katespade.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/kate-spade.html`

Top tooling signals (within segment):
- platform: magento (3); shopify (1)
- bnpl: klarna (1)
- reviews: —
- returns: —
- search_personalization: —
- support: —
- subscriptions: —

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Resale / Secondhand

- stores: 6
- blocked snapshots (heuristic): 3/6

Top model stores (by model_score):
- Poshmark — Resale marketplace — score 10.0 — https://poshmark.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/poshmark.html`
- Vinted — Resale marketplace — score 10.0 — https://www.vinted.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/vinted.html`
- Depop — Resale social marketplace — score 4.5 — https://www.depop.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/depop.html`
- The RealReal — Luxury resale marketplace — score 4.0 — https://www.therealreal.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/the-realreal.html`
- thredUP — Resale marketplace — score 2.0 — https://www.thredup.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/thredup.html`

Top tooling signals (within segment):
- platform: magento (5)
- bnpl: affirm (1); klarna (1)
- reviews: trustpilot (1)
- returns: —
- search_personalization: —
- support: zendesk (1)
- subscriptions: recharge (1)

What to prioritize (typical resale anxieties):
- condition taxonomy + trust cues
- search + filters + saved searches
- returns posture (often constrained) clearly surfaced

### Footwear

- stores: 5
- blocked snapshots (heuristic): 1/5

Top model stores (by model_score):
- Loeffler Randall — Shoes + accessories — score 16.5 — https://www.loefflerrandall.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/loeffler-randall.html`
- Steve Madden — Shoes — score 15.5 — https://www.stevemadden.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/steve-madden.html`
- Rothy's — Shoes + accessories — score 14.5 — https://rothys.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/rothys.html`
- Dolce Vita — Shoes — score 13.5 — https://www.dolcevita.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/dolce-vita.html`
- Birdies — Women’s footwear — score 9.0 — https://birdies.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/birdies.html`

Top tooling signals (within segment):
- platform: shopify (5); magento (4)
- bnpl: afterpay (4)
- reviews: yotpo (4); okendo (1)
- returns: loop_returns (1); narvar (1)
- search_personalization: algolia (2); searchspring (1)
- support: gorgias (4)
- subscriptions: recharge (3)

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Swimwear

- stores: 5
- blocked snapshots (heuristic): 0/5

Top model stores (by model_score):
- Andie Swim — Swimwear — score 16.5 — https://andieswim.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/andie-swim.html`
- Frankies Bikinis — Trend swimwear — score 13.5 — https://frankiesbikinis.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/frankies-bikinis.html`
- Montce Swim — Swimwear — score 12.5 — https://www.montce.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/montce-swim.html`
- Triangl — Swimwear — score 12.5 — https://triangl.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/triangl.html`
- Summersalt — Swimwear — score 10.5 — https://www.summersalt.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/summersalt.html`

Top tooling signals (within segment):
- platform: magento (5); shopify (5)
- bnpl: afterpay (3); klarna (3); zip (1)
- reviews: trustpilot (2); yotpo (2); okendo (1)
- returns: loop_returns (2)
- search_personalization: nosto (2); searchspring (1)
- support: gorgias (2); intercom (1); zendesk (1)
- subscriptions: —

What to prioritize (typical swimwear anxieties):
- fit/coverage confidence (model measurements + fit notes)
- returns portal + exchange-first messaging
- PDP media (angles + video) and size guide proximity

### Department Store

- stores: 4
- blocked snapshots (heuristic): 1/4

Top model stores (by model_score):
- Saks Fifth Avenue — Luxury department store — score 10.5 — https://www.saksfifthavenue.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/saks-fifth-avenue.html`
- Neiman Marcus — Luxury department store — score 3.0 — https://www.neimanmarcus.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/neiman-marcus.html`
- Nordstrom — Department store womenswear — score 3.0 — https://www.nordstrom.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/nordstrom.html`
- Bloomingdale's — Department store womenswear — score 1.0 — https://www.bloomingdales.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/bloomingdales.html`

Top tooling signals (within segment):
- platform: magento (1)
- bnpl: klarna (1)
- reviews: —
- returns: —
- search_personalization: dynamic_yield (1)
- support: —
- subscriptions: —

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Luxury Marketplace

- stores: 4
- blocked snapshots (heuristic): 2/4

Top model stores (by model_score):
- Mytheresa — Luxury womenswear marketplace — score 3.0 — https://www.mytheresa.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/mytheresa.html`
- Net-a-Porter — Luxury womenswear marketplace — score 3.0 — https://www.net-a-porter.com — evidence: `—`
- SSENSE — Luxury/streetwear marketplace — score 2.0 — https://www.ssense.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/ssense.html`
- Farfetch — Luxury marketplace (multi-boutique) — score 1.0 — https://www.farfetch.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/farfetch.html`

Top tooling signals (within segment):
- platform: magento (1)
- bnpl: —
- reviews: —
- returns: —
- search_personalization: —
- support: —
- subscriptions: —

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Maternity

- stores: 3
- blocked snapshots (heuristic): 0/3

Top model stores (by model_score):
- Pink Blush Maternity — Maternity — score 13.0 — https://www.pinkblushmaternity.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/pink-blush-maternity.html`
- Hatch — Maternity — score 9.5 — https://www.hatchcollection.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/hatch.html`
- Seraphine — Maternity — score 9.0 — https://www.seraphine.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/seraphine.html`

Top tooling signals (within segment):
- platform: magento (3); shopify (2)
- bnpl: —
- reviews: yotpo (2); bazaarvoice (1); trustpilot (1)
- returns: —
- search_personalization: nosto (1); searchspring (1)
- support: zendesk (2); gorgias (1)
- subscriptions: —

What to prioritize (typical maternity anxieties):
- fit-by-trimester guidance + reviews by body stage
- returns/exchanges clarity and generous windows
- size guide clarity (US/intl) + supportive PDP copy

### Plus-size / Inclusive

- stores: 3
- blocked snapshots (heuristic): 0/3

Top model stores (by model_score):
- Lane Bryant — Plus-size womenswear — score 11.0 — https://www.lanebryant.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/lane-bryant.html`
- Eloquii — Plus-size womenswear — score 10.5 — https://www.eloquii.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/eloquii.html`
- Torrid — Plus-size womenswear — score 3.0 — https://www.torrid.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/torrid.html`

Top tooling signals (within segment):
- platform: magento (2)
- bnpl: affirm (1); klarna (1)
- reviews: —
- returns: narvar (1)
- search_personalization: —
- support: —
- subscriptions: —

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Premium DTC Womenswear

- stores: 3
- blocked snapshots (heuristic): 1/3

Top model stores (by model_score):
- Reformation — Premium DTC womenswear — score 9.0 — https://www.thereformation.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/reformation.html`
- Sezane — Premium DTC womenswear — score 6.0 — https://www.sezane.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/sezane.html`
- Doen — Premium DTC womenswear — score 2.0 — https://www.doen.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/doen.html`

Top tooling signals (within segment):
- platform: magento (3)
- bnpl: —
- reviews: —
- returns: —
- search_personalization: —
- support: —
- subscriptions: —

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Marketplace (Other)

- stores: 2
- blocked snapshots (heuristic): 0/2

Top model stores (by model_score):
- ASOS — Mass fashion marketplace — score 3.0 — https://www.asos.com — evidence: `—`
- Revolve — Trend fashion marketplace — score 3.0 — https://www.revolve.com — evidence: `—`

Top tooling signals (within segment):
- platform: —
- bnpl: —
- reviews: —
- returns: —
- search_personalization: —
- support: —
- subscriptions: —

What to prioritize:
- discovery entry points (new/best/occasion) + filters
- PDP confidence (fit/quality) + returns clarity
- checkout friction removal (express + trust cues)

### Rental / Subscription

- stores: 2
- blocked snapshots (heuristic): 0/2

Top model stores (by model_score):
- Nuuly — Rental fashion — score 10.0 — https://www.nuuly.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/nuuly.html`
- Rent the Runway — Rental fashion — score 7.5 — https://www.renttherunway.com — evidence: `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/rent-the-runway.html`

Top tooling signals (within segment):
- platform: magento (2)
- bnpl: —
- reviews: —
- returns: —
- search_personalization: —
- support: intercom (1)
- subscriptions: —

What to prioritize (typical rental anxieties):
- onboarding + plan selection clarity
- returns logistics + due date clarity
- fit guidance + occasion discovery
