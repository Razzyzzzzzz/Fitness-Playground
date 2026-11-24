
import { useEffect, useRef, useState } from 'react'
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

function joinMembership(plan) {
  window.dispatchEvent(
    new CustomEvent('plan', { detail: plan })
  )

  document.getElementById('contact')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

// MEMBERSHIP PLAN CARD
function PlanCard({ plan, index }) {
  const featured = Boolean(plan.featured)

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article
        className={`
          group relative flex h-full min-h-[430px] flex-col
          overflow-hidden border p-6 transition-all duration-500
          hover:-translate-y-2 sm:p-8
          ${
            featured
              ? 'border-red-600 bg-red-600 text-white shadow-xl shadow-red-600/15'
              : 'border-white/10 bg-[#101010] text-white hover:border-red-600/60'
          }
        `}
      >
        {/* FEATURED ACCENT */}
        {featured && (
          <div className="absolute right-0 top-0 bg-black px-4 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-white">
            Most Popular
          </div>
        )}

        {/* DECORATION */}
        <div
          className={`absolute -right-12 -top-12 h-40 w-40 rounded-full border ${
            featured ? 'border-white/10' : 'border-white/[0.04]'
          }`}
        />

        <div className="relative z-10">
          <p
            className={`text-[10px] font-black uppercase tracking-[0.25em] ${
              featured ? 'text-white/70' : 'text-red-500'
            }`}
          >
            Membership Option 0{index + 1}
          </p>

          <h3 className="mt-7 font-display text-3xl font-black uppercase sm:text-4xl">
            {plan.name}
          </h3>

          <div
            className={`mt-5 h-[3px] w-12 transition-all duration-300 group-hover:w-20 ${
              featured ? 'bg-white' : 'bg-red-600'
            }`}
          />

          {/* PRICE */}
          <div className="mb-7 mt-7 flex flex-wrap items-baseline gap-2">
            <span className="font-display text-5xl font-black tracking-tight sm:text-6xl">
              {plan.price}
            </span>

            <span
              className={`text-sm ${
                featured ? 'text-white/75' : 'text-white/45'
              }`}
            >
              {plan.per}
            </span>
          </div>

          {/* FEATURES */}
          <ul className="mb-9 flex-1 space-y-4">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm leading-relaxed"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center ${
                    featured
                      ? 'bg-white/15 text-white'
                      : 'bg-red-600/10 text-red-500'
                  }`}
                >
                  <Check size={13} strokeWidth={3} />
                </span>

                <span
                  className={
                    featured ? 'text-white/90' : 'text-white/65'
                  }
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* JOIN */}
          <button
            type="button"
            onClick={() => joinMembership(plan.name)}
            className={`
              group/button flex min-h-[52px] w-full items-center
              justify-center gap-3 px-5 text-xs font-black
              uppercase tracking-[0.15em] transition-all duration-300
              ${
                featured
                  ? 'bg-black text-white hover:bg-[#171717]'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }
            `}
          >
            Join Now

            <ArrowRight
              size={17}
              className="transition-transform group-hover/button:translate-x-1"
            />
          </button>
        </div>
      </article>
    </Reveal>
  )
}

// ADDITIONAL RATE CARD
function RateCard({ item, index }) {
  const Icon = item.icon
  const featured = Boolean(item.featured)

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <article
        className={`
          group relative flex h-full flex-col overflow-hidden
          border p-6 transition-all duration-300
          hover:-translate-y-1 sm:p-7
          ${
            featured
              ? 'border-red-600 bg-red-600 text-white'
              : 'border-white/10 bg-[#101010] text-white hover:border-red-600/50'
          }
        `}
      >
        <div className="mb-7 flex items-center justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center ${
              featured
                ? 'bg-white/15 text-white'
                : 'bg-red-600/10 text-red-500'
            }`}
          >
            <Icon size={23} />
          </div>

          <span
            className={`text-[9px] font-black uppercase tracking-[0.18em] ${
              featured
                ? 'bg-black px-3 py-2 text-white'
                : 'text-white/35'
            }`}
          >
            {featured ? 'Special Rate' : `Option 0${index + 1}`}
          </span>
        </div>

        <h4 className="font-display text-2xl font-black uppercase sm:text-3xl">
          {item.title}
        </h4>

        <p
          className={`mt-2 text-xs ${
            featured ? 'text-white/70' : 'text-white/40'
          }`}
        >
          {item.subtitle}
        </p>

        <div
          className={`mt-7 flex-1 space-y-5 border-t pt-6 ${
            featured ? 'border-white/20' : 'border-white/10'
          }`}
        >
          {item.rates.map((rate) => (
            <div
              key={rate.label}
              className="flex items-center justify-between gap-3"
            >
              <p
                className={`max-w-[65%] text-xs leading-relaxed ${
                  featured ? 'text-white/75' : 'text-white/45'
                }`}
              >
                {rate.label}
              </p>

              <p
                className={`
                  shrink-0 font-display font-black
                  ${
                    rate.time
                      ? 'text-xl'
                      : 'text-2xl sm:text-3xl'
                  }
                  ${
                    rate.highlight
                      ? 'text-red-500'
                      : 'text-white'
                  }
                `}
              >
                {rate.price}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`mt-7 border-t pt-4 ${
            featured ? 'border-white/20' : 'border-white/10'
          }`}
        >
          <p
            className={`text-[9px] font-black uppercase tracking-[0.2em] ${
              featured ? 'text-white/65' : 'text-white/30'
            }`}
          >
            Fitness Playground
          </p>
        </div>
      </article>
    </Reveal>
  )
}

