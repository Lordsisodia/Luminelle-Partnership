import { productConfigs } from './product-config'
import type { ProductConfig } from './product-types'
import { fetchProductByHandle as legacyFetch } from '@/lib/product'
import { fetchSections as legacySections } from '@/lib/sections'

export type LoadedProduct = Partial<{
  title: string
  description: string
  price: number
  variantId: string | null
  images: string[]
}>

// Guard against stub data overwriting hard-coded defaults
const isStub = (p: any) => {
  if (!p) return true
  const t = (p.title || '').toLowerCase()
  const d = (p.description || '').toLowerCase()
  return t.includes('stub product') || d.includes('placeholder')
}

export async function loadProduct(handle: string): Promise<LoadedProduct | null> {
  try {
    const config = getConfig(handle)
    const resolvedHandle = config.handle || handle
    const p = await legacyFetch(resolvedHandle)
    if (isStub(p)) return null
    return {
      title: p.title,
      description: p.description,
      price: p.price?.amount ? Number(p.price.amount) : undefined,
      variantId: p.variantId ?? null,
      images: Array.isArray(p.images) ? p.images : undefined,
    }
  } catch {
    return null
  }
}

export async function loadSections(handle: string) {
  const config = getConfig(handle)
  // Sections are currently stored as global Shopify metaobjects (hero/faq/how/etc).
  // Until these metaobjects are keyed per product, only apply them to the shower cap PDP
  // to avoid cross-product copy/media leaking onto other products (e.g., the curler).
  if (config.handle !== productConfigs['shower-cap'].handle) return null
  try {
    return await legacySections()
  } catch {
    return null
  }
}

export function getConfig(handle: string): ProductConfig {
  return productConfigs[handle] ?? productConfigs['shower-cap']
}
