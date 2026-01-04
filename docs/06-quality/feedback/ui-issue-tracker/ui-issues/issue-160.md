# Issue 160: Admin Products list can’t reliably open the editor (selection is cleared unless URL includes `/admin/products/:handle`)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `160`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `5`
- Reach (1–5): `2`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `17`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The admin products page used the URL as the source of truth for selection, but list-view product clicks (per the audit) did not navigate to `/admin/products/:handle`. That would cause selection to get cleared immediately, making the editor feel broken.

Audit (issue 160): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Admin Products list can’t reliably open the editor (selection is cleared unless URL includes `/admin/products/:handle`)”.

Likely file:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **NO** (no longer reproducible in current code)

Repro (current):
1. Visit `/admin/products`.
2. Click a product card.
3. Expected: navigates to `/admin/products/:handle` and opens the editor.

Evidence (current code):
- List view `ProductCard` open action navigates to `/admin/products/:handle` instead of mutating `selectedId` locally, so the selection is aligned with the URL source-of-truth behavior.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **CLOSE (already addressed)** ✅

Notes:
- This would be a high-impact admin workflow break if present, but the current code path uses navigation and should not hit the “selection clears instantly” behavior described in the audit.
- No dependencies or product decisions required.

## Step 4 — Options
- [x] Option A: (describe)
- [x] Option B: (describe)
- [x] Pick one + rationale (fit with domain architecture).

Option A (preferred): On card click, navigate to `/admin/products/:handle` (URL drives selection).
- Pros: deep links work, back/forward works, selection state is consistent.
- Cons: requires route navigation for editor state.

Option B: Let local `selectedId` drive selection and remove the “URL as source of truth” clearing behavior.
- Pros: could keep selection on list route.
- Cons: worse shareability/history; more state synchronization edge cases.

Picked: **Option A**, which is already implemented.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan (already implemented):
- Ensure list view product clicks navigate to `/admin/products/:handle`.
- Keep the selection state derived from the route param.

Acceptance criteria:
- Clicking a product in the list reliably opens the editor (no “flash then close”).
- URL reflects selected product and supports copy/paste deep links.

Risks:
- Very low; the approach aligns state with routing instead of fighting it.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Execution:
- No code changes required in this run; the fix described above is already present in `ProductsPage.tsx`.

Validation:
- Static verification in code: list-view `onOpen` uses `navigate(...)` and does not call `setSelectedId(...)`.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit claim (2025-12-26): list view called `setSelectedId(p.id)` without navigating, so selection would be cleared by the URL-as-source-of-truth effect.
- Code refs:
  - `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`: list view now navigates on open:
    - `onOpen={() => navigate('/admin/products/:handle?...')}` (no `setSelectedId` on click)
  - `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`: selection is derived from the route param in the `routeHandle` effect.
- Screenshots:
- Logs/traces:

## Outcome

- Verified: **NO** (no longer reproducible in current code)
- Final status: `DONE`
- Final notes:
  - The issue described in the audit was valid at the time, but has since been addressed by switching product-card open behavior to route navigation (`/admin/products/:handle`) instead of mutating `selectedId` locally.
