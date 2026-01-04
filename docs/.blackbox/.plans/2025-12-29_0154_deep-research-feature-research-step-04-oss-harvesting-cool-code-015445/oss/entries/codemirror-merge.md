# OSS Project Entry

## Identity

- Name: CodeMirror Merge
- Repo: https://github.com/codemirror/merge
- Full name: codemirror/merge
- License: MIT
- Primary language: TypeScript/JavaScript

## What it gives us (plain English)

- A merge/diff editor UI component (good for conflict resolution UX)
- Useful when an upgrade cannot be applied automatically and we want a “guided resolution” experience:
  - show base vs updated vs current (conceptually)
  - allow a human to pick/merge changes
- A strong foundation for an internal “resolve upgrade conflicts” tool

## What feature(s) it maps to

- Conflict resolution UI for template upgrades
- Internal “merge editor” for support/engineers
- Guided patch application and manual reconciliation workflows

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Good. It’s a JS component we can embed in a web admin. Might need wrapper work to fit our UI framework.
- Setup friction (self-host? SaaS? Docker?): Medium (UI integration + data plumbing).
- Data model alignment: High if we expect upgrade conflicts and want to resolve them efficiently.

## Adoption path

- 1 day POC:
  - Build a tiny “conflict viewer” page:
    - feed it a file with a simulated conflict (old template vs new template vs merchant edits)
    - render a merge UI and verify ergonomics
  - Validate we can:
    - highlight generator-owned regions
    - prevent edits to protected files
    - export a resolved file back into an upgrade PR branch.
- 1 week integration:
  - Integrate into upgrade workflow:
    - when patching fails, mark file as “needs manual resolution”
    - allow a support/engineer user to resolve in UI and commit to the PR branch
  - Add audit logging:
    - who resolved what file, when, and why
  - Add guardrails:
    - disallow editing secrets
    - require approvals for checkout/cart files.
- 1 month hardening:
  - Add “resolution templates” (common conflict patterns auto-resolved).
  - Improve usability: keyboard shortcuts, diff context controls, and safer defaults.
  - Add performance optimizations for large files.

## Risks

- Maintenance risk: Medium. UI integration needs ongoing upkeep.
- Security risk: Medium/High. A web-based editor can become a footgun; enforce strict authz + audit + redaction.
- Scope mismatch: Medium. Only needed if we plan to support manual conflict resolution in-product.
- License risk: Low (MIT).

## Sources

- https://github.com/codemirror/merge
- https://raw.githubusercontent.com/codemirror/merge/master/LICENSE

## Score (0–100) + reasoning

- Score: 58
- Why: High-value if we want in-product conflict resolution; otherwise keep as an optional “support tool” primitive.

