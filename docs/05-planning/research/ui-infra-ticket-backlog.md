# UI ↔ Infra Plug‑In Backlog (granular tickets)

This backlog breaks the “ports/adapters” architecture into **small, swappable tickets** that can be executed incrementally.

Status: **planning only** (no code changes performed as part of this doc).

## Current status snapshot (as of 2025-12-29)

Many foundational items in this backlog are already implemented in the codebase:
- Commerce runtime + ports exist under `src/domains/platform/commerce/`.
- Shopify commerce adapter exists under `src/domains/platform/commerce/adapters/shopify/internal-api/`.
- Payments already show a Stripe-ready runtime pattern under `src/domains/platform/payments/`.
- Legacy shared libs are port-driven (`src/lib/product.ts`, `src/lib/sections.ts`).

Highest-leverage remaining work (still open):
- Remove `gid://shopify/...` literals from UI/provider and client config:
  - `src/ui/providers/DrawerProvider.tsx`
  - `src/domains/client/shop/products/data/product-config.ts`
  - `src/domains/client/shop/cart/logic/volumeDiscounts.ts`
- De-vendorize checkout UX copy (capability-driven UI, no “Shopify checkout…” strings).
Related strategy note:
- `docs/05-planning/research/ui-infra-key-mapping-strategy.md`

Canonical architecture docs:
- `docs/05-planning/research/ui-infra-plugin-architecture.md`
- `docs/05-planning/research/ui-infra-ports-dtos.md`
- `docs/05-planning/research/ui-infra-week-1-execution-board.md`

Source run folder (full audit trail + artifacts):
- `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`

---

## Ticket format

Each ticket includes:
- **Goal** — what changes and why
- **Scope** — what’s in/out (keeps us from “boiling the ocean”)
- **Dependencies** — what must land first
- **Acceptance checks** — how we know it’s done
- **Estimate** — rough dev time (engineering time, not “calendar time”)

---

## Phase A — Contracts (ports + DTOs) and entrypoints

### A01 — Finalize DTO primitives and key strategy

Goal:
- Lock the internal key strategy used above adapters (`ProductKey`, `VariantKey`, `CartKey`, `CartLineKey`) so UI never stores vendor IDs.

Scope:
- Define naming scheme and examples.
- Decide where mapping lives (adapter responsibility).

Dependencies:
- None.

Acceptance checks:
- `VariantKey` scheme is documented with 5–10 real examples.
- Explicit statement exists: “Adapters own mapping between internal keys and vendor IDs.”
- Document clarifies what happens when config references a variant that no longer exists (fallback/error).

Estimate: 1–2 hours.

### A02 — Define `CheckoutCapabilities` as the single UI switchboard

Goal:
- Ensure UI decisions (“embedded vs redirect”, “supports discounts”, “provider label”) come from one capability object, not vendor branching.

Scope:
- Define the minimal required fields + default behaviors.

Dependencies:
- A01.

Acceptance checks:
- Capabilities cover today’s Shopify redirect checkout.
- Capabilities are forward-compatible with “Stripe embedded” checkout.
- Capability model includes a story for “no checkout available” (`mode: 'none'`).
- Capability model includes a vendor-agnostic “handoff/proxy route” list for this repo (at minimum `'/cart/c/*'` and `'/checkouts/*'`).

Estimate: 1–2 hours.

### A03 — Ports v1: `CatalogPort`, `CartPort`, `CheckoutPort`, `ContentPort`

Goal:
- Land the first stable “contract surface” used by UI/domain logic.

Scope:
- Interfaces + DTOs only (no implementation required to land the contracts).

Dependencies:
- A01–A02.

Acceptance checks:
- Contracts include no Shopify GraphQL response types.
- DTOs contain no `gid://shopify/...` identifiers as primary keys.
- Each port has explicit “failure mode” notes (dev vs prod).
- `CartPort` includes an explicit way to hide cart rehydration rules from UI (e.g. optional `syncFromDraft(draft)`), since current UI persists items and then creates/rehydrates a provider cart.
- `CatalogPort` returns internal product/variant keys (and a `defaultVariantKey`) rather than vendor IDs, since the current code path picks a “first variant” for quick-add.
- `ContentPort` hides Shopify metaobject handles/types and can evolve behind a `schemaVersion` field.
- Error semantics are explicit: ports throw a stable `PortError` with a `code` so UI never branches on `shopifyEnabled`.

Estimate: 3–6 hours.

### A04 — Platform entrypoints: one import per capability area

Goal:
- Provide a single consumer import path (e.g. `@platform/commerce`, `@platform/content`) so UI never reaches into vendor folders.

Scope:
- One centralized adapter selection point per domain area.

Dependencies:
- A03.

Acceptance checks:
- There is exactly one adapter-selection decision per area (commerce, content).
- UI does not need to read `shopifyEnabled` directly.
- Entrypoints export only ports (no vendor types).
- Default implementation uses internal API calls (functions) behind ports; any client Storefront usage is an explicit, measured escape hatch.
- Environment policy is centralized:
  - Dev may use mock adapters when not configured.
  - Prod must surface `PortError('NOT_CONFIGURED')` (no silent fallback).

Estimate: 2–4 hours.

---

## Phase B — Shopify adapter wrappers (behind ports)

### B01 — Shopify `CatalogPort` adapter wrapper (thin)

