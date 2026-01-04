# Evidence Extract — Power Automate (Approvals)

- slug: `power-automate-approvals`
- category: workflow approvals (adjacent: approval request/response primitives)
- license: SaaS / proprietary

## Cycle 7 — Evidence-backed primitives (approval workflow + connector action surface)

### Notable features (3)

1) Approval workflows are a first-class pattern: create approval request → approve/reject → proceed in workflow  
Evidence: https://learn.microsoft.com/en-us/power-automate/modern-approvals

2) Standard approvals connector provides a standardized “approvals” action surface for flows  
Evidence: https://learn.microsoft.com/en-us/connectors/approvals/

3) Integrates approval steps across many systems (SharePoint/Dynamics/Salesforce/etc.), implying “approval” is reusable platform glue  
Evidence: https://learn.microsoft.com/en-us/power-automate/modern-approvals

### Copyable workflows (2)

1) Build approval automation: trigger event → create approval → wait for response → branch on approve/deny  
Evidence: https://learn.microsoft.com/en-us/power-automate/modern-approvals

2) Standardize approvals: use a shared approvals connector/action to keep approval UX consistent across flows  
Evidence: https://learn.microsoft.com/en-us/connectors/approvals/

### 3 steal ideas (easy / medium / hard)

- Easy: make approvals a shared primitive used everywhere (refunds, content publish, integration disconnect).
- Medium: add “wait for response” semantics with explicit timeouts and reminder notifications.
- Hard: deep connector ecosystem; start by wiring approvals only for our internal admin actions.

### Thin-slice implementation (1–3 days)

- Day 1: add approvals API + inbox UI + decision capture (approve/deny with reason).
- Day 2: add “timeout + reminder” semantics (due_at; reminder schedule).
- Day 3: add “policy templates” to attach approvals to actions (two-person rule for payouts; manager approval for refunds > threshold).

