# OSS Project Entry

## Identity

- Name: sitespeed.io
- Repo: https://github.com/sitespeedio/sitespeed.io
- Full name: sitespeedio/sitespeed.io
- License: MIT
- Primary language: JavaScript

## What it gives us (plain English)

- Web performance testing toolkit that can run on URLs and produce structured reports
- A way to standardize “storefront performance regression checks” across:
  - template previews
  - staging
  - production
- Useful “fixture discipline” patterns: reproducible runs, consistent metrics, CI integration

## What feature(s) it maps to

- Performance budgets and regression detection for generated storefronts
- Release gating (promotion blocked if performance regresses)
- Ongoing monitoring for managed storefronts (catch regressions outside deploys)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent (URL-driven).
- Setup friction (self-host? SaaS? Docker?): Medium. Needs CI runners and consistent conditions (device profile, cache/cdn behavior).
- Data model alignment: High for a “generated storefront + managed app” model where preview URLs exist.

## Adoption path

- 1 day POC:
  - Run sitespeed.io against:
    - a baseline storefront preview URL
    - a modified storefront preview URL
  - Define 2–3 “don’t regress” metrics (keep minimal):
    - page weight
    - load timing proxies
    - core web vitals proxy outputs (depending on chosen tooling configuration)
  - Verify runs are stable enough to gate merges (avoid flakiness).
- 1 week integration:
  - Wire into our generator pipeline:
    - run against PR previews
    - store reports as build artifacts
    - post summary to PR
  - Add policy:
    - threshold overrides require explicit approval + audit event
  - Integrate with alerting:
    - if production regresses, notify ops (ntfy/Apprise/Gotify)
- 1 month hardening:
  - Determinism controls:
    - stable data fixtures
    - fixed viewport/device profiles
    - consistent caching settings
  - Roll results up into a “template version quality” dashboard (perf trends).
  - Add “per-template critical path” page list (home/collection/PDP/cart).

## Risks

- Maintenance risk: Medium. Like all perf tooling, needs tuning and determinism.
- Security risk: Low/Medium. Ensure reports don’t capture PII and preview URLs are protected.
- Scope mismatch: Low. Strongly aligned with managed storefront operations.
- License risk: Low (MIT).

## Sources

- https://github.com/sitespeedio/sitespeed.io
- https://raw.githubusercontent.com/sitespeedio/sitespeed.io/main/LICENSE

## Score (0–100) + reasoning

- Score: 70
- Why: A permissive, flexible performance testing tool that supports repeatable budgets and can be used both for upgrade gating and ongoing monitoring.

