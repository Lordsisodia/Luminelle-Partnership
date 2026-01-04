# OSS Project Entry

## Identity

- Name: Conftest
- Repo: https://github.com/open-policy-agent/conftest
- Full name: open-policy-agent/conftest
- License: Apache-2.0
- Primary language: Go

## What it gives us (plain English)

- A way to write policy tests against configuration and structured files (JSON/YAML/etc.)
- Practical for enforcing “artifact allowlist/denylist” and upgrade-evidence policies:
  - “no unmasked screenshots allowed”
  - “no logs containing forbidden keys”
  - “evidence bundle must include required reports”
- Produces human-readable policy failures that can block CI and surface in PRs

## What feature(s) it maps to

- Evidence policy enforcement (before upload)
- Upgrade pipeline guardrails (block promotion if policy fails)
- Compliance posture: testable policy-as-code

## Adoption path

- 1 day POC:
  - Define an `evidence-bundle.json` schema for one upgrade run:
    - artifact list (paths, types)
    - metadata (merchantId, templateVersion, runId)
    - flags (masked=true/false)
  - Write 3 Conftest policies:
    - required artifacts exist (test report, perf report, visual diffs)
    - deny uploading unmasked screenshots
    - deny evidence bundles with raw headers/tokens fields
  - Run in CI and verify failures are readable.
- 1 week integration:
  - Make Conftest a required gate in the upgrade pipeline:
    - run after generation + tests but before artifact upload
  - Add policy versioning:
    - policy changes produce audit events and changelogs (Changesets/release-please)
  - Add exception mechanism:
    - allowlist with justification and expiry (audited).

## Risks

- Maintenance risk: Medium. Policy authoring requires discipline and versioning.
- Security risk: Low/Medium. It improves security, but don’t treat it as a substitute for redaction/masking.
- Scope mismatch: Low if we want enforceable governance for artifact/evidence.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/open-policy-agent/conftest
- https://raw.githubusercontent.com/open-policy-agent/conftest/master/LICENSE

## Score (0–100) + reasoning

- Score: 73
- Why: Directly enables a testable “no-leaks” evidence policy layer with minimal runtime complexity (CI gate).

