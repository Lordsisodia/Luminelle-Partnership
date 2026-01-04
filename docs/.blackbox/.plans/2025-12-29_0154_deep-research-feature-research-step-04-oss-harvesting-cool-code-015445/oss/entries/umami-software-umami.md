# OSS Project Entry

## Identity

- Name: umami
- Repo: https://github.com/umami-software/umami
- Full name: umami-software/umami
- License: MIT
- Stars (approx): 34413
- Forks (approx): 6158
- Primary language: TypeScript
- Last updated: 2025-12-28T19:17:41Z
- Topics: analytics, audience-segmentation, charts, cohort-analysis, google-analytics, product-analytics, statistics, user-journey, web-analytics

## What it gives us (plain English)

- A modern, privacy-focused analytics UI with clean dashboards and filtering
- Useful UX patterns for “event-ish” exploration (time ranges, segmentation, breakdowns)
- A lightweight alternative to larger analytics stacks for internal admin usage analytics
- Frontend patterns we can borrow for our own audit/event viewer pages (tables, charts, drill-down)

## What feature(s) it maps to

- Admin usage analytics (how merchants/support use the product)
- Lightweight internal dashboards (ops/health)
- UI patterns for event filtering and reporting

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong. TS stack; can be self-hosted; integrates by emitting tracking events.
- Setup friction (self-host? SaaS? Docker?): Medium. Another service to run, but smaller footprint than full analytics stacks.
- Data model alignment: Good for web analytics events; not a replacement for product audit logs (different schema and permissions needs).

## Adoption path

- 1 day POC:
  - Run Umami locally and instrument the admin app with a minimal event taxonomy (page views + key actions).
  - Validate dashboards and ensure privacy constraints (no PII).
  - Decide if we want to self-host analytics vs use a vendor.
- 1 week integration:
  - Define an “admin telemetry contract” (allowed fields, redaction rules, retention).
  - Add dashboards for: admin error rates, slow pages, top workflows.
  - Add internal access controls and environment separation.
- 1 month hardening:
  - Add monitoring/backups and ensure tracking scripts don’t impact performance.
  - Add governance for what is tracked and how data is used.

## Risks

- Maintenance risk: Medium. Analytics services still need patching and ops.
- Security risk: Medium. Analytics can leak sensitive info if events are not curated; enforce strict “no PII” rules.
- Scope mismatch: Medium. Great for usage analytics; not an audit log viewer.
- License risk: Low (MIT).

## Sources

- https://github.com/umami-software/umami

## Score (0–100) + reasoning

- Score: 70
- Why: A clean, permissive analytics UI and solid patterns for dashboards; useful either as a lightweight self-hosted option or as inspiration for admin telemetry UX.

---

## Repo description (from GitHub)

Umami is a modern, privacy-focused analytics platform. An open-source alternative to Google Analytics, Mixpanel and Amplitude.
