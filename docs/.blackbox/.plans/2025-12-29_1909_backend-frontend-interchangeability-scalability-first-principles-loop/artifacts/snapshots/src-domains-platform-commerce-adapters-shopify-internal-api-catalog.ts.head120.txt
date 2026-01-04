import type { CatalogPort, ProductDTO, ProductVariantDTO } from '@platform/commerce/ports'
import { requestJson } from '@platform/http/internal-api/client'
import { toVariantKey } from './keyRegistry'

type ShopifyMoney = { amount: string; currencyCode: string }
type ShopifyProduct = {
  id: string
  title: string
  description?: string
  featuredImage?: { url?: string | null } | null
  images?: { edges?: Array<{ node?: { url?: string | null } | null } | null> | null } | null
  variants?: { edges?: Array<{ node?: { id: string; title?: string | null; price?: ShopifyMoney } | null } | null> | null } | null
}

export const createShopifyCatalogPort = (): CatalogPort => {
  return {
    async getProductByHandle(handle: string): Promise<ProductDTO> {
      const data = await requestJson<{ product: ShopifyProduct | null }>(`/api/storefront/product/by-handle?handle=${encodeURIComponent(handle)}`)
      const p = data.product
      if (!p) {
        // requestJson would likely have thrown 404 if endpoint does that; keep fallback.
        throw new Error(`Product not found: ${handle}`)
      }

      const images = (p.images?.edges ?? [])
        .map((e) => e?.node?.url ?? null)
        .filter((u): u is string => typeof u === 'string' && u.length > 0)
      const featured = p.featuredImage?.url ?? null
      const mergedImages = images.length ? images : featured ? [featured] : []

      const variantsRaw = (p.variants?.edges ?? []).map((e) => e?.node).filter((n): n is NonNullable<typeof n> => Boolean(n))
      const variants: ProductVariantDTO[] = variantsRaw.map((v) => ({
        variantKey: toVariantKey(v.id),
        title: v.title ?? undefined,
        available: true,
        unitPrice: {
          amount: Number(v.price?.amount ?? 0),
          currencyCode: v.price?.currencyCode ?? 'GBP',
        },
      }))

      const defaultVariantKey = variants[0]?.variantKey

      return {
        productKey: handle,
        handle,
        title: p.title,
        description: p.description ?? undefined,
        images: mergedImages,
        defaultVariantKey,
        variants,
      }
    },
  }
}
