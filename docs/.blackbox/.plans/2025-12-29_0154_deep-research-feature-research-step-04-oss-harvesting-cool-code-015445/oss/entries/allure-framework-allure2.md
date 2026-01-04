# OSS Project Entry

## Identity

- Name: Allure Report (Allure 2)
- Repo: https://github.com/allure-framework/allure2
- Full name: allure-framework/allure2
- License: Apache-2.0
- Primary language: Java

## What it gives us (plain English)

- A UI and report format for test execution results:
  - suites/tests/steps, attachments, screenshots, traces
  - trends/history across runs
- A usable “artifact viewer” for:
  - Playwright E2E results (via adapter/export)
  - integration tests for storefront generator pipelines
- A strong reference for how to model “test evidence” for approvals (pass/fail + artifacts)

## What feature(s) it maps to

- Upgrade review evidence: test results UI linked from upgrade PRs and internal admin
- Preview gating: attach test report URLs to “promote to production” approvals
- Incident triage: historical view of regressions across template versions

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect (report UI + format), but can be hosted and linked into our admin/support tooling.
- Setup friction (self-host? SaaS? Docker?): Medium. Needs storage for results and a place to host/view reports.
- Data model alignment: High if we standardize “every upgrade PR produces a report bundle”.

## Adoption path

- 1 day POC:
  - Generate an Allure report from one test run (storefront smoke suite).
  - Attach at least one artifact (screenshot, trace, or log).
  - Host the report as a static artifact (CI artifact or simple object storage) and verify it’s shareable to support/ops.
  - Decide whether Allure is our primary viewer or “one of multiple” viewers.
- 1 week integration:
  - Standardize report generation in the upgrade pipeline:
    - on preview deployments, run Playwright and export a report bundle
    - upload to artifact storage and produce a stable URL
  - Attach the report URL to:
    - upgrade PR description
    - internal audit event (“upgrade PR opened” / “promotion approved”)
  - Add retention policy:
    - keep last N runs per template version + per merchant (no PII fixtures).
- 1 month hardening:
  - Add indexing/metadata so reports are searchable by:
    - merchant, template version, PR, date, failing tests
  - Add RBAC controls for report access (support vs engineering).
  - Add redaction and fixture rules to ensure artifacts never contain PII.

## Risks

- Maintenance risk: Medium. Adapters/report generation can drift; keep versions pinned.
- Security risk: High if screenshots/traces include PII. Must enforce scrubbed fixtures and access controls.
- Scope mismatch: Medium. If we rely entirely on GitHub checks and don’t need a separate viewer, Allure may be “nice to have”.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/allure-framework/allure2
- https://raw.githubusercontent.com/allure-framework/allure2/main/LICENSE

## Score (0–100) + reasoning

- Score: 64
- Why: A mature report viewer that can unify “evidence” across test runs, but requires discipline around artifact storage, privacy, and long-term maintenance of adapters.

