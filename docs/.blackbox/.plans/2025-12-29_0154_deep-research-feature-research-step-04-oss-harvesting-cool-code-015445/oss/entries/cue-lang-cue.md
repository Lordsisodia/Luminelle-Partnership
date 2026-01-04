# OSS Project Entry

## Identity

- Name: CUE
- Repo: https://github.com/cue-lang/cue
- Full name: cue-lang/cue
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- A powerful constraint language for validating and generating configuration/data
- Useful for making upgrade/evidence metadata *schema-first*:
  - evidence bundle manifest schema
  - mask rules schema (selectors, page types, fallbacks)
  - template ownership manifests (generator-owned vs merchant-owned paths)
- Can be used both to validate and to generate derived config (e.g., default masks per template)

## What feature(s) it maps to

- Evidence manifest schema validation (pre-upload gate)
- Mask rules and mask drift policy (selectors and fallbacks)
- Template upgrade metadata consistency (ownership boundaries)

## Adoption path

- 1 day POC:
  - Define `evidence.cue` that describes:
    - required artifacts (test report/perf report/visual diffs)
    - required metadata fields (merchantId/templateVersion/runId)
    - forbidden fields (raw headers/tokens)
  - Validate a sample `evidence-bundle.json` from an upgrade run.
  - Define a small `mask-rules.cue` schema for selectors + viewports.
- 1 week integration:
  - Make CUE validation a required CI gate for:
    - template releases (ensure ownership manifests are valid)
    - upgrade runs (ensure evidence bundles are valid)
    - mask drift updates (ensure mask rules are well-formed)
  - Generate documentation from schema:
    - “what fields are expected in evidence bundles?”
  - Add policy versioning and changelogs (Changesets/release-please).

## Risks

- Maintenance risk: Medium. Requires internal expertise and discipline around schemas.
- Security risk: Low. Primarily improves correctness and prevents accidental leakage.
- Scope mismatch: Medium if we prefer plain JSON Schema tooling.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/cue-lang/cue
- https://raw.githubusercontent.com/cue-lang/cue/master/LICENSE

## Score (0–100) + reasoning

- Score: 64
- Why: Excellent for schema-first governance and generation, but introduces a new DSL; adopt if we want strong, centralized schema contracts for evidence/masks/templates.

