import { useState } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import { useCart } from '@/state/CartContext'
import { useDrawer } from '@/state/DrawerContext'
import { SectionHeading } from '@/components/SectionHeading'
import { StarRating } from '@/components/StarRating'
import {
  FeatureCallouts,
  DetailsAccordion,
  HeroProofStrip,
  ReviewsAutoCarousel,
  RealWorldUseCarousel,
  FaqSectionShop,
  BundleCards,
} from '@/sections/shop'
import { FeaturedTikTok } from '@/sections/shop/FeaturedTikTok'
import { ProofBand } from '@/sections/ProofBand'
import { Sparkles, Droplets, Leaf } from 'lucide-react'

const galleryImages = [
  '/uploads/luminele/product-feature-06.jpg',
  '/uploads/luminele/product-feature-04.jpg',
  '/uploads/luminele/product-feature-05.jpg',
  '/uploads/luminele/product-feature-02.jpg',
]

const highlightCards = [
  { title: 'No-frizz seal', desc: 'Waterproof lining keeps silk presses, curls, and braids protected in every shower.' },
  { title: 'Spa-grade fit', desc: 'Soft inner band hugs without leaving indentations or headaches.' },
  { title: 'Reusable luxe', desc: 'Dual-layer satin + waterproof core lasts for 100+ uses.' },
]

const essentials = [
  { title: 'Ingredients', body: 'Dual-layer satin, waterproof TPU core, comfort-fit elastic band.' },
  { title: 'Directions', body: 'Slip on before showering, rinse and hang dry after use, hand wash weekly.' },
  { title: 'Materials & care', body: 'Rinse and air dry. Hand wash with gentle soap as needed.' },
  { title: 'Fit & sizing', body: 'Designed to fit most hair types including braids, curls, and blowouts.' },
]

const qaItems = [
  { q: 'Is it truly waterproof?', a: 'Yes. The TPU core creates a moisture barrier so steam and splashes stay out.' },
  { q: 'Will it fit my braids or curls?', a: 'The comfort band stretches to 24"+ circumference to cover protective styles.' },
  { q: 'How do I clean it?', a: 'Rinse after each shower, air dry, and hand wash with mild soap weekly for best results.' },
  { q: 'Do you ship worldwide?', a: 'We ship globally with tracked services. UK orders dispatch within 48 hours.' },
]

const creatorRoutineSteps = [
  {
    title: 'Prep',
    body: 'Lightly mist hairline, gather curls or braids, and tuck edges inside the satin lining.',
    media: '/uploads/luminele/product-feature-02.jpg',
  },
  {
    title: 'Protect',
    body: 'Secure the comfort band just above the hairline for a steam-proof seal—no creasing.',
    media: '/uploads/luminele/product-feature-04.jpg',
  },
  {
    title: 'Reset',
    body: 'Rinse the waterproof core, blot dry, and hang from the loop so it’s ready for tomorrow.',
    media: '/uploads/luminele/product-feature-05.jpg',
  },
]

const ingredientHighlights = [
  { title: 'Dual-layer satin', desc: 'Glides over curls to prevent friction and frizz.', icon: Sparkles },
  { title: 'Waterproof TPU core', desc: 'Blocks steam and splashes without trapping heat.', icon: Droplets },
  { title: 'Stretch comfort band', desc: 'Hugs up to 24" heads without indentations.', icon: Leaf },
]

const testimonialSpotlight = {
  quote: '“Filming daily means zero time for blowout disasters. This cap is the only one that survives my steamy showers.”',
  author: 'Isabella M.',
  role: 'TikTok beauty creator',
  avatar: '/uploads/luminele/product-feature-07.jpg',
}

const conciergeInfo = {
  title: 'Need sizing or style help?',
  subtitle: 'Chat with our WhatsApp concierge for fit tips and creator scripts in under 10 minutes.',
  cta: 'Message WhatsApp',
  href: 'https://wa.me/message/lumellecaps',
}

const routineProducts = [
  { title: 'Silk Pillowcase', desc: 'Lock in smooth styles overnight.', status: 'Waitlist open', href: '#' },
  { title: 'Luxe Microfiber Wrap', desc: 'Gentle dry before you cap up.', status: 'In development', href: '#' },
  { title: 'Edge Smoothing Brush', desc: 'Prep flyaways before sealing the cap.', status: 'Coming soon', href: '#' },
]

