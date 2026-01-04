# OSS Project Entry

## Identity

- Name: sharp
- Repo: https://github.com/lovell/sharp
- Full name: lovell/sharp
- License: Apache-2.0
- Primary language: JavaScript/C++ bindings

## What it gives us (plain English)

- High-performance image processing in Node (resize, composite, blur, crop, format conversion)
- A practical building block for screenshot masking/redaction:
  - overlay rectangles over known dynamic/PII regions
  - generate thumbnails for Upgrade Review UI
- Enables a deterministic “mask then diff” pipeline for visual regression evidence

## What feature(s) it maps to

- Screenshot redaction/masking before artifact upload
- Thumbnail generation for diff viewer UIs
- Visual regression stability (mask dynamic areas to reduce noise)

## Integration notes (vibe-coding lens)

- Stack fit: Strong in Node/TS pipelines (upgrade workers, CI artifacts).
- Setup friction: Medium. Requires defining the mask regions (coordinates) and keeping them stable per template.
- Data model alignment: High if we define per-template “mask configs” (e.g., mask cart count, user name, currency totals).

## Adoption path

- 1 day POC:
  - Take a single screenshot (PDP/cart) and define 2–3 mask rectangles.
  - Use sharp to:
    - overlay solid-color rectangles
    - output masked version
  - Confirm visual diff tooling becomes less flaky.
- 1 week integration:
  - Define a “mask config schema” per template and per page type:
    - fixed viewport sizes
    - named regions to mask (header account, cart badge)
  - Apply masking step before:
    - Lost Pixel/reg-suit snapshot upload
    - pixelmatch diff generation
  - Log mask config version in evidence bundle metadata.
- 1 month hardening:
  - Support dynamic mask strategies:
    - DOM selector-based mask resolution (via Playwright → convert to coordinates)
  - Add safety: always mask known sensitive regions even if templates change.
  - Add a “mask review UI” to tune masks when templates evolve.

## Risks

- Maintenance risk: Medium. Mask configs drift when templates change.
- Security risk: Medium. Masking must happen before upload; otherwise you’ve already leaked PII into artifact storage.
- Scope mismatch: Low if we store screenshots and share them.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/lovell/sharp
- https://raw.githubusercontent.com/lovell/sharp/main/LICENSE

## Score (0–100) + reasoning

- Score: 71
- Why: The most practical “mask images before upload” primitive in Node; biggest win is reducing PII risk and visual regression noise when combined with deterministic viewports.

