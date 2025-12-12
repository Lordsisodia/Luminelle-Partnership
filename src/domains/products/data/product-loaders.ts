import { productConfigs } from './product-config'
import type { ProductConfig } from './product-types'
import { fetchProductByHandle as legacyFetch } from '@/lib/product'
import { fetchProductSections as legacySections } from '@/lib/sections'

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
    const p = await legacyFetch(handle)
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
  try {
    return await legacySections(handle)
  } catch {
    return null
  }
}

export function getConfig(handle: string): ProductConfig {
  return productConfigs[handle] ?? productConfigs['shower-cap']
}
