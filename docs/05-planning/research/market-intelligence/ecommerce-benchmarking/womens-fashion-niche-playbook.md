---
status: draft
last_reviewed: 2025-12-30
owner: growth
---

# Women’s Fashion — Niche Playbook (Model Stores + Patterns)

This is a practical breakdown of women’s fashion sub-niches with **model stores** to copy patterns from.
Built from our 100-store matrix + automated snapshot signal detection (static HTML).

Evidence + data sources:
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.enriched.csv`
- `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/reports/store-snapshots-summary.csv`
- `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/`

Limitations (important):
- Snapshot signals are **heuristics** from saved HTML (no JS execution); absence ≠ feature missing.
- “Blocked” means the saved snapshot looked like bot protection; automation is unreliable for that store.

Scoring heuristic (used only to pick top examples per niche):
- Higher score = more conversion tooling signals + auditability + stronger notes.
- Generated at: `2025-12-30T14:22:12Z`

## Model stores by niche (top picks)

### Premium DTC Womenswear

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Reformation | Premium DTC womenswear | DTC brand | 9.0 | platform: magento | PDP fabric/fit callouts; outfit styling; sustainability positioning; fast checkout | Heavy imagery can impact performance | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/reformation.html` |
| Sezane | Premium DTC womenswear | DTC brand | 6.0 | platform: magento | Shop the look; outfit bundling; editorial PLPs; strong photography | Can bury basics behind storytelling | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/sezane.html` |
| Doen | Premium DTC womenswear | DTC brand | 2.0 | blocked; platform: magento | Editorial merchandising; PDP photography; outfit styling | Assortment volatility risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/doen.html` |

### Contemporary Womenswear

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Staud | Contemporary womenswear | DTC brand | 13.0 | platform: shopify, magento; bnpl: afterpay, klarna; reviews: trustpilot; returns: loop_returns | Premium visuals; curated drops; cross-sell | Automated snapshot timed out; manual audit required | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/staud.html` |
| AllSaints | Contemporary womenswear | Legacy retail | 12.0 | platform: magento; bnpl: afterpay, klarna; reviews: yotpo | Category landing pages; strong photography; promotions done cleanly | Legacy UX debt risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/allsaints.html` |
| Ganni | Contemporary womenswear | Legacy retail | 10.0 | platform: magento; bnpl: klarna | Trend capsules; editorial imagery; clear category architecture | Internationalization complexity | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/ganni.html` |

### Intimates / Shapewear

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Negative Underwear | Premium minimal lingerie | DTC brand | 14.0 | platform: shopify, magento; bnpl: afterpay; reviews: okendo; returns: loop_returns; search: rebuy | Minimal PDP; strong imagery; clear policies | Needs strong trust/returns info visibility | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/negative-underwear.html` |
| SKIMS | Shapewear + intimates | DTC brand | 14.0 | platform: shopify, magento; bnpl: afterpay, klarna; reviews: okendo; search: algolia, dynamic_yield | Fit/size guidance; complete-the-set; BNPL; fast checkout | Can feel hype-driven without clear guidance | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/skims.html` |
| ThirdLove | Fit-first lingerie | DTC brand | 13.0 | platform: shopify, magento; bnpl: afterpay, klarna; reviews: yotpo, trustpilot; search: rebuy | Fit quiz; size guidance; trust + returns messaging | Needs ongoing social proof freshness | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/thirdlove.html` |

### Activewear / Athleisure

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Sweaty Betty | Women’s activewear | Legacy retail | 15.5 | platform: magento; bnpl: afterpay, klarna; reviews: bazaarvoice; returns: narvar; search: algolia, dynamic_yield | Fit guidance; activity edits; loyalty modules | Legacy UX debt risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/sweaty-betty.html` |
| Alo Yoga | Premium athleisure | DTC brand | 13.5 | platform: shopify, magento; bnpl: afterpay; reviews: bazaarvoice | Lifestyle imagery; best sellers edits; strong PDP media | Can prioritize hype over clarity | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/alo-yoga.html` |
| Carbon38 | Premium activewear marketplace | Marketplace | 12.0 | platform: shopify, magento; bnpl: afterpay, klarna; reviews: yotpo, trustpilot | Curated edits; premium PLP/PDP; cross-sells | Smaller brand awareness | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/carbon38.html` |

### Swimwear

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Andie Swim | Swimwear | DTC brand | 16.5 | platform: shopify, magento; bnpl: afterpay, zip; reviews: okendo; returns: loop_returns; search: nosto | Coverage tags; fit quiz entry points; clear returns | Limited assortment requires strong discovery | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/andie-swim.html` |
| Frankies Bikinis | Trend swimwear | DTC brand | 13.5 | platform: shopify, magento; bnpl: afterpay, klarna; search: nosto | Trend drops; lifestyle imagery; fast quick-add | Can trade clarity for hype | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/frankies-bikinis.html` |
| Montce Swim | Swimwear | DTC brand | 12.5 | platform: shopify, magento; bnpl: afterpay, klarna; reviews: yotpo, trustpilot | Mix-and-match UX; styling imagery; size guidance | Config complexity can increase friction | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/montce-swim.html` |

