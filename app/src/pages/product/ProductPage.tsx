import { useState } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import { useCart } from '@/state/CartContext'
import { useDrawer } from '@/state/DrawerContext'
import { StarRating } from '@/components/StarRating'
import { FeatureCallouts, DetailsAccordion, HeroProofStrip, ReviewsAutoCarousel, FaqSectionShop } from '@/sections/shop'
import { FeaturedTikTok } from '@/sections/shop/FeaturedTikTok'
const galleryImages = [
  '/uploads/luminele/main (1).jpg',
  '/uploads/luminele/2ND PHOTO.jpg',
  '/uploads/luminele/3RD PHOTO.jpg',
  '/uploads/luminele/4TH PHOTO.jpg',
  '/uploads/luminele/5TH PHOTO.jpg',
  '/uploads/luminele/6TH PHOTO.jpg',
  '/uploads/luminele/7TH PHOTO.jpg',
  '/uploads/luminele/8TH PHOTO.jpg',
]

const essentials = [
  { title: 'Reusable waterproof', body: 'Dual-layer satin, waterproof TPU core, comfort-fit elastic band.' },
  { title: 'Satin lined', body: 'Smooth inner lining protects styles while blocking steam.' },
  { title: 'Large wide shower cap', body: 'Roomy silhouette fits curls, coils, and protective styles.' },
  { title: 'Adjustable', body: 'Comfort band stretches to 24"+ with a secure, no-crease fit.' },
]

const reasonsWhy = [
  { title: 'Our best seller', desc: 'Creator-tested fit that keeps silk presses, curls, and braids camera-ready.' },
  { title: 'Happier hair days', desc: 'Steam-blocking core stops frizz so styles last through busy weeks.' },
  { title: 'Less breakage', desc: 'Satin-soft band prevents tugging while the roomy shape avoids tension.' },
  { title: 'Stays fresh', desc: 'Dual-layer build wipes clean and air-dries fast—made to reuse 100+ times.' },
]

const qaItems = [
  { q: 'Is it truly waterproof?', a: 'Yes. The TPU core creates a moisture barrier so steam and splashes stay out.' },
  { q: 'Will it fit my braids or curls?', a: 'The comfort band stretches to 24"+ circumference to cover protective styles.' },
  { q: 'How do I clean it?', a: 'Rinse after each shower, air dry, and hand wash with mild soap weekly for best results.' },
  { q: 'What’s the return policy?', a: '30-day Luxe Guarantee with easy returns or exchanges.' },
]

const howSteps = [
  'Slip on before your shower; tuck flyaways inside.',
  'After showering, rinse the lining and shake off water.',
  'Hang to air-dry; ready for tomorrow.',
]

const careItems = [
  'Dual-layer satin exterior with waterproof TPU core.',
  'Hand wash weekly with mild soap; do not tumble dry.',
  'Comfort band designed to avoid creasing the hairline.',
]

