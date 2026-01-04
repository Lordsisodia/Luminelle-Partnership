# Sources

Format:
- URL or file path
  - Supports: what claim/data this source backs
  - Accessed: YYYY-MM-DD
  - Confidence: High | Medium | Low

---

## Internal (Lumelle repo)

- `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`
  - Supports: landing page currently ships both a text reviews section (`ReviewsAutoCarousel`) and a TikTok embed rail (`FeaturedTikTok`).
  - Accessed: 2026-01-01
  - Confidence: High

- `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`
  - Supports: “Customer Stories” section = heading + TikTok CTA pill + text review carousel.
  - Accessed: 2026-01-01
  - Confidence: High

- `src/components/ui/3d-carousel.tsx`
  - Supports: current text review card UI/carousel primitives (no video).
  - Accessed: 2026-01-01
  - Confidence: High

- `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`
  - Supports: existing TikTok embed carousel implementation (lazy iframes, swipe/scroll, arrows + dots).
  - Accessed: 2026-01-01
  - Confidence: High

- `src/domains/creator/ui/sections/success/SuccessStoriesSection.tsx`
  - Supports: alternate TikTok embed card pattern (lazy iframe loading, placeholder skeleton).
  - Accessed: 2026-01-01
  - Confidence: High

- `src/content/landing.ts`
  - Supports: existing data model for TikTok embeds (`embedUrl`) and outbound video links (`videoUrl`) via `successStories`.
  - Accessed: 2026-01-01
  - Confidence: High

- `docs/01-product/admin/products.md`
  - Supports: intended admin content model includes TikTok/video embeds and creator testimonials/reviews widgets.
  - Accessed: 2026-01-01
  - Confidence: High

- `docs/05-planning/plans/frontend-plan.md`
  - Supports: intended landing-page section order includes an explicit UGC gallery + reviews carousel; notes on performance + accessibility.
  - Accessed: 2026-01-01
  - Confidence: High

- `docs/06-quality/reviews/README.md`
  - Supports: operational plan for extracting text reviews from screenshots via OCR (plain text fallback proof).
  - Accessed: 2026-01-01
  - Confidence: High

---

## External (competitor scan)

All accessed: 2026-01-01  
Evidence capture: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/extracted.json`

- https://www.shhhowercap.com/
  - Supports: homepage includes an explicit quote/testimonial section labelled “THE REVIEWS” (text-first social proof); no TikTok embed iframes detected in this scan.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/shhhowercap/shhhowercap__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Medium

- https://slip.com/
  - Supports: homepage leans on before/after + expert quotes + “as seen on” press/retail signals; no TikTok embeds detected in this scan.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/slip/slip__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Medium

- https://www.mykitsch.com/
  - Supports: homepage appears to include a testimonials-style module (“The Feeling Is Mutual”); no TikTok embed iframes detected in this scan.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/kitsch/kitsch__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Medium

- https://www.graceeleyae.com/
  - Supports: homepage in this scan did not surface a dedicated “Reviews” section heading; review vendor clues present.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/graceeleyae/graceeleyae__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Medium

- https://www.hairbrella.com/
  - Supports: homepage contains “as seen on” signals in this scan; no TikTok embed iframes detected.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/hairbrella/hairbrella__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://patternbeauty.com/
  - Supports: review vendor clues present; no TikTok embed iframes detected in this scan.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/patternbeauty/patternbeauty__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://briogeohair.com/
  - Supports: review vendor clues present; no TikTok embed iframes detected in this scan.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/briogeo/briogeo__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://gisou.com/
  - Supports: many native video tags detected on homepage (likely media-heavy); no TikTok embed iframes detected in this scan.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/gisou/gisou__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://theouai.com/
  - Supports: review vendor clues present; no TikTok embed iframes detected in this scan.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/theouai/theouai__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://crownaffair.com/
  - Supports: homepage includes a social handle callout; no TikTok embed iframes detected in this scan.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/crownaffair/crownaffair__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://ableclothing.com/
  - Supports: reference capture for an apparel DTC homepage; social proof placement varies (vendor clues present in scan).
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/ableclothing/ableclothing__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://www.aloyoga.com/
  - Supports: large lifestyle brand exemplar; homepage tends to be merch/campaign-first (reviews often PDP-first).
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/alo-yoga/alo-yoga__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://blissy.com/
  - Supports: long-form sales-page style; multiple “proof” blocks across the scroll.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/blissy/blissy__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://www.everlane.com/
  - Supports: minimalist merchandising homepage; reviews are typically PDP-first.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/everlane/everlane__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://www.girlfriend.com/
  - Supports: editorial/mission storytelling; reviews exist but are not the centerpiece on homepage.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/girlfriend-collective/girlfriend-collective__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://mejuri.com/
  - Supports: premium DTC exemplar; homepage often relies on brand + product navigation; reviews commonly PDP-first.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/mejuri/mejuri__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://naadam.co/
  - Supports: DTC apparel exemplar; homepage tends to be merch/campaign-first.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/naadam/naadam__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://negativeunderwear.com/
  - Supports: DTC underwear exemplar; light homepage proof and a clean, merch-first scroll.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/negative-underwear/negative-underwear__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://www.thereformation.com/
  - Supports: large DTC fashion exemplar; homepage appears merch-first in capture.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/thereformation/thereformation__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://www.thirdlove.com/
  - Supports: DTC underwear exemplar; homepage includes some trust signals but appears merch-led in capture.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/thirdlove/thirdlove__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://skims.com/
  - Supports: large DTC exemplar; homepage is campaign + product-first; review vendor signals are visible in scan.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/skims/skims__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low

- https://www.glossier.com/
  - Supports: large beauty DTC exemplar; homepage is brand + product navigation-first; review vendor signals present.
  - Evidence: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/glossier/glossier__mobile__homepage__reviews-layout__20260101.png`
  - Accessed: 2026-01-01
  - Confidence: Low
