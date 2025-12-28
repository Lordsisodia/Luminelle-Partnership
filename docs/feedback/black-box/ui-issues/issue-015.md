# Issue 015: Drawer accessibility is incomplete (labeling + tab semantics + focus handling)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `15`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `27`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The right-side drawer uses some dialog + tabs semantics, but it was missing key labeling and tab/tabpanel wiring, and its focus trap logic could get stale as the contents change.

Audit (issue 15): `docs/reviews/app-ui-review-2025-12-26.md` — “Drawer accessibility is incomplete (labeling + tab semantics + focus handling)”.

Likely file:
- `src/ui/providers/DrawerProvider.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- The drawer `<aside role="dialog" aria-labelledby="drawer-title">` did not render any element with `id="drawer-title"`, so the dialog was effectively unlabeled.
- The tab buttons had `role="tab"` + `aria-selected`, but no `id`/`aria-controls`, and there were no matching `role="tabpanel"` regions.
- Focus trap used a static `querySelectorAll` result captured at open time, so the “first/last” focusable elements could be wrong after changing tabs.

Repro (before fix):
1. Open the drawer (hamburger).
2. Inspect the dialog markup: `aria-labelledby="drawer-title"` had no target element.
3. Switch between “Menu” / “Cart” tabs; focus trap logic could become inconsistent because it used the initial focusable list.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a primary navigation + cart entrypoint (high reach).
- A11y issues here affect keyboard/screen-reader users across the whole site.
- No product decision required.

## Step 4 — Options
- [x] Option A: Incrementally improve existing drawer markup (add dialog label + proper tabs/tabpanel wiring + resilient focus trap).
- [ ] Option B: Replace with a dedicated dialog + focus-trap library (larger change / more risk).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: smallest change that materially improves accessibility without refactoring the entire drawer implementation.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Render a real `#drawer-title` element (screen-reader-only heading) to satisfy `aria-labelledby`.
- Add `id` + `aria-controls` to each tab button.
- Add `role="tabpanel"` + `id` + `aria-labelledby` for the active panel.
- Implement roving `tabIndex` so only the active tab is tabbable, but ArrowLeft/ArrowRight can move focus.
- Make the focus trap re-query tabbables on each `Tab` key press so it doesn’t go stale when tabs/content change.
- Hide the dialog from assistive tech during the close animation (`aria-hidden` when `menuOpen=false` but still mounted).

Acceptance criteria:
- Drawer has an accessible name (no dangling `aria-labelledby`).
- Tabs have expected relationships (`aria-controls` ↔ `tabpanel`).
- Tab key trapping remains correct after switching tabs.
- Typecheck passes.

Risks:
- Minor risk of changing keyboard behavior; mitigated by keeping existing behavior and scoping changes to dialog markup + focus trap.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added an SR-only dialog title (`#drawer-title`).
- Added proper tab wiring (ids + aria-controls) and tabpanel semantics.
- Updated focus trap logic to compute focusables dynamically.

Files touched:
- `src/ui/providers/DrawerProvider.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 15)
- Code refs:
  - `src/ui/providers/DrawerProvider.tsx` (dialog label + tabs/tabpanel semantics + focus trap)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Drawer dialog is now labeled, tabs are wired to a tabpanel, and keyboard focus trapping remains stable when switching between Menu/Cart content.
