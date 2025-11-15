# Front‑End Plan — Lumelle E‑commerce (Landing + PDP)

Updated: 2025-11-13
Scope: Front‑end only (backend later). Theme uses existing Lumelle tokens (peach/cocoa/blush + The Seasons/Inter).

## Landing Page — Section Order (mobile‑first)
- HeroShop
  - Headline: clear value prop; match ad copy
  - Subhead: 1–2 sentences on outcome/benefit
  - CTA: “Shop Now” (primary); optional offer chip (e.g., “Buy 2, save 10%”)
  - Asset: hero product photo or lifestyle clip
- OfferCarousel (3–5 slides)
  - Each: background image, short benefit, CTA → PDP anchor
- SocialProofStrip
  - Stars + average rating + count + “Loved by thousands”
- ProblemSolutionGrid
  - 3 problems with disposable/plastic caps vs 3 Lumelle solutions (lining, fit, durability)
- UGCGallery
  - 6–8 tiles; lightbox; captions optional
- ReviewsCarousel
  - Horizontal cards: stars, short quote, name; link to all reviews on PDP
- PdpTeaserCard
  - Price, quick facts, mini gallery, secondary CTA
- FaqMini
  - 3–5 objections: shipping times, returns, waterproofing, sizing/fit, care
- Footer
  - Links: Story, Community, Sustainability, Refer, Affiliates, Contact, Account, Legal

## Product Page — Section Order (mobile‑first)
- Media Gallery (swipeable on mobile; zoom on tap)
- Title, short benefit line, price
- Variant/Quantity select
- Discount banner: “Buy 2, save 10%” (auto discount or code)
- Add to Cart + Apple Pay/Google Pay badges
- Key Benefits list (3–5)
- Materials & Care
- Fit & Sizing (cap circumference/elastic details)
- Shipping & Returns (short, scannable)
- Reviews list (filterable later)
- FAQ (full)

## Component Map (to repo)
- Layout: reuse `MarketingLayout` patterns; adapt to ecommerce layout
- New sections under `app/src/sections/shop/`
  - `HeroShop.tsx`
  - `OfferCarousel.tsx`
  - `SocialProofStrip.tsx`
  - `ProblemSolutionGrid.tsx`
  - `UGCGallery.tsx`
  - `ReviewsCarousel.tsx`
  - `PdpTeaserCard.tsx`
  - `FaqMini.tsx`
- PDP under `app/src/pages/product/`
  - `ProductPage.tsx`
  - `components/MediaGallery.tsx`, `components/PriceBlock.tsx`, `components/QuantityDealBanner.tsx`, `components/ReviewsList.tsx`

## Styling Tokens
- Colors: `brand.cocoa` (text), `brand.peach` (CTA backgrounds/shadows), `brand.blush` (surfaces)
- Fonts: `font-heading` (The Seasons), `font-body` (Inter)
- Shadows: `shadow-soft` for CTA/card accents
- Background motifs: subtle, low‑contrast floral pattern for section cards

## Content Config (TypeScript)
```ts
export type HomeConfig = {
  hero: { headline: string; subhead: string; ctaLabel: string; ctaHref: string; offerChip?: string; image: string };
  slides: { title: string; copy: string; image: string; ctaHref: string }[];
  socialProof: { rating: number; count: number; tagline: string };
  problemSolution: { problems: string[]; solutions: string[] };
  ugc: { src: string; type: 'image' | 'video'; caption?: string }[];
  reviews: { author: string; stars: number; title: string; body: string; date?: string; source?: string }[];
  pdpTeaser: { price: string; bullets: string[]; image: string; href: string };
  faq: { q: string; a: string }[];
}
```

## Accessibility + Performance
- Hit area ≥ 44px, visible focus, sufficient contrast on peach/blush
- LCP budget ≤ 2.5s; preconnect to Shopify; defer non‑critical scripts
- Use responsive `<img>` with `sizes/srcset`; ship AVIF/WebP; lazy‑load below fold

## Analytics (front‑end events only)
- `view_item` (PDP), `add_to_cart`, `begin_checkout`, `purchase` (after backend), `newsletter_signup`
- Track section impressions (hero/offer/reviews) for future auto‑ordering

## A/B Experiments (queued)
- Pop‑up: 20% email capture vs control
- Gamified: spin‑the‑wheel vs standard pop‑up (Phase 2)
- Reviews placement: above vs below problem/solution

## Build Steps (frontend only)
- Wireframes (mobile‑first) for Landing + PDP
- Implement `shop` sections + theming from tokens
- Seed reviews (≈60) from client screenshots
- Static JSON config for Home + PDP placeholders
- Instrument analytics events
- QA on iOS Safari, Android Chrome, desktop Chrome/Firefox/Safari

