# Evidence Extract — OpenFeature

- slug: `openfeature`
- category: feature flags standard API (vendor-neutral SDK abstraction)
- license: Apache-2.0

## Cycle 13 — Evidence-backed primitives (feature flags + experimentation contracts)

### Notable features (3)

1) Standard “evaluation API” contract for flag evaluation (client-side abstraction)  
Evidence: https://openfeature.dev/docs/specification/sections/evaluation-api

2) Pluggable provider model to swap underlying flag backends without rewriting app code  
Evidence: https://openfeature.dev/docs/specification/sections/providers

3) Hooks as a first-class extension point (pre/post evaluation) for logging/telemetry/audit  
Evidence: https://openfeature.dev/docs/specification/sections/hooks

### Copyable workflows (2)

1) Migrate flag systems safely: implement provider for “old” backend and “new” backend → switch provider in config → validate parity via shadow reads (where possible)  
Evidence: provider interface: https://openfeature.dev/docs/specification/sections/providers

2) Standardize audit/telemetry across all flag checks: add a hook that emits `flag_evaluated` events with `{flag_key, variant, reason, actor, tenant, context}`  
Evidence: hooks: https://openfeature.dev/docs/specification/sections/hooks

### 3 steal ideas (easy / medium / hard)

- Easy: adopt a vendor-neutral evaluation contract (`client.getBooleanValue`, etc.) in our code to avoid coupling admin + backend to one flag vendor.
- Medium: treat “evaluation context” as a typed object (tenant, role, locale, plan, risk score) and require it for every evaluation (better auditing + targeting).  
  Evidence: OpenFeature evaluation context: https://openfeature.dev/docs/specification/sections/evaluation-context
- Hard: build a “provider marketplace” internally (our own provider + external providers) with runtime switching and safe rollbacks.

### Thin-slice implementation (1–3 days)

- Day 1: define an internal `FeatureGateClient` interface mirroring OpenFeature evaluation API shapes (boolean + string + number).
- Day 2: implement one provider backed by our DB (simple percentage rollouts + tenant overrides).
- Day 3: add hooks that emit audit events for all evaluations and surface a minimal “flag evaluation log” view in admin.

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/open-feature/spec/main/LICENSE

