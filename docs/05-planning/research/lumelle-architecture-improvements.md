# Lumelle Architecture Improvements (plan only)

This is a **plan** for improving modularity and interchangeability.

Scope:
- No code changes yet.
- Improvements are ordered by leverage and risk.

Run folder with deeper detail:
- `docs/.blackbox/.plans/2025-12-29_1844_architecture-map-improvements-src/`

---

## 1) What’s already strong

- The platform layer already follows a clean provider pattern:
  - ports (`src/domains/platform/**/ports/*`)
  - adapters (`src/domains/platform/**/adapters/**`)
  - runtime selection (`src/domains/platform/**/runtime.ts`) with mock/disabled/real behavior
- This is the correct foundation for:
  - Shopify now (commerce/content)
  - Stripe now (payments adapter exists)
  - future providers later (swap by extending runtime selection)

---

## 2) Biggest architectural blockers (today)

### A) Vendor IDs above adapters

There are still raw Shopify GIDs in UI/config/logic (measurable via `docs/.blackbox/scripts/check-vendor-leaks.sh`).

Why it matters:
- it breaks the “UI is provider-agnostic” guarantee
- it makes migrations harder (IDs become spread through UI code)

### B) Vendor-specific operational copy in UI

Some UI includes Shopify-specific checkout/domain troubleshooting copy.

Why it matters:
- it encodes provider assumptions into user-facing components
- it’s hard to reuse UI for other providers

### C) Legacy shims that hide port semantics

Some `src/lib/*` wrappers use legacy naming (e.g. `variantId` that is actually a `VariantKey`).

Why it matters:
- it increases the chance of “wrong ID type” bugs
- it makes boundary rules ambiguous

---

## 3) Recommended roadmap (incremental + measurable)

### Phase 1 — Remove vendor IDs above adapters (fast, high leverage)

- Replace raw Shopify GIDs in UI/config/logic with internal opaque keys (VariantKey).
- Enforce “done” with:
  - `./.blackbox/scripts/check-vendor-leaks.sh --fail`

Tracked run plan:
- `docs/.blackbox/.plans/2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids/`

### Phase 2 — Make checkout UI capabilities-driven (reduce provider copy)

- UI should render based on `CheckoutCapabilities` instead of provider assumptions.
- Provider-specific troubleshooting belongs in:
  - adapter docs, or
  - admin/dev-only diagnostics

### Phase 3 — Tighten type safety for keys (prevent regressions)

- Move from `type VariantKey = string` toward branded/nominal types or constructors.
- Goal: make it hard to pass a vendor ID where a `VariantKey` is expected.

### Phase 4 — Rationalize shared libs (`src/lib/*`)

- Either move port-wrapping helpers into domains, or rename them to match port semantics.
- Remove “semantic mismatch” names (like `variantId` for a `VariantKey`).

---

## 4) Suggested “Week 1” focus

If you want a tight first sprint:
1) Phase 1 (vendor IDs): finish the key-mapping migration and make leak checking enforceable.
2) Identify and plan the top 1–2 UI copy leaks for checkout handoff, and decide how capabilities/diagnostics should work.

