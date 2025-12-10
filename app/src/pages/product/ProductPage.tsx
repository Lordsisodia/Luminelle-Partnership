import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import { cdnUrl } from '@/utils/cdn'
import { useCart } from '@/state/CartContext'
import { env } from '@/utils/env'
import { fetchProductByHandle } from '@/lib/product'
import { StarRating } from '@/components/StarRating'
import { FeatureCallouts, DetailsAccordion, HeroProofStrip, ReviewsAutoCarousel, FaqSectionShop } from '@/sections/shop'
import { fetchProductSections } from '@/lib/sections'
import { FeaturedTikTok } from '@/sections/shop/FeaturedTikTok'
import { setMetaTags, injectJsonLd } from '@/lib/seo'

type ProductConfig = {
  handle: string
  fallbackVariantId?: string | null
  fallbackItemId?: string
  defaultTitle: string
  defaultSubtitle: string
  defaultPrice?: number
  badge?: string
  gallery?: string[]
  videoSlot?: string
  essentials?: { title: string; body: string }[]
  reasons?: { title: string; desc: string }[]
  qa?: { q: string; a: string }[]
  how?: string[]
  care?: { icon?: string; title: string; body: string }[]
  featureCallouts?: {
    mediaSrc?: string
    mediaAlt?: string
    mediaLabel?: string
    mediaNote?: string
    heading?: {
      eyebrow?: string
      title?: string
      description?: string
      alignment?: 'left' | 'center' | 'right'
    }
  }
  featuredTikTokHeading?: {
    eyebrow?: string
    title?: string
    description?: string
    alignment?: 'left' | 'center' | 'right'
  }
}

const DEFAULT_VIDEO_SLOT = 'video://https://www.tiktok.com/embed/v2/7567328998158585110'

const CAP_GALLERY = [
  '/uploads/luminele/main (1).jpg',
  '/uploads/luminele/2ND PHOTO.jpg',
  '/uploads/luminele/3RD PHOTO.jpg',
  '/uploads/luminele/4TH PHOTO.jpg',
  '/uploads/luminele/5TH PHOTO.jpg',
  '/uploads/luminele/6TH PHOTO.jpg',
  '/uploads/luminele/7TH PHOTO.jpg',
  '/uploads/luminele/8TH PHOTO.jpg',
  DEFAULT_VIDEO_SLOT,
]

const essentialsCap = [
  { title: 'Reusable waterproof', body: 'Dual-layer satin with a waterproof TPU core and comfort-fit elastic band that seals out steam.' },
  { title: 'Satin lined', body: 'Smooth satin interior protects styles, reduces friction, and blocks humidity.' },
  { title: 'Large wide shower cap', body: 'Roomy silhouette fits curls, coils, protective styles, and even bum-length hair (per customer reviews).' },
  { title: 'Adjustable', body: 'Comfort band stretches to 24"+ with a secure, no-crease fit for daily use.' },
]

const reasonsCap = [
  { title: 'Our best seller', desc: 'Creator-tested fit that keeps silk presses, curls, and braids camera-ready.' },
  { title: 'Happier hair days', desc: 'Steam-blocking core stops frizz so styles last through busy weeks.' },
  { title: 'Less breakage', desc: 'Satin-soft band prevents tugging while the roomy shape avoids tension.' },
  { title: 'Stays fresh', desc: 'Dual-layer build wipes clean and air-dries fast—made to reuse 100+ times.' },
]

const qaCap = [
  { q: 'Will it fit my hair?', a: 'The cap fits most hair lengths — even customers with bum-length hair have reviewed that it fits perfectly.' },
  { q: 'Is it truly waterproof?', a: 'Yes. The TPU core creates a moisture barrier so steam and splashes stay out.' },
  { q: 'How do I clean it?', a: 'Rinse after each shower, air dry, and hand wash with mild soap weekly for best results.' },
  { q: 'What’s the return policy?', a: 'Free returns within 30 days—no-hassle exchanges or refunds.' },
]

const howCap = [
  'Slip on before your shower; tuck flyaways inside.',
  'After showering, rinse the lining and shake off water.',
  'Hang to air-dry; ready for tomorrow.',
]

