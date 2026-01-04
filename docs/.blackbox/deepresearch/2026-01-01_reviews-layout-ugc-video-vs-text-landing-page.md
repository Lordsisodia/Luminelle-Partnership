# Landing-page reviews layout — UGC video (TikTok) vs text

Created: `2026-01-01`  
Status: ✅ first pass complete (evidence captured)  
Plan: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/`

This note captures an opinionated hypothesis + evidence-backed findings for how we should layout reviews on an e-commerce landing page.

Preference (from product feedback):
- we should likely lean **video-first** (TikTok / UGC) rather than text-only review cards
- but we should keep a **plain text fallback** (performance, accessibility, blocked embeds, etc.)

Evidence + synthesis artifacts (from the run):
- Competitor matrix (22): `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/extracted.json`
- Screenshots (gitignored): `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/evidence/competitors/`
- Recommendation summary: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/artifacts/summary.md`
- Rankings: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/rankings.md`
- Final report: `docs/.blackbox/.plans/2026-01-01_1857_feature-research-landing-page-reviews-layout-ugc-video-vs-text/final-report.md`

---

## Working hypothesis

**UGC video** tends to outperform plain text reviews for:
- trust (you can see the product used)
- relevance (“people like me”)
- engagement (time on page / scroll depth)

…but it can backfire if:
- embeds are heavy (LCP/CLS regressions)
- autoplay is aggressive or inaccessible
- third-party iframes fail to load (privacy, network, blockers)

The “correct” end state is probably a **hybrid**:
- a small video rail near the top (TikTok / UGC)
- a lightweight text review module as backup / secondary proof

---

## What we already have in the codebase (capability snapshot)

### 1) Text reviews (today)

- Reviews section on the product landing page:
  - `src/domains/client/shop/products/ui/sections/reviews-auto-carousel/ReviewsAutoCarousel.tsx`
- Review cards carousel implementation:
  - `src/components/ui/3d-carousel.tsx`

This is currently **text + stars**, with a CTA pill linking out to TikTok.

### 2) TikTok embeds (already implemented elsewhere)

We already have “UGC video carousel” patterns we can reuse:
- TikTok embeds section (scrollable rail + lazy iframe loading):
  - `src/domains/client/shop/products/ui/sections/featured-tik-tok/FeaturedTikTok.tsx`
- TikTok embed card pattern (creator success stories):
  - `src/domains/creator/ui/sections/success/SuccessStoriesSection.tsx`
- Data model includes `embedUrl` + `videoUrl`:
  - `src/content/landing.ts`

Implication:
- we **do** have the raw primitives to do video-first review proof on a landing page
- we may **not** be using them in the “Customer Stories” section yet (depends on which landing surface is in scope)

---

## Findings (first pass)

From a competitor **screenshot scan** (22 sites, captured 2026-01-01):
- Automated check: **0/22 homepages** had TikTok embed iframes (`iframe[src*="tiktok.com"]`) in our scan.
- Most brands do **not** make “homepage reviews” the primary section; many are merch/brand/story first.
- Where social proof is explicit, it’s often:
  - quote/testimonial blocks (“THE REVIEWS” style)
  - press / retail / expert quotes (“as seen on”)
  - creator/influencer imagery (UGC vibes) without embedding TikTok directly
- Practical implication: even if UGC video converts best, “embed TikTok everywhere” is uncommon. The safest default is **hybrid** (video-first with a text fallback), with strict performance controls.

Takeaway:
- “Video-first” can still be a good direction, but we should design it to be **fast + resilient** (lazy load + fallback) rather than “embed everything by default”.

---

## Recommendation (what we should do)

Decision direction:
- **Ship a hybrid “Social Proof” module** that is **video-first by default**, with a **text fallback**.
- Avoid “TikTok embeds everywhere” on the landing page; prefer **self-hosted** short clips long-term, or **click-to-load** embeds short-term.

Why:
- Video is likely the strongest trust lever (matches product preference + UGC best practice).
- Text reviews are a reliable fallback for performance, accessibility, and embed failure modes.
- Competitor evidence suggests many brands avoid embedding TikTok directly on homepages (0/22 in our scan), likely due to performance + reliability + UX control.

### Proposed rollout (2 phases)

**Phase 1 (fast win):** reorder + reuse existing components
- Keep shipping both sections, but make the story coherent:
  - put `FeaturedTikTok` closer to the “Customer Stories” area
  - keep `ReviewsAutoCarousel` as secondary proof

**Phase 2 (best UX):** merge into one section with a mode switch
- Single heading: “Customer Stories”
- Two modes: `Videos | Reviews`
- Default = Videos
- Fallback to Reviews if embeds fail / are blocked

### Implementation sketch (not building yet)

Landing page order idea:
```tsx
// src/domains/client/marketing/ui/pages/ShopLandingPage.tsx
<section id="reviews">
  <FeaturedTikTok />
  <ReviewsAutoCarousel reviews={homeConfig.reviews} />
</section>
```

Unified module idea:
```tsx
function SocialProofSection() {
  // default to videos; fall back if embeds fail / blocked
  const [mode, setMode] = useState<'videos' | 'reviews'>('videos')

  return mode === 'videos'
    ? <FeaturedTikTok />
    : <ReviewsAutoCarousel reviews={homeConfig.reviews} />
}
```

### Guardrails (non‑negotiable)

- No autoplay audio; respect reduced motion.
- Lazy-load embeds (load 1, warm neighbors; click-to-load for the rest if needed).
- Always provide an external “Watch on TikTok” path.
- Maintain an always-available text proof fallback.

---

## Research questions (to answer)

### 1) Do we currently have this functionality?

Define “this functionality” precisely:
- can we show **video UGC** in the **product landing page** “Customer Stories / Reviews” zone?
- can it be **carousel/rail** + **mobile swipeable** + **keyboard accessible**?
- can it load with good performance (lazy, skeleton, no CLS)?

Deliverable:
- a short “yes/no + what exists + gaps” snapshot

### 2) What does the competition do?

We should benchmark:
- best-in-class DTC (beauty / hair / apparel) and platform leaders
- competitors in our category (or adjacent) with strong TikTok presence

Capture for each site:
- placement (how high on page?)
- format (video rail, review widget, UGC grid, before/after)
- primary CTA (“See more”, “Read reviews”, “Shop now”, “Watch”)
- trust signals (verified buyer, UGC attribution, star aggregation)
- performance notes (how heavy? what loads above the fold?)
- vendor stack clues (Yotpo, Judge.me, Bazaarvoice, custom, etc.)

Deliverable:
- a 10–15 site matrix + 2–3 “layout archetypes” distilled from it

---

## Constraints / risks to keep front-of-mind

- **Rights & attribution:** do we have permission to reuse creator content on-site? (especially if it’s not our own handle)
- **Performance:** third-party iframes can be expensive; default to click-to-load or “load 1–2, preload neighbors”
- **Accessibility:** avoid autoplay, support keyboard, provide captions/alt context, honor reduced motion
- **Resilience:** embeds might fail; always have a fallback proof module (text reviews, press quotes, stats)

---

## Next steps (implementation, not research)

- Decide: TikTok embeds on landing page vs self-hosted short videos (risk: blocked iframes + perf).
- Prototype: merge into one “Social Proof” section (tabbed `Videos | Reviews`) using existing components.
- Measure: LCP/CLS + scroll depth + CTA clicks (and ensure reduced-motion + no autoplay audio).
