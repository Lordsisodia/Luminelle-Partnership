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
  discountPercentOverride?: number
  badge?: string
  productTitle: string
  productDesc: string
  ratingValue: number
  ratingCountLabel: string
  canonicalUrl: string
  onAdd: () => void
  onBuy: () => void
  isAdding: boolean
  justAdded: boolean
  quantity: number
  setQuantity: (qty: number) => void
  how: { title: string; body: string }[]
  care: { icon?: string; title: string; body: string }[]
  careLabel?: string
  featureCopy: any
  reasons: any
  essentials: any
  faqs: any
  featuredTikTokHeading: any
  reviews?: ReviewType[]
  hideDetailsAccordion?: boolean
}

export function renderSections(props: SectionProps): ReactNode {
  const reviewsData = props.reviews?.length ? props.reviews : homeConfig.reviews

  return (
    <>
      <div className="mx-auto max-w-6xl px-2 md:px-6 md:grid md:grid-cols-2 md:items-center md:gap-8 md:pt-6">
        <HeroMedia gallery={props.gallery} activeImage={props.activeImage} onSelect={props.setActiveImage} />

        <PriceBlock
          productTitle={props.productTitle}
          productDesc={props.productDesc}
          price={props.price}
          compareAtPrice={props.compareAtPrice}
          discountPercentOverride={props.discountPercentOverride}
          badge={props.badge}
          ratingValue={props.ratingValue}
          ratingLabel={props.ratingCountLabel}
          canonicalUrl={props.canonicalUrl}
          onAdd={props.onAdd}
          onBuy={props.onBuy}
          isAdding={props.isAdding}
          justAdded={props.justAdded}
          quantity={props.quantity}
          setQuantity={props.setQuantity}
        />
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-4 md:grid-cols-2 md:px-6">
        <HowToSection steps={props.how} />
        <CareSection items={props.care} label={props.careLabel} />
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

      {!props.hideDetailsAccordion ? (
        <DetailsAccordion
          heading={{
            eyebrow: 'Everything you need',
            title: 'Materials, care & fit',
            description: 'Quick references before you add it to your cart.',
            alignment: 'center',
          }}
          items={props.essentials as any}
        />
      ) : null}

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
          title: "Questions?\nWe've got answers.",
          description: undefined,
          alignment: 'center',
        }}
        hideCta
      />

      {/* Bottom CTA just above footer */}
      <section className="border-t border-brand-blush/50 bg-brand-blush/10 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center md:px-6">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-cocoa/60">Last chance today</p>
            <h3 className="font-heading text-2xl font-bold text-brand-cocoa md:text-[28px]">Keep style frizz-free this week.</h3>
            <p className="text-sm font-semibold text-brand-cocoa/65">Free 30-day returns · Ships in 48h · 4.8★ from 100+</p>
          </div>
          <div className="flex w-full max-w-lg flex-col items-center gap-3">
            <button
              className={`inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-peach to-brand-cocoa px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cocoa/30 ${props.justAdded ? 'animate-pulse' : ''}`}
              onClick={props.onAdd}
              disabled={props.isAdding}
            >
              {props.isAdding ? 'Adding…' : 'Add to Basket'}
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-full border border-brand-cocoa px-6 py-3 text-base font-semibold text-brand-cocoa transition hover:-translate-y-0.5 hover:bg-brand-cocoa/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cocoa/30 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={props.onBuy}
              disabled={props.isAdding}
            >
              {props.isAdding ? 'Processing…' : 'Buy Now'}
            </button>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-cocoa/70">
              <span className="rounded-full bg-white px-3 py-1 shadow-soft">Waterproof satin</span>
              <span className="rounded-full bg-white px-3 py-1 shadow-soft">No-frizz seal</span>
              <span className="rounded-full bg-white px-3 py-1 shadow-soft">UK free returns</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
