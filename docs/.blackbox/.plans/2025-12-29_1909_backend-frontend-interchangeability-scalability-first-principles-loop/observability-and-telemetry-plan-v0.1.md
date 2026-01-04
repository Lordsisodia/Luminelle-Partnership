# Observability + Telemetry Plan (v0.1, tenant-scoped)

Purpose:
- Make the system diagnosable and scalable without coupling any frontend to:
  - vendor error formats (Shopify/Stripe)
  - database internals (Supabase)
  - specific UI frameworks

This plan is “docs-only” for now; it defines what to implement later behind `/api/*`.

Evidence rule:
- “Current repo state” claims cite snapshots under `artifacts/snapshots/` or plan-generated reports.

Evidence anchors:
- `/api/*` endpoint inventory (includes metrics/export/admin families):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
- Metrics endpoints exist today (so we already have the concept of analytics endpoints):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/contract-gaps-report-v1.1.md`
- Internal API client maps HTTP failures into stable error semantics (rate limits etc.):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-http-internal-api-client.ts.head.txt`
- Backend boundary contract already specifies tiers and caching expectations:  
  - `backend-boundary-contract-v1.md`

---

## 0) Invariants

- Every `/api/*` response includes a correlation ID (`requestId`) in a header and/or `meta`.
- Every `/api/*` log line includes:
  - tenant identifier (non-PII; `tenant_slug` preferred)
  - route name
  - requestId
  - status
  - latency (ms)
- Error codes are stable and do not leak vendor strings.

DTO reference:
- `dto-and-capabilities-spec-v0.1.md`

---

## 1) Telemetry taxonomy

### 1.1 Events (audit-like, human actions)

Use the audit log for:
- admin actions
- permission denies
- config changes

Paired spec:
- `audit-log-design-v0.1.md`

### 1.2 Metrics (aggregates, rates)

Metrics should cover:
- request latency by endpoint family
- upstream rate-limit counts (`RATE_LIMITED`)
- upstream availability failures (`UNAVAILABLE`)
- cache hit ratio for public endpoints

Evidence that rate-limit classification exists in the client layer:
- `artifacts/snapshots/src-domains-platform-http-internal-api-client.ts.head.txt`

### 1.3 Traces (optional later)

If/when needed:
- add per-request spans across:
  - tenant resolution
  - auth guard
  - upstream calls (Shopify/Supabase/Stripe)

---

## 2) Endpoint-level requirements (contract addendum)

For any `/api/*` endpoint:
- Return a stable error envelope.
- Include requestId and cache semantics explicitly.

Contract reference:
- `backend-boundary-contract-v1.md`

Heuristic gap reminder:
- Some endpoints are flagged as missing auth cues or cache cues (by scan):  
  - `contract-gaps-report-v1.1.md`

---

## 3) Tenant-scoped dashboards (what operators need)

Minimum dashboards per tenant:
- API p95 latency by endpoint family
- Error rate by stable error code
- “Upstream throttling” (rate limits)
- “Cache health” for public endpoints

Note:
- “tenant” is host-resolved and must be cache-safe.
  - `tenancy-context-rules.md`

---

## 4) Acceptance checks (when code changes begin)

- Adding tenant #2 does not reduce observability (metrics are tenant-tagged).
- Every `/api/*` endpoint returns a requestId.
- Audit log exists for all admin writes.

