---
compaction: 0009
created_at: "2025-12-30 18:12"
range: "0075-0084"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0009 (0075–0084)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0075_checkpoint-decided-mvp-scope-for-fulfillmentorders-queue-scan.md

---
step: 0075
created_at: "2025-12-30 17:57"
title: "Checkpoint: decided MVP scope for fulfillmentOrders queue scan"
---

# Step 0075: Checkpoint: decided MVP scope for fulfillmentOrders queue scan

## ✅ What I did (facts)

- Added a decision-log entry that explicitly scopes whether the MVP includes a queue-scoped `fulfillmentOrders(query: ...)` scan or stays order-scoped only:
  - updated `artifacts/open-questions.md`
- Updated the wedge execution queue to reference this scope decision so engineering doesn’t accidentally build the queue scan by default:
  - updated `artifacts/next-actions.md`

## 🧠 What I learned (new information)

- The main risk of queue scans isn’t just performance; it’s “silent broadening” if search fields are invalid (Shopify can ignore invalid fields and return all results), so MVP should avoid it unless it’s a deliberate product requirement.

## 🧭 What changes because of this

- MVP integration scope is now clearer: default to deterministic, per-order preflight (`order(id){ fulfillmentOrders }`) unless Exceptions Queue is explicitly planned for Week 1–2.
- This reduces required scopes and makes action execution more secure-by-default.

## ➡️ Next step

- Decide whether Exceptions Queue is truly MVP scope. If yes, keep queue scan but enforce strict query templates and limits; if no, remove queue scan from MVP runner and treat it as Phase 2.

## 🔗 Links / references

- Decision log: `artifacts/open-questions.md` (“Fulfillment Orders: keep/remove queue scan in MVP”)
- Updated execution queue: `artifacts/next-actions.md`
- Shopify docs:
  - Search syntax: `https://shopify.dev/docs/api/usage/search-syntax`
  - `fulfillmentOrders` query: `https://shopify.dev/docs/api/admin-graphql/latest/queries/fulfillmentOrders`

---

### 0076_checkpoint-batch-02-snapshot-findings-capture-checklist-audit-doc-notes.md

---
step: 0076
created_at: "2025-12-30 17:57"
title: "Checkpoint: Batch-02 snapshot findings + capture checklist + audit doc notes"
---

# Step 0076: Checkpoint: Batch-02 snapshot findings + capture checklist + audit doc notes

## ✅ What I did (facts)

- Created Batch‑02 execution artifacts (adjacent women’s categories: activewear/swim/intimates):
  - `artifacts/womens-fashion-batch-02-snapshot-findings.md`
  - `artifacts/womens-fashion-capture-todo-batch-02.md`
- Added snapshot-backed preflight notes (non-visual) into the three Batch‑02 audit docs:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/alo-yoga.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/summersalt.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/thirdlove.md`
- Updated synthesis pointers so Batch‑02 is discoverable as the “next tranche” after Batch‑01:
  - updated `artifacts/womens-fashion-next-3-audits.md`
  - updated `artifacts/summary.md`

## 🧠 What I learned (new information)

- Batch‑02 HTML snapshots show strong “conversion confidence builder” signals even before screenshots:
  - Alo Yoga: explicit shipping/returns reassurance banner, Afterpay, loyalty surfaces, Borderfree cross-border tooling.
  - Summersalt: Hydrogen/Remix-style storefront, fit guide as a core destination, returns implemented as a first-class routed page.
  - ThirdLove: fit quiz (“Fitting Room”) is central, explicit free exchange window messaging, Loop Returns extension present.

## 🧭 What changes because of this

- We can broaden the pattern library beyond premium DTC womenswear and still stay evidence-first; screenshot audits for these stores should be faster because we already know which signals to verify and where to look.

## ➡️ Next step

- Capture screenshots (desktop + mobile) for Batch‑02 using:
  - `artifacts/womens-fashion-capture-todo-batch-02.md`
- Then run postprocess for each store to generate pattern suggestions / rollups:
  - `python3 docs/.blackbox/scripts/research/postprocess_store_audit.py --store-slug alo-yoga`
  - `python3 docs/.blackbox/scripts/research/postprocess_store_audit.py --store-slug summersalt`
  - `python3 docs/.blackbox/scripts/research/postprocess_store_audit.py --store-slug thirdlove`

## 🔗 Links / references

- Batch‑02 snapshot folder: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/`
- Batch‑02 snapshot findings: `artifacts/womens-fashion-batch-02-snapshot-findings.md`
- Batch‑02 capture checklist: `artifacts/womens-fashion-capture-todo-batch-02.md`

