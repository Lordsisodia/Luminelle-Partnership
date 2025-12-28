# Issue 174: Public header shows two “Account” links on desktop (redundant + wastes header space)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `174`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The public header rendered two separate “Account” entry points on desktop (text + icon), which is redundant and makes the header feel cluttered.

Audit (issue 174): `docs/reviews/app-ui-review-2025-12-26.md` — “Public header shows two “Account” links on desktop (redundant + wastes header space)”.

Likely file:
- `src/ui/components/PublicHeader.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (no longer reproducible in current code)

Evidence (current code):
- The account icon link is now `md:hidden`, so it does **not** render on desktop.
- The text account link is `md:inline-flex`, so it renders on desktop.

This ensures there is only one account entry per breakpoint (icon on mobile, text on desktop).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **CLOSE (already addressed)** ✅

Notes:
- This was a real polish issue per audit, but the current header implementation already renders a single account control per breakpoint.

## Step 4 — Options
- [x] Option A: Icon on mobile + text on desktop (no duplicates).
- [ ] Option B: Text+icon combined into one control (single element that adapts).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**, which is already implemented.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan (already implemented):
- Ensure only one “Account” link is visible per breakpoint.

Acceptance criteria:
- On desktop, only the text “Account” link is visible.
- On mobile, only the icon button is visible.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Execution:
- No code changes required in this run; the header already uses `md:hidden` on the icon account link.

Validation:
- Static verification in code: `PublicHeader` breakpoint classes match the intended behavior.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 174)
- Code refs:
  - `src/ui/components/PublicHeader.tsx` (desktop hides icon account link)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Public header now shows a single account entry per breakpoint (icon on mobile, text on desktop), eliminating redundant “Account” controls on desktop.
