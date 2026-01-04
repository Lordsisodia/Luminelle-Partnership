# OSS Project Entry

## Identity

- Name: yq
- Repo: https://github.com/mikefarah/yq
- Full name: mikefarah/yq
- License: MIT
- Primary language: Go

## What it gives us (plain English)

- CLI for manipulating YAML/JSON with jq-like expressions
- Useful for:
  - transforming evidence bundle manifests in CI
  - generating derived configs for mask rules from templates
  - applying consistent edits during upgrade PR generation (without brittle sed scripts)

## What feature(s) it maps to

- Evidence bundle normalization (CI transforms)
- Mask rules generation and editing workflows
- Upgrade PR automation tooling (config edits)

## Adoption path

- 1 day POC:
  - Write a script that:
    - injects `templateVersion` into an evidence bundle manifest
    - removes forbidden fields from logs metadata
    - normalizes artifact paths to canonical prefixes
  - Use it in CI as a pre-upload step.
- 1 week integration:
  - Build a small “evidence bundle builder” step:
    - output stable manifest format regardless of runner differences
  - Use yq in upgrade PR generator workflow for safe YAML edits (theme config, build config).

## Risks

- Maintenance risk: Low.
- Security risk: Medium if used to manipulate sensitive configs; enforce allowlists and review.
- Scope mismatch: Low. Common, cheap automation primitive.
- License risk: Low (MIT).

## Sources

- https://github.com/mikefarah/yq
- https://raw.githubusercontent.com/mikefarah/yq/master/LICENSE

## Score (0–100) + reasoning

- Score: 59
- Why: Practical glue tool for manifest/config transformations; most value is reducing brittle scripts in upgrade automation.

