# Issue 028: Auth pages likely render “double layout” (squashed/overflowing sign-in UI)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `28`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `NOT_AN_ISSUE`
- Area: `Platform`
- Impact (1–5): `4`
- Reach (1–5): `3`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `33` (audit was outdated)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The audit claims the sign-in/up pages are “double-wrapped” by a compact AuthLayout card, making the UI cramped/overflowing.

Audit claim (Issue 28): Auth pages render a fixed ~480px wrapper while pages inside are multi-column/full-width, causing squashed layouts.

Likely source:
- `src/domains/platform/auth/ui/layouts/index.tsx` (`AuthLayout`)
- `src/domains/platform/auth/ui/pages/SignInPage.tsx`
- `src/domains/platform/auth/ui/pages/SignUpPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Evidence (current code):
- `AuthLayout` is a simple full-page background wrapper (`min-h-screen bg-brand-porcelain`) and does **not** impose a fixed-width “card”.
- `SignInPage` lays out its own responsive max-width container (`max-w-5xl`, `md:flex-row`) inside the layout.

Repro:
1) Visit `/sign-in`
2) The page renders as a full-width responsive layout; there is no nested fixed 480px card wrapper.

Verified: **NO** (audit claim is outdated).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: `NOT_AN_ISSUE`

Notes:
- Auth pages may still need visual polish over time, but the specific “double layout / fixed card wrapper” problem is not present in the current code.

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
- Marked `NOT_AN_ISSUE` because `AuthLayout` no longer constrains content to a fixed-width card and the pages are responsible for their own responsive layouts.

---

## Evidence / Links

- Code refs:
- `src/domains/platform/auth/ui/layouts/index.tsx`
- `src/domains/platform/auth/ui/pages/SignInPage.tsx`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `NOT_AN_ISSUE`
- Final notes: Audit claim was based on an older AuthLayout implementation; current layout is full-page and not “double wrapped”.
