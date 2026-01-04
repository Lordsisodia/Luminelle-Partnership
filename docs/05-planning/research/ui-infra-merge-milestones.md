# UI ↔ Infra Merge Milestones (Stop points → tickets)

This turns the “stop points” into an actionable checklist you can use to stop/resume work safely.

Stop points source:
- `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/stop-points-and-risks.md`

Ticket sources:
- `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- `docs/05-planning/research/ui-infra-ticket-backlog.md`

---

## Stop 1 — Contracts landed (no runtime wiring)

Maps to:
- Week 1 Ticket 01 (contracts): `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Backlog A03 (ports v1): `docs/05-planning/research/ui-infra-ticket-backlog.md`

Merge checks:
- Port interfaces + DTOs exist and compile.
- DTOs have no Shopify GIDs as primary keys.
- `PortError` exists with stable `code` values.
- No consumers changed yet.

---

## Stop 2 — Platform entrypoints exist (factory + env policy)

Maps to:
- Week 1 Ticket 02 (platform entrypoint): `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Backlog A04 (entrypoints): `docs/05-planning/research/ui-infra-ticket-backlog.md`

Merge checks:
- Exactly one adapter selection point per area (commerce/content).
- Dev-vs-prod policy is enforced in the entrypoint:
  - dev can mock when not configured,
  - prod throws `PortError('NOT_CONFIGURED')`.
- UI does not read `shopifyEnabled`.

---

## Stop 3 — Shopify adapters implement ports (no consumers migrated)

Maps to:
- Week 1 Ticket 03 (Shopify adapters behind ports): `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Backlog B01–B04 (Shopify wrappers): `docs/05-planning/research/ui-infra-ticket-backlog.md`

Merge checks:
- Adapters return DTOs (no Shopify response types leak).
- Checkout returns first-party proxy/handoff URLs when capability exists.
- Errors use `PortError` codes (not generic string errors).

---

## Stop 4 — `src/lib/product.ts` migrated behind `CatalogPort`

Maps to:
- Week 1 Ticket 04: `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Backlog C01: `docs/05-planning/research/ui-infra-ticket-backlog.md`

Merge checks:
- `src/lib/product.ts` has no `@platform/commerce/shopify` imports.
- `CatalogPort` covers default variant behavior (`defaultVariantKey`).

---

## Stop 5 — `src/lib/sections.ts` migrated behind `ContentPort`

Maps to:
- Week 1 Ticket 05: `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Backlog C02: `docs/05-planning/research/ui-infra-ticket-backlog.md`

Merge checks:
- `src/lib/sections.ts` has no direct Storefront/metaobject queries.
- `SectionsDTO` is stable and adapter-owned (`schemaVersion`).

---

## Stop 6 — Cart provider migrated behind `CartPort`

Maps to:
- Backlog C03 (cart provider): `docs/05-planning/research/ui-infra-ticket-backlog.md`
- Backlog B02 (CartPort adapter): `docs/05-planning/research/ui-infra-ticket-backlog.md`

Merge checks:
- Cart provider imports only ports (no Shopify cart functions).
- Local persistence stores `CartDraftDTO` (not Shopify cart ID or variant GIDs).
- Cart behavior unchanged for end users.

---

## Stop 7 — Checkout UX de-vendorized + generic handoff surface

Maps to:
- Backlog D01 (copy de-vendorize): `docs/05-planning/research/ui-infra-ticket-backlog.md`
- Backlog “handoff route vendor-agnostic” (see migration checklist step 7): `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/migration-checklist.md`

Merge checks:
- UI copy has no “Shopify checkout…” strings.
- Checkout navigation uses `CheckoutPort.beginCheckout()` only.
- `/cart/c/*` links still work; component/page naming is generic.

---

## Stop 8 — Vendor IDs removed from UI/config (internal keys everywhere)

Maps to:
- Backlog D02 (remove GIDs): `docs/05-planning/research/ui-infra-ticket-backlog.md`
- Backlog A01 (key strategy): `docs/05-planning/research/ui-infra-ticket-backlog.md`

Merge checks:
- No `gid://shopify/...` in UI providers or client config.
- Variant mapping table exists in adapter layer and throws `PortError('NOT_FOUND')` when missing.

