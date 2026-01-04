# Issue 161: Admin Products list view shows a disabled “Save changes” button even when no product is selected

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `161`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `2`
- Reach (1–5): `2`
- Effort (1–5): `3`
- Confidence (1–3): `2`
- Priority: `5`
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

The admin products list view rendered a disabled “Save changes” control even when no product was selected, which is confusing and makes the page feel broken.

Audit (issue 161): `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — “Admin Products list view shows a disabled “Save changes” button even when no product is selected”.

Likely file:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Repro (before fix):
1. Visit `/admin/products`.
2. Observe the action row includes a “Save changes” button even though no product editor is open.
3. The button is disabled (because `product` is `null`), so it reads like a broken primary action.

Evidence:
- `ProductsPage.tsx` list view (`!hasSelection`) rendered a save button gated by `!product` even though list view has no selection/editor.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is small polish, but it’s on the most-used admin entry point.
- No product decision needed; low risk.

## Step 4 — Options
- [x] Option A: Hide the save button in list view (only show save controls inside the editor view).
- [ ] Option B: Keep the button but replace with an “explain disabled” tooltip/copy (more UI work, still noisy).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: simplest and matches typical admin UX (no “save” without an open editor).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Remove the “Save changes” button from the `!hasSelection` branch of `ProductsPage.tsx`.

Acceptance criteria:
- `/admin/products` list view no longer shows a disabled “Save changes” action.
- Editor view still shows save controls and keyboard shortcut remains unchanged.

Risks:
- None meaningful; it’s purely removing a misleading control.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Removed list-view save button so actions reflect the current context (search + reload only).

Files touched:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`

Validation:
- Best-effort: ensure save button still exists in editor view; run `npm run typecheck`.

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` (issue 161)
- Code refs:
  - `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (list view header actions)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed the misleading disabled save control from the products list view; save actions are now only shown when editing a product.
