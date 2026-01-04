---
compaction: 0001
created_at: "2025-12-28 20:59"
range: "0001-0010"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0001 (0001–0010)

## ✅ Summary (fill this after compaction)

- Architecture direction is locked: UI depends on ports/DTOs; Shopify/Stripe live behind adapters; UI switches behavior via capabilities (not vendor flags).
- The repo has concrete Shopify leakage points (UI copy, Shopify GIDs, `runStorefront` usage in `src/lib/*`) and they’re inventoried in the run artifacts.
- Checkout handoff/proxying is real infra in this repo (`/cart/c/*`, `/checkouts/*`), so it must be modeled as a capability (not a vendor-named UI page).
- Default checkout policy chosen: when handoff is available, `CheckoutPort.beginCheckout()` should return a first-party URL (proxy/handoff) to keep vendor routing/hosts out of UI.
- Execution is now “ticketable”: Week 1 board + granular backlog exist with acceptance checks (still no code changes in this run).

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
  - Always ask “is this actually infra?” before designing UI abstractions (checkout proxying is infra).
  - Prefer adding a capability flag + a single URL output over proliferating new UI routes/pages.
- Checklist improvements:
  - Keep an explicit “vendor hostnames/routes must not be in UI” checklist item (easy to forget).
  - Track both client-side and server-side vendor boundaries (Storefront exists in both).
- Better stop conditions:
  - Stop expanding contracts once they cover all known leak sources + checkout handoff routes; move to implementation tickets.

## Steps compacted (trimmed)

### 0001_kickoff-start-architecture-research-run.md

---
step: 0001
created_at: "2025-12-28 20:25"
title: "Kickoff: start architecture research run"
---

# Step 0001: Kickoff: start architecture research run

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0002_checkpoint-prompts-1-5-seeded-draft-artifacts-created.md

---
step: 0002
created_at: "2025-12-28 20:30"
title: "Checkpoint: prompts 1–5 seeded (draft artifacts created)"
---

# Step 0002: Checkpoint: prompts 1–5 seeded (draft artifacts created)

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0003_checkpoint-prompts-48-50-synthesized-final-report-summary-updated.md

---
step: 0003
created_at: "2025-12-28 20:37"
title: "Checkpoint: prompts 48–50 synthesized (final report + summary updated)"
---

# Step 0003: Checkpoint: prompts 48–50 synthesized (final report + summary updated)

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0004_checkpoint-prompts-6-20-inventory-expanded-artifact-map-sources-updated.md

---
step: 0004
created_at: "2025-12-28 20:39"
title: "Checkpoint: prompts 6–20 inventory expanded (artifact-map + sources updated)"
---

# Step 0004: Checkpoint: prompts 6–20 inventory expanded (artifact-map + sources updated)

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0005_checkpoint-ports-dtos-draft-added-ports-md.md

---
step: 0005
created_at: "2025-12-28 20:41"
title: "Checkpoint: ports + DTOs draft added (ports.md)"
---

# Step 0005: Checkpoint: ports + DTOs draft added (ports.md)

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0006_checkpoint-migration-plan-tightened-to-ports-md-contracts.md

---
step: 0006
created_at: "2025-12-28 20:42"
title: "Checkpoint: migration plan tightened to ports.md contracts"
---

# Step 0006: Checkpoint: migration plan tightened to ports.md contracts

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0007_checkpoint-week-1-execution-board-published-ledger-updated.md

---
step: 0007
created_at: "2025-12-28 20:45"
title: "Checkpoint: week 1 execution board published + ledger updated"
---

# Step 0007: Checkpoint: week 1 execution board published + ledger updated

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0008_checkpoint-promoted-architecture-docs-ticket-backlog.md

---
step: 0008
created_at: "2025-12-28 20:50"
title: "Checkpoint: promoted architecture docs + ticket backlog"
---

# Step 0008: Checkpoint: promoted architecture docs + ticket backlog

## ✅ What I did (facts)

- Added a granular execution backlog for the plug-in architecture: `docs/05-planning/research/ui-infra-ticket-backlog.md`.
- Added a decision log to the canonical architecture note: `docs/05-planning/research/ui-infra-plugin-architecture.md`.
- Updated the docs ledger so the new backlog is discoverable: `docs/08-meta/repo/docs-ledger.md`.
- Expanded coupling evidence via repo scans (Shopify IDs/copy in UI, checkout proxy infra, server-side Storefront endpoints).
- Updated the run folder’s `artifact-map.md` + `artifacts/sources.md` to reflect the expanded evidence.

## 🧠 What I learned (new information)

- There’s meaningful checkout infra sitting in `functions/_lib/shopifyCheckoutProxy.ts` plus route handlers for `/cart/c/*` and `/checkouts/*`; UI should treat this as a capability, not a vendor-specific page concern.
- Storefront querying exists in both client (`src/domains/platform/commerce/shopify/shopify.ts`) and server (`functions/_lib/storefront.ts`), which creates a real “where should ports live” decision (internal API vs client Storefront vs hybrid).
- The repo contains Shopify GID constants in UI/config (`gid://shopify/...`), confirming internal key mapping is a necessary early design decision.

