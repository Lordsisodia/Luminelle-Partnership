import { SectionHeading } from '@/components/SectionHeading'
import { OfferCarousel } from './OfferCarousel'

type Slide = { title: string; copy: string; image: string; ctaHref: string; tag?: string; proof?: string }

export const BenefitsSection = ({ slides }: { slides: Slide[] }) => (
  <section className="bg-white py-12">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        eyebrow="Benefits"
        title="Why you’ll love it"
        description="Every feature solves a creator pain point—from frizz control to durable finishes."
        alignment="center"
      />
      <div className="mt-6">
        <OfferCarousel slides={slides} />
      </div>
    </div>
  </section>
)
