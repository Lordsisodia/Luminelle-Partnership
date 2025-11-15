import { SectionHeading } from '@/components/SectionHeading'
import { UgcStrip } from './UgcStrip'

export const UgcSection = ({ items }: { items: { src: string; type: 'image' | 'video'; caption?: string }[] }) => (
  <section className="bg-white py-16">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        eyebrow="In the wild"
        title="Real routines, real results"
        description="Snapshots from the Lumelle community—swipe for everyday inspiration."
        alignment="center"
      />
      <div className="mt-8">
        <UgcStrip items={items} />
      </div>
    </div>
  </section>
)
