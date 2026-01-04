# Evidence Extract — GitHub (PR reviews as “approval inbox” primitives)

- slug: `github-pull-request-reviews`
- category: review + approval workflow UX (request review, submit review outcomes, resolve threads)
- license: SaaS / proprietary

## Cycle 8 — Evidence-backed primitives (review request → review decision → resolution tracking)

### Notable features (3)

1) Review outcomes are standardized and explicit: **Comment**, **Approve**, **Request changes**  
Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews

2) Review requests can be assigned to specific people or teams; re-request review is supported after changes  
Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review

3) Resolution tracking: mark conversation threads as resolved; reviewers can suggest changes for authors to apply  
Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews and https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request

### Copyable workflows (2)

1) Approval request workflow: request review → reviewer receives notification → reviewer submits decision (approve / request changes / comment) → author addresses changes → re-request review  
Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review and https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews

2) “Rationale + resolution” workflow: reviewer leaves comments/suggestions → author implements → threads marked resolved to close the loop  
Evidence: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews and https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request

### 3 steal ideas (easy / medium / hard)

- Easy: standardize approval decision outcomes everywhere (`Approve`, `Request changes`, `Comment`) with consistent colors/status text.
- Medium: make approvals “threaded” with resolution tracking (“requested changes” items become a checklist that can be resolved).
- Hard: add “suggested fix” blocks (structured proposed change) for approvals like “set refund to $X and add reason Y”.

### Thin-slice implementation (1–3 days)

- Day 1: Approvals decision model with outcomes: `approved | changes_requested | commented`, plus `decision_reason`.
- Day 2: “Request approval from user/team” UI (assign reviewers/approvers) + notifications + re-request after changes.
- Day 3: Comment threads per approval request + `resolved_at` to close feedback loops; export in audit log.

