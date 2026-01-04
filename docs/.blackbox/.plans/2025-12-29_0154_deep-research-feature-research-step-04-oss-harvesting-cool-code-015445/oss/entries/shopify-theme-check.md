# OSS Project Entry

## Identity

- Name: Theme Check
- Repo: https://github.com/Shopify/theme-check
- Full name: Shopify/theme-check
- License: MIT (per LICENSE.md; GitHub metadata may show NOASSERTION)
- Primary language: Ruby

## What it gives us (plain English)

- A Shopify-maintained linter for Shopify themes (Liquid + theme conventions)
- Practical rule sets that catch:
  - invalid Liquid syntax
  - anti-patterns and performance footguns
  - accessibility and theme-store style issues (depending on config/rules)
- A “quality gate” primitive for generated themes before we deploy/publish to merchant stores

## What feature(s) it maps to

- Storefront generation guardrails (theme quality, correctness, performance)
- CI validation step for “generated storefronts”
- Safe merchant customization boundaries (detecting schema/settings misuse)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect (theme pipeline). Very high leverage for a Shopify theme-based generator.
- Setup friction (self-host? SaaS? Docker?): Low. Add as a CI step and a local dev hook.
- Data model alignment: High for Shopify themes (it’s made for this exact surface).

## Adoption path

- 1 day POC:
  - Run Theme Check against:
    - Dawn (baseline theme)
    - 1 real client theme repo (or our generated output)
  - Capture the “top 10 failing rules” and decide our default policy:
    - errors block deploy
    - warnings log but allow deploy
  - Create a `theme-check` config preset for our generator (strict but realistic).
- 1 week integration:
  - Add Theme Check to the storefront generator pipeline:
    - pre-commit hook (optional)
    - CI job (required)
    - deploy gate (required)
  - Add reporting:
    - annotate PRs with lint results
    - store lint runs as audit events (what changed, who deployed, quality status)
  - Maintain a “rule exceptions” mechanism per merchant (explicit allowlist with approvals).
- 1 month hardening:
  - Build a “theme quality dashboard” (lint trends, top rule violations, regressions).
  - Add automatic fixes where safe (formatting, trivial schema issues).
  - Keep our preset aligned with Shopify updates (pin versions + schedule upgrades).

## Risks

- Maintenance risk: Low/Medium. Need to keep rulesets updated as Shopify theme conventions evolve.
- Security risk: Low. Mostly about not leaking theme contents in CI logs.
- Scope mismatch: Low for Shopify theme generation; medium if we only build custom React storefronts.
- License risk: Low (MIT text in LICENSE.md), but note GitHub metadata may not assert it (use proof link).

## Sources

- https://github.com/Shopify/theme-check
- https://raw.githubusercontent.com/Shopify/theme-check/main/LICENSE.md

## Score (0–100) + reasoning

- Score: 76
- Why: Cheap, high-leverage quality gate for any Shopify-theme-based storefront generator; permissive licensing with strong vendor alignment.

