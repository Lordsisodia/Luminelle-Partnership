import { Helmet } from 'react-helmet-async'
import { toPublicUrl } from '@platform/seo/logic/publicBaseUrl'

interface SeoProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: string
  jsonLd?: object | object[]
}

export const Seo = ({ title, description, image, url, type = 'website', jsonLd }: SeoProps) => {
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []

  const siteTitle = 'LUMELLE™'
  const pageTitle = title.trim()
  const fullTitle = (() => {
    if (!pageTitle) return siteTitle

    const normalized = pageTitle.toLowerCase()
    if (normalized === 'lumelle' || normalized === 'lumelle™') return siteTitle

    const brandedMatch = pageTitle.match(/^\s*lumelle(?:™)?\s*(\||–|—|-|:)\s*(.*)$/i)
    if (brandedMatch) {
      const separator = brandedMatch[1]
      const rest = brandedMatch[2]?.trim()
      if (!rest) return siteTitle
      if (separator === ':') return `${siteTitle}: ${rest}`
      return `${siteTitle} ${separator} ${rest}`
    }

    return `${siteTitle} | ${pageTitle}`
  })()
  const resolvedUrl = url ? toPublicUrl(url) : undefined

  const resolvedImage = (() => {
    if (!image) return undefined
    const trimmed = image.trim()
    if (!trimmed) return undefined
    if (trimmed.startsWith('data:') || trimmed.startsWith('blob:') || trimmed.startsWith('video://')) return trimmed
    return toPublicUrl(trimmed)
  })()

  return (
    <Helmet>
      {/* Standard */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {resolvedUrl && <meta property="og:url" content={resolvedUrl} />}
      {resolvedImage && <meta property="og:image" content={resolvedImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {resolvedImage && <meta name="twitter:image" content={resolvedImage} />}

      {/* Canonical */}
      {resolvedUrl && <link rel="canonical" href={resolvedUrl} />}

      {/* JSON-LD */}
      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  )
}
