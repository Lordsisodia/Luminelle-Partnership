import { SectionHeading } from '@/components/SectionHeading'
import { OfferCarousel } from './OfferCarousel'

type Slide = { title: string; copy: string; image: string; ctaHref: string; tag?: string; proof?: string }

export const BenefitsSection = ({ slides }: { slides: Slide[] }) => (
  <section className="bg-white py-12">
    <div className="mx-auto max-w-6xl px-4 md:px-0 lg:px-0">
      <SectionHeading
        eyebrow="Benefits"
        title="Why you’ll love it"
        description="Effortless to put on, frizz-free when you take it off—your small daily luxury."
        alignment="center"
      />
      <div className="mt-6">
        <OfferCarousel slides={slides} />
      </div>
    </div>
  </section>
)
