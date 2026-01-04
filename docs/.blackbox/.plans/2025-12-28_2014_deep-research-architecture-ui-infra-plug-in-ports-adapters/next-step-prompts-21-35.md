# Next Step (Prompts 21–35)

Paste this into the Codex CLI session to run prompts 21–35 (define contracts: ports + DTOs + capability flags).

## Hard constraints (repeat)

- No code changes (read-only).
- Only write into: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`

## Goal for prompts 21–35

Turn the boundary map into a concrete, UI-pluggable contract system:
- Define ports (interfaces) UI/domain logic will depend on.
- Define DTOs and capability flags so UI never needs Shopify/Stripe details.
- Define adapter selection strategy (Shopify now; Stripe later; mock for dev).

Primary files to update:
- `final-report.md` (contracts + import rules + capability model)
- `rankings.md` (ranked implementation steps)

Optional (if `final-report.md` gets long):
- create `ports.md` in this plan folder and link it from `final-report.md`

## Prompt 21 — Principles

Write 6–10 “non-negotiable principles” for plug-in UI, e.g.:
- UI never imports vendor adapters
- UI never hardcodes vendor IDs
- UI renders based on capability flags, not vendor assumptions

Add these to `final-report.md`.

## Prompt 22 — DTO design rules

Define DTO rules (internal data shapes):
- IDs / keys: what UI uses vs what adapters use
- Money/currency handling
- Optional fields and loading/error semantics

Add a concise “DTO rules” section to `final-report.md`.

## Prompt 23 — `CatalogPort` contract

Define:
- `CatalogPort` methods (minimum needed now)
- `ProductDTO` shape (vendor-agnostic)
- how variants are represented (no Shopify GIDs in UI)

Add to `final-report.md`.

## Prompt 24 — `CartPort` contract

Define:
- `CartPort` methods
- `CartDTO` + `CartLineDTO` shapes
- discount code / buyer identity / attributes (capabilities if optional)

Add to `final-report.md`.

## Prompt 25 — `CheckoutPort` contract

Define:
- `CheckoutCapabilities` (redirect vs embedded, payment provider label, etc.)
- `beginCheckout()` result shape that supports:
  - Shopify redirect checkout today
  - embedded checkout later

Add to `final-report.md`.

## Prompt 26 — `ContentPort` contract

Define:
- `ContentPort` methods for “sections”
- a `SectionsDTO` (hero, faq, gallery, etc.) that UI can render
- how it maps from Shopify metaobjects today and from CMS/Supabase later

Add to `final-report.md`.

## Prompt 27 — Adapter selection / factory

Define a single “entrypoint” idea:
- `@platform/commerce` exports ports bound to the configured adapter

Specify:
- how config is selected (env/config)
- dev fallback behavior (mock adapter)
- prod failure behavior (error or degraded mode)

Add to `final-report.md`.

## Prompt 28 — Import rules (final form)

Produce explicit, testable import rules:
- Allowed imports by layer
- Forbidden imports by layer

Add examples (paths only) of good vs bad imports.

## Prompt 29 — Capability flags checklist

List capability flags UI will rely on (now + later), such as:
- checkout mode
- supports discounts
- supports buyer identity
- supports content provider

Add to `final-report.md` and cross-check against inventory.

## Prompt 30 — Error semantics / resilience

Define:
- what errors ports throw
- how UI should handle them (generic)
- where retries/backoff live (adapter layer)

Add to `final-report.md`.

## Prompt 31 — Migration “surface exports”

Define a proposal for “surface exports” (one stable import path per port), e.g.:
- `@platform/commerce/catalog`
- `@platform/commerce/cart`
- `@platform/commerce/checkout`
- `@platform/content/sections`

This is still design-only; no code changes.

## Prompt 32 — Testing strategy (future)

Define how you’d test later:
- unit tests for domain logic against fake ports
- contract tests for adapters
- “golden fixture” tests for DTO transforms

Add a short section in `final-report.md`.

## Prompt 33 — Stripe later: explicit scenarios

Write 2–3 scenarios:
- Stripe becomes primary payments but Shopify still system of record for catalog
- Stripe replaces checkout entirely
- Multi-provider mode (client-specific)

For each scenario, explain why UI doesn’t need to change if ports/capabilities are right.

## Prompt 34 — Update rankings (implementation steps)

Add 3–6 ranked steps to `rankings.md` that correspond to:
- port creation
- adapter factory
- removing vendor IDs/copy from UI
- moving `src/lib/*` behind ports

Each item must include evidence paths and “done” definition.

## Prompt 35 — Consistency check

Review the contracts vs the inventory:
- Are there missing methods/fields?
- Are any ports too Shopify-shaped?
- Are capability flags sufficient?

Write a short “contract gaps” list and add it to `final-report.md`.

## After prompt 35 (checkpoint)

From `docs/` run:

```bash
./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters "Checkpoint: prompts 21–35 contracts drafted"
```

