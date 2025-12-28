# Issue 138: PDP thumbnail strip hides the scrollbar and has no “more media” affordance

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `138`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `13`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The PDP thumbnail strip is horizontally scrollable but hides scrollbars and provides no obvious hint that more media exists.

Audit claim (Issue 138): the thumbnail row hides scrollbars and has no “more media” affordance, so users (especially on desktop) may not discover additional images.

Likely files:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx` (thumbnail scroller)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (code):
- `HeroMedia` used `overflow-x-auto` for thumbnails but explicitly hid scrollbars (`[&::-webkit-scrollbar]:hidden` + `scrollbarWidth: 'none'`).
- No arrows, fades, or “more” indicator existed, so discoverability relied on users guessing to horizontally scroll.

Repro:
1. Visit any PDP with more thumbnails than fit in the viewport.
2. On desktop, observe that there’s no visible scrollbar and no cue that the row is scrollable.

Verified: **YES** → fixed and marked `DONE`.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Score:
- Impact: 2 (conversion polish + media discovery)
- Reach: 4 (PDP is high traffic)
- Effort: 3 (UI work + a bit of state)
- Confidence: 2 (clear in code + common UX issue)
- Priority: `(2×4×2) − 3 = 13`

Decision: **FIX**

Dependencies: none.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] (Optional) Option C: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Option A — Show scrollbars:
- Simplest, but often clashes with desired visual style.

Option B — Keep hidden scrollbar but add affordances (**chosen**):
- Add edge fades to hint overflow.
- Add left/right arrow buttons on desktop for discoverability and precise control.
- Keep mobile/touch behavior unchanged.

Option C — “+N more” badge:
- Helpful but still benefits from navigation controls.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation plan:
- Add a `ref` to the thumbnail scroller element.
- Track `hasOverflow`, `canScrollLeft`, `canScrollRight` based on scroll position.
- Render subtle left/right gradient fades when overflow exists.
- Render left/right arrow buttons on desktop when scrolling is possible.

Acceptance criteria:
- On overflow, users see a “more” cue (edge fade) and can scroll via arrows on desktop.
- On non-overflow, no extra UI is shown.
- `npm run typecheck` stays green.

Risks/rollback:
- If arrows feel visually heavy, keep the fades only and remove arrow buttons.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx`
  - Added overflow detection + fades + arrow buttons for the thumbnail scroller.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Summary:
- Added clear “more media” affordances to the PDP thumbnail strip (edge fades + desktop arrow controls) without reintroducing visible scrollbars.

Final status: `DONE`

---

## Evidence / Links

- Code refs:
  - `src/domains/client/shop/products/ui/pages/ProductPage/sections/HeroMedia.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: This improves discovery of additional imagery on desktop (where horizontal scrolling is least discoverable).
