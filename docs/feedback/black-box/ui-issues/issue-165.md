# Issue 165: Curler config defines two public handles (`satin-overnight-curler` vs `satin-overnight-curler-set`) and admin hides one (URL/SEO duplication + ops confusion)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `165`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Admin`
- Impact (1–5): `2`
- Reach (1–5): `5`
- Effort (1–5): `3`
- Confidence (1–3): `3`
- Priority: `27` ((2×5×3)−3)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
- [x] Link to the audit issue and copy the key claim.
- [x] Identify likely files/components.

Restatement: The curler product was represented by two “public” handles (`satin-overnight-curler` and `satin-overnight-curler-set`) and the admin UI hid one, creating duplicated URL/SEO signals and operational confusion.

Audit claim (issue 165): `productConfigs` includes both handles and admin filters out `satin-overnight-curler-set`, creating an inconsistent mapping between storefront route params and admin management.

Likely sources:
- `src/domains/client/shop/products/data/product-config.ts` (duplicate handle entries)
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (canonical routing)
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (admin listing/editor selection)
- `src/domains/admin/catalog/data/useProducts.ts` (admin product loader)
- `server/migrations/2025-12-16_cms_products_seed_from_product_config.sql` (seeding duplicate rows)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES` and set status accordingly.

Evidence (before fix):
- Duplicate config entries:
  - `src/domains/client/shop/products/data/product-config.ts` had both `satin-overnight-curler` and `satin-overnight-curler-set` as config entries.
- Admin hid one handle:
  - `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` filtered products with a hard-coded denylist `ADMIN_HIDDEN_HANDLES`.
  - `src/domains/admin/catalog/data/useProducts.ts` had the same denylist.
- Supabase seed created duplicate rows:
  - `server/migrations/2025-12-16_cms_products_seed_from_product_config.sql` inserted both `satin-overnight-curler` and `satin-overnight-curler-set` into `cms_products`.

Repro steps (pre-fix):
1. Open `/admin/products` → only one of the curler handles appears (the other is silently hidden).
2. Navigate to `/product/satin-overnight-curler-set` and `/product/satin-overnight-curler` → two URLs exist for “the same” product content unless canonical routing is enforced.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX`.
- [x] Note dependencies (data, product decision, auth, etc.).

Scoring:
- Impact: 2 (ops confusion + SEO duplication risk, not a hard “can’t sell” failure)
- Reach: 5 (touches canonical storefront URLs and the primary admin product surface)
- Effort: 3 (small refactor across config + admin list + seed)
- Confidence: 3 (verified in code + seed)
- Priority: 27

Dependencies:
- None on product/design; this is a consistency / canonicalization change.

## Step 4 — Options
- [x] Option A: keep both handles + keep hiding one (status quo).
- [x] Option B: show both in admin (duplicate cards, confusing).
- [x] Option C: canonical-handle strategy with aliases.
- [x] Pick one + rationale (fit with domain architecture).

Selected: Option C — canonical-handle strategy.

Why:
- Keeps a single “public handle” as the source of truth.
- Retains backwards compatibility for old links via alias redirects.
- Removes the need for hard-coded admin “denylist” hiding (which is brittle and silent).

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Introduce a shared alias mapping (`satin-overnight-curler-set` → `satin-overnight-curler`).
- Remove `satin-overnight-curler-set` as a separate `productConfigs` entry (stop treating it as “public”).
- Update client PDP routing to use the shared alias mapping for canonical redirects.
- Update admin product listing to canonicalize handles (dedupe alias rows) rather than hiding them.
- Update Supabase seed migration to stop inserting a duplicate `cms_products` row for the alias handle.

Acceptance criteria:
- `/product/satin-overnight-curler-set` redirects to `/product/satin-overnight-curler`.
- Admin `/admin/products` shows a single Curler entry (canonical handle).
- If a legacy alias row exists in Supabase, admin still loads the Curler product via canonicalization (no “silent hiding”).
- `npm run typecheck` passes.

Risks:
- If production data has divergent content between canonical + alias rows, dedup will prefer the canonical-handle row. (Seed migration no longer creates duplicates; existing duplicates should be cleaned up deliberately if needed.)

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Code changes:
- `src/domains/client/shop/products/data/product-handle-aliases.ts` (new alias mapping + canonicalize helper)
- `src/domains/client/shop/products/data/product-config.ts` (remove duplicate alias config entry)
- `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx` (use shared alias mapping for redirects)
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx` (canonicalize + dedupe alias rows, remove denylist)
- `src/domains/admin/catalog/ui/cards/ProductCard.tsx` (surface alias handle for clarity)
- `src/domains/admin/catalog/data/useProducts.ts` (keep in sync for future usage)
- `server/migrations/2025-12-16_cms_products_seed_from_product_config.sql` (stop seeding alias product row)

Validation:
- `npm run typecheck` (recorded in the tracker update for this issue).

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE.

---

## Evidence / Links

- Code refs:
  - Alias mapping: `src/domains/client/shop/products/data/product-handle-aliases.ts`
  - Canonical redirect: `src/domains/client/shop/products/ui/pages/ProductPage/index.tsx`
  - Admin canonicalization: `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`
  - Seed cleanup: `server/migrations/2025-12-16_cms_products_seed_from_product_config.sql`
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Canonical handle strategy implemented; alias handles are treated as redirects/metadata, not separate products, and admin no longer silently hides products via a denylist.
