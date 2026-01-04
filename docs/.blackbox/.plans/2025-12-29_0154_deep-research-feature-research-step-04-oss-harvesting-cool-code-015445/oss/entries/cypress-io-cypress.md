# OSS Project Entry

## Identity

- Name: Cypress
- Repo: https://github.com/cypress-io/cypress
- Full name: cypress-io/cypress
- License: MIT
- Primary language: JavaScript/TypeScript

## What it gives us (plain English)

- E2E testing framework with strong developer ergonomics and screenshots/videos
- Useful for “mask drift” and evidence workflows because:
  - it produces rich artifacts by default
  - it can compute DOM element positions easily (selectors → coordinates)
- Alternative/complement to Playwright depending on team preference

## What feature(s) it maps to

- Mask drift detection (selectors exist + are stable)
- Artifact generation conventions (screenshots/videos)
- Upgrade gating (smoke tests) if we choose Cypress as the test harness

## Adoption path

- 1 day POC:
  - Write a minimal test that:
    - navigates to PDP/cart
    - takes screenshots at fixed viewport
    - outputs selector bounding boxes for mask regions (custom command)
  - Compare artifact ergonomics vs Playwright.
- 1 week integration:
  - Use Cypress as:
    - test runner (optional), and/or
    - “mask drift verifier” that asserts selectors exist and are in expected places
  - Integrate with upgrade PR flow:
    - run on preview
    - upload masked screenshots (mask before upload)
    - attach artifacts to evidence bundle.

## Risks

- Maintenance risk: Medium (any E2E suite needs upkeep).
- Security risk: Medium (artifacts can leak PII unless fixtures are scrubbed and masking happens before upload).
- Scope mismatch: Medium if we already standardized on Playwright.
- License risk: Low (MIT).

## Sources

- https://github.com/cypress-io/cypress
- https://raw.githubusercontent.com/cypress-io/cypress/master/LICENSE

## Score (0–100) + reasoning

- Score: 57
- Why: Strong alternative for E2E + artifact ergonomics; adopt only if it improves team velocity versus Playwright, otherwise use it as a patterns reference for selector-based masking workflows.

