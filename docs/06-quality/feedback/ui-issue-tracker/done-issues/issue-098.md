# Issue 098: Shared `Button` component has no focus-visible styling (keyboard users lose their place)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `98`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `3`
- Reach (1–5): `2`
- Effort (1–5): `2`
- Confidence (1–3): `3`
- Priority: `16` ((3×2×3)−2)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The shared Button primitive lacks a visible keyboard focus indicator, so keyboard users can’t tell where they are in admin flows.

Audit claim (issue 98): shared Button has no focus-visible styling.

Likely sources:
- `src/domains/ui-kit/components/Button.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES` and set status accordingly.

Verified: **YES**.

Evidence:
- `src/domains/ui-kit/components/Button.tsx` had hover/disabled styles but no `focus-visible:*` ring/outline styling.

Repro (pre-fix):
1. Navigate to an admin page that uses the shared UI-kit `Button`.
2. Use keyboard `Tab` to focus buttons.
3. Observe there is no visible focus indicator on the Button, so it’s easy to lose your place.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX** (small change, big usability win).

## Step 4 — Options
- [x] Option A: Add `focus:ring-*` styles (shows on mouse click too).
- [x] Option B: Add `focus-visible:ring-*` styles (keyboard-only focus indicator).
- [x] Pick one + rationale (fit with domain architecture).

Selected: Option B — `focus-visible` ring styles.

Rationale:
- Matches modern accessibility expectation: show focus indicator primarily for keyboard navigation without adding noise for mouse users.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan:
- Add a consistent `focus-visible` ring + offset to the shared UI-kit Button base styles.

Acceptance criteria:
- Keyboard focusing a Button shows a visible ring.
- No typecheck regressions.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- `src/domains/ui-kit/components/Button.tsx` now includes `focus-visible:outline-none` + `focus-visible:ring-2` + `focus-visible:ring-offset-2` styling.

Validation:
- `npm run typecheck`

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE.

---

## Evidence / Links

- Code refs:
- `src/domains/ui-kit/components/Button.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Added a focus-visible ring to the shared UI-kit Button so keyboard users retain visible focus in admin workflows.
