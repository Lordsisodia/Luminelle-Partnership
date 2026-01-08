# Client — Shop landing (Feedback)

## Routes
- `/` (root)
- `/landing` (legacy/alt)

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`

## Purpose
Primary storefront entry point (hero, featured products, merchandising, primary CTAs).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### 2025-12-05 (follow-ups / revisions)
- [ ] Hero image legibility: swap current hero/product photo for the newer Drive image (ref: `codex-clipboard-u3wUvU.png`).
- [ ] Social proof strip: use realistic women-with-great-hair avatars; change label to “Trusted by 10k users” (ref: `codex-clipboard-cwyemw.png`).
- [ ] Hero text fallback: if text is still hard to read after the image swap, add a blocked-out/white-backed overlay behind copy (ref: `codex-clipboard-WWQU4D.png`).
- [ ] Product spotlight tile: swap image to “page 9 image” from Drive; show sale price £14.99 with £19.99 struck through (ref: `codex-clipboard-DKDPAk.png`).
- [ ] Benefits copy: update supporting line + remove creator sales stat line under points (ref: `codex-clipboard-7ArOiP.png`).
- [ ] Benefits carousel: fix scroll behavior (snaps back / can’t reach the end).
- [ ] Benefits carousel slides: update headings/bodies + swap in Drive imagery where requested (refs: `codex-clipboard-uoHHFa.png`, `codex-clipboard-4ETu85.png`, `codex-clipboard-JQreI3.png`, `codex-clipboard-dpNVx2.png`).
- [ ] Reviews section: replace photo-card layout with text-first carousel; keep old component but disconnect (refs: `codex-clipboard-yZFNWU.png`, `codex-clipboard-nFeI7y.png`).
- [ ] Customer Stories intro: update copy and point to TikTok shop product page for more reviews (ref: `codex-clipboard-BXqnm7.png`).
- [ ] Creators video carousel: remove 4th slide + update heading/subtitle to “How To Use” (refs: `codex-clipboard-lAKk9B.png`, `codex-clipboard-sTBYor.png`).
- [ ] Bundles/pack selector: align pricing with page 9; enlarge “Single”; update Duo + Trio pricing/copy (refs: `codex-clipboard-xG9emt.png`, `codex-clipboard-kIaMPz.png`, `codex-clipboard-TjtBsR.png`, `codex-clipboard-13WUUR.png`).
- [ ] Spin wheel: show rewards 5% off / 10% off / free shipping, but always award free shipping + 10% after email; update intro copy (refs: `codex-clipboard-Vcinf9.png`, `codex-clipboard-swtNSp.png`).
- [ ] FAQ: move “Will it fit my hair?” to the top and auto-expand with the Drive review; make the section more visually interesting (ref: `codex-clipboard-xzdHRN.png`).
- [ ] Footer: remove creator-grade sentence; replace “Content Brief” link with Creator page; update email to `info@lumellebeauty.co.uk` (ref: `codex-clipboard-FQVMOA.png`).
- [ ] Blog for SEO: stand up blog and seed initial posts (ref: `codex-clipboard-RF0iZ1.png`).

### 2025-12-26 (internal UI review)
- [x] (#8) In-page section nav exists but isn’t rendered (users can’t jump to Reviews / FAQ / etc). — Black-box: `NOT_AN_ISSUE` ([issue-008](../ui-issue-tracker/ui-issues/issue-008.md))
- [x] (#21) “Benefits” section renders nothing (stub component). — Black-box: `NOT_AN_ISSUE` ([issue-021](../ui-issue-tracker/ui-issues/issue-021.md))
- [x] (#22) “Bundle cards” section renders nothing (stub component). — Black-box: `DONE` ([issue-022](../ui-issue-tracker/done-issues/issue-022.md))
- [x] (#23) Newsletter “Get 10% off” form has no submit behavior (promises a discount but does nothing). — Black-box: `DONE` ([issue-023](../ui-issue-tracker/done-issues/issue-023.md))
- [x] (#24) Reviews carousel filters to only 5★ reviews (misleading / trust risk). — Black-box: `NOT_AN_ISSUE` ([issue-024](../ui-issue-tracker/ui-issues/issue-024.md))
- [x] (#25) Reviews carousel interaction is not accessibility-friendly (no explicit prev/next buttons, motion-heavy). — Black-box: `DONE` ([issue-025](../ui-issue-tracker/done-issues/issue-025.md))
- [x] (#16) Product spotlight carousel hides content from screen readers when multiple slides exist (a11y). — Black-box: `DONE` ([issue-016](../ui-issue-tracker/done-issues/issue-016.md))
- [ ] (#18) Spin wheel/discount UI is present but discount application is stubbed (user spins, nothing real happens). — Black-box: `UNTRIAGED` ([issue-018](../ui-issue-tracker/ui-issues/issue-018.md))
- [x] (#44) Hero carousel is effectively disabled even when images exist (verify auto-rotation/interaction intent). — Black-box: `NOT_AN_ISSUE` ([issue-044](../ui-issue-tracker/ui-issues/issue-044.md))
- [x] (#73) Hero social proof is hard-coded instead of data-driven. — Black-box: `DONE` ([issue-073](../ui-issue-tracker/done-issues/issue-073.md))

### 2025-11-25 (baseline landing page notes, screenshots 1–18)
- [ ] Hero navigation: centered logo under guarantee strip; hamburger left; profile + cart icons right.
- [ ] Guarantee strip: only 3 items (30-day guarantee, free shipping £19.99+, buy 2 save 10%) + link “Buy 2, save 10%” to product section.
- [ ] Imagery & typography: replace placeholders with real assets; bold subheadings; switch body font pairing (serif/sans).
- [ ] Product spotlight: use updated product spotlight copy (primary + supporting line from the note).
- [ ] Ratings + CTA: 5 filled stars + “4.8 (100+ reviews)”; restyle “Shop Now” to match reference.
- [ ] Benefits visuals: full-bleed imagery + concise overlay copy.
- [ ] Carousel controls: remove prev/next chevrons, dots, “Compare all features”; keep average review line.
- [ ] Remove modules: comparison block, steps block, “Real routines” swiper, “A closer look” highlights, guarantee comparison grid, limited restock CTA.
- [ ] Customer Stories: move into old reviews slot; add CTA “Discover our products” linking to product area; use text-only testimonials until photos arrive.
- [ ] Creator TikTok block: include clips from main Lumelle creator (not only affiliates).
- [ ] FAQ: shrink header panel; remove WhatsApp chat box; keep waterproof/fit/wash/returns; remove travel; ensure waterproof + fit copy matches provided text.
- [ ] Email signup: keep layout; make heading bold; update body font under heading to match new pairing.

## Decisions / notes
- _None yet._

## Related sources
- [2025-11-25-client-feedback.md](../2025-11-25-client-feedback.md) (landing page screenshots 1–18)
- [2025-12-05-client-feedback.md](../2025-12-05-client-feedback.md) (hero legibility + trusted-by strip)
- [2025-11-13-client-call.md](../2025-11-13-client-call.md) (early site direction)
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md) (internal static audit)
