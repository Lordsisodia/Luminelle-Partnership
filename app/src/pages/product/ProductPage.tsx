import { useEffect, useMemo, useState } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import { cdnUrl } from '@/utils/cdn'
import { useCart } from '@/state/CartContext'
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
  'video://https://www.tiktok.com/embed/v2/7567328998158585110', // video slot
]

const buildSources = (src: string) => {
  if (src.startsWith('video://')) return null
  const cdnSrc = cdnUrl(src)
  const base = cdnSrc.replace(/\.[^.]+$/, '')
  const widths = [640, 960, 1280]
  return {
    avif: widths.map((w) => `${base}-${w}.avif ${w}w`).join(', '),
    webp: widths.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
    sizes: '(min-width: 1024px) 640px, 92vw',
    fallback: cdnSrc,
  }
}

const essentials = [
  { title: 'Reusable waterproof', body: 'Dual-layer satin with a waterproof TPU core and comfort-fit elastic band that seals out steam.' },
  { title: 'Satin lined', body: 'Smooth satin interior protects styles, reduces friction, and blocks humidity.' },
  { title: 'Large wide shower cap', body: 'Roomy silhouette fits curls, coils, protective styles, and even bum-length hair (per customer reviews).' },
  { title: 'Adjustable', body: 'Comfort band stretches to 24\"+ with a secure, no-crease fit for daily use.' },
]

const reasonsWhy = [
  { title: 'Our best seller', desc: 'Creator-tested fit that keeps silk presses, curls, and braids camera-ready.' },
  { title: 'Happier hair days', desc: 'Steam-blocking core stops frizz so styles last through busy weeks.' },
  { title: 'Less breakage', desc: 'Satin-soft band prevents tugging while the roomy shape avoids tension.' },
  { title: 'Stays fresh', desc: 'Dual-layer build wipes clean and air-dries fast—made to reuse 100+ times.' },
]

const qaItems = [
  { q: 'Will it fit my hair?', a: 'The cap fits most hair lengths — even customers with bum-length hair have reviewed that it fits perfectly.' },
  { q: 'Is it truly waterproof?', a: 'Yes. The TPU core creates a moisture barrier so steam and splashes stay out.' },
  { q: 'How do I clean it?', a: 'Rinse after each shower, air dry, and hand wash with mild soap weekly for best results.' },
  { q: 'What’s the return policy?', a: 'Free returns within 30 days—no-hassle exchanges or refunds.' },
]

const howSteps = [
  'Slip on before your shower; tuck flyaways inside.',
  'After showering, rinse the lining and shake off water.',
  'Hang to air-dry; ready for tomorrow.',
]

const careItems = [
  {
    icon: 'Shield',
    title: 'Steam-shield core',
    body: 'Dual-layer satin with a waterproof TPU core keeps styles frizz-free in steamy showers.',
  },
  {
    icon: 'RefreshCcw',
    title: 'Reusable + easy care',
    body: 'Hand-wash friendly and built to last 100+ showers—no flimsy disposables.',
  },
  {
    icon: 'Feather',
    title: 'Comfort band, no creases',
    body: 'Soft stretch band hugs without denting edges and stays put on curls, braids, or silk presses.',
  },
]