---

### 0077_checkpoint-decided-exceptions-queue-mvp-scope-avoid-shopify-wide-scans.md

---
step: 0077
created_at: "2025-12-30 18:00"
title: "Checkpoint: decided Exceptions Queue MVP scope (avoid Shopify-wide scans)"
---

# Step 0077: Checkpoint: decided Exceptions Queue MVP scope (avoid Shopify-wide scans)

## ✅ What I did (facts)

- Added an explicit decision-log entry for whether Exceptions Queue is in MVP scope (and what “MVP exceptions” means):
  - updated `artifacts/open-questions.md` (“Exceptions Queue: MVP scope yes/no”)
- Wired the decision into the execution queue so engineering doesn’t accidentally build generalized queue scans:
  - updated `artifacts/next-actions.md`
- Added an MVP scoping note directly inside the Exceptions Queue epic so scope stays clear:
  - updated `artifacts/implementation-epics-action-center-exceptions.md`

## 🧠 What I learned (new information)

- The highest-risk version of “exceptions queue” is Shopify-wide scanning; it expands scopes and introduces “invalid search field ignored” failure modes. A safer MVP is “exceptions only for our action runner failures”.

## 🧭 What changes because of this

- MVP scope is now clearer:
  - order-scoped action center + deterministic preflight is the default
  - exceptions can exist as a queue, but only for actions we attempted (we control the data)
- This keeps the wedge tight and reduces integration surface area while preserving operator clarity.

## ➡️ Next step

- Decide whether we implement Option 1 (no queue) vs Option 2 (our-action-runner-only queue) for Week 1–2, then align the UI backlog accordingly.
- If we pick Option 2: define the minimal exception “reason codes” that map to action failures and retryable steps.

## 🔗 Links / references

- `artifacts/open-questions.md`
- `artifacts/next-actions.md`
- `artifacts/implementation-epics-action-center-exceptions.md`

---

### 0078_checkpoint-exceptions-reason-codes-retry-rules-our-runner-only.md

---
step: 0078
created_at: "2025-12-30 18:02"
title: "Checkpoint: exceptions reason codes + retry rules (our-runner-only)"
---

# Step 0078: Checkpoint: exceptions reason codes + retry rules (our-runner-only)

## ✅ What I did (facts)

- Defined an MVP-safe Exceptions Queue model (our action runner failures only) with:
  - reason codes (v1) sized for a first release (≈8–12)
  - deterministic retry rules (max attempts, backoff, when to block)
  - operator CTA mapping (“re-auth”, “run preflight”, “request approval”, “retry now”)
- Wrote the spec directly into:
  - `artifacts/implementation-epics-action-center-exceptions.md`

## 🧠 What I learned (new information)

- “Exceptions Queue” can provide real operator leverage without Shopify-wide scanning if it’s rooted in actions we attempted (we already have correlation/idempotency and can store userErrors).

## 🧭 What changes because of this

- The Exceptions Queue epic is now implementable as a first-class part of the action runner:
  - every failure produces a consistent exception record
  - retry behavior is predictable and safe-by-default
- This keeps MVP scope tight while still enabling a queue UI if we decide to ship Option 2.

## ➡️ Next step

- Decide the minimum set of exception reason codes to launch with (lock the enum).
- Add a short “how to store userErrors” note (redaction rules) so retry triage is auditable.

## 🔗 Links / references

- `artifacts/implementation-epics-action-center-exceptions.md`

---

### 0079_checkpoint-error-payload-storage-redaction-rules-for-exceptions.md

---
step: 0079
created_at: "2025-12-30 18:04"
title: "Checkpoint: error payload storage + redaction rules for exceptions"
---

# Step 0079: Checkpoint: error payload storage + redaction rules for exceptions

## ✅ What I did (facts)

- Defined “error payload storage + redaction rules (v1)” for Exceptions Queue runs, including:
  - what to store in `exception_runs.payload_json` (structured fields + safe context)
  - what to explicitly avoid storing (PII/payment instrument/receipt data)
  - implementation guidance for key-based redaction + truncation
