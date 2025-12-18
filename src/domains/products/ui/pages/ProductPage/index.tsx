import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import { useCart } from '@cart/providers/CartContext'
import { renderSections } from './sections/SectionsMap'
import { useProductContent } from '@/domains/products/hooks/useProductContent'
import { captureEvent } from '@/lib/analytics/posthog'
import SpinWheelPrompt from '@/domains/products/ui/components/SpinWheelPrompt'

const navItems: NavItem[] = [
  { id: 'media', label: 'Product' },
  { id: 'details', label: 'Highlights' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
]



import { Seo } from '@/components/Seo'

export const ProductPage = () => {
  const { add } = useCart()
  const params = useParams<{ handle: string }>()
  const [quantity, setQuantity] = useState(1)
  const handleKey = params.handle ?? 'shower-cap'
  const {
    config,
    gallery,
    setGallery,
    activeImage,
    setActiveImage,
    isAdding,
    setIsAdding,
    variantId,
    price,
    setPrice,
    sections,
    productTitle,
    setProductTitle,
    productDesc,
    setProductDesc,
    heroImage,
  } = useProductContent(handleKey)
  const [draftOverrides, setDraftOverrides] = useState<any | null>(null)
  const [justAdded, setJustAdded] = useState(false)

  const canonicalUrl = useMemo(() => `https://lumelle.com/product/${config.handle}`, [config.handle])

  const ratingValue = (() => {
    const raw = draftOverrides?.ratingValue
    if (typeof raw === 'number' && Number.isFinite(raw)) return raw
    if (typeof raw === 'string' && raw.trim() && Number.isFinite(Number(raw))) return Number(raw)
    return config.ratingValueOverride ?? homeConfig.socialProof.rating
  })()

  const ratingCountLabel = (() => {
    const raw = draftOverrides?.ratingCountLabel
    if (typeof raw === 'string' && raw.trim()) return raw
    if (raw != null && Number.isFinite(Number(raw))) return String(raw)
    return config.ratingCountLabelOverride ?? homeConfig.socialProof.count?.toString() ?? '100+'
  })()

  const navigate = useNavigate()

  const handleAddToCart = async () => {
    if (!variantId) return
    setIsAdding(true)
    try {
      await add({
        id: variantId,
        title: productTitle || config.defaultTitle,
        price: price
      }, quantity)
      captureEvent('add_to_cart', {
        product_handle: config.handle,
        variant_id: variantId,
        quantity,
        price_gbp: price,
      })
      window.dispatchEvent(new CustomEvent('lumelle:open-cart'))
      setJustAdded(true)
      window.setTimeout(() => setJustAdded(false), 800)
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
      }, quantity)
      captureEvent('add_to_cart', {
        product_handle: config.handle,
        variant_id: variantId,
        quantity,
        price_gbp: price,
        source: 'buy_now',
      })
      captureEvent('cta_click', { click_id: 'pdp-buy-now', product_handle: config.handle })
      navigate('/checkout')
    } catch (error) {
      console.error('Buy now failed:', error)
    } finally {
      setIsAdding(false)
    }
  }

  useEffect(() => {
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
  }, [heroImage])

  const productJsonLd = {
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
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumelle.com/' },
      { '@type': 'ListItem', position: 2, name: 'Product', item: canonicalUrl },
    ],
  }

  const essentials =
    draftOverrides?.specs?.essentials && draftOverrides.specs.essentials.length > 0
      ? draftOverrides.specs.essentials
      : sections?.essentials && sections.essentials.length > 0
        ? sections.essentials
        : config.essentials
  const reasons =
    draftOverrides?.specs?.reasons && draftOverrides.specs.reasons.length > 0
      ? draftOverrides.specs.reasons
      : sections?.reasons && sections.reasons.length > 0
        ? sections.reasons
        : config.reasons
  const faqs =
    draftOverrides?.faq && draftOverrides.faq.length > 0
      ? draftOverrides.faq
      : sections?.faq && sections.faq.length > 0
        ? sections.faq
        : config.qa
  const howRaw =
    draftOverrides?.specs?.how && draftOverrides.specs.how.length > 0
      ? draftOverrides.specs.how
      : sections?.how && sections.how.length > 0
        ? sections.how
        : config.how ?? []
  const how = howRaw.map((item: any, idx: number) =>
    typeof item === 'string'
      ? { title: `Reason ${idx + 1}`, body: item }
      : item
  )
  const care =
    draftOverrides?.specs?.care && draftOverrides.specs.care.length > 0
      ? draftOverrides.specs.care
      : sections?.care && sections.care.length > 0
        ? sections.care
        : config.care ?? []
  const featureCopy = draftOverrides?.specs?.featureCallouts ?? config.featureCallouts ?? null
  const featuredTikTokHeading = draftOverrides?.specs?.featuredTikTokHeading ?? config.featuredTikTokHeading
  const featuredTikToks = draftOverrides?.specs?.featuredTikToks ?? config.featuredTikToks

  useEffect(() => {
    setDraftOverrides(null)
  }, [handleKey])

  useEffect(() => {
    // Allow the admin products editor to "live preview" draft changes in an iframe without saving.
    const handler = (event: MessageEvent) => {
      const data = event.data as any
      if (!data || data.type !== 'admin-draft-product') return
      if (data.handle !== handleKey) return

      const draft = data.payload || {}
      setDraftOverrides(draft)
      if (Array.isArray(draft.gallery)) setGallery(draft.gallery)
      if (draft.price != null) setPrice(Number(draft.price))
      if (typeof draft.productTitle === 'string') setProductTitle(draft.productTitle)
      if (typeof draft.productDesc === 'string') setProductDesc(draft.productDesc)
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [handleKey, setGallery, setPrice, setProductDesc, setProductTitle])

  useEffect(() => {
    // Report height to admin iframe preview (if embedded)
    const isEmbedded = (() => {
      try {
        return window.self !== window.top
      } catch {
        return true
      }
    })()

    if (!isEmbedded) return

    const html = document.documentElement
    const body = document.body
    const previous = {
      htmlOverflowX: html.style.overflowX,
      bodyOverflowX: body.style.overflowX,
    }

    const sendHeight = () => {
      const h = document.body.scrollHeight
      window.parent?.postMessage({ type: 'pdpHeight', height: h }, '*')
    }

    // Prevent horizontal scrollbars in the embedded preview without affecting desktop layout.
    html.style.overflowX = 'hidden'
    body.style.overflowX = 'hidden'

    sendHeight()
    const observer = new ResizeObserver(() => sendHeight())
    observer.observe(document.body)
    return () => {
      observer.disconnect()
      html.style.overflowX = previous.htmlOverflowX
      body.style.overflowX = previous.bodyOverflowX
    }
  }, [])

  return (
    <MarketingLayout navItems={navItems} subtitle="Product">
      <Seo
        title={productTitle || config.defaultTitle}
        description={`${productDesc} • Blocks steam for silk presses, curls, and braids. Free returns in 30 days.`}
        image={heroImage}
        url={canonicalUrl}
        type="product"
        jsonLd={[productJsonLd, breadcrumbJsonLd]}
      />
      <SpinWheelPrompt />
      {/* Hero media + info */}
      {renderSections({
        gallery,
        activeImage,
        setActiveImage,
        price,
        compareAtPrice: (() => {
          const v = draftOverrides?.compareAtPrice
          if (v == null) return config.compareAtPrice
          const n = Number(v)
          return Number.isFinite(n) ? n : config.compareAtPrice
        })(),
        discountPercentOverride: (() => {
          const v = draftOverrides?.discountPercentOverride
          if (v == null) return config.discountPercentOverride
          const n = Number(v)
          return Number.isFinite(n) ? n : config.discountPercentOverride
        })(),
        badge:
          typeof draftOverrides?.badge === 'string'
            ? draftOverrides.badge
            : config.badge,
        productTitle,
        productDesc,
        ratingValue,
        ratingCountLabel,
        canonicalUrl,
        onAdd: handleAddToCart,
        onBuy: handleBuyNow,
        isAdding,
        justAdded,
        quantity,
        setQuantity,
        how,
        care,
        careLabel:
          typeof draftOverrides?.careLabelOverride === 'string'
            ? draftOverrides.careLabelOverride
            : config.careLabelOverride,
        hideDetailsAccordion:
          typeof draftOverrides?.hideDetailsAccordion === 'boolean'
            ? draftOverrides.hideDetailsAccordion
            : config.hideDetailsAccordion,
        featureCopy,
        reasons,
        essentials,
        faqs,
        featuredTikTokHeading,
        featuredTikToks,
      })}
    </MarketingLayout>
  )
}

export default ProductPage
