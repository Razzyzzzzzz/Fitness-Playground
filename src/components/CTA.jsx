
import { ArrowRight, Dumbbell, Zap } from 'lucide-react'
import Reveal from './Reveal'
import bg from '../assets/p14.png'

export default function CTA() {
  const goToMembership = () => {
    document.getElementById('membership')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      id="cta"
      className="
        relative isolate overflow-hidden
        py-20 sm:py-24 lg:py-32
        text-center
      "
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="
          absolute inset-0 -z-20
          h-full w-full object-cover object-center
        "
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 -z-10 bg-black/75" />

      {/* GRADIENT OVERLAY */}
      <div className="
        absolute inset-0 -z-10
        bg-gradient-to-b
        from-black/80
        via-black/45
        to-black/90
      " />

      {/* RED LIGHT EFFECT */}
      <div className="
        absolute inset-0 -z-10
        bg-[radial-gradient(ellipse_at_center,rgba(220,20,35,0.22),transparent_65%)]
      " />

      {/* TOP AND BOTTOM ACCENTS */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-accent" />
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-accent" />

      {/* MAIN CONTENT */}
      <Reveal className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">

        {/* ICON */}
        <div className="
          w-14 h-14 sm:w-16 sm:h-16
          mx-auto mb-6
          flex items-center justify-center
          bg-accent/15 border border-accent/40
          text-accent
        ">
          <Dumbbell size={28} />
        </div>

        {/* EYEBROW */}
        <p className="
          eyebrow inline-flex items-center justify-center gap-2
          mb-5
        ">
          <Zap size={15} />
          READY WHEN YOU ARE
        </p>

        {/* HEADING */}
        <h2 className="
          h-display
          text-4xl sm:text-5xl md:text-6xl lg:text-8xl
          leading-[0.95]
          uppercase
        ">
          Your fitness journey
          <br />
          <span className="text-accent">
            Starts Here.
          </span>
        </h2>

        {/* DESCRIPTION */}
        <p className="
          mt-6 sm:mt-8
          max-w-2xl mx-auto
          text-white/75
          text-sm sm:text-base md:text-lg
          leading-relaxed
        ">
          Stop waiting for the perfect time. Take the first step
          toward a stronger, healthier you. Your goals are waiting.
        </p>

        {/* CTA BUTTON */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            type="button"
            onClick={goToMembership}
            className="
              btn btn-primary
              inline-flex items-center justify-center gap-3
              px-7 sm:px-10 py-4
              group
            "
          >
            Get Started Today

            <ArrowRight
              size={19}
              className="
                transition-transform duration-300
                group-hover:translate-x-2
              "
            />
          </button>
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="
          mt-10 sm:mt-14
          flex items-center justify-center gap-3
          text-white/50
        ">
          <span className="w-8 h-px bg-accent/70" />

          <span className="
            text-[10px] sm:text-xs
            font-bold uppercase tracking-[0.25em]
          ">
            Train Hard. Stay Strong.
          </span>

          <span className="w-8 h-px bg-accent/70" />
        </div>

      </Reveal>
    </section>
  )
}
