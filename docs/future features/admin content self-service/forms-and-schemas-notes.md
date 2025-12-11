# Forms & schemas (RHF + Zod plan)

Libraries: react-hook-form, @hookform/resolvers, zod

Common patterns:
- `FormProvider` with per-page schemas.
- Schema to match Supabase columns; coercions for numbers/arrays.
- Slug helper to auto-generate from title with manual override.

Zod schemas (draft):
```ts
const statusEnum = z.enum(["draft", "in_review", "published", "archived"]);

export const pageSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  status: statusEnum.default("draft"),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
});

export const sectionSchema = z.object({
  kind: z.string().min(2),
  data: z.record(z.any()), // typed per-kind later
  visible: z.boolean().default(true),
});

export const productSchema = z.object({
  handle: z.string().min(2),
  title: z.string().min(2),
  short_desc: z.string().optional(),
  long_desc: z.string().optional(),
  badges: z.array(z.string()).optional(),
  specs: z.record(z.any()).optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  price: z.coerce.number().optional(),
  status: statusEnum.default("draft"),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
});

export const productMediaSchema = z.object({
  path: z.string(),
  alt: z.string().min(1),
  focal: z.object({ x: z.number(), y: z.number() }).optional(),
  sort: z.number().int().nonnegative(),
  is_primary: z.boolean().default(false),
});

export const blogSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  summary: z.string().optional(),
  status: statusEnum.default("draft"),
  hero_media_path: z.string().optional(),
  tags: z.array(z.string()).optional(),
  canonical_url: z.string().url().optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
  publish_at: z.string().optional(),
});

export const blogBlockSchema = z.object({
  type: z.enum(["paragraph", "heading", "list", "quote", "image", "youtube"]),
  sort: z.number().int().nonnegative(),
  data: z.record(z.any()),
});

export const globalsSchema = z.object({
  key: z.string(),
  data: z.record(z.any()),
});
```

Form UX notes:
- Require alt text and focal point for images.
- Inline validation errors; disable submit while saving.
- Slug helper with “lock” toggle.
- Status select limited to draft/published for now (no approval).
- Publish button triggers Edge Function; form save remains draft by default.
