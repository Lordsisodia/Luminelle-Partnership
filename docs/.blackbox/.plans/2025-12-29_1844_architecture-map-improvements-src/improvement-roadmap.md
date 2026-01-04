# Improvement Roadmap (architecture)

This is an incremental, reversible roadmap to improve modularity and provider interchangeability.

Constraints:
- No app code changes were made for this run; this is a plan.
- Improvements are ordered from “high leverage / low risk” to “larger refactors”.

---

## Phase 0 — Decide the “north star rules” (documentation + enforcement)

1) Adopt dependency rules as policy (see `dependency-rules.md`)
2) Decide what “provider leakage” means for this repo:
   - Vendor IDs (e.g. Shopify GIDs) — already measurable
   - Vendor copy (“Shopify checkout…”) — decide whether to measure and enforce
   - Vendor branching (`if provider === 'shopify'`) above ports — likely measure later

Acceptance check:
- `docs/.blackbox/scripts/check-vendor-leaks.sh` is the baseline tool for “vendor ID leakage”.

---

## Phase 1 — Remove vendor IDs above adapters (high leverage)

Why:
- It’s the simplest tangible step toward “UI is pluggable”.

Plan:
- Replace hard-coded Shopify GIDs in UI + client config/logic with internal keys:
  - `VariantKey = variant.<base64url(gid)>` (already supported by adapter boundary helpers)
- Keep legacy cleanup allowlisted temporarily (CartContext helper)

Targets are explicitly tracked by:
- `docs/.blackbox/.plans/2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids/`

Acceptance check:
- `./.blackbox/scripts/check-vendor-leaks.sh --fail` exits 0.

---

## Phase 2 — Normalize “capabilities-driven UI” (reduce provider copy)

Problem:
- Some UI copy and troubleshooting guidance is provider-specific (ex: Shopify domain handoff).

Approach:
- Treat “how checkout works” as a capability contract:
  - `CheckoutCapabilities.mode` + `CheckoutCapabilities.handoff.routes`
- UI renders generic messaging based on capability state.
- Provider-specific troubleshooting moves to:
  - platform adapter docs, or
  - admin-only diagnostics, or
  - a dev-only diagnostics port.

Acceptance check:
- The main client UI does not contain provider-branded operational guidance.

---

## Phase 3 — Tighten type safety of opaque keys (reduce accidental misuse)

Current:
- Key types are plain `string` aliases (`VariantKey`, etc.).

Improvement options:
- Option A (light): branded types via `type Brand<T, B> = T & { __brand: B }`
- Option B (runtime): zod/io-ts validation at boundaries
- Option C (hybrid): keep runtime encoding/decoding functions and only expose constructors

Acceptance check:
- It becomes hard to pass a raw vendor ID where a `VariantKey` is expected.

---

## Phase 4 — Rationalize `src/lib/*` shims (remove semantic mismatch)

Current:
- `src/lib/product.ts` returns a shape with `variantId` that is actually a `VariantKey`.
- `src/lib/sections.ts` is a thin wrapper over platform content runtime.

Plan:
- Either:
  - move these into an explicit domain (e.g. client/shop/products data layer), or
  - rename to reflect ports (`variantKey`) and treat `src/lib/*` as a stable “application services” layer.

Acceptance check:
- Shared libs don’t hide port semantics behind legacy naming.

---

## Phase 5 — Reduce runtime duplication (optional refactor)

Observation:
- `platform/commerce/runtime.ts`, `platform/content/runtime.ts`, `platform/payments/runtime.ts` repeat the “mock/disabled/real” selection pattern.

Plan:
- Extract a tiny helper (e.g. `createRuntime({ isDev, configured, createMock, createDisabled, createReal, devOptInKey })`)
- Keep it simple; avoid “generic framework”.

Acceptance check:
- Runtimes remain readable; duplication shrinks; behavior stays consistent.

---

## Recommended order (fastest path to “UI is pluggable”)

1) Phase 1 (vendor IDs) — makes the boundary real and enforceable
2) Phase 2 (capabilities-driven UI) — removes provider UX coupling
3) Phase 3 (type safety) — prevents regressions
4) Phase 4 (lib shims) — removes ambiguity and hidden coupling
5) Phase 5 (runtime refactor) — optional hygiene

