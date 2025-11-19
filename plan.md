# Product Page Plan — Monday, November 17, 2025

Scope: Restructure the single product page (PDP) into a clear, mobile‑first story where every image has purpose and copy. This plan captures sections, image mapping, and a step‑by‑step checklist we will tick as we ship.

---

## Goals
- [x] Reduce cognitive load (fewer repetitive cards; clearer hierarchy)
- [x] Ensure every image/video has a caption that answers “why this matters”
- [x] Front‑load desire and proof; put details on demand via accordions
- [x] Keep add‑to‑cart fast and show free‑shipping progress

## Final Section Order (mobile‑first)
1. Hero Gallery + Title/Price + Primary CTA + Trust chips
2. Rating Snapshot (stars, count, 1‑line micro‑quote)
3. “Rule of Three” Benefits (icons only)
4. Creator TikTok (swipe 2–3 videos) — already added
5. Real‑World Use (Before/After & Fit) — swipable images with captions
6. Details (Accordions: Materials & Care, Fit & Sizing, In the Box, Shipping & Returns)
7. Guarantee (single reassurance card)
8. Reviews (snapshot + latest 5; link to all)
9. FAQ (5–7 curated)
10. Final CTA Band (price + add to cart + free‑shipping progress)

## Image Inventory → Section Mapping
Use these shorthand tags to place assets. Replace/augment as needed.

- Hero Gallery (G)
  - G1: `/uploads/luminele/product-feature-06.jpg` — “Hero beauty shot.”
  - G2: `/uploads/luminele/product-feature-04.jpg` — “45° angle.”
  - G3: `/uploads/luminele/product-feature-05.jpg` — “Satin lining macro.”
  - G4: `/uploads/luminele/product-feature-02.jpg` — “Lifestyle in bathroom.”
  - G5: (optional) packaging/box shot.

- Real‑World Use (U) — convert bottom image stack into a story
  - U1: “After a 10‑minute hot shower — style intact.”
  - U2: “Fits braids and curls comfortably.”
  - U3: “Comfort band sits soft — no marks.”
  - U4: “Rinse, towel dry — ready for tomorrow.”

- Details thumbnails (D) — shown inside accordions (64–96px)
  - D1: Lining macro (materials)
  - D2: Band macro (fit)
  - D3: Side‑profile on head (coverage)

- TikTok (V) — already wired via successStories
  - V1–V3: creators from `content/landing.ts` (embedUrl, videoUrl)

## Copy Guidelines (drafts)
- Value prop under title: “Waterproof, satin‑lined cap that protects styles without creasing.”
- Trust chips: “Free shipping over £40 • 30‑day Luxe guarantee • Secure checkout.”
- Captions (U/D) = 1 sentence that explains the benefit.

---

## Build Checklist

### Phase 0 — Foundations
- [x] Define goals and final section order
- [x] Inventory images and map to slots (G/U/D/V)
- [x] Create dated plan file (this document)
- [ ] Confirm final value‑prop line and any images to retire

### Phase 1 — Components (scaffold)
- [x] `RatingSnippet` — stars, count, micro‑quote, anchor to reviews
- [x] `Benefits3` — three icon cards (title + 1‑line body)
- [x] `RealWorldUseCarousel` — swipe row for U1–U4 with captions (mobile), arrows on desktop
- [x] `DetailsAccordion` — Materials & Care, Fit & Sizing, In the Box, Shipping & Returns; optional image thumbnails D1–D3
- [x] `GuaranteeCard` — single reassurance card (replaces multiple blocks)

### Phase 2 — Wire Up PDP
- [x] Reorder sections in `app/src/pages/product/ProductPage.tsx` to match this plan
- [x] Move “random bottom images” into `RealWorldUseCarousel` with captions
- [x] Remove/merge repetitive callout cards; keep only 3‑benefit section
- [x] Insert `DetailsAccordion` and move dense copy there
- [x] Keep `FeaturedTikTok` where specified (already present globally)

