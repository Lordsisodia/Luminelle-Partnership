# Issue 136: Global `overflow-x-hidden` can clip focus rings/shadows and hides layout bugs instead of fixing them

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `136`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `3`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `25` ((3×3×3)−2)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The app applied global `overflow-x-hidden`, which can clip focus rings/shadows and also masks real horizontal overflow bugs instead of fixing them.

Audit claim (issue 136): Global `overflow-x-hidden` is used as a catch-all and can clip focus rings/shadows and hide layout bugs.

Likely sources:
- Global CSS: `src/index.css` (`body` styles)
- Layout wrapper: `src/layouts/MarketingLayout.tsx` (root wrapper)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES` and set status accordingly.

Evidence:
- `src/index.css` applied `overflow-x-hidden` on `body`.
- `src/layouts/MarketingLayout.tsx` also wrapped all marketing pages in a `div` with `overflow-x-hidden`.

Repro steps (pre-fix):
1. Open any route using `MarketingLayout` (e.g. `/`, `/product/lumelle-shower-cap`).
2. Inspect `body` (and the outer layout wrapper) in DevTools → confirm `overflow-x: hidden` is applied.
3. Tab through focusable elements near the page edge or components with shadows; focus rings/shadows can be clipped by overflow.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: FIX (remove the global “masking” style and deal with overflow at the source when it appears).

## Step 4 — Options
- [x] Option A: Keep `overflow-x-hidden` globally (status quo).
- [x] Option B: Replace with `overflow-x-clip` globally (still masks and still clips).
- [x] Option C: Remove global overflow hiding and only apply overflow control to the specific component that needs it.
- [x] Pick one + rationale (fit with domain architecture).

Selected: Option C.

Rationale:
- Global overflow hiding is a “paper over cracks” approach and creates subtle a11y/polish bugs.
- Fixing overflow locally is consistent with the domain layout approach (each component/layout owns its own visual constraints).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation plan:
- Remove `overflow-x-hidden` from global `body` styles in `src/index.css`.
- Remove `overflow-x-hidden` from the `MarketingLayout` root wrapper.
- Leave overflow control in place only where it is intentionally needed (e.g. specific scroll containers).

Acceptance criteria:
- Focus rings and shadows are no longer clipped by a global overflow rule.
- No new horizontal scrollbars appear on common routes (homepage + PDP).
- Typecheck passes.

Risk/rollback:
- Risk: removing global overflow hiding could reveal an underlying horizontal overflow bug (a real layout issue).
- Rollback: reintroduce a *local* `overflow-x-hidden` on the specific offending component/container once identified, not globally.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/index.css` removed global `overflow-x-hidden` from `body`.
- `src/layouts/MarketingLayout.tsx` removed `overflow-x-hidden` from the root wrapper.

Validation:
- `npm run typecheck`
- Manual QA checklist:
  - Visit `/` and `/product/lumelle-shower-cap` and confirm no horizontal scrollbars.
  - Tab through header + primary CTA buttons to confirm focus styles are not clipped.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE.

---

## Evidence / Links

- Code refs:
  - Global CSS: `src/index.css`
  - Marketing layout wrapper: `src/layouts/MarketingLayout.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed global overflow hiding so focus/shadows don’t get clipped; any future horizontal overflow should be fixed at the source component instead of being masked globally.
