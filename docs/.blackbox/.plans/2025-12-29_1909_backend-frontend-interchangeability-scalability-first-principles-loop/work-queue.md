# Work Queue

## Next actions (keep 5–10)
- [x] Define tenant secrets strategy (`tenant_integrations.secret_ref`) and `/api/config/public` allowlist rules (so multitenancy doesn’t reintroduce env sprawl): `tenant-secrets-and-public-config-spec-v0.1.md`
- [x] Add a provider swap playbook + “what’s swappable today” matrix (so client work stays checklist-driven): `provider-swap-playbook.md`, `architecture-component-catalog.md`
- [ ] Keep docs stable (avoid adding new plan docs unless they remove a blocker); update `CANONICAL.md` if structure changes.
- [ ] Docs-only hygiene: audit `docs/.blackbox/` for misplaced/duplicative files and consolidate into clearer directories (move/rename/delete as needed).
  - Done (partial): archived excess OSS discovery runs so `.blackbox/.plans/` is readable again (see `context/steps/0041_checkpoint-archived-131-oss-plan-runs-to-archive-plans-root-now-readable.md`).
  - Next: review `docs/.blackbox/{scripts,.skills,.prompts,agents,deepresearch,oss-catalog,snippets}` for naming/placement consistency.
- [x] Add an explicit “single canonical backend boundary” invariant (to prevent drift between `functions/` and `api/`): `artifacts/invariants-and-acceptance.md`
- [ ] P0.3: consolidate backend boundary surface (`api/**` → `functions/api/**`) using the drift + usage evidence:
  - drift summary: `artifacts/snapshots/api-vs-functions.summary.txt`
  - api-only endpoints: `artifacts/snapshots/api-only-endpoints.txt`
  - usage triage: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
- [ ] For any future code PR: always run gates + capture evidence under `context/pr-diffs/`:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- [ ] Implementation sequencing (when code changes are allowed): follow `stop-point-status-dashboard.md` and `pr-by-pr-stop-points-plan.md`.
- [ ] Next implementation stop-point: PR 2 auth guard wiring plan is ready: `pr-2-auth-guards-detailed-plan.md`
- [ ] Next after PR 2: PR 3 tenant resolution wiring plan is ready: `pr-3-tenant-resolution-detailed-plan.md`
- [ ] Next after PR 3: PR 4 cache headers plan is ready: `pr-4-cache-headers-detailed-plan.md`
- [ ] Next after PR 4: PR 5 tenancy tables plan is ready: `pr-5-tenancy-tables-detailed-plan.md`
- [ ] Next after PR 5: PR 6 tenant integration config lookup plan is ready: `pr-6-tenant-integration-config-lookup-detailed-plan.md`
- [ ] Next after PR 6: PR 7 vendor key mapping plan is ready: `pr-7-vendor-key-mapping-detailed-plan.md`
- [ ] Next after PR 7: PR 8 tenant #2 onboarding plan is ready: `pr-8-tenant-2-onboarding-detailed-plan.md`
- [ ] Hardening target: drive vendor leak scan to zero (then make it a CI-hard gate):
  - baseline: `artifacts/snapshots/check-vendor-leaks.txt`
- [ ] Identity swap readiness: localize Clerk usage into `platform/auth` wrappers (so client projects can swap identity providers without UI rewrites):
  - baseline drift signal: `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`
  - current metric: `vendor_sdk_imports_nonplatform_clerk` in `artifacts/snapshots/stop-point-metrics.latest.txt`
  - detailed plan: `pr-9-identity-decoupling-detailed-plan.md`


## Agent cycle (first hour)
- [x] Establish objective + success criteria (see `success-metrics.md`)
- [x] Create first checkpoint step (see `context/steps/0001_checkpoint-prompt-05-tenancy-rules-evidence-citations.md`)
- [x] Identify top risks / unknowns (see `risk-register.md`)
- [x] Expand the runbook surface (final report + acceptance gates runbook + dashboards + test kit) so the implementation phase is “follow the checklist”.
- [ ] Optional: compact context if needed (via `.blackbox/scripts/compact-context.sh`)
