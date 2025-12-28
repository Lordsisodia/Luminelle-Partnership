# Brand Story Page — Plan (draft)

## Objectives
- Tell Lumelle’s origin + purpose succinctly.
- Prove credibility (materials, results, community).
- Invite action (shop, email capture, quiz) without feeling salesy.

## Page structure (proposed)
1) **Hero**  
   - Headline: brand promise.  
   - Subhead: who we serve + why.  
   - CTA pair: primary (Shop / Quiz), secondary (Email capture or Watch mini film).
   - Visual: founder/creator moment or product-in-use.

2) **Origin story (short)**  
   - 2–3 cards timeline: spark → prototype → first 100 customers.  
   - Include a quote from founder/early creator.

3) **Proof / Product credibility**  
   - “Why it works” 3-up (materials, fit, seal) with micro data or benchmarks.  
   - Callout: 100+ uses, zero-frizz test, steam-room test.  
   - CTA: Learn the cap science (link to blog science pillar).

4) **Values & craft**  
   - 3 pillars: “Comfort band”, “Satin + TPU”, “Creator-first testing”.  
   - Add a sustainability/quality note (care, longevity).

5) **Community / Social proof**  
   - Carousel of creator quotes (reuse `storyCards` pattern) with avatar + handle + short pull quote.  
   - Metrics: saves, repeat purchase %, NPS snippet.

6) **How we give back / promise**  
   - Simple pledge (e.g., edge-safe design, no single-use plastics, honest timelines).  
   - Returns/warranty microcopy.

7) **CTA strip**  
   - Single CTA to Shop / Quiz, secondary to Blog “Start here”.

## Content needed
- Hero: headline, subhead, hero image/looping video, CTAs.
- Timeline entries (3): year, title, 1–2 sentences, optional image.
- Proof stats: friction reduction %, steam test outcome, lifespan claim.
- Values blurbs (3): title + 1–2 sentences each.
- 4–6 creator quotes: name, handle, avatar, quote, platform badge.
- CTA copy for final strip.

## Components to reuse/build
- Reuse `SectionHeading`.
- Reuse `storyCards` carousel pattern (from landing `BrandStorySection`) for community quotes.
- New small components:
  - `TimelineCards` (3–4 items, responsive stack).
  - `StatsCallout` (3-up numbers).
  - `PromiseStrip` (single-row CTA).

## Data shape (suggested, TS)
```ts
type BrandTimelineItem = { year: string; title: string; body: string; image?: string };
type BrandStat = { label: string; value: string; helper?: string };
type BrandValue = { title: string; body: string; icon?: string };
type BrandQuote = { name: string; handle: string; platform: 'tiktok'|'ig'|'yt'; quote: string; avatar: string };
```
Store in `src/content/brand.ts` and import into the page.

## Actions to build page
1) Add `src/content/brand.ts` with timeline, stats, values, quotes, hero copy.
2) Create `BrandStoryPage.tsx` under `src/domains/brand/ui/pages/` using structure above.
3) Wire route (`/brand` or `/our-story`) in router/nav.
4) Use existing `SectionHeading` and create small layout components in `src/domains/brand/ui/components/`.

## Asset needs
- Hero image/video (founder/product in use).
- 3 timeline thumbnails.
- 3–4 avatar images for quotes (can start with Unsplash placeholders).

## Open questions
- Primary CTA: Shop vs Quiz vs Email?  
- Do we emphasize sustainability or longevity more?  
- Any compliance/legal copy required (e.g., test claims)?
