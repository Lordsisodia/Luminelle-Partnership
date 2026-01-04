# OSS Project Entry

## Identity

- Name: release-please
- Repo: https://github.com/googleapis/release-please
- Full name: googleapis/release-please
- License: Apache-2.0
- Primary language: TypeScript

## What it gives us (plain English)

- Automated releases based on conventional commits / PR history
- A way to make “template releases” and “generator releases”:
  - consistent
  - low-touch
  - auditable (release PRs, changelogs, tags)
- Useful for any repo we operate as a product:
  - storefront templates
  - theme starter kits
  - internal generator CLI/tooling

## What feature(s) it maps to

- Template versioning automation (release PRs, changelogs, tags)
- Release channels & promotion workflow (stable releases + preview releases via branches)
- Auditability of deployables (“what code is currently deployed?”)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong for TS repos; also works broadly via GitHub workflows.
- Setup friction (self-host? SaaS? Docker?): Low. Needs GitHub permissions and repo conventions.
- Data model alignment: High if we treat templates and generator tooling as versioned products.

## Adoption path

- 1 day POC:
  - Enable release-please on a sandbox repo (template or generator tooling).
  - Make 3 commits that would appear in a release:
    - feat: new section
    - fix: bugfix
    - chore: internal refactor
  - Verify release PR creation + generated changelog quality.
  - Decide whether we enforce conventional commits across storefront template work.
- 1 week integration:
  - Apply release automation to:
    - storefront template repos
    - theme starter kit
    - generator CLI/internal libraries
  - Add release metadata emission:
    - when a release is created, emit an audit event into our system
    - store template version + git SHA used for a merchant deployment
  - Add branching policy for “beta vs stable” template releases.
- 1 month hardening:
  - Standardize release notes format for support/ops.
  - Add “upgrade PR generator” for merchant storefront repos (optional):
    - bump template dependencies
    - run CI gates (Theme Check + Playwright + Lost Pixel)
  - Track adoption: which merchants are on which template versions and how upgrades correlate to incidents.

## Risks

- Maintenance risk: Low/Medium. Requires repo conventions and occasional config maintenance.
- Security risk: Medium. GitHub token permissions, release automation integrity, and auditability are important.
- Scope mismatch: Low if we have multiple templates/generators; less useful if everything is bespoke.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/googleapis/release-please
- https://raw.githubusercontent.com/googleapis/release-please/main/LICENSE

## Score (0–100) + reasoning

- Score: 74
- Why: Excellent automation primitive for making template/tooling releases consistent and auditable; pairs well with a managed storefront generation pipeline.

