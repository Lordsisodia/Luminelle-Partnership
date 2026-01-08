# Issue 110: Some above-the-fold hero images omit explicit sizing (risk of layout shift/jank)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `110`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `3`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `17` (=(2×3×3)−1)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: Above-the-fold hero images should include explicit sizing (or an aspect-ratio wrapper) so the browser can reserve space and avoid layout shift/jank on load.

Audit claim (Issue 110): Some key hero images (welcome + brand story) omit explicit sizing and can cause layout shift.

Likely sources:
- `src/domains/client/marketing/ui/pages/WelcomePage.tsx`
- `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence:
- `WelcomePage` hero image already includes explicit sizing (`width`/`height`) and responsive sources.
- `BrandStoryPage` hero image used `<img ... loading="lazy" />` without `width`/`height`, so layout space can’t be reserved reliably before the image loads.

Repro:
1) Open `/brand` on a cold load (esp. mobile).
2) Observe hero section as the image loads; without explicit sizing the layout can “jump”.

Verified: **YES** (Brand story hero missing explicit sizing).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

- Decision: **FIX**
- Dependencies: none

## Step 4 — Options
- [x] Option A: Add explicit `width` + `height` attributes on the hero `<img>`.
- [x] Option B: Wrap the hero in an aspect-ratio container and absolutely position the image.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: minimal change and consistent with other pages (e.g., welcome hero already sets width/height).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add `width`/`height` (and `decoding="async"`) to the BrandStory hero image.
- Run `npm run typecheck`.
- Update tracker/worklog.

Acceptance criteria:
- `/brand` hero image includes explicit sizing attributes so layout space is reserved pre-load.
- No TypeScript errors introduced.

Risks / rollback:
- Very low; rollback is reverting the attribute additions.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented:
- `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx` — hero `<img>` now includes `width`/`height` (1200×2076) and uses the already-computed `cdnUrl(...)` value for consistency.

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Code refs:
- `src/domains/client/marketing/brand/ui/pages/BrandStoryPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: BrandStory hero image now declares explicit sizing, reducing layout shift risk on initial load.
