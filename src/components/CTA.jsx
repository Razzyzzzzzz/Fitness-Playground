
import { Dumbbell } from 'lucide-react'
import Reveal from './Reveal'
import bg from '../assets/p14.png'

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden bg-black py-24 sm:min-h-[500px] lg:min-h-[580px]"
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 -z-20 bg-black/70" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/45 to-black/90" />

      {/* RED LIGHT EFFECT */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(220,20,35,0.20),transparent_65%)]" />

      {/* ACCENT LINES */}
      <div className="absolute inset-x-0 top-0 h-px bg-accent/70" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-accent/70" />

      <Reveal className="section relative z-10">
        <div className="mx-auto max-w-5xl text-center">

          {/* BRAND ICON */}
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center border border-accent/50 bg-accent/10 text-accent">
            <Dumbbell size={27} />
          </div>

          {/* BRAND LABEL */}
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-accent sm:text-xs">
            FITNESS PLAYGROUND
          </p>

          {/* MAIN HEADLINE */}
          <h2 className="h-display text-5xl uppercase leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Built Through
            <span className="mt-3 block text-accent">
              Discipline.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-8 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
            A place where strength is developed, limits are
            challenged, and progress becomes part of everyday life.
          </p>

          {/* BOTTOM BRANDING */}
          <div className="mt-14 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-accent/70" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
              Train. Build. Repeat.
            </span>

            <span className="h-px w-10 bg-accent/70" />
          </div>

        </div>
      </Reveal>
    </section>
  )
}
