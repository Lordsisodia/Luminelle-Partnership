import { SectionHeading } from '@/components/SectionHeading'
import { HighlightsCarousel } from './HighlightsCarousel'

export const HighlightsSection = () => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        eyebrow="Highlights"
        title="A closer look"
        description="Peek inside the comfort fit, moisture guard, and durable build that set Lumelle apart."
        alignment="center"
      />
      <div className="mt-10">
        <HighlightsCarousel
          items={[
            {
              src: '/uploads/luminele/product-feature-04.jpg',
              title: 'Comfort fit',
              badge: '01',
              description: 'Stretch satin band seals out humidity without leaving dents or marks.',
            },
            {
              src: '/uploads/luminele/product-feature-05.jpg',
              title: 'Moisture-guard lining',
              badge: '02',
              description: 'Dual-layer lining keeps frizz at bay while feeling feather-light.',
            },
            {
              src: '/uploads/luminele/product-feature-07.jpg',
              title: 'Reusable build',
              badge: '03',
              description: 'Premium stitching survives 100+ wears—no flimsy disposables.',
            },
          ]}
        />
      </div>
    </div>
  </section>
)
