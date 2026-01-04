# Evidence Extract — AWS CloudTrail Event Record Schema

- slug: `aws-cloudtrail-event-record-schema`
- category: audit log event schema (who/what/when/where for admin + ops actions)
- license: proprietary docs (AWS). Use as pattern reference only (not code).

## Cycle 20 — Evidence-backed primitives (audit event record fields + query UX)

### Notable features (3)

1) Event records include a canonical “who/what/when” bundle: `userIdentity`, `eventTime`, `eventSource`, `eventName`  
Evidence: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html

2) Event records include request origin metadata like `sourceIPAddress` and `userAgent` (useful for detecting anomalous admin activity)  
Evidence: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html

3) Event records include a unique identifier (`eventID`) and request correlation fields (`requestID`)  
Evidence: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html

### Copyable workflows (2)

1) Admin audit investigations: filter by identity → filter by action name → pivot by timeframe and source IP → export to external tooling  
Evidence: CloudTrail event record fields (identity/time/action/origin are present): https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html

2) Operational correlation: join “action audit record” (requestID/eventID) to application logs and delivery attempts for incident timelines  
Evidence: CloudTrail `requestID` and `eventID` fields: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-record-contents.html

### 3 steal ideas (easy / medium / hard)

- Easy: standard audit event fields: `actor`, `action`, `target`, `time`, `source_ip`, `user_agent`, `request_id`.
- Medium: audit log UX that supports filtering by identity/action/time and exporting results.
- Hard: consistent correlation IDs across all subsystems (audit, automations, deliveries, support tools).

### Thin-slice implementation (1–3 days)

- Day 1: define a canonical audit event schema for the admin (identity + action + target + time + origin).
- Day 2: implement audit emission for 5 high-sensitivity actions (webhook secret rotate, endpoint disable/enable, payload-view, bulk replay).
- Day 3: add basic audit log UI filters (time range, actor, action, target) and CSV export.

