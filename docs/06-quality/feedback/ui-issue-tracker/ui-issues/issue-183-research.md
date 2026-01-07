# Issue 183 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`

## 1) Repro summary

- Environment:
- Route(s): `/account` (and footer)
- Browser/device:
- Expected:
- Actual:

## 2) Evidence collected

- Screenshots:
- Console snippets (optional):
  - `document.documentElement.scrollWidth`
  - `document.documentElement.clientWidth`
- Culprit element(s):
  - Selector(s):
  - Computed widths:

## 3) Code structure map

### Account page

- Files:
- Layout wrapper(s):

### Footer

- Files:
- Layout wrapper(s):

## 4) Root cause hypothesis

- Hypothesis A:
- Hypothesis B:
- Hypothesis C:

## 5) Three solution options

### Option 1 — Fix the specific overflowing element (preferred)

- What:
- Pros:
- Cons:
- Implementation notes:

### Option 2 — Standardize layout padding across pages

- What:
- Pros:
- Cons:
- Implementation notes:

### Option 3 — Add defensive global overflow-x containment

- What:
- Pros:
- Cons:
- Implementation notes:

## 6) Recommendation

- Suggested option:
- Why:

