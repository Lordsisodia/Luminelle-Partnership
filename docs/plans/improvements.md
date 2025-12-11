# Lumelle Storefront — Improvements Backlog (v0.1)

Updated: 2025-11-13
Source inspiration: provided screenshot (bsset-co-uk) + existing Affiliates page polish
Scope: Front‑end (UI/UX) only — backend hooks later

## 0) High‑Level Goals
- Make landing feel premium and energetic (like Affiliates), not sparse.
- Maximize above‑the‑fold impact: full‑bleed hero, motion, clear CTAs.
- Create a persuasive scroll: proof → problems → product → social → offer → FAQ.
- Keep everything on existing theme tokens (peach/cocoa/blush; The Seasons/Inter).
- Mobile first; smooth micro‑interactions; no jank.

---

## 1) Header / Navigation
- Burger to left of logo on mobile; cart and profile icons on right.
- Cart: slide‑in side drawer from right; shows line items, qty controls, subtotal, checkout CTAs.
- Profile: slide‑in drawer (or dropdown) with Sign in / Orders / Help; placeholder for now.
- Transparent header over hero, becomes solid on scroll; subtle shadow (scroll threshold ~24px).
- Menu items in burger: Shop (root), Product, Blog, Affiliates, FAQ, Contact, Terms, Privacy.
- Analytics events: nav_open, nav_link_click, cart_open, profile_open.

Acceptance
- Icons visible and tappable at 44px min; focus states; ESC closes drawers; click‑away closes.

---

## 2) Hero — Full‑Bleed Carousel
- Full‑window hero with image carousel (3–5 slides) auto‑advancing every 5–6 seconds.
- Manual swipe on mobile; arrows on desktop; dot/progress indicator.
- Overlay copy block (headline/subhead/CTA) pinned left on desktop, centered on mobile.
- Gradient overlay for text legibility; light glow behind product.
- Secondary CTA: “Learn more” scroll‑to benefits.

Acceptance
- CLS‑safe; background images use `object-cover`, `sizes/srcset`, AVIF/WebP; LCP ≤ 2.5s.
- Keyboard and screen‑reader friendly (aria‑live polite, labelled controls).

---

## 3) Happy Customer Pills (UGC mini‑cards)
- Slim horizontally scrollable pills under hero: avatar + name + 3–5 word quote.
- Auto‑scroll (marquee motion) with gentle pause on hover.
- Tap opens lightbox gallery; optional link to reviews section.

Acceptance
- Visible on mobile; infinite loop; no layout shift; pause on interaction.

---

## 4) “Do you have these issues?” (Problem → Solution)
- Two‑column band: left lists 3 common pain points; right lists 3 Lumelle solutions.
- Add small line icons to each bullet; soft rose/flower motif in background.
- “Learn how it works” chevron scroll link.

Acceptance
- Copy in ≤ 12 words per bullet; icons decorative `aria-hidden`.

---

## 5) Product Highlight (The Cap)
- Hero‑style product card: close‑up image, price, quick bullets, “Buy Now” CTA.
- Sub‑gallery (3 small thumbnails) with hover/press zoom.
- Material & Care mini callout with icons.

Acceptance
- Sticky buy bar on mobile when product card is ≥50% in view (Add to Cart + price).

---

## 6) Social Proof — Ratings + Auto‑Scroll Reviews
- Star average + review count row near product.
- Auto‑scrolling review cards (loop), each with stars, 1–2 sentence quote, name.
- “See all reviews” links to PDP full reviews.

Acceptance
- 10+ cards loop smoothly; swipeable; manual drag pauses.

---

## 7) UGC / TikTok Strip
- 4–6 embedded short videos in a horizontally scrollable strip (lazy‑loaded iframes) or static poster tiles first.
- Play on tap with mute by default; open in lightbox for sound.

Acceptance
- Defers iframes below fold; poster image first for performance.

---

## 8) Offers & Bundles
- Cards: Single, Duo (save 10%), Gift (friend) — price + save badge.
- CTA adds pre‑selected quantity to cart and opens cart drawer.

Acceptance
- Accessible buttons; visually communicates savings; animation on add.

---

## 9) Trust / Assurance Bar
- Thin bar: “Fast shipping • Easy returns • Secure checkout” with icons.
- Appears above PDP teaser and in cart drawer.

Acceptance
- Good contrast; screen‑reader text for icons.

---

## 10) FAQ Mini + Full FAQ
- 3–5 top questions in accordion on landing; full FAQ on PDP.
- Add “Care & Fit” anchors.

