- Next actions (docs stabilized; implementation-ready)

- Keep evidence fresh (default workflow):
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

- Use the dashboard to pick the next implementation PR and reduce risk signals:
  - `stop-point-status-dashboard.md`
  - Next (recommended): `p0-3-boundary-consolidation-detailed-plan.md`
  - PR 2 detailed plan (auth guard wiring): `pr-2-auth-guards-detailed-plan.md`
  - PR 3 detailed plan (tenant resolution wiring): `pr-3-tenant-resolution-detailed-plan.md`
  - PR 4 detailed plan (cache headers): `pr-4-cache-headers-detailed-plan.md`
  - PR 5 detailed plan (tenancy tables): `pr-5-tenancy-tables-detailed-plan.md`
  - PR 6 detailed plan (tenant integration config lookup): `pr-6-tenant-integration-config-lookup-detailed-plan.md`
  - PR 7 detailed plan (vendor key mapping): `pr-7-vendor-key-mapping-detailed-plan.md`
  - PR 8 detailed plan (tenant #2 onboarding): `pr-8-tenant-2-onboarding-detailed-plan.md`
  - Record PR evidence under: `context/pr-diffs/` (use `pr-evidence-diff-summary-template.md`)

- When implementing multitenancy, do not reintroduce env sprawl:
  - Use the per-tenant secrets/public config spec:
    - `tenant-secrets-and-public-config-spec-v0.1.md`
  - ADR: `adrs/0006-tenant-secrets-and-public-config.md`

- Default policy going forward:
  - Prefer updating canonical docs over adding new plan docs:
    - `CANONICAL.md`