// RATE BOARD MODAL
function RateBoardModal({ onClose }) {
  const closeRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll(
          'button, a, [tabindex]:not([tabindex="-1"])'
        )

        if (!focusable?.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-md sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rate-board-title"
        className="relative flex w-full max-w-5xl flex-col items-center"
      >
        <h3 id="rate-board-title" className="sr-only">
          Fitness Playground Full Rate Board
        </h3>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close rate board"
          className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center border border-white/20 bg-[#151515] text-white transition-colors hover:border-red-600 hover:bg-red-600"
        >
          <X size={21} />
        </button>

        <div className="max-h-[85vh] w-full overflow-auto">
          <img
            src={rateBoard}
            alt="Fitness Playground membership rate board"
            className="mx-auto h-auto max-h-[85vh] w-auto max-w-full select-none object-contain"
            draggable={false}
          />
        </div>

        <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
          Press ESC or click outside to close
        </p>
      </div>
    </div>
  )
}

// MAIN MEMBERSHIP
export default function Membership() {
  const [open, setOpen] = useState(false)

  const closeModal = () => setOpen(false)

  return (
    <section
      id="membership"
      className="section scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      {/* HEADER */}
      <Reveal className="mb-12 sm:mb-16">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-[2px] w-8 bg-red-600" />

          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-500">
            Pricing & Membership
          </p>
        </div>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Choose Your
              <br />
              <span className="text-red-600">Membership.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
              Choose the membership that fits your fitness goals.
              Start your journey and become stronger every day.
            </p>
          </div>

          <p className="hidden border-l-2 border-red-600 pl-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 md:block">
            Invest in yourself.
          </p>
        </div>
      </Reveal>

      {/* MAIN PLANS */}
      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            index={index}
          />
        ))}
      </div>

      {/* ADDITIONAL RATES */}
      <div className="mt-20 sm:mt-28">
        <Reveal className="mb-9">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-red-600" />

            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500">
              More Pricing Options
            </p>
          </div>

          <h3 className="font-display text-3xl font-black uppercase text-white sm:text-4xl lg:text-5xl">
            Additional <span className="text-red-600">Rates & Fees.</span>
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-7 text-white/45">
            Explore our other available rates and find the
            option that works best for you.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {additionalRates.map((item, index) => (
            <RateCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* INFORMATION NOTE */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex items-start gap-4 border border-white/10 bg-[#101010] p-5 sm:p-6">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-red-600/10 text-red-500">
              <Info size={19} />
            </div>

            <p className="text-xs leading-6 text-white/50 sm:text-sm">
              For more information about our membership options
              and rates, please contact Fitness Playground or
              check our complete rate board below.
            </p>
          </div>
        </Reveal>
      </div>

      {/* RATE BOARD */}
      <Reveal delay={0.2}>
        <div className="mt-12 flex flex-col items-center border border-white/10 bg-[#101010] px-5 py-9 text-center sm:py-12">
          <div className="mb-4 flex h-12 w-12 items-center justify-center bg-red-600/10 text-red-500">
            <Maximize2 size={22} />
          </div>

          <h3 className="font-display text-2xl font-black uppercase text-white sm:text-3xl">
            Complete Rate Board
          </h3>

          <p className="mt-2 max-w-sm text-xs leading-6 text-white/40">
            View the complete Fitness Playground pricing
            information and membership rates.
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group mt-7 inline-flex min-h-[50px] items-center justify-center gap-3 bg-red-600 px-7 text-[10px] font-black uppercase tracking-[0.17em] text-white transition-all hover:bg-red-700"
          >
            <Maximize2 size={16} />

            View Full Rate Board

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </Reveal>

      {/* MODAL */}
      {open && <RateBoardModal onClose={closeModal} />}
    </section>
  )
}
