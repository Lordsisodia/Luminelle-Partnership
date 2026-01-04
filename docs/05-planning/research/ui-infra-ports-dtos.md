# Ports + DTOs (draft contract catalog)

Source run folder:
- `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`

This file is a **design-only** contract catalog for making UI interchangeable and infra (Shopify now, Stripe later) plug-in.

Principles:
- UI and client-domain logic depend only on these ports + DTOs.
- Vendor adapters implement the ports.
- DTOs are internal: no Shopify GraphQL response types, no Shopify GIDs as primary UI identifiers.

## Common primitives

### Keys (avoid vendor IDs in UI)

Use internal keys everywhere above the adapter layer:

- `ProductKey` — stable internal key (`"shower-cap"` / `"heatless-curler"` / etc.)
- `VariantKey` — stable internal key (`"shower-cap.default"` / `"heatless-curler.pink"` / etc.)
- `CartKey` — stable internal cart identifier (opaque)
- `CartLineKey` — stable internal line identifier (opaque)

Adapters map:
- `VariantKey` ⇄ Shopify GID (`gid://shopify/ProductVariant/...`)
- `CartKey` ⇄ Shopify cart ID

### Money

```ts
export type MoneyDTO = {
  amount: number
  currencyCode: string
}
```

### Result / error semantics (suggested)

Ports should throw typed errors (or return `Result<T>`). Keep it simple initially:
- throw `Error` with stable `code` property for UI decisions.

Recommended minimal error shape:

```ts
export type PortErrorCode =
  | 'NOT_CONFIGURED'     // provider not set up in this environment (e.g. missing env vars)
  | 'UNAVAILABLE'        // transient outage, network, provider down
  | 'NOT_FOUND'          // requested resource doesn't exist (e.g. product handle)
  | 'INVALID_INPUT'      // validation error (bad handle, qty, etc.)
  | 'RATE_LIMITED'       // upstream throttled
  | 'UNKNOWN'            // fallback

export class PortError extends Error {
  code: PortErrorCode
  cause?: unknown
  details?: Record<string, unknown>

  constructor(code: PortErrorCode, message: string, opts?: { cause?: unknown; details?: Record<string, unknown> }) {
    super(message)
    this.name = 'PortError'
    this.code = code
    this.cause = opts?.cause
    this.details = opts?.details
  }
}
```

Operational rules:
- **UI must not branch on `shopifyEnabled`** (or any vendor flag). UI reacts to `PortError.code` instead.
- **Dev**: a `NOT_CONFIGURED` error can be handled by using a mock adapter (or showing a clear dev-only banner).
- **Prod**: `NOT_CONFIGURED` should be considered a deploy/config error and surface a clear fallback UX.

Adapter selection rule (important):
- **Only** the platform entrypoint chooses between real vs mock adapters (based on env + config presence).
- UI/domain code must never “try Shopify, else fallback” — that logic belongs below the port boundary.

## `CatalogPort`

Purpose: fetch product information (PDP, upsells, search results) without vendor coupling.

```ts
export type ProductVariantDTO = {
  variantKey: VariantKey
  title?: string
  available?: boolean
  unitPrice: MoneyDTO
  compareAt?: MoneyDTO
}

export type ProductDTO = {
  productKey: ProductKey
  handle?: string // optional convenience; often aligns with Shopify handle today
  title: string
  description?: string
  images: string[]
  /**
   * The preferred/default variant the UI should use for “quick add” or a single-variant product.
   * This exists because the current code path selects `variants.nodes[0]` as the default.
   */
  defaultVariantKey?: VariantKey
  variants: ProductVariantDTO[]
}

export interface CatalogPort {
  getProductByHandle(handle: string): Promise<ProductDTO>
  // optional expansion:
  // searchProducts(query: string): Promise<ProductDTO[]>
}
```

Notes:
- UI never needs Shopify product IDs.
- `handle` can remain a Shopify concept initially, but can be translated to internal `ProductKey` later.
- DTOs must not expose Shopify GIDs; adapters map to internal keys.

## `CartPort`

Purpose: cart state + mutations without UI depending on Shopify cart semantics.

