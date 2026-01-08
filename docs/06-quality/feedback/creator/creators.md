# Creator — Creators landing (Feedback)

## Routes
- `/creators`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/creator/ui/pages/CreatorsPage.tsx`

## Purpose
Creator program landing page (pitch, proof, onboarding CTA, FAQs).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### 2025-12-26 (internal UI review)
- [x] (#17) `/creators` renders placeholder content; hide route until ready or replace with minimal real landing content. — Black-box: `DONE` ([issue-017](../ui-issue-tracker/done-issues/issue-017.md))

### 2025-10-31 (initial notes)
- [ ] Reduce desktop whitespace in “Why creators choose Lumelle” around the Explore Stories card.
- [ ] TikTok embeds: increase height / adjust aspect so full video is visible without inner scrolling (mobile + desktop).
- [ ] Leaderboard: replace placeholder circles with creator profile photos.
- [ ] Desktop nav: remove redundant “Join” anchor and trim items to reduce crowding.
- [ ] Fix mobile horizontal overflow / width snap so pages render flush edge-to-edge.

### 2025-10-31 (client annotated checklist)
Note: items in the source note were marked ✅ / ⚠️ — treat these as “requested + agreed” and verify current UI still matches.

- [ ] Mobile header: center wordmark + remove “Menu” button (marked ✅).
- [ ] Hero alignment: center “Creator Affiliate Program” label + “Join the Lumelle Creator Community” headline (marked ✅).
- [ ] Hero background: slow blurred carousel behind hero copy with 4–5 approved creator photos (marked ⚠️; implemented with placeholders; swap in approved images from `public/images`).
- [ ] Mobile hero metrics: center stat cards within columns (marked ✅).
- [ ] Metrics/perks carousel: add imagery for perks (spa day, cash boosts, product drops) + include cash prize imagery (e.g. phone screenshot of £1,000 payout) (marked ✅).
- [ ] Journey steps copy: rewrite Step 1 “Trial” to feel aspirational (marked ✅).
- [ ] Journey steps copy: enhance Step 2 “Learn” with scripts/insights/trend intel (marked ✅).
- [ ] Journey steps copy: update Step 3 “Launch” to highlight bonuses/prizes up to £1,000; ensure centered on mobile (marked ✅).
- [ ] “Explore the Story” cards: fill in detailed copy/content (marked ✅; depends on stakeholder inputs).
- [ ] Testimonials: center section on mobile; add profile photos; align typography + key stats; tidy spacing (marked ✅).
- [ ] Video embeds: resize/adjust so full TikTok/video content is visible without awkward cropping (marked ✅).
- [ ] Testimonial stat rows: normalize line-height/spacing while keeping font sizing consistent (marked ✅).
- [ ] Merge perks + tier pages: remove commission section; update rewards (Gold £1,000 + spa day, Silver £500 + gift set, Bronze £250 + gift set) and show as leaderboard positions (marked ✅).
- [ ] Leaderboard: remove commission breakdown/week-one roadmap above leaderboard; show top creators with visible handles (marked ✅).
- [ ] Challenge Drop card: commission reward reads 20% (not 30%) (marked ✅).
- [ ] FAQ: rename “playbook” → “content brief”; replace Q2/Q3 with new entries (why Lumelle, who we are + About link, commission & ad spend details: 20% commission, 10% ad spend) (marked ✅).
- [ ] Remove final step section; simplify final CTA (e.g., single Join WhatsApp button) (marked ✅).
- [ ] Footer email: `info@lumellebeauty.co.uk` (marked ✅).

## Decisions / notes
- _None yet._

## Related sources
- [2025-10-31-initial-notes.md](../2025-10-31-initial-notes.md) (early creator landing feedback)
- [2025-10-31-client-feedback.md](../2025-10-31-client-feedback.md) (annotated requests + checklist)
- [2025-11-13-client-call.md](../2025-11-13-client-call.md) (program direction + affiliates context)
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md) (internal static audit)
