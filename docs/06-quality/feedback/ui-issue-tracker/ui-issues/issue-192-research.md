# Issue 192 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`

## 0) Triage update (2026-01-09T01:21:31+07:00)

- Decision: `PLANNED`
- Notes:
  - Copy/CTA update is straightforward; treat the blog target as `/blog/about-lumelle` unless client specifies a different post.
  - If the target slug is not `/blog/about-lumelle`, promote to `NEEDS_DECISION` with the correct target.

## 1) Repro summary

- Environment:
- Route:
- Screenshot ref: `codex-clipboard-LHhLp4.png`
- Expected:
  - Customer-focused copy (not creator-focused)
  - CTA: “Learn more” → blog post
- Actual:

## 2) Code structure map

### Block / section location

- Page(s):
- Component(s):
- Data source:

### Copy source

- Current text:
- Where it lives:

### CTA source

- Current label:
- Current href:
- Where it lives:

## 3) Constraints / decisions to confirm

- Exact “Learn more” blog target slug:
  - Candidate: `/blog/about-lumelle`
  - Confirm if this is correct or if it should be another post
- Exact copy replacements:
  - “creators” → “customers”
  - Any other text changes requested?

## 4) Three solution options

### Option 1 — Simple copy + CTA update where the section is defined

- What:
- Pros:
- Cons:
- Implementation notes:

### Option 2 — Move to a typed content object (single source of truth)

- What:
- Pros:
- Cons:
- Implementation notes:

### Option 3 — Admin/CMS-configurable copy + CTA

- What:
- Pros:
- Cons:
- Implementation notes:

## 5) Recommendation

- Suggested option:
- Why:
