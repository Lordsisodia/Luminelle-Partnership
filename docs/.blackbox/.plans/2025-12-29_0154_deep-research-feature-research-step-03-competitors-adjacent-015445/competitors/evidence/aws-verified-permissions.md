# Evidence Extract — Amazon Verified Permissions

- slug: `aws-verified-permissions`
- category: policy store + decision testing (managed authorization with Cedar)
- license: SaaS / proprietary (service); uses Cedar as policy language

## Cycle 12 — Evidence-backed primitives (policy store + test bench)

### Notable features (3)

1) Verified Permissions is a fine-grained permissions management and authorization service for custom applications  
Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/what-is-avp.html

2) “Getting started” flow includes creating a policy store, creating policies, and testing decisions via a simulated authorization request (“test bench” in console)  
Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/getting-started-first-policy-store.html

3) Cedar is the policy language used by Verified Permissions (explicitly referenced by Cedar docs)  
Evidence: “Services that use Cedar” (Verified Permissions): https://docs.cedarpolicy.com/

### Copyable workflows (2)

1) Policy store lifecycle: create store → define policies → test decisions (simulate auth requests) → iterate before production rollout  
Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/getting-started-first-policy-store.html

2) Policy testing workflow: run “what-if” authorization requests to confirm expected allow/deny outcomes before deployment  
Evidence: https://docs.aws.amazon.com/verifiedpermissions/latest/userguide/getting-started-first-policy-store.html

### 3 steal ideas (easy / medium / hard)

- Easy: add a “test bench” UI in our admin for approvals/policies (run simulated requests and show decision).
- Medium: add “template-linked policies” concept (parameterized policies) so merchants can configure without writing code.
- Hard: multi-environment policy stores (dev/stage/prod) with promotion workflow + audit trail.

### Thin-slice implementation (1–3 days)

- Day 1: build a `POST /internal/policy/simulate` endpoint that returns allow/deny + reason for 1–2 actions.
- Day 2: add a basic admin UI “Policy Simulator” with sample inputs (actor/resource/context).
- Day 3: wire simulator results into audit events and export mapping.

