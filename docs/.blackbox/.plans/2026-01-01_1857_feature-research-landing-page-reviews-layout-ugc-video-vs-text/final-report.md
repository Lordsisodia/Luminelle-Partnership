# Final Report

## ✅ 1) Summary (what happened)

- Audited Lumelle’s current landing + PDP social proof: we already have text reviews and TikTok embeds, but they’re split into separate sections.
- Captured competitor evidence (mobile full-page screenshots) across 22 sites to see what “best-in-class” does on the homepage.
- Produced a recommendation: a hybrid module (video-first with text fallback), with strict performance/a11y guardrails.

## 🧭 2) Stages completed

- Align: Defined the decision (best landing-page reviews layout: UGC video vs text) and constraints (perf/a11y).
- Plan: Created run folder + seeded work queue + artifact expectations.
- Execute: Captured evidence screenshots and updated extracted matrix + summary.
- Verify: Opened multiple screenshots manually and cross-checked internal code pointers for existing primitives.
- Wrap: Updated `artifacts/sources.md`, `rankings.md`, and this report.

## 📦 3) Artifacts (paths)

- Plan folder: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/`
- Key outputs:
  - `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/summary.md` — key takeaways + recommendation
  - `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/extracted.json` — competitor matrix (22) with evidence pointers
  - `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/playwright-homepage-scan.json` — automated scan signals (terms, iframes, video tags, vendor clues)
  - `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/` — screenshots (png, gitignored)
  - `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/rankings.md` — archetypes scored with rationale
  - `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/sources.md` — internal + external sources

## 🧪 4) Verification

- What ran:
  - Playwright screenshot capture via `docs/.blackbox/scripts/research/capture_tier_a_screenshot.py` for 22 sites.
  - Playwright HTML + DOM scan script → `artifacts/playwright-homepage-scan.json`.
  - Internal code audit via ripgrep + file inspection.
- What to manually check:
  - Review the “best examples” screenshots (Kitsch, ThirdLove, Slip, SHHHCAP) and confirm which patterns match Lumelle’s brand + constraints.
  - Validate whether TikTok embeds are acceptable on landing pages for your target audience (privacy blockers / performance).

## ❓ 5) Decisions / open questions (numbered)

1) Do we want TikTok embeds on the landing page, or should we migrate to self-hosted short videos (safer, faster, more controllable)?
2) Should the landing page social proof remain split (Reviews then TikTok), or be merged into a single module (tabbed Videos | Reviews)?
3) Rights/moderation: do we have explicit permission to feature creator content on-site (beyond linking out)?

## 🏁 6) Rankings (out of 100)

1) Hybrid social proof module (Videos + Reviews tab, with fallback) — 90/100 — best balance of trust + performance + risk mitigation — Next: prototype merged section using existing components.
2) Text-first testimonials + stars (keep video separate) — 82/100 — fastest + safest — Next: add a “watch” affordance to bridge to video without heavy embeds.
3) Video-first (UGC rail only) — 78/100 — highest potential lift, higher risk — Next: A/B test with click-to-load and text fallback.
4) Third-party video reviews widget — 74/100 — quick but vendor/perf risk — Next: one-day spike to measure script cost + customization limits.

---

Updated: 2026-01-01 19:56
