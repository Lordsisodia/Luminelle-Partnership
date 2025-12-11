# Rollout Plan (post-pilot)

Phase 0: Approvals
- Stakeholder sign-off on schema/governance/pilot results.

Phase 1: Enablement
- Wire generator + Tailwind plugin globally with legacy aliases kept.
- Import generated.css globally; ensure no visual change.
- CI: add token validation + regen checks.

Phase 2: Codemod waves
- Wave 1: Landing + Checkout + PDP (already piloted) — replace utilities/hexes.
- Wave 2: Account + Auth + Blog.
- Wave 3: Admin + Misc sections.
- After each wave: VRT smoke + a11y spot-check; remove page-specific raw hexes.

Phase 3: Deprecate aliases
- Remove `brand-peach/cocoa/blush` aliases from Tailwind once grep is zero.

Phase 4: Multi-brand
- Enable per-tenant loader; ship alternate brand JSON; add toggle in QA env.

Phase 5: Hardening
- Add token change lint to CI; add contract test for components library when available.
- Document migration guide and lock versioning rules.
