import { productConfigs } from './product-config'
import type { ProductConfig } from './product-types'
import { fetchProductByHandle } from '@/lib/product'
import { fetchSections } from '@/lib/sections'
import { canonicalizeProductHandle } from './product-handle-aliases'

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
    const p = await fetchProductByHandle(resolvedHandle)
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
    return await fetchSections()
  } catch {
    return null
  }
}

export function getConfig(handle: string): ProductConfig {
  const canonical = canonicalizeProductHandle(handle)
  const direct = productConfigs[canonical]
  if (direct) return direct

  // Some callers pass the Shopify handle (e.g. `lumelle-shower-cap`) rather than our config key (e.g. `shower-cap`).
  const byHandle = Object.values(productConfigs).find((cfg) => cfg.handle === canonical)
  if (byHandle) return byHandle

  return productConfigs['shower-cap']
}
