import { useMemo, useState } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { Search, Plus, Minus } from 'lucide-react'

type FAQItem = { q: string; a: string }

type Heading = {
  eyebrow?: string
  title?: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
}

type Props = {
  items: FAQItem[]
  heading?: Heading
  sectionId?: string
  ctaHref?: string
  ctaLabel?: string
}

const defaultHeading: Heading = {
  eyebrow: 'Frequently asked',
  title: 'Answers before you buy',
  description: "If you don't see your question here, reach out to us and we'll help right away.",
  alignment: 'center',
}

const defaultCta = {
  href: 'https://wa.me/message/lumellecaps',
  label: 'Chat with WhatsApp concierge',
}

export const FaqSectionShop = ({ items, heading, sectionId, ctaHref, ctaLabel }: Props) => {
  const [query, setQuery] = useState('')
  const [openIndex, setOpenIndex] = useState(0)

  const normalizedQuery = query.toLowerCase().trim()
  const filtered = useMemo(() => {
    if (!normalizedQuery) return items
    return items.filter((item) => `${item.q} ${item.a}`.toLowerCase().includes(normalizedQuery))
  }, [items, normalizedQuery])

  const visibleItems = filtered.length ? filtered : items
  const resolvedHeading = {
    ...defaultHeading,
    ...heading,
    alignment: heading?.alignment ?? defaultHeading.alignment,
  }
  const resolvedCta = {
    href: ctaHref ?? defaultCta.href,
    label: ctaLabel ?? defaultCta.label,
  }

  return (
    <section id={sectionId ?? 'faq'} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title}
          description={resolvedHeading.description}
          alignment={resolvedHeading.alignment}
        />

        <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-brand-peach/30 bg-brand-blush/10 p-4 md:flex-row md:items-center">
          <label htmlFor="faq-search" className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <Search className="h-5 w-5 text-brand-cocoa/50" />
            <input
              id="faq-search"
              type="search"
              placeholder="Search waterproofing, fit, travel..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border-none bg-transparent text-sm text-brand-cocoa placeholder:text-brand-cocoa/50 focus:outline-none"
            />
          </label>
          <a
            href={resolvedCta.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-brand-cocoa px-5 py-3 text-sm font-semibold text-white shadow-soft"
          >
            {resolvedCta.label}
          </a>
        </div>

        <div className="mt-8 space-y-4">
          {visibleItems.map((f) => {
            const idx = items.indexOf(f)
            const isOpen = openIndex === idx
            return (
              <div
                key={`${f.q}-${idx}`}
                className={`rounded-3xl border bg-white/95 p-5 shadow-sm transition ${
                  isOpen ? 'border-brand-cocoa/30 shadow-lg' : 'border-brand-peach/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-brand-cocoa">{f.q}</span>
                  {isOpen ? <Minus className="h-5 w-5 text-brand-cocoa" /> : <Plus className="h-5 w-5 text-brand-cocoa/60" />}
                </button>
                {isOpen ? <p className="mt-3 text-sm leading-relaxed text-brand-cocoa/75">{f.a}</p> : null}
              </div>
            )
          })}
          {!filtered.length && (
            <p className="rounded-2xl border border-dashed border-brand-peach/60 bg-white/80 p-4 text-center text-sm text-brand-cocoa/70">
              No answers matched that search—reset the filter or send us a quick WhatsApp message.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
