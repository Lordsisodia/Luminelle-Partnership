# Issue 102: Welcome page “View leaderboard” card is a dead link and opens in a new tab

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `102`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Creator`
- Impact (1–5): `3`
- Reach (1–5): `4`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `21`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The welcome resource card “View leaderboard” pointed to a dead hash link (`#leaderboard`) and opened a new tab, so creators were sent to nowhere.

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- Resource config used `href: '#leaderboard'` (`src/content/welcome.ts`).
- `WelcomePage` treated non-`/` URLs as external, so it rendered an `<a target="_blank">`.
- `/welcome` does not contain a `#leaderboard` target id.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a top-of-funnel trust issue: onboarding hubs can’t have dead CTAs.
- No product decision required — the leaderboard section already exists on `/creators`.

## Step 4 — Options
- [x] Option A: Point to the real leaderboard section on `/creators#leaderboard` and support hash scrolling.
- [x] Option B: Add a leaderboard section to `/welcome` to make `#leaderboard` valid.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A** because `/creators` already owns the leaderboard section, and it keeps the welcome hub as a link hub.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Update the resource card href to `/creators#leaderboard`.
- Teach `ScrollToTop` to scroll to hash ids when navigating to routes with a hash.

Acceptance criteria:
- Clicking “View leaderboard” navigates to the creators page and scrolls to the leaderboard section.
- Link does not open a new tab.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 102)
- Code refs:
  - `src/content/welcome.ts` (resource href now `/creators#leaderboard`)
  - `src/ui/components/ScrollToTop.tsx` (hash scrolling support)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Onboarding “View leaderboard” now goes to a real section and behaves like an in-app link.
