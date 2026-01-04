---
compaction: 0004
created_at: "2025-12-31 09:20"
range: "0031-0040"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0004 (0031–0040)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0031_checkpoint-added-cloudflare-sha1-signing-note-for-cloudinary.md

---
step: 0031
created_at: "2025-12-31 06:09"
title: "Checkpoint: added Cloudflare SHA1 signing note for Cloudinary"
---

# Step 0031: Checkpoint: added Cloudflare SHA1 signing note for Cloudinary

## ✅ What I did (facts)

- Added a Cloudflare-compatible SHA1 signing snippet (Web Crypto) to the P0.3 plan for `/api/cloudinary/sign` migration guidance.
- Kept the snippet explicitly tied to the legacy implementation so implementation can preserve parity before auth hardening.

## 🧠 What I learned (new information)

- Cloudinary signing (as implemented here) is **not** HMAC; it’s a plain SHA1 over the sorted query string plus `CLOUDINARY_API_SECRET` appended.
- Cloudflare Pages Functions can replicate this using `crypto.subtle.digest('SHA-1', ...)` + hex encoding, so migrating off Node `crypto` is straightforward.

## 🧭 What changes because of this

- P0.3 has fewer “unknown implementation details” for the Cloudinary endpoint; the migration work can be executed without ad-hoc research during coding.

## ➡️ Next step

- Continue: yes.
- Next micro-goal: update the P0.3 plan to explicitly call out the temporary security posture for Cloudinary signing (parity-first) and how PR 2 should tighten it (admin-tier auth).

## 🔗 Links / references

- P0.3 plan (updated): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`
- Evidence (legacy Cloudinary sign algorithm): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`

---

### 0032_checkpoint-pr7-vendor-leak-lines-snapshotted-mapping-table-proposed.md

---
step: 0032
created_at: "2025-12-31 06:13"
title: "Checkpoint: PR7 vendor leak lines snapshotted; mapping table proposed"
---

# Step 0032: Checkpoint: PR7 vendor leak lines snapshotted; mapping table proposed

## ✅ What I did (facts)

- Captured evidence snapshots showing the exact offending Shopify GID lines in UI/client code (so PR7 work doesn’t depend on re-scanning during implementation).
- Updated the PR7 detailed plan to include a concrete “GID → VariantKey” mapping proposal aligned with the internal key scheme (`variant.<handle>.<variant>`).

## 🧠 What I learned (new information)

- The 5 disallowed vendor leak lines collapse to only **two** unique Shopify Variant GIDs reused across multiple files (upsells, product config fallbacks, and volume discount logic).
- The product config already includes stable product handles (`lumelle-shower-cap`, `satin-overnight-curler`), which makes a deterministic VariantKey scheme straightforward.

## 🧭 What changes because of this

- PR7 can be executed as a small deterministic refactor: replace just two IDs everywhere above adapters, then add only two mapping entries behind the Shopify adapter boundary.
- This reduces the risk of “missing one stray GID string” and makes the vendor leak scan’s path to 0 more predictable.

## ➡️ Next step

- Continue: yes.
- Next micro-goal: document where the Shopify adapter mapping should live (exact file path) and how missing mappings should fail (`PortErrorCode.NOT_FOUND`) so PR7 has no open design questions.

## 🔗 Links / references

- PR7 plan (updated): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-7-vendor-key-mapping-detailed-plan.md`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/vendor-leaks-src-ui-providers-DrawerProvider.tsx.L130-190.txt`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/vendor-leaks-src-domains-client-shop-cart-logic-volumeDiscounts.ts.L1-120.txt`
- Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/vendor-leaks-src-domains-client-shop-products-data-product-config.ts.L160-260.txt`

---

### 0033_checkpoint-reconciled-key-mapping-spec-with-current-shopify-adapter-pr7-now-mechanical.md

---
step: 0033
created_at: "2025-12-31 06:20"
title: "Checkpoint: reconciled key-mapping spec with current Shopify adapter; PR7 now mechanical"
---

# Step 0033: Checkpoint: reconciled key-mapping spec with current Shopify adapter; PR7 now mechanical

## ✅ What I did (facts)

