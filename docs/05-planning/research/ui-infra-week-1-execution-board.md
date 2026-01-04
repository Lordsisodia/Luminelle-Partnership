# Week 1 Execution Board (no behavior change goal)

This turns the architecture work into an actionable 5–10 ticket sprint plan.

Canonical source run folder:
- `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`

Primary goal for Week 1:
- Finish de-coupling by removing remaining vendor IDs/copy from UI + client config **without changing behavior**.
- End week with one “high-leverage leak fixed” (recommended: remove `gid://shopify/...` literals from UI/provider + client config via internal keys and adapter-side mapping).

Run folder (source of truth):
- `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`

Contracts reference:
- `docs/05-planning/research/ui-infra-ports-dtos.md`
- Key-mapping strategy (remove vendor IDs from UI/config):
  - `docs/05-planning/research/ui-infra-key-mapping-strategy.md`

## Ticket 01 — Add contract surfaces (ports + DTOs)

**Goal:** Verify current contracts are sufficient and vendor-agnostic; document any deltas.

Files to review:
- `src/domains/platform/commerce/ports/catalog.ts`
- `src/domains/platform/commerce/ports/cart.ts`
- `src/domains/platform/commerce/ports/checkout.ts`
- Platform content ports/runtime (verify ContentPort paths)

Acceptance checks:
- No imports from vendor adapters inside port files.
- DTOs do not contain Shopify IDs as primary keys (`gid://shopify/...`).
- Capability model exists for checkout (`CheckoutCapabilities`) and includes vendor-agnostic handoff/proxy routes (for this repo: `'/cart/c/*'`, `'/checkouts/*'`).
- Cart contracts include a path to remove UI vendor branching:
  - `CartPort.syncFromDraft` (optional) captures “rehydrate vs create cart” logic behind ports.
- Catalog contracts include a default variant concept (so UI doesn’t replicate “first variant” logic) and never return vendor IDs.
- Content contracts explicitly allow adapter storage changes behind a stable `SectionsDTO` (e.g. `schemaVersion`), so Shopify metaobject naming isn’t a UI concern.
- Error semantics are explicit: ports throw a stable `PortError` with a `code` (e.g. `NOT_CONFIGURED`, `NOT_FOUND`), so UI never branches on `shopifyEnabled`.

## Ticket 02 — Add a platform entrypoint (adapter factory design)

**Goal:** Keep provider selection centralized and UI driven by capabilities (not vendor branching).

Files to review:
- `src/domains/platform/commerce/runtime.ts`
- `src/domains/platform/commerce/index.ts`

Acceptance checks:
- UI/domain code does not need to read `shopifyEnabled` directly.
- There is exactly one adapter selection point (centralized).
- Define dev fallback behavior (mock) vs prod failure behavior.
- Default behavior: ports are backed by internal API (functions) so UI stays vendor-token free; client Storefront calls are only used as an explicit escape hatch.
- Environment policy is explicit and enforced in the entrypoint:
  - Dev: allow mock adapters when not configured.
  - Prod: throw `PortError('NOT_CONFIGURED')` (no silent fallback).

## Ticket 03 — Implement Shopify adapter wrappers *behind* ports (no consumers changed yet)

**Goal:** Verify Shopify implementation is fully behind ports (and internal API is the default boundary).

Existing adapter implementation:
- `src/domains/platform/commerce/adapters/shopify/internal-api/*`

Acceptance checks:
- UI/domain imports `commerce` from `@platform/commerce`, not adapter paths.
- Adapter owns vendor ID mapping (Shopify GIDs never escape upward).

## Ticket 04 — Remove vendor IDs from UI/provider (highest leverage)

**Goal:** Eliminate `gid://shopify/...` literals from UI/provider code.

Target file:
- `src/ui/providers/DrawerProvider.tsx`

Approach:
- Replace Shopify GID literals with internal keys/config (e.g. `VariantKey`) and let platform adapter resolve.

Acceptance checks:
- No `gid://shopify/...` values remain in `DrawerProvider`.
- Cart seed/add uses `VariantKey` (or another internal identifier), not Shopify GIDs.

## Ticket 05 — Remove vendor IDs from client config/logic

**Goal:** Remove vendor IDs from client config and client domain logic.

Targets:
- `src/domains/client/shop/products/data/product-config.ts`
- `src/domains/client/shop/cart/logic/volumeDiscounts.ts`

Acceptance checks:
- No `gid://shopify/...` literals remain in these config/logic files.
- Mapping responsibility is explicit (platform adapter, or a config resolver at platform boundary).

## Ticket 06 — Audit legacy shared libs (only if still leaking)

**Goal:** Ensure `src/lib/*` does not contain vendor queries or leak vendor DTOs.

Targets:
- `src/lib/product.ts`
- `src/lib/sections.ts`

Acceptance checks:
- Shared libs consume ports/runtime and do not import vendor adapters.
- Shared libs do not expose vendor IDs/types to UI.

## Ticket 07 — Checkout handoff UX stays capability-driven

**Goal:** Keep handoff routing/copy generic and driven by `CheckoutPort.getCapabilities()`.

Targets:
- `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
- `src/App.tsx` route wiring (`/cart/c/*`)

Acceptance checks:
- Handoff page copy does not mention a vendor by default.
- Any vendor guidance is conditional + capability-driven (or moved to docs ops).

## Ticket 08 — Docs + guardrails

**Goal:** Make this architecture discoverable and hard to regress.

Docs:
- `docs/05-planning/research/ui-infra-plugin-architecture.md`
- `docs/05-planning/research/ui-infra-ports-dtos.md`

Guardrails (optional):
- Add a grep/check step to CI later: forbid platform adapter imports in UI/domain folders (use `npm run validate:boundaries`).

Acceptance checks:
- Docs ledger has an entry pointing to the canonical docs + this run folder.