Acceptance
- Only one panel open at a time on mobile; all keyboard navigable.

---

## 11) Footer Pre‑CTA
- Join community/email capture band: “Get 10% off your first order.”
- Compact form with single field and consent; integrates later with ESP.

Acceptance
- Visible errors, success states; honeypot to deter bots.

---

## 12) Motion & Polish
- Gentle scroll‑reveal (fade/slide‑up) for sections, disabled for prefers‑reduced‑motion.
- Button hover lift (shadow-soft) and tiny scale; card hover border tint.
- Marquee for happy‑customer pills; review carousel inertia.

Acceptance
- No blocking main thread > 50ms; motion respects user preference.

---

## 13) Content & Copy To Draft
- Hero headlines (3 options) that match ads; subheads that state the outcome.
- Pain points (3): frizz, elastic marks, disposable waste.
- Solutions (3): moisture‑guard lining, comfort stretch, durable/reusable.
- Review snippets (15): seed from client screenshots; keep to ≤ 18 words.
- Trust copy: shipping speed, return window, payment methods (Apple/Google Pay).

---

## 14) Component Breakdown (to build)
- Header: `HeaderBar` with burger (left), logo (center), cart/profile (right), drawers.
- Hero: `HeroCarousel` full‑bleed + overlay copy + dots.
- Pills: `CustomerPillsMarquee`.
- Problem/Solution: `ProblemSolutionGrid` (icons + motif background).
- Product: `ProductHeroCard`, `ThumbGallery`, `StickyBuyBar`.
- Ratings/Reviews: `RatingRow`, `ReviewsAutoCarousel`.
- UGC: `ShortsStrip` (with poster → iframe lazy load).
- Offers: `BundleCards`.
- Trust: `TrustBar`.
- FAQ: `FaqMini`.
- Footer Pre‑CTA: `EmailCaptureBand`.

---

## Snapshot Audit — 2025‑11‑14 (current landing)

What I see (from screenshot):
- Hero block
  - Pros: on‑brand palette; clean headline/subhead; CTA present.
  - Issues: hero image sits inside a card rather than full‑bleed; lacks impact; no swipe/auto progress indicator; CTA group spacing feels tight; offer chip is visually weak and doesn’t read as a benefit.
- Early collage section
  - Pros: 3 images add context.
  - Issues: grid feels flat; no captions; inconsistent aspect ratios; no motion; lacks hover/tap affordances.
- Assurance/social proof row
  - Issues: rating row is small and buried; no recognizable trust/payment badges; spacing between elements is uneven.
- Problem → solution band
  - Issues: pure text lists; no icons; line length too long on desktop; background lacks subtle pattern to add depth.
- UGC + Reviews
  - Issues: UGC tiles feel generic; reviews show static stars text (no star icons); no auto‑scroll and no “See all reviews” link; quotes are lengthy in places.
- PDP teaser + price
  - Issues: price and bullets lack visual hierarchy; Add to Cart CTA has low contrast on blush; no sticky buy bar on mobile.
- Footer
  - Issues: missing pre‑footer email capture; footer spacing tall but low content density.

Top fixes to implement (actionable)
1) Full‑bleed `HeroCarousel` with overlay copy and dots; auto‑advance every 5–6s; gradient overlay for contrast.
2) Convert the 3‑image collage into `FeatureCollage` with consistent aspect ratios (portrait/portrait/portrait) and subtle hover scale.
3) Add `TrustBar` under hero: “Fast shipping • Easy returns • Secure checkout” + icons; repeat in cart drawer.
4) Expand `SocialProofStrip` size and move it above the problem/solution band; add star SVGs and review count link → PDP reviews anchor.
5) Redesign `ProblemSolutionGrid` with icons and a faint floral motif background; enforce ≤12‑word bullets; add “Learn how it works” anchor.
6) Build `ReviewsAutoCarousel` with 10–15 cards; auto‑loop, swipeable; show avatars or initials chips; clamp to 2 lines.
7) Build `CustomerPillsMarquee` immediately under hero; 8–12 short pills that auto‑scroll.
8) Enhance `PdpTeaserCard`: larger price, bullet list with icons, high‑contrast CTA; add `StickyBuyBar` on mobile once in view.
9) Add `BundleCards` (Single, Duo −10%, Gift) and wire buttons to open the cart drawer with quantity preselected (placeholder for now).
10) Add `EmailCaptureBand` pre‑footer; single input; success/validation states.

