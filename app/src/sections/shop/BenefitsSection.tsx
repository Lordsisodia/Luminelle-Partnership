import { SectionHeading } from '@/components/SectionHeading'
import { OfferCarousel } from './OfferCarousel'
import { Star } from 'lucide-react'

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
      <div className="mt-6 rounded-[2.5rem] border border-brand-peach/40 bg-white p-4 shadow-soft md:p-6">
        <OfferCarousel slides={slides} />
        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-brand-cocoa/70 md:flex-row md:justify-between">
          <div className="inline-flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-400" />
            <span>4.9 ★ average from 1,240 shoppers</span>
          </div>
          <a href="#comparison" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-cocoa underline-offset-4 hover:underline">
            Compare all features →
          </a>
        </div>
      </div>
    </div>
  </section>
)
