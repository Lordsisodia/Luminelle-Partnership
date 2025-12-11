# Lumelle E‑commerce — App Plan (v0.2)

Last updated: 2025-11-13
Owner: Shaan / Lumelle project
Source: feedback/client-call.md

## 1) Project Overview
- Objective: Launch a high‑converting, mobile‑first, single‑product storefront for Lumelle with a strong landing page, social proof, and streamlined checkout.
- Approach: Custom front‑end (headless) with Shopify backend for products, inventory, payments, and Amazon MCF for fulfillment via the official Shopify app.
- Initial scope: 1 SKU (shower cap) and supporting pages; foundation for growth to ads, affiliates, content, and SEO.

Design system note
- Reuse the existing Lumelle app theme defined in `app/tailwind.config.js`:
  - Colors: `brand.peach` (#FBC7B2), `brand.cocoa` (#55362A), `brand.blush` (#FDD4DC)
  - Fonts: heading "The Seasons", body "Inter"
  - Shadows: `soft` for CTAs/cards
  - Do not introduce a new orange primary; keep to the current brand tokens.

## 2) Pages (MVP)
- Landing page (`/`)
  - See detailed flow and component map in section 3.
- Product page (`/product/<handle>`)
  - One‑time purchase (no subscription for now).
  - Variant/quantity selector (confirm variants). Discount: “Buy 2, get 10% off”.
  - Media gallery (photos + provided video), features, materials, care.
  - Reviews section (full list + ratings breakdown).
- Our Story (`/story`)
  - “Why we started” + problems with disposable/plastic caps; brand mission.
- Community / Newsletter (`/community`)
  - Email signup; explain community value. Option to evolve to group later.
- Sustainability (`/sustainability`)
  - Materials, packaging, longevity vs disposable caps.
- Refer a Friend (`/refer`)
  - Simple flow to share link/code (TBD solution for tracking).
- Affiliates (`/affiliates`)
  - Program overview, how to apply, key FAQs, link to external affiliate portal (current ops via WhatsApp; informational only to start). Include contest link/video.
- Contact (`/contact`)
  - Form, brand email; response SLA.
- My Account (`/account`)
  - Defer to Shopify customer accounts or site auth (see Open Questions).
- Legal (`/privacy`, `/terms`, `/shipping-returns`)
  - Basic compliance pages.

## 3) Landing Page Flow (front‑end first)
- Above‑the‑fold hero (message match): headline + subhead aligned to ad, product visual, 1 primary CTA “Shop Now”. Optional small offer chip (e.g., “Buy 2, save 10%”).
- Offer/benefits slider: 3–5 slides (“No frizz”, “Luxury feel”, “Reusable, eco‑friendly”, “Protects styles”), each with lifestyle image and CTA to PDP.
- Social proof strip: “Loved by thousands” + average rating + review count; compact and mobile‑friendly.
- Problem → Solution band: short bullets on issues with disposable/plastic caps; then Lumelle’s lining/materials/fit as solutions.
- UGC gallery: 6–8 tiles (mix of images/clips); tap to lightbox; captions optional.
- Reviews carousel: horizontally scrolling cards with stars, short quote, name; link to full reviews on PDP.
- PDP teaser: price, variant/quantity preview, and “Buy 2 get 10%” banner that deep‑links to PDP with qty=2.
- FAQ mini: 3–5 top objections (shipping times, returns, waterproofing, sizing/fit, care). Link to full FAQ.
- Footer with Affiliates, Story, Community, Sustainability, Refer, Contact, Account, Legal.

Component list
- `HeroShop`: headline, subhead, product key visual, primary CTA, optional offer chip.
- `OfferCarousel`: 3–5 slides, each with background image, short benefit, CTA.
- `SocialProofStrip`: star rating, count, “Loved by thousands” copy.
- `ProblemSolutionGrid`: two columns (problems vs solutions) with icons.
- `UGCGallery`: responsive masonry grid with lightbox.
- `ReviewsCarousel`: horizontal cards; supports 60+ seeded reviews.
- `PdpTeaserCard`: price, quick facts, mini gallery, secondary CTA to PDP.
- `FaqMini`: accordion with 3–5 items.

Content config shape
```
HomeConfig = {
  hero: { headline, subhead, ctaLabel, ctaHref, offerChip?, image },
  slides: [{ title, copy, image, ctaHref }],
  socialProof: { rating, count, tagline },
  problemSolution: { problems: string[], solutions: string[] },
  ugc: [{ src, type: 'image'|'video', caption? }],
  reviews: Review[],
  pdpTeaser: { price, bullets: string[], image, href },
  faq: [{ q, a }]
}
```

Accessibility and performance
- Mobile first; proper focus states; color contrast against `brand.peach`/`brand.blush` backgrounds; large tap targets.
- LCP ≤ 2.5s; lazy‑load carousels/gallery; ship WebP/AVIF; prefetch PDP route on CTA hover.

## 4) Key User Flows
- Ad → Landing hero CTA → Product page → Shopify checkout → Order confirmation.
- Landing → Reviews carousel → Product page deep scroll → Checkout.
- Footer → Affiliates → Application/info → (external/ops).
- Newsletter signup → ESP list → welcome discount (if configured).

## 5) Features (MVP)
- Mobile‑first responsive UI; performance‑focused (optimized images, lazy‑loading).
- Hero with primary CTA, optional small “offer” chip.
- Carousel for benefits/UGC (configurable via CMS or JSON).
- Social proof bar with dynamic average rating + count.
- Reviews: horizontal slider; seed with ~60 reviews (from TikTok screenshots, retyped/imported).
- Product detail: one‑time purchase, quantity discount rule (“Buy 2 get 10%”).
- Shopify backend integration: Product/Variant data via Storefront API; Shopify Checkout.
- Fulfillment: Amazon MCF via Shopify official app (configuration in Shopify admin).
- Footer links: Story, Community, Sustainability, Refer a Friend, Affiliates, Contact, My Account.
- Analytics: Meta Pixel + TikTok Pixel + GA4 (basic events).
- SEO: meta tags, Open Graph, Product schema JSON‑LD.
- Accessibility: semantic structure, alt text, focus states, color contrast.
- Basic legal pages; cookie banner if needed (UK/EU).

## 6) Phase 2 / Nice‑to‑Have
- Gamified pop‑up: “Spin the wheel” discount; A/B vs simple 20% off email capture.
- AI Assistant (product Q&A from site knowledge base/FAQ).
- Blog for SEO: seed 10–20 posts; category pages, RSS.
- Heatmaps and auto‑reorder of sections based on engagement (requires data; start with Hotjar/FullStory; later automate ordering).
- Advanced reviews (photo/video reviews, filters, voting).
- Referral system (tracked links, rewards) beyond simple “Refer a Friend” page.
- UGC ingestion (hashtag/gallery moderation tool).
- Loyalty badges; “90‑day guarantee” badge if brand approves.

## 7) Integrations
- Shopify Storefront API + Shopify Checkout (Shopify Payments enables Apple Pay/Google Pay).
- Amazon MCF: official Shopify app for multi‑channel fulfillment.
- ESP for email/newsletter: Klaviyo (preferred) or Mailchimp (TBD).
- Pixels/Analytics: GA4, Meta Pixel, TikTok Pixel.
- Heatmaps/Session replay: Hotjar or FullStory (Phase 2).
- Auth: Shopify Customer Accounts or Clerk.com (see Open Questions).

## 8) Content & Assets Needed
- Brand kit: logo, color palette (orange primary), typography guidance.
  - Update: adhere to existing tokens (peach/cocoa/blush; “The Seasons” + Inter) from `app/tailwind.config.js`.
- Product media: hero images, lifestyle shots, UGC; 1 video demo.
- Copy: hero tagline/CTA, benefits, “Why we started”, sustainability, returns/FAQ.
- Reviews: ~60 screenshots or CSV; permission to paraphrase/retype.
- Legal text: privacy, terms, shipping/returns policy, guarantee copy (if any).
- Affiliate contest details + video link.

## 9) Design Guidelines
- Tone: premium, clean, “not plain”—use subtle rose/flower pattern backgrounds to add depth to cards/sections.
- Typography: as per affiliate page example; increase card text sizing slightly where sparse.
- Color: use current Lumelle tokens (peach/cocoa/blush) for CTAs and accents; ensure accessible contrast.
- Components: reusable cards, badges, sliders; consistent spacing scale.

## 10) Tech Stack (proposed)
- Front‑end: React + TypeScript (current Vite setup in `app/`), Tailwind using existing tokens; leverage `components-library` where useful.
- Backend: Shopify for catalog, inventory, checkout, payments; Vercel for hosting.
- CMS: Lightweight MD/JSON or simple in‑repo config for MVP; consider CMS (Sanity/Contentful) if content grows.
- CI/CD: Vercel previews for PRs.

## 11) Data Model (site‑side config)
- Home config: hero, offers[], slides[], benefits[], badges[].
- Reviews: imported dataset with fields {author, stars, title, body, date, source}.
- UGC gallery: media[], captions.
- Blog (Phase 2): posts {slug, title, body, tags, cover, publishedAt}.
- Settings: pixels, ESP keys, discount toggles, feature flags.

## 12) Analytics & SEO
- Events: view_item, add_to_cart, begin_checkout, purchase; newsletter_signup.
- Sitemaps, robots.txt, canonical URLs.
- JSON‑LD: Product, Organization, WebSite, BreadcrumbList.

## 13) Open Questions / Decisions Needed
- Variants: Are there colors/sizes for the shower cap, or single SKU?
- Pricing/Discount: Confirm “Buy 2 get 10% off” details and code logic (Shopify automatic discount vs custom).
- Auth: Use Shopify Customer Accounts (native to checkout) vs Clerk (one‑touch). Recommendation: Shopify Accounts for checkout cohesion; Clerk optional for community-only features.
- ESP: Klaviyo vs Mailchimp; welcome flow content; coupon issuance.
- Spin‑the‑Wheel: choose vendor (e.g., prebuilt Shopify app) vs custom; gating (per email) and A/B test plan.
- Guarantee: Offer a “90‑day guarantee” badge? Copy and policy details.
- Domains: target market/currency (GBP), VAT settings, shipping rates.

## 14) Milestones & Deliverables
- M0 — Plan sign‑off (today)
  - This plan + requirements captured and approved.
- M1 — Wireframe + Content Map (done)
  - docs/WIREFRAMES-LANDING-PDP.md
  - app/src/content/home.config.ts (seed data)
- M2 — MVP Build (≈ 1 week total from M0, pending assets)
  - Landing, Product, Story, Community, Sustainability, Affiliates, Contact, Legal; reviews import; Shopify connection; Amazon MCF app installed in Shopify.
- M3 — Analytics/QA
  - Pixels wired; GA4 events; performance and accessibility pass; cross‑device QA.
- M4 — Launch + Post‑Launch (Phase 2 grooming)
  - A/B pop‑ups planning; blog backlog; AI assistant scoping; heatmaps.

## 15) Acceptance Criteria (MVP)
- User can land on site, view product, add to cart, checkout via Shopify, and receive confirmation.
- Mobile CLS/LCP within reasonable thresholds; all media responsive.
- Reviews visible with average rating and ~60 entries available.
- Footer links present and working; legal pages published.
- Basic analytics and SEO configured; sitemap generated.

---

Appendix A — References
- Competitor inspirations discussed: Kit/“Catch” style product page; Carpe‑style funnel; gamified pop‑ups.
- Transcript source: feedback/client-call.md (2025‑11‑13).
