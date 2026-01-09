import { Seo } from '@/components/Seo'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { FREE_SHIPPING_THRESHOLD_LABEL } from '@/config/constants'
import { cdnUrl } from '@/lib/utils/cdn'
import { homeConfig } from '@content/home.config'
import { ReviewsAutoCarousel, FaqSectionShop, FeaturedTikTok } from '@client/shop/products/ui/sections'
import { HeroShop } from '@client/marketing/ui/sections/shop/hero-shop/HeroShop'
import { ProductSpotlightSection } from '@client/marketing/ui/sections/shop/product-spotlight-section/ProductSpotlightSection'
import { TrustBar } from '@client/marketing/ui/sections/shop/trust-bar/TrustBar'
import { FinalCtaSection } from '@client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection'
import { BundleCards } from '@client/marketing/ui/sections/shop/bundle-cards/BundleCards'
import { EmailCaptureBand } from '@client/marketing/ui/sections/shop/email-capture-band/EmailCaptureBand'
import { BenefitsSection } from '@client/marketing/ui/sections/shop/benefits-section/BenefitsSection'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'
import { productConfigs } from '@client/shop/products/data/product-config'
import { DEFAULT_CAP_VIDEOS } from '@client/shop/products/data/product-config'

const ShopLandingPage = () => {
  const SHOW_WHY_YOULL_LOVE_IT = false
  const image = cdnUrl(homeConfig.hero.image)
  const url = toPublicUrl('/')
  const title = 'Lumelle | Satin-lined waterproof shower cap'
  const description =
    `Satin-lined, waterproof cap that blocks steam to keep silk presses, curls, and braids glossy. Free shipping ${FREE_SHIPPING_THRESHOLD_LABEL}, 30-day returns.`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lumelle',
    url,
    logo: toPublicUrl(cdnUrl('/l-icon.svg')),
  }

  return (
    <>
      <Seo title={title} description={description} image={image} url={url} type="website" jsonLd={jsonLd} />
      <MarketingLayout navItems={[]} subtitle={null}>
        <section id="hero" className="bg-white">
          {(() => {
            const showerCapConfig = productConfigs['shower-cap']
            const rating = showerCapConfig.ratingValueOverride ?? homeConfig.socialProof.rating
            const countLabel = showerCapConfig.ratingCountLabelOverride ?? '100+'

            return (
              <HeroShop
                config={homeConfig.hero}
                socialProof={{
                  tagline: homeConfig.socialProof.tagline,
                  rating,
                  ratingLabel: `${rating.toFixed(1)} (${countLabel})`,
                  trustCountLabel: homeConfig.socialProof.trustCountLabel,
                  trustAvatars: homeConfig.socialProof.trustAvatars,
                }}
              />
            )
          })()}
        </section>
        <TrustBar />
        <ProductSpotlightSection teasers={homeConfig.pdpTeasers ?? [homeConfig.pdpTeaser]} />
        {SHOW_WHY_YOULL_LOVE_IT ? (
          <section id="benefits">
            <BenefitsSection slides={homeConfig.slides} />
          </section>
        ) : null}
        <section id="reviews">
          <ReviewsAutoCarousel reviews={homeConfig.reviews} summary={homeConfig.socialProof} />
        </section>
        <FeaturedTikTok tiktoks={DEFAULT_CAP_VIDEOS} />
        <BundleCards />
        <FinalCtaSection />
        <section id="faq">
          <FaqSectionShop
            items={homeConfig.faq}
            hideCta
            heading={{ eyebrow: 'FAQ', title: 'Frequently Asked Questions', description: undefined, alignment: 'center' }}
          />
        </section>
        <EmailCaptureBand />
      </MarketingLayout>
    </>
  )
}

export default ShopLandingPage
