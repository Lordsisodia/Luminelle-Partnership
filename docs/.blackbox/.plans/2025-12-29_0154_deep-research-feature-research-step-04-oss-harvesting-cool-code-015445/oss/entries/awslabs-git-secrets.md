# OSS Project Entry

## Identity

- Name: git-secrets
- Repo: https://github.com/awslabs/git-secrets
- Full name: awslabs/git-secrets
- License: Apache-2.0
- Primary language: Shell

## What it gives us (plain English)

- A lightweight tool to prevent committing secrets by scanning staged commits/diffs
- Complements Gitleaks:
  - git-secrets is simple and git-hook oriented
  - can be enforced in template repos and client repos
- Useful for “mask drift” and upgrade workflows because it can block accidental token leaks introduced during merges/patching

## What feature(s) it maps to

- Redaction prevention gate (pre-commit/pre-push)
- Upgrade PR safety (scan diffs before PR creation)
- “No secrets in diffs/reports” posture

## Adoption path

- 1 day POC:
  - Install git-secrets in a template repo and enable it via git hooks.
  - Add 2 patterns:
    - AWS key formats
    - generic tokens (e.g., `Authorization: Bearer`)
  - Verify it blocks commits when a fake secret is introduced.
- 1 week integration:
  - Standardize hooks across:
    - template repos
    - generated storefront repos
  - Add CI job to run git-secrets on PR diffs (server-side enforcement).
  - Document a rotation and remediation workflow when secrets are detected.

## Risks

- Maintenance risk: Low.
- Security risk: Low (improves security), but don’t rely on pattern-only detection as your only control.
- Scope mismatch: Low. Very cheap guardrail.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/awslabs/git-secrets
- https://raw.githubusercontent.com/awslabs/git-secrets/master/LICENSE.txt

## Score (0–100) + reasoning

- Score: 63
- Why: Simple, pragmatic “shift-left” secret prevention tool; best as a belt-and-suspenders complement to Gitleaks.

