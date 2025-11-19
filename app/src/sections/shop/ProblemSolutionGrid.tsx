import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

export const ProblemSolutionGrid = ({
  data,
}: {
  data: { problems: string[]; solutions: string[] }
}) => {
  const pairs = data.problems.map((problem, idx) => ({
    problem,
    solution: data.solutions[idx] ?? '',
  }))

  return (
    <div className="space-y-3">
      {pairs.map((pair, idx) => (
        <div
          key={idx}
          className="grid min-w-0 gap-2 rounded-2xl border border-brand-peach/30 bg-white p-3 text-xs shadow-sm md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4 md:p-4 md:text-sm"
        >
          <div className="flex items-start gap-2 rounded-2xl bg-[#FFF2F2] p-3 text-rose-900">
            <XCircle className="h-4 w-4 flex-shrink-0 text-rose-500" />
            <span>{pair.problem}</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-cocoa/50">
            <ArrowRight className="h-4 w-4" />
            Fixes it
          </div>
          <div className="flex items-start gap-2 rounded-2xl bg-[#EBFAF3] p-3 text-brand-cocoa">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
            <span>{pair.solution}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
