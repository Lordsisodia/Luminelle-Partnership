# Admin Content Self-Service — Research Notes
Date: Dec 11 2025  
Storage stack: Supabase Storage (fixed).

## Editable surface map
- Pages: hero banners, section headers, CTAs, nav/footer links, promo bars, FAQs, announcement bars, footers, legal copy.
- Components: card titles/subtitles, feature bullets, testimonial quotes/names/avatars, form labels/placeholders, button text.
- Layout params likely exposed: ordering of sections, show/hide toggles, background image/color.

## Product copy fields
- Core: title, short description, long description, bullet list, specs, materials, sizing, care, pricing blurb, SKU, badges (new/sale/limited), FAQs, related product slots.
- SEO: meta title/description, slug, OG title/description/image.
- Localizable fields should be stored separately or with locale suffix.

## Media inventory
- Hero/background images, product galleries (multi-image with order + alt), blog hero and inline embeds, author avatars, brand logos/icons, partner logos, UI illustration sets.
- Media metadata: alt text (required), focal point (x/y), crop preset, dominant color (for blur placeholder).

## Content models on Supabase
- Tables: `pages` (slug, status, seo), `sections` (page_id, type, order, data jsonb), `products` (copy fields), `product_media` (order, alt, focal), `blogs` (title, slug, status, seo, author_id, hero_media_id), `blog_blocks` (type, data), `globals` (nav, footer, promo).
- Keep schema-as-code migrations; generate TypeScript types for frontend to enforce shape.
- Store media references as Storage paths + signed/public URLs.

## Rich text strategy
- Prefer structured blocks (e.g., array of block objects) to avoid unsafe HTML; allow headings, paragraphs, lists, links, quotes, inline images.
- Use a sanitizer on read (DOMPurify on frontend or server) even with structured input to guard against pasted HTML.

## Image pipeline (Supabase Storage)
- Use buckets per domain (e.g., `public-media`, `product-media`, `blog-media`); set `cacheControl` at upload.
- Use image transformations (`width/height/resize/quality/format`) via `getPublicUrl` or `createSignedUrl` to serve responsive variants; automatic WebP negotiation is included.
- Limits: max dimension 2500px, size 25MB, 50MP resolution; supported formats include png/jpg/webp/avif/gif/svg.
- For private buckets, serve via signed URLs with transform embedded in token (immutable).

## CDN & caching
- Supabase CDN caches all assets; Smart CDN (Pro+) auto revalidates when object updates/deletes and shields against query-string misses.
- Control browser TTL via `cacheControl` when uploading; default ~1h—shorten for frequently updated assets; for safe cache-busting, change path/version query.

## Draft/preview flow
- Add `status` and `published_at` fields on content tables; use preview token (JWT) granting select on draft rows and Storage paths.
- Frontend uses preview query param to fetch drafts from RPC/Edge Function; ensure draft data bypasses CDN cache or uses distinct path.

## Publishing workflow
- States: draft → in_review → published → archived; optional scheduled publish_at.
- Require approval for publish (role-based); maintain `version` table for rollback; write changelog/audit rows (user, timestamp, diff summary).

## Roles & permissions
- Roles: admin (all), editor (content), contributor (draft only), media-manager (upload/replace media).
- Enforce via RLS on tables and Storage: policies check `auth.uid()` and role claim in JWT; private buckets for unpublished assets; public buckets for published assets only if permitted.

## Validation rules
- Required alt text on every image; length limits on titles/subtitles; URL validation for links; color contrast check for banner text vs background; max hero copy length to protect layout.

## Localization/variants
- Decide per-locale records vs JSON translations; ensure fallback chain (e.g., en → default).
- Allow per-locale media override paths; keep locale in unique index `(slug, locale)`.

## Blog authoring
- Fields: title, slug, summary, body blocks, hero image, tags/categories, canonical URL, reading time, OG meta, published_at.
- Embeds allow whitelisted providers only; sanitize if HTML is allowed.

## Product media governance
- Replacement flow: upload new object, update reference, mark old as `orphaned_at`; scheduled cleanup job deletes after grace period.
- Keep deterministic file paths (e.g., `products/{slug}/{hash}.jpg`) for cache friendliness.

