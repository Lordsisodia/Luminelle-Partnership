# Admin Area Design (draft)
Date: Dec 11 2025

## Overview
Goal: a web admin where non-technical users can edit site copy, images, products, blogs, and globals. Backed by Supabase (DB + Storage) with draft/preview/publish, roles, and audit history.

## Navigation / Pages
1) **Dashboard**
   - Shows: recent edits, pending approvals, failed publish events, quick links.
   - Data: `audits`, `versions`, `sections`/`blogs` where status != published.
2) **Pages & Sections**
   - List all pages (slug, status, last edited).
   - Page detail: section list with drag order; edit per-section copy/media fields; status controls (draft/in_review/published); preview link.
   - Data: `pages`, `sections` (data jsonb per section), Storage paths for section images (likely `public-media` or `draft-media`).
3) **Products**
   - Grid/list of products with search.
   - Product detail: core copy (title, descriptions, bullets, specs), SEO, badges, related products; gallery manager (reorder, replace, focal point, alt required).
   - Data: `products`, `product_media`, Storage `product-media`.
4) **Blogs**
   - List with filters (status, author).
   - Blog editor: title, slug, summary, tags/categories, hero image, body blocks (rich text/blocks), SEO, canonical URL, publish_at scheduling, preview.
   - Data: `blogs`, `blog_blocks`, Storage `blog-media`.
5) **Media Library**
   - Buckets scoped view; upload with guardrails (size/dim), focal point and alt; show usage (where referenced); mark unused/orphaned.
   - Data: Storage buckets (`public-media`, `draft-media`, `product-media`, `blog-media`), reference lookups in `product_media`, `sections`, `blogs`.
6) **Globals**
   - Nav links, footer links, promo bars/announcement bars, default SEO (title/desc/image), contact info, social links.
   - Data: `globals` table (singleton rows keyed by type), Storage paths for global images/icons.
7) **Users & Roles**
   - Assign roles (admin/editor/contributor/media-manager). Invite users (per chosen auth model).
   - Data: Supabase Auth users + role claims; audit log uses `audits`.
8) **Preview & Publish**
   - Preview tokens generation; publish queue with approvals; rollback to prior version.
   - Data: `versions`, `audits`, status fields on content tables; Edge Function for preview token issuance.
9) **Activity Log**
   - Chronological changes with diff summary and actor.
   - Data: `audits`, `versions`.

## Per-page editable items and data links
- **Section editor**: copy fields map into `sections.data` (jsonb typed per section kind); section hero images reference Storage path stored in `sections.data.media`.
- **Product editor**: textual fields map to columns on `products`; gallery items map to rows in `product_media` (path, alt, focal, sort).
- **Blog editor**: structured body stored in `blog_blocks`; hero stored as Storage path on `blogs.hero_media_id`; SEO fields on `blogs`.
- **Globals**: JSON blobs in `globals.data` keyed by type (nav/footer/promo/seo_default); image paths stored inside `data.media` fields.
- **Media library**: uploads write Storage object; metadata (alt, focal, use count) cached in related tables (`product_media`, `sections`, `blogs`).

## Data flow & connectivity
- Reads: client → Supabase client → tables / Storage public URLs (published) or signed URLs (draft/private).
- Draft/Preview: admin UI requests preview token → Edge Function validates role → returns draft rows + signed URLs from `draft-media`.
- Publish: admin action sets status=published, snapshots current content into `versions`, bumps cache-bust version, optional publish_at scheduling.
- Rollback: select version → transactional restore into main tables + update media pointers; invalidate caches.

## Changes needed in current data layer
- Introduce content schemas/tables listed above (see research-notes SQL skeleton).
- Add status fields and timestamps to content tables; add `versions` + `audits`.
- Enforce RLS policies per role; add JWT role claim in auth layer.
- Move hardcoded assets to Storage buckets; replace code constants with DB/Storage lookups.
- Add API/Edge Function endpoints: preview fetch, publish action, rollback, media upload guardrail (if server-side).
- Generate TS types from Supabase schema; update frontend fetchers to consume DB-driven content instead of hardcoded strings/assets.

## Editing rules / validation per screen
- Required: alt text for any image; title/slug unique; max lengths on hero copy; URL validation for links; color contrast check on promos/banners.
- Upload guardrails: ≤25MB, ≤2500px; auto webp; focal point required for hero/gallery.
- Workflows: draft → in_review → published; approval required to publish (admin only); scheduled publish optional.

## Tech notes (wiring)
- Storage URL helper exposes presets (hero, gallery, thumb, blur).
- Caching: long cacheControl for published public assets; short for draft; Smart CDN if on Pro+ else versioned URLs.
- Observability: audit log writes on every mutation; metrics for publish latency and cache hit ratio.

## Wireframe-level layouts (text)