- Wrote the rules into:
  - `artifacts/implementation-epics-action-center-exceptions.md`

## 🧠 What I learned (new information)

- Most of the operator value comes from structured `userErrors` summaries and reason codes; raw payload dumps are rarely needed and increase privacy risk, so MVP should default to redacted structured storage.

## 🧭 What changes because of this

- Exceptions Queue is now implementable without “log everything” risk: we have a concrete storage schema + redaction posture.
- This also clarifies UI permissions: deep payload view should be gated and clearly labeled as redacted.

## ➡️ Next step

- Decide whether to allow storing customer notes/messages in exceptions (default: no) and, if yes, add a separate permissioned storage path.
- Add an example `payload_json` object (one Shopify mutation failure, one timeout) so engineers can copy/paste the shape.

## 🔗 Links / references

- `artifacts/implementation-epics-action-center-exceptions.md`

---

### 0080_checkpoint-added-example-exception-payload-json-objects.md

---
step: 0080
created_at: "2025-12-30 18:06"
title: "Checkpoint: added example exception payload_json objects"
---

# Step 0080: Checkpoint: added example exception payload_json objects

## ✅ What I did (facts)

- Added two copy/paste example `exception_runs.payload_json` objects:
  - Shopify GraphQL userErrors failure example (refundCreate)
  - transient upstream timeout example (carrier label purchase)
- Wrote examples into:
  - `artifacts/implementation-epics-action-center-exceptions.md`

## 🧠 What I learned (new information)

- A small number of standardized fields (`operation`, `error_class`, `user_errors`, `safe_context`) captures most of the operator/debug value without requiring raw payload dumps.

## 🧭 What changes because of this

- Engineering can now build UI mocks and tests for Exceptions Queue using a canonical payload shape, reducing ambiguity and speeding up implementation.

## ➡️ Next step

- Decide the exact `error_class` enum values we want to standardize across all integrations.
- Add one more example for “auth expired” (requires re-auth CTA) if we want to validate that UX path.

## 🔗 Links / references

- `artifacts/implementation-epics-action-center-exceptions.md`

---

### 0081_checkpoint-added-auth-expired-exception-payload-example.md

---
step: 0081
created_at: "2025-12-30 18:08"
title: "Checkpoint: added auth-expired exception payload example"
---

# Step 0081: Checkpoint: added auth-expired exception payload example

## ✅ What I did (facts)

- Added a third example `exception_runs.payload_json` for the “auth expired” path (401/invalid token), including a clear `next_action_hint`.
- Wrote the example into:
  - `artifacts/implementation-epics-action-center-exceptions.md`

## 🧠 What I learned (new information)

- “Auth expired” is the most common non-retryable transient class; it needs a dedicated CTA and should not be retried automatically until re-auth succeeds.

## 🧭 What changes because of this

- The Exceptions Queue now has example payloads covering the three main UX paths:
  - userErrors validation failures
  - transient timeouts/rate limits
  - auth-expired reauth requirement

## ➡️ Next step

- Decide the canonical `error_class` enum values and ensure all integrations map into them consistently.
- (Optional) Add a small UI mock card spec showing how `error_class` + `reason_code` + CTA render in the queue list.

## 🔗 Links / references

- `artifacts/implementation-epics-action-center-exceptions.md`

---

### 0082_checkpoint-batch-03-snapshot-notes-rouje-ganni-universal.md

---
step: 0082
created_at: "2025-12-30 18:08"
title: "Checkpoint: Batch-03 snapshot notes (Rouje/Ganni/Universal)"
---

# Step 0082: Checkpoint: Batch-03 snapshot notes (Rouje/Ganni/Universal)

## ✅ What I did (facts)

