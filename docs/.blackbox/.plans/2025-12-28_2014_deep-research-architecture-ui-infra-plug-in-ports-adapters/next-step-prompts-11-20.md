# Next Step (Prompts 11–20)

Paste this into the Codex CLI session to run prompts 11–20 (deeper inventory + dependency rules).

## Hard constraints (repeat)

- No code changes (read-only).
- Only write into: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`

## Goal for prompts 11–20

Turn the inventory into a **clean boundary map**:
- Expand `artifact-map.md` with concrete examples (imports, IDs, copy, branching).
- Add explicit dependency rules to `final-report.md`.
- Identify “already-good adapters” vs “needs a port”.

## Prompt 11 — Shared lib leaks (src/lib/*)

Inspect and summarize infra leaks in:
- `src/lib/product.ts`
- `src/lib/sections.ts`

Update `artifact-map.md` with:
- exact imports that cause coupling
- suggested destination (which port owns it)

## Prompt 12 — Content boundary (metaobjects → ContentPort)

From `src/lib/sections.ts`, propose:
- a `ContentPort` contract (methods only, no code)
- a DTO shape that UI can render without Shopify knowledge

Update `final-report.md` with a short “ContentPort” section.

## Prompt 13 — Cart boundary (CartContext)

Inspect `src/domains/client/shop/cart/providers/CartContext.tsx` and:
- list direct Shopify adapter imports
- list where `shopifyEnabled` is used
- list what the UI/provider actually needs (methods + data fields)

Update `artifact-map.md` and add “CartPort” needs to `final-report.md`.

## Prompt 14 — Checkout boundary (UI copy + checkoutUrl assumptions)

Inspect these touchpoints:
- `src/ui/providers/DrawerProvider.tsx` (copy + assumptions)
- any `checkoutUrl` use in cart logic/provider

Propose:
- a `CheckoutCapabilities` model for UI rendering
- a `CheckoutPort.beginCheckout()` shape that supports Shopify redirect today and embedded later

Update `final-report.md`.

## Prompt 15 — Product/catalog boundary (CatalogPort)

From `src/lib/product.ts`, propose:
- `CatalogPort` methods
- `ProductDTO` fields (internal, vendor-agnostic)
- how to represent “variant key” without Shopify GIDs leaking into UI

Update `final-report.md` port catalog.

## Prompt 16 — “Already good” adapter candidates

List platform-level adapter candidates (paths) that should remain vendor-specific, e.g.:
- `src/domains/platform/commerce/shopify/*`

Update `artifact-map.md` under “Already good adapters”.

## Prompt 17 — Import rules (explicit)

Write explicit import rules into `final-report.md`:
- what UI may import
- what domain logic may import
- what platform ports export
- what only adapters may import

Include 3–5 examples of “bad import” vs “good import” (paths only).

## Prompt 18 — Boundary violations list (expanded)

Expand `artifact-map.md` into a top-level list of:
- UI leaks
- domain leaks
- shared-lib leaks
- routing coupling

Each item must include:
- file path
- what’s leaking
- which port/adaptor boundary fixes it

## Prompt 19 — Severity top 10

Create a “top 10 coupling issues” list ranked by severity (impact on plug-in UI + difficulty) and link each to a path.

## Prompt 20 — Update rankings

Update `rankings.md` with at least 3 additional ranked steps (0–100), each backed by evidence paths.

## After prompt 20 (checkpoint)

From `docs/` run:

```bash
./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters "Checkpoint: prompts 11–20 boundary map expanded"
```

