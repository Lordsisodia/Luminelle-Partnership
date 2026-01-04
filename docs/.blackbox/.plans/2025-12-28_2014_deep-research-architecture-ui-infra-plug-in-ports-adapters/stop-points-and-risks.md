# Stop Points + Risks (migration safety plan)

This file defines **safe intermediate states** (“stop points”) and **risk/mitigation notes** for the migration from:

- UI + shared libs importing Shopify directly
→ **UI depends only on ports**
→ Shopify/Stripe behind adapters

Scope: planning only (no code changes performed here).

Primary references:
- `migration-checklist.md`
- `artifact-map.md` (leaks)
- `ports.md` (contracts)
- `docs/05-planning/research/ui-infra-ticket-backlog.md` (ticket breakdown)

---

## Stop points (safe intermediate states)

Each stop point is designed to be “mergeable” and reversible, with a clear done check.

### Stop 0 — Baseline (today)

Definition:
- No behavior change; current Shopify coupling exists (UI copy, Shopify GIDs, `shopifyEnabled` checks).

Done checks:
- None; this is just the starting point.

### Stop 1 — Contracts landed (no runtime wiring)

Definition:
- Ports + DTOs exist as types/interfaces only.
- No consumer changes yet.

Why it’s safe:
- Pure additive change; zero runtime behavior change.

Done checks:
- Contracts compile and are referenced by at least one trivial type-only import.
- No UI imports changed yet.

### Stop 2 — Platform entrypoints exist (factory + env policy), still no consumer changes

Definition:
- `@platform/commerce` + `@platform/content` expose ports.
- Entry point owns:
  - adapter selection,
  - dev-vs-prod policy (mock vs `PortError('NOT_CONFIGURED')`),
  - capability defaults.

Why it’s safe:
- Still no UI behavior changes; only centralizes configuration.

Done checks:
- No UI reads `shopifyEnabled` for configuration decisions.
- Entry point is the only place where “real vs mock” is chosen.

### Stop 3 — Shopify adapters implement ports (still no consumer migrations)

Definition:
- Shopify implementations exist behind ports.
- They may delegate to existing Shopify modules or internal API endpoints.

Why it’s safe:
- Can be validated with direct calls/tests without touching UI consumers.

Done checks:
- Ports return stable DTOs (no Shopify types leak).
- Errors throw `PortError` codes (not generic strings).

### Stop 4 — First consumer migration: `src/lib/product.ts` behind `CatalogPort`

Definition:
- Product fetching no longer imports Shopify Storefront directly.
- `CatalogPort` provides product DTOs with `defaultVariantKey`.

Why it’s safe:
- Narrow blast radius; product page can be validated quickly.

Done checks:
- `src/lib/product.ts` no longer imports `@platform/commerce/shopify`.
- Product page renders with correct default variant behavior.

### Stop 5 — Second consumer migration: `src/lib/sections.ts` behind `ContentPort`

Definition:
- Sections/metaobject querying no longer lives in `src/lib/*`.

Why it’s safe:
- Landing page can validate quickly; content DTO is stable.

Done checks:
- `src/lib/sections.ts` no longer runs Storefront queries directly.
- Landing sections render correctly.

### Stop 6 — Cart provider migration: `CartContext` uses `CartPort` (vendor-free UI)

Definition:
- `CartContext` no longer imports Shopify cart functions or `shopifyEnabled`.
- Local persistence uses `CartDraftDTO`, not Shopify IDs.

Why it’s safe:
- Contains the largest coupling reduction, but stays reversible because UI still persists a draft.

Done checks:
- No `@platform/commerce/shopify/*` imports in cart provider.
- Cart still supports: add/update/remove, discount codes, attributes, email.

### Stop 7 — Checkout UX de-vendorized + handoff routed via `CheckoutPort`

Definition:
- UI copy is generic (“Preparing checkout…”).
- Checkout navigation uses `CheckoutPort.beginCheckout()` (first-party URL preferred).
- `CheckoutHandoffPage` stays generic (route may remain `/cart/c/*` for compatibility).

Why it’s safe:
- Preserves existing deep links while removing vendor naming from UI code.

Done checks:
- UI has no “Shopify checkout…” strings.
- Existing `/cart/c/*` links still work (proxy or fallback).

### Stop 8 — Vendor IDs removed from UI/config (internal keys everywhere)

Definition:
- No Shopify GIDs in UI/provider/config/constants.
- Internal keys (`VariantKey`) are the currency above adapters.

Why it’s safe:
- Finalizes swap-ability; at this point vendors can change with minimal UI impact.

Done checks:
- No `gid://shopify/...` strings in UI/config.
- Adapter mapping covers all required variants.

---

## Risks + mitigations

### Risk: checkout link routing / proxy loops

Symptoms:
- Checkout loads blank, loops, or redirects back to the SPA.

Mitigations:
- Prefer first-party proxy/handoff URLs returned from `CheckoutPort.beginCheckout()`.
- Keep `/cart/c/*` and `/checkouts/*` handlers as infra (“capability”), not UI logic.
- Ensure upstream host config is validated and errors are user-friendly.

### Risk: breaking persistence during cart migration

Symptoms:
- Users lose cart contents after deploy; cart duplicates lines; discounts disappear.

Mitigations:
- Migrate local storage from “Shopify cart id” to `CartDraftDTO` gradually:
  - read old keys once, translate, then remove old keys.
- Keep `syncFromDraft` optional but implement early.

### Risk: key mapping failures (VariantKey ↔ vendor ID)

Symptoms:
- Add-to-cart fails; wrong variant added; volume discounts misapply.

Mitigations:
- Maintain a single mapping table in the adapter layer.
- On missing mapping, throw `PortError('NOT_FOUND')` with details.

### Risk: SEO / analytics impact from route changes

Symptoms:
- Checkout links or marketing campaigns break; analytics lose continuity.

Mitigations:
- Keep legacy routes as aliases and redirect to generic page names.
- Preserve existing link patterns (`/cart/c/*`) while renaming the component/page internally.

### Risk: inconsistent currency/price formatting

Symptoms:
- UI shows incorrect currency or totals across pages.

Mitigations:
- Ensure DTOs always include currency in `MoneyDTO`.
- Prefer computing totals consistently in the adapter (or always in UI, but choose one).

### Risk: “dev fallback” creeping into prod

Symptoms:
- Production silently uses mock adapter and hides real config errors.

Mitigations:
- Platform entrypoint enforces:
  - dev: mock allowed,
  - prod: `NOT_CONFIGURED` error is thrown.
- Add a single place to determine “prod vs dev” and test it.
