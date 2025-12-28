# Issue 162: Product gallery asset filenames include spaces and inconsistent casing (fragile URLs + CDN friction)

Source audit: `docs/reviews/app-ui-review-2025-12-26.md` — issue `162`
Tracker: `docs/feedback/black-box/ui-issue-tracker.md`

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

Some product gallery assets use URL-fragile filenames (spaces + inconsistent casing), which makes them brittle across CDNs/build pipelines and easy to break via encoding/copy/paste.

Audit (issue 162): `docs/reviews/app-ui-review-2025-12-26.md` — “Product gallery asset filenames include spaces and inconsistent casing (fragile URLs + CDN friction)”.

Likely files/components:
- Asset files: `public/uploads/luminele/*`
- References:
  - `src/domains/client/shop/products/data/product-config.ts` (`CAP_GALLERY`)
  - `src/domains/admin/media/ui/pages/MediaPage.tsx` (demo/seed media list)
  - `server/migrations/2025-12-16_cms_products_seed_from_product_config.sql` (seed media paths)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
- [x] Write repro steps (route + actions).
- [x] Mark `Verified: YES/NO` and set status accordingly.

Verified: **YES**

Evidence (before fix):
- Filenames in `public/uploads/luminele/` included:
  - `main (1).webp`
  - `2ND PHOTO.webp` … `8TH PHOTO.webp`
- These were referenced directly in `CAP_GALLERY` and in the CMS seed migration.

Repro (before fix):
1. Open the shower cap PDP (`/product/lumelle-shower-cap`) and inspect image URLs.
2. Observe URLs containing spaces/caps; these are sensitive to encoding differences and can break when routed through a CDN or copy/pasted into tools.

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
- [x] Note dependencies (data, product decision, auth, etc.).

Decision: **FIX**

Notes:
- This is mostly “polish / reliability”, but it affects a conversion-critical surface (product imagery).
- No product decision required.
- Minor dependency: if Supabase `cms_product_media` already contains old paths, those need updating/reseeding.

## Step 4 — Options
- [x] Option A: Rename assets to URL-safe lowercase filenames and update references everywhere.
- [ ] Option B: Keep filenames but enforce consistent URL encoding at every call site (still fragile long-term).
- [ ] Option C: Add compatibility copies/redirects for old filenames (extra storage/ops).
- [x] Pick one + rationale (fit with domain architecture).

Picked **Option A**: simplest long-term fix that removes the root cause rather than papering over it.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
- [x] Write acceptance criteria (testable).
- [x] Risks/rollback notes.

Implementation:
- Rename shower cap gallery assets in `public/uploads/luminele/` to `shower-cap-01.webp` … `shower-cap-08.webp`.
- Update `CAP_GALLERY` to use new paths.
- Update admin media seed/demo list to match.
- Update CMS seed SQL migration to insert new paths.

Acceptance criteria:
- No remaining references to the old filenames in app code / migrations.
- Shower cap PDP gallery renders images using the new URL-safe names.
- `npm run typecheck` passes.

Risks / rollback:
- If any deployed environment or DB already references the old filenames, those URLs will 404 until the DB rows are updated (or compatibility files are added). Rollback would be restoring the old filenames or adding duplicate files for the old paths.

## Step 6 — Execute + Validate
- [x] Implement changes.
- [x] Validate (tests or best-effort manual checks).
- [x] Record results and any regressions found.

Changes:
- Renamed gallery assets:
  - `main (1).webp` → `shower-cap-01.webp`
  - `2ND PHOTO.webp` … `8TH PHOTO.webp` → `shower-cap-02.webp` … `shower-cap-08.webp`
- Updated references in:
  - `product-config.ts`
  - `MediaPage.tsx`
  - CMS seed migration SQL

Files touched:
- `public/uploads/luminele/*` (renames)
- `src/domains/client/shop/products/data/product-config.ts`
- `src/domains/admin/media/ui/pages/MediaPage.tsx`
- `server/migrations/2025-12-16_cms_products_seed_from_product_config.sql`

Validation:
- Run `npm run typecheck`.
- Best-effort manual QA:
  - Visit `/product/lumelle-shower-cap` and confirm gallery images load (no 404s).

## Step 7 — Record + Close
- [x] Update `docs/feedback/black-box/ui-issue-tracker.md` (status + priority if changed).
- [x] Summarize what changed + where.
- [x] Mark DONE/DEFERRED/etc.

---

## Evidence / Links

- Audit: `docs/reviews/app-ui-review-2025-12-26.md` (issue 162)
- Code refs:
  - `src/domains/client/shop/products/data/product-config.ts` (`CAP_GALLERY`)
  - `public/uploads/luminele/shower-cap-01.webp` etc
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes: Shower cap gallery assets now use URL-safe lowercase filenames, and all code/migration references were updated accordingly.
