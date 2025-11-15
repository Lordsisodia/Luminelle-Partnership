import { SectionHeading } from '@/components/SectionHeading'
import { ProblemSolutionGrid } from './ProblemSolutionGrid'

export const ProblemSolutionSection = ({
  data,
}: {
  data: { problems: string[]; solutions: string[] }
}) => (
  <section className="bg-brand-blush/20 py-16">
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading
        eyebrow="Do you have these issues?"
        title="Swap problems for solutions"
        description="Common issues with flimsy, disposable caps versus how Lumelle’s lining and fit solve them."
        alignment="center"
      />
      <div className="mt-8 rounded-[2.5rem] border border-brand-peach/40 bg-white/95 p-6 shadow-soft md:p-10">
        <ProblemSolutionGrid data={data} />
        <p className="mt-6 text-center text-sm font-medium text-brand-cocoa/70">
          Lumelle’s moisture-guard lining and comfort seal remove every pain point on the left—no flimsy throwaways needed.
        </p>
      </div>
    </div>
  </section>
)
