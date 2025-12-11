# Admin UI Implementation Plan (staging-first, flag-gated)
Date: Dec 11 2025

## Goals
- Build the admin UI and backend shape without touching live app behavior.
- Keep all runtime changes behind a feature flag (`VITE_ENABLE_ADMIN_UI`) and staging-only env.
- Prepare migrations/config so they can be applied to staging first, then prod when approved.

## Isolation strategy
- No branch required; all code gated by `VITE_ENABLE_ADMIN_UI=false` default.
- Admin route mounted at `/admin` only when flag is true; no public nav link added by default.
- Staging env file: `.env.admin.example` with staging Supabase URL/anon keys and bucket names; keep existing `.env` untouched.
- Migrations authored but not applied to prod; run on staging DB first.
- Buckets/policies created only in staging until sign-off.
- Shopify sync points to staging Supabase; read-only from Shopify (no write-back).

## Data model (staging migrations to draft)
- Tables: `pages`, `sections`, `products`, `product_media`, `blogs`, `blog_blocks`, `globals`, `versions`, `audits`.
- Enums: `content_status` (`draft`, `in_review`, `published`, `archived`).
- Constraints: unique slugs; FK relationships (sections → pages, product_media → products, blog_blocks → blogs).
- Audits: actor uuid, action, entity, entity_id, diff jsonb, created_at.
- Versions: entity_type, entity_id, snapshot jsonb, created_at, created_by.

## Buckets (staging)
- `public-media` (published assets, long cacheControl).
- `product-media` (published product assets).
- `blog-media` (published blog assets).
- `draft-media` (private, short cacheControl, signed URLs).

## RLS (staging)
- Roles: admin only (for now). Policies allow admin read/write; deny others.
- Storage policies: public buckets readable by all; draft bucket readable/writeable by admin only.

## Admin UI (to be dropped in later)
- Feature flag: `VITE_ENABLE_ADMIN_UI` controls import of `/admin` route.
- Auth: Supabase auth with admin-only access.
- Screens: Dashboard, Pages/Sections, Products, Blogs, Media Library, Globals, Preview/Publish, Activity Log.
- Upload UX: client-side WebP conversion; allow SVG only if source is vector; enforce ≤25MB and ≤2500px; collect alt + focal.

## Shopify → Supabase (staging)
- One-way ingest of product copy/media to populate `products` + `product_media`.
- No writes to Shopify.

## Safe rollout path
1) Draft migrations in repo; run on staging DB only.
2) Create staging buckets + policies.
3) Build admin UI components behind flag; keep flag off by default.
4) Hook staging env in `.env.admin` (local) using staging Supabase keys.
5) Seed staging with sample data + ingested Shopify products.
6) UAT on staging: CRUD, preview, publish/rollback, media handling.
7) After approval: apply migrations/buckets to prod, flip flag in prod env, add nav link if desired.

## Ready-to-start tasks (doc-only for now)
- Write SQL migration drafts.
- Define env flag usage and sample `.env.admin.example`.
- Outline uploader client-side conversion flow.
- Outline Shopify ingest script steps.
