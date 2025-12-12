import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_VIDEO_SLOT } from '@/domains/products/data/product-config'
import { getConfig, loadProduct, loadSections } from '@/domains/products/data/product-loaders'

export const useProductContent = (handle: string) => {
  const config = getConfig(handle)
  const isCurler = config.handle.startsWith('satin-overnight-curler')
  const videoSlot = config.videoSlot ?? DEFAULT_VIDEO_SLOT

  const baseGallery = useMemo(() => {
    const g = config.gallery ?? []
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

  useEffect(() => {
    setActiveImage(0)
    setVariantId(config.fallbackVariantId ?? null)
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
          setGallery([...p.images, videoSlot])
        }
      })
      .catch(() => undefined)

    loadSections(handle)
      .then((s) => {
        if (!s) return
        setSections(s)
        if (s.heroSubtitle) setProductDesc(s.heroSubtitle)
        if (!isCurler && s.gallery && s.gallery.length > 0) setGallery([...s.gallery, videoSlot])
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
