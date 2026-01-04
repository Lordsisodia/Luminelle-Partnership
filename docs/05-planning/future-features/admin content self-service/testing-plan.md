# Testing plan (staging-first)

## Unit
- Zod schema validation for pages/sections/products/blogs/product_media/blog_blocks/globals.
- Helpers: slug generator, WebP conversion pipeline, focal point validator.
- URL builders: signed URL helper chooses draft vs public buckets correctly.

## Integration (staging)
- Supabase client CRUD: create/read/update/delete for each table under admin JWT.
- RLS: non-admin JWT denied; admin JWT allowed.
- Storage: upload WebP to draft-media (signed), upload to product-media/blog-media (public) with cacheControl.
- Edge Functions: preview returns draft data; publish updates status + version snapshot; rollback restores snapshot.
- Shopify ingest: upsert products; no errors; status draft; media upload placeholders.

## E2E (Playwright/Cypress, staging)
- Admin login with admin role.
- Pages: edit section text, reorder, save draft, preview, publish, rollback.
- Products: add media (WebP), alt/focal required, publish; verify in preview API.
- Blogs: create draft with YouTube embed, hero image; preview, publish.
- Media library: upload, replace, check references count.
- Globals: edit nav/promo, publish, verify preview shows update.

## Performance checks (manual/automated)
- Measure page load (admin shell) with flag on; ensure bundle remains excluded when flag off.
- Verify image sizes after client-side WebP conversion; confirm under 2500px and <25MB.

## Safeguards
- Feature flag tests: with flag false, /admin redirects and bundle not loaded.
- Env separation: admin client uses staging keys; prod keys not required to run admin locally unless intentional.

## Acceptance before prod
- All integration + E2E pass on staging.
- Storage usage within Free limits.
- Rollback demonstrated for page/product/blog.
- Audit entries recorded for publish/rollback.
