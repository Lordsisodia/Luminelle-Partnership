import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import {
  HeroShop,
  ProductSpotlightSection,
  TrustBar,
  ReviewsAutoCarousel,
  FinalCtaSection,
  FaqSectionShop,
  BundleCards,
  EmailCaptureBand,
  BenefitsSection,
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
      <MarketingLayout navItems={navItems} subtitle={null}>
        <section id="hero" className="bg-white">
          <HeroShop config={homeConfig.hero} />
        </section>
        <TrustBar />
        <ProductSpotlightSection teaser={homeConfig.pdpTeaser} />
        <section id="benefits">
          <BenefitsSection slides={homeConfig.slides} />
        </section>
        <ReviewsAutoCarousel reviews={homeConfig.reviews} />
        <FeaturedTikTok />
        {/* UGC section removed per latest client request */}
        <BundleCards />
        <FinalCtaSection />
        <FaqSectionShop
          items={homeConfig.faq}
          hideCta
          heading={{ eyebrow: 'FAQ', title: 'Frequently Asked Questions', description: undefined, alignment: 'center' }}
        />
        <EmailCaptureBand />
      </MarketingLayout>
    </>
  )
}

export default ShopLandingPage
