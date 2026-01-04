# Internal Key Mapping Spec v1 (vendor-ID elimination)

Purpose:
- Make “swap providers without rewriting UI” mechanically true by ensuring UI/config never store vendor identifiers (e.g., Shopify GIDs).
- Provide a single authoritative key scheme + mapping responsibility location.

Evidence anchors:
- Key mapping strategy research (problem + migration outline):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-key-mapping-strategy.md.head220.txt`
- Platform primitives already define `ProductKey`, `VariantKey`, etc.:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`
- Current vendor leak baseline is measurable:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

## 1) Definitions

- `ProductKey`: opaque internal product identifier (string).
- `VariantKey`: opaque internal variant identifier (string).
- `CartKey`, `CartLineKey`: opaque identifiers for cart + line (string).

Evidence that these are the canonical primitives:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`

---

## 2) Non‑negotiable rules

- UI, providers, and client-domain config MUST NOT contain vendor identifiers (Shopify GIDs, Stripe ids, etc.).
- Vendor identifiers MAY exist only:
  - inside provider adapters (`src/domains/platform/**/adapters/**`), and/or
  - inside backend boundary implementations (`functions/api/**`) where they are treated as provider plumbing.

Evidence that vendor IDs currently leak above adapters (baseline to drive down):  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

## 3) Key naming scheme (v1)

Constraints:
- Deterministic and human-readable (for debugging).
- Stable across refactors.
- Does not embed provider names.

## 3a) Current state (v0, exists today): reversible vendor-ID encoding in the Shopify adapter

The Shopify commerce adapter already produces “opaque keys” for variants/carts/lines by encoding the raw Shopify GID using base64url.

Why this matters:
- This is good as a *boundary hygiene* measure (UI doesn’t need to manipulate raw GIDs returned from Shopify).
- But it is **not sufficient for provider swap**, because the encoded payload still contains `gid://shopify/...` (just obfuscated).

Evidence (current implementation):
- Adapter key encoder/decoder:
  - `src/domains/platform/commerce/adapters/shopify/internal-api/keys.ts`
  - Snapshot: `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-keys.ts.head260.2025-12-30_2316.txt`
- Adapter produces `variantKey` by encoding the Shopify variant GID:
  - Snapshot: `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-catalog.ts.head120.txt`
- Adapter consumes `variantKey` by decoding it back to a Shopify merchandise id:
  - Snapshot: `artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-cart.ts.head220.txt`

Interpretation:
- Treat this as **v0 transitional** behavior (“opaque, but vendor-derived”).
- The rest of this spec defines the **v1 stable** key scheme that unlocks provider swaps without rewriting UI/config.

Recommended scheme (from research):
- `product.<handle>`
- `variant.<handle>.<variant>`

Examples:
- `product.shower-cap`
- `variant.shower-cap.default`
- `variant.heatless-curler.pink`

Evidence for this scheme recommendation:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-key-mapping-strategy.md.head220.txt`

---

## 4) Mapping registry (single source of truth)

Design requirement:
- There must be **exactly one authoritative mapping table** for the active commerce provider.

Location rule (v1 proposal):
- Mapping lives behind the provider adapter boundary (Shopify adapter).
- Client/UI code never imports or edits mapping.

Failure semantics:
- Missing mapping throws `PortError('NOT_FOUND')` from adapter layer.
  - Evidence that `PortError('NOT_FOUND')` exists as a stable code:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

---

## 5) Migration steps (implementation phase, later)

This is a reversible sequence (stop after any step):

- Step 1: Inventory all vendor ID occurrences above adapters
  - Run: `./docs/.blackbox/scripts/check-vendor-leaks.sh`
  - Save: `artifacts/snapshots/check-vendor-leaks.txt`

- Step 2: Replace UI/config constants with internal keys
  - Example conversions:
    - `fallbackVariantId` (GID) → `fallbackVariantKey` (VariantKey)
    - `SHOWER_CAP_VARIANT_ID` (GID) → `SHOWER_CAP_VARIANT_KEY` (VariantKey)

- Step 3: Introduce Shopify mapping registry behind adapter boundary
  - `VariantKey` → Shopify variant GID
  - `ProductKey` → Shopify product identifier as needed

- Step 4: Update adapters to translate internal keys to provider IDs at the boundary
  - Ensure missing mappings fail loudly with stable error codes.

- Step 5: Turn the scan into a hard gate (CI)
  - Requirement: `disallowed_lines=0`
  - Baseline evidence shows current count:  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

## 6) Acceptance checks

- The vendor leak scan has 0 disallowed lines in:
  - `src/ui/**`
  - `src/domains/client/**`
  - `src/lib/**`

- Any missing mapping produces a stable `NOT_FOUND` error, not a vendor-specific exception.
