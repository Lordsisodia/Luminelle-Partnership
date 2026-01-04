# Status (frequently updated)

## Timestamp
2025-12-29 12:35

## Phase
explore → exploit (baseline captured, plan drafted)

## What changed since last update
- Captured baseline vendor leak scan under `artifacts/`.
- Added a dedicated agent cycle and RUN-NOW instructions to make this work repeatable.
- Updated vendor leak checker to treat the CartContext legacy cleanup match as allowed (doesn’t block `--fail`).

## Next actions (1–3)
1) Replace Shopify GIDs in UI/provider upsells (`DrawerProvider`) with `VariantKey` (encoded) values.
2) Replace Shopify GIDs in client config (`product-config.ts`) with `VariantKey` values (rename fields if needed).
3) Replace Shopify GID constant in `volumeDiscounts.ts` with `VariantKey` and ensure call sites pass keys not GIDs.

## Pointers
- Plan folder: `docs/.blackbox/.plans/2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids`
- Rankings: `rankings.md`
- Artifact map: `artifact-map.md`
 - Run now: `RUN-NOW.md`
 - Agent cycle: `agent-cycle.md`
