import { useEffect } from 'react'
import { SimpleLayout } from '@/layouts/SimpleLayout'
import { legalIntro, sampleTermsSections } from '@/content/legal'
import { setMetaTags, injectJsonLd } from '@/lib/seo'

export const TermsPage = () => {
  useEffect(() => {
    const url = 'https://lumelle.com/terms'
    setMetaTags({
      title: 'Terms of Service | Lumelle',
      description: 'Read Lumelle’s terms of service covering purchases, returns, and site usage.',
      url,
      type: 'website',
    })
    injectJsonLd('terms-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumelle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Terms', item: url },
      ],
    })
  }, [])

  return (
    <SimpleLayout
      title={legalIntro.terms.title}
      description={`${legalIntro.terms.updated} · ${legalIntro.terms.summary}`}
    >
      {sampleTermsSections.map((section) => (
        <section key={section.heading} className="space-y-2">
          <h2 className="font-heading text-xl text-brand-cocoa">
            {section.heading}
          </h2>
          <p>{section.body}</p>
        </section>
      ))}
    </SimpleLayout>
  )
}

export default TermsPage
