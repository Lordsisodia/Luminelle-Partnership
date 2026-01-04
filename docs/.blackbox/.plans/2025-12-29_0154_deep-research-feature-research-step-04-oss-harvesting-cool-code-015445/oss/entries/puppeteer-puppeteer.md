# OSS Project Entry

## Identity

- Name: Puppeteer
- Repo: https://github.com/puppeteer/puppeteer
- Full name: puppeteer/puppeteer
- License: Apache-2.0
- Primary language: TypeScript

## What it gives us (plain English)

- Browser automation for Chrome/Chromium
- Useful specifically for “mask drift” workflows:
  - compute element bounding boxes for selectors (`getBoundingClientRect`)
  - translate DOM selectors into mask coordinates for screenshot redaction
- Provides an alternative to Playwright if needed; but main value is selector→coords extraction patterns

## What feature(s) it maps to

- Mask drift detection and regeneration (DOM selectors → coords)
- Screenshot masking automation (mask before upload)
- Evidence determinism tooling (consistent viewport and capture)

## Adoption path

- 1 day POC:
  - Write a small script that:
    - opens a storefront page
    - finds 3 selectors (e.g., customer name, cart badge, totals)
    - outputs coordinates for those regions at a fixed viewport
  - Use those coords to mask screenshots via sharp/Jimp and confirm effectiveness.
- 1 week integration:
  - Define a “mask ruleset” format:
    - per page type (home/collection/PDP/cart)
    - list of selectors to mask
    - fallback to static rectangles when selector missing
  - Add a CI step:
    - “mask drift check” fails if selectors are missing or bounds are out of expected ranges
    - auto-generate updated mask coords and open a PR if drift is detected
  - Attach mask drift report to upgrade PR evidence bundle.

## Risks

- Maintenance risk: Medium. Selector stability is hard; templates evolve.
- Security risk: Medium. Scripts will load pages; ensure no private data is used (fixtures only).
- Scope mismatch: Medium if we stick with static rectangle masks only.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/puppeteer/puppeteer
- https://raw.githubusercontent.com/puppeteer/puppeteer/main/LICENSE

## Score (0–100) + reasoning

- Score: 65
- Why: Strong primitive for selector-based masking and mask drift detection; overlaps with Playwright but offers additional patterns and ecosystem options.

