---
status: draft
last_reviewed: 2025-12-28
owner: agent-zero
---

# Open Questions (Decision Log)

Purpose: turn uncertainty into **clear decisions** the team can answer quickly.

Rule: every item is written as a decision with options + recommendation + evidence.

## Decision template (copy/paste per decision)

```md
## <Decision title>

- Decision:
- Why it matters:
- Options:
  1) Option A — pros/cons (1 line)
  2) Option B — pros/cons (1 line)
  3) Option C (optional) — pros/cons (1 line)
- Recommendation: Option <A/B/C> because <1–2 reasons>
- Evidence:
  - <path/to/artifact.md>
  - <link>
- Next step after decision:
```

## Product wedge for 2026-Q1 MVP

- Decision: what is the primary wedge we commit to for the next build tranche?
- Why it matters: determines what we build vs integrate and prevents a “wide but shallow” product.
- Options:
  1) Ops Action Center — support + returns + shipping workflow compression (single pane + safe actions)
  2) Returns engine — policies + portal + labels + exchanges (deep specialization)
  3) Profit analytics — “true profit cockpit” (finance-first dashboarding)
- Recommendation: **Ops Action Center** because it is the shared differentiator across best-in-class merchant tools (context + actions + guardrails) and it naturally composes returns + shipping + support without forcing us to build each subsystem end-to-end on day 1.
- Evidence:
  - `artifacts/final-synthesis.md` (sections “1b” + “1c”)
  - `artifacts/summary.md` (3-epic backlog)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`
- Next step after decision: rewrite `artifacts/week-1-backlog.md` / `artifacts/week-2-backlog.md` / `artifacts/week-3-backlog.md` around the chosen wedge so delivery sequencing matches.

## Returns: integrate a portal now vs build later

- Decision: do we ship a first return/exchange flow by integrating an existing returns portal, or by building our own portal + policy engine first?
- Why it matters: returns UI/portal work can soak time; but the “policy + orchestration” layer is wedge-critical.
- Options:
  1) Integrate-first portal (Loop/ReturnGO-class) — faster UI; we own orchestration + policy later
  2) Build policy + orchestration first — portal minimal; focus on exception queues + actionability
  3) Hybrid — integrate portal for customer-facing, build internal exception ops immediately
- Recommendation: **Hybrid** (portal integrate-first if needed, but build internal ops + policy primitives immediately) because the internal exception queue + safe actions are the wedge, and portals can be swapped later.
- Evidence:
  - Returns/exchanges positioning: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`
  - Returns routing/fraud gates: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`
  - Store credit as retention lever: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/rise-ai.md`
- Next step after decision: add “Return state machine v1 + exception reasons” to `artifacts/implementation-epics-action-center-exceptions.md`.

## Shopify integration surfaces (Ops Action Center MVP)

- Decision: which Shopify surfaces are required for v1 (read-only + action execution)?
- Why it matters: dictates scope, auth model, and what data we can reliably show/actions we can safely take.
- Options:
  1) Read-only first: Orders + Fulfillment + Transactions/Payments + Customers + Webhooks
  2) Read/write MVP: plus Refunds + Store credit issuance path + Return label generation
  3) Full ops: plus inventory, routing rules, and carrier rate shopping
- Recommendation: **Read-only first + limited write actions** because timeline completeness is the unlock; unsafe writes without guardrails will kill trust.
- Evidence:
  - MVP workflow spec: `artifacts/final-synthesis.md`
  - Safety rails: `artifacts/thin-slices/03_audit-log-who-changed-what.md`, `artifacts/thin-slices/04_rbac-granular-permissions.md`
- Next step after decision: enumerate exact Admin API endpoints and add as a checklist to `artifacts/implementation-epics-action-center-exceptions.md`.

## Approval thresholds (refunds / reships / store credit)

- Decision: what default thresholds should require an approval in v1?
- Why it matters: too strict slows down ops; too loose creates fraud/COGS risk and destroys trust.
- Options:
  1) Conservative (recommended): approvals required for most money-moving actions until trust is earned
     - refund ≥ `$50` OR any “high risk” flag
     - store credit ≥ `$50` OR any “high risk” flag
     - reship: always approval (MVP)
  2) Balanced: approvals only above meaningful impact
     - refund ≥ `$150`
     - store credit ≥ `$150`
     - reship ≥ `$200` order value OR multiple reships
  3) Aggressive: approvals only for extreme cases
     - refund ≥ `$300`
     - store credit ≥ `$300`
     - reship only if repeated abuse flags
- Recommendation: **Conservative** for MVP because we are introducing new write paths and the system’s credibility depends on auditability and guardrails.
- Evidence:
  - Guardrails posture in implementation plan: `artifacts/implementation-epics-action-center-exceptions.md`
  - Support actions as a key workflow compression pattern: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
- Next step after decision: encode these thresholds as `policy_key` values in the approvals primitive and log approvals in `audit_log`.

### Proposed default values (MVP)

Profile A — Conservative (recommended baseline)
- `refund.amount_threshold`: `$50`
- `store_credit.amount_threshold`: `$50`
- `reship.always_requires_approval`: `true`
- `fulfillment.cancel_requires_approval`: `true` (at least until we model fulfillment state transitions reliably)
- Notes:
  - If any risk flags present (`HIGH_RISK_ORDER`, `REPEAT_RETURNS`), require approval regardless of amount.