const navItems: NavItem[] = [
  { id: 'media', label: 'Product' },
  { id: 'details', label: 'Highlights' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
]

export const ProductPage = () => {
  const { add } = useCart()
  const { openCart } = useDrawer()
  const [activeImage, setActiveImage] = useState(0)
  const [infoTab, setInfoTab] = useState<'how' | 'care'>('how')
  const addToCart = () => add({ id: 'lumelle-cap', title: 'Lumelle Shower Cap', price: 24 }, 1)
  const addToCartAndOpen = () => { addToCart(); openCart() }
  return (
    <MarketingLayout navItems={navItems} primaryLabel="Add to Cart" onPrimaryAction={addToCartAndOpen} subtitle="Product">
      {/* Hero media + info */}
      <section id="media" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div className="min-w-0">
            <div className="w-full overflow-hidden rounded-[2.5rem] border border-brand-blush/60 bg-white md:flex md:items-center md:justify-center md:bg-brand-blush/20">
              <img
                src={galleryImages[activeImage]}
                alt="Lumelle product detail"
                className="w-full h-auto max-h-[80vh] object-contain md:max-h-none"
                draggable="false"
              />
            </div>
            <div
              className="mt-4 w-full overflow-x-auto overscroll-x-contain pb-1 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none' }}
            >
              <div className="inline-flex max-w-full gap-2 px-1 snap-x snap-mandatory touch-pan-x">
                {galleryImages.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-2xl border snap-start ${
                      idx === activeImage ? 'border-brand-cocoa' : 'border-brand-blush/60'
                    }`}
                    aria-label={`Show image ${idx + 1}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-5 text-brand-cocoa min-w-0">
            <div>
              <h1 className="mt-2 font-heading text-4xl font-bold leading-tight">Lumelle Shower Cap</h1>
              <p className="mt-2 text-brand-cocoa/70">Keep hair dry. Keep styles flawless.</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-semibold text-brand-cocoa">
                <div className="flex items-center gap-2">
                  <StarRating value={homeConfig.socialProof.rating} size={16} />
                  <span>{homeConfig.socialProof.rating.toFixed(1)} (100+)</span>
                </div>
                <a href="#reviews" className="text-xs uppercase tracking-[0.28em] text-brand-cocoa/60 hover:text-brand-cocoa">
                  Read reviews
                </a>
              </div>
              <div className="mt-2 text-3xl font-semibold">£24.00</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-brand-cocoa shadow-soft">
                Buy 2, save 10%
              </div>
              <button
                className="mt-4 inline-flex items-center justify-center rounded-full border-2 border-brand-cocoa px-7 py-3 text-base font-extrabold uppercase tracking-[0.08em] text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                onClick={addToCartAndOpen}
              >
                Add to Cart
              </button>
            </div>

            {/* Quick info pills */}
            <div>
              <div className="inline-grid grid-cols-2 rounded-full border border-brand-blush/60 p-0.5 text-sm font-semibold">
                <button
                  aria-pressed={infoTab === 'how'}
                  onClick={() => setInfoTab('how')}
                  className={`rounded-full px-4 py-1.5 transition ${infoTab === 'how' ? 'bg-brand-peach/80 text-brand-cocoa' : 'text-brand-cocoa/70 hover:bg-brand-blush/30'}`}
                >
                  How to use
                </button>
                <button
                  aria-pressed={infoTab === 'care'}
                  onClick={() => setInfoTab('care')}
                  className={`rounded-full px-4 py-1.5 transition ${infoTab === 'care' ? 'bg-brand-peach/80 text-brand-cocoa' : 'text-brand-cocoa/70 hover:bg-brand-blush/30'}`}
                >
                  Care & materials
                </button>
              </div>
              <div className="mt-3 rounded-2xl border border-brand-peach/50 bg-brand-blush/15 p-5 text-sm text-brand-cocoa/85 shadow-soft">
                {infoTab === 'how' ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {howSteps.map((step, idx) => (
                      <div
                        key={step}
                        className="rounded-2xl border border-brand-peach/60 bg-white/80 p-3 shadow-[0_8px_18px_rgba(0,0,0,0.04)]"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-peach/90 text-base font-bold text-brand-cocoa shadow-soft">
                            {idx + 1}
                          </span>
                          <p className="text-[15px] leading-snug text-brand-cocoa/85">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {careItems.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-brand-blush/60 bg-white/85 p-3 shadow-[0_8px_18px_rgba(0,0,0,0.04)]"
                      >
                        <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-peach/80 text-base font-semibold text-brand-cocoa shadow-soft">
                          ✓
                        </span>
                        <p className="text-[15px] leading-snug text-brand-cocoa/85">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#details"
                className="flex-1 rounded-full border border-brand-blush/60 bg-white px-6 py-3 text-center text-base font-semibold text-brand-cocoa hover:bg-brand-blush/30"
              >
                See details
              </a>
            </div>
          </div>
        </div>
      </section>

      <HeroProofStrip
        rating={homeConfig.socialProof.rating}
        count={homeConfig.socialProof.count}
        tagline={homeConfig.socialProof.tagline}
      />

      <FeatureCallouts
        sectionId="details"
        className="bg-brand-blush/10"
        variant="story"
        mediaSrc={galleryImages[1] ?? galleryImages[0]}
        mediaAlt="Lumelle shower cap protecting curls and braids"
        mediaLabel="Less breakage"
        mediaNote="Satin band hugs without pulling"
        heading={{
          eyebrow: 'Why it works',
          title: 'Reasons millions switch to our shower cap',
          description: 'Built with creators so every shower keeps styles smooth, comfy, and camera-ready.',
          alignment: 'left',
        }}
        items={reasonsWhy}
      />

      <DetailsAccordion
        heading={{
          eyebrow: 'Everything you need',
          title: 'Materials, care & fit',
          description: 'Quick references before you add it to your cart.',
          alignment: 'center',
        }}
        items={essentials}
      />

      <ReviewsAutoCarousel
        reviews={homeConfig.reviews}
        heading={{
          eyebrow: 'Creator testimonials',
          title: 'Real feedback, real hair saved',
          description: 'Scroll through stories from TikTok Shop + verified shoppers.',
          alignment: 'center',
        }}
      />

      <FeaturedTikTok
        heading={{
          eyebrow: 'Creator in action',
          title: 'Watch the cap stay flawless',
          description: 'See how creators keep their silk press perfect after every shower.',
          alignment: 'center',
        }}
      />

      <FaqSectionShop
        sectionId="faq"
        items={qaItems}
        heading={{
          eyebrow: 'Need help?',
          title: 'Questions? We’ve got answers.',
          description: undefined,
          alignment: 'center',
        }}
        hideCta
      />
    </MarketingLayout>
  )
}

export default ProductPage
