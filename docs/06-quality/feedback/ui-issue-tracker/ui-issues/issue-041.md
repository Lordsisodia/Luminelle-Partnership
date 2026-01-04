# Issue 041: Hamburger “menu” can reopen as the Cart tab (tab state leaks between opens)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `41`
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

The hamburger “Menu” action could reopen the drawer on the Cart tab, because the drawer’s active tab state leaked between opens.

Audit (issue 41): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Hamburger menu can reopen as the Cart tab”.

Likely file:
- `src/ui/providers/DrawerProvider.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `openMenu()` did not set `activeTab='menu'`; it only opened the drawer, so it could reopen using the last active tab.

Repro (before fix):
1. Open the drawer and switch to the Cart tab.
2. Close the drawer.
3. Click the hamburger/menu button again.
4. Drawer can reopen on Cart (unexpected; user asked for Menu).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is a high-frequency interaction; the drawer opening “in the wrong mode” reads like a bug.
- No product decision needed.

## Step 4 — Options
- [x] Option A: Ensure `openMenu()` always sets `activeTab='menu'` before opening.
- [ ] Option B: Reset `activeTab` to `'menu'` on every close (less explicit).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: explicit and matches user intent (“hamburger = menu”).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Update the drawer context API so `openMenu()` sets `activeTab` to `'menu'` before opening.

Acceptance criteria:
- Switching to cart, closing, then reopening via hamburger always opens on the Menu tab.
- Typecheck passes.

Risks:
- None; only affects default tab selection when opening.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Updated `openMenu()` to reset the active tab to Menu on open.

File touched:
- `src/ui/providers/DrawerProvider.tsx`

Validation:
- `npm run typecheck` ✅

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 41)
- Code refs:
  - `src/ui/providers/DrawerProvider.tsx` (`openMenu()` now sets `activeTab='menu'`)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Hamburger/menu always opens the Menu tab, preventing state leakage from prior Cart tab usage.
