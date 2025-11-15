import { SectionHeading } from '@/components/SectionHeading'
import { SocialProofStrip } from './SocialProofStrip'

export const SocialProofSection = ({
  rating,
  count,
  tagline,
}: {
  rating: number
  count: number
  tagline: string
}) => (
  <section className="bg-white py-12">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        eyebrow="Trusted by 1,500+"
        title="Loved by our customers"
        description="Average rating shown across TikTok Shop and verified store reviews."
        alignment="center"
      />
      <div className="mt-6 flex justify-center">
        <SocialProofStrip data={{ rating, count, tagline }} />
      </div>
    </div>
  </section>
)
