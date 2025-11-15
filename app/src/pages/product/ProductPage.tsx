import { useEffect, useState } from 'react'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import { useCart } from '@/state/CartContext'
import { TrustBar } from '@/sections/shop'

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

const assuranceCards = [
  { title: 'Worldwide shipping', body: 'Tracked delivery from our UK studio.' },
  { title: 'Free UK exchanges', body: '30-day Luxe Guarantee on every order.' },
  { title: 'Creator support', body: 'WhatsApp concierge for fit + care tips.' },
]

const qaItems = [
  { q: 'Is it truly waterproof?', a: 'Yes. The TPU core creates a moisture barrier so steam and splashes stay out.' },
  { q: 'Will it fit my braids or curls?', a: 'The comfort band stretches to 24"+ circumference to cover protective styles.' },
  { q: 'How do I clean it?', a: 'Rinse after each shower, air dry, and hand wash with mild soap weekly for best results.' },
  { q: 'Do you ship worldwide?', a: 'We ship globally with tracked services. UK orders dispatch within 48 hours.' },
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
  const addToCart = () => add({ id: 'lumelle-cap', title: 'Lumelle Shower Cap', price: 24 }, 1)

  return (
    <MarketingLayout navItems={navItems} primaryLabel="Add to Cart" onPrimaryAction={addToCart} subtitle="Product">
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
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="flex-1 rounded-full bg-brand-peach px-6 py-3 text-base font-semibold text-brand-cocoa shadow-soft transition hover:-translate-y-0.5"
                onClick={addToCart}
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
            <ul className="space-y-2 text-brand-cocoa/80">
              <li>• Waterproof dual-layer satin keeps moisture out.</li>
              <li>• Comfort-fit band never leaves creases.</li>
              <li>• Designed by creators who shoot daily content.</li>
            </ul>
          </div>
        </div>
      </section>
      <TrustBar />

      {/* Benefits */}
      <section id="details" className="bg-brand-blush/15">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Why it works</p>
            <h2 className="mt-2 font-heading text-3xl text-brand-cocoa">Creator-approved benefits</h2>
            <p className="mt-3 text-brand-cocoa/70">Every detail was shaped by TikTok creators who can’t risk frizz mid-shoot.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {highlightCards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-brand-blush/60 bg-white/95 p-6 shadow-soft">
                <h3 className="font-heading text-xl text-brand-cocoa">{card.title}</h3>
                <p className="mt-3 text-sm text-brand-cocoa/75">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essentials */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {essentials.map((item) => (
              <div key={item.title} className="rounded-3xl border border-brand-blush/60 bg-brand-blush/10 p-6">
                <h3 className="font-heading text-lg text-brand-cocoa">{item.title}</h3>
                <p className="mt-2 text-brand-cocoa/80">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assurance cards */}
      <section className="bg-brand-blush/20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-3 md:px-6">
          {assuranceCards.map((card) => (
            <div key={card.title} className="rounded-3xl border border-brand-blush/60 bg-white p-5 text-center shadow-soft">
              <h4 className="font-heading text-lg text-brand-cocoa">{card.title}</h4>
              <p className="mt-2 text-sm text-brand-cocoa/75">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Loved by thousands</p>
            <h2 className="font-heading text-3xl text-brand-cocoa">Real feedback, real hair saved</h2>
            <p className="text-brand-cocoa/70">4.9 ★ average from 1,240 shoppers</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {homeConfig.reviews.slice(0, 3).map((review) => (
              <div key={review.author} className="rounded-3xl border border-brand-blush/60 bg-brand-blush/10 p-5 shadow-soft">
                <p className="text-sm font-semibold text-brand-cocoa">{review.author}</p>
                <p className="mt-2 text-base font-heading text-brand-cocoa">{review.title}</p>
                <p className="mt-1 text-sm text-brand-cocoa/70">“{review.body}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TikTok embed */}
      <section className="bg-brand-blush/25">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[0.9fr_1.1fr] md:px-6">
          <div className="rounded-3xl border border-brand-peach/40 bg-white/90 p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cocoa/60">Creator in action</p>
            <h3 className="mt-3 font-heading text-2xl text-brand-cocoa">Watch the cap stay flawless</h3>
            <p className="mt-3 text-brand-cocoa/75">
              See how creators like Shannon keeps her silk press perfect after every shower.
            </p>
            <ul className="mt-4 space-y-2 text-brand-cocoa/80">
              <li>• Steam-proof lining stops frizz.</li>
              <li>• Comfort band keeps edges laid.</li>
              <li>• Durable enough for daily filming.</li>
            </ul>
          </div>
          <TikTokEmbed embedId="7181827060028826910" />
        </div>
      </section>

      {/* Additional imagery */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="grid gap-4 md:grid-cols-2">
            <img src="/uploads/luminele/product-feature-03.jpg" alt="Creator mirror shot" className="rounded-[2rem]" />
            <img src="/uploads/luminele/product-feature-07.jpg" alt="Cap detail" className="rounded-[2rem]" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-brand-blush/15">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h3 className="text-center font-heading text-3xl text-brand-cocoa">Questions? We’ve got answers.</h3>
          <div className="mt-8 space-y-4">
            {qaItems.map((item) => (
              <details key={item.q} className="rounded-3xl border border-brand-blush/60 bg-white/95 p-4 shadow-soft">
                <summary className="cursor-pointer text-base font-semibold text-brand-cocoa">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-brand-cocoa/75">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

export default ProductPage

const TikTokEmbed = ({ embedId }: { embedId: string }) => {
  useEffect(() => {
    const scriptId = 'tiktok-embed-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://www.tiktok.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="rounded-[2.5rem] border border-brand-peach/40 bg-white shadow-soft">
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@lumelle/video/${embedId}`}
        data-video-id={embedId}
        style={{ padding: 0, margin: 0, minHeight: 420 }}
      >
        <a href={`https://www.tiktok.com/@lumelle/video/${embedId}`}>Watch on TikTok</a>
      </blockquote>
    </div>
  )
}
