# Media upload checklist (staging)

Targets (matching seeded paths):
- public-media: none yet
- product-media:
  - products/rose-serum/1.webp
  - products/rose-serum/2.webp
- blog-media:
  - blogs/winter/hero.webp
  - blogs/winter/inline1.webp
- draft-media: none yet (for future drafts)

Steps:
1) Prepare WebP files (≤2500px, optimized ~75 quality).
2) Upload via Supabase Storage UI or CLI:
   ```bash
   supabase storage upload product-media/products/rose-serum/1.webp path/to/1.webp --bucket product-media
   supabase storage upload product-media/products/rose-serum/2.webp path/to/2.webp --bucket product-media
   supabase storage upload blog-media/blogs/winter/hero.webp path/to/hero.webp --bucket blog-media
   supabase storage upload blog-media/blogs/winter/inline1.webp path/to/inline1.webp --bucket blog-media
   ```
3) Verify public read works (GET the object URL).
4) Keep filenames immutable; replacements should use new filenames for cache-busting.

Notes:
- Draft assets should go to `draft-media` with signed URLs; keep cacheControl short (set on upload).
- Strip EXIF; ensure alt text already stored in DB rows.