Goal:
- Wrap the existing Shopify product fetch logic behind `CatalogPort` without changing behavior.

Scope:
- Adapter implementation only.

Dependencies:
- A03–A04.

Acceptance checks:
- Adapter compiles without exporting Shopify types outside the adapter.
- Adapter maps Shopify product IDs/variant IDs → internal keys.

Estimate: 2–4 hours.

### B02 — Shopify `CartPort` adapter wrapper (delegate to existing cart code)

Goal:
- Expose cart behavior only through `CartPort` methods.

Scope:
- Delegate to existing Shopify cart implementation where possible.

Dependencies:
- A03–A04, B01 (for shared key mapping).

Acceptance checks:
- No UI/provider imports Shopify cart adapter directly once consumers migrate (see Phase C).
- Adapter owns mapping between internal `CartLineKey` and vendor line IDs.

Estimate: 2–4 hours.

### B03 — Shopify `CheckoutPort` adapter wrapper (capability-driven)

Goal:
- Centralize checkout handling and vendor copy behind capabilities.

Scope:
- Provide `getCapabilities()` + `beginCheckout()` returning a redirect URL for Shopify.

Dependencies:
- A02–A04.

Acceptance checks:
- UI can display “Preparing checkout…” without vendor string literals.
- Adapter returns `mode: 'redirect'` + a URL (Shopify).
- If proxy/handoff is enabled, `beginCheckout()` may return a first-party URL (handoff route) rather than a vendor URL, so UI doesn’t need vendor hostnames.
- Default policy: when `capabilities.handoff` exists, prefer returning a first-party proxy/handoff URL from `beginCheckout()`.

Estimate: 2–3 hours.

### B04 — Shopify `ContentPort` adapter wrapper (sections/metaobjects)

Goal:
- Remove Shopify metaobject queries from shared libs by delegating to a content adapter.

Scope:
- Adapt existing “sections” queries into a stable `SectionsDTO`.

Dependencies:
- A03–A04.

Acceptance checks:
- DTO is stable and intentionally small.
- `SectionsDTO` is independent of Shopify metaobject schema naming.

Estimate: 2–5 hours.

---

## Phase C — Consumer migrations (one at a time, reversible)

### C01 — Migrate `src/lib/product.ts` to use `CatalogPort`

Goal:
- Remove Shopify imports from shared libs by routing through ports.

Scope:
- First consumer migration only (keep the surface area small).

Dependencies:
- A04, B01.

Acceptance checks:
- No `@platform/commerce/shopify/*` imports remain in `src/lib/product.ts`.
- Existing product behavior is unchanged under Shopify.
- When commerce is “not configured”, behavior is explicit (mock or clear error).

Estimate: 1–3 hours.

### C02 — Migrate `src/lib/sections.ts` to use `ContentPort`

Goal:
- Remove Shopify metaobject queries from `src/lib/*`.

Dependencies:
- A04, B04.

Acceptance checks:
- No direct Storefront execution in `src/lib/sections.ts`.
- Output DTO contract matches existing UI expectations (or intentional, documented changes).

Estimate: 2–4 hours.

### C03 — Migrate cart UI/provider to `CartPort` (remove direct Shopify adapter import)

Goal:
- Stop UI code from importing Shopify cart adapter directly.

Dependencies:
- A04, B02.

Acceptance checks:
- `src/domains/client/shop/cart/providers/CartContext.tsx` depends only on ports (not Shopify).
- Any Shopify GIDs used as constants are either removed or moved behind adapter mapping.

Estimate: 3–6 hours.

---

## Phase D — De‑vendorize UI (copy + IDs) using capabilities

### D01 — Replace “Shopify checkout” UI strings with capability-driven copy

Goal:
- UI copy becomes vendor-agnostic, with an optional provider label.

Dependencies:
- A02, B03.

Acceptance checks:
- UI text reads “Preparing checkout…” (not “Preparing Shopify checkout…”).
- If you want vendor visibility, it comes only from `providerLabel`.

Estimate: 1–3 hours.

### D02 — Remove Shopify GIDs from UI/config by switching to internal keys

Goal:
- Replace stored Shopify GIDs in UI/config/constants with internal keys that adapters map.

Dependencies:
- A01, B01/B02.

Acceptance checks:
- No Shopify GIDs remain in UI/config.
- Mapping failures have clear runtime errors + a documented recovery path.

Estimate: 3–8 hours (depends on how many references).

---

## Phase E — Future: Stripe or alternate providers (no UI changes)

### E01 — Add “Stripe checkout” adapter implementing `CheckoutPort`

Goal:
- Add Stripe checkout without UI changes (swap adapter via platform entrypoint/config).

Dependencies:
- A02–A04, and stable DTOs.

Acceptance checks:
- UI switches to embedded checkout if `CheckoutCapabilities.mode === 'embedded'`.
- Shopify can remain system of record for catalog/cart if desired.

Estimate: 1–2 days (implementation dependent).

---

## Notes: why this is “better than a fully autonomous agent”

This approach makes the **system itself** more robust than any one agent run:
- UI is swappable because it depends only on stable ports and DTOs.
- Vendors are swappable because adapters are behind a single entrypoint.
- Migration is reversible because consumers move one at a time.
- “Capabilities” prevent vendor branching and scattered config flags.