User feedback additions — 2025‑11‑14
- Reviews
  - Replace the current static review cards with `ReviewsAutoCarousel` that auto‑scrolls (loop) and supports swipe/drag.
  - Deduplicate the two review sections into a single, stronger carousel block.
  - Add profile avatars (seed with random placeholder photos) and initials fallback; clamp copy to ~18 words.
  - Include a compact section heading with eyebrow (e.g., “Loved by thousands”) using `SectionHeading` for consistency.
- FAQ
  - Increase landing FAQs to 5 items; add a clear section title and eyebrow (reuse `SectionHeading` like on Affiliates).
  - Keep FaqMini style but apply the Affiliates heading pattern and spacing.
- Section titles
  - Every major section should have a title/eyebrow via `SectionHeading` to match Affiliates polish.
  - Apply consistent spacing rules (top 32–48px, bottom 24–40px), and center alignment where appropriate.
- Nav pattern
  - Burger remains on the right; SideNav opens and contains: primary nav + Cart + Profile sub‑sections.
  - Cart/Profile remain placeholders for now but visible within SideNav.


Header/nav update (per latest direction)
- Keep burger icon on the right.
- On click: slide‑in `SideNav` from right that contains primary nav + two sections: Cart (drawer view) and Profile (sign‑in/links). For now, both are UI‑only placeholders.
- Header remains transparent over hero, becomes solid on scroll; includes drop shadow.

Copy tasks to draft
- Hero: 3 headline/subhead options (outcome‑driven; match ads).
- Offer chip: stronger value text (e.g., “Buy 2, save 10%”).
- Pain points x3 and solutions x3 (≤12 words each).
- 15 review snippets (≤18 words; high‑signal phrases).
- Trust bar line and microcopy for returns window and payment options.

Design and spacing fixes
- Tighten vertical rhythm: use 24/32/48 spacing scale; avoid random 10–14px margins.
- Increase section contrast using blush/white alternation and shadow‑soft accents.
- Raise CTA weight with cocoa text on peach background; ensure WCAG contrast.
- Replace text “⭐️⭐️⭐️⭐️⭐️” with SVG star component; support half stars.

Performance & a11y
- Preload first hero image; use `sizes/srcset` + AVIF/WebP; lazy‑load below‑fold.
- Add `prefers-reduced-motion` guards for carousels and marquee.
- Ensure keyboard operation for drawers and carousels; focus trapping in SideNav.

Analytics hooks (front‑end only)
- view_hero_slide, click_cta, open_sidenav, open_cart, open_profile, add_to_cart_placeholder, view_reviews, faq_toggle.

---

## 21) Reuse From Affiliates — Component‑Level Plan (with code refs)

Use these existing components/patterns directly or lightly adapted for ecommerce.

- Section titles and layout
  - Reuse `SectionHeading` for consistent eyebrow/title/description across all sections.
  - Code: `app/src/components/SectionHeading.tsx`
  - Apply to: Reviews, FAQ, Offers/Bundles, UGC strip, Problem→Solution.

- FAQ presentation (Affiliates style)
  - Pattern: centered heading + rounded accordions with subtle peach/blush backgrounds.
  - Code: `app/src/sections/FAQSection.tsx`
  - Action: Wrap landing FAQ (5 items) with `SectionHeading` (eyebrow “FAQs”, title “Answers before you buy”). Reuse the same details/summary styling.

- Challenge drop callout (convert to product promo)
  - Pattern: bold callout card with uppercase pill, big heading, subcopy, and a strong CTA.
  - Code: `app/src/sections/CompetitiveCallout.tsx`
  - Action: Repurpose as a “Bundle & Save” or “Limited Drop” callout. Keep pill label (“Special Offer”), strong copy, and dual CTA (primary + helper text).

- Rewards & earnings callouts (use for product features)
  - Pattern: icon callout grid (Gift, Crown, Sparkles, Trophy) + tier cards.
  - Code: `app/src/sections/ValueStackSection.tsx`
  - Action: Replace icons/text with product features (Waterproof, Comfort Fit, Reusable, Eco‑friendly) and material/care notes. Keep rounded cards and icon circles.

- Journey cards (use for “How it works” product usage)
  - Pattern: 3 cards with step number, title, caption, and hover lift.
  - Code: `app/src/sections/JourneySection.tsx`
  - Action: Rename to “How to use” with 3 steps (Protect, Rinse, Repeat). Maintain hover effects.