const navItems: NavItem[] = [
  { id: 'media', label: 'Product' },
  { id: 'details', label: 'Highlights' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
]

export const ProductPage = () => {
  const { add } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const addToCart = () => add({ id: 'lumelle-cap', title: 'Lumelle Shower Cap', price: 15 }, 1)
  const addToCartAndOpen = () => { addToCart() }

  // Delivery ETA + cutoff countdown (updates every minute)
  const [cutoffText, setCutoffText] = useState('Order now for fastest dispatch')
  const deliveryDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 2)
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
  }, [])

  useEffect(() => {
    const cutoff = new Date(Date.now() + 3 * 60 * 60 * 1000) // 3 hours from now
    const update = () => {
      const diff = cutoff.getTime() - Date.now()
      if (diff <= 0) {
        setCutoffText('Order by midnight for next-day dispatch')
        return
      }
      const hours = Math.floor(diff / 3_600_000)
      const mins = Math.floor((diff % 3_600_000) / 60_000)
      setCutoffText(`Order within ${hours} hr${hours !== 1 ? 's' : ''} ${mins} min${mins !== 1 ? 's' : ''} for earliest dispatch`)
    }
    update()
    const id = window.setInterval(update, 60_000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <MarketingLayout navItems={navItems} primaryLabel="Add to Cart" onPrimaryAction={addToCartAndOpen} subtitle="Product">
      {/* Hero media + info */}
      <section id="media" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa shadow-soft ring-1 ring-brand-peach/50">
              1k+ bought in past month
            </div>
            <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-brand-blush/60 bg-white md:flex md:items-center md:justify-center md:bg-brand-blush/20">
              {galleryImages[activeImage].startsWith('video://') ? (
                <iframe
                  src={galleryImages[activeImage].replace('video://', '')}
                  title="Lumelle product video"
                  className="h-[60vh] w-full max-h-[80vh] rounded-[2.5rem] md:max-h-none"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                (() => {
                  const sources = buildSources(galleryImages[activeImage])
                  const img = (
                    <img
                      src={sources?.fallback ?? galleryImages[activeImage]}
                      alt="Lumelle product detail"
                      className="w-full h-auto max-h-[80vh] object-contain md:max-h-none"
                      draggable="false"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  )
                  if (!sources) return img
                  return (
                    <picture>
                      <source type="image/avif" srcSet={sources.avif} sizes={sources.sizes} />
                      <source type="image/webp" srcSet={sources.webp} sizes={sources.sizes} />
                      {img}
                    </picture>
                  )
                })()
              )}
            </div>
            <div
              className="mt-4 w-full overflow-x-auto overscroll-x-contain pb-1 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none' }}
            >
              <div className="inline-flex max-w-full gap-2 px-1 snap-x snap-mandatory touch-pan-x">
                {galleryImages.map((src, idx) => {
                  const isVideo = src.startsWith('video://')
                  const sources = buildSources(src)
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`h-14 w-14 shrink-0 overflow-hidden rounded-2xl border snap-start ${
                        idx === activeImage ? 'border-brand-cocoa' : 'border-brand-blush/60'
                      }`}
                      aria-label={`Show media ${idx + 1}`}
                    >
                      {isVideo ? (
                        <div className="relative h-full w-full bg-brand-blush/40">
                          <img src="/uploads/luminele/product-feature-03.jpg" alt="Video" className="h-full w-full object-cover" />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-cocoa shadow-soft">
                              ▶
                            </span>
                          </span>
                        </div>
                      ) : sources ? (
                        <picture>
                          <source type="image/avif" srcSet={sources.avif} sizes="80px" />
                          <source type="image/webp" srcSet={sources.webp} sizes="80px" />
                          <img src={sources.fallback} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                        </picture>
                      ) : (
                        <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                      )}
                    </button>
                  )
                })}
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
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm font-semibold text-rose-600">-25%</span>
                <span className="text-3xl font-semibold text-brand-cocoa">£14.99</span>
                <button
                  type="button"
                  aria-label="Share product"
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-blush/60 bg-white text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: 'Lumelle Shower Cap', url: window.location.href }).catch(() => undefined)
                    } else {
                      navigator.clipboard?.writeText(window.location.href).catch(() => undefined)
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v14"/></svg>
                </button>
              </div>
              <div className="text-xs font-semibold text-brand-cocoa/60">
                RRP: <span className="line-through">£19.99</span>
              </div>
              <div className="mt-3 space-y-1 text-sm text-brand-cocoa">
                <div className="font-semibold">FREE delivery {deliveryDate}</div>
                <div className="text-brand-cocoa/70">{cutoffText}</div>
              </div>
              <div className="mt-3 grid gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-brand-cocoa shadow-soft">
                  Buy 2, save 10%
                </div>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-2xl border border-brand-peach/60 bg-white px-4 py-3 text-sm font-semibold text-brand-cocoa shadow-soft focus:border-brand-cocoa focus:outline-none"
                    aria-label="Select quantity"
                    defaultValue="1"
                  >
                    <option value="1">Quantity: 1</option>
                    <option value="2">Quantity: 2</option>
                    <option value="3">Quantity: 3</option>
                    <option value="4">Quantity: 4</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-brand-cocoa/60">
                    ▼
                  </span>
                </div>
                <div className="grid gap-2">
                  <button
                    className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-peach to-brand-cocoa px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.14)]"
                    onClick={addToCartAndOpen}
                  >
                    Add to Basket
                  </button>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-full bg-brand-cocoa px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.12)]"
                    onClick={addToCartAndOpen}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Split How to use / Care & materials */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-brand-peach/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-peach/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa">
                  How to use
                </div>
                <div className="space-y-3">
                  {howSteps.map((step, idx) => (
                    <div
                      key={step}
                      className="flex gap-3 rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-3 shadow-[0_8px_18px_rgba(0,0,0,0.04)]"
                    >
                      <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-peach text-sm font-extrabold text-brand-cocoa shadow-soft">
                        {idx + 1}
                      </span>
                      <p className="text-[15px] leading-snug text-brand-cocoa/85">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-brand-peach/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-peach/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa">
                  Care & materials
                </div>
                <div className="space-y-3">
                  {careItems.map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-3 rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-4 shadow-[0_8px_18px_rgba(0,0,0,0.04)]"
                    >
                      <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-cocoa shadow-soft">
                        {item.icon === 'Shield' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
                        )}
                        {item.icon === 'RefreshCcw' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 2v6h6"/><path d="m3 8 3-3a9 9 0 1 1-2.83 9.17"/></svg>
                        )}
                        {item.icon === 'Feather' && (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 6 9 17l-5.5-5.5"/><path d="M4 10l-2 2"/><path d="m14 4-2 2"/></svg>
                        )}
                      </span>
                      <div>
                        <p className="font-heading text-base font-semibold text-brand-cocoa">{item.title}</p>
                        <p className="mt-1 text-[14px] leading-snug text-brand-cocoa/80">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
        mediaSrc="video://https://www.tiktok.com/embed/v2/7567328998158585110"
        mediaAlt="Lumelle cap TikTok demo"
        mediaLabel="Watch it in action"
        mediaNote="Creator-tested frizz defense"
        heading={{
          eyebrow: 'Why you’ll love it',
          title: 'Effortless to put on, frizz-free when you take it off',
          description: 'Your small daily luxury that keeps styles smooth, comfy, and camera-ready.',
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