### Phase 3 — Content model
- [x] Add `benefits3`, `realWorldUse`, `details` objects to `app/src/content/home.config.ts`
- [x] Provide captions + alt text for each image (G/U/D)
- [ ] Trim FAQ to top 5–7; adjust copy tone (concise, outcome‑focused)

### Phase 4 — A11y & Performance
- [x] Lazy‑load all non‑hero media; preload first hero image
- [x] Ensure alt text for all images (G/U/D) and titles for iframes (V)
- [x] Keyboard support for carousels; focus outline visible
- [x] Respect `prefers-reduced-motion` in transitions (smooth scroll → auto)

### Phase 5 — Analytics
- [ ] Track section views (benefits_seen, video_swipe, details_open)
- [ ] Track sticky buy bar impressions and clicks

### Phase 6 — QA & Polish
- [ ] Visual audit (iPhone SE → iPhone 14 Pro Max → common Android)
- [ ] Cross‑browser sanity (Safari/Chrome/Edge mobile + desktop)
- [ ] Copy proofreading; remove redundancies
- [ ] Accessibility pass (contrast, hit targets ≥ 44px)

---

## Acceptance Criteria (V1)
- Exactly one “Rule of Three” benefit block; no stacked multi‑card repeats
- All previously stacked images appear only in Real‑World Use (with captions) or Details thumbnails
- Details available via accordions; no duplicated info elsewhere
- Hero remains fast to interact with; sticky buy bar appears after scroll; add‑to‑cart opens drawer
- Lighthouse: no noticeable CLS from media; images below the fold lazy‑load

---

## Already Shipped (context)
- [x] Add‑to‑cart opens the cart drawer (Cart tab)
- [x] Free‑shipping progress + sticky checkout in drawer
- [x] Checkout page `/checkout` (demo) + Orders page `/account/orders` (demo)
- [x] TikTok section with 3 videos; mobile swipe; desktop arrows + link

---

## Open Questions for You
- Which bottom images should be retired versus kept for Real‑World Use?
- Approve the value‑prop line and benefits copy? (We’ll use it in Benefits3.)
- Any additional details for “In the Box” or is that redundant for this SKU?

---

## Next Action (immediate)
- Start Phase 1: scaffold `RatingSnippet`, `Benefits3`, `RealWorldUseCarousel`, and `DetailsAccordion` as empty shells with placeholder copy so we can wire the layout without blocking on content.

---

# Competitor UI Upgrade Plan — Wednesday, November 19, 2025

Purpose: translate the Feelwavy PDP advantages into Lumelle’s brand system (peach/blush/cocoa palette, serif headings, rounded “pill” buttons) without losing our creator tone. Use this plan to track UX gaps and upcoming UI/UX tasks.

## Gap Snapshot

| Flow Moment | What Lumelle Has Today | What Feelwavy Demonstrates | Action Needed |
| --- | --- | --- | --- |
| Above-the-fold confidence | Hero gallery + CTA, offer pill, HeroProofStrip below fold | Compact “ready-to-buy” card with rating, shipping, autoship, trust seals | Add `RatingSnippet` + shipping/returns microcopy directly under price; show payment & security chips inline; explore subscribe toggle (inactive state ok). |
| Benefit storytelling | `FeatureCallouts` (3 cards) + descriptive copy block | Icon cards paired with inline imagery + proof quote | Enhance cards with supporting thumbnails/mini photos; append 1-line creator quote under grid to keep tone premium. |
| Education & routines | Quick info pills only | How-to accordion, ingredient deck, stylist quotes, quiz CTA | Introduce “Creator routine” accordion (3 steps, CTA to bundle); add ingredient highlights row (icons). |
| Social proof layering | Reviews carousel + TikTok mid-page | Reviews summary near hero, testimonials between sections, press strip | Surface `RatingSnippet` near hero, add single-card testimonial between benefits + details, and reuse `ProofBand` after TikTok for press logos. |
| Service reassurance | FAQ w/ WhatsApp CTA at bottom | Chat prompt, autoship savings, loyalty, guarantee repeating | Insert “Need personal sizing help?” micro-panel under hero; repeat guarantee line in sticky bar; expose free-shipping threshold under CTA. |
| Merchandising | None beyond primary SKU | “Pairs well with,” routine builder, autoship savings stats | Build `YouMightAlsoLike` carousel (3 SKUs) + “Complete the routine” list referencing bundles or future SKUs. |

