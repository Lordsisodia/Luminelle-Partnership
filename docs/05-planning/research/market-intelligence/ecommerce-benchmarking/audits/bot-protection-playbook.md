---
status: draft
last_reviewed: 2025-12-28
owner: growth
---

# Bot Protection Playbook (Benchmarking)

Some benchmark stores block automated snapshotting (and sometimes aggressive browsing patterns).
This playbook keeps the audit process moving without turning into an ops project.

## What to do (safe + practical)

1) **Accept manual-only for these sites**
- If a site blocks automated HTML snapshots, it can still be audited manually.
- Record “blocked/bot-protected” in notes so we don’t mistake missing evidence for missing patterns.

2) **Avoid repeatedly refreshing / rapid clicking**
- Do a slower, human-like path through the funnel.
- Avoid running multiple tabs of the same site at once.

3) **Switch devices**
- Some sites block desktop aggressively but allow mobile (or vice versa).
- Capture whichever device works, but note it in the audit doc + scorecard.

4) **Capture evidence quickly**
- If you get blocked mid-audit, you still want:
  - PDP fit module screenshot
  - PDP fabric/care screenshot
  - cart edit screenshot
  - checkout express buttons screenshot (if reachable)

## What not to do

- Don’t try to bypass security controls or use questionable tooling.
- Don’t automate logins or scrape at scale from these sites.

## How to record it

- In the per-store audit doc, add a note under “Device / context”:
  - “Bot protection observed on <device>. Manual audit only.”
- In `scorecard.csv`, keep scores blank until you can complete the flow; partial scoring is allowed but should be explicit in notes.

