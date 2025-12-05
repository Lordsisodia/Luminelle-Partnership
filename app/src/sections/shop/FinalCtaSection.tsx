import { SpinWheel } from './SpinWheel'

export const FinalCtaSection = () => (
  <section className="bg-white py-16 px-4 md:px-6">
    <div className="mx-auto max-w-5xl rounded-[3rem] border border-brand-peach/40 bg-gradient-to-br from-[#F9D8D0] via-[#FCEBE3] to-[#FDE7DA] p-8 text-center shadow-[0_25px_80px_rgba(249,165,138,0.35)] md:p-12">
      <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center md:text-left">
        <div className="text-center md:text-left">
          <h2 className="font-heading text-3xl font-bold text-brand-cocoa md:text-4xl">Spin the wheel to unlock your reward</h2>
        </div>
        <div className="flex justify-center">
          <SpinWheel />
        </div>
      </div>
    </div>
  </section>
)
