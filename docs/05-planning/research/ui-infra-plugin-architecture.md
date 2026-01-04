# UI ↔ Infrastructure Plug‑In Architecture (Shopify now, Stripe later)

Scope: **read-only architecture research** (no code changes in this run).

Source run folder:
- `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`

## 1) What we’re solving

We want a design where:
- UI components are interchangeable (swappable UI / themes / surface components)
- Commerce infrastructure is a plug-in (Shopify today, Stripe later)
- UI never needs to import vendor-specific code, vendor IDs, or vendor copy

## 2) What’s true in the current codebase (evidence)

The repo already has the right *shape* (ports + runtime entrypoints exist), but there are still **leaks** where UI/client code contains vendor IDs or vendor-specific copy.

Primary coupling points (see also `artifact-map.md` and `artifacts/sources.md`):
- `src/domains/platform/commerce/runtime.ts` — adapter selection + capability model (good)
- `src/domains/platform/commerce/ports/*` — stable contracts + DTOs (good)
- `src/domains/platform/commerce/adapters/shopify/internal-api/*` — Shopify implementation behind internal API (good)
- `src/domains/client/shop/cart/providers/CartContext.tsx` — port-driven, but still contains legacy cleanup for old Shopify GIDs/storage (expected transitional code)
- `src/ui/providers/DrawerProvider.tsx` — Shopify variant GIDs in UI/provider layer (leak)
- `src/domains/client/shop/cart/logic/volumeDiscounts.ts` — hardcoded Shopify variant IDs (leak)
- `src/domains/client/shop/products/data/product-config.ts` — fallback Shopify variant IDs in client config (leak)

Future provider note:
- Payments already show the “Stripe later” pattern:
  - `src/domains/platform/payments/runtime.ts`
  - `src/domains/platform/payments/adapters/stripe/*`

## 3) Target architecture (ports/adapters)

North star layering (imports flow top → bottom only):

1) **UI** (`src/domains/*/ui/**`, `src/ui/**`)
   - Renders view models, dispatches actions.
   - Must not import vendor adapters (Shopify/Stripe SDKs, Storefront queries, etc).

2) **Domain logic** (`src/domains/*/logic/**`, domain providers/hooks)
   - Business behavior and orchestration.
   - Depends on platform **ports** only.

3) **Platform ports (contracts)** (`src/domains/platform/**/ports/**` + stable public exports)
   - Stable interfaces + DTOs + capability flags.
   - Used by UI/domain logic.

4) **Vendor adapters** (`src/domains/platform/**/adapters/<vendor>/**`)
   - Shopify adapter today.
   - Stripe adapter later.
   - Mock adapter for dev/tests.

Key idea:
- Shopify is current backbone, but UI never knows that.
- UI knows only “checkout mode: redirect/embedded”, “provider label”, “supports discounts”, etc.

## 4) Contract catalog (ports)

Minimum ports for “UI is plug‑in”:

Full draft contracts (interfaces + DTOs + capability flags) live in:
- `ports.md`

### `CatalogPort`
- Purpose: fetch product data needed for PDP/search/upsells without Shopify GraphQL types leaking.
- Minimum methods:
  - `getProductByHandle(handle): Promise<ProductDTO>`
  - (optional) `getProductsByQuery(query): Promise<ProductDTO[]>`

### `CartPort`
- Purpose: cart state + mutations without UI depending on Shopify cart semantics.
- Minimum methods:
  - `getCart(): Promise<CartDTO>`
  - `addLine({ variantKey, qty }): Promise<CartDTO>`
  - `updateLine({ lineKey, qty }): Promise<CartDTO>`
  - `removeLine({ lineKey }): Promise<CartDTO>`
  - optional: `applyDiscount(code)`, `setBuyerIdentity(email)`, `setAttributes(attrs)`

### `CheckoutPort`
- Purpose: start checkout in a vendor-agnostic way.
- Minimum methods:
  - `getCapabilities(): CheckoutCapabilities`
  - `beginCheckout(): Promise<CheckoutStart>`

### `ContentPort` (sections/content blocks)
- Purpose: landing/PDP sections not hardwired to Shopify metaobjects.
- Minimum methods:
  - `getLandingSections(): Promise<SectionsDTO>`
  - (optional) `getPdpSections(productKey): Promise<SectionsDTO>`

## 5) Capability model (so UI doesn’t hardcode Shopify)

UI must not show “Shopify checkout…” copy. It should render based on capabilities.

