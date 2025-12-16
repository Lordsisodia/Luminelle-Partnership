import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ProductPage } from '@/domains/products/ui/pages/ProductPage'
import { useProductContent } from '@/domains/products/hooks/useProductContent'

// This page renders the real PDP at a mobile width. It can receive draft data via postMessage
// from the admin editor without needing a save.
export default function ProductPreviewFramePage() {
  const { handle = 'shower-cap' } = useParams<{ handle: string }>()
  const resolvedHandle = handle === 'cloudsoft-heatless-curl-kit' ? 'satin-overnight-curler' : handle
  const content = useProductContent(resolvedHandle)

  // Apply incoming draft overrides (title, subtext, price, gallery, reviews) when sent via postMessage.
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!event.data || event.data.type !== 'admin-draft-product' || event.data.handle !== handle) return
      const draft = event.data.payload || {}
      if (draft.gallery) content.setGallery(draft.gallery)
      if (draft.price) content.setPrice(Number(draft.price))
      if (draft.productTitle) content.setProductTitle(draft.productTitle)
      if (draft.productDesc) content.setProductDesc(draft.productDesc)
      // rating/reviews are driven by config overrides; not updating here unless added later.
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [content, handle])

  // Constrain to mobile width even on desktop
  const wrapperStyle = useMemo(
    () => ({ maxWidth: 393, minWidth: 393, minHeight: 844, margin: '0 auto' }),
    []
  )

  return (
    <div style={wrapperStyle} className="bg-white">
      <ProductPage />
    </div>
  )
}
