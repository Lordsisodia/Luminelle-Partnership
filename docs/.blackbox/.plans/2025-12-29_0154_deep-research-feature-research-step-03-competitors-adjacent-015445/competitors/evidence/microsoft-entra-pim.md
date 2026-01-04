# Evidence Extract — Microsoft Entra Privileged Identity Management (PIM)

- slug: `microsoft-entra-pim`
- category: JIT privilege elevation + approvals (adjacent governance primitives)
- license: SaaS / proprietary

## Cycle 6 — Evidence-backed primitives (time-based + approval-based role activation)

### Notable features (3)

1) Time-based and approval-based role activation (JIT privileges + approval gates)  
Evidence: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure

2) Explicit lifecycle for privileged access: activate assignment → approve/deny → extend/renew (governance workflow)  
Evidence: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure

3) Dedicated “Activity” / governance surfaces (auditability and operational visibility)  
Evidence: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure

### Copyable workflows (2)

1) JIT admin access: user requests elevation → (optional) approval required → role activates for a fixed duration → auto-expires  
Evidence: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure

2) Risk reduction loop: keep baseline privileges low → require time-bound activation for sensitive changes → review activity/audit trail  
Evidence: https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure

### 3 steal ideas (easy / medium / hard)

- Easy: “temporary elevation” mode for sensitive admin areas (finance, integrations) with a visible countdown.
- Medium: require approval for elevation (“break glass” requests) with an approvals inbox and explicit reason field.
- Hard: full identity governance suite; start by shipping only “time-bounded elevation + approvals + audit”.

### Thin-slice implementation (1–3 days)

- Day 1: implement “elevation requests” with reasons + duration + auto-expiry.
- Day 2: add approver role + approve/deny flow + audit events.
- Day 3: add “activity” page (who elevated, when, why, what actions performed).

