# Evidence Extract — Hookdeck Issues & Notifications

- slug: `hookdeck-issues-notifications`
- category: delivery failure management (issues, alerts, bulk retry)
- license: proprietary docs/service (Hookdeck)

## Cycle 18 — Evidence-backed primitives (ops automation + payload access risk)

### Notable features (3)

1) Issues auto-open on problems; team notified via notification preferences  
Evidence: https://hookdeck.com/docs/issues.md

2) Notifications contain the payload of the failed webhook (explicit statement; implies sensitive data exposure risk)  
Evidence: https://hookdeck.com/docs/issues.md

3) Issue UI supports “View Events” and “Bulk Retry” for associated failures (ops recovery primitive)  
Evidence: https://hookdeck.com/docs/issues.md

### Copyable workflows (2)

1) Failure → issue → notify: delivery failures trigger an issue and notify the team, so remediation starts early  
Evidence: https://hookdeck.com/docs/issues.md

2) Bulk recovery: open issue → view associated events → bulk retry delivery attempts  
Evidence: https://hookdeck.com/docs/issues.md

### 3 steal ideas (easy / medium / hard)

- Easy: build an “Issues” view for integrations/webhooks (group by error signature + status code + destination).
- Medium: include bulk retry from issue groups + “mute”/ignore equivalent errors (reduce alert fatigue).  
  Evidence: ignore note: https://hookdeck.com/docs/issues.md
- Hard: notification channels (email + webhook) with granular topics and routing to destinations.

### Thin-slice implementation (1–3 days)

- Day 1: create an “issue” object generated on repeated delivery failures (group by endpoint + error code family).
- Day 2: add notifications (email) with safe payload handling (redacted snippet by default).
- Day 3: add bulk retry + issue lifecycle (open/ignored/resolved) with audit.

