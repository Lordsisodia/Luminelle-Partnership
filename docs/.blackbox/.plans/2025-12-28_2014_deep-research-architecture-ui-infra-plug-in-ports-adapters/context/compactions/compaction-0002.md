---
compaction: 0002
created_at: "2025-12-28 21:31"
range: "0011-0020"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0002 (0011–0020)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0011_checkpoint-decided-ports-internal-api-first.md

---
step: 0011
created_at: "2025-12-28 21:03"
title: "Checkpoint: decided ports internal API first"
---

# Step 0011: Checkpoint: decided ports internal API first

## ✅ What I did (facts)

- Locked the v1 default port implementation strategy as “internal API first” (functions-backed), with an explicit hybrid escape hatch.
- Updated the canonical decision doc: `docs/05-planning/research/ui-infra-port-implementation-strategy.md`.
- Updated the canonical decision log: `docs/05-planning/research/ui-infra-plugin-architecture.md`.
- Updated Week 1 and backlog acceptance checks to reflect the default.

## 🧠 What I learned (new information)

- This repo already has server-side Storefront endpoints for product/sections/cart and server-side checkout proxying, so “internal API first” is aligned with reality (not a theoretical preference).
- Choosing “internal API first” strengthens UI interchangeability by keeping vendor tokens/hostnames/routes out of UI entirely.

## 🧭 What changes because of this

- The remaining “big fork” is resolved; the next work can shift from architecture debate to execution (ports + entrypoints + first consumer migration) when code changes are allowed.
- Future provider swaps (Stripe checkout later) become adapter work behind a stable port surface rather than UI refactors.

## ➡️ Next step

- Continue the research prompt blocks 11–20 / 21–35 to validate contracts against remaining Shopify touchpoints, OR move into Week 1 implementation tickets when code changes are allowed.

## 🔗 Links / references

- Canonical strategy: `docs/05-planning/research/ui-infra-port-implementation-strategy.md`
- Canonical architecture: `docs/05-planning/research/ui-infra-plugin-architecture.md`
- Canonical contracts: `docs/05-planning/research/ui-infra-ports-dtos.md`
- Week 1 board: `docs/05-planning/research/ui-infra-week-1-execution-board.md`

---

### 0012_checkpoint-prompts-11-20-coupling-inventory-deepened.md

---
step: 0012
created_at: "2025-12-28 21:08"
title: "Checkpoint: prompts 11–20 coupling inventory deepened"
---

# Step 0012: Checkpoint: prompts 11–20 coupling inventory deepened

## ✅ What I did (facts)

- Read the highest-impact Shopify coupling hotspots (UI copy, GIDs, cart provider, shared libs, routing, and checkout proxy infra).
- Updated the run’s coupling inventory and source list with concrete evidence and clearer leak descriptions.
- Updated migration rankings to include the infra checkout proxy/handoff reality as core evidence.

## 🧠 What I learned (new information)

- The cart provider currently treats Shopify variant GIDs as the “domain ID” for cart items and persists a Shopify cart ID in localStorage; this is deeper coupling than just “UI imports Shopify”.
- The repo already has a real edge proxy for `/cart/c/*` and `/checkouts/*`, and the UI still ships a vendor-named fallback handoff page; capabilities should retire that page over time.

## 🧭 What changes because of this

- The port contracts (`CartPort`, `CheckoutPort`) need to explicitly accommodate:
  - internal key mapping (`VariantKey`/`CartKey`),
  - first-party handoff URLs for checkout,
  - and vendor-agnostic copy in UI surfaces.

## ➡️ Next step

- Continue prompts 21–35: validate and tighten DTOs (especially cart + checkout) against these concrete coupling points.

## 🔗 Links / references

