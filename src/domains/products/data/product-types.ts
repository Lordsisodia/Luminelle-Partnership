export type ProductConfig = {
  handle: string
  fallbackVariantId?: string | null
  fallbackItemId?: string
  defaultTitle: string
  defaultSubtitle: string
  defaultPrice?: number
  compareAtPrice?: number
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
