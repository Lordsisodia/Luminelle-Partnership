# Architecture Map (Lumelle `src/`)

Scope: **mapping + planning only**. No code changes are made in this run.

This document is the “you can orient yourself in 10–20 minutes” map of how the app is structured today.

---

## 1) Top-level buckets

Inside `src/` the architecture is organized around a few stable buckets:

- `src/ui/` — global/shared UI (components, pages, providers) that isn’t owned by a single “domain”.
- `src/domains/` — domain-oriented code (client, admin, platform, blog, creator, ui-kit).
- `src/lib/` — cross-cutting helpers (some legacy wrappers around platform ports).
- `src/config/` — configuration constants.
- `src/content/` — static content (blog posts, etc.).
- `src/components/` — additional shared components (distinct from `src/ui/components/`).

---

## 2) Entrypoints (how the app boots)

### `src/main.tsx`

Boot sequence (high level):
- Initializes analytics (PostHog).
- Boots the React app with:
  - `ClerkProvider` (auth)
  - `HelmetProvider` (SEO/head management)
  - `AppErrorBoundary`
  - `PaymentsProvider` (client/account domain provider)
  - `RouterProvider` from `src/router.tsx`

Also includes:
- service worker registration (prod-only) and update notification.

### `src/router.tsx`

Defines the *root provider tree* that wraps `App`:
- `CartProvider` (`src/domains/client/shop/cart/providers/CartContext`)
- `AuthProvider` (`src/domains/platform/auth/providers/AuthContext`)
- `DrawerProvider` (`src/ui/providers/DrawerProvider`)

Then renders `App`.

### `src/App.tsx`

This is the route table, and it’s a good “map of domains”:
- Marketing / store:
  - `/` → shop landing (client marketing domain)
  - `/product/:handle` → product page (client shop/products domain)
  - `/cart`, `/cart/c/*` → cart + checkout handoff (client shop/cart)
  - `/checkout` → checkout page (client shop/checkout)
- Account:
  - `/account/*` → client account domain
- Admin:
  - `/admin/*` → admin domain under `AdminShell`, guarded by `AdminGuard`
- Platform auth routes:
  - `/sign-in`, `/sign-up`, `/sso-callback` → platform/auth domain UI

---

## 3) “Domains” layout (macro view)

`src/domains/` is split by product surface and by infrastructure role:

- `src/domains/client/*` — customer-facing app features (marketing, shop, account, rewards).
- `src/domains/admin/*` — internal admin tools (catalog, analytics, media, blog, settings, orders).
- `src/domains/platform/*` — provider integrations + infrastructure primitives (ports/adapters, auth, storage, http, payments, commerce, content).
- `src/domains/blog/*` — blog module (data/hooks/logic/ui).
- `src/domains/creator/*` — creator module (data/hooks/logic/ui).
- `src/domains/ui-kit/*` — reusable UI kit components and stories.

Within each domain, there’s a consistent sub-structure:
- `data/` — data fetching/IO (often calling platform ports or Supabase)
- `logic/` — domain logic, pure-ish computation
- `hooks/` — React hooks for the domain
- `providers/` — React context providers for state/IO wiring
- `ui/` — React UI: pages, layouts, sections, components

---

## 4) Platform layer (the provider swap boundary)

The “make UI interchangeable” backbone is already present: **platform ports + adapters + runtime selection**.

### 4.1 Shared platform primitives

- `src/domains/platform/ports/primitives.ts`
  - Defines canonical identifier types:
    - `ProductKey`, `VariantKey`, `CartKey`, `CartLineKey`
  - Today these are type aliases (`string`), i.e. not nominally branded.

- `src/domains/platform/ports/errors.ts`
  - Defines `PortError` with stable `PortErrorCode` values:
    - `NOT_CONFIGURED`, `UNAVAILABLE`, `NOT_FOUND`, `INVALID_INPUT`, `RATE_LIMITED`, `UNKNOWN`

