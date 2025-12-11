# Fixtures & seeding plan (staging)

Purpose: populate staging with minimal data to exercise admin UI without touching prod.

Seed set:
- Pages: `home`, `about`, `pricing`
  - Sections per page: hero (title, subtitle, image), features grid, CTA footer.
- Products: 2–3 sample products pulled from Shopify (read-only) or mocked:
  - Fields: handle, title, short_desc, long_desc, price, badges.
  - Media: 2–3 images each (converted to WebP) with alt/focal, sorted.
- Blogs: 2 sample posts (draft + published) with hero image and 3–5 blocks (paragraph, heading, list, image, YouTube embed).
- Globals: nav links, footer links, promo bar, default SEO.

Process:
1) Run SQL migration on staging.
2) Upload sample images to `product-media`, `blog-media`, `public-media`; use deterministic paths.
3) Insert seed rows via Supabase SQL or script; keep status=draft except one published example per type.
4) Record slugs/IDs in a fixtures JSON for frontend tests.

Paths:
- products: `products/sample-{n}/{sort}.webp`
- blogs: `blogs/sample-{n}/hero.webp`
- pages: `pages/home/hero.webp`

Notes:
- Keep payload tiny to respect 500MB cap.
- Include alt text and focal for all images.
- One published item per collection to test live rendering; rest stay draft.
