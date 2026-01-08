import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_VIDEO_SLOT } from '@client/shop/products/data/product-config'
import { getConfig, loadProduct, loadSections } from '@client/shop/products/data/product-loaders'

export const useProductContent = (handle: string) => {
  const config = getConfig(handle)
  const isCurler = config.handle.startsWith('satin-overnight-curler')
  const videoSlot = config.videoSlot ?? DEFAULT_VIDEO_SLOT

  const sanitizeGallery = (items: unknown[]): string[] => {
    const strings = items.filter((item): item is string => typeof item === 'string' && item.length > 0)
    // Guard: never allow remote/admin-provided `video://...` slots to leak across products.
    // We always re-append the product's own `videoSlot` at the end.
    const withoutVideos = strings.filter((src) => !src.startsWith('video://'))
    // De-dupe while keeping order (helps avoid repeated thumbs).
    const unique: string[] = []
    const seen = new Set<string>()
    for (const src of withoutVideos) {
      if (seen.has(src)) continue
      seen.add(src)
      unique.push(src)
    }
    return unique
  }

  const baseGallery = useMemo(() => {
    const g = config.gallery ?? []
    const withoutDup = g.filter((src) => src !== videoSlot)
    return [...withoutDup, videoSlot]
  }, [config, videoSlot])

  const [activeImage, setActiveImage] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [variantId, setVariantId] = useState<string | null>(config.fallbackVariantKey ?? null)
  const [price, setPrice] = useState<number>(config.defaultPrice ?? 15)
  const [gallery, setGallery] = useState<string[]>(baseGallery)
  const [sections, setSections] = useState<any>(null)
  const [productTitle, setProductTitle] = useState(config.defaultTitle)
  const [productDesc, setProductDesc] = useState(config.defaultSubtitle)

  useEffect(() => {
    setActiveImage(0)
    setVariantId(config.fallbackVariantKey ?? null)
    setPrice(config.defaultPrice ?? 15)
    setGallery(baseGallery)
    setSections(null)
    setProductTitle(config.defaultTitle)
    setProductDesc(config.defaultSubtitle)
  }, [config, baseGallery])

  useEffect(() => {
    loadProduct(handle)
      .then((p: any) => {
        const isStub = !p || /stub product/i.test(p.title ?? '') || /placeholder/i.test(p.description ?? '')
        if (!p || isStub) return

        if (p.variantId) setVariantId(p.variantId)
        if (p.price) setPrice(Number(p.price))
        if (p.title) setProductTitle(p.title)
        if (p.description) setProductDesc(p.description)
        if (!isCurler && Array.isArray(p.images) && p.images.length > 0) {
          setGallery([...sanitizeGallery(p.images), videoSlot])
        }
      })
      .catch(() => undefined)

    loadSections(handle)
      .then((s) => {
        if (!s) return
        setSections(s)
        if (s.heroSubtitle) setProductDesc(s.heroSubtitle)
        if (!isCurler && Array.isArray(s.gallery) && s.gallery.length > 0) {
          setGallery([...sanitizeGallery(s.gallery), videoSlot])
        }
      })
      .catch(() => undefined)
  }, [handle, isCurler, videoSlot])

  const heroImage = useMemo(() => {
    const primary = gallery.find((src) => !src.startsWith('video://'))
    return primary ? encodeURI(primary) : undefined
  }, [gallery])

  return {
    config,
    isCurler,
    videoSlot,
    gallery,
    setGallery,
    baseGallery,
    activeImage,
    setActiveImage,
    isAdding,
    setIsAdding,
    variantId,
    setVariantId,
    price,
    setPrice,
    sections,
    setSections,
    productTitle,
    setProductTitle,
    productDesc,
    setProductDesc,
    heroImage,
  }
}
