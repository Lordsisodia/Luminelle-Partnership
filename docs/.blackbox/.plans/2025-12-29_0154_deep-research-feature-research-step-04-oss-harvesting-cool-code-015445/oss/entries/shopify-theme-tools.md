# OSS Project Entry

## Identity

- Name: Shopify Theme Tools
- Repo: https://github.com/Shopify/theme-tools
- Full name: Shopify/theme-tools
- License: MIT
- Primary language: TypeScript

## What it gives us (plain English)

- Shopify-maintained tooling around themes/Liquid development
- A practical “developer ergonomics layer” for:
  - Liquid parsing/language services
  - linting/formatting/intellisense patterns
  - validating theme conventions in editor and CI
- Strong reference for how Shopify expects theme tooling to behave (and what constitutes “correct” Liquid/theme structure)

## What feature(s) it maps to

- Storefront generator developer tooling (lint/format/editor support)
- Theme schema correctness + guardrails (prevent invalid sections/blocks/config)
- Faster iteration: “generated theme” becomes safe to customize without breaking

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect. It’s tooling, but it’s TypeScript and aligns with our stack.
- Setup friction (self-host? SaaS? Docker?): Low. Adopt as:
  - a dependency inside theme tooling
  - a reference implementation for our own generator validation steps
- Data model alignment: High for Shopify themes/Liquid.

## Adoption path

- 1 day POC:
  - Identify which parts are immediately reusable:
    - formatter/linter rules
    - Liquid AST parsing / language-server surfaces
  - Run against a sample theme repo (Dawn or generated output) and validate it catches expected issues.
  - Decide: “consume as library” vs “borrow patterns and re-implement minimal validator”.
- 1 week integration:
  - Integrate the chosen tooling into our generator pipeline:
    - run formatting/lint checks in CI
    - optionally auto-format on generation step
  - Add a “theme validation” job that blocks deploy/publish if schema is invalid.
  - Create a stable “theme contract” doc:
    - which files the generator owns
    - which files merchants can edit
    - what validation rules apply
- 1 month hardening:
  - Provide “developer experience” features:
    - CLI wrapper commands (`lint`, `format`, `validate`, `preview`)
    - PR annotations and summary reports
  - Keep the toolchain pinned + periodically upgraded with a changelog for impacts.

## Risks

- Maintenance risk: Medium. Tooling ecosystems change; pin versions and treat upgrades as planned work.
- Security risk: Low. Mostly about CI log redaction and safe handling of theme files.
- Scope mismatch: Low if we generate Shopify themes; medium if we only generate custom storefront apps.
- License risk: Low (MIT).

## Sources

- https://github.com/Shopify/theme-tools
- https://raw.githubusercontent.com/Shopify/theme-tools/main/LICENSE.md

## Score (0–100) + reasoning

- Score: 72
- Why: Shopify-aligned tooling primitives for Liquid/theme validation and DX; useful as a library or as a reference for our own theme generator validators.

