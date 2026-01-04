# Issue 009: Header redundancy + responsive layout risk

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `9`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

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

The public site header showed redundant account controls on desktop and used absolute centering for the brand, which risks collisions at narrower widths.

Audit (issue 9): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Header redundancy + responsive layout risk”.

Likely file:
- `src/ui/components/PublicHeader.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- On `md` and up, the header rendered both:
  - an “Account” text button (`md:inline-flex`)
  - an account icon link (always visible)
- The brand block was absolutely positioned (`absolute left-1/2 -translate-x-1/2`), which can overlap with left/right clusters.

Repro (before fix):
1. Visit any marketing page that uses `MarketingLayout` (e.g. `/`).
2. View on desktop width.
3. Observe both “Account” button and the account icon in the header.
4. Shrink the viewport to a narrow desktop width and the centered logo can collide with controls.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is the most-used navigation surface (high reach).
- Redundancy + collision risk lowers perceived quality and can create mis-clicks.

## Step 4 — Options
- [x] Option A: Keep current header but hide either the “Account” button or the icon at `md+`.
- [x] Option B: Replace absolute centering with a 3-column layout so the brand never overlaps controls.
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option B** + a small part of A: use a grid layout for robust centering, and hide the account icon on desktop to remove redundancy.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Convert the header’s top nav container from `flex + absolute center` to a 3-column `grid` (`[left] [center] [right]`).
- Remove absolute positioning from the brand block and use `justify-self-center`.
- Hide the account icon link on `md+` (`md:hidden`) so desktop shows only the “Account” button.

Acceptance criteria:
- Desktop header shows a single account affordance (no redundancy).
- Brand stays centered without overlapping menu/cart/account controls.
- Typecheck passes.

Risks:
- Low; layout change is localized to `PublicHeader` and should preserve existing structure/behavior.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Switched header layout to a 3-column grid and removed absolute centering.
- Hid the account icon at `md+` to avoid redundancy.

Files touched:
- `src/ui/components/PublicHeader.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 9)
- Code refs:
  - `src/ui/components/PublicHeader.tsx` (grid layout + desktop account redundancy removal)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: The public header no longer shows redundant desktop account controls and the centered brand no longer relies on overlap-prone absolute positioning.
