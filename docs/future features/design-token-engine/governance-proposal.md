# Governance Proposal (draft)

Roles
- **Design owner**: approves semantic naming and visual intent.
- **FE owner**: approves technical feasibility and rollout impact.
- **Reviewer pool**: FE + Design; minimum 2 approvals (1 design, 1 FE) for token changes.

Process
1) Author edits `src/theme/tokens.json` (or brand variant) + updates changelog entry.
2) Run `npm run tokens` (generator) locally; commit generated artifacts.
3) CI checks:
   - JSON schema validation (no dangling refs, allowed types).
   - Diff guard: flags breaking semantic key removals/renames; requires override label.
   - Visual smoke: run Playwright snapshots on pilot pages in default + alt brand.
4) PR template captures: intent, affected surfaces, screenshots (before/after), a11y note, regression risk.
5) Release tagging: bump `meta.version` and git tag `tokens-vX.Y.Z` when semantic keys change.

Rules
- Semantic names express role, never color words.
- No direct hex in components; must reference tokens.
- New brands cannot add new semantic keys—only override values.
- Breaking changes (remove/rename semantic key) require major version bump + migration note.

Escalation
- Emergency hotfix path for accessibility regressions: fast-track with FE+Design sign-off in <24h; follow-up PR to tidy.
