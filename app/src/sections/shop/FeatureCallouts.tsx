import { Crown, Droplets, Leaf, Heart } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'

const items = [
  { icon: Droplets, title: 'Waterproof', desc: 'Moisture‑guard lining keeps styles intact.' },
  { icon: Heart, title: 'Comfort fit', desc: 'Soft, secure band — no marks.' },
  { icon: Leaf, title: 'Reusable', desc: 'Durable build that replaces disposables.' },
  { icon: Crown, title: 'Premium feel', desc: 'Luxe materials designed to last.' },
]

export const FeatureCallouts = () => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        eyebrow="Features"
        title="Small details, big results"
        description="Thoughtful materials and construction that protect your style and feel great to wear."
        alignment="center"
      />
      <div className="mt-8 rounded-3xl border border-brand-peach/40 bg-white/90 p-6 shadow-soft md:p-8">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-brand-blush/60 bg-brand-blush/20 p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-peach/60 text-brand-cocoa">
                <Icon className="h-5 w-5" />
              </div>
              <div className="font-heading text-lg text-brand-cocoa">{title}</div>
              <p className="text-sm text-brand-cocoa/75">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)