### 4.2 Platform runtime selection pattern

Each platform “provider domain” has a `runtime.ts` with the same pattern:
- Detect config (env vars)
- In dev: default to mock unless explicitly enabled
- In prod: disabled runtime throws `PortError` until configured
- If configured: create a provider adapter

Examples:
- Commerce: `src/domains/platform/commerce/runtime.ts`
  - Config gate: `SHOPIFY_STORE_DOMAIN`
  - Dev gate: `USE_REAL_COMMERCE === 'true'`
  - Runtime exports: `commerce.catalog`, `commerce.cart`, `commerce.checkout`

- Content: `src/domains/platform/content/runtime.ts`
  - Config gate: `SHOPIFY_STORE_DOMAIN`
  - Dev gate: `USE_REAL_CONTENT === 'true'`
  - Runtime exports: `content.sections`

- Payments: `src/domains/platform/payments/runtime.ts`
  - Config gate: `PAYMENTS_PROVIDER === 'stripe'` (defaults to none)
  - Dev gate: `USE_REAL_PAYMENTS === 'true'`
  - Runtime exports: `payments.payments`

### 4.3 Platform ports (contracts)

Commerce ports (DTO-driven; no Shopify types):
- `src/domains/platform/commerce/ports/catalog.ts` (`CatalogPort`)
- `src/domains/platform/commerce/ports/cart.ts` (`CartPort`)
- `src/domains/platform/commerce/ports/checkout.ts` (`CheckoutPort`)

Payments port:
- `src/domains/platform/payments/ports/payments.ts` (`PaymentsPort`)

Content/CMS ports:
- `src/domains/platform/cms/ports/sections.ts` (`ContentPort`, `SectionsDTO`)
- `src/domains/platform/content/ports/*` currently re-exports the CMS port types.

### 4.4 Adapters (current providers)

- Shopify commerce adapter:
  - `src/domains/platform/commerce/adapters/shopify/internal-api/*`
  - Adapter composition: `internal-api/index.ts` returns `{ catalog, cart, checkout }` ports.
  - Key boundary helper: `internal-api/keys.ts` encodes/decodes opaque keys:
    - `VariantKey = variant.<base64url(gid)>`
    - `CartKey = cart.<base64url(gid)>`
    - `CartLineKey = line.<base64url(gid)>`

- Shopify content adapter:
  - `src/domains/platform/content/adapters/shopify/internal-api/*`

- Stripe payments adapter:
  - `src/domains/platform/payments/adapters/stripe/index.ts`
  - Uses `@platform/http/internal-api/client.ts` (`requestJson`) and throws `PortError` on failure.

---

## 5) Who consumes platform runtimes today?

Some representative “consumers”:
- Cart state provider: `src/domains/client/shop/cart/providers/CartContext.tsx` imports `commerce` from `@platform/commerce`.
- Payments provider: `src/domains/client/account/providers/PaymentsProvider.tsx` imports `payments` from `@platform/payments`.
- Legacy helpers:
  - `src/lib/product.ts` imports `commerce` and returns a legacy `Product` shape.
  - `src/lib/sections.ts` imports `content` and returns `Sections`.

This is a key architectural point:
- The app already prefers consuming `@platform/<domain>` runtimes, not adapters directly.
- Remaining work is mostly about eliminating leaks (IDs/copy/assumptions) above the platform boundary and tightening type safety.

---

## 6) Current “north star” principle (as implemented)

**UI and business logic should depend on ports + runtimes, not on vendor SDKs or vendor IDs.**

In this repo, that translates to:
- `src/domains/platform/**/adapters/**` is the only place that should know vendor shapes/IDs.
- Identifiers above adapters should be `ProductKey` / `VariantKey` / etc.
- UI should render based on port capabilities (`CheckoutCapabilities`, `PaymentCapabilities`), not hard-coded provider assumptions.

See also:
- `coupling-report.md` (what still leaks)
- `dependency-rules.md` (enforced rules we should adopt)

