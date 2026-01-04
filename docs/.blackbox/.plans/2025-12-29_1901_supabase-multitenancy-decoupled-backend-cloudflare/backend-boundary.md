# Backend Boundary Blueprint (frontend swappable)

Goal: make it possible to **swap the frontend** (SPA, SSR, mobile app, admin UI, etc.) while keeping the backend stable.

This document defines the **contract boundary** between “frontend” and “backend infrastructure”.

Current reality:
- Hosting/edge: Cloudflare
- Commerce provider: Shopify (today)
- Database: Supabase
- Identity: Clerk (currently present in `src/main.tsx` and `platform/auth`)

---

## 1) The boundary: Backend as a BFF

Treat the “backend” as a **BFF** (Backend-for-Frontend) that hides vendors and emits a stable contract.

Principle:
- Frontend talks to **your API** (stable, provider-agnostic).
- API talks to vendors (Shopify, Stripe, Supabase, etc.) and performs mapping.

In this repo, the start of that boundary already exists as:
- platform ports (`src/domains/platform/**/ports/*`)
- provider adapters (`src/domains/platform/**/adapters/**`)
- internal API client (`src/domains/platform/http/internal-api/client.ts`)

### Why BFF matters for “swappable frontend”

If the browser directly talks to Shopify/Stripe/Supabase with provider assumptions:
- a new frontend has to replicate those assumptions
- “swap frontend” becomes “rewrite integration logic”

If the browser talks to a stable BFF API:
- new frontend only re-implements UI + state
- backend remains unchanged

---

## 2) What should live in the backend boundary

### A) Provider-specific identifiers and mapping

Rule:
- UI must never contain raw vendor IDs (e.g. Shopify GIDs).
- UI uses internal opaque keys (ProductKey/VariantKey/etc.).

Where the mapping belongs:
- Inside the provider adapter boundary (example already exists):
  - `src/domains/platform/commerce/adapters/shopify/internal-api/keys.ts`

### B) Provider-specific flows and capabilities

Example: checkout differs by provider (redirect, embedded, none).

UI should render based on:
- `CheckoutCapabilities`
- `PaymentCapabilities`

Backend owns:
- deciding which provider is active
- producing capabilities for the UI
- issuing redirect URLs or embedded session tokens

### C) Tenancy context resolution

If you intend multi-tenant later, every request needs a stable notion of “tenant”.

Backend should determine:
- tenant ID
- tenant config (Shopify domain, allowed features, brand settings)

Frontend should NOT:
- guess tenant from env constants
- embed tenant-level provider credentials

---

## 3) Where the boundary lives on Cloudflare

Cloudflare gives you multiple options. The key is: **the boundary must be server-controlled**.

Recommended pragmatic setup:
- Public frontend: Cloudflare Pages (static assets + SPA/SSR)
- Backend API surface: Cloudflare Pages Functions or Workers

Pattern:
- Frontend calls `/api/*` (same origin)
- Worker/Function routes requests to:
  - Supabase (DB) with service role where appropriate
  - Shopify Admin/Storefront APIs (server side)
  - Stripe (server side)

---

## 4) Authentication model at the boundary (Clerk + Supabase)

Current pattern in the app:
- Clerk provides identity in the browser.
- Some parts of the app use Clerk JWT templates for Supabase access.

For a stable boundary:
- Prefer: browser sends Clerk session/JWT to `/api/*`
- Backend verifies identity and decides:
  - whether to call Supabase with service role vs RLS user token
  - which tenant this identity belongs to

This avoids shipping too much “DB security logic” into the frontend.

---

## 5) Contract surface (what frontends should call)

Instead of thinking “Shopify endpoints”, define stable resources:

- `GET /api/commerce/product/:handle` → `ProductDTO`
- `GET /api/commerce/cart` → `CartDTO`
- `POST /api/commerce/cart/line/add` `{ variantKey, qty }` → `CartDTO`
- `POST /api/commerce/checkout/begin` → `CheckoutStart`

- `GET /api/content/landing-sections` → `SectionsDTO`

- `GET /api/payments/capabilities` → `PaymentCapabilities`
- `POST /api/payments/begin` → `PaymentStart`

These align with your existing ports:
- `CatalogPort`, `CartPort`, `CheckoutPort`, `ContentPort`, `PaymentsPort`

---

## 6) “Done now” vs “done later”

Do now (supports swappable frontend soon):
- make sure all provider IDs/copy are behind ports/adapters (measurable)
- ensure every “integration” path is accessible via a stable API surface (even if thin)

Do later (when multi-tenant is real):
- tenant config registry + routing
- tenant-aware auth + RLS policies

See also:
- `supabase-multitenancy-plan.md`
- `migration-stages.md`

