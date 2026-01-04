# OSS Project Entry

## Identity

- Name: umami
- Repo: https://github.com/umami-software/umami
- Full name: umami-software/umami
- License: ✅ permissive — MIT
- Stars (approx): 34410
- Primary language: TypeScript
- Last updated: 2025-12-28T13:19:33Z
- Topics: analytics, audience-segmentation, charts, cohort-analysis, google-analytics, product-analytics, statistics, user-journey, web-analytics

## What it gives us (plain English)

- Umami is a modern, privacy-focused analytics platform. An open-source alternative to Google Analytics, Mixpanel and Amplitude.
- Why this matters: Unlocks dashboards + funnels without building an analytics pipeline from scratch.

## What feature(s) it maps to

- analytics

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth):
  - TS/JS-native; can integrate via package, embed UI patterns, or run as a service with API boundary.
- Setup friction (self-host? SaaS? Docker?): Prefer event ingestion via existing SDKs; self-host behind auth where possible.
- Data model alignment: Only ingest the minimum event schema we need; keep PII handling explicit.

## Adoption path

- 1 day POC: Ingest 5–10 key events + render a basic dashboard.
- 1 week integration: Add funnels/cohorts + anomaly alerts + per-client segmentation.
- 1 month hardening: Data retention policy + RBAC + export pipelines.

## Risks

- Maintenance risk: upgrades + ecosystem drift; mitigate with pinning + quarterly update cadence.
- Security risk: treat as privileged system; isolate network + secrets; audit write actions.
- Scope mismatch: avoid "replace our platform" scope; extract one slice at a time.
- License risk: Verify LICENSE file + terms (flag for legal review if copyleft/fair-code/unknown).

## Sources

- https://github.com/umami-software/umami

## Score (0–100) + reasoning

- Score: …
- Why: …