## Migration plan
- Audit existing hardcoded copy/images; export to CSV/JSON; bulk insert via SQL or scripts; upload media to Storage maintaining stable slugs/paths; backfill slugs/IDs used by frontend.

## Developer ergonomics
- Migrations + seed fixtures in repo; types generated from SQL (supabase gen types); local preview data; lint that forbids missing alt/seo fields; storybook-style fixtures fed by mock data.

## Frontend fallbacks
- For missing content: show skeletons/placeholders; guard against undefined sections; default copy for CTAs; 404 for missing slug with soft redirect.

## Performance guardrails
- Enforce upload limits and recommended dimensions; transform with quality 70–80; use blurred placeholder via small transform; monitor LCP/CLS after swaps.

## Security
- RLS on all content tables; Storage policies limiting bucket access; signed URLs for private assets; rate limit uploads; sanitize rich text; audit log of writes; backups and PITR enabled.

## Success metrics & SLA
- Author time: draft → publish in <10 minutes.  
- Propagation: cache flush/Smart CDN invalidation within ~60s; frontend revalidate <5 minutes.  
- Rollback: restore previous version in <2 minutes.  
- Observability: log who changed what and when; alerts on failed uploads or policy denials.

## Immediate next steps (execution)
- Design DB schema in SQL (pages, sections, products, product_media, blogs, blog_blocks, globals) and commit migration.
- Define RLS policies and roles (admin/editor/contributor/media-manager) plus JWT claim shape; create sample policies for public vs draft buckets.
- Stand up buckets: `public-media`, `product-media`, `blog-media`; set cacheControl defaults; test signed URL + transform.
- Prototype preview flow: Edge Function or RPC that returns draft content and draft media URLs with short-lived signatures.
- Create content authoring UX wireframe: section list with drag order, inline alt-text validation, image focal point picker.
- Build frontend fetch layer: typed clients + SWR strategy with revalidation hook; handle published vs preview modes.
- Instrument performance guardrails: image dimension/quality checks pre-upload; blurred placeholder generation; monitor LCP/CLS after swaps.
- Write migration script to extract existing hardcoded copy/media into Supabase tables and storage paths; dry run on staging.

## Short-term work plan (sequenced)
Week 1:
- Draft SQL schema + migrations; generate TS types and validate in app.
- Create buckets and upload test assets; verify transforms (resize/quality/webp) and cacheControl behaviors.
- Implement baseline RLS policies for content tables and storage (public vs private buckets).
- Spike preview endpoint (Edge Function) returning draft content + signed media.

Week 2:
- Build authoring UI wireframe/prototype (section ordering, alt-text required, focal-point picker).
- Integrate typed fetch layer (published vs preview) with caching/revalidation.
- Add upload guardrails (dimension/size checks) and blurred placeholder generation pipeline.
- Begin migration of existing copy/media into staging Supabase; reconcile slugs/IDs.

Week 3:
- Add versioning/audit log tables and UI surfacing change history.
- Implement scheduling/publish_at and basic approval flow (editor -> admin).
- Load/perf tests for image delivery and content fetch; measure LCP/CLS deltas.
- Author training doc + quickstart for updating content.

## Decision log & open items
- Storage: Supabase Storage fixed. ✅
- CMS approach: pending (hosted headless vs self-hosted vs bespoke on Supabase). Need cost/complexity comparison and alignment with client IT.
- Localization: pending requirement; impacts schema (per-locale rows) and authoring UI.
- Scheduling: desired? if yes, need timezone policy and background job to publish at boundary.
- Embeds: whitelist set (e.g., YouTube/Vimeo/Figma?); clarify before enabling rich embeds.
- Access model: confirm SSO vs Supabase Auth accounts; needed for roles/RLS claims.
- Smart CDN availability: depends on plan (Pro+); confirm client tier.

## Risks & mitigations
- Risk: Authors upload huge images → egress/perf hit. Mitigation: enforce max dimensions server-side; auto-transform and recompress; warn on upload.
- Risk: Draft leakage from private buckets. Mitigation: strict RLS + signed URLs with short TTL; separate draft bucket.
- Risk: Cache staleness after publish. Mitigation: Smart CDN + versioned paths or cache-busting query; short cacheControl on frequently updated assets.
- Risk: Schema drift vs frontend types. Mitigation: schema-as-code + generated types; CI to fail on drift.
- Risk: Migration mismatch (slugs/IDs). Mitigation: dry-run migration; keep slug/ID mapping table; redirect map for blogs/products if URLs change.