- Leaderboard pill + header (visual language)
  - Pattern: eyebrow pill (“Leaderboard”) and table with avatars.
  - Code: `app/src/sections/LeaderboardSection.tsx`
  - Action: Not needed functionally, but borrow the eyebrow pill styling for “Reviews”, “Bundles & Savings”, and “UGC Highlights”.

- Hero “highlights” next/prev pattern
  - Pattern: rotating background + spotlight card with progress controls and “Next highlight →”.
  - Code: `app/src/sections/HeroSection.tsx`, data in `app/src/content/landing.ts` (heroSpotlightSlides)
  - Action: Use the slider control UI for the ecommerce HeroCarousel (dots and next link). Optional circular masked image in the spotlight card to mirror the sexy look.

- Floating CTA button (always‑on mobile CTA)
  - Pattern: floating bottom CTA hidden on hero/footer and when the target CTA is in view.
  - Code: `app/src/components/FloatingWhatsAppCta.tsx`
  - Action: Reuse as `FloatingBuyCta` (“Buy Now”) for store; visibility rules identical; action routes to PDP or opens cart later.

Notes
- Keep brand tokens and spacing scale identical to Affiliates for coherence.
- Favor composition: import these sections into `/sections/shop` with thin wrappers vs rewriting.

Additional components spotted in Affiliates screenshot to adapt
- Proof/Trust band under hero
  - Visual: 3-column strip with small uppercase label + prominent value.
  - Code: `app/src/sections/ProofBand.tsx` (uses `trustSignals` in `content/landing`).
  - Action: Clone into `/sections/shop/ProofBandShop.tsx` and swap content to store trust (e.g., “Avg. rating 4.9/5”, “Vogue Beauty mention”, “Dispatch <24h”).

- Creator success stories layout
  - Visual: Featured card + stacked cards with avatars and embeds.
  - Code: `app/src/sections/SuccessStoriesSection.tsx`.
  - Action: Use card style for a “Customer Stories” strip (static images instead of iframes) with avatar chips + short quotes.

- WhatsApp CTA band (structure)
  - Visual: strong centered call to action with benefits list.
  - Code: `app/src/sections/WhatsAppCtaSection.tsx`.
  - Action: Repurpose as “Ready to upgrade your shower routine?” with Buy Now CTA and 3 bullets.

- Floating CTA behavior
  - Visual: appears after scroll; hides when CTA in view.
  - Code: `app/src/components/FloatingWhatsAppCta.tsx`.
  - Action: Reuse for `FloatingBuyCta` (same behavior), hide on hero/footer.

- Section heading rhythm
  - Visual: every section has eyebrow/title/desc and consistent spacing.
  - Code: `app/src/components/SectionHeading.tsx`.
  - Action: Wrap all landing sections with SectionHeading and unify spacing.


## 15) Data & Config Needed
- home.config additions: hero.gallery[], pills[], bundles[], trustBar text, review list, UGC posters.
- Icons set: waterproof, comfort, eco/reusable, shipping, returns, secure.
- Cart drawer placeholders (line items mocked until backend).

---

## 16) Accessibility & Performance Checklist
- Hit areas ≥ 44px; visible focus rings; semantic landmarks.
- Lazy‑load below‑fold media; responsive images; preconnect to Shopify domain.
- Avoid autoplay audio; iframes only on interaction or near viewport.

---

## 17) Analytics (front‑end)
- view_hero_slide, click_cta, open_cart, add_to_cart (stub), view_reviews, open_faq_item.
- Measure section impressions to inform auto‑reordering later.

---

## 18) A/B Ideas
- Hero copy: outcome vs feature framing.
- Review placement: before vs after problem/solution.
- Email pre‑CTA wording and incentive level (10% vs 15%).

---

## 19) Implementation Order (front‑end only)
1) HeaderBar with left burger + drawers (cart/profile)
2) HeroCarousel full‑bleed with overlay copy
3) CustomerPillsMarquee + ProblemSolutionGrid (iconic)
4) ProductHeroCard + StickyBuyBar + RatingRow
5) ReviewsAutoCarousel + ShortsStrip
6) BundleCards + TrustBar + FaqMini + EmailCaptureBand

---

## 20) Open Questions
- Exact shipping/returns policy text and icons?
- Hero slide assets (3–5) — final selection from your library.
- Review import format (CSV vs screenshots) and permission to paraphrase.
- Do we add a thin top promo (e.g., “Buy 2 save 10%”) above the header?
