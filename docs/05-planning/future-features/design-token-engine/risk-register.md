# Risk Register (design token engine)

1) Visual regressions during codemod
   - Mitigation: keep legacy aliases for one release; run VRT on pilot screens; staged rollout.

2) Component library divergence
   - Mitigation: share generated CSS vars/package with library; add contract test once library path exists.

3) Performance/Fouc on first paint
   - Mitigation: inline vars in HTML; single-style-block runtime apply; measure swap (<4ms target); fallback to precomputed CSS per brand.

4) Governance bottleneck / slow approvals
   - Mitigation: defined owners and SLA; PR template with required screenshots; emergency a11y hotfix path.

5) Token sprawl / unclear semantics
   - Mitigation: naming rules (role-based), schema validation, lint to forbid color words, review gate.

6) Multi-brand asset mismatch (logos/images not themed)
   - Mitigation: add non-color brand assets to the same per-tenant payload or CDN path; document in per-tenant loader spec.

7) Accessibility regressions (contrast)
   - Mitigation: contrast checks per token change; keep success/warning/danger tied to AA thresholds; automated axe on pilot pages.
