# Staging rollout checklist (admin UI)

## Before touching code
- [ ] Confirm staging Supabase project ref and keys.
- [ ] Confirm admin user(s) exist with app_metadata.roles = ['admin'].

## DB/schema
- [x] Apply `sql-migration-draft-v2.sql` (cms_*) to staging DB.
- [x] Verify tables/enums/indexes created.
- [x] RLS enabled; admin read/write works.

## Storage
- [x] Create buckets: `public-media`, `product-media`, `blog-media`, `draft-media`.
- [ ] Set cacheControl per upload (31536000 for public/product/blog; 60 for draft) in uploader.
- [x] Add storage policies: public buckets readable; draft bucket admin-only.
- [ ] Upload seed media to expected paths (see media-upload-checklist/media-placeholders.b64).

## Edge Functions (staging)
- [x] Deploy `preview-content`, `publish-content`, `rollback-content`.
- [x] Protect with admin role check; short TTL for draft media URLs.

## App config (flagged)
- [ ] Copy `.env.admin.example` → `.env.admin` with staging keys.
- [ ] Set `VITE_ENABLE_ADMIN_UI=true` locally for dev; keep false in prod env.
- [ ] Add staged Supabase admin client instance (not yet in prod build).

## Data seeding
- [x] Seed pages/sections/blogs/globals with minimal fixtures.
- [ ] Run Shopify → Supabase ingest for sample set; import copy/media as draft.

## QA in staging
- [ ] CRUD flows: pages, sections reorder, products, blogs, globals.
- [ ] Media upload: WebP conversion, alt/focal required, size/dim checks.
- [ ] Preview flow: draft fetch via Edge Function; signed URLs work.
- [ ] Publish flow: status flip, version snapshot, cache-bust.
- [ ] Rollback: restore prior version; verify content/media refs.
- [ ] Activity log entries recorded.

## Readiness to promote
- [ ] All tests pass (integration/E2E).
- [ ] Storage usage within limits; egress acceptable.
- [ ] Training notes ready.
- [ ] Sign-off from stakeholders.
