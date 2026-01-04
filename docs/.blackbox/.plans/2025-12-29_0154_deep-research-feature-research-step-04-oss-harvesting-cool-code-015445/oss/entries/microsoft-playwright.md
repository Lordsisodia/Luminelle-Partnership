# OSS Project Entry

## Identity

- Name: Playwright
- Repo: https://github.com/microsoft/playwright
- Full name: microsoft/playwright
- License: Apache-2.0
- Primary language: TypeScript

## What it gives us (plain English)

- End-to-end browser automation for:
  - storefront smoke tests (PDP/cart/checkout handoff)
  - admin UI flows (support tools, audit viewer, provisioning flows)
- Production-ready testing primitives:
  - multi-browser coverage
  - reliable selectors and fixtures
  - screenshots/video/traces (great for debugging)
- A strong foundation for visual regression testing via screenshots

## What feature(s) it maps to

- Storefront generator QA (smoke tests + regression tests)
- Visual regression testing for templates/themes (baseline screenshots)
- Preview environment gating (block promotion if tests fail)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent for our stack and workflow.
- Setup friction (self-host? SaaS? Docker?): Medium. Needs CI runners + browsers; but common and well-supported.
- Data model alignment: High (tests operate at UI layer; backend agnostic).

## Adoption path

- 1 day POC:
  - Write a minimal smoke suite for a storefront:
    - open home → navigate to product → add to cart → verify cart UI → proceed to checkout handoff
  - Add trace recording in CI so failures are debuggable.
  - Decide the “gating policy”:
    - smoke tests required for promotion to production
    - optional for dev previews
- 1 week integration:
  - Create a reusable Playwright “storefront test harness”:
    - standard selectors/contracts that templates must implement
    - per-merchant config (base URL, credentials if needed)
  - Add visual snapshots for critical pages (home/collection/PDP/cart).
  - Hook into our deploy pipeline:
    - run tests against preview deployment
    - emit audit event with test results and artifacts (screenshots/traces)
- 1 month hardening:
  - Build flaky-test controls (retries, quarantines, parallelization).
  - Add performance checks (basic budgets) and accessibility smoke checks (optional).
  - Make results visible to support/ops (dashboards + alerting on regressions).

## Risks

- Maintenance risk: Medium. UI tests can be brittle; mitigate with stable contracts/selectors and a template “testability spec”.
- Security risk: Medium. Handling secrets for preview URLs and any test credentials.
- Scope mismatch: Low. Strong generic primitive for storefront + admin QA.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/microsoft/playwright
- https://raw.githubusercontent.com/microsoft/playwright/main/LICENSE

## Score (0–100) + reasoning

- Score: 80
- Why: Best-in-class E2E testing primitive with strong debugging artifacts; directly enables “managed storefront” quality gates and regression protection.

