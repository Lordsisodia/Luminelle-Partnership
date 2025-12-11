# Architecture Migration Instructions (Handover)

**Objective:** Complete the migration of the `shop` domain to the new Domain-Based Architecture.
**Current State:** The `landing` domain is complete. The `shop` domain is partially set up but contains a flat list of files in `sections/` that need organization.

---

## 1. Shop Domain Organization
**Source Directory:** `src/domains/shop/sections/`
**Target Structure:** Create subdirectories for each logical section and move the files.

### Mapping Table

| File(s) to Move | Target Directory (`src/domains/shop/sections/...`) |
| :--- | :--- |
| `AssuranceBadges.tsx`, `TrustBar.tsx` | `assurance/` |
| `Benefits3.tsx`, `BenefitsSection.tsx` | `benefits/` |
| `BundleCards.tsx` | `bundle/` |
| `CreatorWinsSection.tsx` | `creator/` |
| `DetailsAccordion.tsx` | `details/` |
| `EmailCaptureBand.tsx` | `email/` |
| `FaqMini.tsx`, `FaqSectionShop.tsx` | `faq/` |
| `FeatureCallouts.tsx`, `FeatureCollage.tsx` | `features/` |
| `FeaturedTikTok.tsx` | `tiktok/` |
| `FinalCtaSection.tsx` | `cta/` |
| `GuaranteeCard.tsx`, `GuaranteeSection.tsx` | `guarantee/` |
| `HeroShop.tsx`, `HeroProofStrip.tsx` | `hero/` |
| `Highlights*.tsx` | `highlights/` |
| `HowItWorks.tsx`, `StepsCarousel.tsx` | `how-it-works/` |
| `MosaicCollage.tsx` | `mosaic/` |
| `OfferCarousel.tsx` | `offer/` |
| `PdpTeaser*.tsx` | `pdp-teaser/` |
| `ProblemSolution*.tsx` | `problem-solution/` |
| `ProductSpotlightSection.tsx` | `product-spotlight/` |
| `RatingSnippet.tsx`, `Reviews*.tsx`, `SocialProof*.tsx` | `reviews/` |
| `SpinWheel.tsx` | `spin-wheel/` |
| `UGC*.tsx`, `Ugc*.tsx` | `ugc/` |

## 2. Dependency Installation
The following packages are required for the new State Management strategy but are not yet installed:
-   `@tanstack/react-query`
-   `zustand`

**Action:** Run `npm install @tanstack/react-query zustand`

## 3. Import Path Fixes
After moving the files, import paths will be broken.
**Action:**
1.  Scan all moved files in `src/domains/shop/sections/`.
2.  Update relative imports (e.g., `../components/Button` might need to become `../../components/Button`).
3.  Update `src/domains/shop/ShopPage.tsx` (or similar parent pages) to import from the new locations.

## 4. Verification
1.  Ensure `npm run build` passes without TypeScript errors.
2.  Check that the Shop page renders correctly in the browser.