- Created Batch‑03 snapshot findings artifact (Rouje/GANNI/Universal Standard) with on-disk HTML evidence paths:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/womens-fashion-batch-03-snapshot-findings.md`
- Inserted “Snapshot notes (non-visual; evidence-backed)” into the 3 store audit docs to speed up the upcoming screenshot session:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/rouje.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/ganni.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/universal-standard.md`
- Updated the “next 3 audits” queue to include Batch‑03 pointers:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/womens-fashion-next-3-audits.md`

## 🧠 What I learned (new information)

- GANNI has a specific Klarna placement test wired into the mini cart markup (“minicart-with-klarna-placement-test”):
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__ganni-home.html`
- Rouje’s PDP HTML contains signals for multiple review providers (Okendo variables + Yotpo payload), so the on-page reviews UI may be non-trivial and worth screenshotting carefully:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/20251229T120113Z__rouje-pdp.html`
- Universal Standard routes returns/exchanges through Happy Returns and exposes “Fit Liberty Exchange” in returns navigation:
  - evidence: `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/20251229T115424Z__universalstandard-returns.html`

## 🧭 What changes because of this

- The manual screenshot audit can be executed faster because we now have “preflight targets + what-to-look-for” bullets embedded directly in each store audit doc.
- Batch‑03 is now “ready to run” for human capture (desktop + mobile), with minimal risk of wasting time discovering URLs mid-session.

## ➡️ Next step

- Human screenshot capture for Batch‑03 using the checklist:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/womens-fashion-capture-todo-batch-03.md`
- After screenshots exist, run postprocess per store:
  - `python3 docs/.blackbox/scripts/research/postprocess_store_audit.py --store-slug rouje`
  - `python3 docs/.blackbox/scripts/research/postprocess_store_audit.py --store-slug ganni`
  - `python3 docs/.blackbox/scripts/research/postprocess_store_audit.py --store-slug universal-standard`

## 🔗 Links / references

- Batch‑03 snapshot folder:
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/`
- Universal Standard snapshot folder (Batch‑02):
  - `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-02/`
- Batch‑03 manual audit queue (dashboard context):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/BATCH-03.md`

---

### 0083_checkpoint-standardized-error-class-enum-cta-mapping.md

---
step: 0083
created_at: "2025-12-30 18:10"
title: "Checkpoint: standardized error_class enum + CTA mapping"
---

# Step 0083: Checkpoint: standardized error_class enum + CTA mapping

## ✅ What I did (facts)

- Defined a canonical `error_class` enum (v1) for Exceptions Queue runs so all integrations categorize failures consistently.
- Added a mapping table from `reason_code → error_class → primary CTA → auto-retry?` to make operator behavior deterministic.
- Wrote both into:
  - `artifacts/implementation-epics-action-center-exceptions.md`

## 🧠 What I learned (new information)

- Even when exact upstream errors vary, a small, stable `error_class` enum is enough to drive consistent retry/CTA behavior and keep the queue predictable.

## 🧭 What changes because of this

- Exceptions Queue UX can now be implemented with a deterministic ruleset (CTA + retryability) without custom handling per connector.
- This should reduce operator confusion and prevent unsafe auto-retries on auth/validation failures.

## ➡️ Next step

- Add “manual review required” criteria for `UNKNOWN` errors (e.g., after N attempts or if userErrors present).
- (Optional) tighten the `UNKNOWN` rows by splitting into `TRANSIENT` vs `VALIDATION` based on structured upstream codes if available.

## 🔗 Links / references

- `artifacts/implementation-epics-action-center-exceptions.md`

---

### 0084_checkpoint-unknown-stop-conditions-manual-review-rules.md

---
step: 0084
created_at: "2025-12-30 18:12"
title: "Checkpoint: UNKNOWN stop conditions + manual review rules"
---

# Step 0084: Checkpoint: UNKNOWN stop conditions + manual review rules

## ✅ What I did (facts)

- Defined deterministic “UNKNOWN handling rules + stop conditions” for Exceptions Queue retries.
- Added explicit criteria for when an exception becomes `needs_manual_review` and blocks auto-retry.
- Wrote the rules into:
  - `artifacts/implementation-epics-action-center-exceptions.md`

## 🧠 What I learned (new information)

- The safest default for UNKNOWN is “operator-initiated retry only” with a low attempt cap; this avoids infinite loops and prevents repeated potentially-harmful actions.

## 🧭 What changes because of this

- Exceptions Queue behavior is now predictable even for messy upstream errors:
  - clear stop conditions
  - clear operator CTAs
  - clear audit requirements for STOP transitions

## ➡️ Next step

- Decide if the `attempt >= 3` stop threshold should be configurable per tenant (policy key) or fixed.
- Optionally add a short “state machine for exceptions” (OPEN → RETRYING → NEEDS_MANUAL_REVIEW → RESOLVED).

## 🔗 Links / references

- `artifacts/implementation-epics-action-center-exceptions.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