- Inventory: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/artifact-map.md`
- Sources: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/artifacts/sources.md`
- Rankings: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/rankings.md`

---

### 0013_checkpoint-ports-dtos-tightened-for-cart-rehydration.md

---
step: 0013
created_at: "2025-12-28 21:10"
title: "Checkpoint: ports/dtos tightened for cart rehydration"
---

# Step 0013: Checkpoint: ports/dtos tightened for cart rehydration

## ✅ What I did (facts)

- Updated `CartPort` contracts to explicitly support the current “persist items locally → rehydrate/create provider cart” behavior behind ports via `syncFromDraft?(draft)`.
- Added `CartDraftDTO` to formalize what UI is allowed to persist without vendor IDs.
- Refined `CartLineDTO` to carry pricing and display fields that match real UI needs (unit price, optional compare-at, optional line subtotal).
- Updated both canonical (`docs/05-planning/research/*`) and run-local (`ports.md`) contract catalogs, plus ticket acceptance checks.

## 🧠 What I learned (new information)

- The deepest coupling is not just “imports Shopify”: it’s that the UI provider encodes cart lifecycle rules (rehydrate vs create) and stores provider identifiers in localStorage.
- Making this robust requires a first-class “draft → cart” method on the port boundary (even if optional in v1).

## 🧭 What changes because of this

- The migration path for `CartContext` is now clearer and safer: UI can keep local persistence, but vendor branching and cart creation rules move behind ports.
- This reduces the surface area of future vendor swaps (Stripe/other) because cart behavior becomes port-defined.

## ➡️ Next step

- Continue prompts 21–35 by validating `CatalogPort` and `ContentPort` DTOs against `src/lib/product.ts` and `src/lib/sections.ts` (they currently return hard vendor IDs/types).
- Then move to the implementation plan (Week 1) once code changes are allowed.

## 🔗 Links / references

- Canonical contracts: `docs/05-planning/research/ui-infra-ports-dtos.md`
- Run-local contracts: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/ports.md`
- Week 1 board: `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Backlog: `docs/05-planning/research/ui-infra-ticket-backlog.md`

---

### 0014_checkpoint-ports-dtos-tightened-for-catalog-content.md

---
step: 0014
created_at: "2025-12-28 21:13"
title: "Checkpoint: ports/dtos tightened for catalog + content"
---

# Step 0014: Checkpoint: ports/dtos tightened for catalog + content

## ✅ What I did (facts)

- Tightened `CatalogPort` DTOs to match the current `src/lib/product.ts` behavior (handle-based fetch with an implicit “default/first variant”) while removing vendor IDs from the contract.
- Added `ProductVariantDTO` and `defaultVariantKey` to avoid UI re-implementing “first variant” logic.
- Tightened `ContentPort` DTOs to explicitly hide Shopify metaobject handles/types behind a stable `SectionsDTO`, with optional `schemaVersion` metadata.
- Updated both canonical and run-local contract catalogs, plus ticket acceptance checks.

## 🧠 What I learned (new information)

- `src/lib/product.ts` currently returns Shopify IDs directly (`Product.id`, `variantId`) and derives the “default variant” as the first variant in the list — the contract needs to capture that intent vendor-agnostically.
- `src/lib/sections.ts` hardcodes Shopify metaobject handles/types, so `ContentPort` must treat those as adapter-only concerns.

## 🧭 What changes because of this

- Migrating `src/lib/product.ts` and `src/lib/sections.ts` behind ports can now be done without losing behavior, because the port contracts explicitly represent the “default variant” and a stable sections schema.

## ➡️ Next step

- Continue prompts 21–35 by tightening failure-mode semantics (what happens when Shopify is not configured) and how `CatalogPort`/`ContentPort` behave in dev vs prod under the “internal API first” strategy.

## 🔗 Links / references

- Canonical contracts: `docs/05-planning/research/ui-infra-ports-dtos.md`
- Run-local contracts: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/ports.md`
- Week 1 board: `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Backlog: `docs/05-planning/research/ui-infra-ticket-backlog.md`

---

### 0015_checkpoint-port-error-semantics-defined.md

---
step: 0015
created_at: "2025-12-28 21:15"
title: "Checkpoint: port error semantics defined"
---

# Step 0015: Checkpoint: port error semantics defined

## ✅ What I did (facts)

- Defined an explicit minimal port error taxonomy (`PortErrorCode`) and a standard `PortError` shape for all ports.
- Updated both canonical and run-local contract catalogs so UI can react to `PortError.code` instead of reading vendor flags like `shopifyEnabled`.
- Updated Week 1 and backlog acceptance checks to require these error semantics.

## 🧠 What I learned (new information)

- The repo currently uses a mix of patterns (`shopifyEnabled` branching, generic `Error` throws, and UI-level fallbacks). Without stable error codes, removing vendor branching becomes risky and inconsistent.

## 🧭 What changes because of this

- Consumers can be migrated away from `shopifyEnabled` checks incrementally: ports throw `NOT_CONFIGURED` and UI decides what to show in dev vs prod.
- This creates a stable seam for future adapters (Stripe later) without rewriting UI error-handling.

## ➡️ Next step

- Continue prompts 21–35 by tightening “dev vs prod” behavior policy (mock adapter vs hard error) and documenting where it is configured (platform entrypoint only).

## 🔗 Links / references

- Canonical contracts: `docs/05-planning/research/ui-infra-ports-dtos.md`
- Run-local contracts: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/ports.md`
- Week 1 board: `docs/05-planning/research/ui-infra-week-1-execution-board.md`

---

### 0016_checkpoint-dev-vs-prod-adapter-policy-documented.md

---
step: 0016
created_at: "2025-12-28 21:17"
title: "Checkpoint: dev vs prod adapter policy documented"
---

# Step 0016: Checkpoint: dev vs prod adapter policy documented

## ✅ What I did (facts)

- Documented an explicit dev-vs-prod environment policy: mock adapters are allowed only in dev when providers are not configured; prod must surface `PortError('NOT_CONFIGURED')`.
- Added the “only platform entrypoints choose adapters” rule to the contract docs so UI/domain cannot reintroduce vendor branching.
- Updated Week 1 / backlog acceptance checks to enforce centralized adapter selection and environment policy.

## 🧠 What I learned (new information)

- Without an explicit environment policy, teams inevitably recreate “shopifyEnabled” branching in multiple UI places because it’s the path of least resistance.
- Making this a platform-only concern is the simplest way to keep UI interchangeable and vendor-swappable.

## 🧭 What changes because of this

- We can migrate code away from `shopifyEnabled` checks safely: if not configured, the platform returns mock (dev) or throws typed `PortError` (prod).
- Adapter selection logic now has an explicit “allowed home” (platform entrypoint), making it enforceable with future guardrails.

## ➡️ Next step

- Continue prompts 21–35 by tightening the remaining port surfaces (especially checkout + cart) to fully remove vendor IDs/copy from UI providers/pages.
- Then shift to prompts 36–47 to define stop-points and risks for the migration plan.

## 🔗 Links / references

- Strategy: `docs/05-planning/research/ui-infra-port-implementation-strategy.md`
- Canonical contracts: `docs/05-planning/research/ui-infra-ports-dtos.md`
- Week 1 board: `docs/05-planning/research/ui-infra-week-1-execution-board.md`

---

### 0017_checkpoint-stop-points-risks-defined.md

---
step: 0017
created_at: "2025-12-28 21:19"
title: "Checkpoint: stop points + risks defined"
---

# Step 0017: Checkpoint: stop points + risks defined

## ✅ What I did (facts)

- Created an explicit stop-points + risks doc so the migration is reversible and can be merged safely in stages.
- Linked the stop-points doc from `migration-checklist.md` for quick reference during implementation.

## 🧠 What I learned (new information)

- The highest-risk part of this migration is not “ports exist”; it’s cart persistence and checkout routing (proxy/handoff). Those need explicit stop points and mitigations.

## 🧭 What changes because of this

- The migration plan now has safe intermediate states (Stop 1–8) that can be treated as “merge milestones” with clear done checks.

## ➡️ Next step

- Continue prompts 36–47 by attaching each stop point to concrete tickets (Week 1 board + backlog) and calling out any prerequisites (e.g. mapping table for VariantKey, checkout proxy config).

## 🔗 Links / references

- Stop points + risks: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/stop-points-and-risks.md`
- Migration checklist: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/migration-checklist.md`

---

### 0018_checkpoint-stop-points-mapped-to-tickets.md

---
step: 0018
created_at: "2025-12-28 21:21"
title: "Checkpoint: stop points mapped to tickets"
---

# Step 0018: Checkpoint: stop points mapped to tickets

## ✅ What I did (facts)

- Mapped Stop 1–8 (safe intermediate states) to concrete tickets (Week 1 board + backlog) and created a merge milestone checklist doc.
- Indexed the merge milestone checklist in the visible research README and docs ledger so it’s discoverable.

## 🧠 What I learned (new information)

- Without an explicit stop-point → ticket mapping, long migrations drift and teams lose the ability to safely pause. Turning stop points into a checklist makes a 6–10h run actually operational.

## 🧭 What changes because of this

- You now have a clean “merge milestone” plan: Stop 1–8 are concrete, ticket-backed checkpoints you can stop/start without re-deciding architecture.

## ➡️ Next step

- If you want to move to implementation, start at Stop 1 and work forward; if you want to stay research-only, proceed to prompts 48–50 and update the final synthesis/handoff to include the merge milestones.

## 🔗 Links / references

- Merge milestones: `docs/05-planning/research/ui-infra-merge-milestones.md`
- Stop points + risks: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/stop-points-and-risks.md`
- Week 1 board: `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Ticket backlog: `docs/05-planning/research/ui-infra-ticket-backlog.md`

---

### 0019_checkpoint-synthesis-updated-with-merge-milestones.md

---
step: 0019
created_at: "2025-12-28 21:23"
title: "Checkpoint: synthesis updated with merge milestones"
---

# Step 0019: Checkpoint: synthesis updated with merge milestones

## ✅ What I did (facts)

- Updated the run’s `final-report.md` to reference the stop-points/risk plan and the canonical merge milestone checklist.
- Updated the 1-page `artifacts/summary.md` so the “next steps” explicitly include Stop 1–8 as merge milestones.
- Updated `status.md` to reflect that synthesis/handoff is now current.

## 🧠 What I learned (new information)

- The project’s value is now in *execution-ready continuity*: contracts + policy + risks + merge milestones are all discoverable and linked, which is what makes long agent cycles practical.

## 🧭 What changes because of this

- Anyone can pick up implementation by starting at Stop 1 (contracts) and progressing milestone-by-milestone without revisiting architecture decisions.

## ➡️ Next step

- If you want to stay research-only: pause here (handoff is complete).
- If you want to start implementation: begin Stop 1 (create the ports in code) and validate it as the first merge checkpoint.

## 🔗 Links / references

- Final report: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/final-report.md`
- Summary: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/artifacts/summary.md`
- Merge milestones: `docs/05-planning/research/ui-infra-merge-milestones.md`
- Stop points + risks: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/stop-points-and-risks.md`

---

### 0020_checkpoint-stop-1-implemented-ports-dtos-in-code.md

---
step: 0020
created_at: "2025-12-28 21:31"
title: "Checkpoint: Stop 1 implemented (ports + DTOs in code)"
---

# Step 0020: Checkpoint: Stop 1 implemented (ports + DTOs in code)

## ✅ What I did (facts)

- Implemented Stop 1 in code: added ports + DTO contracts as TypeScript types/interfaces (no runtime wiring).
- Added shared primitives and error contract (`PortError`, keys, `MoneyDTO`) under `@platform/ports`.
- Added commerce ports under `@platform/commerce/ports` and CMS/content ports under `@platform/cms/ports`, with an alias surface at `@platform/content`.
- Added a typecheck-only import file so the contracts are included in the TS program: `src/lib/_contract_sanity.ts`.
- Ran `npm run typecheck` successfully.

## 🧠 What I learned (new information)

- The repo’s TS app config doesn’t automatically typecheck all platform folders unless imported; a dedicated typecheck-only import file is a safe way to keep contracts validated without changing runtime consumers.

## 🧭 What changes because of this

- Implementation can proceed to Stop 2 (platform entrypoints and adapter selection) without reworking contracts.
- Future migrations can import stable ports/DTOs rather than Shopify modules.

## ➡️ Next step

- Implement Stop 2: add platform entrypoints that select adapters and enforce dev-vs-prod policy (mock in dev, `PortError('NOT_CONFIGURED')` in prod), without changing UI consumers yet.

## 🔗 Links / references

- `src/domains/platform/ports/index.ts`
- `src/domains/platform/commerce/ports/index.ts`
- `src/domains/platform/cms/ports/index.ts`
- `src/domains/platform/content/index.ts`
- `src/lib/_contract_sanity.ts`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
