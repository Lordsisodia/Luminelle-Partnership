# Media placeholders plan

Objective: upload small placeholder WebP files to required paths to unblock staging tests without large assets.

Files to create/upload:
- `product-media/products/rose-serum/1.webp` (300x300 placeholder)
- `product-media/products/rose-serum/2.webp` (300x300 placeholder)
- `blog-media/blogs/winter/hero.webp` (600x360 placeholder)
- `blog-media/blogs/winter/inline1.webp` (400x240 placeholder)

Method options:
1) Generate via node-canvas or sharp locally, then `supabase storage upload ... --content-type image/webp --upsert --cache-control 31536000`.
2) Use tiny base64 WebP placeholders and upload via CLI with `--file -` piped from echo.

CacheControl:
- public/product/blog buckets: `31536000`
- draft-media: `60` (not used here)

Alt text is already in DB rows; focal points in DB where relevant.

If you want, I can generate minimal WebPs and upload them now.***