const careCap = [
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

const curlerGallery = [
  '/uploads/curler/1.png',
  '/uploads/curler/2.png',
  '/uploads/curler/3.png',
  '/uploads/curler/4.jpeg',
  '/uploads/curler/5.jpg',
  '/uploads/curler/6.jpg',
  DEFAULT_VIDEO_SLOT,
]

const essentialsCurler = [
  { title: 'Heatless, satin-wrapped', body: 'Soft foam core wrapped in satin shapes curls without heat damage.' },
  { title: 'Complete overnight kit', body: 'Includes curler rod, 2 satin scrunchies, and a claw clip to secure your wrap.' },
  { title: 'Sleep-friendly comfort', body: 'Flexible core you can sleep on—no hard plastic or pull on roots.' },
  { title: 'Works on damp or dry hair', body: 'Best on 70–90% dry hair for smooth, frizz-free waves by morning.' },
]

const reasonsCurler = [
  { title: 'Zero heat damage', desc: 'Wake up to soft curls without irons or blow-dryers.' },
  { title: 'Set it & forget it', desc: 'Wrap once at night, reveal bouncy waves in the morning.' },
  { title: 'Gentle on hairlines', desc: 'Satin finish reduces friction and keeps edges smooth.' },
  { title: 'Travel-ready', desc: 'Lightweight set rolls into your carry-on for hotel or gym nights.' },
]

const qaCurler = [
  { q: 'How long do I leave it in?', a: 'Wrap for 4–8 hours; overnight gives the longest-lasting curls.' },
  { q: 'Does it work on short hair?', a: 'Best from shoulder-length and longer; use smaller sections for medium lengths.' },
  { q: 'What’s included?', a: 'One satin curler rod, two satin scrunchies, and a claw clip.' },
  { q: 'How do I clean it?', a: 'Spot clean by hand with mild soap, then air dry flat.' },
]

const howCurler = [
  'Start on slightly damp hair; place the satin curler across your crown and secure with the claw clip.',
  'Wrap 1–2" sections around each side away from your face, keeping tension even.',
  'Secure the ends with the satin scrunchies, sleep or wait 4–8 hours, then unwrap for soft curls.',
]

const careCurler = [
  { icon: 'Shield', title: 'Heatless by design', body: 'Protects against heat damage while creating curls overnight.' },
  { icon: 'RefreshCcw', title: 'Reusable satin', body: 'Spot clean and air dry; built to reuse week after week.' },
  { icon: 'Feather', title: 'Soft sleep fit', body: 'Flexible foam core stays comfy on your pillow and gentle on roots.' },
]

const curlerConfig: ProductConfig = {
  handle: 'satin-overnight-curler',
  fallbackItemId: 'satin-overnight-curler-set',
  defaultTitle: 'Satin Overnight Curler Set',
  defaultSubtitle: 'Heatless satin curling set that delivers soft, frizz-free waves by morning.',
  defaultPrice: 24,
  badge: 'New viral heatless curlers',
  gallery: curlerGallery,
  videoSlot: DEFAULT_VIDEO_SLOT,
  essentials: essentialsCurler,
  reasons: reasonsCurler,
  qa: qaCurler,
  how: howCurler,
  care: careCurler,
  featureCallouts: {
    mediaSrc: DEFAULT_VIDEO_SLOT,
    mediaAlt: 'Satin overnight curler demo',
    mediaLabel: 'Heatless overnight curls',
    mediaNote: 'Soft satin set that stays comfy all night',
    heading: {
      eyebrow: 'Why you’ll love it',
      title: 'Soft waves with zero heat damage',
      description: 'Wrap at night, wake up to smooth curls and no hot tools.',
      alignment: 'left',
    },
  },
  featuredTikTokHeading: {
    eyebrow: 'Creator in action',
    title: 'See the heatless set at work',
    description: 'Watch quick wrap tutorials and morning reveals.',
    alignment: 'center',
  },
}

const productConfigs: Record<string, ProductConfig> = {
  'shower-cap': {
    handle: 'lumelle-shower-cap',
    fallbackItemId: 'lumelle-cap',
    fallbackVariantId: 'gid://shopify/ProductVariant/56829020504438',
    defaultTitle: 'Lumelle Shower Cap',
    defaultSubtitle: 'Keep hair dry. Keep styles flawless.',
    defaultPrice: 15,
    badge: '1k+ bought in past month',
    gallery: CAP_GALLERY,
    videoSlot: DEFAULT_VIDEO_SLOT,
    essentials: essentialsCap,
    reasons: reasonsCap,
    qa: qaCap,
    how: howCap,
    care: careCap,
    featureCallouts: {
      mediaSrc: DEFAULT_VIDEO_SLOT,
      mediaAlt: 'Lumelle cap TikTok demo',
      mediaLabel: 'Watch it in action',
      mediaNote: 'Creator-tested frizz defense',
      heading: {
        eyebrow: 'Why you’ll love it',
        title: 'Effortless to put on, frizz-free when you take it off',
        description: 'Your small daily luxury that keeps styles smooth, comfy, and camera-ready.',
        alignment: 'left',
      },
    },
    featuredTikTokHeading: {
      eyebrow: 'Creator in action',
      title: 'Watch the cap stay flawless',
      description: 'See how creators keep their silk press perfect after every shower.',
      alignment: 'center',
    },
  },
  'satin-overnight-curler': curlerConfig,
  'satin-overnight-curler-set': { ...curlerConfig, handle: 'satin-overnight-curler-set' },
}

const navItems: NavItem[] = [
  { id: 'media', label: 'Product' },
  { id: 'details', label: 'Highlights' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
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

import { useDrawer } from '@/state/DrawerContext'

export const ProductPage = () => {
  const { add } = useCart()
  const { openCart } = useDrawer()
  const params = useParams<{ handle: string }>()
  const handleKey = params.handle ?? 'shower-cap'
  const config = productConfigs[handleKey] ?? productConfigs['shower-cap']
  const isCurler = config.handle.startsWith('satin-overnight-curler')
  const videoSlot = config.videoSlot ?? DEFAULT_VIDEO_SLOT
  const baseGallery = useMemo(() => {
    const g = config.gallery ?? CAP_GALLERY
    const withoutDup = g.filter((src) => src !== videoSlot)
    return [...withoutDup, videoSlot]
  }, [config, videoSlot])

  const [activeImage, setActiveImage] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [variantId, setVariantId] = useState<string | null>(config.fallbackVariantId ?? null)
  const [price, setPrice] = useState<number>(config.defaultPrice ?? 15)
  const [gallery, setGallery] = useState<string[]>(baseGallery)
  const [sections, setSections] = useState<any>(null)
  const [productTitle, setProductTitle] = useState(config.defaultTitle)
  const [productDesc, setProductDesc] = useState(config.defaultSubtitle)
  const heroImage = useMemo(() => {
    const primary = gallery.find((src) => !src.startsWith('video://'))
    return primary ? cdnUrl(primary) : undefined
  }, [gallery])
  const canonicalUrl = useMemo(() => `https://lumelle.com/product/${config.handle}`, [config.handle])

  const navigate = useNavigate()

  const handleAddToCart = async () => {
    if (!variantId) return
    setIsAdding(true)
    try {
      await add({
        id: variantId,
        title: productTitle || config.defaultTitle,
        price: price
      }, 1)
      openCart()
    } catch (error) {
      console.error('Add to cart failed:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const handleBuyNow = async () => {
    if (!variantId) return
    setIsAdding(true)
    try {
      await add({
        id: variantId,
        title: productTitle || config.defaultTitle,
        price: price
      }, 1)
      navigate('/checkout')
    } catch (error) {
      console.error('Buy now failed:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const [cutoffText, setCutoffText] = useState('Order now for fastest dispatch')
  const deliveryDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 2)
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
  }, [])

  useEffect(() => {
    setActiveImage(0)
    setVariantId(config.fallbackVariantId ?? env('SHOPIFY_DEFAULT_VARIANT_ID') ?? null)
    setPrice(config.defaultPrice ?? 15)
    setGallery(baseGallery)
    setSections(null)
    setProductTitle(config.defaultTitle)
    setProductDesc(config.defaultSubtitle)
  }, [config, baseGallery])

  useEffect(() => {
    const cutoff = new Date(Date.now() + 3 * 60 * 60 * 1000)
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

  useEffect(() => {
    fetchProductByHandle(config.handle)
      .then((p) => {
        if (p?.variantId) setVariantId(p.variantId)
        if (p?.price?.amount) setPrice(Number(p.price.amount))
        if (p?.title) setProductTitle(p.title)
        if (p?.description) setProductDesc(p.description)
        if (!isCurler && p?.images && p.images.length > 0) {
          setGallery([...p.images, videoSlot])
        }
      })
      .catch(() => undefined)
    fetchProductSections(config.handle)
      .then((s) => {
        if (!s) return
        setSections(s)
        if (s.heroSubtitle) setProductDesc(s.heroSubtitle)
        if (!isCurler && s.gallery && s.gallery.length > 0) setGallery([...s.gallery, videoSlot])
      })
      .catch(() => undefined)
  }, [config.handle, videoSlot])

  useEffect(() => {
    setMetaTags({
      title: `${productTitle} | Satin-lined waterproof shower cap`,
      description: `${productDesc} • Blocks steam for silk presses, curls, and braids. Free returns in 30 days.`,
      image: heroImage,
      url: canonicalUrl,
      type: 'product',
    })

    if (heroImage) {
      const existing = document.querySelector('link[rel="preload"][data-hero="pdp-hero"]') as HTMLLinkElement | null
      if (!existing) {
        const l = document.createElement('link')
        l.rel = 'preload'
        l.as = 'image'
        l.href = heroImage
        l.setAttribute('data-hero', 'pdp-hero')
        document.head.appendChild(l)
      }
    }

    injectJsonLd('pdp-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productTitle,
      description: `${productDesc} • Blocks steam for silk presses, curls, and braids. Free returns in 30 days.`,
      image: heroImage ? [heroImage] : undefined,
      brand: { '@type': 'Brand', name: 'Lumelle' },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        price: price.toFixed(2),
        availability: 'https://schema.org/InStock',
        url: canonicalUrl,
        itemCondition: 'https://schema.org/NewCondition',
        merchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'GB',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 30,
          returnFees: 'https://schema.org/FreeReturn',
          returnMethod: 'https://schema.org/ReturnByMail',
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '100',
      },
    })

    injectJsonLd('pdp-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumelle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Product', item: canonicalUrl },
      ],
    })
  }, [canonicalUrl, heroImage, price, productDesc, productTitle])

  const essentials = sections?.essentials ?? config.essentials ?? essentialsCap
  const reasons = sections?.reasons ?? config.reasons ?? reasonsCap
  const faqs = sections?.faq ?? config.qa ?? qaCap
  const how = sections?.how ?? config.how ?? howCap
  const care = sections?.care ?? config.care ?? careCap
  const featureCopy = config.featureCallouts ?? productConfigs['shower-cap'].featureCallouts
  const featuredTikTokHeading = config.featuredTikTokHeading ?? productConfigs['shower-cap'].featuredTikTokHeading

  return (
    <MarketingLayout navItems={navItems} primaryLabel="Add to Cart" onPrimaryAction={handleAddToCart} subtitle="Product">
      {/* Hero media + info */}
      <section id="media" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-cocoa shadow-soft ring-1 ring-brand-peach/50">
              {config.badge ?? 'Fresh drop'}
            </div>
            <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-brand-blush/60 bg-white md:flex md:items-center md:justify-center md:bg-brand-blush/20">
              {gallery[activeImage].startsWith('video://') ? (
                <iframe
                  src={gallery[activeImage].replace('video://', '')}
                  title="Lumelle product video"
                  className="h-[60vh] w-full max-h-[80vh] rounded-[2.5rem] md:max-h-none"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                (() => {
                  const sources = buildSources(gallery[activeImage])
                  const img = (
                    <img
                      src={sources?.fallback ?? gallery[activeImage]}
                      alt="Lumelle product detail"
                      className="w-full h-auto max-h-[80vh] object-contain md:max-h-none"
                      width={960}
                      height={960}
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
                {gallery.map((src, idx) => {
                  const isVideo = src.startsWith('video://')
                  const sources = buildSources(src)
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`h-14 w-14 shrink-0 overflow-hidden rounded-2xl border snap-start ${idx === activeImage ? 'border-brand-cocoa' : 'border-brand-blush/60'
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
                          <img
                            src={sources.fallback}
                            alt=""
                            className="h-full w-full object-cover"
                            width={160}
                            height={160}
                            loading="lazy"
                            decoding="async"
                          />
                        </picture>
                      ) : (
                        <img src={src} alt="" className="h-full w-full object-cover" width={160} height={160} loading="lazy" decoding="async" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="space-y-5 text-brand-cocoa min-w-0">
            <div>
              <h1 className="mt-2 font-heading text-4xl font-bold leading-tight">{productTitle}</h1>
              <p className="mt-2 text-brand-cocoa/70">{productDesc}</p>
              <div className="mt-3 rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-3 text-sm text-brand-cocoa">
                <h2 className="font-semibold text-brand-cocoa">How do I keep a silk press dry in the shower?</h2>
                <p className="mt-1 text-brand-cocoa/75">
                  Seat the satin-lined waterproof cap 0.5–1 cm past your hairline, tuck sideburns, angle spray forward, and finish with 60 seconds of cooler water to drop humidity. Blot the cap and remove front-to-back.
                </p>
              </div>
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
                <span className="text-3xl font-semibold text-brand-cocoa">£{price.toFixed(2)}</span>
                <button
                  type="button"
                  aria-label="Share product"
                  className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-blush/60 bg-white text-brand-cocoa shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
                  onClick={() => {
                    const shareUrl = canonicalUrl
                    if (navigator.share) {
                      navigator.share({ title: productTitle, url: shareUrl }).catch(() => undefined)
                    } else {
                      navigator.clipboard?.writeText(shareUrl).catch(() => undefined)
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" /><path d="M16 6l-4-4-4 4" /><path d="M12 2v14" /></svg>
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
                    onClick={handleAddToCart}
                    disabled={isAdding}
                  >
                    {isAdding ? 'Adding...' : 'Add to Basket'}
                  </button>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-full bg-brand-cocoa px-6 py-3 text-base font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,0,0,0.12)]"
                    onClick={handleBuyNow}
                    disabled={isAdding}
                  >
                    {isAdding ? 'Processing...' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Split How to use / Care & materials (move below media to balance layout) */}
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 px-4 md:grid-cols-2 md:px-6">
          <div className="rounded-3xl border border-brand-peach/60 bg-white/95 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-peach/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cocoa">
              How to use
            </div>
            <div className="space-y-3">
              {how.map((step: string, idx: number) => (
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
              {care.map((item: any) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-2xl border border-brand-blush/60 bg-brand-blush/10 p-4 shadow-[0_8px_18px_rgba(0,0,0,0.04)]"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand-cocoa shadow-soft">
                    {item.icon === 'Shield' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
                    )}
                    {item.icon === 'RefreshCcw' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 2v6h6" /><path d="m3 8 3-3a9 9 0 1 1-2.83 9.17" /></svg>
                    )}
                    {item.icon === 'Feather' && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M20 6 9 17l-5.5-5.5" /><path d="M4 10l-2 2" /><path d="m14 4-2 2" /></svg>
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
        mediaSrc={featureCopy?.mediaSrc}
        mediaAlt={featureCopy?.mediaAlt}
        mediaLabel={featureCopy?.mediaLabel}
        mediaNote={featureCopy?.mediaNote}
        heading={featureCopy?.heading}
        items={reasons as any}
      />

      <DetailsAccordion
        heading={{
          eyebrow: 'Everything you need',
          title: 'Materials, care & fit',
          description: 'Quick references before you add it to your cart.',
          alignment: 'center',
        }}
        items={essentials as any}
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

      <FeaturedTikTok heading={featuredTikTokHeading} />

      <FaqSectionShop
        sectionId="faq"
        items={faqs as any}
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
