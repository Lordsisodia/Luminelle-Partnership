# OSS Project Entry

## Identity

- Name: diff2html
- Repo: https://github.com/rtfpessoa/diff2html
- Full name: rtfpessoa/diff2html
- License: MIT
- Primary language: TypeScript

## What it gives us (plain English)

- A renderer that turns unified diffs into readable HTML (side-by-side or inline)
- A strong UI building block for an internal “Upgrade Review UI”:
  - show what changed between template versions
  - annotate changes with risk tags and ownership boundaries
- Great fit when our upgrade engine outputs git-style diffs (PRs, patches, changelogs)

## What feature(s) it maps to

- Diff review UX for template upgrades
- Internal tooling for “what changed?” in upgrade PRs
- Conflict triage UI (visualize hunks that failed to apply)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong. Works well in a web UI and with our TS-heavy stack.
- Setup friction (self-host? SaaS? Docker?): Low. It’s a library, not a platform.
- Data model alignment: High. It consumes diffs; we already have diffs (git, patches, PRs).

## Adoption path

- 1 day POC:
  - Generate a unified diff for a template upgrade (vX → vY) on a sample storefront.
  - Render it with diff2html in a small page (inline + side-by-side).
  - Validate we can:
    - collapse/expand files
    - highlight “generator-owned” vs “merchant-owned” paths (CSS classes)
    - link to CI artifacts (Lost Pixel diffs, Lighthouse reports).
- 1 week integration:
  - Build an internal “Upgrade Review” page:
    - list changed files grouped by risk and ownership
    - embed diff2html for file/hunk viewing
    - show summary counts: files changed / conflicts / applied vs skipped
  - Add metadata overlays:
    - “this file is merchant-owned; upgrade did not overwrite”
    - “this hunk failed to apply; manual resolution required”
  - Store diffs and reports as artifacts and attach to audit events.
- 1 month hardening:
  - Add performance optimizations for large diffs (virtualization + incremental rendering).
  - Add “approve upgrade” workflow (record approver + timestamp + justification).
  - Add redaction rules (never show secrets files; scrub env/config outputs).

## Risks

- Maintenance risk: Low. Library use is stable.
- Security risk: Medium. Diffs can include secrets/PII; require strict path allowlists and redaction.
- Scope mismatch: Low. Directly supports upgrade PR review UX.
- License risk: Low (MIT).

## Sources

- https://github.com/rtfpessoa/diff2html
- https://raw.githubusercontent.com/rtfpessoa/diff2html/master/LICENSE.md

## Score (0–100) + reasoning

- Score: 74
- Why: High-leverage diff rendering primitive that fits our upgrade review UI needs with minimal integration cost.

