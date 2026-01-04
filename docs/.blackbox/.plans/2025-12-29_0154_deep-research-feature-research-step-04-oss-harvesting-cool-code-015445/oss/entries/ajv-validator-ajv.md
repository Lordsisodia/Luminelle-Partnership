# OSS Project Entry

## Identity

- Name: Ajv
- Repo: https://github.com/ajv-validator/ajv
- Full name: ajv-validator/ajv
- License: MIT
- Primary language: TypeScript/JavaScript

## What it gives us (plain English)

- Fast JSON Schema validation in Node
- Ideal for enforcing contracts without introducing a new DSL:
  - `evidence-bundle.json` schema
  - `mask-rules.json` schema
  - template ownership manifest schema
- Lets us build “policy gates” that are machine-enforceable and easy to integrate in TS pipelines

## What feature(s) it maps to

- Evidence bundle schema validation (pre-upload gate)
- Mask rules schema validation (selectors, viewports, fallbacks)
- Upgrade PR metadata contracts (what must be present for approvals)

## Adoption path

- 1 day POC:
  - Define JSON Schemas:
    - `evidence-bundle.schema.json`
    - `mask-rules.schema.json`
  - Validate a sample bundle and show readable error messages in CI logs.
  - Decide whether to pair with Conftest:
    - Ajv for schema correctness
    - Conftest for semantic policy rules.
- 1 week integration:
  - Add validation to the upgrade pipeline:
    - fail before artifact upload if schema invalid
  - Add a schema version field to evidence bundles and enforce migrations.
  - Generate a small “evidence bundle viewer” UI that relies on stable schema.

## Risks

- Maintenance risk: Low/Medium (schema evolution needs versioning).
- Security risk: Medium if schemas are too permissive; must include forbidden fields/paths and enforce “masked=true” invariants.
- Scope mismatch: Low. Very natural fit in TS pipelines.
- License risk: Low (MIT).

## Sources

- https://github.com/ajv-validator/ajv
- https://raw.githubusercontent.com/ajv-validator/ajv/master/LICENSE

## Score (0–100) + reasoning

- Score: 72
- Why: Quick, pragmatic schema enforcement for evidence bundles and mask rules in Node/TS without adding much operational overhead.

