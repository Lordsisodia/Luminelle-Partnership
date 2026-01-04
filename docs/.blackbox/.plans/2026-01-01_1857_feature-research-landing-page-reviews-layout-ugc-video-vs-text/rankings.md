# Rankings (0–100)

Use the rubric in `docs/.blackbox/agents/deep-research/rubric.md` (or your folder equivalent).

## Ranked items
1) **Hybrid social proof module (Videos + Reviews tab, with fallback)** — 90/100
   - Thesis: Put UGC video up front for trust/engagement, but keep text reviews as an always-available fallback for performance + accessibility + blocked embeds.
   - Evidence:
     - We already have both primitives in the landing page today (just split): `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`
     - Existing video rail pattern: `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`
     - Existing text review carousel: `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`
     - Competitor scan: homepages often use text testimonials / press signals and rarely embed TikTok directly in our sample → a hybrid mitigates iframe risk: `artifacts/extracted.json`
   - Risks:
     - Complexity creep (tabs/toggles + state + analytics).
     - Performance regressions if we load too many embeds at once.
   - Next step: Prototype a merged section (tab: Videos | Reviews) reusing existing components; enforce lazy loading (load first embed only) and measure CLS/LCP.
   - Breakdown: Impact 23/25, Feasibility 19/20, Evidence 17/20, Novelty 12/15, Time-to-value 9/10, Risk profile 10/10

2) **Text-first testimonials + stars (keep video as separate section)** — 82/100
   - Thesis: Keep the landing page lightweight and fast: quote testimonials + star summary near top; keep UGC video lower on the page as optional depth.
   - Evidence:
     - Competitor pattern: explicit quote/testimonial blocks (e.g., “THE REVIEWS” style) appear on category-adjacent homepages: `artifacts/extracted.json`
     - Our current implementation is already basically this (text reviews section + separate TikTok section): `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx`
   - Risks:
     - Leaves conversion lift on the table if video is the true trust lever.
     - Users may never scroll to the UGC section.
   - Next step: Add a “watch” affordance near the reviews section (e.g., one featured clip thumbnail that opens the rail) without embedding multiple iframes.
   - Breakdown: Impact 20/25, Feasibility 19/20, Evidence 15/20, Novelty 8/15, Time-to-value 10/10, Risk profile 10/10

3) **Video-first (UGC rail only; text reviews deeper/secondary)** — 78/100
   - Thesis: Go all-in on UGC at the point of trust decision; simplify the proof module to a short, high-signal video rail.
   - Evidence:
     - We can implement this today using `FeaturedTikTok` patterns and `successStories` data: `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`, `src/content/landing.ts`
   - Risks:
     - Embeds can fail (privacy blockers, network); if text fallback is too hidden, trust collapses.
     - Higher operational overhead (moderation, rights, keeping videos fresh).
   - Next step: Run an A/B test with strict guardrails (click-to-load embeds, show 1 loaded video at a time) vs current hybrid baseline.
   - Breakdown: Impact 23/25, Feasibility 16/20, Evidence 12/20, Novelty 13/15, Time-to-value 7/10, Risk profile 7/10

4) **Third-party “video reviews” widget (Loox/Okendo/etc.)** — 74/100
   - Thesis: Use a specialized vendor to ship video reviews quickly and get credibility features (verified buyer, moderation, syndication).
   - Evidence:
     - Vendor clues appear widely in competitor HTML (Yotpo/Okendo/Bazaarvoice), suggesting this is a common build-vs-buy route: `artifacts/extracted.json`
   - Risks:
     - Performance + script bloat + vendor lock-in.
     - Styling constraints; harder to match brand.
   - Next step: Decide “build vs buy” explicitly and run a one-day spike to measure performance impact and customization limits.
   - Breakdown: Impact 19/25, Feasibility 15/20, Evidence 14/20, Novelty 6/15, Time-to-value 10/10, Risk profile 10/10
