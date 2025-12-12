# Design Token Engine — Status Snapshot

Last updated: 2025-12-12

Scope
- Single-brand per app; no multi-tenant runtime switching.
- Themeable surfaces: landing, PDP, blog, account, admin. Checkout (Shopify) out-of-scope.
- Tokens cover colors, typography, spacing, radii, shadows, assets (logos, font URLs).

What’s built (docs-only, safe)
- Tokens: default (Lumelle), Noir, Fresh Mint sample in `code/` (JSON), with spacing/typography/assets.
- Generators: Style Dictionary config + outputs (generated CSS vars, Tailwind map, resolved JSON), custom generator, Ajv schema/validator, Tailwind plugin, runtime applier.
- Reference outputs: `code/generated/` contains sample CSS vars/TW map/resolved tokens.
- Plans: research checklist, rollout plan, timeline, governance proposal, risk register, comms, acceptance criteria, pilot checklist, VRT plan, codemod plan, per-page token map, color taxonomy, open-source framework survey, usage guide.
- Extras: audit script, self-host font example, per-tenant loader spec (future), Vercel middleware snippet (reference only), decision log.

Open decisions
- Compiler of record: Style Dictionary vs. custom script.
- Token folder path standard: `theme/` vs. `src/theme/` for live apps.
- Font hosting: remote (Google/Adobe) vs. self-host (@font-face flow provided).
- Token hosting: repo-only vs. CDN/API for future brand swaps.
- CI: add validate/build job and lint for raw hex/brand-* utilities.
- PR template adoption and governance owner/SLA sign-off.

Next actions (non-breaking)
- Add CI job + PR template snippets into docs if desired.
- Confirm above decisions; then a single copy/paste step wires the app using `style-dictionary-dropin.md`.
