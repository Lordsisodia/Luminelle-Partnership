# Plan: feature research: landing page reviews layout (UGC video vs text)

## Goal
Decide the best “reviews” layout for an e-commerce landing page (UGC video vs text), grounded in:
- our current Lumelle implementation (what exists today)
- competitor patterns (what works in the wild)
- a concrete recommendation we can implement and test

## Created
2026-01-01 18:57

## Target (optional)
Timebox: 2–4 hours for a first pass, 1 day for a full competitor scan.

## Context
- Prompt: We suspect TikTok-style UGC is the strongest trust lever on landing pages, but we also have plain text review options.
- Constraint: Optimize for trust + conversion without crushing performance (LCP/CLS) or accessibility.
- Done means:
  - We can answer: (1) do we already have this functionality? (2) what does competition do?
  - We produce 2–3 layout archetypes + one recommendation, mapped to our existing components.

## Docs To Read (and why)
- [x] `src/domains/client/marketing/ui/pages/ShopLandingPage.tsx` — current landing-page section ordering and review/UGC usage
- [x] `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx` — current reviews section layout + TikTok CTA
- [x] `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx` — current TikTok section format and constraints
- [x] `docs/01-product/admin/products.md` — intended admin support for reviews/testimonials/UGC
- [x] `docs/05-planning/plans/frontend-plan.md` — planned review/UGC components + placement experiments
- [x] `docs/06-quality/reviews/README.md` — OCR tool to convert screenshot reviews to usable copy

## Plan Steps
- [x] Step 1: Audit “what we have” (code + docs) and write a short capability snapshot.
- [x] Step 2: Build a competitor matrix (10–15 sites) capturing placement + format + CTA + vendor widgets + perf notes.
- [x] Step 3: Synthesize 2–3 layout archetypes (UGC-first, text-first, hybrid) with pros/cons and a default recommendation.
- [x] Step 4: Map recommendation → implementation plan (reuse vs extend `ReviewsAutoCarousel` / `FeaturedTikTok`).
- [ ] Step 5 (optional): Propose an A/B test plan (section order + CTA + format) with success metrics.

## Artifacts (created/updated)
- `docs/.blackbox/deepresearch/2026-01-01_reviews-layout-ugc-video-vs-text-landing-page.md` — draft research note (this plan’s “home”)
- `artifacts/sources.md` — sources + evidence pointers
- `artifacts/extracted.json` — competitor matrix (22) + evidence pointers
- `artifacts/evidence/competitors/` — competitor mobile homepage screenshots (gitignored)
- `artifacts/summary.md` — synthesis + recommendation
- `rankings.md` — archetypes scored + next steps
- `final-report.md` — end-to-end writeup + decisions

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- UGC rights/moderation: do we have permission to reuse creator content on-site?
- Performance: third-party review widgets vs first-party rendering.
- Accessibility: captions, keyboard nav, reduced motion, autoplay defaults.
- Authenticity: “verified buyer” and attribution vs anonymous quotes.

## Notes / Revisions
- 2026-01-01 — Created plan + seeded initial docs/code pointers.