## 🧭 What changes because of this

- The architecture plan is now “execution-ready”: it has decisions + tickets + acceptance checks, not just a conceptual diagram.
- The next research step should focus on *port implementation strategy* (internal API vs client Storefront) and *checkout handoff capabilities* (to hide proxy routes from UI).

## ➡️ Next step

- Decide the preferred default for `CatalogPort`/`ContentPort` implementations:
  - internal API (functions) first, or
  - client Storefront first, or
  - hybrid (env-driven).
- Tighten `CheckoutPort` / `CheckoutCapabilities` to explicitly cover the existing proxy/handoff routes.

## 🔗 Links / references

- Plan folder: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`
- Canonical architecture: `docs/05-planning/research/ui-infra-plugin-architecture.md`
- Contracts: `docs/05-planning/research/ui-infra-ports-dtos.md`
- Tickets: `docs/05-planning/research/ui-infra-ticket-backlog.md`

---

### 0009_checkpoint-checkout-handoff-capability-tightened.md

---
step: 0009
created_at: "2025-12-28 20:56"
title: "Checkpoint: checkout handoff capability tightened"
---

# Step 0009: Checkpoint: checkout handoff capability tightened

## ✅ What I did (facts)

- Tightened the checkout contract to explicitly model proxy/handoff routes as a capability (vendor-agnostic).
- Updated the canonical and run-local contract docs to include `CheckoutCapabilities.handoff.routes`.
- Updated the execution tickets to require supporting this repo’s existing handoff routes (`/cart/c/*`, `/checkouts/*`) without vendor naming.

## 🧠 What I learned (new information)

- Checkout “handoff” is not just copy; it’s a real infra concern already implemented server-side, so the right abstraction is a capability + URL output, not UI hardcoding.
- The cleanest UI boundary is: UI either redirects to a URL from `beginCheckout()`, or renders a generic recovery flow if `capabilities.handoff` exists.

## 🧭 What changes because of this

- Ports/DTOs now directly cover a known real-world coupling point (Shopify checkout link handling) without vendor leakage.
- The migration path can remove the vendor-named “Shopify checkout handoff” page by making it a generic “CheckoutHandoff” surface driven by capabilities.

## ➡️ Next step

- Decide the initial default behavior for `beginCheckout()` under Shopify:
  - return a vendor URL directly, or
  - return a first-party proxy/handoff URL (preferred when available).
- Expand the “internal API vs client Storefront” decision into concrete acceptance checks for the first implementation sprint.

## 🔗 Links / references

- Canonical contracts: `docs/05-planning/research/ui-infra-ports-dtos.md`
- Canonical architecture: `docs/05-planning/research/ui-infra-plugin-architecture.md`
- Execution tickets: `docs/05-planning/research/ui-infra-ticket-backlog.md`
- Run-local contracts: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/ports.md`

---

### 0010_checkpoint-default-checkout-url-policy-first-party-handoff.md

---
step: 0010
created_at: "2025-12-28 20:59"
title: "Checkpoint: default checkout URL policy (first-party handoff)"
---

# Step 0010: Checkpoint: default checkout URL policy (first-party handoff)

## ✅ What I did (facts)

- Set the default contract policy: when `CheckoutCapabilities.handoff` exists, `CheckoutPort.beginCheckout()` should prefer returning a first-party proxy/handoff URL (not a vendor URL).
- Updated canonical contracts and architecture notes to reflect this policy.
- Updated execution tickets (Week 1 + backlog) to enforce the same default.

## 🧠 What I learned (new information)

- A clean “UI is plug-in” boundary includes “don’t hardcode vendor routes/hosts”, not just “don’t import vendor code”.
- Returning a first-party URL from the port is the simplest enforcement mechanism, and it matches existing infra behavior in this repo.

## 🧭 What changes because of this

- Checkout is now end-to-end consistent: capabilities advertise handoff routes, the port returns a first-party URL, and UI can be vendor-agnostic.
- This reduces future Stripe/other-provider work because UI doesn’t need a “new handoff page per vendor”.

## ➡️ Next step

- Resolve the remaining open decision: implement ports primarily via internal API (functions) vs client Storefront vs hybrid.
- Then (when code changes are allowed) implement the Shopify `CheckoutPort` wrapper so it returns a first-party URL by default.

## 🔗 Links / references

- Canonical contracts: `docs/05-planning/research/ui-infra-ports-dtos.md`
- Canonical architecture: `docs/05-planning/research/ui-infra-plugin-architecture.md`
- Week 1 board: `docs/05-planning/research/ui-infra-week-1-execution-board.md`
- Backlog: `docs/05-planning/research/ui-infra-ticket-backlog.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
