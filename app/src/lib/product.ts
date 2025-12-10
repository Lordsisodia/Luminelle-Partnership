import { runStorefront } from './shopify'

export type StorefrontProduct = {
  id: string
  title: string
  description?: string
  featuredImage?: { url: string }
  variantId?: string
  price?: { amount: number; currencyCode: string }
  images?: string[]
}

export async function fetchProductByHandle(handle: string): Promise<StorefrontProduct | null> {
  const useServer = (import.meta.env.VITE_USE_SERVER_CART as any) === '1'
  if (useServer) {
    const res = await fetch(`/api/storefront/product/by-handle?handle=${encodeURIComponent(handle)}`)
    if (!res.ok) return null
    const json = await res.json()
    const p = json.product
    if (!p) return null
    const edge = p.variants?.edges?.[0]?.node
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      featuredImage: p.featuredImage,
      variantId: edge?.id,
      price: edge?.price ? { amount: Number(edge.price.amount), currencyCode: edge.price.currencyCode } : undefined,
      images: Array.isArray(p.images?.edges) ? p.images.edges.map((e: any) => e.node.url) : undefined,
    }
  }
  const data = await runStorefront<any>(
    `#graphql
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        featuredImage { url }
        variants(first: 1) {
          edges { node { id title price: priceV2 { amount currencyCode } } }
        }
        images(first: 10) { edges { node { url } } }
      }
    }
  `,
    { handle },
  )
  const p = data.product
  if (!p) return null
  const edge = p.variants?.edges?.[0]?.node
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    featuredImage: p.featuredImage,
    variantId: edge?.id,
    price: edge?.price ? { amount: Number(edge.price.amount), currencyCode: edge.price.currencyCode } : undefined,
    images: Array.isArray(p.images?.edges) ? p.images.edges.map((e: any) => e.node.url) : undefined,
  }
}
