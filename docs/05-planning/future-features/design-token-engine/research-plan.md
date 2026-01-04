# Design Token Engine — Research Checklist (20 steps)

Goal: exhaustive research path before implementation. Mix of internet scan + in‑app reverse‑engineering + stakeholder/system validation.

**Legend:** [x] done, [~] needs input/partial, [ ] pending.

1) [~] Clarify business drivers: need product/brand sync to confirm goals (multi-brand, reseller white-label, faster theme swaps). No interview yet.
2) [~] Define success metrics: propose KPIs — <30 min to onboard a new brand, >90% hardcoded hex removed, 0 visual regressions on baseline VRT; awaiting stakeholder agreement.
3) [x] Audit current palette: tailwind `brand.peach #FBC7B2`, `brand.cocoa #55362A`, `brand.blush #FDD4DC`; hardcoded hex set includes gradients/tints (#F9D8D0, #FCEBE3, #FDE7DA, #fff2eb, #FFF6F2, #fff7f3, #FFE8DC, #FDD9C3, #F7B8A0, #F4C7B7), spinwheel (#F9A58A, #E16F5C), testimonials (#E0724A, #9938CA, #8B5CF6), status (#0F9D58), warning (#FACC15). Counts from `rg brand-` show cocoa as dominant text color, blush for borders/surfaces, peach for CTAs/badges.
4) [x] Map semantic usage: cocoa → primary text/on-color; blush → light surface/border/dividers; peach → CTA fills, chips, gradient stops; gradients are peach→blush tints; promo colors limited to testimonial/offer spots; success color in checkout; warning in demo snippet.
5) [x] Inventory typography: tailwind config defines heading font "The Seasons" serif, body "Inter"; weights rely on tailwind defaults; headings mostly `text-2xl–4xl`, body `text-base`, small caps via tracking utilities.
6) [x] Radius/spacing/shadows audit: radii use tailwind defaults (`rounded-xl/2xl/3xl`, occasional `rounded-[34px]`, pill buttons). Spacing uses tailwind scale. Custom shadow `soft: 0 20px 60px rgba(251,199,178,0.35)` defined.
7) [x] Cross-repo check: attempted `../components-library/packages/ui` scan; directory not present locally, so no additional hex/tokens found. Need rerun when package available.
8) [x] Variant/state colors: success `#0F9D58`, warning `#FACC15`, danger `#E16F5C`; promo accents `#E0724A`, `#8B5CF6`; gradients listed in step 3.
9) [x] Accessibility baseline: contrast calculations — cocoa on white 10.8:1; cocoa on blush 8.0:1; cocoa on peach 7.1:1 (AA/AAA ok). Blush/peach on white are ~1.3–1.5:1 (only safe for backgrounds, not text). Note to enforce text token mapping accordingly.
10) [x] Theme entry points: Tailwind theme (`tailwind.config.js`), global `src/index.css` (applies bg/text classes), component classNames (Tailwind utilities). No CSS-in-JS; some inline styles for gradients (SpinWheel). SVG fills currently inherit text color.
11) [x] Runtime constraints: app is Vite React (CSR) per package.json; likely Vercel deploy. No SSR detected. Plan: inline vars in HTML to avoid FOUC; runtime swap via single style block. Open: confirm hosting ability to inject vars server-side; components-library absence noted. (runtime-constraints.md)
12) [x] External references: reviewed W3C Design Tokens draft (Oct 2025 update), Tailwind CSS var-based theming patterns, Style Dictionary v4 roadmap, Tokens Studio export format, Theo historical model.
13) [x] Toolchain survey (fit for Vite/monorepo):
   - Style Dictionary: mature transforms/platforms; can emit CSS vars + TS; good for multi-brand packages.
   - Tailwind plugin + JSON: light footprint; aligns with current setup; fastest to implement.
   - Tokens Studio → JSON: good for design handoff if Figma in play.
   - Theo: stable but slower community momentum; probably unnecessary.
14) [x] File/source of truth decision: propose JSON as canonical (`src/theme/tokens.json`) with generated `tokens.resolved.json` for debugging; schema draft in `code/tokens.schema.json`; optional TS type guard (`tokens.d.ts`) to enforce shape. Version via git + semantic `meta.version`; allow brand-specific overrides as sibling JSON files loaded at runtime.
15) [~] Governance model: recommendation — owner = Design+Front-end; changes require design sign-off + FE reviewer; CI gate runs token schema validation + `npm run tokens` diff check; naming rules: semantic names reflect role (text.primary, bg.surface), never color words. Draft in governance-proposal.md; needs stakeholder approval.
16) [~] Data model schema: base/semantic/modes defined (see schema-proposal.md); supports computed values (`color-mix`) and modes (light/dark) via optional `modes.*`; pending formal sign-off.
17) [x] Distribution plan: documented in distribution-plan.md — generate CSS vars + Tailwind map for app; mirror into shared UI package or standalone tokens package; multi-brand via sibling JSON and runtime loader. Await path confirmation for components-library but plan is set.
18) [x] Migration strategy: phased codemods —
    a) Auto-replace utilities: `text-brand-cocoa`→`text-primary`; `bg-brand-peach`→`bg-cta`; `border-brand-blush`→`border-subtle`; opacity variants map to `bg-subtle` + `/` values.
    b) Replace gradient literals with `bg-hero-gradient` utility.
    c) Replace hexes: map list from step 3 to semantic tokens (`#0F9D58`→`state.success`, `#FACC15`→`state.warning`, etc.).
    d) Keep alias colors in Tailwind during transition to avoid breakage; remove after audit passes.
    e) Add visual regression pass (Playwright screenshot of key pages) before and after codemod.
19) [~] Performance/flicker mitigation: plan in performance-plan.md — inline vars, single style block update, cache JSON, measure swap cost (<4ms target). Measurement pending post-wiring.
20) [ ] Pilot + validation: propose pilots — PDP and Checkout for shop flow; Welcome/Landing hero for marketing flow. Need stakeholder pick + alt brand (Noir sample ready) for side-by-side diff (pilot-plan.md).
