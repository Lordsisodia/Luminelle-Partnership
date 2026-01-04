# OSS Project Entry

## Identity

- Name: react-virtuoso
- Repo: https://github.com/petyosi/react-virtuoso
- Package: `react-virtuoso`
- License: MIT (npm metadata)
- Primary language: TypeScript
- Homepage: https://virtuoso.dev/
- Notes: GitHub API rate-limited; metadata sourced from npm registry.

## What it gives us (plain English)

- A higher-level virtualization component for long lists with UX niceties
- Good fit for “event timeline” and “delivery logs” views where rows can vary in height (expanded detail)
- Useful alternative to lower-level virtualization primitives depending on desired UX

## What feature(s) it maps to

- Audit/event timeline UI (expandable rows, drill-down)
- Webhook delivery logs (expand failure details per row)
- Support investigations pages (fast scrolling across big datasets)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent.
- Setup friction: Low.
- Data model alignment: Works best when each row can be rendered independently and we can fetch details lazily (e.g., “expand row loads payload”).

## Adoption path

- 1 day POC:
  - Implement a “Webhook Deliveries” list with expandable rows for headers/error.
  - Ensure virtualization behaves correctly with expanded content.
- 1 week integration:
  - Add “jump to time”, “jump to correlationId”, and lazy detail fetching.
  - Standardize list keyboard navigation and copy-to-clipboard affordances.
- 1 month hardening:
  - Add accessibility checks and performance profiling for the largest tenants.

## Risks

- Maintenance risk: Low.
- Security risk: Medium. Expanded rows often render raw payloads; enforce redaction in API.
- Scope mismatch: Low.
- License risk: Low (MIT).

## Sources

- https://registry.npmjs.org/react-virtuoso
- https://github.com/petyosi/react-virtuoso

## Score (0–100) + reasoning

- Score: 80
- Why: Strong “timeline list” primitive for audit/webhook pages; particularly good when rows expand/collapse.
