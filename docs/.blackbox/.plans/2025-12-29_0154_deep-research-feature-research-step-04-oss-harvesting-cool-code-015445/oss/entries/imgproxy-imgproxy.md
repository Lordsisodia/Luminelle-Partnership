# OSS Project Entry

## Identity

- Name: imgproxy
- Repo: https://github.com/imgproxy/imgproxy
- Full name: imgproxy/imgproxy
- License: MIT
- Primary language: Go

## What it gives us (plain English)

- A fast image processing proxy (resize/transform) that supports signed URLs
- Useful for safely serving artifact images:
  - screenshot diffs
  - baseline screenshots
  - visual regression outputs
- Can provide:
  - consistent resizing/thumbnails in Upgrade Review UI
  - signature-based access control (in addition to oauth2-proxy)

## What feature(s) it maps to

- Artifact serving layer for screenshots/diffs (thumbnails + caching)
- Signed URL patterns for artifact access
- Upgrade Review UI ergonomics (fast previews, click-to-open full res)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong as a service. We can store artifacts in object storage and serve via imgproxy.
- Setup friction (self-host? SaaS? Docker?): Medium. Another service to run, but simpler than a full platform.
- Data model alignment: High if we want controlled, cacheable access to image artifacts.

## Adoption path

- 1 day POC:
  - Store a few screenshot artifacts in object storage (or local).
  - Serve them through imgproxy with:
    - thumbnail size
    - full-res links
    - signed URLs
  - Validate Upgrade Review UI can load:
    - diff thumbnails quickly
    - full resolution on demand.
- 1 week integration:
  - Standardize image artifact paths and caching:
    - thumbnails cached aggressively
    - originals served on demand
  - Add access control:
    - imgproxy signatures
    - oauth2-proxy in front of any artifact index endpoints
  - Add audit logging for accesses (who viewed what).
- 1 month hardening:
  - Add masking workflows for sensitive regions (cart totals, emails) before screenshots are stored.
  - Add retention policies and garbage collection.
  - Ensure headers/CORS rules are safe for internal admin usage.

## Risks

- Maintenance risk: Medium. Additional service to operate.
- Security risk: Medium/High. If signatures are mishandled, artifacts could leak; enforce short TTLs and strict indexing controls.
- Scope mismatch: Medium. If we’re happy serving raw artifacts via signed S3 URLs, imgproxy may be optional.
- License risk: Low (MIT).

## Sources

- https://github.com/imgproxy/imgproxy
- https://raw.githubusercontent.com/imgproxy/imgproxy/master/LICENSE

## Score (0–100) + reasoning

- Score: 65
- Why: Useful for scalable and user-friendly image artifact serving (thumbnails + signed URLs), but only worth it if we want a dedicated artifact-serving layer.

