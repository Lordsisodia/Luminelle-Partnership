# OSS Project Entry

## Identity

- Name: chezmoi
- Repo: https://github.com/twpayne/chezmoi
- Full name: twpayne/chezmoi
- License: MIT
- Primary language: Go

## What it gives us (plain English)

- A “apply a managed template to a local/customized target” engine (originally for dotfiles)
- Conceptual building blocks for storefront generation upgrades:
  - templates owned by a source of truth
  - local modifications preserved
  - diff and apply workflow
- Useful as a patterns repo for:
  - ownership boundaries
  - conflict handling UX
  - idempotent apply operations

## What feature(s) it maps to

- Upgrade/migration primitives for generated storefront repos
- “Apply template update while preserving local customizations” modeling
- Operational safety: preview changes before applying

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Indirect. Not a storefront tool, but the dotfiles problem is structurally similar to “template + local edits”.
- Setup friction (self-host? SaaS? Docker?): Low if used for patterns; medium if we try to embed it as an engine.
- Data model alignment: High if merchants/custom devs can modify generated storefront repos and we still want to ship upgrades.

## Adoption path

- 1 day POC:
  - Model a storefront repo as:
    - template source (ours)
    - target repo (merchant)
  - Simulate “apply upgrade” with a few files and confirm we can:
    - detect differences
    - preview changes
    - preserve local modifications
  - Extract UX ideas for our own “upgrade PR” generator.
- 1 week integration:
  - Use chezmoi-like semantics to design our own upgrade engine:
    - generator-owned files overwritten
    - merchant-owned files preserved
    - overlays/config drive controlled customization
  - Add “diff report” output:
    - what will change
    - what might conflict
  - Pair with CI gates and automated PR creation.
- 1 month hardening:
  - Build conflict resolution ergonomics:
    - guided merges
    - safe defaults and rollback
  - Maintain a template manifest to make upgrades deterministic and auditable.

## Risks

- Maintenance risk: Medium if embedded; low if used as a patterns/reference repo.
- Security risk: Medium if dealing with secrets/config; enforce separation and redaction.
- Scope mismatch: Medium if generated storefronts are not intended to be edited directly.
- License risk: Low (MIT).

## Sources

- https://github.com/twpayne/chezmoi
- https://raw.githubusercontent.com/twpayne/chezmoi/master/LICENSE

## Score (0–100) + reasoning

- Score: 57
- Why: Strong conceptual match for “template updates vs local customization”; best as a reference for designing our own upgrade/patch engine and conflict UX.

