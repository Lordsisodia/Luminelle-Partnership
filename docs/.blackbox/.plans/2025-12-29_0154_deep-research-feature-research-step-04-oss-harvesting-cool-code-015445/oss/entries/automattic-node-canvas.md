# OSS Project Entry

## Identity

- Name: node-canvas
- Repo: https://github.com/Automattic/node-canvas
- Full name: Automattic/node-canvas
- License: MIT (confirmed via package.json; LICENSE file not found at common paths)
- Primary language: JavaScript/C++ bindings

## What it gives us (plain English)

- A Cairo-backed Canvas implementation for Node.js
- Useful for more advanced screenshot masking/redaction workflows:
  - draw rectangles, blur regions, add “redacted” labels
  - create composite diff images with annotations
- Provides flexibility beyond simple rectangle overlays

## What feature(s) it maps to

- Screenshot masking/redaction (blur/mosaic/labels)
- Visual diff report generation (annotated diff images)
- Upgrade Review UI evidence generation pipeline

## Integration notes (vibe-coding lens)

- Stack fit: Strong if we already use Node for artifact processing.
- Setup friction: Medium/High (native deps like Cairo). Prefer sharp for “simple masking” first.
- Data model alignment: High if we need fine control over redaction visuals.

## Adoption path

- 1 day POC:
  - Build a small script that:
    - loads a screenshot
    - blurs one region and covers another region with a solid rectangle
    - outputs an annotated image
  - Measure friction of native install in CI.
- 1 week integration:
  - Use node-canvas only for “advanced redaction modes”:
    - blur/mosaic for PII
    - text labels like “REDACTED”
  - Keep sharp as default for rectangle masks (faster, simpler).
  - Store mask operations applied in evidence bundle metadata.
- 1 month hardening:
  - Provide a “mask debug” UI and developer workflow to adjust mask regions quickly.
  - Add caching and deterministic rendering controls (fonts, smoothing) to reduce flake.

## Risks

- Maintenance risk: Medium/High due to native dependencies and CI install friction.
- Security risk: Medium. Same rule: masking must happen before upload.
- Scope mismatch: Medium. Only needed if sharp-based masking isn’t sufficient.
- License risk: Medium: MIT indicated in package.json; verify licensing/third-party deps before deep embedding.

## Sources

- https://github.com/Automattic/node-canvas
- https://raw.githubusercontent.com/automattic/node-canvas/master/package.json

## Score (0–100) + reasoning

- Score: 52
- Why: Powerful for advanced masking and annotated visuals, but heavier than sharp; adopt only if we truly need blur/mosaic and can handle native deps.

