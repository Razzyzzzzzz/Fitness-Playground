
import { useEffect, useState } from 'react'
import { Check, X, Maximize2, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { plans, fees } from '../data'
import rateBoard from '../assets/p03.png'

export default function Membership() {
  const [open, setOpen] = useState(false)

  // Handle modal and prevent background scrolling
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  // Join membership and send selected plan to contact section
  const join = (plan) => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    window.dispatchEvent(
      new CustomEvent('plan', { detail: plan })
    )
  }

  return (
    <section
      id="membership"
      className="section scroll-mt-24 py-16 sm:py-20 lg:py-28"
    >

      {/* HEADER */}
      <Reveal className="mb-10 sm:mb-14">
        <p className="eyebrow flex items-center gap-2">
          <span className="w-7 h-[2px] bg-accent" />
          PRICING
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-3">
          <div>
            <h2 className="h-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">
              Membership
              <br className="hidden sm:block" />
              <span className="text-accent"> Plans.</span>
            </h2>

            <p className="text-muted mt-4 max-w-lg text-sm sm:text-base leading-relaxed">
              Choose the membership that fits your fitness goals.
              Start your journey and become stronger every day.
            </p>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-muted hidden md:block">
            Invest in yourself.
          </p>
        </div>
      </Reveal>

      {/* MEMBERSHIP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">

        {plans.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.1}
            className="h-full"
          >
            <div
              className={`
                relative h-full min-h-[420px]
                p-6 sm:p-7 lg:p-8
                flex flex-col
                transition-all duration-300
                hover:-translate-y-2
                ${
                  p.featured
                    ? 'bg-accent text-white shadow-xl shadow-accent/20 lg:scale-[1.03] z-10'
                    : 'bg-coal border border-white/10 hover:border-accent/60'
                }
              `}
            >

              {/* POPULAR LABEL */}
              {p.featured && (
                <span className="self-start bg-ink text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] px-3 py-2 mb-5">
                  Most Popular
                </span>
              )}

              {/* PLAN NAME */}
              <h3 className="h-display text-3xl sm:text-4xl">
                {p.name}
              </h3>

              <div className="w-10 h-[3px] bg-white/30 mt-4 mb-5" />

              {/* PRICE */}
              <div className="flex flex-wrap items-baseline gap-2 mb-6">
                <span className="font-display text-5xl sm:text-6xl font-bold">
                  {p.price}
                </span>

                <span className={`text-sm ${
                  p.featured ? 'text-white/80' : 'text-muted'
                }`}>
                  {p.per}
                </span>
              </div>

              {/* FEATURES */}
              <ul className="space-y-4 flex-1 mb-8">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <span className={`mt-0.5 shrink-0 ${
                      p.featured ? 'text-white' : 'text-accent'
                    }`}>
                      <Check size={18} strokeWidth={2.5} />
                    </span>

                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* JOIN BUTTON */}
              <button
                type="button"
                onClick={() => join(p.name)}
                className={`
                  w-full flex items-center justify-center gap-2
                  py-4 px-5 font-bold text-xs uppercase tracking-widest
                  transition-all duration-300
                  ${
                    p.featured
                      ? 'bg-ink text-white hover:bg-black'
                      : 'btn-primary'
                  }
                `}
              >
                Join Now
                <ArrowRight size={17} />
              </button>

            </div>
          </Reveal>
        ))}

      </div>

      {/* ADDITIONAL FEES */}
      <Reveal delay={0.2}>
        <div className="mt-10 sm:mt-12 border-y border-white/10 py-5 text-center">
          <p className="text-muted text-xs sm:text-sm leading-relaxed">
            {fees}
          </p>
        </div>
      </Reveal>

      {/* RATE BOARD BUTTON */}
      <Reveal delay={0.25}>
        <div className="flex flex-col items-center mt-8 sm:mt-10 gap-3">

          <p className="text-white text-sm font-semibold">
            Need more pricing details?
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              group inline-flex items-center justify-center gap-3
              border border-white/20
              px-6 py-4
              text-xs font-bold uppercase tracking-widest
              hover:border-accent hover:text-accent
              transition-all duration-300
            "
          >
            <Maximize2 size={17} />
            View Full Rate Board
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

        </div>
      </Reveal>

      {/* RATE BOARD MODAL */}
      {open && (
        <div
          className="
            fixed inset-0 z-[60]
            bg-black/95 backdrop-blur-sm
            flex items-center justify-center
            p-3 sm:p-6
          "
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Fitness Playground full rate board"
            className="
              relative w-full max-w-5xl
              flex flex-col items-center
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close rate board"
              className="
                absolute -top-12 right-0
                p-3 bg-coal text-white
                hover:bg-accent transition-colors
              "
            >
              <X size={22} />
            </button>

            {/* RATE BOARD IMAGE */}
            <img
              src={rateBoard}
              alt="Fitness Playground membership rate board showing day, week and month passes, membership fees and happy hour rates"
              className="
                max-h-[85vh]
                max-w-full
                w-auto
                object-contain
                select-none
              "
              draggable={false}
            />

            <p className="text-white/50 text-xs mt-4 uppercase tracking-widest">
              Click outside or press ESC to close
            </p>

          </div>
        </div>
      )}

    </section>
  )
}
