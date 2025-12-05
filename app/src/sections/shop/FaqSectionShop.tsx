import { useMemo, useState } from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { Plus, Minus } from 'lucide-react'

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
  hideCta?: boolean
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

export const FaqSectionShop = ({ items, heading, sectionId, ctaHref, ctaLabel, hideCta = false }: Props) => {
  const [query] = useState('')
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
  const resolvedCta = hideCta
    ? null
    : {
        href: ctaHref ?? defaultCta.href,
        label: ctaLabel ?? defaultCta.label,
      }

  return (
    <section id={sectionId ?? 'faq'} className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title ?? ''}
          description={resolvedHeading.description}
          alignment={resolvedHeading.alignment === 'right' ? 'center' : resolvedHeading.alignment}
        />

        {resolvedCta ? (
          <div className="mt-6 flex justify-center">
            <a
              href={resolvedCta.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-cocoa px-5 py-3 text-sm font-semibold text-white shadow-soft"
            >
              {resolvedCta.label}
            </a>
          </div>
        ) : null}

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
                {isOpen ? (
                  f.a.toLowerCase().startsWith('customer review') ? (
                    <div className="mt-3 space-y-2 rounded-2xl bg-brand-blush/15 p-4">
                      <div className="flex flex-wrap items-center gap-2 text-brand-cocoa">
                        <span className="rounded-full bg-brand-peach/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-cocoa">
                          Customer review
                        </span>
                        <span className="text-sm font-semibold text-brand-cocoa">★★★★★</span>
                      </div>
                      <p className="text-sm leading-relaxed text-brand-cocoa/85">
                        {f.a.replace(/^customer review\s*·?\s*5★:\s*/i, '')}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed text-brand-cocoa/75">{f.a}</p>
                  )
                ) : null}
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
