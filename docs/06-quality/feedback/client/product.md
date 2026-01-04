# Client — Product detail (PDP) (Feedback)

## Routes
- `/product/:handle`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`

## Purpose
Product detail page (hero, gallery, pricing, variant selection, add-to-cart, storytelling).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### 2025-12-05 (follow-ups / revisions, PDP points 24–33)
- [ ] Add badge above product image: “1k+ bought in past month” (ref: `codex-clipboard-X0oDgy.png`).
- [ ] Add share button near product title (ref: `codex-clipboard-LwwDh6.png`).
- [ ] CTAs: restyle Add to Basket / Buy Now per reference; remove the deliver-to block (ref: `codex-clipboard-kf3WJv.png`).
- [ ] Gallery: support a video item inside the product carousel (ref: `codex-clipboard-bpSnBr.png`).
- [ ] Split content: separate “How to use” and “Care & materials” into distinct tabs/sections (ref: `codex-clipboard-NHQOc6.png`).
- [ ] Care & materials: rewrite bullets using “Why you’ll love it” sentences; make text bolder; use relevant icons (ref: `codex-clipboard-kdgrVn.png`).
- [ ] Stats block: remove gap; change “Community” → “Proven to protect hair”; change guarantee line → “Free returns in 30 days” (ref: `codex-clipboard-ArTx0A.png`).
- [ ] “Why it works”: replace heading/body with “Why you’ll love it” copy + embed the provided video in the reference slot (ref: `codex-clipboard-TsQqgn.png`).
- [ ] Benefits list styling: bolder text and/or more engaging background so it doesn’t feel bland (ref: `codex-clipboard-oM6uIH.png`).
- [ ] Materials/care/fit accordion: add more detail; for 3rd point use the FAQ “Will it fit my hair?” copy (ref: `codex-clipboard-mCMbDY.png`).

### 2025-12-26 (internal UI review)
- [x] (#4) “Spin to win” prompt is visibly placeholder/off-brand; feature-flag off until real component exists. — Black-box: `NOT_AN_ISSUE` ([issue-004](../ui-issue-tracker/ui-issues/issue-004.md))
- [x] (#26) Delivery countdown/delivery date are fake (client clock + `now + 2 days`); tie to real fulfillment rules or simplify copy. — Black-box: `NOT_AN_ISSUE` ([issue-026](../ui-issue-tracker/ui-issues/issue-026.md))
- [ ] (#31) PDP video media can render at 0 height when selected (broken-looking). — Black-box: `UNTRIAGED` ([issue-031](../ui-issue-tracker/ui-issues/issue-031.md))
- [x] (#38) Product fetching is stubbed (PDP can’t reflect real Shopify title/price/images). — Black-box: `NOT_AN_ISSUE` ([issue-038](../ui-issue-tracker/ui-issues/issue-038.md))
- [x] (#53) PDP sections are loaded globally (not per product), so different products can show wrong copy/media. — Black-box: `DONE` ([issue-053](../ui-issue-tracker/ui-issues/issue-053.md))
- [x] (#54) Unknown product handles fall back to the shower cap instead of a 404 (wrong content on wrong URL). — Black-box: `DONE` ([issue-054](../ui-issue-tracker/ui-issues/issue-054.md))
- [x] (#69) PDP “Buy 2, save 10%” messaging is hard-coded for every product (must be product-specific). — Black-box: `NOT_AN_ISSUE` ([issue-069](../ui-issue-tracker/ui-issues/issue-069.md))
- [x] (#52) Share button may fail silently and gives no success feedback (add confirmation + error handling). — Black-box: `DONE` ([issue-052](../ui-issue-tracker/ui-issues/issue-052.md))

### 2025-11-25 (baseline product page notes, screenshots 19–35)
- [ ] Header alignment: match landing page top strip + icon order; remove excess white bar above the primary image.
- [ ] Gallery/infographics: add more infographic tiles in specified order; reduce secondary thumbnail sizes.
- [ ] PDP info stack: remove “Creator favourite” pill; bold product name; order Reviews → Price → “Buy 2 save 10%”; remove “Subscribe & save”.
- [ ] Detail/CTA styling: add more color/visual accents to detail bullets; refresh CTA row styling.
- [ ] Remove blocks: “Featured in Vogue / creator rating / response time” stack; creator routine segment; duplicate materials section; creator spotlight testimonial card; “See it in action” five-step card.
- [ ] Benefits layout: restructure creator-approved callouts to a clearer, more structured layout.
- [ ] Reviews: style carousel to match landing-page look.
- [ ] Creator video embed: apply same embed treatment as landing page.
- [ ] Remove concierge: WhatsApp concierge card + accessory pairings list.
- [ ] Remove bundles: pack picker (single/duo/gift set), bundle upsell grid, and any remaining post-FAQ upsell panels called out in the note.
- [ ] FAQ: match landing-page FAQ styling; keep waterproof/fit/wash; remove travel/shipping-worldwide extras.

## Decisions / notes
- _None yet._

## Related sources
- [2025-11-25-client-feedback.md](../2025-11-25-client-feedback.md) (product page screenshots 19–35)
- [2025-12-05-client-feedback.md](../2025-12-05-client-feedback.md) (PDP pricing, gallery, benefits, FAQ)
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md) (internal static audit)
