# OSS Project Entry

## Identity

- Name: react-diff-viewer
- Repo: https://github.com/praneshr/react-diff-viewer
- Full name: praneshr/react-diff-viewer
- License: MIT
- Primary language: TypeScript

## What it gives us (plain English)

- A React component to display diffs with syntax highlighting and line-level changes
- Great for “diff snippets” and smaller file diffs inside an Upgrade Review UI
- A lighter alternative to full unified-diff rendering when we have “before/after text” (not a git diff)

## What feature(s) it maps to

- Upgrade Review UI components (diff viewing)
- Conflict resolution helper views (“before/after” snippets)
- Inline “what changed?” surfaces in admin/support tooling

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Excellent for our admin/support frontend.
- Setup friction (self-host? SaaS? Docker?): Low.
- Data model alignment: High when our upgrade engine can provide before/after content.

## Adoption path

- 1 day POC:
  - Render diffs for:
    - a section schema JSON
    - a Liquid file
    - a TS/TSX component
  - Validate theming and readability with our design system.
  - Decide where this fits vs diff2html:
    - react-diff-viewer for “before/after snippets”
    - diff2html for true unified diffs across many files.
- 1 week integration:
  - Embed into Upgrade Review UI:
    - show 3–10 “most important” diffs inline (PDP/cart/checkout)
    - link to full diff viewer for everything else
  - Add “ownership badges” and redaction enforcement (don’t render secrets).
  - Store snippet diffs as artifacts attached to the upgrade PR.
- 1 month hardening:
  - Improve large-file performance (virtualization, collapsed context).
  - Add “diff quality” heuristics (ignore whitespace-only changes by default).
  - Integrate with approvals: require review for high-risk files.

## Risks

- Maintenance risk: Medium. Repo activity appears lower; treat as a UI component dependency and pin versions.
- Security risk: Medium. Rendering diffs can expose secrets/PII if we don’t sanitize.
- Scope mismatch: Low for an internal Upgrade Review UI.
- License risk: Low (MIT).

## Sources

- https://github.com/praneshr/react-diff-viewer
- https://raw.githubusercontent.com/praneshr/react-diff-viewer/master/LICENSE

## Score (0–100) + reasoning

- Score: 62
- Why: Quick win for React diff UX, especially for inline snippets; balance with maintenance risk by keeping an abstraction boundary.