- Captured snapshots of the current Shopify adapter key encoding/decoding behavior (variant/cart/line keys).
- Updated `key-mapping-spec-v1.md` to explicitly document the current reversible “v0” key encoding (base64url of Shopify GIDs) and why it is not sufficient for provider swap.
- Updated the PR7 plan to:
  - reconcile with current adapter behavior,
  - define the adapter-side mapping registry needed for stable `VariantKey` values,
  - and specify the exact resolver responsibilities + failure semantics.
- Updated the PR stop-point gate pack PR7 section to include supporting offender-line snapshots (review-friendly).

## 🧠 What I learned (new information)

- The Shopify adapter already treats `VariantKey` as an “opaque” string, but it is currently derived from Shopify GIDs (encoded), meaning it still carries vendor coupling.
- Commerce `productKey` is already handle-based in the adapter output, but `variantKey` is encoded from the Shopify variant GID (so variants are the remaining coupling hot spot).

## 🧭 What changes because of this

- PR7 is now an execution checklist, not a design exercise: it’s clear where the mapping registry should live and what adapter code paths need to consume it.
- The architecture plan is more honest/robust: it distinguishes “opaque vendor-derived keys” (v0) from “provider-independent stable keys” (v1), which is required for true provider swaps.

## ➡️ Next step

- Continue: yes.
- Next micro-goal: extend the vendor leak gate to optionally detect “encoded Shopify IDs” above adapters (future hardening), or document this as a known limitation of the current scan.

## 🔗 Links / references

- Key mapping spec (updated): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/key-mapping-spec-v1.md`
- PR7 plan (updated): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-7-vendor-key-mapping-detailed-plan.md`
- Gate pack (updated): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-stop-point-gate-pack.md`
- Evidence (adapter keys): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-keys.ts.head260.2025-12-30_2316.txt`
- Evidence (adapter emits variantKey): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-catalog.ts.head120.txt`
- Evidence (adapter decodes variantKey): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-adapters-shopify-internal-api-cart.ts.head220.txt`

---

### 0034_checkpoint-hardened-vendor-leak-scan-to-catch-encoded-variant-keys.md

---
step: 0034
created_at: "2025-12-31 06:25"
title: "Checkpoint: hardened vendor leak scan to catch encoded variant keys"
---

# Step 0034: Checkpoint: hardened vendor leak scan to catch encoded variant keys

## ✅ What I did (facts)

- Updated `.blackbox/scripts/check-vendor-leaks.sh` to include an additional detection pass for “obfuscated vendor IDs”: base64url-encoded Shopify GIDs embedded in `variant.<token>` strings inside UI/client/lib.
- Verified the new scan runs without PCRE2 support (portable `rg` regex + `node` decode).
- Confirmed the current codebase has no encoded `variant.<base64>` keys in UI/client/lib (scan reports none).

## 🧠 What I learned (new information)

- The previous leak scan could be bypassed by hardcoding the adapter’s encoded keys (no literal `gid://shopify/`), so the scan needed to be upgraded to remain aligned with the provider-swap goal.

## 🧭 What changes because of this

- The “vendor leak” gate is now closer to a true swappability guardrail: it blocks both raw vendor IDs and their encoded equivalents in UI/client/lib.
- PR7’s “quick fix” (hardcode encoded keys) is now explicitly discouraged by tooling, keeping the architecture direction consistent.

## ➡️ Next step

- Continue: yes.
- Next micro-goal: refresh the full 1909 evidence pack so the dashboard snapshots include the updated vendor leak scan output and updated script head snapshots.

## 🔗 Links / references

- Updated gate script: `.blackbox/scripts/check-vendor-leaks.sh`
- Evidence output (after script change): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

### 0035_checkpoint-expanded-backend-inspection-added-e2e-flow-map.md

---
step: 0035
created_at: "2025-12-31 06:44"
title: "Checkpoint: expanded backend inspection + added e2e flow map"
---

# Step 0035: Checkpoint: expanded backend inspection + added e2e flow map

## ✅ What I did (facts)

- Refreshed the full swappability gate bundle to re-ground “current state” in snapshots.
  - Evidence log: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.latest.log.txt`
- Synced the artifacts version of “invariants + acceptance checks” to include canonical boundary drift + scalability + security invariants (so future citations can point to `artifacts/`).
  - Updated doc: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/invariants-and-acceptance.md`
