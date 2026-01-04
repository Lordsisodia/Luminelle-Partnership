# OSS Project Entry

## Identity

- Name: create-pull-request (GitHub Action)
- Repo: https://github.com/peter-evans/create-pull-request
- Full name: peter-evans/create-pull-request
- License: MIT
- Primary language: TypeScript

## What it gives us (plain English)

- A proven GitHub Action to create/update PRs automatically from a workflow
- A core building block for “template upgrade PR generation”:
  - run generator updates on a schedule or on template release
  - open PRs against client storefront repos
  - keep PRs updated until merged/closed
- Lets us operationalize “managed upgrades” at scale without inventing PR automation from scratch

## What feature(s) it maps to

- Automated upgrade PRs for merchant storefront repos
- Approval workflow (PR review as the human gate)
- Audit trail (PR history + CI results + approvals)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong. It’s GitHub-native, works with any language repo.
- Setup friction (self-host? SaaS? Docker?): Low. Needs GitHub Actions permissions and a workflow design.
- Data model alignment: High if we manage many client repos and want consistent upgrade cycles.

## Adoption path

- 1 day POC:
  - Create a workflow in a sandbox client storefront repo:
    - checkout repo
    - run a simple “template bump” script (e.g., update a version file)
    - use create-pull-request to open a PR
  - Verify idempotency: rerun workflow updates the same PR instead of creating new ones.
- 1 week integration:
  - Integrate into the real template upgrade pipeline:
    - trigger on template release (release-please/Changesets)
    - or scheduled (weekly) upgrade checks
  - Add CI gating:
    - Theme Check / Playwright / Lost Pixel / Lighthouse CI on the PR
  - Standardize PR metadata:
    - template version bump
    - changelog links
    - risk checklist and rollback plan
  - Emit an internal audit event when a PR is opened/merged (so support/admin sees upgrade history).
- 1 month hardening:
  - Add per-merchant controls:
    - opt-in/out of auto-upgrades
    - release channels (stable vs beta)
    - maintenance windows
  - Add automatic backoff if PRs remain unmerged or tests flake.
  - Build internal dashboard: “which merchants have pending upgrades?”

## Risks

- Maintenance risk: Low/Medium. GitHub Actions change over time; workflows need occasional upkeep.
- Security risk: Medium. Token scopes, repo permissions, supply chain risk in workflows.
- Scope mismatch: Low if we manage many storefront repos; less needed if everything is in one monorepo.
- License risk: Low (MIT).

## Sources

- https://github.com/peter-evans/create-pull-request
- https://raw.githubusercontent.com/peter-evans/create-pull-request/main/LICENSE

## Score (0–100) + reasoning

- Score: 72
- Why: A direct building block for our “upgrade PR generator” workflow that scales across many client storefront repos while preserving a human approval gate.

