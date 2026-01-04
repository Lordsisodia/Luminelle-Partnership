# OSS Project Entry

## Identity

- Name: karrio
- Repo: https://github.com/karrioapi/karrio
- Full name: karrioapi/karrio
- License: LGPL-3.0 (ee/ directory under separate license; see license proof)
- Stars (approx): 663
- Forks (approx): 149
- Primary language: Python
- Last updated: 2025-12-23T07:22:28Z
- Topics: canada-post, carrier-apis, carriers, dhl, fedex, headless-shipping, multiple-carriers, purolator, python, shipping-api, shipping-software, ups, usps

## What it gives us (plain English)

- A “shipping APIs” abstraction layer: carriers, rates, labels, tracking (self-hostable)
- A connector-like architecture for integrating with many shipping carriers via a unified API
- A useful reference for:
  - integration normalization (different providers → common model)
  - credential management patterns
  - retry/error taxonomy for external APIs

## What feature(s) it maps to

- Integration connector framework (carrier APIs as connectors)
- Admin ops workflows (retries, reprint labels, tracking refresh)
- Merchant ops tooling (shipping label generation) — only if license posture allows

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Likely run as a separate service if used. We’d still want our own domain model and wrappers in TS.
- Setup friction (self-host? SaaS? Docker?): Medium. Shipping integrations are operationally heavy (credentials, carrier quirks, sandboxing).
- Data model alignment: Potentially good for “normalize provider complexity”, but we must verify it matches our business requirements and that we can legally deploy it.

## Adoption path

- 1 day POC:
  - Verify license posture carefully (LGPL-3.0 + separate EE directory) and confirm intended deployment model is acceptable.
  - Run locally and connect 1 carrier sandbox (or mock) to generate a rate quote and/or label.
  - Validate the core API surfaces we’d need: rates, labels, tracking, cancellation/refunds.
- 1 week integration:
  - Only proceed if legal approves LGPL implications for our distribution/hosting model.
  - Map our shipping domain model to the tool’s abstractions and define which calls happen where.
  - Add observability and audit trails (who generated labels, when, and with what parameters).
  - Add retry rules and DLQ patterns for carrier API flakiness.
- 1 month hardening:
  - Add credential governance/rotation and support tooling (retries, reprints, incident runbooks).
  - Ensure strict PII handling (addresses, phone numbers) and encryption at rest.

## Risks

- Maintenance risk: Medium–High. Shipping integrations are “forever maintenance” because providers change.
- Security risk: High. PII + credentials; must enforce encryption, access controls, and redaction.
- Scope mismatch: Medium. We may only need a subset of shipping features; risk of adopting too much surface area.
- License risk: High. LGPL-3.0 can be acceptable in some models, but it’s not “permissive”; treat as “flag unless approved”.

## Sources

- https://github.com/karrioapi/karrio

## Score (0–100) + reasoning

- Score: 50
- Why: Useful connector patterns and potentially valuable capability, but licensing + operational/security burden makes it a careful/conditional adoption.

---

## Repo description (from GitHub)

Programmable Shipping APIs (self-hosted)
