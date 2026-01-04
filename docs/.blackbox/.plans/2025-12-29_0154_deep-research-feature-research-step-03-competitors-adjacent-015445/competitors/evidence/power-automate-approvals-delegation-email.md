# Evidence Extract — Power Automate (Approvals: email + reassign/delegation)

- slug: `power-automate-approvals-delegation-email`
- category: approvals center + email approvals + delegation/reassign
- license: SaaS / proprietary

## Cycle 9 — Evidence-backed primitives (approve from email, reassign approvals, email status updates)

### Notable features (3)

1) Approvers can respond from email inbox, approvals center, or mobile app  
Evidence: https://learn.microsoft.com/en-us/power-automate/modern-approvals

2) Approval emails update to show completion in modern email clients (reduces stale-email confusion)  
Evidence: https://learn.microsoft.com/en-us/power-automate/modern-approvals

3) Approver can reassign an approval to another person (delegation / OOO handoff)  
Evidence: https://learn.microsoft.com/en-us/power-automate/approvals-howto

### Copyable workflows (2)

1) Email approval portal flow: requester triggers approval → approver receives formatted email → approves/denies from email → requester gets outcome  
Evidence: https://learn.microsoft.com/en-us/power-automate/modern-approvals and https://learn.microsoft.com/en-us/power-automate/approvals-howto

2) Delegation flow: approver receives request but is not the right person → reassign to another approver → new approver decides  
Evidence: https://learn.microsoft.com/en-us/power-automate/approvals-howto

### 3 steal ideas (easy / medium / hard)

- Easy: “approve from email” for merchant admins (deep link + approve/deny) with a minimal portal page and full audit logging.
- Medium: add “reassign approval” as a user action (handoff) with immutable audit events (who reassigned to whom, when).
- Hard: email-state synchronization (email shows completed once decision recorded) to avoid duplicate decisions and reduce support load.

### Thin-slice implementation (1–3 days)

- Day 1: approval notifications include an email deep link to the approval request (read-only + approve/deny).
- Day 2: add `reassign` action for approvers + notify new approver + preserve original request metadata.
- Day 3: add “email completion status” pattern: on decision, update email/thread content where possible (or send a completion update with correlation ID).