### Dashboard
- Top bar: Logo | Environment badge (Staging/Prod) | User menu
- Cards row: Pending approvals | Recent publishes | Failed events | Cache status
- Activity list: [actor] [action] [entity] [time]
- Shortcuts: “New blog post”, “Replace hero image”, “View preview tokens”

### Pages & Sections (list)
- Left: Page filter/search
- Right: Table columns: Page (slug), Status, Last edited, Preview link, Edit button

### Page Detail / Sections
- Header: Page title, slug, status pill, Preview button, Publish button (if admin), Save draft
- Section list (sortable):
  - Each item shows: Section type, title/label, visibility toggle, “Edit” + drag handle
- Edit drawer/modal for a section:
  - Fields: text inputs for headings, body, CTA label/url; background image picker (thumb, alt, focal point); color pickers; show/hide toggles.

### Products
- Toolbar: search, filter (status, badge), “New product”
- Table: Product name, SKU, Status, Updated, Edit
- Product detail:
  - Tabs: Overview | Copy | Media | SEO | Related
  - Copy form: title, short/long description, bullets/specs, badges, FAQs
  - Media grid: sortable thumbnails; each tile has replace, alt, focal-point picker, delete
  - SEO: slug, meta title/desc, OG image picker

### Blogs
- Toolbar: search, status filter, author filter, “New post”
- Table: Title, Status, Updated, Preview, Edit
- Blog editor:
  - Header: title, slug, status, publish_at, Preview/Publish
  - Hero: image picker (alt/focal)
  - Body blocks: stack of blocks (paragraph, heading, list, quote, image); add/reorder; inline toolbar
  - Sidebar: tags/categories, canonical URL, SEO meta

### Media Library
- Tabs per bucket: public-media | draft-media | product-media | blog-media
- Toolbar: upload (with rules shown), search by filename, filter by “unused”
- Grid: thumbnail + alt + focal indicator + references count
- Detail drawer: preview, path, alt, focal point editor, referenced in [list], replace file

### Globals
- Sections: Nav, Footer, Promo/Announcement, Default SEO, Social
- Each section: repeater rows (label, url, order), copy fields, image/icon pickers
- Promo bar: message text, CTA text/url, background color/image, contrast check indicator

### Users & Roles
- Table: email, role(s), last login, status
- Actions: assign role, revoke, invite user (if auth model allows)

### Preview & Publish
- Preview tokens list: token, scope (page/blog/product/all), expires_at, copy link, revoke
- Publish queue: items awaiting approval, approver action buttons
- Rollback tab: list versions with timestamp/actor/diff summary; “Restore” button

### Activity Log
- Stream view: [time] [actor] [action] [entity link] [status]
- Filters: actor, entity type, status, date range

## Framework options (open-source) to borrow/use
- **React Admin + ra-supabase-core**: mature React admin framework; scaffolds CRUD from Supabase schema; supports auth/permissions and theming. Good for core CRUD on pages/sections/products/blogs/globals and approval queues.
- **Refine**: React meta-framework with official `@refinedev/supabase`; lighter shell if we want custom UI with provided data/auth providers.
- **Dashibase (GPL)**: Supabase-native Notion-like builder; useful to borrow block-based section editing patterns and column-level ACL UI; can self-host for internal ops.
- **Supawald (Apache 2.0)**: Next.js headless CMS for Supabase Storage; ready media library UX (drag/drop, focal, auth) to embed or reuse for Media Library.
- **Appsmith (OSS)**: Low-code internal tool; good for quick ops dashboards or as a stopgap while bespoke UI ships.

## Implementation plan (leveraging frameworks)
1) Scaffold CRUD quickly  
   - Use React Admin with Supabase data provider; generate resources for `pages`, `sections`, `products`, `product_media`, `blogs`, `blog_blocks`, `globals`.  
   - Wire Supabase auth; map JWT roles to RA auth provider.
2) Integrate media UX from Supawald  
   - Port Supawald Storage components for upload, focal point, alt enforcement, signed URLs.  
   - Point to our buckets (`public-media`, `draft-media`, `product-media`, `blog-media`) and apply guardrails.
3) Customize RA forms to content model  
   - Section editor: custom block/JSON field with drag reorder; image picker via Supawald widget.  
   - Product media grid: sortable list bound to `product_media`.  
   - Blog body: block editor mapped to `blog_blocks`.
4) Preview/publish flow  
   - Add RA actions: Preview (Edge Function fetch draft) and Publish (status flip + version snapshot + cache bust).  
   - Approval queue view for drafts.
5) Permissions  
   - RA `canAccess` hooks + Supabase RLS; hide/disable actions by roles (admin/editor/contributor/media-manager).  
   - Storage: draft bucket signed URLs only for editor/admin.
6) Dashibase inspiration  
   - Borrow block UX ideas (Notion-like collapsible blocks) for section editor.  
   - Optionally run Dashibase internally for UAT/ops during build.
