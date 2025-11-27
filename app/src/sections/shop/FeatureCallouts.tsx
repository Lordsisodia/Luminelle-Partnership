import type { ComponentType } from 'react'
import { Crown, Droplets, Leaf, Heart } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'

type FeatureCallout = {
  icon?: ComponentType<{ className?: string }>
  title: string
  desc: string
}

type Heading = {
  eyebrow?: string
  title?: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
}

type FeatureCalloutsProps = {
  items?: FeatureCallout[]
  heading?: Heading
  sectionId?: string
  className?: string
  variant?: 'cards' | 'story'
  mediaSrc?: string
  mediaAlt?: string
  mediaLabel?: string
  mediaNote?: string
}

const defaultHeading: Required<Heading> = {
  eyebrow: 'Features',
  title: 'Small details, big results',
  description: 'Thoughtful materials and construction that protect your style and feel great to wear.',
  alignment: 'center',
}

const defaultItems: FeatureCallout[] = [
  { icon: Droplets, title: 'Waterproof', desc: 'Moisture‑guard lining keeps styles intact.' },
  { icon: Heart, title: 'Comfort fit', desc: 'Soft, secure band — no marks.' },
  { icon: Leaf, title: 'Reusable', desc: 'Durable build that replaces disposables.' },
  { icon: Crown, title: 'Premium feel', desc: 'Luxe materials designed to last.' },
]

const iconCycle = [Droplets, Heart, Leaf, Crown]

export const FeatureCallouts = ({
  items,
  heading,
  sectionId,
  className,
  variant = 'cards',
  mediaSrc,
  mediaAlt,
  mediaLabel,
  mediaNote,
}: FeatureCalloutsProps) => {
  const resolvedHeading = {
    ...defaultHeading,
    ...heading,
    alignment: heading?.alignment ?? defaultHeading.alignment,
  }
  const list = (items ?? defaultItems).map((item, idx) => ({
    ...item,
    icon: item.icon ?? iconCycle[idx % iconCycle.length],
  }))

  if (variant === 'story') {
    const image = mediaSrc ?? '/uploads/luminele/product-feature-06.jpg'
    return (
      <section id={sectionId} className={`${className ?? 'bg-white'} py-16`}>
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            eyebrow={resolvedHeading.eyebrow}
            title={resolvedHeading.title}
            description={resolvedHeading.description}
            alignment="left"
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
            <div className="rounded-3xl border border-brand-peach/50 bg-gradient-to-br from-brand-blush/60 via-white to-brand-peach/30 p-4 shadow-[0_25px_70px_rgba(0,0,0,0.08)]">
              <div className="overflow-hidden rounded-2xl border border-white/40 bg-white">
                <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                  <img src={image} alt={mediaAlt ?? 'Lumelle shower cap in use'} className="h-full w-full object-cover" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/85 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-cocoa shadow-soft backdrop-blur">
                    {mediaLabel ?? 'Less breakage'}
                  </div>
                  <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-brand-cocoa shadow-soft backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-brand-peach" />
                    Safe for silk press
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-brand-blush/50 px-4 py-3 text-sm text-brand-cocoa/80">
                  <span className="font-semibold">{mediaNote ?? 'Soft satin band prevents pulling'}</span>
                  <span className="rounded-full bg-brand-peach/20 px-3 py-1 text-xs font-semibold text-brand-cocoa">Creator-tested</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-brand-peach/50 bg-white/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-6">
              <div className="flex flex-col gap-4">
                {list.map(({ title, desc }, idx) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-2xl border border-brand-blush/60 bg-brand-blush/15 p-4 transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.06)]"
                  >
                    <span className="mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-peach/80 text-base font-extrabold text-brand-cocoa shadow-soft">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="font-heading text-lg font-bold text-brand-cocoa">{title}</div>
                      <p className="text-sm leading-snug text-brand-cocoa/80">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={sectionId} className={`${className ?? 'bg-white'} py-16`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow={resolvedHeading.eyebrow}
          title={resolvedHeading.title}
          description={resolvedHeading.description}
          alignment={resolvedHeading.alignment === 'right' ? 'center' : resolvedHeading.alignment}
        />
        <div className="mt-8 rounded-3xl border border-brand-peach/40 bg-white/90 p-6 shadow-soft md:p-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {list.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-5">
                <div className="flex items-start gap-3">
                  {Icon ? (
                    <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-peach/60 text-brand-cocoa">
                      <Icon className="h-5 w-5" />
                    </span>
                  ) : null}
                  <div>
                    <div className="font-heading text-lg font-bold text-brand-cocoa">{title}</div>
                    <p className="mt-1 text-sm text-brand-cocoa/75">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
