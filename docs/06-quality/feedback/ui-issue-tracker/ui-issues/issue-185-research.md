# Issue 185 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`

## 0) Triage update (2026-01-09T01:21:31+07:00)

- Decision: `PLANNED`
- Notes:
  - Global mobile layout bug; likely one (or a small set of) overflow culprits.
  - Fix here should cover Issue 183’s account/footer-specific report as well.

## 1) Repro summary

- Environment:
- Routes tested:
- Device:
- Expected:
- Actual:

## 2) Evidence collected

- `document.documentElement.clientWidth`:
- `document.documentElement.scrollWidth`:
- Culprit element(s):
  - Selector(s):
  - Why it overflows:

## 3) Root cause hypothesis

- Hypothesis A:
- Hypothesis B:
- Hypothesis C:

## 4) Three solution options

### Option 1 — Fix the specific overflowing element(s)

- What:
- Pros:
- Cons:

### Option 2 — Layout-system correction (consistent container padding + max-width)

- What:
- Pros:
- Cons:

### Option 3 — Defensive global `overflow-x` containment (mitigation)

- What:
- Pros:
- Cons:

## 5) Recommendation

- Suggested option:
- Why:
