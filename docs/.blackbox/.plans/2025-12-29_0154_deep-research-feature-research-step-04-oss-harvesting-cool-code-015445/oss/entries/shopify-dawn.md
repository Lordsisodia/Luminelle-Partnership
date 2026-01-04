# OSS Project Entry

## Identity

- Name: Dawn
- Repo: https://github.com/Shopify/dawn
- Full name: Shopify/dawn
- License: MIT (per LICENSE.md; GitHub metadata may show NOASSERTION)
- Primary language: Liquid

## What it gives us (plain English)

- Shopify’s reference theme implementation with modern Online Store 2.0 patterns
- Real-world “sections + blocks” composition patterns for theme-driven storefront UX
- A practical baseline for:
  - section schemas + settings (how merchants customize)
  - performance-oriented Liquid patterns
  - accessibility patterns in a real theme
- A rich source of “how to structure a theme that merchants can customize safely”

## What feature(s) it maps to

- Storefront generation (theme-based) for Shopify merchants
- Theme/template DSL patterns (sections schema, blocks, presets, settings)
- Merchant customization boundaries (what you allow a merchant to edit vs what you lock)
- Performance + accessibility best practices for theme-derived UIs

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Separate track (Liquid theme), but extremely relevant for “Shopify-native build” customers.
- Setup friction (self-host? SaaS? Docker?): Low (theme dev tooling). Operationally easy compared to running a full custom storefront.
- Data model alignment: High for Shopify (it *is* Shopify’s theme model).

## Adoption path

- 1 day POC:
  - Pull Dawn and inspect how sections/blocks/settings are modeled (identify 5–8 reusable primitives).
  - Build a small “theme generator checklist”:
    - what files we template
    - which section schemas we standardize
    - which settings become “merchant configurable”
  - Prototype 2 custom sections in the Dawn style (hero + featured collection) and validate:
    - schema ergonomics
    - performance (no accidental N+1)
    - accessibility defaults
- 1 week integration:
  - Build a “theme starter kit”:
    - standard section library (with stable schema contracts)
    - linting + CI checks for theme quality
    - deployment workflow (theme push, preview, promote)
  - Add governance:
    - enforce safe merchant edits (schema-only) vs protected code paths
    - add audit events for theme changes (who changed what, when)
  - Add a “theme upgrade” mechanism:
    - diff templates
    - preserve merchant customizations where possible
- 1 month hardening:
  - Integrate automated performance checks (LCP, bundle size, image sizes) and accessibility checks.
  - Add safe customization tooling (UI for config changes, guardrails).
  - Add support tooling: “theme timeline” + “rollback to last known good”.

## Risks

- Maintenance risk: Medium. Theme model is stable-ish, but Shopify platform changes require updates.
- Security risk: Low/Medium. Mostly around deployment credentials and leaking merchant data into logs.
- Scope mismatch: Low if we offer theme-based storefront generation; medium if we only do custom React storefronts.
- License risk: Low if we rely on LICENSE.md proof, but note GitHub metadata may not assert the license (verify before adoption).

## Sources

- https://github.com/Shopify/dawn
- https://raw.githubusercontent.com/Shopify/dawn/main/LICENSE.md

## Score (0–100) + reasoning

- Score: 78
- Why: High-signal reference for Shopify theme architecture and merchant customization boundaries; very useful whether we generate themes directly or borrow the schema patterns for custom storefront templates.

