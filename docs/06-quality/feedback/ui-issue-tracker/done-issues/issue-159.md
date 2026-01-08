# Issue 159: Admin Products silently hides `satin-overnight-curler-set` via `ADMIN_HIDDEN_HANDLES` (product can’t be managed)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `159`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `2`
- Reach (1–5): `2`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `9` ((2×2×3)−3)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: Admin Products hid a real product handle (`satin-overnight-curler-set`) with no explanation, so operators could not see/manage it.

Audit claim (issue 159): Admin filters out `satin-overnight-curler-set` using `ADMIN_HIDDEN_HANDLES`, with no in-UI explanation.

Likely sources:
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (product list filtering)
- `src/domains/admin/catalog/data/useProducts.ts` (product loader filtering)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES` and set status accordingly.

Evidence (before fix):
- `ProductsPage.tsx` and `useProducts.ts` both had `ADMIN_HIDDEN_HANDLES = new Set(['satin-overnight-curler-set'])` and filtered it out.

Repro steps (pre-fix):
1. Open `/admin/products`.
2. Observe that `satin-overnight-curler-set` is missing, even if it exists in Supabase/config.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: FIX (silent hiding is an admin trust killer).

Note: This issue is the “admin symptom” of the larger canonical-handle duplication described in issue `165`. Fixed as part of the same canonicalization work.

## Step 4 — Options
- [x] Option A: remove the hide list (shows duplicates if both handles exist).
- [x] Option B: show hidden section with “reason”.
- [x] Option C: canonical-handle strategy (dedupe aliases, no hide list).
- [x] Pick one + rationale (fit with domain architecture).

Selected: Option C — canonical-handle strategy (see issue `165` for full rationale).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Plan (implemented under issue `165`):
- Remove `ADMIN_HIDDEN_HANDLES`.
- Canonicalize/dedupe alias handles to a single canonical product in admin.
- Keep backwards compatibility for old URLs.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Implemented as part of issue `165` (see `docs/06-quality/feedback/ui-issue-tracker/done-issues/issue-165.md`).

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE.

---

## Evidence / Links

- Code refs:
  - Admin canonicalization: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`
  - Shared alias mapping: `src/domains/client/shop/products/data/product-handle-aliases.ts`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Removed silent hiding by implementing canonical handle + alias dedupe (tracked primarily under issue `165`).
