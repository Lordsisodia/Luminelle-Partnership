# OSS Project Entry

## Identity

- Name: Unlighthouse
- Repo: https://github.com/harlan-zw/unlighthouse
- Full name: harlan-zw/unlighthouse
- License: MIT
- Primary language: TypeScript

## What it gives us (plain English)

- A developer-friendly Lighthouse runner with a UI for exploring results across pages/routes
- Useful for storefront template upgrades because it can:
  - scan a site and produce page-level performance insights
  - make regressions visible beyond a single URL
- A “report viewer” alternative/complement to Lighthouse CI, with better UX for exploring many pages

## What feature(s) it maps to

- Performance report UX for upgrade reviews (multi-page insights)
- Promotion gating support (evidence: “perf is OK across key routes”)
- Ongoing monitoring for managed storefronts (spot slow pages)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong (TS/Node tool). Works in CI or as a hosted internal tool.
- Setup friction (self-host? SaaS? Docker?): Medium. Requires crawling rules and deterministic fixtures to avoid noise.
- Data model alignment: High if we define “key page set” for each template (home/collection/PDP/cart).

## Adoption path

- 1 day POC:
  - Run Unlighthouse against a staging/preview storefront template deployment.
  - Limit to a small allowlisted route set (to keep runs deterministic).
  - Export results and confirm we can share a report link (or store artifacts).
  - Compare with Lighthouse CI: decide which is better for gating vs exploration.
- 1 week integration:
  - Add Unlighthouse runs to template upgrade workflow:
    - run on preview deploy
    - store report artifacts
    - link from upgrade PR + internal admin
  - Establish thresholds and “override with justification” rules (audited).
  - Add route fixtures:
    - stable product IDs
    - stable collection ordering
    - stable images to avoid random LCP swings.
- 1 month hardening:
  - Build a “template perf trend” dashboard by template version.
  - Add automatic regression detection for key routes.
  - Lock down report access and ensure no PII data is crawled/rendered.

## Risks

- Maintenance risk: Medium. Web perf tooling requires tuning and deterministic inputs.
- Security risk: Medium. Crawling can hit private endpoints; must control route allowlists and auth.
- Scope mismatch: Low/Medium. Great for template upgrades; optional if Lighthouse CI is sufficient.
- License risk: Low (MIT).

## Sources

- https://github.com/harlan-zw/unlighthouse
- https://raw.githubusercontent.com/harlan-zw/unlighthouse/main/LICENSE.md

## Score (0–100) + reasoning

- Score: 67
- Why: A strong “explore performance across many pages” viewer that complements Lighthouse CI; most value comes from good route scoping and deterministic fixtures.

