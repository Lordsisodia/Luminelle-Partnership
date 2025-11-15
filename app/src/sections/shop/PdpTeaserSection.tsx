import { SectionHeading } from '@/components/SectionHeading'
import { PdpTeaserCard } from './PdpTeaserCard'

export const PdpTeaserSection = ({ data }: { data: { price: string; bullets: string[]; image: string; href: string } }) => (
  <section className="bg-brand-blush/20 py-16">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        eyebrow="Ready when you are"
        title="See full details"
        description="Materials, fit, care, and everything else—tap through to the product page."
        alignment="center"
      />
      <div className="mt-8" data-sticky-buy-target>
        <PdpTeaserCard data={data} />
      </div>
    </div>
  </section>
)

