# Rolling Context (read first)

Keep this compact and current. This file is the “always read” memory.

## Current goal

- Keep OSS discovery **repeatable + measurable**, and bias toward repos that accelerate:
  - ops reliability + auditability
  - returns/exchanges/store credit (core differentiation)
  - support timeline primitives
  - admin/bulk tooling
  - storefront/blog component mining (for UI patterns, not “replace Shopify”)

## Current assumptions / constraints

- Do not paste/commit tokens; use GitHub CLI auth (`gh auth login`) and set `GITHUB_TOKEN` via command substitution.
- Prefer metadata + file pointers (no vendoring/cloning OSS into this repo unless explicitly requested).
- Treat copyleft licenses (GPL/AGPL) as **reference-only** by default.
- Stop searching when deltas are small (<3 good new candidates per pass) and promote to `poc` instead.

## Current best candidates / hypotheses

- `open-policy-agent/opa` (poc): policy-as-code approval/authorization decision point.
- `retracedhq/retraced` (poc): audit log service + embeddable UI.
- Returns domain: mine **Saleor + Solidus** for concrete models/state machines + admin surfaces; treat Spree as reference-only.
- Storefront pattern mining: prefer “real starters” with testing + component stories (Next.js commerce starters).

## Open questions / decisions needed

1) Returns gap strategy: keep searching small OSS returns portals vs double down on mining mature platforms and building the portal UX ourselves.
2) Stop rule enforcement: when do we freeze discovery and shift to POCs (target: 3–6 POCs with measurable criteria)?
3) Shipping integration stance: plugin-based integrations (e.g. Vendure shipping modules) vs building adapters.

## Recent progress (latest 3–5)

- Verified GitHub CLI auth + GraphQL workflow (`gh api graphql …`).
- Ran a storefront/content discovery pass; added `takeshape/penny` (Next.js commerce starter) and tagged as `storefront`.
- Ran a returns/shipping precision pass; added `jonyw4/vendure-advanced-shipping` (MIT) and increased `shipping` coverage.
- Updated returns mining docs and fixed catalog license merge so unknown signals can’t overwrite verified license decisions.