```ts
export type CartDraftDTO = {
  /**
   * Draft lines represent “what the user intends to buy” and are safe to persist in UI storage
   * (localStorage) without vendor IDs.
   */
  lines: Array<{ variantKey: VariantKey; qty: number }>
  discountCode?: string
  buyerEmail?: string
  attributes?: Record<string, string>
}

export type CartLineDTO = {
  lineKey: CartLineKey
  variantKey: VariantKey
  title: string // display title (product + variant if needed)
  productTitle?: string
  variantTitle?: string
  qty: number
  unitPrice: MoneyDTO
  compareAt?: MoneyDTO
  image?: string
  lineSubtotal?: MoneyDTO // optional; if absent UI can compute from unitPrice * qty
}

export type CartDTO = {
  cartKey: CartKey
  lines: CartLineDTO[]
  subtotal: MoneyDTO
  currencyCode?: string // optional convenience (should match MoneyDTO currencyCode)
  discountCodes?: string[]
}

export interface CartPort {
  /**
   * Returns the current cart state (or throws a typed “not configured / unavailable” error).
   */
  getCart(): Promise<CartDTO>

  /**
   * Converts a persisted “draft” into a real provider cart.
   *
   * This exists because the current codebase persists items locally and then:
   * - rehydrates a provider cart using a persisted provider cart id, or
   * - creates a cart from the local items if no provider cart exists.
   *
   * With ports, UI should not implement vendor branching or cart creation rules.
   */
  syncFromDraft?(draft: CartDraftDTO): Promise<CartDTO>

  addLine(input: { variantKey: VariantKey; qty: number }): Promise<CartDTO>
  updateLine(input: { lineKey: CartLineKey; qty: number }): Promise<CartDTO>
  removeLine(input: { lineKey: CartLineKey }): Promise<CartDTO>

  applyDiscount?(code: string): Promise<CartDTO>
  setBuyerIdentity?(input: { email?: string }): Promise<CartDTO>
  setAttributes?(attrs: Record<string, string>): Promise<CartDTO>
}
```

Notes:
- Checkout should be driven through `CheckoutPort` instead of storing raw provider checkout URLs in UI state (e.g. `checkoutUrl`).
- `syncFromDraft` is optional for v1, but is the cleanest place to hide “rehydrate vs create cart” logic and remove `shopifyEnabled` branching from UI providers.

## `CheckoutPort`

Purpose: make checkout UX vendor-agnostic (Shopify redirect now; embedded later).

```ts
export type CheckoutHandoffCapabilities = {
  /**
   * If present, the runtime supports handling “vendor checkout links” via
   * first-party routes (proxy/handoff), so the UI doesn’t need to know vendor paths.
   *
   * Examples in this repo today:
   * - `/cart/c/*`
   * - `/checkouts/*`
   */
  routes: string[]
}

export type CheckoutCapabilities = {
  mode: 'redirect' | 'embedded' | 'none'
  providerLabel?: string // e.g. "Secure checkout" or "Secure checkout (Shopify)" if desired

  supportsDiscounts: boolean
  supportsBuyerIdentity: boolean

  /**
   * Optional: if checkout uses a proxy/handoff route mechanism, expose it here so:
   * - UI can keep vendor-named pages/routes out of user-facing components, and
   * - UI can offer safe recovery (“Paste your checkout link here”) without hardcoding Shopify.
   */
  handoff?: CheckoutHandoffCapabilities
}

export type CheckoutStart =
  | { mode: 'redirect'; url: string }
  | { mode: 'embedded'; sessionToken: string }
  | { mode: 'none'; reason: string }

export type CheckoutStateDTO = {
  status: 'idle' | 'preparing' | 'ready' | 'error'
  message?: string // UI-friendly
}

export interface CheckoutPort {
  getCapabilities(): CheckoutCapabilities
  beginCheckout(): Promise<CheckoutStart>
}
```

Notes:
- UI strings like “Preparing Shopify checkout…” become “Preparing checkout…” plus optional provider label.
- `CheckoutStart.url` can be either:
  - a vendor URL (direct redirect), or
  - a first-party proxy/handoff route.

Default policy (recommended):
- If `capabilities.handoff` is present, prefer returning a **first-party proxy/handoff URL** from `beginCheckout()` so UI never needs vendor hostnames or vendor route knowledge.
- Only return a vendor URL directly when handoff is not available (or explicitly disabled).

## `ContentPort`

Purpose: sections/content blocks not hardwired to Shopify metaobjects (today) or CMS/Supabase (later).

```ts
export type SectionsDTO = {
  /**
   * Optional metadata so adapters can evolve their internal storage (Shopify metaobjects, CMS, etc.)
   * without requiring UI changes.
   */
  schemaVersion?: string
  updatedAt?: string

  heroSubtitle?: string
  essentials?: { title: string; body: string }[]
  reasons?: { title: string; desc: string }[]
  how?: string[]
  care?: { icon?: string; title: string; body: string }[]
  faq?: { q: string; a: string }[]
  gallery?: string[]
}

export interface ContentPort {
  getLandingSections(): Promise<SectionsDTO>
  // optional:
  // getPdpSections(productKey: ProductKey): Promise<SectionsDTO>
}
```

Notes:
- `ContentPort` must hide vendor-specific content storage details (e.g. Shopify metaobject handles/types such as `hero_section`, `care_section`, etc.).
- `schemaVersion` lets the adapter change those details without UI breakage.

## Adapter selection (design)

Design target:
- A single platform entrypoint chooses adapters once (based on env/config) and exports port instances:

```ts
export const commerce = {
  catalog: CatalogPort,
  cart: CartPort,
  checkout: CheckoutPort,
}
export const content = {
  sections: ContentPort,
}
```

Adapters:
- Shopify implements all commerce ports now.
- Stripe can implement `CheckoutPort` first later, while Shopify remains system of record for catalog.