- Captured missing backend evidence snapshots for the checkout proxy seam + webhook plumbing:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-storefront-cart-fetch.ts.head220.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-webhooks.ts.head220.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-shopify-webhooks-orders-create.ts.head220.txt`
- Added a backend-focused “inspect first” file list (functions + legacy drift hotspots) to make the architecture review loop runnable.
  - Docs: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/inspect-first-backend.md`
  - Artifact copy: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/inspect-first-backend.md`
- Expanded the architecture atlas with end-to-end flow maps (PDP, cart, checkout proxy, payments).
  - Doc: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-atlas.md`
- Linked both “inspect first” docs from the main entrypoint so onboarding doesn’t require hunting.
  - Doc: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/START-HERE.md`

## 🧠 What I learned (new information)

- Backend already has a strong “checkout handoff” seam implemented as first-party proxy routes (`/cart/c/*`, `/checkouts/*`), which directly supports “UI swappable” without the UI knowing vendor domains.
  - Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
  - Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`
- Drift between legacy `api/**` and canonical `functions/api/**` still exists and remains quantifiable (`api_only=19`).
  - Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`
- Vendor leakage above adapters is still present (`disallowed_lines=5`) and remains the primary mechanical blocker to “swap providers later”.
  - Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

## 🧭 What changes because of this

- The architecture review loop is now runnable as a deterministic “read these files first” routine for both frontend (`inspect-first.md`) and backend (`inspect-first-backend.md`), which reduces thrash when extending the plan.
- The architecture atlas now contains evidence-backed end-to-end flows, making the intended swap seams explicit (and easier to enforce in future PRs).

## ➡️ Next step

- Update the plan’s summary/progress artifacts to include this checkpoint, then keep tightening the stop-point dashboard until P0.3 + PR7 are purely mechanical to execute.

## 🔗 Links / references

- Gate status snapshot: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/stop-point-metrics.latest.txt`
- Drift signal: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`
- Vendor leak baseline: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`
- Frontend inspect list: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/inspect-first.md`
- Backend inspect list: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/inspect-first-backend.md`

---

### 0036_checkpoint-research-index-checkout-proxy-gate-refresh-script-hardened.md

---
step: 0036
created_at: "2025-12-31 06:59"
title: "Checkpoint: research index + checkout proxy gate + refresh script hardened"
---

# Step 0036: Checkpoint: research index + checkout proxy gate + refresh script hardened

## ✅ What I did (facts)

- Added a research index that documents which upstream research runs were actually ingested into this plan (and how they’re cited).
  - Doc: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/research-index.md`
- Captured upstream research excerpts into this plan’s snapshot folder (so citations stay local/self-contained):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-2014-ui-infra-plugin.final-report.head140.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-0741-key-mapping.final-report.head200.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-feature-research-step01.summary.head120.txt`
- Added an explicit “checkout proxy/handoff seam exists” acceptance gate (docs) and made the main gate refresh script auto-snapshot the proxy seam files.
  - Gate docs: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/acceptance-gates.md`
  - Runbook: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/acceptance-gates-runbook.md`
  - Script: `docs/.blackbox/scripts/refresh-1909-all-gates.sh`
- Updated entrypoints so the loop is easier to run without hunting:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/START-HERE.md`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/RUN-NOW.md`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/agent-cycle.md`

## 🧠 What I learned (new information)

- The checkout proxy/handoff seam is important enough to treat as a first-class gate: it is a core mechanism that keeps vendor checkout domains/routes out of any UI.
  - Evidence (auto-captured by gates):  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

## 🧭 What changes because of this

- The architecture loop is now more robust: the one-command gate refresh captures the checkout proxy seam automatically, so “frontend swappable” has stronger ongoing evidence.
- Research ingestion is now auditable: we have a single file that says what research is actually being used and where it’s cited.

## ➡️ Next step

- Tighten the stop-point dashboard narrative so the “next mechanical step” is unambiguous (likely still P0.3 then PR7), and keep reducing drift/leaks over time.

## 🔗 Links / references

- Research index: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/research-index.md`
- Gate refresh log: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.latest.log.txt`
- Stop-point dashboard: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`

---

### 0037_checkpoint-checkout-proxy-seam-added-to-stop-point-dashboard.md

---
step: 0037
created_at: "2025-12-31 07:41"
title: "Checkpoint: checkout proxy seam added to stop-point dashboard"
---

# Step 0037: Checkpoint: checkout proxy seam added to stop-point dashboard

## ✅ What I did (facts)

- Added a checkout proxy seam health signal into the stop-point dashboard generation script and dashboard output.
  - Script: `docs/.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
  - Output: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`

## 🧠 What I learned (new information)

- The checkout proxy seam is stable today (0 missing snapshots), so it’s safe to treat as a baseline “must not regress” signal.
  - Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`

## 🧭 What changes because of this

- The dashboard now reflects an additional core swappability invariant (vendor-agnostic checkout handoff) rather than only surfacing vendor leak + drift counts.

## ➡️ Next step

- Continue reducing the remaining WARN signals in order (P0.3 drift → PR2 auth cues → PR7 vendor leaks), while keeping the checkout proxy seam green.

## 🔗 Links / references

- Dashboard: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`
- Gate refresh log: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.latest.log.txt`

---

### 0038_checkpoint-stop-point-gate-pack-includes-checkout-proxy-seam.md

---
step: 0038
created_at: "2025-12-31 07:50"
title: "Checkpoint: stop-point gate pack includes checkout proxy seam"
---

# Step 0038: Checkpoint: stop-point gate pack includes checkout proxy seam

## ✅ What I did (facts)

- Updated the PR stop-point gate pack to treat the checkout proxy/handoff seam as a first-class evidence artifact produced by `refresh-1909-all-gates.sh`.
  - Doc: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-stop-point-gate-pack.md`
- Updated the PR evidence diff template so future PRs explicitly record whether checkout proxy seam evidence changed.
  - Template: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-evidence-diff-summary-template.md`

## 🧠 What I learned (new information)

- The checkout proxy seam is a “quiet dependency” that can regress without changing `/api/*` endpoints, so it needs explicit evidence capture in PR diffs.

## 🧭 What changes because of this

- Future implementation PRs will automatically include checkout proxy seam deltas in the evidence diff process, reducing the chance we accidentally re-couple UI to vendor checkout domains.

## ➡️ Next step

- Refresh gates after any future doc/script change so the dashboard and script-head snapshots remain in sync.

## 🔗 Links / references

- Gate refresh command: `./.blackbox/scripts/refresh-1909-all-gates.sh`
- Checkout proxy seam evidence files (auto-generated by gates):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

---

### 0039_checkpoint-add-layer-convention-maps-expand-modularity-blueprint.md

---
step: 0039
created_at: "2025-12-31 09:10"
title: "Checkpoint: add layer convention maps + expand modularity blueprint"
---

# Step 0039: Checkpoint: add layer convention maps + expand modularity blueprint

## ✅ What I did (facts)

- Refreshed evidence snapshots + regenerated the stop-point dashboard:
  - Ran: `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - Ran: `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
  - Evidence logs:
    - `artifacts/snapshots/refresh-1909-all-gates.2025-12-31_020027.log.txt`
    - `artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-31_020035.log.txt`
- Added three layer-specific “conventions” maps so the architecture is easier to understand and reuse across client projects:
  - `domain-module-conventions.md`
  - `backend-boundary-conventions.md`
  - `data-layer-conventions.md`
- Expanded the “client project modularity blueprint” with a pragmatic future `apps/*` + `packages/*` layout target:
  - `client-project-modularity-blueprint.md`
- Updated navigation/index docs so the new maps are discoverable without creating more plan sprawl:
  - `START-HERE.md`
  - `CANONICAL.md`
  - `artifact-map.md`

## 🧠 What I learned (new information)

- `src/domains/**` is already organized in a way that supports modularity (platform vs admin vs client vs creator vs blog), and many domains consistently follow `data/`, `logic/`, `hooks/`, `ui/` sub-shapes:
  - Evidence: `artifacts/snapshots/src-tree.maxdepth4.dirs.txt`
- The backend boundary is already cleanly grouped under `functions/api/**` by product area (storefront/admin/payments/shopify/etc.), which makes it realistic to treat `/api/*` as the canonical frontend contract:
  - Evidence: `artifacts/snapshots/functions-tree.maxdepth4.dirs.txt`
- The checkout proxy/handoff seam is measurable and currently has all required snapshots present (so a frontend can avoid provider-specific checkout URLs):
  - Evidence: `artifacts/snapshots/stop-point-metrics.latest.txt`
  - Seam snapshots: `artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`, `artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`, `artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`

## 🧭 What changes because of this

- The architecture plan is now easier to apply to client work because the “swappable seams” are documented per layer (UI domains, backend boundary, data layer) instead of being scattered across many deep files:
  - Maps: `domain-module-conventions.md`, `backend-boundary-conventions.md`, `data-layer-conventions.md`
- The plan’s navigation now points to these maps, so onboarding a new engineer (or spinning up a new client UI) should require less context reconstruction:
  - `START-HERE.md`, `CANONICAL.md`, `artifact-map.md`

## ➡️ Next step

- Docs-only: review `.blackbox/` folder hygiene and consolidate/move/rename any plan artifacts that are misplaced (without changing runtime code), starting with `docs/.blackbox/.plans/**` and `docs/.blackbox/scripts/**`.
- When code changes become allowed: execute P0.3 boundary consolidation (`api/**` → `functions/api/**`) and then PR2/PR3/PR4 in order, using the stop-point dashboard as the sequencing signal:
  - `stop-point-status-dashboard.md`
  - `p0-3-boundary-consolidation-detailed-plan.md`

## 🔗 Links / references

- Dashboard: `stop-point-status-dashboard.md`
- Current metrics snapshot: `artifacts/snapshots/stop-point-metrics.latest.txt`
- Repo maps:
  - `architecture-atlas.md`
  - `architecture-component-catalog.md`
- New layer convention docs:
  - `domain-module-conventions.md`
  - `backend-boundary-conventions.md`
  - `data-layer-conventions.md`

---

### 0040_checkpoint-archive-excess-oss-discovery-plan-runs-to-reduce-plans-clutter.md

---
step: 0040
created_at: "2025-12-31 09:20"
title: "Checkpoint: archive excess oss-discovery plan runs to reduce .plans clutter"
---

# Step 0040: Checkpoint: archive excess oss-discovery plan runs to reduce .plans clutter

## ✅ What I did (facts)

- Captured before/after directory listings for `docs/.blackbox/.plans/` to keep the cleanup evidence-backed:
  - Before: `artifacts/snapshots/blackbox-plans.dirlist.before.txt`
  - After: `artifacts/snapshots/blackbox-plans.dirlist.after.txt`
- Generated a deterministic archive proposal for “OSS discovery run spam” (protect ledger-referenced runs + `.keep` + keep latest N):
  - `artifacts/snapshots/blackbox-plans.oss-archive-plan.txt`
- Archived excess OSS discovery plan runs by moving them into `.blackbox/.plans/_archive/2025-12/` (keeps history but restores readability).
  - Evidence (move log): `artifacts/snapshots/blackbox-plans.oss-archive-moves.2025-12-31_021943Z.txt`

## 🧠 What I learned (new information)

- The biggest practical source of “blackbox feels worse over time” is `.plans/` noise: when the root is dominated by transient research runs, active work becomes undiscoverable.
  - Evidence (pre-cleanup plan list): `artifacts/snapshots/blackbox-plans.dirlist.before.txt`
- The docs ledger is the right “do not break links” safety mechanism: if we protect ledger-referenced plan folders, we can archive aggressively without breaking canonical references.
  - Evidence (archive proposal includes protected_by_ledger): `artifacts/snapshots/blackbox-plans.oss-archive-plan.txt`

## 🧭 What changes because of this

- `.blackbox/.plans/` root becomes usable as an “active plans” view again (reduced clutter while preserving history under `_archive/`).
  - Evidence: `artifacts/snapshots/blackbox-plans.dirlist.after.txt`
- The 1909 architecture plan is easier to find and run because the plan list is no longer overwhelmed by one-off OSS runs.
  - Evidence: `artifacts/snapshots/blackbox-plans.dirlist.after.txt`

## ➡️ Next step

- Continue: yes.
- Next: make this cleanup repeatable (count-based archival + protect ledger + `.keep`) and wire it into blackbox maintenance checks.
  - Evidence anchor (maintenance pattern): `docs/.blackbox/MAINTENANCE.md`

## 🔗 Links / references

- Cleanup evidence:
  - `artifacts/snapshots/blackbox-plans.oss-archive-plan.txt`
  - `artifacts/snapshots/blackbox-plans.oss-archive-moves.2025-12-31_021943Z.txt`
  - `artifacts/snapshots/blackbox-plans.dirlist.before.txt`
  - `artifacts/snapshots/blackbox-plans.dirlist.after.txt`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
