# Plan: ui-infra key-mapping migration (remove shopify gids)

## Goal
Eliminate Shopify GIDs (`gid://shopify/...`) from UI/providers and client config by standardizing on internal keys (`VariantKey`/`ProductKey`) and resolving vendor IDs only inside platform adapters.

## Created
2025-12-29 07:41

## Target (optional)
2025-12-29 (optional): have a merge-ready implementation plan + a clean “done checklist” that drives `check-vendor-leaks.sh` to zero matches (except explicitly allowed legacy cleanup).

## Context
- This is the highest-leverage remaining coupling issue blocking “UI ↔ infra plug-in” (Shopify now, Stripe later).
- Current repo reality:
  - Commerce ports/runtime exist (UI already calls `@platform/commerce`).
  - The remaining coupling is literal vendor IDs living above the adapter boundary.

Constraints:
- Keep changes minimal and reversible.
- Don’t redesign commerce; just remove vendor identifiers from UI/config.
- Prefer a single mapping registry at the platform boundary.

Done definition:
- Running `./.blackbox/scripts/check-vendor-leaks.sh` reports **no** `gid://shopify/` matches in:
  - `src/ui/`
  - `src/domains/client/`
  - `src/lib/`
- Any remaining Shopify GID references are confined to platform adapter code (or explicit legacy migration code with a sunset plan).

## Docs To Read (and why)
- [ ] `docs/05-planning/research/ui-infra-key-mapping-strategy.md` — the target mapping strategy (single source of truth).
- [ ] `docs/.blackbox/scripts/check-vendor-leaks.sh` — how we measure “done”.
- [ ] `src/domains/platform/ports/primitives.ts` — the canonical key types (`VariantKey`, etc.).
- [ ] `src/domains/platform/commerce/adapters/shopify/internal-api/keys.ts` — where Shopify mapping/encoding happens today.
- [ ] `src/ui/providers/DrawerProvider.tsx` — contains Shopify GIDs (must remove).
- [ ] `src/domains/client/shop/products/data/product-config.ts` — contains fallback Shopify variant IDs (must remove).
- [ ] `src/domains/client/shop/cart/logic/volumeDiscounts.ts` — contains Shopify variant ID constant (must remove).
- [ ] `src/domains/client/shop/cart/providers/CartContext.tsx` — legacy GID cleanup exists; decide what remains temporarily acceptable.

## Plan Steps
- [ ] Step 1: Establish baseline leak report (run vendor leak checker; capture output under `artifacts/`).
- [ ] Step 2: Specify the internal `VariantKey` naming scheme for the affected products/variants (2–10 keys).
- [ ] Step 3: Decide where the mapping registry lives (platform commerce adapter vs a shared resolver used by adapters).
- [ ] Step 4: Draft the exact code-edit sequence (file-by-file) to replace GIDs with internal keys.
- [ ] Step 5: Define acceptance checks + rollback plan (what reverts cleanly if mapping is missing).

## Artifacts (created/updated)
- `agent-cycle.md` — the prompt-by-prompt run sequence (20–30 prompts).
- `artifacts/baseline-vendor-leaks.txt` — captured baseline scan output.
- `final-report.md` — proposed mapping scheme + exact code edit sequence + acceptance checks.

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/05-planning/research/` (human-facing) when stable.
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- Where should the “VariantKey → Shopify GID” mapping live so it doesn’t get duplicated?
- Do we treat legacy cleanup in `CartContext` as acceptable for now, or do we want a hard cutoff?
- How do we handle “missing mapping” in prod (error vs fallback)?

## Notes / Revisions
- 2025-12-29 — Plan scaffold created by `./.blackbox/scripts/new-plan.sh`.
