# OSS Project Entry

## Identity

- Name: Presidio
- Repo: https://github.com/microsoft/presidio
- Full name: microsoft/presidio
- License: MIT
- Primary language: Python

## What it gives us (plain English)

- PII detection + anonymization tooling (NER-based + rule-based approaches)
- A practical way to build redaction pipelines for:
  - logs (strip emails/phones/names/addresses)
  - text artifacts in reports (test output, console logs, request bodies)
- Useful for enforcing “no PII in upgrade evidence artifacts” at the text layer

## What feature(s) it maps to

- Redaction/masking policy enforcement for artifact bundles
- Pre-upload scrubbing for logs/attachments in Allure/ReportPortal
- Safer “share evidence to support/ops” workflows

## Integration notes (vibe-coding lens)

- Stack fit: Indirect (Python service/library). Strong as a standalone scrubbing service invoked by CI workers.
- Setup friction: Medium. Needs tuning (which entities to detect), and determinism (avoid false positives/negatives).
- Data model alignment: High if we standardize evidence bundles and want scrubbing as a required pipeline step.

## Adoption path

- 1 day POC:
  - Run Presidio on sample log blobs that resemble our artifact outputs:
    - HTTP request logs, form fields, addresses, emails
  - Configure a minimal entity list:
    - EMAIL, PHONE_NUMBER, CREDIT_CARD, IP_ADDRESS, PERSON, LOCATION
  - Validate output is usable (redacted tokens) and track false positives.
- 1 week integration:
  - Wrap Presidio behind a small “ScrubService” API:
    - input: text blob(s)
    - output: redacted text + findings summary (entity types + counts)
  - Integrate into artifact pipeline:
    - scrub Playwright console/network logs before upload
    - scrub Allure attachments that contain text
  - Add policy:
    - if HIGH severity PII is found, fail the upgrade run and require investigation
  - Emit audit events: scrub results summary (counts only, not raw values).
- 1 month hardening:
  - Add allowlist/denylist patterns (merchant domains, known safe values).
  - Add deterministic fixtures and “no PII in test data” policy to reduce reliance on scrubbing.
  - Add redaction coverage metrics and periodic review (false positives/negatives).

## Risks

- Maintenance risk: Medium. Models/rules require tuning and ongoing iteration.
- Security risk: Medium. Scrubber itself must not log raw PII; treat it as sensitive.
- Scope mismatch: Medium if we fully control fixtures and guarantee “no PII exists” in artifacts; still valuable as a safety net.
- License risk: Low (MIT).

## Sources

- https://github.com/microsoft/presidio
- https://raw.githubusercontent.com/microsoft/presidio/main/LICENSE

## Score (0–100) + reasoning

- Score: 69
- Why: Strong, permissive PII redaction engine for text artifacts; most value comes from combining it with strict test data policies and artifact access controls.

