---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# Admin API Response + Error Contract (consistent “vibe coding”)

Purpose: avoid every thin slice inventing its own error shapes and status codes.

## ✅ Success response shape (recommended)

### Read/list

- `GET /admin/<resource>`

```json
{
  "data": [],
  "meta": {
    "next_cursor": null
  }
}
```

### Write/action

- `POST /admin/<resource>/:id/actions/<action>`

```json
{
  "data": {
    "id": "..."
  }
}
```

## ❌ Error response shape (required)

All errors should return:

```json
{
  "error": {
    "code": "STRING_CODE",
    "message": "Human-readable message",
    "request_id": "uuid-or-trace-id",
    "details": {}
  }
}
```

### Standard error codes

- `UNAUTHENTICATED` → 401
- `FORBIDDEN` → 403
- `NOT_FOUND` → 404
- `VALIDATION_FAILED` → 422
- `CONFLICT` → 409
- `RATE_LIMITED` → 429
- `INTERNAL` → 500

### Idempotency conflicts

If an `Idempotency-Key` is reused with different payload:
- return 409 `CONFLICT`
- error code: `IDEMPOTENCY_KEY_REUSED`

## 🧾 Audit log requirement

For every successful write/action:
- write an `audit_log` row
- include:
  - action code (e.g. `returns.approve`)
  - entity type + id
  - payload_json containing inputs (and before/after when feasible)

## 🛡️ Approval requirement (money-moving)

Any “money-moving” actions must:
- require approval (`approvals` table)
- return `FORBIDDEN` or `CONFLICT` if approval is missing depending on state

