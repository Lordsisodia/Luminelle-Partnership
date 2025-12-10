import { runStorefront } from './shopify'

export type Sections = {
  heroSubtitle?: string
  essentials?: { title: string; body: string }[]
  reasons?: { title: string; desc: string }[]
  how?: string[]
  care?: { icon?: string; title: string; body: string }[]
  faq?: { q: string; a: string }[]
  gallery?: string[]
}

export async function fetchProductSections(handle: string): Promise<Sections | null> {
  const useServer = (import.meta.env.VITE_USE_SERVER_CART as any) === '1'
  if (useServer) {
    const res = await fetch(`/api/storefront/product/sections?handle=${encodeURIComponent(handle)}`)
    if (!res.ok) return null
    const json = await res.json()
    return normalizeFields(json.sections || [])
  }
  const data = await runStorefront<any>(
    `#graphql
    query Sections($handle: String!) {
      product(handle: $handle) {
        metafield(namespace: "custom", key: "sections") {
          reference { ... on Metaobject { fields { key value } } }
        }
      }
    }
  `,
    { handle },
  )
  const fields = data?.product?.metafield?.reference?.fields || []
  return normalizeFields(fields)
}

function normalizeFields(fields: { key: string; value: string }[]): Sections {
  const m = new Map<string, string>(fields.map((f: any) => [f.key, f.value]))
  const parse = <T>(k: string): T | undefined => {
    const v = m.get(k)
    if (!v) return undefined as any
    try { return JSON.parse(v) as T } catch { return undefined as any }
  }
  return {
    heroSubtitle: m.get('heroSubtitle') || m.get('hero_subtitle') || undefined,
    essentials: parse('essentials'),
    reasons: parse('reasons'),
    how: parse('how'),
    care: parse('care'),
    faq: parse('faq'),
    gallery: parse('gallery'),
  }
}

