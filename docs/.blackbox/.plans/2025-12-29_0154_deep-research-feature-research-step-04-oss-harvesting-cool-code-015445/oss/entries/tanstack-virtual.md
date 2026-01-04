# OSS Project Entry

## Identity

- Name: TanStack Virtual
- Repo: https://github.com/TanStack/virtual
- Package: `@tanstack/react-virtual`
- License: MIT (npm metadata)
- Primary language: TypeScript
- Homepage: https://tanstack.com/virtual
- Notes: GitHub API rate-limited; metadata sourced from npm registry.

## What it gives us (plain English)

- A virtualization primitive for rendering huge lists/tables efficiently
- Key for an audit/event viewer where result sets can be very large (webhook deliveries, job runs, event streams)
- Helps keep admin UX fast without forcing premature backend aggregation

## What feature(s) it maps to

- Audit/event viewer performance (virtualized lists)
- Webhook delivery logs UX
- Job queue / workflow run history UX

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent. Works well alongside TanStack Table.
- Setup friction (self-host? SaaS? Docker?): Low. Library only.
- Data model alignment: Doesn’t dictate schema; it enables UI performance for high volume datasets.

## Adoption path

- 1 day POC:
  - Add virtualization to the “Audit Events” list and confirm smooth scrolling on 10k+ rows.
  - Implement sticky headers and basic row height strategy.
- 1 week integration:
  - Standardize table/list primitives (virtualized list component + empty/loading/error states).
  - Add keyboard navigation and “jump to time” behavior for event timelines.
- 1 month hardening:
  - Add performance monitoring and regression checks for large datasets.

## Risks

- Maintenance risk: Low.
- Security risk: Low. Mostly a UI performance tool.
- Scope mismatch: Low.
- License risk: Low (MIT).

## Sources

- https://registry.npmjs.org/@tanstack/react-virtual
- https://github.com/TanStack/virtual

## Score (0–100) + reasoning

- Score: 82
- Why: Necessary performance primitive once audit/event datasets get large; easy to integrate.
