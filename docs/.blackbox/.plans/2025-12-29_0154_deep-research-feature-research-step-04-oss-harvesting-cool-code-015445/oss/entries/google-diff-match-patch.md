# OSS Project Entry

## Identity

- Name: diff-match-patch
- Repo: https://github.com/google/diff-match-patch
- Full name: google/diff-match-patch
- License: Apache-2.0
- Primary language: Multi-language (repo includes multiple implementations)

## What it gives us (plain English)

- A battle-tested algorithm and reference implementation for:
  - text diffs
  - fuzzy matching
  - applying patches to text
- A useful primitive for “template upgrade tools” where we want to:
  - compute diffs between template versions
  - apply patches even when files have drifted slightly
  - generate human-readable change summaries

## What feature(s) it maps to

- Upgrade/migration engine primitives (patch application)
- Diff review UX (showing what changed between template versions)
- Conflict detection and “best effort apply” behavior for upgrades

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Good as a library primitive; many language ports exist.
- Setup friction (self-host? SaaS? Docker?): Low. It’s an algorithm/library, not a platform.
- Data model alignment: High if we build an internal “upgrade PR generator” that needs robust patching.

## Adoption path

- 1 day POC:
  - Use diff-match-patch in a small script to:
    - diff two versions of a template file
    - apply the patch to a “slightly modified” version of the old file
  - Evaluate success rate and how good the output is for humans.
- 1 week integration:
  - Build a minimal “upgrade patcher” component:
    - take template vX and vY
    - generate patch set
    - apply to merchant repo where possible
    - emit a report: applied / failed / needs manual merge
  - Connect to PR creation workflow and CI gates.
- 1 month hardening:
  - Tune heuristics for typical storefront file patterns (Liquid, JSON, TSX).
  - Add safety controls:
    - never patch secrets files
    - always preserve merchant-owned directories
  - Improve diff readability:
    - group changes by feature/section
    - attach screenshot diffs and perf budgets to the upgrade PR.

## Risks

- Maintenance risk: Low. Algorithms are stable; main work is in our integration and heuristics.
- Security risk: Medium. Patchers can unintentionally modify sensitive config; enforce strong file ownership rules.
- Scope mismatch: Low if we build an upgrade engine; otherwise it’s optional.
- License risk: Low (Apache-2.0).

## Sources

- https://github.com/google/diff-match-patch
- https://raw.githubusercontent.com/google/diff-match-patch/master/LICENSE

## Score (0–100) + reasoning

- Score: 63
- Why: A low-level, high-leverage primitive for building reliable upgrade tooling and diff UX; best used as a component inside our upgrade PR generator.

