# Shopify → Supabase ingest (read-only, staging-first)

Objective: mirror product copy/media from Shopify into Supabase so admins can edit and publish from our UI. No writes back to Shopify.

Flow outline:
1) Inputs: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_TOKEN` (or Admin read token for richer fields).
2) Fetch products:
   - Use Storefront API to get handle, title, description, images (src, alt), tags, price.
   - Optional: Admin API for metafields if needed.
3) Transform:
   - Map handle → `products.handle`
   - Title/description → `title`, `short_desc`/`long_desc`
   - Price → `price`
   - Images → queue for download/convert to WebP; create `product_media` rows with alt + sort.
4) Store:
   - Upsert products into Supabase `products` by handle.
   - Upsert media rows per product; upload converted WebP into `product-media` bucket with deterministic paths `products/{handle}/{sort}-{hash}.webp`.
5) Status defaults: imported as `draft`; admins can publish after review.
6) Idempotency: run with upsert; keep a sync marker (last sync time) in `globals` or a dedicated table.
7) Limits (Free plan): respect rate limits; parallelism low; clean up orphaned files if replaced.

Not doing:
- No write-back to Shopify.
- No inventory/price updates; price is copied only for display text unless later aligned.
