# Final Report — Architecture Map + Improvements Plan (no code changes)

## ✅ 1) Summary (what happened)

- Mapped the repo’s architecture from actual `src/` entrypoints down through domains and platform ports/adapters.
- Identified where provider coupling still leaks above adapters (IDs, copy, legacy shims).
- Produced an incremental, reversible improvement roadmap focused on provider interchangeability (Shopify today; Stripe/others later).

## 🧭 2) Stages completed

- Align: Confirmed constraints (docs/plans only; no `src/` edits) and selected a run folder for outputs.
- Plan: Established a reading list + mapping approach (entrypoints → routes → domains → platform ports/adapters).
- Execute: Wrote the architecture map + dependency rules + coupling report.
- Verify: Cross-checked the platform runtime selection pattern (commerce/content/payments) and current coupling scan direction.
- Wrap: Wrote a phased roadmap with acceptance checks (measurable and reversible).

## 📦 3) Artifacts (paths)

- Plan folder: `docs/.blackbox/.plans/2025-12-29_1844_architecture-map-improvements-src`
- Key outputs:
  - `docs/.blackbox/.plans/2025-12-29_1844_architecture-map-improvements-src/architecture-map.md` — how `src/` is organized and wired.
  - `docs/.blackbox/.plans/2025-12-29_1844_architecture-map-improvements-src/dependency-rules.md` — import boundaries and layering rules.
  - `docs/.blackbox/.plans/2025-12-29_1844_architecture-map-improvements-src/coupling-report.md` — what currently leaks above adapters.
  - `docs/.blackbox/.plans/2025-12-29_1844_architecture-map-improvements-src/improvement-roadmap.md` — recommended improvements + ordering.
  - `docs/.blackbox/.plans/2025-12-29_1844_architecture-map-improvements-src/docs-to-read.md` — pointers to the most relevant code.

## 🧪 4) Verification

- What ran:
  - Structural validation and vendor leak scan are available via:
    - `docs/.blackbox/scripts/check-blackbox.sh`
    - `docs/.blackbox/scripts/check-vendor-leaks.sh`
- What to manually check (when you start implementing):
  - Vendor-leak enforcement: `./.blackbox/scripts/check-vendor-leaks.sh --fail` should exit 0 once Phase 1 is done.
  - Checkout experience: UI should render based on capabilities, not provider-specific assumptions.

## ❓ 5) Decisions / open questions (numbered)

1) Canonical naming: is “content” or “cms” the primary domain? Today `platform/content/ports` re-exports `platform/cms/ports`.
2) How strict should “no vendor coupling above adapters” be?
   - IDs only (easy + measurable) vs IDs + branded copy + operational troubleshooting copy.
3) Do you expect to swap auth (Clerk) or storage (Supabase), or only commerce/payments/content?

## 🏁 6) Rankings (out of 100)

1) Remove vendor IDs above adapters (Shopify GIDs → internal keys) — 92/100 — immediate modularity win — Next: follow the key-mapping run plan.
2) Capabilities-driven checkout UI (reduce Shopify handoff copy) — 84/100 — reduces provider UX coupling — Next: model messaging off `CheckoutCapabilities`.
3) Branded key types (prevent regressions) — 78/100 — improves correctness — Next: introduce nominal key types or constructors.

