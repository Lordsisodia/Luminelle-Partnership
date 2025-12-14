/* @ts-nocheck */
import SpinWheel from './SpinWheel'

export const FinalCtaSection = () => (
  <section className="bg-white py-16 px-4 md:px-6">
    <div className="mx-auto max-w-5xl rounded-[3rem] border border-semantic-accent-cta/40 bg-gradient-to-br from-[#F9D8D0] via-[#FCEBE3] to-[#FDE7DA] p-8 text-center shadow-[0_25px_80px_rgba(249,165,138,0.35)] md:p-12">
      <div className="flex flex-col items-center gap-8 md:gap-10">
        <h2 className="max-w-3xl text-center font-heading text-3xl font-bold leading-tight text-semantic-text-primary md:text-4xl">
          Spin the wheel to unlock your reward
        </h2>
        <div className="flex w-full justify-center">
          <SpinWheel />
        </div>
      </div>
    </div>
  </section>
)
