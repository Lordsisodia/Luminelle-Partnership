# OSS Project Entry

## Identity

- Name: matomo
- Repo: https://github.com/matomo-org/matomo
- Full name: matomo-org/matomo
- License: GPL-3.0
- Stars (approx): 21138
- Forks (approx): 2793
- Primary language: PHP
- Last updated: 2025-12-28T13:10:22Z
- Topics: analytics, growth, hacktoberfest, intranet, log, marketing, matomo, mobile, mysql, php, piwik, privacy, security, web-analytics, website

## What it gives us (plain English)

- A full web analytics platform we can self-host (privacy-oriented alternative to GA)
- Useful patterns for “event tracking” and analytics UI that can inform our admin telemetry
- A possible internal source of truth for “admin usage analytics” and product analytics if we need it
- A mature reporting and dashboard surface (but broader than “audit log viewer”)

## What feature(s) it maps to

- Admin usage analytics (internal understanding of how clients use the admin)
- Product analytics for storefronts (if we choose to self-host analytics)
- Event pipelines and reporting patterns (ideas to borrow)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Standalone analytics platform; integration via tracking events from apps/admin.
- Setup friction (self-host? SaaS? Docker?): Medium. Needs hosting, DB, and maintenance; less complex than some BI stacks but still ongoing ops.
- Data model alignment: Primarily for web analytics events, not “business audit events”; keep those separate.

## Adoption path

- 1 day POC:
  - Run Matomo locally and instrument a small set of admin events (page views, key actions).
  - Validate dashboards and privacy controls.
  - Decide whether this is for internal analytics only (recommended).
- 1 week integration:
  - Define an “admin analytics” event taxonomy (what we track, what we never track).
  - Add environment separation and access controls for staff.
  - Add incident response plan for analytics data handling.
- 1 month hardening:
  - Add retention policies, export flows, and monitoring.

## Risks

- Maintenance risk: Medium. Analytics platforms require ongoing patching and ops.
- Security risk: Medium. Event data can include sensitive information if we’re careless; enforce strict privacy rules.
- Scope mismatch: High for this tranche. This is analytics, not an audit log viewer UX; treat as “nice to have” unless analytics is a core requirement.
- License risk: High. GPL-3.0 is restrictive; treat as “flag” under a permissive-first posture.

## Sources

- https://github.com/matomo-org/matomo

## Score (0–100) + reasoning

- Score: 45
- Why: Useful analytics patterns, but GPL licensing and scope mismatch make it less attractive than other primitives for our core admin/audit needs.

---

## Repo description (from GitHub)

Empowering People Ethically 🚀 — Matomo is hiring! Join us → https://matomo.org/jobs Matomo is the leading open-source alternative to Google Analytics, giving you complete control and built-in privacy. Easily collect, visualise, and analyse data from websites & apps. Star us on GitHub ⭐️  – Pull Requests welcome!
