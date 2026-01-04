# DTO + Capabilities Spec (v0.1)

Purpose:
- Make “frontend swappable” practical by defining the **shape** of what crosses the `/api/*` boundary:
  - stable DTOs (data transfer objects)
  - stable error envelopes
  - stable capability signals (what features exist for a tenant/provider)
- This is a **docs-only contract** in the current phase (no code changes here).

Evidence rule:
- Any statement of “what exists today” cites a snapshot under:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Primary evidence anchors for current primitives:
- Platform key primitives exist and are intended as provider-agnostic IDs:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`
- Stable error concept exists (`PortError` + codes):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`
- `/api/*` surface exists as Cloudflare Pages Functions:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`

---

## 0) Non-negotiable goals

- Frontends only need **HTTP + JSON** to integrate.
- Frontends never need to know:
  - Shopify GIDs
  - Stripe IDs
  - Supabase table shapes
  - Clerk implementation details
- DTOs are versionable without breaking old frontends.

Evidence that vendor IDs currently leak above adapters (baseline we plan to eliminate):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

## 1) Response envelope (recommended default)

### 1.1 Success

- Response body SHOULD be a JSON object:
  - `data`: payload DTO
  - `meta`: non-sensitive metadata (paging, requestId, timing)

### 1.2 Errors

- Response body SHOULD be a JSON object:
  - `error.code`: stable, machine-readable code (aligned to `PortErrorCode` semantics)
  - `error.message`: human-readable message (non-sensitive)
  - `error.details`: optional structured details safe for clients (validation fields)
  - `meta.requestId`: correlation ID for logs

Evidence that “stable error codes” are already a platform concept:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

---

## 2) Key types (what IDs are allowed to cross the boundary)

Allowed IDs in DTOs:
- `ProductKey`
- `VariantKey`
- `CartKey`, `CartLineKey`
- `OrderKey` (if/when added)

Disallowed IDs in DTOs:
- Shopify GIDs
- Stripe payment intent IDs (unless explicitly part of a payment flow, and even then prefer opaque internal keys)

Evidence that key primitives already exist:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`

Mapping responsibility:
- Internal keys are translated to provider identifiers **inside adapters**.
- See: `key-mapping-spec-v1.md`

---

## 3) Capabilities (how a frontend learns “what’s enabled”)

Principle:
- A swappable frontend should not branch on provider strings; it should branch on **capability flags**.

Capabilities live at three scopes:
- `tenantCapabilities` (what this tenant has configured)
- `domainCapabilities` (commerce/payments/content)
- `featureCapabilities` (specific optional features)

Evidence that runtime-based selection exists (foundation for capabilities):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-runtime.ts.head.txt`
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-runtime.ts.head.txt`

---

## 4) Versioning strategy (so UIs can evolve independently)

- Every response SHOULD include a contract version in headers or `meta`, e.g.:
  - `X-Lumelle-Contract: v1`
- Breaking changes require either:
  - a new endpoint version (`/api/v2/...`), OR
  - content-negotiation header (only if needed)

---

## 5) Pagination + filtering (recommended conventions)

- List endpoints SHOULD use:
  - `cursor` + `limit` (cursor-based pagination)
  - stable sort keys
- `meta` SHOULD include:
  - `nextCursor` (if more data)

---

## 6) Idempotency (writes)

- Mutation endpoints SHOULD accept:
  - `Idempotency-Key` header
- The backend boundary owns idempotency enforcement (provider differences should not leak to UI).

Evidence that mutations exist today under `/api/storefront/cart/*` and `/api/payments/*`:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

---

## 7) Storefront thin-slice DTOs (v0.1 proposal)

Why this exists:
- The storefront primitives kit work explicitly calls out that the “hard part” is defining stable DTOs and state semantics (not finding more repos), and names the minimal DTO set required by PLP/PDP/cart primitives.  
  Evidence: `artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`

This is a docs-only proposal intended to:
- keep storefront UI swappable (new UI can implement primitives against DTOs)
- keep commerce providers swappable (adapters translate internal keys to vendor identifiers)

Related acceptance criteria (what the UI primitives must support):
- Storefront primitives inventory excerpt: `artifacts/snapshots/oss-catalog-blocks-inventory.storefront-v1.5.150-270.txt`

### 7.1 Common primitives

Money:
- Represent money as:
  - `amount` (string; decimal)
  - `currencyCode` (string; ISO)
- Do not expose provider-specific money objects.

Images:
- Use:
  - `url`
  - `alt` (optional)
  - `width`/`height` (optional)

### 7.2 `ProductSummary` (PLP product card/grid)

Required fields:
- `productKey: ProductKey` (opaque internal key)
- `handle: string`
- `title: string`
- `featuredImage?: Image`
- `priceRange?: { min: Money, max: Money }`
- `badges?: string[]` (optional: “Sale”, “Sold out”, etc.)
- `availability?: { isAvailable: boolean }`

Rules:
- Never include Shopify product IDs/GIDs.
  - Key primitives already exist for this purpose: `artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`

### 7.3 `Variant` (PDP variant selector)

Required fields:
- `variantKey: VariantKey`
- `title?: string`
- `selectedOptions: { name: string, value: string }[]`
- `isAvailable: boolean`
- `price?: Money`
- `compareAtPrice?: Money`

Optional fields:
- `sku?: string` (only if safe to expose)

Rules:
- Variant availability must be expressible without leaking provider implementation details (e.g., disabled option combinations are a UI concern, not a provider API concern).

### 7.4 `ProductDetail` (PDP)

Required fields:
- `productKey: ProductKey`
- `handle: string`
- `title: string`
- `description?: { html?: string, markdown?: string }`
- `images?: Image[]`
- `variants: Variant[]`

Optional fields:
- `options?: { name: string, values: string[] }[]` (if needed for UI rendering)

### 7.5 `CartLine` (cart lines editor)

Required fields:
- `cartLineKey: CartLineKey`
- `quantity: number`
- `product: { productKey: ProductKey, handle?: string, title: string }`
- `variant: { variantKey: VariantKey, title?: string, selectedOptions?: { name: string, value: string }[] }`
- `image?: Image`
- `pricing?: { unitPrice?: Money, lineTotal?: Money }`

### 7.6 `Cart` (cart fetch/create)

Required fields:
- `cartKey: CartKey`
- `lines: CartLine[]`
- `totals?: { subtotal?: Money, tax?: Money, total?: Money }`
- `checkout?: { href: string }`

Rule:
- `checkout.href` must be safe for a swappable UI to follow without “knowing Shopify domains”; prefer same-origin proxy/handoff routes when applicable.

### 7.7 URL-synced state (filters/pagination)

Guideline:
- Storefront filtering/pagination state should be expressed in URL query params (or an equivalent shareable state container), and treated as a reusable primitive (not page glue).  
  Evidence: `artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`
