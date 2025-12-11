import { useEffect } from 'react'
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
} from '@products/ui/sections'
import { FeaturedTikTok } from '@products/ui/sections/featured-tik-tok/FeaturedTikTok'
import { setMetaTags, injectJsonLd } from '@/lib/seo'
import { cdnUrl } from '@/utils/cdn'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
]

export const ShopLandingPage = () => {
  useEffect(() => {
    const image = cdnUrl(homeConfig.hero.image)
    const url = 'https://lumelle.com/'
    setMetaTags({
      title: 'Luxury shower cap | Frizz-proof silk press & curls | Lumelle',
      description: 'Satin-lined, waterproof cap that blocks steam to keep silk presses, curls, and braids glossy. Free shipping £20+, 30-day returns.',
      image,
      url,
      type: 'website',
    })

    injectJsonLd('org-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Lumelle',
      url,
      logo: cdnUrl('/l-icon.svg'),
    })
  }, [])

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
