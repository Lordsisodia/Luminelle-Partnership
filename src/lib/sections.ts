import { runStorefront } from '@platform/commerce/shopify'

export type Sections = {
  heroSubtitle?: string
  essentials?: { title: string; body: string }[]
  reasons?: { title: string; desc: string }[]
  how?: string[]
  care?: { icon?: string; title: string; body: string }[]
  faq?: { q: string; a: string }[]
  gallery?: string[]
}

const safeJsonParse = <T,>(raw: unknown, fallback: T): T => {
  if (typeof raw !== 'string' || !raw.trim()) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export const fetchSections = async () => {
  const data = await runStorefront<any>(`
      {
        heroSubtitle: metaobject(handle: { handle: "hero", type: "hero_section" }) {
          subtitle: field(key: "subtitle") { value }
        }
        essentials: metaobject(handle: { handle: "essentials", type: "essentials_section" }) {
          title: field(key: "title") { value }
          body: field(key: "body") { value }
        }
        reasons: metaobject(handle: { handle: "reasons", type: "reasons_section" }) {
          title: field(key: "title") { value }
          desc: field(key: "description") { value }
        }
        how: metaobject(handle: { handle: "how", type: "how_section" }) {
          items: field(key: "items") { value }
        }
        care: metaobject(handle: { handle: "care", type: "care_section" }) {
          items: field(key: "items") { value }
        }
        faq: metaobject(handle: { handle: "faq", type: "faq_section" }) {
          items: field(key: "items") { value }
        }
        gallery: metaobject(handle: { handle: "gallery", type: "gallery_section" }) {
          items: field(key: "items") { value }
        }
      }
    `)

  const sections: Sections = {
    heroSubtitle: data?.heroSubtitle?.subtitle?.value ?? undefined,
    essentials: data?.essentials?.title?.value ? safeJsonParse(data.essentials.body?.value, []) : [],
    reasons: data?.reasons?.title?.value ? safeJsonParse(data.reasons.desc?.value, []) : [],
    how: safeJsonParse(data?.how?.items?.value, []),
    care: safeJsonParse(data?.care?.items?.value, []),
    faq: safeJsonParse(data?.faq?.items?.value, []),
    gallery: safeJsonParse(data?.gallery?.items?.value, []),
  }

  return sections
}
