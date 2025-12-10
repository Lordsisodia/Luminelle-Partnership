import { useEffect } from 'react'
import { SimpleLayout } from '@/layouts/SimpleLayout'
import { legalIntro, samplePrivacySections } from '@/content/legal'
import { setMetaTags, injectJsonLd } from '@/lib/seo'

export const PrivacyPage = () => {
  useEffect(() => {
    const url = 'https://lumelle.com/privacy'
    setMetaTags({
      title: 'Privacy Policy | Lumelle',
      description: 'How Lumelle collects, uses, and protects your data for shopping and support.',
      url,
      type: 'website',
    })
    injectJsonLd('privacy-breadcrumb', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumelle.com/' },
        { '@type': 'ListItem', position: 2, name: 'Privacy', item: url },
      ],
    })
  }, [])

  return (
    <SimpleLayout
      title={legalIntro.privacy.title}
      description={`${legalIntro.privacy.updated} · ${legalIntro.privacy.summary}`}
    >
      {samplePrivacySections.map((section) => (
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

export default PrivacyPage
