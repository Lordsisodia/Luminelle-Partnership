---
status: draft
last_reviewed: 2025-12-28
owner: agent-zero
---

# Evidence Index (Ranked, Browse-Friendly)

Purpose: make the research corpus easy to browse without hunting through folders.

This is a **crosswalk**:
- feature idea → competitors proving demand → OSS accelerators → evidence links

## 🔥 Top 10 crosswalk (generated)

| Rank | Feature (short) | Target user | Best competitors (2–3) | Best OSS (1–2) | Fastest path | Evidence links |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | <Feature name> | merchant admin / internal ops / both | Evidence links (2–5):, ROI:, Feasibility: | Competitors proving demand (links):, Evidence links (2–5): | build / integrate / buy | `artifacts/features-ranked.md` |

## 🧠 Notes / heuristics

- Prefer at least 2 competitor proofs per top feature.
- Prefer at least 1 OSS accelerator (or clearly state “build”).
- If OSS is copyleft/unknown/fair-code, mark it clearly.

## 📍 Key artifacts

- Final synthesis: `artifacts/final-synthesis.md`
- Features ranked: `artifacts/features-ranked.md`
- OSS ranked: `artifacts/oss-ranked.md`
- Decision log: `artifacts/open-questions.md`
- Sources: `artifacts/sources.md`

## 🔧 Regenerate

```bash
python3 .blackbox/scripts/research/generate_evidence_index.py --synth-plan .blackbox/.plans/2025-12-28_2223_feature-research-synthesis-agent-zero
```
