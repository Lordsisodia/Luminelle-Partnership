# OSS Project Entry

## Identity

- Name: reg-suit
- Repo: https://github.com/reg-viz/reg-suit
- Full name: reg-viz/reg-suit
- License: MIT
- Primary language: JavaScript/TypeScript

## What it gives us (plain English)

- A workflow/tooling set for visual regression testing:
  - take screenshots
  - compare with baseline
  - report diffs (often via CI integrations)
- Useful if we want an OSS-first alternative/complement to Lost Pixel for storing and surfacing diffs
- A strong source of “how to structure baseline approval workflows” and diff reporting

## What feature(s) it maps to

- Visual diff artifacts for upgrade reviews
- Baseline update approvals (audit trail)
- Regression gating before promotion to production

## Integration notes (vibe-coding lens)

- Stack fit (React/TS, API, DB, auth): Good. Most useful as CI tooling and as a pattern source.
- Setup friction (self-host? SaaS? Docker?): Medium. Visual regression always needs deterministic fixtures and artifact storage.
- Data model alignment: High if our upgrade PR workflow includes screenshot artifacts.

## Adoption path

- 1 day POC:
  - Run reg-suit on a minimal set of pages (home/PDP/cart) against a preview deployment.
  - Confirm it generates:
    - diff images
    - a report we can link from PRs/internal admin
  - Decide whether reg-suit is used directly, or only as inspiration (we already have Lost Pixel).
- 1 week integration:
  - Integrate into template upgrade PR workflow:
    - run visual regression on preview
    - upload diff artifacts
    - attach summary to PR + audit log
  - Implement baseline update policy:
    - only on explicit approval
    - require justification
  - Add masking/redaction rules (dynamic UI regions).
- 1 month hardening:
  - Tune flakiness controls (stable fonts, fixed viewports, consistent data fixtures).
  - Build “visual diff dashboard” by template version.
  - Standardize page lists and critical UI contracts for each template.

## Risks

- Maintenance risk: Medium. Visual regression tooling requires tuning; also evaluate ecosystem health.
- Security risk: Medium. Screenshots can include PII; enforce scrubbed fixtures and strict access controls.
- Scope mismatch: Medium if we standardize on Lost Pixel already; still valuable for patterns.
- License risk: Low (MIT).

## Sources

- https://github.com/reg-viz/reg-suit
- https://raw.githubusercontent.com/reg-viz/reg-suit/master/LICENSE.txt

## Score (0–100) + reasoning

- Score: 56
- Why: Viable OSS visual regression option and good pattern source, but overlaps with Lost Pixel; adopt only if it fits our preferred workflow or ecosystem.

