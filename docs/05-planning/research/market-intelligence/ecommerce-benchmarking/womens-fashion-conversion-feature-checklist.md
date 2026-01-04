---
status: draft
last_reviewed: 2025-12-30
owner: growth
---

# Women’s Fashion — Conversion Feature Checklist (evidence-linked)

Goal: turn “stores we like” into a **build/integrate checklist** of concrete conversion features for women’s fashion.

Evidence tiers (use this to judge confidence):
- **Tier A (best):** manual screenshot audit (PDP → cart → checkout) in `audits/`
- **Tier B:** HTML snapshots of key funnel pages (PDP/PLP/returns) in `.blackbox/.plans/.../artifacts/snapshots/`
- **Tier C:** homepage snapshot signals (tooling detection / keyword cues) in `womens-fashion-stores-100.enriched.csv`

Key references:
- Benchmark narrative (why these features matter): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
- Niche playbook (model stores per niche): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-niche-playbook.md`
- Feature adoption matrix (vendors + store examples): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-matrix.md`

---

## 1) Discovery (Homepage → PLP → Search)

### Must-have features

- **High-intent entry points** (New / Best Sellers / Trending / Occasion)
  - Why: reduces “where do I start?” drop-off; increases PLP engagement
  - Evidence (Tier B examples):
    - Reformation PLP (new dresses): `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__reformation-plp-new-dresses.html`
    - Sézane “New-in”: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__sezane-new-in-us.html`
    - Additional Tier B examples (Top‑25 apparel-first funnel pack):
      - Urban Outfitters (new arrivals): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-urban-outfitters-collection.html`
      - Free People (best sellers): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-free-people-collection.html`
      - SKIMS (new arrivals): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-skims-collection.html`

- **Search that tolerates real human intent** (typos, synonyms, and “category words”)
  - Why: women’s fashion queries are often “occasion” or “vibe”-based
  - Evidence (Tier C vendor signals; confirm visually in audits):
    - Algolia appears in multiple stores (e.g., SKIMS): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-matrix.md`

- **PLP filtering that matches shopper mental models** (size/color/price + fabric/occasion/fit)
  - Why: improves discovery and reduces choice overload
  - Evidence (Tier B example):
    - Sézane dresses PLP snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__sezane-plp-dresses-us.html`

### “Often worth it” features

- **Personalization / recs on PLP/PDP** (e.g., “Recommended”, “Recently viewed”, “Complete the look”)
  - Why: increases AOV and helps shoppers decide faster
  - Evidence (Tier C vendor signals):
    - Nosto / Rebuy / Dynamic Yield appear across the cohort: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-matrix.md`

- **Wishlist / saved items** (guest-friendly; merge on login)
  - Why: retains “soft intent” for comparison shoppers; supports later conversion and alert loops
  - Evidence (Tier B signals; validate UX in Tier A):
    - Ganni wishlist link + wishlist analytics events: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-returns.html`
    - Triangl wishlist link/components: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-triangl-support.html`
  - Pattern card: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-wishlist-saved-items.md`

- **Back‑in‑stock / waitlist capture** (for OOS variants)
  - Why: turns stockouts into demand capture; reduces bounce on limited inventory/drops
  - Evidence (Tier B signals; validate UX in Tier A):
    - Frankies Bikinis Klaviyo BIS modal copy: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-sizing.html`
    - Frankies “Back in stock” collection link: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-shipping.html`
  - Pattern card: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-back-in-stock-waitlist.md`

---

## 2) PDP Confidence (highest ROI)

### Must-have features

- **Rich media** (multi-image + zoom + video where appropriate)
  - Why: reduces uncertainty; supports higher AOV
  - Evidence (Tier B examples):
    - SKIMS PDP contains video elements: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__skims-pdp-tshirt-bra.html`
    - Reformation PDP contains video elements: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__reformation-pdp-kastoria-dress.html`

- **Fit/size confidence module** (size guide entry point + fit notes + model measurements/size worn)
  - Why: fit doubt is the #1 blocker in women’s apparel
  - Evidence (Tier B examples):
    - Reformation size guide trigger + fit copy in PDP snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__reformation-pdp-kastoria-dress.html`
    - Reformation size guide page: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__reformation-size-guide.html`
    - Additional Tier B examples (Top‑25 apparel-first funnel pack):
      - ThirdLove “Fitting Room” (size guidance): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-sizing.html`
      - SKIMS size guides: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-skims-sizing.html`
      - Frankies Bikinis fit guide: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-sizing.html`

