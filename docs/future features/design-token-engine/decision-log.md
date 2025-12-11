# Decision Log (draft)

Decided
- Source of truth: JSON token file (`src/theme/tokens.json`), schema-backed; version via meta.version + git.
- Distribution artifact set: generated.css, tailwind-colors.js, tokens.resolved.json.
- Default semantic naming: role-based (text.primary, bg.surface, accent.cta, state.*).
- Single-brand per app (no multi-tenant runtime switching needed).
- Token location: keep tokens and build outputs together under `theme/` (or `src/theme/`) in each project.

Provisional defaults
- Fonts: allow remote URLs in tokens (Google/Adobe); support self-host later; include fallbacks in tokens.
- Spacing/typography scale: start with Tailwind defaults; permit per-brand overrides in tokens.
- VRT: manual for now (no Playwright in CI yet).

Pending
- Governance sign-off (owners, SLA) — see governance-proposal.md.
- Pilot screens final pick (PDP + Checkout + Landing hero proposed).
- Components library integration path (consume app CSS vs. own package copy).
- Multi-brand hosting location (CDN vs. Shopify metafield vs. internal API).
- Compiler choice: Style Dictionary vs. custom generator as canonical.

Rejected / deferred
- No bespoke DSL or YAML; stick to JSON for portability.
- Theo adoption deferred (Style Dictionary or lightweight script preferred).
