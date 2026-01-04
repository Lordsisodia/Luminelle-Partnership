# Products PDP → Supabase schema plan

Goal: move the storefront PDP (product detail page) and its config out of hard-coded TS (`ProductConfig`) and into Supabase so the admin `/admin/products` screen can edit it and changes can go live without redeploying.

Scope (today):
- Do **not** break the current PDP rendering.
- Store **all PDP data points** in Supabase in a shape that matches the existing UI components.
- Keep `cms_*` tables admin-only; use publish/preview flows to control what becomes public.

---

## Current sources of truth (code)

Storefront PDP:
- Route: `src/App.tsx`
- Page: `src/domains/products/ui/pages/ProductPage/index.tsx`
- Config: `src/domains/products/data/product-config.ts`
- Type: `src/domains/products/data/product-types.ts`

Admin Products (currently a mock editor, not wired to Supabase yet):
- `src/domains/admin/ui/pages/ProductsPage.tsx`

---

## Data inventory (PDP)

From `ProductConfig`:
- Identity
  - `handle`
  - `fallbackItemId`, `fallbackVariantId`
- Hero / pricing
  - `defaultTitle`, `defaultSubtitle`
  - `defaultPrice`, `compareAtPrice`
  - `discountPercentOverride`
  - `ratingValueOverride`, `ratingCountLabelOverride`
  - `badge`
- Media
  - `gallery[]` (images + optional `video://…` items)
  - `videoSlot`
- Sections
  - `essentials[]` (Details accordion)
  - `reasons[]` (Feature callouts items)
  - `how[]` (How-to steps)
  - `care[]` (Care cards)
  - `qa[]` (FAQ items)
  - `featureCallouts` (story layout heading + media)
  - `featuredTikTokHeading`
  - `careLabelOverride`, `hideDetailsAccordion`

---

## Supabase schema mapping (v1)

Use existing CMS tables:
- `public.cms_products` (1 row per product/PDP)
- `public.cms_product_media` (gallery media list)

### `cms_products` columns (top-level, queryable)
- `handle` (URL handle / canonical key)
- `title` → `ProductConfig.defaultTitle`
- `short_desc` → `ProductConfig.defaultSubtitle`
- `price` → `ProductConfig.defaultPrice`
- `compare_at_price` → `ProductConfig.compareAtPrice`
- `discount_percent_override` → `ProductConfig.discountPercentOverride`
- `average_rating` → `ProductConfig.ratingValueOverride`
- `review_count_label` → `ProductConfig.ratingCountLabelOverride`
- `badge` → `ProductConfig.badge`
- `video_slot` → `ProductConfig.videoSlot`
- `care_label_override` → `ProductConfig.careLabelOverride`
- `hide_details_accordion` → `ProductConfig.hideDetailsAccordion`
- `fallback_variant_id` → `ProductConfig.fallbackVariantId`
- `fallback_item_id` → `ProductConfig.fallbackItemId`
- `status`, `seo`, `updated_at`, etc (existing CMS workflow)

### `cms_products.specs` jsonb (nested sections)
Store PDP section content in `specs` to avoid exploding into 10+ tables:
```json
{
  "essentials": [{ "title": "...", "body": "...", "thumbSrc": "...?", "thumbAlt": "...?" }],
  "reasons": [{ "title": "...", "desc": "...", "image": "...?" }],
  "how": [{ "title": "...", "body": "..." }],
  "care": [{ "icon": "Shield|RefreshCcw|Feather|...", "title": "...", "body": "..." }],
  "featureCallouts": {
    "mediaSrc": "video://…|/path.webp|https://…",
    "mediaAlt": "...",
    "mediaLabel": "...",
    "mediaNote": "...",
    "heading": { "eyebrow": "...", "title": "...", "description": "...", "alignment": "left|center|right" }
  },
  "featuredTikTokHeading": { "eyebrow": "...?", "title": "...", "description": "...", "alignment": "left|center|right" }
}
```

### `cms_products.faq` jsonb (FAQ)
Store exactly what `FaqSectionShop` expects:
```json
[{ "q": "...", "a": "..." }]
```

### `cms_product_media` (gallery)
- One row per image (or video if we decide to store video as a media item later)
- `path` can be either a Supabase Storage path or a public path like `/uploads/...`
- Order by `sort`, and mark the primary with `is_primary = true`

---

## Rollout plan (no-break path)

1) Schema groundwork (safe)
   - Add the new scalar PDP columns to `cms_products` (migration).
2) Backfill current in-repo config → Supabase
   - Seed/UPSERT `cms_products` and `cms_product_media` from `product-config.ts` (migration or script).
3) Wire admin `/admin/products` to Supabase (draft mode)
   - Load list of `cms_products` rows; edit + save updates.
   - Edit nested arrays (specs + faq) in structured forms.
   - Manage gallery via `cms_product_media` reorder + alt editing.
4) Add publish + preview to products
   - Use existing `publish-content` / `preview-content` flows (admin-only).
5) Connect storefront to published product content
   - Option A (recommended): create a public Edge Function like `public-content?type=product&handle=...` that reads with service role and returns only published.
   - Option B: loosen RLS to allow `select` of `published` rows (less ideal).
   - Frontend fallback: if Supabase has no published row for a handle, fall back to the existing hard-coded config so PDP never breaks during rollout.
6) “Live updates”
   - Admin sees “preview” immediately (Edge Function uses draft row).
   - Public PDP updates when published (optionally invalidate cache via `cms_versions` version param).

