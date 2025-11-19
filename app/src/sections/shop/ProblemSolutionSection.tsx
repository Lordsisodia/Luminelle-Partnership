import { SectionHeading } from '@/components/SectionHeading'
import { ProblemSolutionGrid } from './ProblemSolutionGrid'

export const ProblemSolutionSection = ({
  data,
}: {
  data: { problems: string[]; solutions: string[] }
}) => (
  <section className="bg-brand-blush/10 py-12">
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <SectionHeading
        eyebrow="Do you have these issues?"
        title="Swap problems for solutions"
        description="Common issues with flimsy, disposable caps versus how Lumelle’s lining and fit solve them."
        alignment="center"
      />
      <div className="mt-6 rounded-[2rem] border border-brand-peach/40 bg-white p-4 shadow-soft md:p-6">
        <ProblemSolutionGrid data={data} />
      </div>
    </div>
  </section>
)
