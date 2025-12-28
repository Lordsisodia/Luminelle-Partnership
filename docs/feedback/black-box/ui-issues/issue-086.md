# Issue 086: Admin “collapsed sidebar” mode creates unlabeled icon-only navigation (a11y + usability)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `86`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Admin`
- Impact (1–5): `3`
- Reach (1–5): `2`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `15` (audit was outdated)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: When the admin sidebar is collapsed into icon-only navigation, each nav item still needs an accessible name (aria-label/title) so assistive tech users can navigate.

Audit claim (Issue 86): Collapsed sidebar renders icon-only nav with no accessible labels.

Likely source:
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (`NavItemLink`)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- `NavItemLink` already sets `aria-label={collapsed ? label : undefined}` and `title={collapsed ? label : undefined}` on the `NavLink`.
- When `collapsed === true`, the text label is hidden visually, but the link retains an accessible name via `aria-label`.

Repro:
1) In admin, toggle “collapsed” sidebar mode.
2) Inspect nav links: each has an `aria-label` equal to its label and a `title` tooltip.

Verified: **NO** (audit claim is outdated).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `NOT_AN_ISSUE`

## Step 4 — Options
- [ ] Option A: (describe)
- [ ] Option B: (describe)
- [ ] (Optional) Option C: (describe)
- [ ] Pick one + rationale (fit with domain architecture).

## Step 5 — Plan
- [ ] Write implementation plan (bullets).
- [ ] Write acceptance criteria (testable).
- [ ] Risks/rollback notes.

## Step 6 — Execute + Validate
- [ ] Implement changes.
- [ ] Validate (tests or best-effort manual checks).
- [ ] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

Recorded outcome:
- Marked `NOT_AN_ISSUE` because collapsed nav items already have `aria-label` and `title`.

---

## Evidence / Links

- Code refs:
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: Current code already implements the suggested fix (aria-label/title) for collapsed admin nav items.
