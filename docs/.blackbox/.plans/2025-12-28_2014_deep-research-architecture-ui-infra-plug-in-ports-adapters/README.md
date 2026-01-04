# Plan: deep-research architecture ui-infra plug-in ports adapters

## Goal
Produce a concrete “ports/adapters” architecture proposal so **UI is plug‑in/swappable** and commerce infra is replaceable (**Shopify now, Stripe later**) without changing code yet.

## Created
2025-12-28 20:14

## Target (optional)
2025-12-29 (optional): end this run with a concrete port catalog + migration checklist.

## Context
- Prompt: we want UI components to be interchangeable and not coupled to Shopify/Stripe implementation details.
- Constraints:
  - **No code changes in this run** (research + design only).
  - Work via **Codex CLI**; write outputs into this plan folder.
  - Shopify is the current system of record; Stripe/others may be added later.
- “Done” definition:
  - We have a named list of **ports** (stable contracts) + DTOs/capabilities UI depends on.
  - We have a list of current **boundary violations** (Shopify leaks into UI/domain logic) with paths.
  - We have an incremental migration plan (ranked by leverage vs risk).

## Docs To Read (and why)
- [ ] `src/domains/README.md` — confirm import rules + where vendor clients should live.
- [ ] `src/domains/platform/commerce/.docs/README.md` — intended platform commerce boundary.
- [ ] `src/domains/platform/commerce/runtime.ts` — confirm central adapter selection + checkout capabilities model.
- [ ] `src/domains/platform/commerce/ports/*` — confirm current port catalog + DTOs.
- [ ] `src/domains/platform/commerce/adapters/shopify/internal-api/*` — confirm Shopify adapter implementation behind internal API.
- [ ] `src/domains/client/shop/cart/providers/CartContext.tsx` — identify remaining vendor coupling (IDs/copy/assumptions).
- [ ] `src/ui/providers/DrawerProvider.tsx` — find vendor-specific UI copy + vendor IDs.
- [ ] `src/lib/product.ts` and `src/lib/sections.ts` — infra leaks in “shared lib”.
- [ ] `docs/02-engineering/architecture/ARCHITECTURE-HOWTO.md` — conventions for layered placement.

## Plan Steps
- [ ] Step 1: Inventory infra touchpoints (Shopify leaks) with file paths.
- [ ] Step 2: Define target boundaries (UI → domain → platform ports → vendor adapters).
- [ ] Step 3: Specify minimal port contracts + DTOs + capability flags for UI.
- [ ] Step 4: Create a ranked migration plan (incremental, reversible steps).

## Artifacts (created/updated)
- `final-report.md` — target architecture + port catalog + dependency rules.
- `artifact-map.md` — current violations + “already-good” adapter candidates.
- `rankings.md` — ranked migration steps (0–100).
- `artifacts/run-meta.yaml` — run reproducibility metadata (prompt + model + outputs).

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge (human-facing): promote into `docs/05-planning/research/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` (or `INDEX.md` if present)

## Open Questions / Risks
1) Do we want “cart” to be an internal concept even if Stripe becomes primary payments?
2) Which “capabilities” must UI support (redirect checkout vs embedded checkout vs both)?
3) Do we treat CMS/content as part of commerce (Shopify metaobjects today) or a separate `ContentPort`?

## Notes / Revisions
- 2025-12-28 20:14 — Plan scaffold created by `new-run.sh`.