## Metrics to instrument
- Authoring: time-to-preview, time-to-publish, validation error rate.
- Delivery: LCP/CLS for pages with swapped media; cache hit ratio; average image size served.
- Reliability: preview/publish failure rate; signed URL error rate; rollback success time.

## Ticket-ready backlog (next actions)
- Create SQL migration for base schemas (pages/sections/products/product_media/blogs/blog_blocks/globals) and run locally.
- Define RLS policies + JWT claims contract; include sample `auth.jwt()` claim payload for roles.
- Provision buckets with cacheControl defaults; add helper util to generate signed URLs with transform presets.
- Build Edge Function/RPC for draft preview (returns draft rows + signed media paths) with 5–10 min TTL tokens.
- Implement upload guardrail service: max dimensions/size, auto-transform to webp, store focal point metadata.
- Admin UI spike: section reorder + image replacement + alt-text required + focal point selector.
- Rich-text pipeline: select block format, implement sanitize/serialize, whitelist embeds.
- Metrics/logging: hook audit trail writes; log storage errors; capture LCP/CLS and cache hit ratio.
- Migration dry-run: export existing copy/media, import to staging Supabase, compare slugs/IDs.
- Rollback drill: simulate bad publish, restore prior version, verify CDN invalidation path.

## Testing/validation plan
- Unit: schema type generation matches SQL; RLS policy tests for each role; URL builder outputs expected transforms.
- Integration: upload + transform + cache headers verified; preview endpoint serves drafts only with valid token; publish invalidates cache within target time.
- E2E: author updates hero image + copy → preview → publish → live fetch shows new content; rollback returns prior content and media.

## Dependencies & blockers
- Auth source decision (SSO vs Supabase Auth) needed before finalizing RLS and JWT claims.
- CMS approach choice drives authoring UI scope (hosted/self-hosted vs bespoke); decide before Week 2.
- Plan tier confirmation (Pro+) to rely on Smart CDN; otherwise add manual cache-busting strategy.
- Localization requirement pending; affects schema indices and UI; decide before migration work.

## Owners & acceptance (placeholders)
- Backend/schema/RLS: @backend-owner — Acceptance: migrations run; RLS policy tests pass for all roles; JWT claim doc published.
- Storage/CDN/guardrails: @platform-owner — Acceptance: upload guardrails enforce limits; transform presets documented; cache headers verified.
- Frontend/admin UI: @frontend-owner — Acceptance: author can reorder sections, replace image with focal point + alt required, save draft, preview works.
- Preview/publish flow: @edge-owner — Acceptance: draft endpoint secured; publish triggers cache invalidation; rollback restores prior version.
- Migration: @data-owner — Acceptance: staged import matches checksum/slug map; rollback plan documented.

## Deliverable checklist (definition of done)
- Schema + RLS merged with automated tests.
- Buckets configured and documented (public vs private, cacheControl defaults, transform presets).
- Preview + publish + rollback flows demonstrably working in staging.
- Admin UI covers image swap, text edit, blog post creation, and product copy edit with validation.
- Metrics dashboard for SLA (time-to-publish, cache hit ratio, LCP/CLS) live in staging.

## Implementation playbook (draft snippets)
- JWT claim shape (example):
  ```json
  {
    "sub": "user-uuid",
    "role": "authenticated",
    "app_metadata": {"roles":["admin"]},
    "user_metadata": {"display_name": "Author A"}
  }
  ```
- RLS policy example (content read):
  ```sql
  create policy "published readable"
  on public.sections for select
  using (status = 'published');

  create policy "editors can read drafts"
  on public.sections for select
  using (
    status in ('draft','in_review')
    and (auth.jwt()->'app_metadata'->'roles') ?| array['admin','editor']
  );
  ```
- Storage policy example (private draft bucket):
  ```sql
  create policy "draft media read"
  on storage.objects for select
  using (
    bucket_id = 'draft-media'
    and (auth.jwt()->'app_metadata'->'roles') ?| array['admin','editor']
  );
  ```