Example shape (design only):
- `CheckoutCapabilities`:
  - `mode: "redirect" | "embedded" | "none"`
  - `providerLabel?: string` (e.g. “Secure checkout” or “Secure checkout (Shopify)” if you want it visible)
  - `supportsDiscounts: boolean`
  - `supportsBuyerIdentity: boolean`
  - `handoff?: { routes: string[] }` — optional vendor-agnostic “checkout link handling” routes (in this repo: `'/cart/c/*'`, `'/checkouts/*'`)

Default behavior:
- If `CheckoutCapabilities.handoff` exists, `CheckoutPort.beginCheckout()` should return a **first-party** URL whenever possible (proxy/handoff), so UI never needs to know vendor hostnames or vendor route rules.

## 6) Dependency rules (import policy)

Enforce these rules to enable interchangeability:
- UI/domain code must not import `@platform/commerce/shopify/*` directly.
- UI must not embed vendor IDs (e.g. Shopify `gid://shopify/...`) as primary identifiers.
- Vendor-specific copy is not hardcoded in UI; copy is generic + optional provider label from capabilities.
- UI must not hardcode vendor checkout link routes; treat any proxy/handoff routes as a capability (`CheckoutCapabilities.handoff`).
- Domain logic consumes ports; adapters consume vendors.

## 7) Migration plan (high-level)

See `rankings.md` for prioritized steps. Given current reality (ports/runtime already exist), the key sequencing principle is:
1) Remove vendor IDs from UI + client config (internal keys only)
2) De-vendorize checkout UX copy (capability-driven)
3) Audit and clean any remaining legacy boundaries (`src/lib/*`, transitional migration logic)

## 8) Handoff (what to do next when code changes are allowed)

Week 1 (first implementation sprint):
1) Add port interfaces + DTOs in platform (no adapter swap yet).
2) Create a “shopify adapter implements ports” layer (thin wrapper around existing Shopify code).
3) Change a single consumer at a time (start with `src/lib/product.ts` and `src/lib/sections.ts`).

Avoid:
- Ports that mirror Shopify GraphQL responses (you’ll bake in vendor assumptions).
- UI storing Shopify GIDs as its core identifiers.
- Sprinkling `shopifyEnabled` checks throughout UI—centralize capability checks in the platform entrypoint.

Stripe later:
- Implement the same ports for Stripe (or Stripe+internal checkout), and keep UI driven by capabilities.

## 9) Decision log (2025-12-28)

These decisions exist to keep the UI **plug‑in friendly** while keeping Shopify (and later Stripe) **swappable**.

1) **Architecture: ports/adapters (hexagonal)**
   - Decision: UI + domain logic depend only on internal ports + DTOs.
   - Why: prevents “vendor creep” where Shopify/Stripe code leaks into UI and blocks interchangeability.

2) **UI behavior switches on `CheckoutCapabilities`, not vendor flags**
   - Decision: UI renders based on capabilities (`mode`, `supportsDiscounts`, optional `providerLabel`) instead of `shopifyEnabled` checks or Shopify‑named routes/pages.
   - Why: makes “Shopify redirect now, Stripe embedded later” a configuration/adaptor swap, not a UI rewrite.

3) **Internal keys are the currency above adapters**
   - Decision: UI/config uses internal keys (e.g. `VariantKey`) rather than Shopify GIDs.
   - Why: vendor IDs are not stable “product language” for the UI; adapters own mapping to/from vendor identifiers.
   - Implementation note: `docs/05-planning/research/ui-infra-key-mapping-strategy.md`

4) **Checkout uses first-party proxy/handoff URLs when available**
   - Decision: `CheckoutPort.beginCheckout()` prefers returning a first-party proxy/handoff URL (vs a vendor URL) when `CheckoutCapabilities.handoff` exists.
   - Why: keeps vendor hostnames and route rules out of the UI, and matches the repo’s existing server-side checkout proxying.

5) **Ports are implemented via internal API by default**
   - Decision: `CatalogPort`, `ContentPort`, `CartPort`, and `CheckoutPort` should default to calling internal HTTP endpoints (functions), not direct client Storefront calls.
   - Why: maximizes UI interchangeability and keeps vendor tokens/endpoints out of UI; also matches existing infra reality (checkout proxy already lives server-side).

Execution-ready breakdown:
- `docs/05-planning/research/ui-infra-ticket-backlog.md`

## 10) Artifacts (paths)

- Plan folder: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`
- Key outputs:
  - `final-report.md` — architecture + port catalog + rules + handoff
  - `artifact-map.md` — coupling inventory + evidence
  - `rankings.md` — ranked migration steps
  - `artifacts/sources.md` — concrete repo paths referenced
  - `artifacts/summary.md` — 1-page skim
