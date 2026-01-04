# OSS Project Entry

## Identity

- Name: Shopify CLI
- Repo: https://github.com/Shopify/cli
- Full name: Shopify/cli
- License: MIT
- Primary language: Ruby (core) + JS tooling; ships cross-platform CLI binaries

## What it gives us (plain English)

- Shopify’s official developer CLI for building apps, themes, and Hydrogen storefronts
- Scaffolding + dev ergonomics:
  - project generation
  - local dev servers + tunneling patterns
  - deployment/publish workflows (themes, apps, extensions)
- A “gold standard” reference for the operational workflow we want for managed client storefronts:
  - provision → dev → preview → deploy → support

## What feature(s) it maps to

- Storefront/app generation automation (scaffolding + repeatable setup)
- DevOps workflows for managed merchant clients (preview links, environment wiring)
- Integration ergonomics (how to standardize auth/tokens and developer experience)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect. We likely *use* the CLI rather than embed it, but it’s a strong source of patterns.
- Setup friction (self-host? SaaS? Docker?): Low. It’s a CLI; integration is mostly about scripting + adopting conventions.
- Data model alignment: High for Shopify. This is Shopify’s intended workflow.

## Adoption path

- 1 day POC:
  - Use Shopify CLI to scaffold:
    - a theme project and push to a dev store
    - a Hydrogen storefront project (if we choose that path)
  - Document the “golden path” commands for:
    - preview theme
    - publish theme
    - deploy storefront
  - Identify where we want automation wrappers (one command to provision + deploy a client storefront).
- 1 week integration:
  - Build a thin wrapper around Shopify CLI for our internal “store generator”:
    - provision a dev store (if we do this) or connect to existing merchant store
    - create and push a theme/storefront from a template
    - set up preview URLs and deployment channels
  - Add guardrails:
    - enforce consistent config locations and naming
    - record deployments into our audit log (who deployed what, when)
    - store safe metadata for rollback (previous theme ID/commit)
- 1 month hardening:
  - CI/CD: consistent deploy pipelines with per-tenant environments.
  - Error handling + retries + alerting (theme push failures, permissions issues).
  - Standardize “support playbook” using CLI + our own admin tooling.

## Risks

- Maintenance risk: Low/Medium. CLI changes can break wrappers; mitigate with pinned versions and integration tests.
- Security risk: Medium. Token handling, store access, and auditability of deploy actions.
- Scope mismatch: Low. If we’re Shopify-first, this is directly relevant.
- License risk: Low (MIT).

## Sources

- https://github.com/Shopify/cli
- https://raw.githubusercontent.com/Shopify/cli/main/LICENSE

## Score (0–100) + reasoning

- Score: 70
- Why: Not a UI primitive, but a critical operational building block/pattern repo for automating storefront/app generation and deployments in a managed-service model.

