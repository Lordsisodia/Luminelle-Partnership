export type Product = {
  id: string
  title: string
  description: string
  price: { amount: number; currencyCode?: string }
  images: string[]
  variantId: string
}

import { runStorefront, shopifyEnabled } from '@platform/commerce/shopify'

const FALLBACK_IMAGE = '/uploads/luminele/product-main.webp'

type StorefrontMoney = {
  amount: string
  currencyCode: string
}

type StorefrontVariant = {
  id: string
  availableForSale?: boolean
  price: StorefrontMoney
}

type StorefrontImage = {
  url: string
}

type ProductByHandleResponse = {
  productByHandle: null | {
    id: string
    title: string
    description: string
    featuredImage?: StorefrontImage | null
    images?: { nodes?: StorefrontImage[] | null } | null
    variants: { nodes: StorefrontVariant[] }
  }
}

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      featuredImage {
        url
      }
      images(first: 12) {
        nodes {
          url
        }
      }
      variants(first: 20) {
        nodes {
          id
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

export const fetchProduct = async (id: string): Promise<Product> => {
  // Legacy placeholder; replaced when Shopify is configured and callers use `fetchProductByHandle`.
  return {
    id,
    title: 'Stub product',
    description: 'Placeholder description',
    price: { amount: 0, currencyCode: 'GBP' },
    images: [FALLBACK_IMAGE],
    variantId: id,
  }
}

export const fetchProductByHandle = async (handle: string): Promise<Product> => {
  if (!shopifyEnabled) return fetchProduct(handle)

  const data = await runStorefront<ProductByHandleResponse>(PRODUCT_BY_HANDLE_QUERY, { handle })
  const p = data.productByHandle
  if (!p) throw new Error(`Shopify product not found for handle: ${handle}`)

  const firstVariant = p.variants.nodes[0]
  if (!firstVariant) throw new Error(`Shopify product has no variants: ${handle}`)

  const amount = Number(firstVariant.price.amount)
  const currencyCode = firstVariant.price.currencyCode

  const images = (p.images?.nodes ?? [])
    .map((img) => img?.url)
    .filter((url): url is string => typeof url === 'string' && url.length > 0)

  const mergedImages = images.length
    ? images
    : p.featuredImage?.url
      ? [p.featuredImage.url]
      : [FALLBACK_IMAGE]

  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: {
      amount: Number.isFinite(amount) ? amount : 0,
      currencyCode,
    },
    images: mergedImages,
    variantId: firstVariant.id,
  }
}
