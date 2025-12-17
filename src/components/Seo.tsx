import { Helmet } from 'react-helmet-async'

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
  const fullTitle = pageTitle ? `${siteTitle} | ${pageTitle}` : siteTitle

  return (
    <Helmet>
      {/* Standard */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}

      {/* JSON-LD */}
      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  )
}