Profile B — Balanced (opt-in after confidence)
- `refund.amount_threshold`: `$150`
- `store_credit.amount_threshold`: `$150`
- `reship.always_requires_approval`: `true` (keep high-risk until we have proven guardrails)
- `fulfillment.cancel_requires_approval`: `true` if fulfillment already in progress; otherwise false
- Notes:
  - Still block auto-execution when risk flags present; approvals are a guardrail, not a preference.

## Fulfillment Orders: keep/remove queue scan in MVP

- Decision: do we support a queue-scoped fulfillment order scan in MVP (via `fulfillmentOrders(query: ...)`), or keep fulfillment preflight strictly order-scoped?
- Why it matters: queue scans add surface area (extra scopes, more “search syntax” complexity, more chance of runaway queries) but can unlock an Exceptions Queue view earlier.
- Options:
  1) **Order-scoped only (recommended)** — use `order(id: ...) { fulfillmentOrders(...) }` exclusively
  2) Hybrid — order-scoped for actions, plus queue-scoped scan only for exceptions/ops dashboards
  3) Queue-scoped heavy — rely on `fulfillmentOrders(query: ...)` for both dashboards and action preflight
- Recommendation: **Option 1 (Order-scoped only)** for MVP unless the Exceptions Queue is explicitly in-scope for Week 1–2, because action execution is per-order and order-scoped preflight is deterministic and simpler to secure.
- Evidence:
  - Standardized preflight approach + safe query examples: `artifacts/implementation-epics-action-center-exceptions.md`
  - Search syntax limitations/behavior: `https://shopify.dev/docs/api/usage/search-syntax`
  - fulfillmentOrders query docs (explicit searchable fields): `https://shopify.dev/docs/api/admin-graphql/latest/queries/fulfillmentOrders`
- Next step after decision:
  - If Option 1: remove queue-scan query from the MVP action runner, and keep it as a “Phase 2 ops dashboard” feature.
  - If Hybrid: define an explicit max-scope query template (status + updated_at + assigned_location_id) and enforce strict limits (first=10, pagination only).

## Exceptions Queue: MVP scope yes/no

- Decision: is the Exceptions Queue (cross-order “needs attention” queue) in MVP scope for Week 1–2?
- Why it matters: it changes integration strategy from order-scoped actions only → queue-scoped scanning and retry orchestration (more scopes, more operational complexity).
- Options:
  1) **No (recommended)** — MVP ships order-scoped action center and read-only context; exceptions are handled inline per order/ticket
  2) Yes (limited) — MVP ships an exceptions list, but only for errors generated by *our* action runner (no Shopify-wide scanning)
  3) Yes (full) — MVP ships a generalized shipping/returns exceptions queue requiring broader scanning and more connectors
- Recommendation: **Option 2 (limited)** if we truly need a queue early; otherwise **Option 1**. Default to **Option 1** because the initial wedge value is “workflow compression on one order” and we can still log failed actions with clear next steps without building a generalized queue.
- Evidence:
  - Wedge + MVP workflow spec: `artifacts/final-synthesis.md`
  - Exceptions queue concept + schema: `artifacts/implementation-epics-action-center-exceptions.md`
  - Queue scan risk and search behavior: `https://shopify.dev/docs/api/usage/search-syntax`
- Next step after decision:
  - If Option 1: keep `fulfillmentOrders(query: ...)` queue scans out of MVP entirely; retain only order-scoped preflight.
  - If Option 2: implement `exceptions` + `exception_runs` for *our* action runner failures first; add Shopify-wide scanning later.

## Licensing policy (OSS)

- Decision: how do we treat copyleft / fair-code / unknown licenses?
- Why it matters: determines which repos we can integrate vs only use as inspiration.
- Options:
  1) Flag — include but clearly label; require review for copyleft/fair-code/unknown
  2) Exclude — skip copyleft/fair-code entirely; only permissive licenses allowed
  3) Hybrid — allow copyleft only as a separate service boundary (no embedding)
- Recommendation: Flag (default) until we formalize legal policy.
- Evidence:
  - `artifacts/oss-ranked.md`
  - `artifacts/sources.md`
- Next step after decision: regenerate shortlist + deepening queue using the chosen policy.

## “Low-cost” hosting baseline

- Decision: what counts as “low-cost” for self-hosted OSS during MVP?
- Why it matters: affects which tools are realistic (some need heavy infra).
- Options:
  1) Cheapest viable — single small VM + managed DB
  2) Managed-first — prefer managed providers; avoid running heavy stacks ourselves
  3) Flexible — allow heavier infra for high leverage only
- Recommendation: Cheapest viable (start strict, relax only with clear ROI).
- Evidence:
  - `artifacts/build-vs-buy.md` (from step 04)
- Next step after decision: tag “heavy to self-host” candidates and deprioritize if needed.

## Primary target persona (tie-breaker)

- Decision: which persona wins when priorities conflict?
- Why it matters: changes ranking for features/workflows.
- Options:
  1) Merchant admin users (ops/content/merchandising)
  2) Internal ops team (support/fulfillment/client success)
  3) Split — build primitives that serve both first (RBAC, audit logs, workflows)
- Recommendation: Split primitives first; then bias toward Merchant admin.
- Evidence:
  - `artifacts/features-ranked.md`
- Next step after decision: rerank top 10 features using the persona priority.
