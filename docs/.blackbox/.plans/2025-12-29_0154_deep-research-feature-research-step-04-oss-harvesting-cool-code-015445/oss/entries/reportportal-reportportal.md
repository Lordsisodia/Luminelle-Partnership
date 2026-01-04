# OSS Project Entry

## Identity

- Name: ReportPortal
- Repo: https://github.com/reportportal/reportportal
- Full name: reportportal/reportportal
- License: Apache-2.0
- Primary language: Java

## What it gives us (plain English)

- A platform UI for aggregating and analyzing automated test results
- A central place to view:
  - failures and trends across runs
  - flaky tests and regressions
  - attachments/logs (depending on integrations)
- Useful if we end up with many merchants/templates and want cross-merchant quality visibility

## What feature(s) it maps to

- Fleet-wide QA telemetry for generated storefronts (across merchants)
- Upgrade review evidence (centralized test result analytics)
- Flakiness management (identify unstable tests in our pipeline)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect (separate platform). Integrates via reporters/adapters.
- Setup friction (self-host? SaaS? Docker?): High-ish (it’s a service/platform).
- Data model alignment: Good if we run frequent E2E/perf checks at scale and want a “single pane of glass”.

## Adoption path

- 1 day POC:
  - Spin up ReportPortal locally (docker compose) and send a minimal test run to it.
  - Validate:
    - we can link from an upgrade PR to a ReportPortal run URL
    - we can store enough metadata (merchant, template version, PR number).
  - Decide whether we want a platform (ReportPortal) vs static reports (Allure/CI artifacts).
- 1 week integration:
  - Implement standardized metadata tags in test runs:
    - `merchantId`, `templateVersion`, `channel` (stable/beta), `prNumber`
  - Integrate with our release/promotion flow:
    - promotion approvals require passing run in ReportPortal
    - store the run URL in audit log
  - Add flake tracking:
    - quarantine tests
    - auto-retry policy and reporting.
- 1 month hardening:
  - RBAC: support vs engineering access to runs and artifacts.
  - Retention + privacy: ensure no PII in logs/screenshots.
  - Dashboards: “template version quality” and “merchant rollout health”.

## Risks

- Maintenance risk: High. Running a platform adds ops load and upgrade responsibilities.
- Security risk: High if artifacts include PII; must enforce strict access controls and redaction/fixtures.
- Scope mismatch: Medium. Might be overkill unless we have large scale and frequent runs.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/reportportal/reportportal
- https://raw.githubusercontent.com/reportportal/reportportal/master/LICENSE

## Score (0–100) + reasoning

- Score: 52
- Why: Potentially high leverage at scale for flakiness and fleet QA, but it’s a heavy platform compared to static report artifacts.

