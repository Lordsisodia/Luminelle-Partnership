import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

export const ProblemSolutionGrid = ({
  data,
}: {
  data: { problems: string[]; solutions: string[] }
}) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
      <div className="rounded-[28px] border border-rose-200 bg-[#FFF2F2] p-6 text-rose-900 shadow-[0_12px_30px_rgba(249,176,176,0.25)]">
        <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-500">
          <span className="inline-block h-2 w-2 rounded-full bg-rose-400" />
          Common issues
        </div>
        <ul className="space-y-4 text-sm leading-relaxed">
          {data.problems.map((p, i) => (
            <li key={i} className="flex gap-3">
              <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
              <span className="text-base text-rose-900/90">{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden items-center justify-center lg:flex">
        <div className="flex flex-col items-center text-center text-brand-cocoa/60">
          <ArrowRight className="h-8 w-8" />
          <span className="text-xs font-semibold tracking-[0.3em]">Lumelle solves it</span>
        </div>
      </div>
      <div className="rounded-[28px] border border-emerald-200 bg-[#EBFAF3] p-6 text-brand-cocoa shadow-[0_18px_40px_rgba(51,143,102,0.18)]">
        <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-700">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Our solution
        </div>
        <ul className="space-y-4 text-sm leading-relaxed">
          {data.solutions.map((s, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
              <span className="text-base text-brand-cocoa/90">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
