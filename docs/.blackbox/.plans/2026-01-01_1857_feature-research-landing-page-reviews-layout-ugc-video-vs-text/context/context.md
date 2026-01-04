# Rolling Context (read first)

Keep this compact and current. This file is the “always read” memory.

## Current goal

- Decide the best **landing-page reviews/social proof layout** for Lumelle, specifically:
  - Should we prioritize **UGC video (TikTok-style)**, **text reviews**, or a **hybrid**?
  - What do competitors do on their **home/landing pages** vs **PDP**?
  - Map the winning pattern to **our existing components** with performance + accessibility guardrails.

## Current assumptions / constraints

- UGC video is a strong trust lever, but **TikTok embeds** may be avoided on homepages due to performance, reliability, and UX control.
- We need a **fast** module (avoid LCP/CLS regressions) and a **resilient fallback** (blocked iframes, slow networks).
- This run is **research-only** (no product implementation yet).

## Current best candidates / hypotheses

- Best default: **Hybrid proof module**:
  - UGC video rail (limited + lazy-loaded) + text reviews fallback (stars + short quotes).
- Competitors tend to:
  - prefer **native video** or internal UGC galleries over embedding TikTok directly
  - use **text testimonials / press/expert** signals near the top; full review widgets are often PDP-first.

## Open questions / decisions needed

1) Where should the merged proof module live in the landing page order (above benefits vs below)?
2) Do we want a “Videos | Reviews” **tab** or two separate blocks with a shared heading?
3) UGC rights: do we have clear permission/attribution requirements for creator content?
4) What’s the success metric for the module (CVR, scroll depth, time on page, CTR to PDP, etc.)?

## Recent progress (latest 3–5)

- Confirmed Lumelle already has both text reviews and TikTok embed primitives on the landing page (`ReviewsAutoCarousel` + `FeaturedTikTok`).
- Captured a competitor homepage evidence set (mobile screenshots) in `artifacts/evidence/competitors/` and listed sites in `artifacts/extracted.json`.
- Ran a Playwright homepage scan across 22 competitors and found 0 TikTok iframe embeds in this set (see `artifacts/playwright-homepage-scan.json`).
- Wrote initial synthesis + recommendation in `artifacts/summary.md` and draft archetype ranking in `rankings.md`.
