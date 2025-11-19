import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import {
  HeroShop,
  ProductSpotlightSection,
  TrustBar,
  ProblemSolutionSection,
  UgcSection,
  ReviewsAutoCarousel,
  FaqSectionShop,
  BundleCards,
  EmailCaptureBand,
  HighlightsSection,
  BenefitsSection,
  CreatorWinsSection,
  GuaranteeSection,
  FinalCtaSection,
  HowItWorks,
} from '@/sections/shop'
import { FeaturedTikTok } from '@/sections/shop/FeaturedTikTok'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
]

export const ShopLandingPage = () => {
  return (
    <>
      <MarketingLayout navItems={navItems} subtitle="Shop">
        <section id="hero" className="bg-white">
          <HeroShop config={homeConfig.hero} />
        </section>
        <TrustBar />
        <ProductSpotlightSection teaser={homeConfig.pdpTeaser} />
        <section id="benefits">
          <BenefitsSection slides={homeConfig.slides} />
        </section>
        <ProblemSolutionSection data={homeConfig.problemSolution} />
        <HowItWorks />
        <CreatorWinsSection stats={homeConfig.stats} />
        <FeaturedTikTok />
        <section id="ugc">
          <UgcSection items={homeConfig.ugc} />
        </section>
        <HighlightsSection />
        <BundleCards />
        <ReviewsAutoCarousel reviews={homeConfig.reviews} />
        <GuaranteeSection comparison={homeConfig.comparison} />
        <FaqSectionShop items={homeConfig.faq} />
        <FinalCtaSection data={homeConfig.finalCta} />
        <EmailCaptureBand />
      </MarketingLayout>
    </>
  )
}

export default ShopLandingPage
