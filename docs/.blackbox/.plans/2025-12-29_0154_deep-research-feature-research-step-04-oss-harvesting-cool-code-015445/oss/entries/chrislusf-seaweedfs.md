# OSS Project Entry

## Identity

- Name: SeaweedFS
- Repo: https://github.com/chrislusf/seaweedfs
- Full name: chrislusf/seaweedfs
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- A self-hosted distributed object/file store (often used as “S3-like storage”)
- Useful building block for storing upgrade evidence artifacts:
  - Playwright traces/videos/screenshots
  - Lost Pixel/reg-suit screenshot diffs
  - Lighthouse reports, JSON summaries
- Lets us keep artifacts in our infrastructure (cost control + predictable retention)

## What feature(s) it maps to

- Artifact storage for “Upgrade Evidence bundles”
- Retention policies (keep last N runs per merchant/template)
- Multi-tenant access boundaries (bucket/prefix strategies)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect. It’s storage infra, but it’s S3-like and consumable from our TS/Go services.
- Setup friction (self-host? SaaS? Docker?): Medium/High (stateful infra). Worth it if artifact volume grows or we want to avoid vendor lock-in.
- Data model alignment: High if we standardize artifact paths like `merchant/<id>/template/<version>/run/<id>/...`.

## Adoption path

- 1 day POC:
  - Spin up SeaweedFS locally (single node).
  - Upload a “fake upgrade evidence bundle”:
    - `playwright-trace.zip`
    - `lighthouse-report.html`
    - `visual-diff.png`
  - Verify we can serve artifacts via:
    - signed URLs (preferred), or
    - proxy endpoints behind oauth2-proxy.
- 1 week integration:
  - Define artifact namespace strategy:
    - per-merchant prefix isolation
    - per-template-version grouping
  - Build an artifact service layer:
    - upload API for CI workers
    - signed URL issuance
    - retention deletion jobs
  - Add audit logging:
    - who accessed which artifact
    - when artifacts were deleted
- 1 month hardening:
  - Productionize storage (HA, backups, monitoring).
  - Add encryption-at-rest and tighter access policies.
  - Add lifecycle rules (auto-delete after N days, with exceptions for incident investigations).

## Risks

- Maintenance risk: High (infra). Only adopt if we want to operate storage.
- Security risk: High if misconfigured (artifacts can contain PII). Must enforce strict access controls and scrub fixtures.
- Scope mismatch: Medium if S3 is already sufficient; SeaweedFS is mainly for cost/control.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/chrislusf/seaweedfs
- https://raw.githubusercontent.com/chrislusf/seaweedfs/master/LICENSE

## Score (0–100) + reasoning

- Score: 54
- Why: Useful to own artifact storage at scale, but it’s infra-heavy; likely “later” unless artifact volume/cost forces it.

