import type { ReactNode } from 'react'
import { homeConfig } from '@content/home.config'
import type { Review as ReviewType } from '@content/home.config'
import { FeatureCallouts, DetailsAccordion, HeroProofStrip, ReviewsAutoCarousel, FaqSectionShop, FeaturedTikTok } from '@products/ui/sections'
import { HeroMedia } from './HeroMedia'
import { PriceBlock } from './PriceBlock'
import { HowToSection } from './HowToSection'
import { CareSection } from './CareSection'

export type SectionProps = {
  gallery: string[]
  activeImage: number
  setActiveImage: (idx: number) => void
  price: number
  compareAtPrice?: number
  badge?: string
  productTitle: string
  productDesc: string
  ratingValue: number
  ratingCountLabel: string
  canonicalUrl: string
  onAdd: () => void
  onBuy: () => void
  isAdding: boolean
  quantity: number
  setQuantity: (qty: number) => void
  how: string[]
  care: { icon?: string; title: string; body: string }[]
  featureCopy: any
  reasons: any
  essentials: any
  faqs: any
  featuredTikTokHeading: any
  reviews?: ReviewType[]
}

export function renderSections(props: SectionProps): ReactNode {
  const reviewsData = props.reviews?.length ? props.reviews : homeConfig.reviews

  return (
    <>
      <HeroMedia gallery={props.gallery} activeImage={props.activeImage} onSelect={props.setActiveImage} />

      <PriceBlock
        productTitle={props.productTitle}
        productDesc={props.productDesc}
        price={props.price}
        compareAtPrice={props.compareAtPrice}
        badge={props.badge}
        ratingValue={props.ratingValue}
        ratingLabel={props.ratingCountLabel}
        canonicalUrl={props.canonicalUrl}
        onAdd={props.onAdd}
        onBuy={props.onBuy}
        isAdding={props.isAdding}
        quantity={props.quantity}
        setQuantity={props.setQuantity}
      />

      <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-4 md:grid-cols-2 md:px-6">
        <HowToSection steps={props.how} />
        <CareSection items={props.care} />
      </div>

      <HeroProofStrip
        rating={props.ratingValue}
        count={Number(props.ratingCountLabel.replace(/[^0-9]/g, '')) || 100}
        tagline="Creator-loved protection"
      />

      <FeatureCallouts
        sectionId="details"
        className="bg-brand-blush/10"
        variant="story"
        mediaSrc={props.featureCopy?.mediaSrc}
        mediaAlt={props.featureCopy?.mediaAlt}
        mediaLabel={props.featureCopy?.mediaLabel}
        mediaNote={props.featureCopy?.mediaNote}
        heading={props.featureCopy?.heading}
        items={props.reasons as any}
      />

      <DetailsAccordion
        heading={{
          eyebrow: 'Everything you need',
          title: 'Materials, care & fit',
          description: 'Quick references before you add it to your cart.',
          alignment: 'center',
        }}
        items={props.essentials as any}
      />

      <ReviewsAutoCarousel
        reviews={reviewsData as ReviewType[]}
        heading={{
          eyebrow: 'Creator testimonials',
          title: 'Real feedback, real hair saved',
          description: 'Scroll through stories from TikTok Shop + verified shoppers.',
          alignment: 'center',
        }}
      />

      <FeaturedTikTok heading={props.featuredTikTokHeading} />

      <FaqSectionShop
        sectionId="faq"
        items={props.faqs as any}
        heading={{
          eyebrow: 'Need help?',
          title: 'Questions? We’ve got answers.',
          description: undefined,
          alignment: 'center',
        }}
        hideCta
      />
    </>
  )
}
