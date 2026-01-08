# Issue 025: The 3D reviews carousel is not accessibility-friendly (and can be motion-heavy)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `25`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `15`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The 3D reviews carousel relies on drag-only interaction with no explicit controls, making it inaccessible for keyboard-only and assistive-tech users, and potentially uncomfortable for motion-sensitive users.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES** (before fix).

Evidence (before fix):
- The carousel component (`src/components/ui/3d-carousel.tsx`) only supported drag to rotate.
- There were no previous/next controls and no keyboard interaction hooks.
- Reduced-motion users still saw the 3D layout (just with drag disabled), instead of a static alternative.

Repro:
1. Navigate to a section that renders the reviews carousel (e.g. PDP reviews).
2. Try to use keyboard-only (Tab / Arrow keys) to change the active review — there is no way to rotate the carousel.
3. Enable reduced motion and reload — still a 3D carousel surface rather than a static list/grid.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**.

Notes:
- This is a common accessibility audit failure for carousels.
- No product decisions or backend dependencies required.

## Step 4 — Options
- [x] Option A: replace the 3D carousel entirely with a standard carousel/list.
- [x] Option B: keep the 3D carousel but add explicit prev/next controls + keyboard support, and render a static grid for reduced-motion users.
- [x] Pick one + rationale (fit with domain architecture).

Chosen: **Option B**. Keeps the existing visual while making it usable for keyboard users and respectful of reduced-motion preferences.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add `Prev/Next` buttons near the carousel.
- Add keyboard handling (ArrowLeft/ArrowRight) when the carousel region is focused.
- Maintain an `activeIndex` and snap the cylinder rotation to discrete cards.
- When `prefers-reduced-motion` is enabled, render a static grid of review cards.

Acceptance criteria:
- Users can switch reviews using visible buttons.
- Users can switch reviews via keyboard arrow keys.
- Reduced-motion users see a static, readable layout (no 3D rotation interactions required).

Risks/rollback:
- Moderate UI change inside the carousel component only; limited blast radius because it’s localized to `3d-carousel.tsx`.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- Added `Prev`/`Next` buttons and keyboard arrow navigation.
- Added an `activeIndex` and snapped rotation to discrete review cards.
- Added a reduced-motion static grid fallback.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/components/ui/3d-carousel.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The carousel now offers explicit controls, keyboard navigation, and a reduced-motion safe fallback, improving accessibility and usability without removing the existing 3D design.