7) Ops/stopgap  
   - Optionally stand up Appsmith for logs/audits or emergency edits while main admin matures.

## Build sequence (practical)
- **Week 1**: RA scaffold + Supabase provider; auth hookup; base CRUD for pages/sections/products/blogs/globals; import Supawald media component; buckets wired.
- **Week 2**: Custom fields (block editor, media grid with focal/alt), preview/publish actions, approval queue; RLS-tested; draft/publish toggles.
- **Week 3**: Polish UX (activity log, rollback UI), metrics panel, training content; replace any stopgap Appsmith screens with RA equivalents.

## Detailed implementation steps (approx. 50)
1) Confirm auth model (Supabase Auth vs SSO) and role claims format.
2) Finalize content schema fields for pages/sections/products/blogs/globals.
3) Write SQL enums for statuses (draft/in_review/published/archived).
4) Write SQL migrations for base tables (`pages`, `sections`, `products`, `product_media`, `blogs`, `blog_blocks`, `globals`).
5) Add `versions` table for snapshots.
6) Add `audits` table for activity logging.
7) Add indexes/constraints (slug uniqueness, locale uniqueness if needed).
8) Generate Supabase types (TS) into the app workspace.
9) Set up buckets (`public-media`, `draft-media`, `product-media`, `blog-media`) with cacheControl defaults.
10) Implement Storage policies (public vs draft buckets) with RLS.
11) Implement table RLS policies for roles (admin/editor/contributor/media-manager).
12) Add row-level ownership rules for drafts if needed.
13) Scaffold React Admin app with Supabase data provider.
14) Wire RA auth provider to Supabase auth + role claims.
15) Create RA resources: Pages, Sections, Products, Product Media, Blogs, Blog Blocks, Globals.
16) Build shared form components (text, slug, SEO meta, status pill).
17) Integrate Supawald media picker/uploader component.
18) Add upload guardrails (size/dimension/format) in uploader.
19) Add focal-point selector + alt text required in media picker.
20) Create Section form: block/JSON editor for `sections.data`.
21) Add drag-and-drop section reorder UI.
22) Add page-level actions: Preview, Save Draft, Submit for Review, Publish.
23) Build Products list view with filters/search.
24) Build Product detail tabs (Overview/Copy/Media/SEO/Related).
25) Implement Product media grid (sortable, replace, alt/focal).
26) Build Blogs list view with filters (status/author).
27) Build Blog editor with hero image + body block editor.
28) Add tags/categories and canonical URL inputs.
29) Add publish_at scheduler UI for blogs.
30) Build Globals editor (nav/footer/promo/default SEO/social).
31) Build Media Library page with bucket tabs and “unused” filter.
32) Show reference counts by querying related tables.
33) Add replace file flow that preserves references (path/versioning).
34) Build Preview Tokens page (list/generate/revoke).
35) Implement Edge Function call for draft preview fetch in UI.
36) Build Publish Queue view (awaiting approval) with Approve/Reject actions.
37) Add Rollback UI tied to `versions` table.
38) Build Activity Log stream with filters (actor/entity/status/date).
39) Add cache-busting/version query management in publish action.
40) Hook audit logging into all mutations in UI (and/or via middleware).
41) Add optimistic UI for saves; show validation errors inline.
42) Add accessibility checks (alt required, contrast badge for promo bars).
43) Add localization toggle if enabled; duplicate fields per locale.
44) Implement SWR/react-query caching with published vs preview modes.
45) Add metrics panel (publish latency, cache hit ratio, image size averages).
46) Wire error reporting (Edge Function failures, signed URL errors).
47) Write integration tests for uploader + transforms + cache headers.
48) Write E2E flow test: hero swap → preview → publish → rollback.
49) Prepare training doc / tooltips inside UI (inline help).
50) Staging rollout checklist: migrate sample data, run UAT, promote to prod.

## Current decisions/constraints (from client)
- Auth: Supabase; only admins access the admin UI; approvals not required initially.
- Plan: Supabase Free; assume no Smart CDN or server-side image transformations—plan for client-side/Edge transforms.
- Storage: 500 MB cap; prefer automatic WebP and SVG where source is vector to save space.
- Products: source of truth in Shopify; UI currently hardcoded—need to ingest/sync into Supabase for editable copy/media or read from Shopify and cache in Supabase.
- Framework: fully owned code (no low-code); React-based custom UI, borrowing patterns only.
- Approvals: not mandatory for all publishes since only admins use it.

## Clarifications resolved
- Localization: English only for now; skip locale fields/tables.
- Blog embeds: allow YouTube embeds; keep others disabled initially.
- Admin branding: match public brand (logo/colors).
- Image handling on Free plan: use client-side conversion to WebP; allow SVG when source is vector; no server transforms assumed.
