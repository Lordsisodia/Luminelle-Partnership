---
status: draft
last_reviewed: 2025-12-31
owner: growth
---

# Women’s Fashion — 100 Store Cards (what works / watchouts / features)

Goal: make the Top‑100 women’s fashion benchmark quickly browsable without opening CSVs.

Source of truth (row-level data):
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.scored.csv`

Notes:
- “Signals” are heuristic (static homepage snapshots; no JS execution). Absence ≠ feature missing.
- Use Tier‑A audits for cart/checkout reality checks.

## Quick index

Top 15 overall (by `model_score`):

- **Andie Swim** — Swimwear; Swimwear; score 16.5
- **Loeffler Randall** — Footwear; Shoes + accessories; score 16.5
- **Sweaty Betty** — Activewear / Athleisure; Women’s activewear; score 15.5
- **Steve Madden** — Footwear; Shoes; score 15.5
- **Urban Outfitters** — Other; Youth fashion + streetwear; score 14.5
- **Uniqlo** — Other; Basics and functional apparel; score 14.5
- **Rothy's** — Footwear; Shoes + accessories; score 14.5
- **Marc Jacobs** — Other; Designer fashion; score 14.5
- **SKIMS** — Intimates / Shapewear; Shapewear + intimates; score 14.0
- **Negative Underwear** — Intimates / Shapewear; Premium minimal lingerie; score 14.0
- **Gorjana** — Jewelry; Jewelry; score 14.0
- **Kendra Scott** — Jewelry; Jewelry; score 14.0
- **Alo Yoga** — Activewear / Athleisure; Premium athleisure; score 13.5
- **Frankies Bikinis** — Swimwear; Trend swimwear; score 13.5
- **Dolce Vita** — Footwear; Shoes; score 13.5

Segment counts:

- Other: 18
- Womenswear (Other): 10
- Activewear / Athleisure: 8
- Contemporary Womenswear: 7
- Intimates / Shapewear: 7
- Jewelry: 7
- Accessories: 6
- Resale / Secondhand: 6
- Swimwear: 5
- Footwear: 5
- Luxury Marketplace: 4
- Department Store: 4
- Premium DTC Womenswear: 3
- Plus-size / Inclusive: 3
- Maternity: 3
- Marketplace (Other): 2
- Rental / Subscription: 2

## Other (N=18)

- **Urban Outfitters** — score 14.5; Legacy retail; Youth fashion + streetwear
  - Signals: platform: magento; bnpl: afterpay, klarna, affirm; reviews: bazaarvoice; search: nosto
  - What works: Fast trend merchandising and discovery
  - Watchouts: Can be noisy and promo-saturated
  - Features to steal: PLP quick add; trend capsules; personalization recommendations
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/urban-outfitters.html
  - URL: https://www.urbanoutfitters.com

- **Uniqlo** — score 14.5; Legacy retail; Basics and functional apparel
  - Signals: platform: magento; bnpl: klarna; reviews: bazaarvoice; returns: narvar; search: nosto; blocked: bot_protection_or_blocked
  - What works: Benefits-led merchandising (fabric tech) builds confidence
  - Watchouts: Copy-heavy pages can feel dense
  - Features to steal: Fabric/tech education; comparison modules; clean PDP specs
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/uniqlo.html
  - URL: https://www.uniqlo.com

- **Marc Jacobs** — score 14.5; Legacy retail; Designer fashion
  - Signals: platform: magento; bnpl: afterpay, klarna; returns: narvar; search: nosto
  - What works: High brand personality with curated assortment
  - Watchouts: Limited inventory can frustrate
  - Features to steal: Editorial product pages; curated drops; wishlists
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/marc-jacobs.html
  - URL: https://www.marcjacobs.com

- **LoveShackFancy** — score 13.0; Legacy retail; Feminine occasion fashion
  - Signals: platform: shopify, magento; reviews: yotpo; search: nosto, rebuy, dynamic_yield
  - What works: Strong brand story and gifting/occasion merchandising
  - Watchouts: High imagery weight/performance risk
  - Features to steal: Editorial collections; gifting modules; strong PDP visuals
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/loveshackfancy.html
  - URL: https://www.loveshackfancy.com

- **Veiled** — score 11.5; DTC brand; Modest fashion
  - Signals: platform: shopify, magento; reviews: okendo
  - What works: Tight category focus with clear brand identity
  - Watchouts: Needs excellent fit/size clarity
  - Features to steal: Clear navigation; fit guidance; strong PDP media
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/veiled.html
  - URL: https://veiled.com

- **Banana Republic** — score 11.0; Legacy retail; Modern premium basics
  - Signals: platform: magento; bnpl: afterpay, klarna
  - What works: Strong occasion-based merchandising
  - Watchouts: Can feel promo-heavy at the expense of brand
  - Features to steal: Occasion edits; bundle styling; easy returns messaging
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/banana-republic.html
  - URL: https://bananarepublic.gap.com

- **Lulus** — score 10.5; DTC brand; Occasion dresses (mid-price)
  - Signals: platform: magento; bnpl: afterpay, klarna; reviews: yotpo
  - What works: Occasion-first shopping with strong search intent capture
  - Watchouts: PDP confidence needs constant upkeep
  - Features to steal: Occasion filters; fit guidance; reviews + photos; clear shipping/returns
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/lulus.html
  - URL: https://www.lulus.com

- **Realisation Par** — score 10.5; DTC brand; Occasion dresses
  - Signals: platform: bigcommerce; bnpl: zip; returns: aftership
  - What works: Tight occasion assortment with strong visuals
  - Watchouts: Limited sizing needs confidence tools
  - Features to steal: Occasion merch; clear fit guidance; strong PDP media
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/realisation-par.html
  - URL: https://realisationpar.com

- **Moda Operandi** — score 8.0; Marketplace; Luxury trunkshow / editorial commerce
  - Signals: bnpl: affirm; search: algolia
  - What works: Editorial storytelling tied to commerce
  - Watchouts: Smaller audience patterns may not generalize
  - Features to steal: Editorial commerce layout; preorder framing; curated edits
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/moda-operandi.html
  - URL: https://www.modaoperandi.com

- **Grace Loves Lace** — score 8.0; DTC brand; Bridal
  - Signals: platform: shopify, magento; bnpl: klarna
  - What works: High-trust bridal storytelling and appointment framing
  - Watchouts: Long consideration cycle needs nurture
  - Features to steal: Appointment flows; high-touch trust cues; PDP storytelling
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/grace-loves-lace.html
  - URL: https://graceloveslace.com

- **Bimba y Lola** — score 8.0; Legacy retail; Contemporary fashion
  - Signals: platform: magento; bnpl: klarna
  - What works: Distinct brand + accessories cross-sell
  - Watchouts: Regional UX differences
  - Features to steal: Cross-sell accessories; curated edits; localization patterns
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/bimba-y-lola.html
  - URL: https://www.bimbaylola.com

- **David's Bridal** — score 6.0; Legacy retail; Bridal
  - Signals: platform: shopify, magento
  - What works: Assortment depth + service framing
  - Watchouts: Legacy UX complexity
  - Features to steal: Occasion filters; appointment booking; returns/alterations messaging
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/davids-bridal.html
  - URL: https://www.davidsbridal.com

- **Zara** — score 3.0; Legacy retail; Fast fashion
  - What works: High-end editorial feel at scale
  - Watchouts: Can reduce clarity on product details
  - Features to steal: Editorial merchandising; collection drops; minimal friction browsing
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/zara.html
  - URL: https://www.zara.com

- **Massimo Dutti** — score 3.0; Legacy retail; Premium high-street
  - What works: Premium positioning and editorial merchandising
  - Watchouts: Can hide product info behind imagery
  - Features to steal: Editorial collection pages; product styling; premium copy tone
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/massimo-dutti.html
  - URL: https://www.massimodutti.com

- **H&M** — score 1.0; Legacy retail; Value fast fashion
  - Signals: blocked: bot_protection_or_blocked
  - What works: Broad entry-price assortment and strong promo cadence
  - Watchouts: Bot protection blocks automated audits
  - Features to steal: Promo merchandising; category breadth; low-friction checkout
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/h-m.html
  - URL: https://www2.hm.com

- **COS** — score 1.0; Legacy retail; Minimal premium fashion
  - Signals: blocked: bot_protection_or_blocked
  - What works: Premium feel and disciplined product storytelling
  - Watchouts: Bot protection blocks automated audits
  - Features to steal: Minimalist PDP; strong typography; restrained promos
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/cos.html
  - URL: https://www.cos.com

- **Arket** — score 1.0; Legacy retail; Scandi minimal essentials
  - Signals: blocked: bot_protection_or_blocked
  - What works: Clear product universes and lifestyle framing
  - Watchouts: Bot protection blocks automated audits
  - Features to steal: Category architecture; sustainability cues; modern UX
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/arket.html
  - URL: https://www.arket.com

- **Modanisa** — score 1.0; Marketplace; Modest fashion
  - Signals: blocked: bot_protection_or_blocked
  - What works: Category breadth and modest-specific taxonomy
  - Watchouts: Discovery overload risk
  - Features to steal: Modest taxonomy; filters; internationalization
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/modanisa.html
  - URL: https://modanisa.com

## Womenswear (Other) (N=10)

- **Free People** — score 13.0; Legacy retail; Boho womenswear
  - Signals: platform: magento; bnpl: afterpay, klarna, affirm; reviews: bazaarvoice
  - What works: Trend-forward assortment with strong imagery
  - Watchouts: Navigation can get long/scroll-heavy
  - Features to steal: Trending edits; outfit styling; UGC + reviews; free-shipping thresholds
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/free-people.html
  - URL: https://www.freepeople.com

- **Anthropologie** — score 11.5; Legacy retail; Boho womenswear + lifestyle
  - Signals: platform: magento; bnpl: afterpay, klarna, affirm; reviews: bazaarvoice
  - What works: Inspiration-first browsing with lifestyle merchandising
  - Watchouts: Can overwhelm users with variety
  - Features to steal: Editorial collections; cross-category merchandising; rich PDP media
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/anthropologie.html
  - URL: https://www.anthropologie.com

- **Universal Standard** — score 9.5; DTC brand; Inclusive womenswear
  - Signals: platform: shopify, magento; reviews: yotpo, okendo
  - What works: Inclusive sizing and fit confidence as core UX
  - Watchouts: Assortment breadth still needs guardrails
  - Features to steal: Inclusive sizing UX; fit guidance; easy exchanges
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/universal-standard.html
  - URL: https://www.universalstandard.com

- **Everlane** — score 8.5; DTC brand; Modern essentials womenswear
  - Signals: platform: shopify, magento; reviews: yotpo; search: algolia, rebuy
  - What works: Simple browsing and “materials/ethics” trust framing
  - Watchouts: Can feel generic without strong social proof
  - Features to steal: Clear value props; material transparency; minimalist PDP structure
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/everlane.html
  - URL: https://www.everlane.com

- **Rouje** — score 7.5; DTC brand; Parisian DTC womenswear
  - Signals: platform: shopify, magento; reviews: judge_me
  - What works: Editorial “wardrobe” merchandising that sells outfits
  - Watchouts: Can hide basics behind narrative
  - Features to steal: Shop the look; editorial PLPs; PDP storytelling
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/rouje.html
  - URL: https://www.rouje.com

- **Shopbop** — score 6.5; Marketplace; Multi-brand womenswear
  - Signals: platform: magento
  - What works: Clear discovery + filters tailored to fashion shoppers
  - Watchouts: Can feel utilitarian vs premium brands
  - Features to steal: Best-in-class filters; designer taxonomy; wishlists
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/shopbop.html
  - URL: https://www.shopbop.com

- **Nordstrom Rack** — score 3.0; Marketplace; Off-price womenswear
  - What works: Deal-first discovery and urgency mechanics
  - Watchouts: Promo noise can hurt confidence
  - Features to steal: Deal merchandising; clearance UX; strong category navigation
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/nordstrom-rack.html
  - URL: https://www.nordstromrack.com

- **Aritzia** — score 2.0; DTC brand; Premium multi-brand womenswear (house brands)
  - Signals: platform: magento; blocked: bot_protection_or_blocked
  - What works: Strong merchandising and collection navigation
  - Watchouts: Bot protection blocks automated audits
  - Features to steal: PLP merchandising; category architecture; store locator; quick-add patterns
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/aritzia.html
  - URL: https://www.aritzia.com

- **Madewell** — score 1.0; Legacy retail; Denim + casual womenswear
  - Signals: blocked: bot_protection_or_blocked
  - What works: Strong denim focus and wardrobe basics discovery
  - Watchouts: Bot protection blocks automated audits
  - Features to steal: Denim fit guidance; cross-sells; loyalty/rewards; store pickup framing
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/madewell.html
  - URL: https://www.madewell.com

- **J.Crew** — score 1.0; Legacy retail; Classic womenswear
  - Signals: blocked: bot_protection_or_blocked
  - What works: Promotion + merchandising cadence drives frequent return visits
  - Watchouts: Bot protection blocks automated audits
  - Features to steal: Promo merchandising; category landing pages; gifting modules
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/j-crew.html
  - URL: https://www.jcrew.com

## Activewear / Athleisure (N=8)

- **Sweaty Betty** — score 15.5; Legacy retail; Women’s activewear
  - Signals: platform: magento; bnpl: afterpay, klarna; reviews: bazaarvoice; returns: narvar; search: algolia, dynamic_yield
  - What works: Activity and fit framing boosts confidence
  - Watchouts: Legacy UX debt risk
  - Features to steal: Fit guidance; activity edits; loyalty modules
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/sweaty-betty.html
  - URL: https://www.sweatybetty.com

- **Alo Yoga** — score 13.5; DTC brand; Premium athleisure
  - Signals: platform: shopify, magento; bnpl: afterpay; reviews: bazaarvoice
  - What works: High-gloss merchandising and lifestyle-led discovery
  - Watchouts: Can prioritize hype over clarity
  - Features to steal: Lifestyle imagery; best sellers edits; strong PDP media
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/alo-yoga.html
  - URL: https://www.aloyoga.com

- **Carbon38** — score 12.0; Marketplace; Premium activewear marketplace
  - Signals: platform: shopify, magento; bnpl: afterpay, klarna; reviews: yotpo, trustpilot
  - What works: Curated premium assortment + clean merchandising
  - Watchouts: Smaller brand awareness
  - Features to steal: Curated edits; premium PLP/PDP; cross-sells
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/carbon38.html
  - URL: https://www.carbon38.com

- **Athleta** — score 10.0; Legacy retail; Women’s activewear
  - Signals: bnpl: afterpay, klarna
  - What works: Clear activity-based shopping paths
  - Watchouts: Can feel promo-heavy
  - Features to steal: Activity-based navigation; fit/performance framing; returns clarity
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/athleta.html
  - URL: https://www.athleta.gap.com

- **Girlfriend Collective** — score 9.0; DTC brand; Sustainable activewear
  - Signals: platform: shopify, magento; reviews: okendo
  - What works: Values-led positioning with product clarity
  - Watchouts: Can be copy-heavy
  - Features to steal: Sustainability trust cues; material/fabric education; clean PDP
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/girlfriend-collective.html
  - URL: https://www.girlfriend.com

- **Outdoor Voices** — score 8.5; DTC brand; Athleisure
  - Signals: platform: shopify, magento; reviews: yotpo, okendo
  - What works: Simple category architecture and strong brand tone
  - Watchouts: Assortment volatility risk
  - Features to steal: Simple nav; clear value props; minimalist PDP
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/outdoor-voices.html
  - URL: https://www.outdoorvoices.com

- **Fabletics** — score 4.0; DTC brand; Activewear (membership)
  - Signals: platform: magento
  - What works: Offer-driven conversion mechanics
  - Watchouts: Membership gating can frustrate shoppers
  - Features to steal: Offer architecture; onboarding; bundle UX
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/fabletics.html
  - URL: https://www.fabletics.com

- **Lululemon** — score 1.0; Legacy retail; Premium activewear
  - Signals: blocked: bot_protection_or_blocked
  - What works: Benefits-led merchandising + variant handling at scale
  - Watchouts: Automated snapshot limited; manual audit recommended
  - Features to steal: Fabric/tech education; size/fit confidence; omnichannel trust cues
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/lululemon.html
  - URL: https://shop.lululemon.com

## Contemporary Womenswear (N=7)

- **Staud** — score 13.0; DTC brand; Contemporary womenswear
  - Signals: platform: shopify, magento; bnpl: afterpay, klarna; reviews: trustpilot; returns: loop_returns
  - What works: Modern fashion merchandising with strong visuals
  - Watchouts: Automated snapshot timed out; manual audit required
  - Features to steal: Premium visuals; curated drops; cross-sell
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/staud.html
  - URL: https://www.staud.clothing

- **AllSaints** — score 12.0; Legacy retail; Contemporary womenswear
  - Signals: platform: magento; bnpl: afterpay, klarna; reviews: yotpo
  - What works: Clear brand tone and product storytelling
  - Watchouts: Legacy UX debt risk
  - Features to steal: Category landing pages; strong photography; promotions done cleanly
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/allsaints.html
  - URL: https://www.allsaints.com

- **Ganni** — score 10.0; Legacy retail; Contemporary womenswear
  - Signals: platform: magento; bnpl: klarna
  - What works: Strong brand identity and trend merchandising
  - Watchouts: Internationalization complexity
  - Features to steal: Trend capsules; editorial imagery; clear category architecture
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/ganni.html
  - URL: https://www.ganni.com

- **Maje** — score 8.5; Legacy retail; Contemporary womenswear
  - Signals: platform: magento; search: searchspring
  - What works: Premium feel with clear collection navigation
  - Watchouts: International shipping/returns complexity
  - Features to steal: Collection-based nav; premium PDP; trust cues
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/maje.html
  - URL: https://us.maje.com

- **Sandro** — score 8.0; Legacy retail; Contemporary womenswear
  - Signals: platform: magento
  - What works: Premium merchandising and clean PDPs
  - Watchouts: Internationalization complexity
  - Features to steal: Premium PDP layout; restrained promos; strong imagery
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/sandro.html
  - URL: https://us.sandro-paris.com

- **Mango** — score 3.0; Legacy retail; Contemporary womenswear
  - What works: Modern visual merchandising that feels premium
  - Watchouts: Internationalization complexity
  - Features to steal: Occasion edits; strong imagery; multi-currency UX patterns
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/mango.html
  - URL: https://shop.mango.com

- **& Other Stories** — score 1.0; Legacy retail; Contemporary womenswear
  - Signals: blocked: bot_protection_or_blocked
  - What works: Editorial merchandising with wearable styling
  - Watchouts: Bot protection blocks automated audits
  - Features to steal: Outfit styling; editorial PLPs; clean category pages
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/other-stories.html
  - URL: https://www.stories.com

## Intimates / Shapewear (N=7)

- **SKIMS** — score 14.0; DTC brand; Shapewear + intimates
  - Signals: platform: shopify, magento; bnpl: afterpay, klarna; reviews: okendo; search: algolia, dynamic_yield
  - What works: Fit-confidence merchandising plus strong set building
  - Watchouts: Can feel hype-driven without clear guidance
  - Features to steal: Fit/size guidance; complete-the-set; BNPL; fast checkout
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/skims.html
  - URL: https://skims.com

- **Negative Underwear** — score 14.0; DTC brand; Premium minimal lingerie
  - Signals: platform: shopify, magento; bnpl: afterpay; reviews: okendo; returns: loop_returns; search: rebuy
  - What works: Minimal design that keeps shoppers focused
  - Watchouts: Needs strong trust/returns info visibility
  - Features to steal: Minimal PDP; strong imagery; clear policies
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/negative-underwear.html
  - URL: https://negativeunderwear.com

- **ThirdLove** — score 13.0; DTC brand; Fit-first lingerie
  - Signals: platform: shopify, magento; bnpl: afterpay, klarna; reviews: yotpo, trustpilot; search: rebuy
  - What works: Fit framing + sizing help reduces uncertainty
  - Watchouts: Needs ongoing social proof freshness
  - Features to steal: Fit quiz; size guidance; trust + returns messaging
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/thirdlove.html
  - URL: https://www.thirdlove.com

- **Victoria's Secret** — score 11.0; Legacy retail; Lingerie + intimates
  - Signals: bnpl: afterpay, klarna; reviews: bazaarvoice; returns: narvar
  - What works: Category depth and strong “shop by need” entry points
  - Watchouts: Complex nav can overwhelm
  - Features to steal: Bra finders; fit guides; category landing pages
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/victorias-secret.html
  - URL: https://www.victoriassecret.com

- **CUUP** — score 10.5; DTC brand; Premium lingerie
  - Signals: platform: magento; bnpl: affirm; returns: narvar
  - What works: Premium brand feel with modern merchandising
  - Watchouts: Smaller assortment increases out-of-stock sensitivity
  - Features to steal: Premium PDP design; sizing education; set building
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/cuup.html
  - URL: https://www.cuup.com

- **Savage X Fenty** — score 4.0; DTC brand; Lingerie subscription-like model
  - Signals: platform: magento
  - What works: Membership economics + frequent drops drive repeat purchase
  - Watchouts: Membership friction can reduce first conversion
  - Features to steal: Tiered offers; bundles/sets; onboarding flows
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/savage-x-fenty.html
  - URL: https://www.savagex.com

- **For Love & Lemons** — score 3.0; DTC brand; Occasion + lingerie adjacent
  - What works: Distinct aesthetic and outfit merchandising
  - Watchouts: Fit/returns friction risk
  - Features to steal: Complete-the-look; rich PDP media; occasion edits
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/for-love-and-lemons.html
  - URL: https://www.forloveandlemons.com

## Jewelry (N=7)

- **Gorjana** — score 14.0; DTC brand; Jewelry
  - Signals: platform: shopify, magento; reviews: okendo; returns: loop_returns; search: nosto
  - What works: Easy browsing with giftable product structure
  - Watchouts: Commoditization risk
  - Features to steal: Gift finders; curated edits; fast checkout
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/gorjana.html
  - URL: https://www.gorjana.com

- **Kendra Scott** — score 14.0; Legacy retail; Jewelry
  - Signals: platform: magento; bnpl: afterpay, affirm; reviews: bazaarvoice
  - What works: Strong gifting + personalization patterns
  - Watchouts: Complexity at scale
  - Features to steal: Gift guides; personalization; store locator
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/kendra-scott.html
  - URL: https://www.kendrascott.com

- **Missoma** — score 13.0; DTC brand; Jewelry
  - Signals: platform: shopify, magento; bnpl: klarna; reviews: bazaarvoice; search: klevu
  - What works: Layering and styling-led merchandising
  - Watchouts: Needs strong UGC to reduce doubt
  - Features to steal: Layering bundles; UGC; gifting UX
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/missoma.html
  - URL: https://www.missoma.com

- **Mejuri** — score 12.5; DTC brand; Jewelry
  - Signals: platform: shopify, magento; bnpl: klarna; reviews: yotpo; search: algolia
  - What works: High-frequency purchasing via drops and gifting
  - Watchouts: Requires trust and clarity on materials
  - Features to steal: Gifting UX; trust cues; social proof; fast checkout
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/mejuri.html
  - URL: https://mejuri.com

- **Catbird** — score 11.5; DTC brand; Jewelry
  - Signals: platform: magento; bnpl: klarna; reviews: yotpo; search: searchspring
  - What works: Distinct brand voice and product storytelling
  - Watchouts: Assortment depth can complicate discovery
  - Features to steal: Editorial storytelling; curated edits; gifting modules
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/catbird.html
  - URL: https://www.catbirdnyc.com

- **Ana Luisa** — score 10.0; DTC brand; Jewelry
  - Signals: platform: shopify, magento; bnpl: klarna
  - What works: Strong value framing and sustainability cues
  - Watchouts: Offer clutter risk
  - Features to steal: Offer architecture; gifting; reviews
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/ana-luisa.html
  - URL: https://www.analuisa.com

- **Pandora** — score 6.5; Legacy retail; Jewelry
  - Signals: platform: magento
  - What works: Charm/collection system drives repeat purchase
  - Watchouts: Config complexity can increase friction
  - Features to steal: Collection-building UX; personalization; gifting
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/pandora.html
  - URL: https://www.pandora.net

## Accessories (N=6)

- **Telfar** — score 8.5; DTC brand; Streetwear accessories
  - Signals: platform: shopify, magento; bnpl: klarna
  - What works: Drop culture and scarcity mechanics
  - Watchouts: Scarcity can create UX frustration
  - Features to steal: Waitlists; drop messaging; SMS/email capture
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/telfar.html
  - URL: https://telfar.net

- **Longchamp** — score 6.0; Legacy retail; Accessories
  - Signals: platform: magento
  - What works: Global brand trust and premium merchandising
  - Watchouts: Internationalization complexity
  - Features to steal: Localization; premium PDP; gifting UX
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/longchamp.html
  - URL: https://www.longchamp.com

- **Tory Burch** — score 5.5; Legacy retail; Accessories + womenswear
  - Signals: platform: magento
  - What works: Premium feel with lifestyle merchandising
  - Watchouts: High imagery weight
  - Features to steal: Premium PDP; brand storytelling; store locator
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/tory-burch.html
  - URL: https://www.toryburch.com

- **Coach** — score 1.0; Legacy retail; Accessories
  - Signals: blocked: bot_protection_or_blocked
  - What works: Trust and premium merchandising
  - Watchouts: Can be heavy and promotional
  - Features to steal: Premium visuals; gifting UX; store locator
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/coach.html
  - URL: https://www.coach.com

- **Kate Spade** — score 1.0; Legacy retail; Accessories
  - Signals: blocked: bot_protection_or_blocked
  - What works: Strong gifting patterns and seasonal merchandising
  - Watchouts: Promo noise risk
  - Features to steal: Gifting modules; curated edits; fast checkout
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/kate-spade.html
  - URL: https://www.katespade.com

- **Michael Kors** — score 1.0; Legacy retail; Accessories + womenswear
  - Signals: blocked: bot_protection_or_blocked
  - What works: Promo-driven conversion mechanics
  - Watchouts: Discount-first framing can hurt premium perception
  - Features to steal: Offer architecture; gifting UX; robust filters
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/michael-kors.html
  - URL: https://www.michaelkors.com

## Resale / Secondhand (N=6)

- **Poshmark** — score 10.0; Marketplace; Resale marketplace
  - Signals: bnpl: affirm; reviews: trustpilot
  - What works: Social commerce loops drive repeat visits
  - Watchouts: Varied seller quality impacts trust
  - Features to steal: Social proof loops; offers; saved searches
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/poshmark.html
  - URL: https://poshmark.com

- **Vinted** — score 10.0; Marketplace; Resale marketplace
  - Signals: platform: magento; bnpl: klarna; blocked: bot_protection_or_blocked
  - What works: Low-friction resale browsing and messaging
  - Watchouts: Trust mechanisms vary by region
  - Features to steal: Low-friction listing/buying; saved searches; shipping UX
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/vinted.html
  - URL: https://www.vinted.com

- **Depop** — score 4.5; Marketplace; Resale social marketplace
  - Signals: platform: magento
  - What works: Community-led discovery and feeds
  - Watchouts: Trust/quality variability
  - Features to steal: Feed discovery; seller profiles; offers
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/depop.html
  - URL: https://www.depop.com

- **The RealReal** — score 4.0; Marketplace; Luxury resale marketplace
  - Signals: platform: magento
  - What works: Trust and authentication framing with deep inventory
  - Watchouts: Condition clarity and fees can confuse
  - Features to steal: Condition grading; trust cues; alerts/wishlists
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/the-realreal.html
  - URL: https://www.therealreal.com

- **thredUP** — score 2.0; Marketplace; Resale marketplace
  - Signals: platform: magento; blocked: bot_protection_or_blocked
  - What works: Deal mechanics + huge inventory browsing
  - Watchouts: Discovery overload risk
  - Features to steal: Deal UX; saved searches; condition taxonomy
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/thredup.html
  - URL: https://www.thredup.com

- **Vestiaire Collective** — score 2.0; Marketplace; Luxury resale marketplace
  - Signals: platform: magento; blocked: bot_protection_or_blocked
  - What works: Authentication + luxury framing drives trust
  - Watchouts: International shipping complexity
  - Features to steal: Trust cues; condition grading; alerts
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/vestiaire-collective.html
  - URL: https://www.vestiairecollective.com

## Footwear (N=5)

- **Loeffler Randall** — score 16.5; DTC brand; Shoes + accessories
  - Signals: platform: shopify, magento; bnpl: afterpay; reviews: okendo; returns: loop_returns; search: searchspring
  - What works: Curated assortment and premium presentation
  - Watchouts: Needs strong size/fit info
  - Features to steal: Premium PDP; styling imagery; cross-sells
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/loeffler-randall.html
  - URL: https://www.loefflerrandall.com

- **Steve Madden** — score 15.5; Legacy retail; Shoes
  - Signals: platform: shopify, magento; bnpl: afterpay; reviews: yotpo; returns: narvar; search: algolia
  - What works: Broad assortment and promo cadence
  - Watchouts: Promo clutter risk
  - Features to steal: Promo merchandising; category breadth; filters
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/steve-madden.html
  - URL: https://www.stevemadden.com

- **Rothy's** — score 14.5; DTC brand; Shoes + accessories
  - Signals: platform: shopify, magento; bnpl: afterpay; reviews: yotpo
  - What works: Clear product benefits and sustainability cues
  - Watchouts: Sizing confidence remains critical
  - Features to steal: Benefit-led PDP; UGC/reviews; fast checkout
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/rothys.html
  - URL: https://rothys.com

- **Dolce Vita** — score 13.5; DTC brand; Shoes
  - Signals: platform: shopify, magento; bnpl: afterpay; reviews: yotpo; search: algolia
  - What works: Style-led merchandising and collections
  - Watchouts: Variant complexity + inventory
  - Features to steal: Style edits; quick-add; clear shipping thresholds
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/dolce-vita.html
  - URL: https://www.dolcevita.com

- **Birdies** — score 9.0; DTC brand; Women’s footwear
  - Signals: platform: shopify; reviews: yotpo; blocked: bot_protection_or_blocked
  - What works: Simple browsing and gifting-friendly merchandising
  - Watchouts: Limited awareness compared to incumbents
  - Features to steal: Giftable merch; clean PDP; trust cues
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/birdies.html
  - URL: https://birdies.com

## Swimwear (N=5)

- **Andie Swim** — score 16.5; DTC brand; Swimwear
  - Signals: platform: shopify, magento; bnpl: afterpay, zip; reviews: okendo; returns: loop_returns; search: nosto
  - What works: Fit and coverage made legible
  - Watchouts: Limited assortment requires strong discovery
  - Features to steal: Coverage tags; fit quiz entry points; clear returns
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/andie-swim.html
  - URL: https://andieswim.com

- **Frankies Bikinis** — score 13.5; DTC brand; Trend swimwear
  - Signals: platform: shopify, magento; bnpl: afterpay, klarna; search: nosto
  - What works: Influencer-led merchandising drives intent
  - Watchouts: Can trade clarity for hype
  - Features to steal: Trend drops; lifestyle imagery; fast quick-add
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/frankies-bikinis.html
  - URL: https://frankiesbikinis.com

- **Triangl** — score 12.5; DTC brand; Swimwear
  - Signals: platform: shopify, magento; bnpl: klarna; reviews: yotpo, trustpilot
  - What works: Distinct aesthetic and tight assortment focus
  - Watchouts: International logistics complexity
  - Features to steal: Focused assortment; clear variant selection; promo clarity
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/triangl.html
  - URL: https://triangl.com

- **Montce Swim** — score 12.5; DTC brand; Swimwear
  - Signals: platform: shopify, magento; bnpl: afterpay, klarna; reviews: yotpo, trustpilot
  - What works: Strong mix-and-match merchandising
  - Watchouts: Config complexity can increase friction
  - Features to steal: Mix-and-match UX; styling imagery; size guidance
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/montce-swim.html
  - URL: https://www.montce.com

- **Summersalt** — score 10.5; DTC brand; Swimwear
  - Signals: platform: shopify, magento; returns: loop_returns; search: searchspring
  - What works: Confidence-centric merchandising with fit cues
  - Watchouts: Needs excellent size/fit tooling
  - Features to steal: Fit/coverage framing; model info; PDP media
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/summersalt.html
  - URL: https://www.summersalt.com

## Department Store (N=4)

- **Saks Fifth Avenue** — score 10.5; Marketplace; Luxury department store
  - Signals: platform: magento; bnpl: klarna; search: dynamic_yield
  - What works: Luxury trust + assortment depth
  - Watchouts: Can feel legacy and heavy
  - Features to steal: Luxury merchandising; concierge/service cues; filters
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/saks-fifth-avenue.html
  - URL: https://www.saksfifthavenue.com

- **Nordstrom** — score 3.0; Marketplace; Department store womenswear
  - What works: High trust; strong service; robust navigation
  - Watchouts: Choice overload without guardrails
  - Features to steal: Filters; pickup/returns trust cues; “best sellers” curation
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/nordstrom.html
  - URL: https://www.nordstrom.com

- **Neiman Marcus** — score 3.0; Marketplace; Luxury department store
  - What works: High-end merchandising and editorial presentation
  - Watchouts: Legacy performance/complexity risk
  - Features to steal: Editorial merchandising; luxury trust cues; designer taxonomy
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/neiman-marcus.html
  - URL: https://www.neimanmarcus.com

- **Bloomingdale's** — score 1.0; Marketplace; Department store womenswear
  - Signals: blocked: bot_protection_or_blocked
  - What works: Strong brand assortment + promo levers
  - Watchouts: Can be cluttered and promo-heavy
  - Features to steal: Promo blocks; filters; omnichannel trust cues
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/bloomingdales.html
  - URL: https://www.bloomingdales.com

## Luxury Marketplace (N=4)

- **Net-a-Porter** — score 3.0; Marketplace; Luxury womenswear marketplace
  - What works: Editorial + luxury service cues build trust
  - Watchouts: Automated snapshot timed out; manual audit required
  - Features to steal: Editorial merchandising; luxury trust framing; top-tier filtering
  - Evidence: —
  - URL: https://www.net-a-porter.com

- **Mytheresa** — score 3.0; Marketplace; Luxury womenswear marketplace
  - What works: Extremely polished discovery + merchandising
  - Watchouts: Can be heavy on imagery/performance
  - Features to steal: Luxury filters; editorial + commerce blend; high trust UX
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/mytheresa.html
  - URL: https://www.mytheresa.com

- **SSENSE** — score 2.0; Marketplace; Luxury/streetwear marketplace
  - Signals: platform: magento; blocked: bot_protection_or_blocked
  - What works: Culture-led discovery with strong editorial voice
  - Watchouts: Bot protection blocks automated audits
  - Features to steal: Editorial voice; search + merch blend; sharp PDP layouts
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/ssense.html
  - URL: https://www.ssense.com

- **Farfetch** — score 1.0; Marketplace; Luxury marketplace (multi-boutique)
  - Signals: blocked: bot_protection_or_blocked
  - What works: Massive selection with strong designer taxonomy
  - Watchouts: Bot protection blocks automated audits
  - Features to steal: Designer/category taxonomy; discovery at scale; global shipping UX
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/farfetch.html
  - URL: https://www.farfetch.com

## Maternity (N=3)

- **Pink Blush Maternity** — score 13.0; DTC brand; Maternity
  - Signals: platform: shopify, magento; reviews: yotpo, trustpilot; search: searchspring
  - What works: Promo-driven conversion with maternity focus
  - Watchouts: Promo overload risk
  - Features to steal: Offer architecture; maternity filters; fast checkout
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/pink-blush-maternity.html
  - URL: https://www.pinkblushmaternity.com

- **Hatch** — score 9.5; DTC brand; Maternity
  - Signals: platform: shopify, magento; reviews: yotpo; search: nosto
  - What works: Premium maternity positioning with editorial feel
  - Watchouts: Higher price increases trust burden
  - Features to steal: Editorial merchandising; fit guidance; premium trust cues
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/hatch.html
  - URL: https://www.hatchcollection.com

- **Seraphine** — score 9.0; Legacy retail; Maternity
  - Signals: platform: magento; reviews: bazaarvoice
  - What works: Clear maternity-specific merchandising
  - Watchouts: Legacy UX risk
  - Features to steal: Maternity fit guidance; occasion edits; returns clarity
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/seraphine.html
  - URL: https://www.seraphine.com

## Plus-size / Inclusive (N=3)

- **Lane Bryant** — score 11.0; Legacy retail; Plus-size womenswear
  - Signals: platform: magento; bnpl: klarna
  - What works: Category depth and size-first navigation
  - Watchouts: Promo clutter risk
  - Features to steal: Size-first nav; fit tools; store pickup framing
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/lane-bryant.html
  - URL: https://www.lanebryant.com

- **Eloquii** — score 10.5; Legacy retail; Plus-size womenswear
  - Signals: platform: magento; bnpl: affirm; returns: narvar
  - What works: Occasion-led plus-size discovery
  - Watchouts: Promo noise risk
  - Features to steal: Occasion filters; inclusive imagery; returns clarity
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/eloquii.html
  - URL: https://www.eloquii.com

- **Torrid** — score 3.0; Legacy retail; Plus-size womenswear
  - What works: Deep plus-size category expertise
  - Watchouts: Legacy UX debt risk
  - Features to steal: Shop-by-need; fit guidance; loyalty
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/torrid.html
  - URL: https://www.torrid.com

## Premium DTC Womenswear (N=3)

- **Reformation** — score 9.0; DTC brand; Premium DTC womenswear
  - Signals: platform: magento
  - What works: Clear product storytelling with fit/occasion framing
  - Watchouts: Heavy imagery can impact performance
  - Features to steal: PDP fabric/fit callouts; outfit styling; sustainability positioning; fast checkout
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/reformation.html
  - URL: https://www.thereformation.com

- **Sezane** — score 6.0; DTC brand; Premium DTC womenswear
  - Signals: platform: magento
  - What works: Editorial merchandising that sells complete looks
  - Watchouts: Can bury basics behind storytelling
  - Features to steal: Shop the look; outfit bundling; editorial PLPs; strong photography
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/sezane.html
  - URL: https://www.sezane.com

- **Doen** — score 2.0; DTC brand; Premium DTC womenswear
  - Signals: platform: magento; blocked: bot_protection_or_blocked
  - What works: Brand storytelling and romantic aesthetic merchandising
  - Watchouts: Assortment volatility risk
  - Features to steal: Editorial merchandising; PDP photography; outfit styling
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/doen.html
  - URL: https://www.doen.com

## Marketplace (Other) (N=2)

- **ASOS** — score 3.0; Marketplace; Mass fashion marketplace
  - What works: Massive discovery and inclusive ranges
  - Watchouts: Site weight and choice overload
  - Features to steal: Best-in-class filters; inclusive size navigation; fast search
  - Evidence: —
  - URL: https://www.asos.com

- **Revolve** — score 3.0; Marketplace; Trend fashion marketplace
  - What works: Fast trend merchandising and influencer-driven discovery
  - Watchouts: Automated snapshot timed out; manual audit required
  - Features to steal: Trending edits; influencer merchandising; fast category discovery
  - Evidence: —
  - URL: https://www.revolve.com

## Rental / Subscription (N=2)

- **Nuuly** — score 10.0; Subscription rental; Rental fashion
  - Signals: platform: magento
  - What works: Curated rental assortment with strong discovery
  - Watchouts: Membership friction risk
  - Features to steal: Subscription UX; discovery filters; closet-like saving
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/nuuly.html
  - URL: https://www.nuuly.com

- **Rent the Runway** — score 7.5; Subscription rental; Rental fashion
  - Signals: platform: magento
  - What works: Membership economics and occasion-first browsing
  - Watchouts: Onboarding complexity can reduce signups
  - Features to steal: Membership UX; occasion discovery; wardrobe planning
  - Evidence: .blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/artifacts/snapshots/homepages/rent-the-runway.html
  - URL: https://www.renttherunway.com
