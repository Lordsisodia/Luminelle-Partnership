# Upload flow notes (client-side, Supabase Free plan)

Constraints:
- Supabase Free: no built-in image transformations/CDN invalidate; limited Storage (500 MB).
- Goal: minimize size via client-side WebP; allow SVG only when source is vector.

Proposed flow (client):
1) Select file (accept: jpg/png/webp/svg). Reject >25MB or >2500px any side (for raster).
2) If SVG: accept as-is (check `image/svg+xml`); run basic lint (size, script tags disallowed).
3) If raster (jpeg/png):
   - Load into canvas.
   - If width/height >2500, downscale to max 2500 preserving aspect.
   - Convert to WebP quality 0.75 (configurable).
   - Generate blur placeholder (32x32 WebP q=0.5) and dominant color.
4) Collect required metadata: alt text (non-empty), focal point (x,y 0–1).
5) Upload to appropriate bucket/path with `cacheControl`:
   - draft-media: short (e.g., 60s) via signed URL.
   - public/product/blog: long (e.g., 31536000, immutable path names).
6) Store DB record with path, alt, focal, dimensions, placeholder data URL/dominant color if desired.

Path conventions:
- products: `products/{slug}/{timestamp}-{hash}.webp`
- blogs: `blogs/{slug}/{timestamp}-{hash}.webp`
- draft: `draft/{entity}/{uuid}.webp`

Cache-busting:
- Use immutable filenames (hash/timestamp) and long cacheControl for published; replace means new filename.

Security:
- Strip EXIF.
- Disallow SVGs with `<script>`/`on*` attributes; sanitize or reject.
