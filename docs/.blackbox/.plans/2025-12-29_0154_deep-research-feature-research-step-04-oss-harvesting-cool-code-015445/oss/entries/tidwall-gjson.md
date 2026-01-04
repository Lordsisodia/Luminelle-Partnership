# OSS Project Entry

## Identity

- Name: gjson
- Repo: https://github.com/tidwall/gjson
- Full name: tidwall/gjson
- License: MIT
- Primary language: Go

## What it gives us (plain English)

- Fast JSON querying for Go (simple path syntax)
- Useful for building lightweight “policy helpers” and detectors in Go tooling:
  - quick checks on evidence manifests
  - extracting fields for logs/metrics
- Best when we have Go-based services in the pipeline (e.g., artifact gateway, OTel helpers)

## What feature(s) it maps to

- Evidence manifest parsing (fast extraction)
- Policy enforcement helpers inside Go services (pre-upload checks)
- Audit log enrichment (extract fields for access events)

## Adoption path

- 1 day POC:
  - Build a tiny tool that:
    - reads an evidence bundle JSON
    - extracts merchantId/templateVersion/runId
    - validates `masked=true` for screenshot artifacts
  - Use it as a fast “pre-upload” verifier.
- 1 week integration:
  - Package as a small internal CLI and run it in the upgrade pipeline alongside Conftest/Ajv.
  - Use it for sanity checks at the artifact gateway (defense-in-depth).

## Risks

- Maintenance risk: Low.
- Security risk: Low/Medium. Helps enforce policy, but don’t rely on a single verifier.
- Scope mismatch: Medium if we are TS-only and don’t run Go tooling in the pipeline.
- License risk: Low (MIT).

## Sources

- https://github.com/tidwall/gjson
- https://raw.githubusercontent.com/tidwall/gjson/master/LICENSE

## Score (0–100) + reasoning

- Score: 45
- Why: Great low-level JSON extraction primitive for Go-based tooling, but optional unless our pipeline has Go components where this fits naturally.

