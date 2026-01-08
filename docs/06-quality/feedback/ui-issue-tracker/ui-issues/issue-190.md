# Issue 190: WhatsApp + email support links need to be verified/simplified

Source: Client feedback screenshot `codex-clipboard-sDc8dj.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `UNTRIAGED`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `4`
- Effort (1–5): `1`
- Confidence (1–3): `2`
- Priority: `(3×4×2)−1 = 23`
- Owner: `AI`
- Created: `2026-01-07`

---

## Problem statement

Client wants support links to be simple and correct:

- WhatsApp: a phone-number based WhatsApp deep link (pre-filled message optional)
- Email: a `mailto:` link to the support email

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + implementation notes (NO CODE CHANGES)

**Goal:** find every place support links appear and ensure a single source of truth.

#### Tasks

1. List all UI locations where WhatsApp/email appears (footer, account pages, help blocks, etc.)
2. Verify the existing URLs are valid on mobile
3. Propose 3 options:
   - simple constants only
   - env-driven phone/email + URL builder
   - per-surface prefilled messages (order help, checkout help)

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-190-research.md`

