# Issue 095: Admin product-count badge likely never updates (sessionStorage + `storage` listener doesn’t fire in-tab)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `95`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `2`
- Reach (1–5): `2`
- Effort (1–5): `1`
- Confidence (1–3): `3`
- Priority: `11`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The admin sidebar “Catalog” product-count badge was persisted to `sessionStorage`, but the UI relied on the `storage` event to update it, which doesn’t fire for same-tab updates (and doesn’t help for `sessionStorage`).

Audit (issue 95): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Admin product-count badge likely never updates (sessionStorage + `storage` listener doesn’t fire in-tab)”.

Likely files:
- Reader: `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- Writer: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO (already fixed in current `dev`)**

Evidence (current state):
- `ProductsPage` writes `admin:productCount` and also dispatches an in-tab custom event `admin:productCountUpdated`.
- `AdminShell` listens for `admin:productCountUpdated` and re-reads the value from `sessionStorage`, so the badge updates in-tab without relying on `storage`.

Repro (expected behavior in current code):
1. Navigate to `/admin/products`.
2. Wait for the products list to load (count becomes known).
3. Observe the “Catalog” badge in the sidebar reflects the loaded count without requiring a full page reload.

Notes:
- The audit’s core diagnosis is correct (`storage` won’t solve this), but the code already implements the suggested fix (custom event) as of `2025-12-28`.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX (already fixed)**

Scoring:
- Impact: `2` (polish/trust within admin navigation)
- Reach: `2` (admin users only)
- Effort: `1` (localized event + state wiring)
- Confidence: `3` (code path is explicit; no architectural dependency)

## Step 4 — Options
- [x] Option A: Dispatch an in-tab custom event on write; `AdminShell` listens and re-reads from `sessionStorage`.
- [ ] Option B: Lift into a React store/context and set the count directly (more invasive).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: minimal blast radius and fits the current “AdminShell + page writes to storage” setup.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation (already present in `dev`):
- When the products list length changes, write `admin:productCount` into `sessionStorage`.
- Dispatch `admin:productCountUpdated` (same-tab) and listen for it in `AdminShell`.

Acceptance criteria:
- The Catalog badge updates in the same tab when the products list loads/changes.
- No reliance on `storage` for same-tab updates.

Risks:
- Low; this is a UI-side event wiring change.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Code that already implements the fix:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` dispatches `admin:productCountUpdated` after writing.
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx` listens to `admin:productCountUpdated` and re-reads the count.

Validation:
- Static verification in code (event is dispatched and subscribed; the handler updates state via `setProductCount`).

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 95)
- Code refs:
  - `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (`sessionStorage.setItem('admin:productCount', ...)` + `window.dispatchEvent(new Event('admin:productCountUpdated'))`)
  - `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (`window.addEventListener('admin:productCountUpdated', ...)`)
- Git blame: both sides of the fix are present as of `2025-12-28` (commit `e1c1c526e`).

## Outcome

- Final status: `DONE`
- Final notes: The badge updates in-tab via a custom event (`admin:productCountUpdated`) rather than relying on `storage`.
