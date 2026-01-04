---
status: draft
updated_at_utc: 2025-12-30T10:16:30Z
---

# OSS Policy Penalties (dynamic SAFE-first ranking)

- Purpose: turn “license posture” into a numeric ranking penalty so SAFE repos float to the top by default even when GitHub metadata is strong for flagged repos.
- Inputs:
  - Posture source-of-truth: `artifacts/oss-license-posture.md`
  - Base ranking: `artifacts/oss-ranked.md`
  - Output ranking (policy-adjusted): `artifacts/oss-ranked-policy-adjusted.md`

## Penalty rules (conservative defaults)

- `SAFE` (permissive, no enterprise carve-outs): `0`
- `FLAG_MIXED_MIT` (MIT SPDX but enterprise/proprietary carve-outs in repo): `15`
- `FLAG_LGPL` (LGPL-2.1/3.0): `15`
- `FLAG_GPL` (GPL-3.0): `25`
- `FLAG_AGPL` (AGPL-3.0): `30`
- `FLAG_RESTRICTED` (BUSL / SUL / ELv2 / PROPRIETARY / “AND … PROPRIETARY”): `35`
- `UNKNOWN`: `50` (should be 0 if the gap loop is clean)

## Notes

- These numbers are intentionally “policy heavy”: they encode our default posture (“prefer MIT/Apache/BSD”) rather than a legal opinion.
- Treat this as a product/ops decision tool:
  - If we explicitly decide to accept a flagged repo under a service boundary or a commercial agreement, we can either (a) add an exception note in the synthesis, or (b) reduce the penalty for that specific repo in a future iteration.

