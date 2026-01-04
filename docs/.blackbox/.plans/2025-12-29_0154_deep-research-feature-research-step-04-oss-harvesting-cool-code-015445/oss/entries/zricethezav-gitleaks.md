# OSS Project Entry

## Identity

- Name: Gitleaks
- Repo: https://github.com/zricethezav/gitleaks
- Full name: zricethezav/gitleaks
- License: MIT
- Primary language: Go

## What it gives us (plain English)

- Secret scanning to prevent API keys/tokens/passwords from being committed
- Directly relevant to upgrade workflows and artifact storage:
  - prevents secrets from landing in generated storefront repos
  - reduces risk of secrets appearing in diffs, reports, or screenshots
- A practical “security gate” in CI for template repos and client repos

## What feature(s) it maps to

- Secret redaction prevention (stop secrets before they reach artifacts)
- Upgrade PR safety (scan upgrades before opening PRs)
- Compliance posture for managed storefront operations

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent (CI tooling).
- Setup friction (self-host? SaaS? Docker?): Low.
- Data model alignment: High. We want a hard guarantee that “evidence artifacts don’t contain secrets”.

## Adoption path

- 1 day POC:
  - Run Gitleaks on:
    - storefront template repo
    - one generated storefront repo
  - Add a deliberate “fake secret” and validate detection.
  - Decide the policy:
    - block merges on findings
    - allowlist known false positives with justification.
- 1 week integration:
  - Add to the upgrade pipeline:
    - scan before creating upgrade PR
    - scan after applying patches/overlays
  - Add remediation workflow:
    - auto-comment on PR with findings
    - record audit event for security review
  - Add org-level rules:
    - baseline scanning schedule
    - rotation playbooks if secrets are detected.
- 1 month hardening:
  - Integrate with incident tooling:
    - alert on secrets found in main branches
    - automatic revocation workflow where possible
  - Expand scanning to artifact bundles:
    - scan text logs in Allure/ReportPortal outputs before upload.

## Risks

- Maintenance risk: Low/Medium. Rules need tuning to avoid noise.
- Security risk: Low (it reduces risk), but don’t rely on it as the only control.
- Scope mismatch: Low. Very aligned with “managed app + many repos” posture.
- License risk: Low (MIT).

## Sources

- https://github.com/zricethezav/gitleaks
- https://raw.githubusercontent.com/zricethezav/gitleaks/master/LICENSE

## Score (0–100) + reasoning

- Score: 82
- Why: Extremely high leverage as a guardrail; prevents accidental secret leakage into repos and report artifacts with minimal integration cost.

