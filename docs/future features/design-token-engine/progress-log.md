# Progress Log (continues as tasks run)

2025-12-11
- Collected palette + usage audit (brand classes, hex literals) and saved snapshots in `audit/`.
- Drafted schema, governance, distribution, performance, pilot plans.
- Added ready-to-integrate code bundle (tokens, generator, plugin, runtime applier, schema, validator) under `code/`.
- Documented runtime constraints (Vite CSR) and updated research checklist statuses.
- Authored codemod plan (no code changes applied yet).

2025-12-14
- Phase 0 (no visual change): `tailwind.config.js` now derives `brand.*` colors and `shadow-soft` from token-backed CSS vars (with safe fallbacks + opacity-safe RGB vars).
- Phase 1 (enablement): added semantic alias utilities (`text-primary`, `bg-cta`, etc.) in Tailwind for new code (no adoption required).
- Phase 2 (Wave 1 started, exact-match only): began migrating live UI from `brand-*` utilities to semantic token utilities using `semantic.legacy.brand.*` for 1:1 blush/peach/cocoa mapping.
  - Updated: `src/ui/providers/DrawerProvider.tsx`, `src/domains/products/ui/sections/feature-callouts/FeatureCallouts.tsx`, plus initial shared/layout pieces (header/layout/hero proof strip/etc.).
  - Continued: `src/ui/components/PublicHeader.tsx`, `src/ui/components/GlobalFooter.tsx`, `src/ui/pages/NotFoundPage.tsx`, `src/domains/brand/ui/pages/BrandStoryPage.tsx`, and the app suspense fallback in `src/App.tsx`.
  - Landing sections: `src/domains/landing/ui/sections/hero/HeroSection.tsx`, `src/domains/landing/ui/sections/whatsapp/WhatsAppCtaSection.tsx`, `src/domains/landing/ui/sections/brand-story/BrandStorySection.tsx`, `src/domains/landing/ui/sections/journey/JourneySection.tsx`.
  - Landing continued: removed remaining `brand-*` utilities across landing components + shop sections (`src/domains/landing/ui/sections/success/SuccessStoriesSection.tsx`, `src/domains/landing/ui/sections/value/ValueStackSection.tsx`, `src/domains/landing/ui/sections/leaderboard/LeaderboardSection.tsx`, `src/domains/landing/ui/sections/proof/ProofBand.tsx`, `src/domains/landing/ui/sections/onboarding/OnboardingFormSection.tsx`, `src/domains/landing/ui/sections/faq/FAQSection.tsx`, `src/domains/landing/ui/sections/shop/hero-shop/HeroShop.tsx`, `src/domains/landing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection.tsx`, `src/domains/landing/ui/sections/shop/email-capture-band/EmailCaptureBand.tsx`, `src/domains/landing/ui/sections/shop/trust-bar/TrustBar.tsx`, `src/domains/landing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`, `src/domains/landing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`, and landing UI components like `src/domains/landing/ui/components/SectionHeading.tsx`).
  - Kept raw hex gradients intact for now (no tokenization yet) to avoid unintended visual diffs.

Next queued
- Stakeholder approvals for schema/governance/pilot.
- Components library scan once available.
- Execute pilot branch (PDP + Checkout + Noir) with VRT/perf measurements once greenlit.

Added today
- Pilot branch checklist, VRT plan, per-tenant loader spec, stakeholder questions, and codemod mapping stored alongside code bundle (still not integrated).
- Added types (`code/tokens.d.ts`), schema (`code/tokens.schema.json`), validator (`code/validate-tokens.ts`), sample VRT script (`code/vrt-script.sample.ts`), and integration-notes.md outlining wiring steps/deps.
- Added audit helper script (`code/audit.sh`), risk register, decision log, engineer onboarding quickstart, and color-mapping.csv reference.
- Added comms plan, acceptance criteria, and a (non-wired) Vercel middleware snippet reference.
- Added rollout plan and timeline estimate (post-approval, post-pilot guidance).
- Added open-source framework survey (open-source-frameworks.md) with recommendations to leverage Style Dictionary + Tokens Studio/Brücke.
- Added color taxonomy, per-page token map, Fresh Mint demo tokens, self-host font example, and status snapshot.
