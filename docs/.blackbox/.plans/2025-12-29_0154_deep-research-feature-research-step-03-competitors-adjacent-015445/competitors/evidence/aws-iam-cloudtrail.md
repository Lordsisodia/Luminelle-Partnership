# Evidence Extract — AWS IAM + CloudTrail (and S3 MFA Delete)

- slug: `aws-iam-cloudtrail`
- category: MFA enforcement + audit trail + MFA-gated destructive actions
- license: SaaS / proprietary (cloud platform)

## Cycle 6 — Evidence-backed primitives (MFA + audit trail + MFA delete)

### Notable features (3)

1) MFA as a baseline requirement for human access (step-up / strong auth pattern)  
Evidence: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html

2) Event history (audit trail) to investigate resource changes (“who changed what”)  
Evidence: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html

3) MFA Delete pattern: require MFA device for destructive deletion actions  
Evidence: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html

### Copyable workflows (2)

1) Sensitive action governance: require MFA → allow action → record event → later investigate via event history  
Evidence (MFA): https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html  
Evidence (audit trail): https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html

2) Protect high-risk deletion: enable MFA delete on critical resources → require second factor to delete  
Evidence: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html

### 3 steal ideas (easy / medium / hard)

- Easy: require 2FA/step-up before destructive actions (disconnect integrations, rotate keys, delete data exports).
- Medium: “event history” page in admin: searchable log of all sensitive actions (actor, IP, outcome, object).
- Hard: full policy system like IAM; start with a narrow list of sensitive actions + hard-coded gates.

### Thin-slice implementation (1–3 days)

- Day 1: identify sensitive actions and require step-up auth (re-auth prompt) before executing.
- Day 2: implement audit event stream for all sensitive actions + filters/search.
- Day 3: add “MFA-delete-like” guardrails (cannot delete without step-up; optionally require an approver).

