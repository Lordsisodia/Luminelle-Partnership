import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import type { NavItem } from '@/layouts/MarketingLayout'
import { homeConfig } from '@/content/home.config'
import { useCart } from '@cart/providers/CartContext'
import { setMetaTags, injectJsonLd } from '@/lib/seo'
import { renderSections } from './sections/SectionsMap'
import { useProductContent } from '@/domains/products/hooks/useProductContent'

const navItems: NavItem[] = [
  { id: 'media', label: 'Product' },
  { id: 'details', label: 'Highlights' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
]



export const ProductPage = () => {
  const { add } = useCart()
  const params = useParams<{ handle: string }>()
  const [quantity, setQuantity] = useState(1)
  const handleKey = params.handle ?? 'shower-cap'
  const {
    config,
    gallery,
    activeImage,
    setActiveImage,
    isAdding,
    setIsAdding,
    variantId,
    price,
    sections,
    productTitle,
    productDesc,
    heroImage,
  } = useProductContent(handleKey)
  const [justAdded, setJustAdded] = useState(false)

  const canonicalUrl = useMemo(() => `https://lumelle.com/product/${config.handle}`, [config.handle])

  const ratingValue = config.ratingValueOverride ?? homeConfig.socialProof.rating
  const ratingCountLabel =
    config.ratingCountLabelOverride ??
    homeConfig.socialProof.count?.toString() ??
    '100+'

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
      navigate('/checkout')
    } catch (error) {
      console.error('Buy now failed:', error)
    } finally {
      setIsAdding(false)
    }
  }

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

  const essentials =
    sections?.essentials && sections.essentials.length > 0
      ? sections.essentials
      : config.essentials
  const reasons =
    sections?.reasons && sections.reasons.length > 0
      ? sections.reasons
      : config.reasons
  const faqs =
    sections?.faq && sections.faq.length > 0
      ? sections.faq
      : config.qa
  const how =
    sections?.how && sections.how.length > 0
      ? sections.how
      : config.how ?? []
  const care =
    sections?.care && sections.care.length > 0
      ? sections.care
      : config.care ?? []
  const featureCopy = config.featureCallouts ?? null
  const featuredTikTokHeading = config.featuredTikTokHeading

  return (
    <MarketingLayout navItems={navItems} primaryLabel="Add to Cart" onPrimaryAction={handleAddToCart} subtitle="Product">
      {/* Hero media + info */}
      {renderSections({
        gallery,
        activeImage,
        setActiveImage,
        price,
        compareAtPrice: config.compareAtPrice,
        discountPercentOverride: config.discountPercentOverride,
        badge: config.badge,
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
        careLabel: config.careLabelOverride,
        hideDetailsAccordion: config.hideDetailsAccordion,
        featureCopy,
        reasons,
        essentials,
        faqs,
        featuredTikTokHeading,
      })}
    </MarketingLayout>
  )
}

export default ProductPage
