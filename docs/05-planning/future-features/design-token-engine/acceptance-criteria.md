# Acceptance Criteria (for pilot & rollout)

Visual
- Default brand renders identical to current UI on pilot pages (pixel diffs within noise).
- Alt brand (Noir) shows consistent application across text, surfaces, CTAs, borders, gradients.

Accessibility
- All text/background pairs on pilot pages meet WCAG AA; CTA text AA on accent backgrounds.

Performance
- Theme swap style recalc <4ms; no noticeable layout shift; no FOUC on cold load.

Governance
- Token changes validated against schema; PR includes before/after screenshots and a11y note.

Coverage
- Pilot pages use only semantic utilities; no remaining raw hex or brand-* utilities after codemod on those pages.
