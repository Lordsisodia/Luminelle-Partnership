# OSS Project Entry

## Identity

- Name: Spectral
- Repo: https://github.com/stoplightio/spectral
- Full name: stoplightio/spectral
- License: Apache-2.0
- Primary language: TypeScript

## What it gives us (plain English)

- A flexible linter for JSON/YAML with custom rules
- Useful for “human-friendly policy enforcement” on:
  - evidence manifests
  - template ownership manifests
  - configuration files that power generators
- Complements schema validation (Ajv) by catching style and policy rules with good reporting

## What feature(s) it maps to

- Evidence policy linting (readable violations)
- “Mask rules” linting (ensure selectors exist, naming conventions, required fields)
- Template manifest consistency checks

## Adoption path

- 1 day POC:
  - Define a Spectral ruleset:
    - deny `*.env` artifacts
    - require `masked: true` for screenshot artifacts
    - require evidence bundle has `templateVersion`
  - Run on a sample evidence bundle and confirm output is readable.
- 1 week integration:
  - Add Spectral as a non-flaky lint step in CI:
    - PR annotations for violations
  - Pair with Ajv and Conftest:
    - Ajv = schema correctness
    - Spectral = lint/readability and conventions
    - Conftest = semantic policy gates (fail build).

## Risks

- Maintenance risk: Low/Medium. Rule sets need to evolve with schemas.
- Security risk: Low. Improves detection, but still need hard gates.
- Scope mismatch: Low. Great when we want human-friendly lint output.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/stoplightio/spectral
- https://raw.githubusercontent.com/stoplightio/spectral/master/LICENSE

## Score (0–100) + reasoning

- Score: 68
- Why: A strong linting layer for evidence/manifests that improves developer ergonomics and prevents policy drift; best paired with hard schema/policy gates.

