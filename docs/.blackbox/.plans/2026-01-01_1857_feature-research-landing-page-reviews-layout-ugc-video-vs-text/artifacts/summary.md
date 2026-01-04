# Summary

## Key takeaways
- We already have both primitives on the Lumelle landing page:
  - **Text reviews** via `ReviewsAutoCarousel` (Customer Stories + TikTok CTA, but text cards).
  - **UGC video** via `FeaturedTikTok` (TikTok embeds carousel/rail with lazy iframe loading).
- In a competitor scan (22 sites), we did **not** detect TikTok embed iframes on homepages (0 in this scanned set).
  - Evidence: `artifacts/playwright-homepage-scan.json`
  - Instead, competitors often lean on:
    - quote-style testimonials (“THE REVIEWS” style sections)
    - “as seen on” / expert quotes / press logos
    - PDP-first review widgets (vendor clues like Yotpo/Okendo/Bazaarvoice showed up, but homepage display varies)
- Video is present on many homepages (native `<video>` tags), but it’s not clearly used as “video reviews” in the sampled set.
- Practical implication: “UGC video is best” may still be true for conversion, but **most brands don’t embed TikTok directly on the homepage**—likely due to performance/control/UX and blocked iframe risk.

## Recommendation
- Default direction: **Hybrid social proof module** (video-first with text fallback), rather than all-text or all-embed.
  - Primary: a small **UGC video rail** (3–6 items) with strict performance guardrails.
  - Secondary: a lightweight **text review carousel** (short quotes + stars) as fallback + for “skim readers”.
- Implementation mapping (for Lumelle):
  - Reuse `FeaturedTikTok` patterns (lazy iframe, placeholder, dots/arrows) as the “video reviews” implementation.
  - Keep `ReviewsAutoCarousel` (text cards) as the fallback proof module.
  - Consider merging under a single heading/section, or use a simple **tab**: “Videos” | “Reviews”.
- Rollout plan:
  - Phase 1: make video “feel primary” by moving/positioning `FeaturedTikTok` closer to the “Customer Stories” zone; keep text reviews below.
  - Phase 2: merge into a single “Social Proof” section with a mode switch (tabbed `Videos | Reviews`, default `Videos`, fallback `Reviews`).
  - Long-term: prefer self-hosted short clips (better control + performance) and keep TikTok as an outbound link.
- Guardrails (non-negotiable):
  - No autoplay audio; respect reduced motion.
  - Lazy-load embeds (load 1, warm neighbors, click-to-load for the rest if needed).
  - Always provide a “Watch on TikTok” (or “Open video”) external link path.

## Links
- Run folder: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/`
- Evergreen: `docs/.blackbox/deepresearch/2026-01-01_reviews-layout-ugc-video-vs-text-landing-page.md`
