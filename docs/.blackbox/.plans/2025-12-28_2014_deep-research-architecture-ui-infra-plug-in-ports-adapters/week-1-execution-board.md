# Week 1 Execution Board (no behavior change goal)

This turns the architecture work into an actionable 5–10 ticket sprint plan.

Primary goal for Week 1:
- Finish de-coupling by removing remaining vendor IDs/copy from UI + client config **without changing behavior**.
- End week with one “high-leverage leak fixed” (recommended: remove `gid://shopify/...` from `DrawerProvider` + config by introducing internal keys or a mapping layer).

Run folder (source of truth):
- `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`

Contracts reference:
- Plan-local contract draft: `ports.md`
- Existing code contracts: `src/domains/platform/commerce/ports/*`

## Ticket 01 — Verify/lock contract surfaces (ports + DTOs)

**Goal:** Confirm current contracts are sufficient and vendor-agnostic; document any deltas.

Files to review:
- `src/domains/platform/commerce/ports/catalog.ts`
- `src/domains/platform/commerce/ports/cart.ts`
- `src/domains/platform/commerce/ports/checkout.ts`
- Platform content ports / runtime (verify ContentPort paths)

Acceptance checks:
- No imports from `@platform/commerce/shopify/*` inside these port files.
- DTOs do not contain Shopify IDs as primary keys (`gid://shopify/...`).
- Capability model exists for checkout (`CheckoutCapabilities`).

## Ticket 02 — Verify runtime entrypoint (adapter selection + capabilities)

**Goal:** Keep “provider selection” centralized and keep UI driven by capabilities (not vendor branching).

Files to review:
- `src/domains/platform/commerce/runtime.ts` (mock vs real behavior)
- `src/domains/platform/commerce/index.ts` (exports)

Acceptance checks:
- UI/domain code does not need to read `shopifyEnabled` directly.
- There is exactly one adapter selection point (centralized).
- Define dev fallback behavior (mock) vs prod failure behavior.

## Ticket 03 — Verify Shopify adapter is truly behind ports

**Goal:** Use existing Shopify code as vendor-specific implementation, but expose only ports to consumers.

Existing adapter implementation:
- `src/domains/platform/commerce/adapters/shopify/internal-api/*`

Proposed wrapper location (choose one):
- Option A: `src/domains/platform/commerce/adapters/shopify/*`
- Option B: keep in `platform/commerce/shopify/*` but export only through port entrypoints

Acceptance checks:
- UI/domain imports `commerce` from `@platform/commerce`, not adapter paths.
- Adapter hides vendor IDs and vendor routes as much as possible.

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

## Ticket 06 — Audit + migrate shared libs behind ports (if still leaking)

**Goal:** Ensure `src/lib/*` does not contain vendor queries or vendor types that leak into UI.

Targets:
- `src/lib/product.ts`
- `src/lib/sections.ts`

Acceptance checks:
- Shared libs either consume ports/runtime or move into platform domains.
- No vendor-specific GraphQL types/queries are exposed to UI from shared libs.

## Ticket 07 — Checkout handoff UX stays capability-driven

**Goal:** Keep handoff routing/copy generic and driven by `CheckoutPort.getCapabilities()`.

Targets:
- `src/domains/client/shop/cart/ui/pages/CheckoutHandoffPage.tsx`
- `src/App.tsx` route wiring (keep `/cart/c/*` but avoid vendor naming/copy)

Acceptance checks:
- Handoff page copy does not mention a vendor by default.
- Any vendor guidance is conditional + capability-driven (or moved to docs ops).

## Ticket 08 — Docs + guardrails

**Goal:** Make this architecture discoverable and hard to regress.

Docs:
- Promote a cleaned-up version of this plan’s `final-report.md` into visible docs (when ready).

Guardrails (optional):
- Add a grep/check step to CI later: forbid `@platform/commerce/shopify` imports in UI/domain folders.

Acceptance checks:
- Docs ledger has an entry pointing to the canonical docs + this run folder.
