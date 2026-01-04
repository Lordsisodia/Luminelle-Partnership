# OSS Project Entry

## Identity

- Name: jsdiff
- Repo: https://github.com/kpdecker/jsdiff
- Full name: kpdecker/jsdiff
- License: BSD-3-Clause
- Primary language: JavaScript

## What it gives us (plain English)

- A robust diff library for text changes (words, lines, chars)
- Useful for:
  - summarizing changes in template upgrades (counts, highlights)
  - computing diffs for config files or generated artifacts where we don’t want full git plumbing
  - building “diff snippets” in the UI (small inline compare)

## What feature(s) it maps to

- Diff primitives for upgrade tooling (low-level engine)
- Diff summaries (“what changed?” in 1–2 lines) for approvals
- Conflict triage helpers (show nearby context)

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Strong. Simple library, easy to call from Node/TS.
- Setup friction (self-host? SaaS? Docker?): Low.
- Data model alignment: High for any “compare two versions” features (template vX vs vY).

## Adoption path

- 1 day POC:
  - Use jsdiff to diff:
    - a Liquid file before/after upgrade
    - a JSON config file before/after upgrade
  - Produce a small summary output:
    - added/removed lines
    - top changed sections
  - Validate performance on moderately sized files.
- 1 week integration:
  - Implement a “change summary” service:
    - for each upgrade PR, compute per-file summary stats
    - mark high-risk changes (checkout/cart/layout) for review
  - Feed summaries into the Upgrade Review UI (before opening full diffs).
  - Combine with ownership rules (generator-owned vs merchant-owned paths).
- 1 month hardening:
  - Add heuristics tuned for storefront repos:
    - ignore formatting-only changes
    - group changes by section/component
  - Pair with visual diffs and perf budgets in the approval workflow.

## Risks

- Maintenance risk: Low.
- Security risk: Medium. Diffing can expose secrets; enforce file allowlists and redaction.
- Scope mismatch: Low. Great utility primitive.
- License risk: Low (BSD-3-Clause).

## Sources

- https://github.com/kpdecker/jsdiff
- https://raw.githubusercontent.com/kpdecker/jsdiff/master/LICENSE

## Score (0–100) + reasoning

- Score: 66
- Why: Reliable low-level diff engine that’s easy to integrate for summaries and lightweight comparisons.