### Luxury Marketplace

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Mytheresa | Luxury womenswear marketplace | Marketplace | 3.0 | — | Luxury filters; editorial + commerce blend; high trust UX | Can be heavy on imagery/performance | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/mytheresa.html` |
| Net-a-Porter | Luxury womenswear marketplace | Marketplace | 3.0 | — | Editorial merchandising; luxury trust framing; top-tier filtering | Automated snapshot timed out; manual audit required | `https://www.net-a-porter.com` |
| SSENSE | Luxury/streetwear marketplace | Marketplace | 2.0 | blocked; platform: magento | Editorial voice; search + merch blend; sharp PDP layouts | Bot protection blocks automated audits | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/ssense.html` |

### Resale / Secondhand

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Poshmark | Resale marketplace | Marketplace | 10.0 | bnpl: affirm; reviews: trustpilot | Social proof loops; offers; saved searches | Varied seller quality impacts trust | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/poshmark.html` |
| Vinted | Resale marketplace | Marketplace | 10.0 | blocked; platform: magento; bnpl: klarna | Low-friction listing/buying; saved searches; shipping UX | Trust mechanisms vary by region | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/vinted.html` |
| Depop | Resale social marketplace | Marketplace | 4.5 | platform: magento | Feed discovery; seller profiles; offers | Trust/quality variability | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/depop.html` |

### Rental / Subscription

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Nuuly | Rental fashion | Subscription rental | 10.0 | platform: magento | Subscription UX; discovery filters; closet-like saving | Membership friction risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/nuuly.html` |
| Rent the Runway | Rental fashion | Subscription rental | 7.5 | platform: magento | Membership UX; occasion discovery; wardrobe planning | Onboarding complexity can reduce signups | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/rent-the-runway.html` |

### Plus-size / Inclusive

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Lane Bryant | Plus-size womenswear | Legacy retail | 11.0 | platform: magento; bnpl: klarna | Size-first nav; fit tools; store pickup framing | Promo clutter risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/lane-bryant.html` |
| Eloquii | Plus-size womenswear | Legacy retail | 10.5 | platform: magento; bnpl: affirm; returns: narvar | Occasion filters; inclusive imagery; returns clarity | Promo noise risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/eloquii.html` |
| Torrid | Plus-size womenswear | Legacy retail | 3.0 | — | Shop-by-need; fit guidance; loyalty | Legacy UX debt risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/torrid.html` |

### Maternity

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Pink Blush Maternity | Maternity | DTC brand | 13.0 | platform: shopify, magento; reviews: yotpo, trustpilot; search: searchspring | Offer architecture; maternity filters; fast checkout | Promo overload risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/pink-blush-maternity.html` |
| Hatch | Maternity | DTC brand | 9.5 | platform: shopify, magento; reviews: yotpo; search: nosto | Editorial merchandising; fit guidance; premium trust cues | Higher price increases trust burden | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/hatch.html` |
| Seraphine | Maternity | Legacy retail | 9.0 | platform: magento; reviews: bazaarvoice | Maternity fit guidance; occasion edits; returns clarity | Legacy UX risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/seraphine.html` |

### Department Store

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Saks Fifth Avenue | Luxury department store | Marketplace | 10.5 | platform: magento; bnpl: klarna; search: dynamic_yield | Luxury merchandising; concierge/service cues; filters | Can feel legacy and heavy | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/saks-fifth-avenue.html` |
| Neiman Marcus | Luxury department store | Marketplace | 3.0 | — | Editorial merchandising; luxury trust cues; designer taxonomy | Legacy performance/complexity risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/neiman-marcus.html` |
| Nordstrom | Department store womenswear | Marketplace | 3.0 | — | Filters; pickup/returns trust cues; “best sellers” curation | Choice overload without guardrails | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/nordstrom.html` |

### Jewelry

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Gorjana | Jewelry | DTC brand | 14.0 | platform: shopify, magento; reviews: okendo; returns: loop_returns; search: nosto | Gift finders; curated edits; fast checkout | Commoditization risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/gorjana.html` |
| Kendra Scott | Jewelry | Legacy retail | 14.0 | platform: magento; bnpl: afterpay, affirm; reviews: bazaarvoice | Gift guides; personalization; store locator | Complexity at scale | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/kendra-scott.html` |
| Missoma | Jewelry | DTC brand | 13.0 | platform: shopify, magento; bnpl: klarna; reviews: bazaarvoice; search: klevu | Layering bundles; UGC; gifting UX | Needs strong UGC to reduce doubt | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/missoma.html` |

