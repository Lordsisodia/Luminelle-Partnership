# OSS Project Entry

## Identity

- Name: Changesets
- Repo: https://github.com/changesets/changesets
- Full name: changesets/changesets
- License: MIT
- Primary language: TypeScript

## What it gives us (plain English)

- A practical versioning + changelog system for a multi-package codebase
- A workflow for “template version upgrades” that is auditable and reviewable:
  - define a change (a changeset)
  - generate changelog + bump version
  - publish/release with a consistent process
- Excellent fit for managing:
  - storefront template versions
  - theme starter kit versions
  - shared UI kit versions used across generated stores

## What feature(s) it maps to

- Template versioning (storefront/theme generator)
- Upgrade/migration workflows (clear release notes + semver)
- “Release channel” support (stable vs next) via versioning discipline
- Auditability: “what changed in the template between vX and vY?”

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent if our templates are TS/JS repos (Hydrogen/Next.js generators).
- Setup friction (self-host? SaaS? Docker?): Low. Mostly repo discipline + CI automation.
- Data model alignment: High for “we maintain templates and generate projects”.

## Adoption path

- 1 day POC:
  - Add Changesets to the storefront template repo (or a sandbox template repo).
  - Make 2 template changes:
    - minor: new section/component
    - patch: bugfix CSS/layout tweak
  - Generate a changelog and verify it is readable by non-engineers (support/ops).
  - Decide our release policy: semver rules for template changes.
- 1 week integration:
  - Establish a “template release” workflow:
    - PR requires a changeset for user-facing template changes
    - CI validates changesets exist when required
    - release automation (tag + changelog generation)
  - Add “template upgrade tool” foundations:
    - a manifest describing what files are generator-owned vs merchant-owned
    - a diff report shown to support/ops for approvals
  - Record template version in our platform DB per merchant deployment.
- 1 month hardening:
  - Support multiple channels:
    - `stable` (default)
    - `beta/next` (early adopters)
  - Automate upgrade PRs for client storefront repos (optional) and add guardrails:
    - run Theme Check/Playwright/Lost Pixel on upgrade PR
    - require explicit approval for breaking diffs
  - Build internal UI: “merchant X is on template vY; upgrade available vZ”.

## Risks

- Maintenance risk: Low. It’s a process/tooling choice; main risk is human discipline.
- Security risk: Low. Mostly around not leaking merchant secrets in changelogs/diffs.
- Scope mismatch: Low if we own template repos. Less relevant if we only do one-off builds with no shared templates.
- License risk: Low (MIT).

## Sources

- https://github.com/changesets/changesets
- https://raw.githubusercontent.com/changesets/changesets/main/LICENSE

## Score (0–100) + reasoning

- Score: 77
- Why: A strong “template versioning backbone” that makes upgrades auditable and manageable; fits perfectly with a template-driven storefront generation model.

