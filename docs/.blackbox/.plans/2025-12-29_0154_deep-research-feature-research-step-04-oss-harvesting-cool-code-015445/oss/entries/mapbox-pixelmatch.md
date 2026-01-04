# OSS Project Entry

## Identity

- Name: pixelmatch
- Repo: https://github.com/mapbox/pixelmatch
- Full name: mapbox/pixelmatch
- License: ISC
- Primary language: JavaScript

## What it gives us (plain English)

- A tiny, well-known image diff primitive (pixel-by-pixel) used in visual regression tooling
- Useful for building:
  - custom visual diff pipelines
  - server-side diff generation (if we want our own Lost Pixel/reg-suit-like workflow)
- A solid “primitive” for turning two screenshots into a diff image + mismatch stats

## What feature(s) it maps to

- Visual regression engine primitive (screenshot diff generation)
- Upgrade review evidence (generate diff images for “what changed visually?”)
- Risk scoring (diff magnitude thresholds for approvals)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong as a Node/TS utility dependency.
- Setup friction (self-host? SaaS? Docker?): Low. It’s a library.
- Data model alignment: High if we store screenshots in artifact storage and compute diffs as part of upgrade PR workflow.

## Adoption path

- 1 day POC:
  - Generate two screenshots of a storefront page (baseline + upgraded).
  - Use pixelmatch to produce:
    - diff image
    - mismatch percentage
  - Store artifacts and link from an “upgrade report” JSON.
- 1 week integration:
  - Build a small “visual diff worker”:
    - downloads baseline + candidate screenshots
    - runs pixelmatch
    - uploads diff images and writes a summary report
  - Integrate with Upgrade Review UI:
    - show diff images inline
    - allow “approve baseline update” with audit log
  - Add deterministic controls (viewport, fonts, stable data fixtures).
- 1 month hardening:
  - Add threshold tuning per template/page.
  - Add masking/redaction (mask dynamic regions like cart count, user names).
  - Add report indexing: which template versions caused biggest diffs.

## Risks

- Maintenance risk: Low.
- Security risk: Medium. Screenshot artifacts can include PII; must use scrubbed fixtures and access controls.
- Scope mismatch: Medium if we rely entirely on an external visual diff platform.
- License risk: Low (ISC is permissive).

## Sources

- https://github.com/mapbox/pixelmatch
- https://raw.githubusercontent.com/mapbox/pixelmatch/main/LICENSE

## Score (0–100) + reasoning

- Score: 61
- Why: A simple, permissive image diff primitive that’s ideal if we want ownership/control over visual diff artifacts and thresholds.