### Footwear

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Loeffler Randall | Shoes + accessories | DTC brand | 16.5 | platform: shopify, magento; bnpl: afterpay; reviews: okendo; returns: loop_returns; search: searchspring | Premium PDP; styling imagery; cross-sells | Needs strong size/fit info | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/loeffler-randall.html` |
| Steve Madden | Shoes | Legacy retail | 15.5 | platform: shopify, magento; bnpl: afterpay; reviews: yotpo; returns: narvar; search: algolia | Promo merchandising; category breadth; filters | Promo clutter risk | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/steve-madden.html` |
| Rothy's | Shoes + accessories | DTC brand | 14.5 | platform: shopify, magento; bnpl: afterpay; reviews: yotpo | Benefit-led PDP; UGC/reviews; fast checkout | Sizing confidence remains critical | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/rothys.html` |

### Accessories

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Telfar | Streetwear accessories | DTC brand | 8.5 | platform: shopify, magento; bnpl: klarna | Waitlists; drop messaging; SMS/email capture | Scarcity can create UX frustration | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/telfar.html` |
| Longchamp | Accessories | Legacy retail | 6.0 | platform: magento | Localization; premium PDP; gifting UX | Internationalization complexity | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/longchamp.html` |
| Tory Burch | Accessories + womenswear | Legacy retail | 5.5 | platform: magento | Premium PDP; brand storytelling; store locator | High imagery weight | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/tory-burch.html` |

### Marketplace (Other)

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| ASOS | Mass fashion marketplace | Marketplace | 3.0 | — | Best-in-class filters; inclusive size navigation; fast search | Site weight and choice overload | `https://www.asos.com` |
| Revolve | Trend fashion marketplace | Marketplace | 3.0 | — | Trending edits; influencer merchandising; fast category discovery | Automated snapshot timed out; manual audit required | `https://www.revolve.com` |

### Womenswear (Other)

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Free People | Boho womenswear | Legacy retail | 13.0 | platform: magento; bnpl: afterpay, klarna, affirm; reviews: bazaarvoice | Trending edits; outfit styling; UGC + reviews; free-shipping thresholds | Navigation can get long/scroll-heavy | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/free-people.html` |
| Anthropologie | Boho womenswear + lifestyle | Legacy retail | 11.5 | platform: magento; bnpl: afterpay, klarna, affirm; reviews: bazaarvoice | Editorial collections; cross-category merchandising; rich PDP media | Can overwhelm users with variety | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/anthropologie.html` |
| Universal Standard | Inclusive womenswear | DTC brand | 9.5 | platform: shopify, magento; reviews: yotpo, okendo | Inclusive sizing UX; fit guidance; easy exchanges | Assortment breadth still needs guardrails | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/universal-standard.html` |

### Other

| store | niche | archetype | score | signals (homepage snapshot) | features to steal | watchouts | evidence |
|---|---|---:|---:|---|---|---|---|
| Marc Jacobs | Designer fashion | Legacy retail | 14.5 | platform: magento; bnpl: afterpay, klarna; returns: narvar; search: nosto | Editorial product pages; curated drops; wishlists | Limited inventory can frustrate | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/marc-jacobs.html` |
| Uniqlo | Basics and functional apparel | Legacy retail | 14.5 | blocked; platform: magento; bnpl: klarna; reviews: bazaarvoice; returns: narvar; search: nosto | Fabric/tech education; comparison modules; clean PDP specs | Copy-heavy pages can feel dense | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/uniqlo.html` |
| Urban Outfitters | Youth fashion + streetwear | Legacy retail | 14.5 | platform: magento; bnpl: afterpay, klarna, affirm; reviews: bazaarvoice; search: nosto | PLP quick add; trend capsules; personalization recommendations | Can be noisy and promo-saturated | `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/urban-outfitters.html` |

## Next step (to make this screenshot-proof)

- Run Batch‑01 manual funnel audits (SKIMS / Reformation / Sézane) to capture PDP → cart → checkout evidence:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/DASHBOARD.md`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/womens-fashion-capture-todo-batch-01.md`
