# OSS Project Entry

## Identity

- Name: Jimp
- Repo: https://github.com/jimp-dev/jimp
- Full name: jimp-dev/jimp
- License: MIT
- Primary language: JavaScript/TypeScript

## What it gives us (plain English)

- A pure-JS image processing toolkit (simpler than sharp; no native deps)
- Useful for small/portable masking steps in CI:
  - draw rectangles
  - simple transforms
- A fallback option when native dependencies are painful

## What feature(s) it maps to

- Screenshot masking/redaction pipeline (lightweight)
- Deterministic artifact processing in CI
- Simple thumbnailing/format conversion for Upgrade Review UI

## Integration notes (vibe-coding lens)

- Stack fit: Strong for Node/TS pipelines.
- Setup friction: Low (no native deps).
- Data model alignment: High if we want “easy to run anywhere” masking in CI.

## Adoption path

- 1 day POC:
  - Implement a “mask rectangles” function using Jimp and run it in CI.
  - Validate output stability and runtime cost vs sharp.
- 1 week integration:
  - Standardize a “mask config” schema shared across masking tools:
    - page types + viewport sizes
    - coordinates to mask
  - Run masking before uploading artifacts to storage.
  - Record masking version/config hash in evidence bundle metadata.
- 1 month hardening:
  - Add selector-driven coordinate capture via Playwright (DOM → coords).
  - Add a “mask drift detection” check (template changed; masks likely need updates).

## Risks

- Maintenance risk: Low/Medium.
- Security risk: Medium. Must ensure masking happens before upload and that original unmasked artifacts are never stored.
- Scope mismatch: Low if we store screenshot artifacts.
- License risk: Low (MIT).

## Sources

- https://github.com/jimp-dev/jimp
- https://raw.githubusercontent.com/jimp-dev/jimp/main/LICENSE

## Score (0–100) + reasoning

- Score: 60
- Why: A simple, portable option for image masking without native deps; useful as a CI-friendly fallback even if sharp is preferred for performance.