- Transform preset helper (pseudocode):
  ```ts
  const preset = (w,h,q=80,resize='cover') => ({
    transform: { width: w, height: h, quality: q, resize }
  });
  supabase.storage.from('product-media').getPublicUrl(path, preset(1200,800,75));
  ```
- Upload guardrail (pseudo):
  - Reject if >25MB or >2500px any side.
  - Auto-convert to webp if source is jpeg/png; store focal point metadata alongside path.

## Suggested bucket layout
- `public-media` (published assets; public bucket; long cacheControl, e.g., 31536000, immutable naming).
- `draft-media` (unpublished; private bucket; short cacheControl; signed URLs).
- `product-media` (may be public; controlled via RLS + signed URLs; transforms for gallery sizes).
- `blog-media` (public hero/inline; ensure alt text required).

## Preview/publish mechanics (detailed)
- Draft fetch: `GET /preview?page=slug&token=...` hits Edge Function → validates JWT scope → selects `status in ('draft','in_review')` → signs draft-media URLs with short TTL → returns JSON shaped like live API.
- Publish action: mutation sets `status='published', published_at=now()`; triggers:
  - version snapshot row,
  - cache-busting version param or path rename for critical assets,
  - (if Smart CDN) rely on automatic invalidation; else append `?v=timestamp`.
- Rollback: pick prior version snapshot → transactional update to content rows + media pointers; invalidate caches.

## Image size presets (proposed)
- Hero desktop: 1600x900 q75 cover
- Hero mobile: 900x900 q75 cover
- Product gallery main: 1400x1400 q80 contain
- Product thumbnail: 400x400 q75 cover
- Blog hero: 1400x840 q75 cover
- Inline embed: width 900 auto height, q75 contain
- Placeholder/blur: 32x32 q50 contain

## Migration checklist (runnable order)
- Export current copy to CSV/JSON; normalize slugs.
- Upload media to storage with deterministic paths (`products/{slug}/{hash}.webp}`).
- Insert content rows with consistent IDs; link media via path + alt + focal.
- Run validation script: missing alt, long titles, broken links.
- Generate preview site pointing to staging content; client UAT.

## SQL migration skeleton (to draft)
- Tables (essentials): `pages`, `sections`, `products`, `product_media`, `blogs`, `blog_blocks`, `globals`, `versions`, `audits`.
- Columns (examples):
  - `pages`: id uuid pk, slug text unique, status enum, seo jsonb, updated_by uuid, updated_at timestamptz.
  - `sections`: id uuid, page_id fk, type text, order int, data jsonb, status enum, published_at timestamptz.
  - `product_media`: id uuid, product_id fk, path text, alt text, focal jsonb, sort int, published boolean.
  - `versions`: id, entity_type text, entity_id uuid, snapshot jsonb, created_at, created_by.
  - `audits`: id, actor uuid, action text, entity text, entity_id uuid, diff jsonb, created_at.

## Edge Function skeleton (preview)
- Input: JWT (with roles), query params `page` or `product` or `blog`, optional locale.
- Steps: validate role (admin/editor), fetch draft rows, sign draft-media URLs with 5–10 min TTL, return payload.
- Headers: `Cache-Control: private, max-age=60` to avoid stale drafts.
- Error cases: missing token → 401; not found → 404; status not draft → 403 for non-admin.

## Frontend fetch layer notes
- Use typed clients generated from Supabase types; SWR/react-query with key `[mode, slug]`.
- Preview mode: include `previewToken`; bypass static cache; display badge “Preview”.
- Media helper: given path + bucket + preset, return URL; fall back to placeholder if missing.

## Monitoring & observability
- Logs: Edge Function preview/publish events with user, entity, duration, status code.
- Metrics: cache hit ratio (cf-cache-status), average transform time, signed URL generation errors.
- Alerts: preview/publish failure rate >2%, signed URL 4xx/5xx spikes, bucket egress anomalies.

## Rollout plan
- Stage: apply schema + RLS + buckets in staging; migrate content; enable preview flow; client UAT.
- Soft launch: enable admin UI for internal users only; monitor metrics for 1 week.
- GA: widen roles to client editors; lock schema; set cacheControl to long-lived for public assets.
