# Admin Gap Analysis (2025-12-26)

This document is a “what’s built vs what’s missing” audit for the **Lumelle Admin console**. It is meant to drive ideation and prioritization (not to be a perfect spec).

Scope:
- Admin UX + flows (routes under `/admin`)
- Supporting backend/API needs only as far as they affect admin functionality
- Cross-cutting governance (roles, audit log, versioning/publish)

Non-goals:
- Deep UX/UI redesign (there are already layout prototypes)
- Implementing the missing features in this doc (this is planning only)

---

## 1) What the app is (quick orientation)

The app is a **Vite + React** storefront + internal tools, structured by domains under `src/domains/`.

Admin is mounted at:
- `src/App.tsx` (routes under `/admin`)
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx` (navigation + shell)
- `src/domains/admin/shared/ui/components/AdminGuard.tsx` (access gate)

Current admin subdomains (code ownership):
- `src/domains/admin/catalog` — products + components
- `src/domains/admin/pages` — pages / globals / legacy content editor
- `src/domains/admin/blog` — blogs (prototype)
- `src/domains/admin/media` — media library (prototype)
- `src/domains/admin/analytics` — analytics + activity (prototype)
- `src/domains/admin/orders` — **scaffold only (no UI yet)**
- `src/domains/admin/settings` — **scaffold only (no UI yet)**

---

## 2) Admin route map (current status)

Legend:
- ✅ **Wired** = reads/writes real data
- 🧪 **Prototype** = UI exists but uses mock/static data and/or save is not real
- 🧱 **Stub** = placeholder / “coming soon”
- 🕳️ **Missing** = no route/UI yet

| Route | Page component | Status | Data source(s) today | Notes |
|---|---|---:|---|---|
| `/admin` | `@admin/analytics/ui/pages/DashboardPage` | 🧪 | none | Useful “hub” UI with links, but not dynamic. |
| `/admin/products` (+ `/:handle`) | `@admin/catalog/ui/pages/ProductsPage` | ✅ | Supabase `cms_products`, `cms_product_media` | Most complete admin surface. |
| `/admin/preview/product/:handle` | `@admin/catalog/ui/pages/ProductPreviewFramePage` | ✅ | client PDP | Used as iframe preview for product edits. |
| `/admin/components` | `@admin/catalog/ui/pages/ComponentsPage` | 🧪 | local `componentMetaList` | List exists; saving/publishing is not implemented. |
| `/admin/components/:key` | `@admin/catalog/ui/pages/ComponentDetailPage` | 🧱 | none | Detail editor is explicitly stubbed. |
| `/admin/pages` (+ `/:slug`) | `@admin/pages/ui/pages/PagesPage` | 🧪 | local constants | Hardcoded example data; no DB wiring. |
| `/admin/content` | `@admin/pages/ui/pages/ContentPage` | 🧪 | Cloudflare function `/api/admin/sections/*` | Legacy Shopify metafield/metaobject editor using a shared secret. |
| `/admin/globals` | redirect to `/admin/components` | 🧱 | n/a | Placeholder path. |
| `/admin/blogs` | `@admin/blog/ui/pages/BlogsPage` | 🧪 | `src/content/blog` | List UI exists; no CMS write path. |
| `/admin/blogs/:slug` | `@admin/blog/ui/pages/BlogDetailPage` | 🧪 | `src/content/blog` | “Save/Publish” buttons are no-ops. |
| `/admin/media` | `@admin/media/ui/pages/MediaPage` | 🧪 | mock constants | UI is “designed”, not wired to storage. |
| `/admin/analytics` | `@admin/analytics/ui/pages/AnalyticsPage` | 🧪 | mock constants | Explicitly marked prototype. |
| `/admin/activity` | `@admin/analytics/ui/pages/ActivityPage` | 🧪 | none | UI placeholder only. |
| `/admin/orders` | `@admin/orders/ui/pages/OrdersPage` | 🧱 | none | Scaffold only (placeholder UI). |
| `/admin/settings` | `@admin/settings/ui/pages/SettingsPage` | 🧱 | none | Scaffold only (placeholder UI). |

---

## 3) Biggest missing pieces (admin-wide)

These are the gaps that block “real” usage of admin as an internal CMS/ops console.

### A) Access control is not enforced (high risk)

Current state:
- `src/domains/admin/shared/ui/components/AdminGuard.tsx` is currently **not enforcing admin access** (demo-mode browsing is allowed; no RBAC).
- There are multiple auth patterns across admin surfaces:
  - Supabase+Clerk JWT for `/admin/products` (good direction)
  - Internal bearer secret (sessionStorage) for `/admin/content` (high risk pattern)

Missing (minimum):
- **RBAC enforced at the UI** (admin/editor/legal/etc).
- **RBAC enforced at the data layer** (Supabase RLS or API authorization).
- “Least privilege” model:
  - read-only roles (analytics)
  - publisher roles (publish/rollback)
  - legal roles (terms/privacy pages)

Ideation add-ons:
- Per-entity permissions (e.g. legal pages only editable by “Legal”).
- Approval workflow for publishing (editor drafts → admin publishes).

### B) Publishing workflow (draft → preview → publish → rollback) is mostly missing

Current state:
- Products have a `status` field and can be saved, but there is no consistent publish/rollback workflow surfaced in admin across entities.
- Pages, blogs, components, and media are prototypes and don’t have publish states.

Missing (minimum):
- Consistent status machine across content types: `draft`, `in_review`, `published`, `archived`.
- Preview mode that shows drafts without leaking publicly.
- Version snapshots per publish, and rollback UI.
- “Who changed what” audit trail.

### C) “Admin content self-service” is only complete for Products

Current state:
- Products admin is wired and offers real editing.
- Pages/blog/media/components are not.

Missing (minimum):
- Pages: list + detail editing, section ordering, SEO fields, publish controls.
- Blogs: CMS-backed list + editor, SEO, scheduling, preview.
- Media: storage-backed library, upload + guardrails.
- Components: persisted configs (promo/header/footer/etc) + preview.

### D) No unified data layer / schema-first approach for admin entities

Current state:
- Products have a fairly clear schema (`cms_products`, `cms_product_media`) and typed UI.
- Other admin features are still mock-data driven.

Missing:
- A “platform cms” surface / SDK that all admin pages consume (so we stop duplicating “how to fetch/save/publish”).
- Schema-first forms (JSON schema → form generation) for repeatable section editing.

---

## 4) Area-by-area gaps (ideation checklist)

Use this section as a backlog seed. The “missing” bullets are intentionally opinionated.

### 4.1 Products (`/admin/products`) — **most complete**

What exists:
- Real load/save to Supabase `cms_products` + `cms_product_media`.
- Gallery upload UX (uses a Cloudinary upload/sign flow).
- Product preview frame route exists (`/admin/preview/product/:handle`).

Missing / improve:
- **Publish workflow parity** with other content types:
  - explicit “Draft / In review / Published”
  - preview vs published rendering distinction
  - rollback/version history
- **Validation & guardrails**
  - required alt text for images
  - character limits (SEO title/description, hero copy)
  - URL validation for embeds (TikTok)
  - media constraints (size, dimensions)
- **Bulk operations**
  - “set sale %” across products
  - bulk status change / publish
  - bulk media replace
- **Content model parity** with `docs/01-product/admin/products.md` (some parts exist via JSON/specs, others are not surfaced yet)
  - social proof/testimonials editor
  - “creators in action” gallery management
  - richer merchandising controls (quantity tiers, bundles)

### 4.2 Components (`/admin/components`) — **prototype**

What exists:
- Component inventory metadata (`src/domains/admin/shared/data/componentMeta.ts`).
- Component list UI.

Missing:
- Component detail editor (currently stubbed).
- Persisted storage model for component configs (Supabase table or JSONB store).
- Live preview + publish gating.
- Schema validation per component (so configs can’t break the site).

Ideation extras:
- “Where used” graph (show which pages reference a component config).
- Scheduled promos (start/end time, timezone-safe).
- A/B testing hooks per component (ties into PostHog flags).

### 4.3 Pages (`/admin/pages`) — **prototype**

What exists:
- A good UI layout skeleton showing how pages might be represented.

Missing:
- Pages CRUD (create/edit/archive) backed by a CMS table.
- Page detail editor:
  - sections list
  - section reorder
  - section-level JSON/schema forms
- SEO fields + preview snippet.
- Status workflow (draft/review/publish) + preview and rollback.

Ideation extras:
- “Legal pages” lock + versioned “effective date” banner.
- Link checker (“broken links” report).
- Auto-generate `sitemap.xml` entries when publishing pages.

### 4.4 Media (`/admin/media`) — **prototype**

What exists:
- Thoughtful UX prototype: buckets, guardrails, filters, alt text status.

Missing:
- Storage integration (Supabase Storage and/or Cloudinary) + metadata DB.
- Upload pipeline:
  - image conversion (WebP/AVIF)
  - resizing/renditions
  - max dimensions/file size enforcement
  - required alt + tags
- Asset usage tracking:
  - show which pages/products/blogs reference an asset
  - prevent deletion of in-use assets
  - orphan cleanup job

Ideation extras:
- Focal point + crop presets per usage (hero vs card vs thumbnail).
- Duplicate detection (hashing).
- “Request asset” workflow (content team can request creative).

### 4.5 Blogs (`/admin/blogs`) — **prototype**

What exists:
- List UI and a detail editor UX.
- Public blog pages exist under `/blog/*`.

Missing:
- A real CMS-backed blog data model (posts + blocks).
- Save/publish/schedule flows.
- Rich-text safety model (block-based, sanitized embeds).
- SEO authoring:
  - meta title/description
  - canonical URL
  - OG image selection
  - structured data previews

Ideation extras:
- Internal linking suggestions (auto-suggest related posts).
- “Content brief” attachment and checklists.
- Performance checks (image weight, CLS).

### 4.6 Analytics (`/admin/analytics`) — **prototype**

What exists:
- UI design for KPIs, trends, and breakdowns (mocked).

Missing:
- Data wiring:
  - Shopify orders mirror (Supabase `ShopOrders`)
  - PostHog funnels/flags (already present in repo)
  - Clarity session replay linking (if enabled)
- Core KPIs:
  - revenue, orders, AOV, conversion (attribution caveats with Shopify checkout)
  - refund rate
  - top products (units, revenue)
  - cohorts / LTV (if customer identifiers are available)

Ideation extras:
- Experiment results dashboard (A/B testing outcomes).
- Merchandising dashboards: inventory risks, discount effectiveness.

### 4.7 Activity Log (`/admin/activity`) — **placeholder**

Missing (minimum):
- Audit trail table wired to UI:
  - actor, entity type/id, action, timestamp, diff
- Version history UI:
  - view snapshots per publish
  - rollback button (role-gated)
- Correlate audit entries with deploys (optional but very useful).

### 4.8 Orders (`/admin/orders`) — **stub**

Supporting backend exists:
- Orders are mirrored into Supabase (`ShopOrders`) via Shopify webhooks.
- CSV exports already exist:
  - `GET /api/exports/orders` (internal auth)
  - `GET /api/exports/customers` (internal auth)

Missing (minimum):
- Orders browser UI (search by email/name/id, status filters).
- Order detail view (line items, fulfillment status, notes).
- Action buttons:
  - open in Shopify admin
  - refund / resend receipt (if desired)
  - internal tags/notes

Ideation extras:
- Fraud/risk flags (basic heuristics).
- Returns/RMA queue integration.

### 4.9 Settings (`/admin/settings`) — **stub**

Missing (minimum):
- Feature flags management surface (ties into `platform/feature-flags`).
- Integrations:
  - PostHog key toggles
  - Shopify store domain sanity checks
  - email provider credentials validation
- Team management:
  - list admins/editors
  - invite/disable
  - role assignment

Ideation extras:
- “Environment health” page:
  - webhook status (last order webhook received)
  - error rate
  - cache status

---

## 5) Other features we could add (beyond Admin)

These are “high leverage” additions that fit the codebase direction and already have partial docs/infra.

1) **A/B testing UI + governance**
   - Experiment registry (name, variants, goal, start/end, owner)
   - Safety rails (traffic caps, kill switch, event budget)
   - This aligns with existing PostHog/Clarity plans in `docs/05-planning/future-features/A-B testing components/`.

2) **Magic cart recovery**
   - Cross-session restore banner, shareable restore link, offline queue
   - Already sketched in `docs/05-planning/future-features/magic-cart-recovery-system.md`.

3) **Rewards / loyalty (currently disabled)**
   - Re-enable `/rewards` behind a flag once rules + ledger are defined.
   - Could integrate with referrals and creator partnerships.

4) **Creator portal expansion**
   - Submission pipeline (UGC intake), briefs, payout tracking, performance metrics.

5) **Returns & tracking improvements**
   - Self-serve returns portal, smarter order tracking statuses, proactive notifications.

---

## 6) Notes on documentation drift (things to reconcile)

While writing this audit, a few docs appeared out-of-sync with the current code layout:
- `docs/05-planning/future-features/admin content self-service/status.md` references older paths (pre subdomain split).
- `docs/01-product/admin/products-refactor-plan.md` currently contains escaped `\\n` and what looks like a stray `*** End Patch` footer (likely pasted from an apply_patch diff).

Recommendation:
- Treat this file as “source of truth for what exists” and update older planning docs as we ship/rename.

---

## 7) Sources reviewed (high signal)

Code:
- `src/App.tsx`
- `src/domains/admin/shared/ui/layouts/AdminShell.tsx`
- `src/domains/admin/shared/ui/components/AdminGuard.tsx`
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`
- `src/domains/admin/catalog/ui/pages/ComponentsPage.tsx`
- `src/domains/admin/catalog/ui/pages/ComponentDetailPage.tsx`
- `src/domains/admin/pages/ui/pages/PagesPage.tsx`
- `src/domains/admin/blog/ui/pages/BlogsPage.tsx`
- `src/domains/admin/media/ui/pages/MediaPage.tsx`
- `src/domains/admin/analytics/ui/pages/AnalyticsPage.tsx`
- `functions/api/admin/sections/get.ts` + `functions/api/admin/sections/update.ts`
- `functions/api/exports/orders.ts` + `functions/api/exports/customers.ts`

Docs (planning context):
- `docs/08-meta/repo/meta/domains-README.md`
- `docs/01-product/admin/products.md`
- `docs/01-product/admin/products-architecture.md`
- `docs/05-planning/future-features/admin-content-self-service.md`
- `docs/05-planning/future-features/admin content self-service/research-checklist.md`
- `docs/07-templates/library/templated/shared-ecommerce-features.md`