## Implementation Phases (new)

1. **Hero Readiness (UI polish)**
   - Embed `RatingSnippet` inline with title block (stars + count + anchor).
   - Add microcopy chips: `Free UK shipping over £40`, `30-day Luxe Guarantee`, `Secure checkout` using existing blush/cocoa colors.
   - Introduce service row beneath CTA: shipping dispatch, payment icons, support link.
   - Optional: placeholder toggle UI for Subscribe & Save (disabled until ready).

2. **Layered Proof & Education**
   - After `FeatureCallouts`, insert a new “Creator Routine” accordion (3 steps with images) plus swipeable ingredient highlights (icons). Source colors from `brand-peach`/`brand-blush` for backgrounds.
   - Drop a testimonial card (quote + avatar) between routine and details.
   - Move `ProofBand` (or a condensed press strip) above Reviews Auto Carousel for early validation.

3. **Service & Assistance**
   - Build a “Need help choosing?” box (WhatsApp CTA + response time) directly under Real-World Use.
   - Duplicate core reassurance (guarantee, returns) inside sticky buy bar and final CTA band.
   - Add a quick “shipping & returns” bullet inside `DetailsAccordion` default-open panel.

4. **Merchandising & Cross-sell**
   - Add `CompleteTheRoutine` list (bonnet, wrap, brush) even if some items are “coming soon”—use neutral cards with “Join waitlist” CTA.
   - Implement `PairsWellWith` slider fed by `homeConfig.relatedProducts` (new field). Use consistent cards with product image, short benefit, ATC/learn more button.

5. **Visual Rhythm & Spacing**
   - Alternate section backgrounds (peach tint → white → blush) to mimic competitor cadence.
   - Add subtle borders, drop shadows, and alternating layouts (image left/right) for long text blocks.
   - Ensure each section ends with either a CTA, scroll hint, or trust cue to keep momentum.

## Deliverables Checklist

- [ ] Update hero block markup with rating snippet + microchips + shipping row.
- [ ] Create `CreatorRoutine` component (accordion) + add to PDP below FeatureCallouts.
- [ ] Create `IngredientHighlights` component (icons + copy) using existing palette.
- [ ] Insert testimonial single-card component before Details section.
- [ ] Move/duplicate `ProofBand` (or new press bar) nearer the top half.
- [ ] Add WhatsApp concierge helper card mid-page.
- [ ] Implement `CompleteTheRoutine` + `PairsWellWith` sections fed by config.
- [ ] Update sticky buy bar to include rating + guarantee copy; ensure shipping threshold chip visible.
- [ ] QA for mobile spacing + alternating backgrounds.

## Notes on Brand Consistency

- Continue using `brand-peach` for CTAs, `brand-blush` for soft backgrounds, `brand-cocoa` for type.
- Use existing serif (`font-heading`) for section titles to keep luxury tone; limit uppercase tracking to microchips.
- Employ rounded-rect surfaces (2.5rem radius) for hero + cards, matching existing aesthetic.
- When adding icons (ingredients, services), reuse Lucide set already in repo for cohesion.

## Next Steps (this request)
1. Approve this competitor-alignment plan.
2. Decide which cross-sell SKUs or waitlist placeholders we can safely promote.
3. Once approved, ticket Phase 1 work (hero readiness) for implementation sprint.
