# Admin Content Self-Service – Status (as of Dec 11 2025)

## What’s done (staging)
- Schema: `cms_*` tables created with admin-only RLS (`cms_pages`, `cms_sections`, `cms_products`, `cms_product_media`, `cms_blogs`, `cms_blog_blocks`, `cms_globals`, `cms_versions`, `cms_audits`).
- Enums: `cms_content_status` (`draft`, `in_review`, `published`, `archived`).
- Buckets: `public-media`, `product-media`, `blog-media` (public read); `draft-media` (admin-only).
- Storage policies: public read on public/product/blog; admin read/write/update on draft; admin write/update on public/product/blog.
- Edge Functions deployed (staging): `preview-content`, `publish-content`, `rollback-content` against `cms_*`, admin-role protected.
- Seed data inserted (draft): home page + sections (hero/feature_grid/cta_footer); one product (`rose-serum`) with media entries; one blog (`winter-skin-guide`) with blocks; globals (nav/footer/promo/seo_default).
- Storage object records created for media paths (files pending).
- Plans/notes added: upload flow, section models, frontend plan, testing plan, rollout checklist, env example, placeholders b64, etc.

## Pending / blocked
- Upload seed media files (WebP placeholders) to paths:
  - product-media: `products/rose-serum/1.webp`, `products/rose-serum/2.webp`
  - blog-media: `blogs/winter/hero.webp`, `blogs/winter/inline1.webp`
  Requires staging Supabase URL/key to run the upload script.
- Set cacheControl per upload (31536000 for public/product/blog; 60 for draft) via uploader.
- Local app wiring: add flag `VITE_ENABLE_ADMIN_UI` (default false), admin Supabase client, and gated `/admin` route (not done yet).
- Shopify ingest (read-only) to bring real products into `cms_products` (optional).
- QA: preview/publish/rollback, media uploads, CRUD flows, activity logs.

## Files of note (all under `docs/future features/admin content self-service/`)
- `sql-migration-draft-v2.sql` — applied (cms_* schema).
- `staging-rollout-checklist.md` — updated with current completions.
- `media-placeholders.b64` & `media-upload-checklist.md` — placeholder assets and upload steps.
- `edge-function-*.ts` — deployed functions source.
- `upload-flow-notes.md`, `shopify-sync-notes.md`, `section-models.md`, `forms-and-schemas-notes.md`, `admin-frontend-plan.md`, `implementation-plan.md` — design/plan docs.
- `fixtures-sample.json` — sample seed content used.

## What I need to finish staging
- Staging Supabase URL + anon (or service) key to upload the placeholder WebPs.
- Approval to wire the admin flag into the app (route + client) with flag default false.
