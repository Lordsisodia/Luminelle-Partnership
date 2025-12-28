# Issue 144: Admin Products “Save” can report success even when nothing was persisted (especially in “config fallback” mode)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `144`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `5`
- Reach (1–5): `2`
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

The admin product editor could show a “Saved” state even when no CMS row was actually updated (especially when products are loaded from the in-repo `productConfigs` fallback).

Audit (issue 144): `docs/reviews/app-ui-review-2025-12-26.md` — “Admin Products “Save” can report success even when nothing was persisted (especially in “config fallback” mode)”.

Likely file:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- `loadProducts` falls back to synthesizing products from `productConfigs` when Supabase returns no `cms_products` rows. In that mode, the product `id` becomes the handle (not a DB id).
- `handleSave` updated by `.eq('id', product.id)` without validating that any rows were affected, so “success with 0 updated rows” could be treated as a save and update local snapshots.

Repro (before fix, in a fresh env):
1. Ensure Supabase is configured but `cms_products` has no rows.
2. Open `/admin/products/:handle` (editor is populated from config fallback).
3. Change any field and click “Save changes”.
4. UI could show “Saved” even though nothing was persisted (no CMS row existed to update).

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- “False save success” is catastrophic for admin trust; editors will waste time and publish incorrect assumptions.
- We can fix the UX truthiness without requiring any product decision.

## Step 4 — Options
- [x] Option A: Disable save in config-fallback mode and show a clear banner explaining why.
- [x] Option B: Keep save enabled but validate affected rows and show an explicit error if nothing was updated.
- [ ] Option C: Implement “upsert/create-by-handle” flow for fresh envs (bigger change, needs schema confidence).
- [x] Pick one + rationale (fit with domain architecture).

Picked **A + B**:
- A prevents users from thinking they can persist changes when there is no CMS backing row.
- B hardens the save path even in normal mode (handles “0 rows affected” cleanly instead of silently succeeding).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Detect config-fallback products (`product.id === product.handle`) and:
  - show a banner explaining that the editor is read-only until `cms_products` is seeded, and
  - disable “Save changes”.
- Update the Supabase update call to request a row count / returning row, and error if `0` rows were affected.

Acceptance criteria:
- In fallback mode, the UI clearly indicates it is read-only and does not allow saving.
- In normal mode, “Save changes” only reports success when Supabase reports an affected row.
- `npm run typecheck` passes.

Risks:
- Very low; the change tightens success conditions and improves correctness.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Added config-fallback detection and made the editor explicitly read-only in that mode.
- Hardened the save mutation to validate that at least 1 row was actually updated.

Files touched:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`

Validation:
- Run `npm run typecheck`.

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 144)
- Code refs:
  - `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (`loadProducts` fallback + `handleSave` affected-row validation)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Save no longer “lies” in config-fallback mode, and the normal save path now errors if Supabase reports 0 affected rows.
