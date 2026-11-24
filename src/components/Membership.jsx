
import { useEffect, useState } from 'react'
import {
  Check,
  X,
  Maximize2,
  ArrowRight,
  Dumbbell,
  Ticket,
  Clock,
  Info,
} from 'lucide-react'

import Reveal from './Reveal'
import { plans } from '../data'
import rateBoard from '../assets/p03.png'

const additionalRates = [
  {
    title: 'Membership Fee',
    subtitle: 'Become a member',
    icon: Dumbbell,
    featured: false,
    rates: [
      { label: 'Annual Membership', price: '₱800' },
      { label: 'Lifetime Membership', price: '₱2,500' },
      { label: 'Student Annual', price: '₱500', highlight: true },
    ],
  },
  {
    title: 'Day Pass',
    subtitle: 'Walk-in access',
    icon: Ticket,
    featured: false,
    rates: [
      { label: 'Non-member', price: '₱150' },
      { label: 'Student Non-member', price: '₱100' },
    ],
  },
  {
    title: 'Happy Hour',
    subtitle: 'Special gym access',
    icon: Clock,
    featured: true,
    rates: [
      { label: 'Members & Non-members', price: '₱60' },
      { label: 'Available Hours', price: '12–3 PM', time: true },
    ],
  },
]

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
    window.dispatchEvent(
      new CustomEvent('plan', { detail: plan })
    )

    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
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

        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="h-display text-4xl leading-none sm:text-5xl md:text-6xl lg:text-7xl">
              Membership
              <br className="hidden sm:block" />
              <span className="text-accent"> Plans.</span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Choose the membership that fits your fitness goals.
              Start your journey and become stronger every day.
            </p>
          </div>

          <p className="hidden text-xs uppercase tracking-[0.2em] text-muted md:block">
            Invest in yourself.
          </p>
        </div>
      </Reveal>

      {/* MEMBERSHIP CARDS */}
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

        {plans.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.1}
            className="h-full"
          >
            <div
              className={`
                relative flex h-full min-h-[420px] flex-col
                p-6 transition-all duration-300
                hover:-translate-y-2 sm:p-7 lg:p-8
                ${
                  p.featured
                    ? 'z-10 bg-accent text-white shadow-xl shadow-accent/20 lg:scale-[1.03]'
                    : 'border border-white/10 bg-coal hover:border-accent/60'
                }
              `}
            >

              {/* POPULAR LABEL */}
              {p.featured && (
                <span className="mb-5 self-start bg-ink px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white sm:text-xs">
                  Most Popular
                </span>
              )}

              {/* PLAN NAME */}
              <h3 className="h-display text-3xl sm:text-4xl">
                {p.name}
              </h3>

              <div className="mb-5 mt-4 h-[3px] w-10 bg-white/30" />

              {/* PRICE */}
              <div className="mb-6 flex flex-wrap items-baseline gap-2">
                <span className="font-display text-5xl font-bold sm:text-6xl">
                  {p.price}
                </span>

                <span
                  className={`text-sm ${
                    p.featured ? 'text-white/80' : 'text-muted'
                  }`}
                >
                  {p.per}
                </span>
              </div>

              {/* FEATURES */}
              <ul className="mb-8 flex-1 space-y-4">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <span
                      className={`mt-0.5 shrink-0 ${
                        p.featured ? 'text-white' : 'text-accent'
                      }`}
                    >
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
                  flex w-full items-center justify-center gap-2
                  px-5 py-4 text-xs font-bold uppercase tracking-widest
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

      {/* ADDITIONAL RATES & FEES */}
      <Reveal delay={0.2}>
        <div className="mt-16 sm:mt-20">

          {/* SECTION HEADER */}
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>
              <p className="eyebrow flex items-center gap-2">
                <span className="h-[2px] w-7 bg-accent" />
                MORE PRICING OPTIONS
              </p>

              <h3 className="mt-3 font-display text-3xl uppercase text-white sm:text-4xl">
                Additional <span className="text-accent">Rates & Fees.</span>
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                Explore our other available rates and find the
                option that works best for you.
              </p>
            </div>

            <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-muted sm:block">
              Fitness Playground
            </span>

          </div>

          {/* RATE CARDS */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            {additionalRates.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className={`
                    group relative flex flex-col overflow-hidden
                    border p-6 transition-all duration-300
                    hover:-translate-y-1 sm:p-7
                    ${
                      item.featured
                        ? 'border-accent bg-accent text-white shadow-xl shadow-accent/10'
                        : 'border-white/10 bg-coal hover:border-accent/50'
                    }
                  `}
                >

                  {/* CARD HEADER */}
                  <div className="mb-7 flex items-center justify-between">

                    <div
                      className={`
                        flex h-12 w-12 items-center justify-center
                        ${
                          item.featured
                            ? 'bg-black/15 text-white'
                            : 'bg-accent/10 text-accent'
                        }
                      `}
                    >
                      <Icon size={23} />
                    </div>

                    {item.featured ? (
                      <span className="bg-ink px-3 py-2 text-[9px] font-bold uppercase tracking-widest text-white">
                        Special Rate
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold uppercase tracking-widest text-muted">
                        Option {index + 1}
                      </span>
                    )}

                  </div>

                  {/* TITLE */}
                  <h4 className="font-display text-2xl uppercase sm:text-3xl">
                    {item.title}
                  </h4>

                  <p
                    className={`mt-1 text-xs ${
                      item.featured ? 'text-white/75' : 'text-muted'
                    }`}
                  >
                    {item.subtitle}
                  </p>

                  {/* RATE LIST */}
                  <div
                    className={`mt-7 flex-1 border-t pt-5 ${
                      item.featured
                        ? 'border-white/25'
                        : 'border-white/10'
                    }`}
                  >

                    <div className="space-y-5">
                      {item.rates.map((rate) => (
                        <div
                          key={rate.label}
                          className="flex items-center justify-between gap-3"
                        >
                          <div>
                            <p
                              className={`text-xs leading-relaxed ${
                                item.featured
                                  ? 'text-white/80'
                                  : 'text-muted'
                              }`}
                            >
                              {rate.label}
                            </p>
                          </div>

                          <p
                            className={`
                              shrink-0 font-display font-bold
                              ${
                                rate.time
                                  ? 'text-xl'
                                  : item.featured
                                    ? 'text-3xl'
                                    : 'text-2xl text-white'
                              }
                              ${
                                rate.highlight
                                  ? 'text-accent'
                                  : ''
                              }
                            `}
                          >
                            {rate.price}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* CARD FOOTER */}
                  <div
                    className={`mt-7 border-t pt-4 ${
                      item.featured
                        ? 'border-white/25'
                        : 'border-white/10'
                    }`}
                  >
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest ${
                        item.featured
                          ? 'text-white/70'
                          : 'text-muted'
                      }`}
                    >
                      Fitness Playground
                    </p>
                  </div>

                </div>
              )
            })}

          </div>

          {/* INFORMATION NOTE */}
          <div className="mt-5 flex items-start gap-3 border border-white/10 bg-ink p-4 sm:p-5">
            <Info
              size={19}
              className="mt-0.5 shrink-0 text-accent"
            />

            <p className="text-xs leading-relaxed text-muted sm:text-sm">
              For more information about our membership options
              and rates, please contact Fitness Playground or
              check our complete rate board below.
            </p>
          </div>

        </div>
      </Reveal>

      {/* RATE BOARD BUTTON */}
      <Reveal delay={0.25}>
        <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">

          <p className="text-sm font-semibold text-white">
            Need more pricing details?
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              group inline-flex items-center justify-center gap-3
              border border-white/20 px-6 py-4
              text-xs font-bold uppercase tracking-widest
              transition-all duration-300
              hover:border-accent hover:text-accent
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
            flex items-center justify-center
            bg-black/95 p-3 backdrop-blur-sm sm:p-6
          "
          onClick={() => setOpen(false)}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Fitness Playground full rate board"
            className="relative flex w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close rate board"
              className="
                absolute -top-12 right-0
                bg-coal p-3 text-white
                transition-colors hover:bg-accent
              "
            >
              <X size={22} />
            </button>

            {/* RATE BOARD IMAGE */}
            <img
              src={rateBoard}
              alt="Fitness Playground membership rate board showing day, week and month passes, membership fees and happy hour rates"
              className="
                max-h-[85vh] max-w-full
                w-auto object-contain select-none
              "
              draggable={false}
            />

            <p className="mt-4 text-xs uppercase tracking-widest text-white/50">
              Click outside or press ESC to close
            </p>

          </div>
        </div>
      )}

    </section>
  )
}
