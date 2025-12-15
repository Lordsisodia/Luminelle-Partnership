import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import { ReviewsAutoCarousel, FaqSectionShop, FeaturedTikTok } from '@products/ui/sections'
import { HeroShop } from '@/domains/landing/ui/sections/shop/hero-shop/HeroShop'
import { ProductSpotlightSection } from '@/domains/landing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection'
import { TrustBar } from '@/domains/landing/ui/sections/shop/trust-bar/TrustBar'
import { FinalCtaSection } from '@/domains/landing/ui/sections/shop/final-cta-section/FinalCtaSection'
import { BundleCards } from '@/domains/landing/ui/sections/shop/bundle-cards/BundleCards'
import { EmailCaptureBand } from '@/domains/landing/ui/sections/shop/email-capture-band/EmailCaptureBand'
import { BenefitsSection } from '@/domains/landing/ui/sections/shop/benefits-section/BenefitsSection'
import { cdnUrl } from '@/utils/cdn'
import { Seo } from '@/components/Seo'

const navItems: NavItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
]

export const ShopLandingPage = () => {
  const image = cdnUrl(homeConfig.hero.image)
  const url = 'https://lumelle.com/'
  const title = 'Luxury shower cap | Frizz-proof silk press & curls | Lumelle'
  const description = 'Satin-lined, waterproof cap that blocks steam to keep silk presses, curls, and braids glossy. Free shipping £20+, 30-day returns.'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lumelle',
    url,
    logo: cdnUrl('/l-icon.svg'),
  }

  return (
    <>
      <Seo
        title={title}
        description={description}
        image={image}
        url={url}
        type="website"
        jsonLd={jsonLd}
      />
      <MarketingLayout navItems={navItems} subtitle={null}>
        <section id="hero" className="bg-white">
          <HeroShop config={homeConfig.hero} />
        </section>
        <TrustBar />
        <ProductSpotlightSection teasers={homeConfig.pdpTeasers ?? [homeConfig.pdpTeaser]} />
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
