# OSS Project Entry

## Identity

- Name: Lighthouse CI
- Repo: https://github.com/GoogleChrome/lighthouse-ci
- Full name: GoogleChrome/lighthouse-ci
- License: Apache-2.0
- Primary language: JavaScript

## What it gives us (plain English)

- Automated Lighthouse runs in CI with:
  - performance budgets
  - SEO checks
  - accessibility scores (as a proxy check)
  - regression tracking via stored reports
- A practical, standardized way to prevent storefront template changes from tanking performance

## What feature(s) it maps to

- Storefront generator performance budgets (LCP/CLS/perf score regressions)
- Promotion gating (block production promotion if budgets fail)
- Auditability of “why a template upgrade was blocked”

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent. This is CI-layer and works with any storefront.
- Setup friction (self-host? SaaS? Docker?): Medium. Needs consistent environments and report storage.
- Data model alignment: High. Operates at URL level; perfect for generated storefront preview URLs.

## Adoption path

- 1 day POC:
  - Run Lighthouse CI against:
    - a baseline storefront template preview
    - a modified template preview
  - Pick 3–5 gating metrics (keep it simple):
    - performance score threshold
    - LCP budget
    - CLS budget
    - SEO score threshold
  - Validate results are stable enough to gate releases (avoid flaky budgets).
- 1 week integration:
  - Add LHCI to the deploy pipeline:
    - run on PR previews
    - store reports as artifacts (S3 or similar)
    - post summary to PR
  - Add “promotion gate”:
    - staging → production requires passing budgets
  - Emit audit events:
    - report URLs, thresholds used, pass/fail, who approved overrides.
- 1 month hardening:
  - Establish deterministic fixtures:
    - stable data
    - consistent CDN/cache states
    - fixed device profiles
  - Add “override with justification” flow for exceptional cases.
  - Track template performance over time per template version.

## Risks

- Maintenance risk: Medium. Performance tests can be flaky without deterministic conditions.
- Security risk: Low/Medium. Ensure reports don’t include PII and preview URLs are protected.
- Scope mismatch: Low. Highly aligned with managed storefront upgrades.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/GoogleChrome/lighthouse-ci
- https://raw.githubusercontent.com/GoogleChrome/lighthouse-ci/main/LICENSE

## Score (0–100) + reasoning

- Score: 75
- Why: Strong, permissive tooling to enforce performance/SEO budgets and gate storefront promotions; key for preventing regressions in generated template upgrades.