const realWorldUseFallback = [
  { src: '/uploads/luminele/product-feature-03.jpg', alt: 'Creator mirror shot wearing Lumelle cap', caption: 'After a hot shower — blowout stays smooth and frizz‑free.' },
  { src: '/uploads/luminele/product-feature-07.jpg', alt: 'Comfort band detail close‑up', caption: 'Comfort band sits softly on the hairline — no marks.' },
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
  const realWorldUseItems = homeConfig.realWorldUse ?? realWorldUseFallback

  return (
    <MarketingLayout navItems={navItems} primaryLabel="Add to Cart" onPrimaryAction={addToCartAndOpen} subtitle="Product">
      {/* Hero media + info */}
      <section id="media" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div>
            <div className="aspect-square overflow-hidden rounded-[2.5rem] border border-brand-blush/60 bg-brand-blush/20">
              <img
                src={galleryImages[activeImage]}
                alt="Lumelle product detail"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {galleryImages.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={`overflow-hidden rounded-2xl border ${
                    idx === activeImage ? 'border-brand-cocoa' : 'border-brand-blush/60'
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img src={src} alt="" className="h-20 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-5 text-brand-cocoa">
            <div>
              <span className="inline-flex rounded-full bg-brand-blush/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/70">
                Creator favorite
              </span>
              <h1 className="mt-2 font-heading text-4xl leading-tight">Lumelle Shower Cap</h1>
              <p className="mt-2 text-brand-cocoa/70">Keep hair dry. Keep styles flawless.</p>
              <div className="mt-3 text-3xl font-semibold">£24.00</div>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-blush/50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em]">
                Buy 2, save 10%
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-brand-cocoa">
                <div className="flex items-center gap-2">
                  <StarRating value={homeConfig.socialProof.rating} size={16} />
                  <span>{homeConfig.socialProof.rating.toFixed(1)} ({homeConfig.socialProof.count.toLocaleString()})</span>
                </div>
                <a href="#reviews" className="text-xs uppercase tracking-[0.28em] text-brand-cocoa/60 hover:text-brand-cocoa">
                  Read reviews
                </a>
              </div>
              <div className="mt-4 rounded-2xl border border-brand-blush/60 bg-white/80 px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold">Subscribe &amp; save 10%</p>
                    <p className="text-xs text-brand-cocoa/70">Free UK shipping over £40 + 30-day Luxe guarantee.</p>
                  </div>
                  <button type="button" role="switch" aria-checked="false" className="inline-flex h-7 w-12 items-center rounded-full bg-brand-blush/50 px-1 text-xs font-semibold text-brand-cocoa">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick info pills */}
            <div>
              <div className="inline-grid grid-cols-2 rounded-full border border-brand-blush/60 p-0.5 text-sm font-semibold">
                <button
                  aria-pressed={infoTab === 'how'}
                  onClick={() => setInfoTab('how')}
                  className={`rounded-full px-4 py-1.5 transition ${infoTab === 'how' ? 'bg-brand-blush/50 text-brand-cocoa' : 'text-brand-cocoa/70 hover:bg-brand-blush/30'}`}
                >
                  How to use
                </button>
                <button
                  aria-pressed={infoTab === 'care'}
                  onClick={() => setInfoTab('care')}
                  className={`rounded-full px-4 py-1.5 transition ${infoTab === 'care' ? 'bg-brand-blush/50 text-brand-cocoa' : 'text-brand-cocoa/70 hover:bg-brand-blush/30'}`}
                >
                  Care & materials
                </button>
              </div>
              <div className="mt-3 rounded-2xl border border-brand-blush/60 bg-white p-4 text-sm text-brand-cocoa/80">
                {infoTab === 'how' ? (
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Slip on before your shower; tuck flyaways inside.</li>
                    <li>After showering, rinse the lining and shake off water.</li>
                    <li>Hang to air‑dry; ready for tomorrow.</li>
                  </ul>
                ) : (
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Dual‑layer satin exterior with waterproof TPU core.</li>
                    <li>Hand wash weekly with mild soap; do not tumble dry.</li>
                    <li>Comfort band designed to avoid creasing the hairline.</li>
                  </ul>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-brand-blush/60 bg-white/80 px-4 py-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">
                    {['Free UK shipping over £40', '30-day Luxe guarantee', 'Secure checkout'].map((chip) => (
                      <span key={chip} className="rounded-full bg-white px-3 py-1 text-brand-cocoa">
                        {chip}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-brand-cocoa/70">Subscribe &amp; save 10% — pause or cancel in WhatsApp any time.</p>
                </div>
                <button type="button" role="switch" aria-checked="false" className="inline-flex h-7 w-12 items-center rounded-full bg-brand-blush/50 px-1 text-xs font-semibold text-brand-cocoa">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="flex-1 rounded-full bg-brand-peach px-6 py-3 text-base font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5"
                onClick={addToCartAndOpen}
              >
                Add to Cart
              </button>
              <a
                href="#details"
                className="flex-1 rounded-full border border-brand-blush/60 bg-white px-6 py-3 text-center text-base font-semibold text-brand-cocoa"
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

      <ProofBand />

      <FeatureCallouts
        sectionId="details"
        className="bg-brand-blush/15"
        heading={{
          eyebrow: 'Why it works',
          title: 'Creator-approved benefits',
          description: 'Every detail was shaped by TikTok creators who can’t risk frizz mid-shoot.',
          alignment: 'center',
        }}
        items={highlightCards}
      />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Creator routine"
            title="How pros keep styles flawless"
            description="Follow the three-step ritual from prep to rinse to keep curls camera-ready."
            alignment="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {creatorRoutineSteps.map((step) => (
              <article key={step.title} className="rounded-3xl border border-brand-blush/60 bg-white/90 p-5 shadow-soft">
                <img src={step.media} alt={step.title} className="h-36 w-full rounded-2xl border border-brand-blush/60 object-cover" />
                <h3 className="mt-4 font-heading text-xl text-brand-cocoa">{step.title}</h3>
                <p className="mt-2 text-sm text-brand-cocoa/75">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="/brief" className="inline-flex items-center gap-2 rounded-full border border-brand-blush/60 px-5 py-2 text-sm font-semibold text-brand-cocoa">
              View creator prep guide →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Ingredient highlights"
            title="Materials that earn their keep"
            description="Every layer is intentional—here’s why the cap outperforms disposables."
            alignment="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ingredientHighlights.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-3xl border border-brand-blush/60 bg-brand-blush/20 p-5">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-cocoa">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl text-brand-cocoa">{item.title}</h3>
                      <p className="mt-1 text-sm text-brand-cocoa/75">{item.desc}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-blush/20 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center text-brand-cocoa md:px-6">
          <SectionHeading
            eyebrow="Creator spotlight"
            title="Trusted on set and off"
            description="Pros shoot daily content with Lumelle to stay on schedule."
            alignment="center"
          />
          <blockquote className="relative mt-6 rounded-3xl border border-brand-peach/40 bg-white/95 p-6 shadow-soft">
            <p className="text-lg font-semibold leading-relaxed">{testimonialSpotlight.quote}</p>
            <div className="mt-4 flex flex-col items-center gap-3 md:flex-row md:justify-center">
              <img src={testimonialSpotlight.avatar} alt={testimonialSpotlight.author} className="h-14 w-14 rounded-full border border-brand-blush/60 object-cover" />
              <div className="text-sm text-brand-cocoa/70">
                <p className="font-semibold text-brand-cocoa">{testimonialSpotlight.author}</p>
                <p>{testimonialSpotlight.role}</p>
              </div>
            </div>
          </blockquote>
        </div>
      </section>

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

      <RealWorldUseCarousel
        items={realWorldUseItems}
        heading={{
          eyebrow: 'Real‑world use',
          title: 'See it in action',
          description: 'What it looks like on and why it works.',
          alignment: 'center',
        }}
      />

      <section className="bg-brand-blush/15 py-12">
        <div className="mx-auto max-w-4xl px-4 text-brand-cocoa md:px-6">
          <div className="rounded-3xl border border-brand-blush/60 bg-white/95 p-6 shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Concierge</p>
                <h3 className="mt-1 font-heading text-2xl">{conciergeInfo.title}</h3>
                <p className="mt-2 text-sm text-brand-cocoa/75">{conciergeInfo.subtitle}</p>
              </div>
              <a
                href={conciergeInfo.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-cocoa px-6 py-3 text-sm font-semibold text-white shadow-soft"
              >
                {conciergeInfo.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow="Complete the routine"
            title="Everything you’ll pair with the cap"
            description="Tease upcoming accessories and keep shoppers in our ecosystem."
            alignment="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {routineProducts.map((item) => (
              <article key={item.title} className="rounded-3xl border border-dashed border-brand-blush/60 bg-white/90 p-5 text-center">
                <h3 className="font-heading text-xl text-brand-cocoa">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-cocoa/70">{item.desc}</p>
                <span className="mt-3 inline-flex rounded-full bg-brand-blush/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/70">{item.status}</span>
                <div className="mt-4 text-sm text-brand-cocoa/70">Join the waitlist to hear first.</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BundleCards />

      <FaqSectionShop
        sectionId="faq"
        items={qaItems}
        heading={{
          eyebrow: 'Need help?',
          title: 'Questions? We’ve got answers.',
          description: 'Still unsure? Message our WhatsApp concierge.',
          alignment: 'center',
        }}
      />
    </MarketingLayout>
  )
}

export default ProductPage