- **Reviews that reduce doubt** (filters by size/fit + photo reviews)
  - Why: increases PDP-to-cart by de-risking style/fit
  - Evidence (Tier C vendor signals; confirm UI via screenshots):
    - Okendo / Yotpo / Bazaarvoice appear broadly: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-matrix.md`

- **Shipping + returns clarity on PDP** (not buried in footer)
  - Why: reduces “hidden cost” anxiety and support tickets
  - Evidence (Tier B examples):
    - SKIMS shipping page snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__skims-shipping.html`
    - SKIMS returns page snapshot: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__skims-returns.html`
    - Additional Tier B examples (Top‑25 apparel-first funnel pack):
      - SKIMS shipping policy: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-skims-shipping.html`
      - SKIMS returns policy: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-skims-returns.html`
      - LoveShackFancy shipping policy: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-shipping.html`
      - LoveShackFancy returns policy: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-loveshackfancy-returns.html`

### “Often worth it” features

- **BNPL messaging** (if AOV supports it)
  - Why: increases checkout completion for higher AOV carts
  - Evidence (Tier B + Tier C):
    - Reformation PDP includes Afterpay components: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__reformation-pdp-kastoria-dress.html`
    - Cohort-wide BNPL vendor list + examples: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-matrix.md`

- **Cross-sell modules** (“Complete the set”, “Shop the look”, “You may also like”)
  - Why: increases AOV and reduces decision fatigue
  - Evidence (Tier B + Tier C):
    - SKIMS PDP includes “complete the look” signals in snapshot data: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-01/20251229T114102Z__skims-pdp-tshirt-bra.html`

---

## 3) Cart + Checkout Friction Removal

These features require **Tier A** validation (screenshots), because home snapshots usually won’t prove them.

### Must-have features (validate via manual audits)

- **Cart edit controls** (change size/color in cart without “starting over”)
- **Shipping threshold messaging** (subtle, not spammy)
  - Evidence (Tier B examples; validate UX in Tier A):
    - Carbon38 cart threshold + progress: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-carbon38-cart.html`
    - ThirdLove cart free‑shipping messaging templates: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-cart.html`
  - Pattern card: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md`
- **Express pay** (Apple Pay / Google Pay / Shop Pay where applicable)
- **Clear delivery estimates + return policy link at checkout**

Manual audit entry point:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/DASHBOARD.md`

---

## 4) Post-purchase + Returns (protect margin)

### Must-have features

- **Self-serve returns portal / exchanges-first UX**
  - Why: protects margin (exchange/store credit), reduces support load
  - Evidence (Tier B + Tier C):
    - Tier B (Top‑25 apparel-first funnel pack):
      - ThirdLove returns center: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-thirdlove-returns.html`
      - Andie Swim returns (Loop Returns signal): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-andie-swim-returns.html`
      - Snapshot scan shows returns tooling signals across the pack (Loop Returns, Narvar): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-summary.csv`
      - Pattern prevalence + examples: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-patterns.md`
    - Tier C (cohort-wide vendor scan):
      - Loop Returns / Narvar show up repeatedly: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-matrix.md`

- **Order tracking + proactive comms** (“Where is my order?” deflection)
  - Why: reduces ticket volume and increases trust
  - Evidence: best validated via Tier A (manual audits of post-purchase emails/pages)

---

## Suggested implementation order (if we want maximum conversion impact per week)

This order assumes we can integrate rather than build everything from scratch:
1) PDP confidence module (fit + media + policy summary)
2) Reviews (vendor + UX)
3) Search + merchandising rules (synonyms/boost/bury)
4) Returns portal (exchange-first) + order tracking
5) Cart + checkout friction removal (express pay + cart edit)
6) Personalization/recs + loyalty loops

Use `womens-fashion-feature-adoption-matrix.md` to pick vendors, and use manual audits to validate UI placement and friction.
