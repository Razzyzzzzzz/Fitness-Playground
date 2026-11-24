
import { motion, useReducedMotion } from 'framer-motion'
import {
  Clock,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  Dumbbell,
  Activity,
  HeartPulse,
} from 'lucide-react'

import { gym, images } from '../data'

const go = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

// HERO BACKGROUND
function Background() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden bg-black"
      aria-hidden="true"
    >
      {/* Gym background image: src/assets/p02.png */}
      <img
        src={images.banner}
        alt=""
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlays for readability */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35" />

      {/* Red ambient lighting */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 65% at 85% 35%, rgba(220,38,38,0.20), transparent 70%),
            radial-gradient(ellipse 45% 45% at 5% 95%, rgba(127,29,29,0.18), transparent 70%)
          `,
        }}
      />

      {/* Decorative red accent */}
      <div className="absolute right-[-12%] top-0 h-full w-[35%] -skew-x-12 bg-gradient-to-b from-red-600/10 via-red-600/5 to-transparent" />

      {/* Background typography */}
      <div
        className="absolute bottom-[5%] right-[-2%] hidden select-none font-display text-[clamp(120px,18vw,260px)] font-black uppercase leading-none lg:block"
        style={{
          color: 'transparent',
          WebkitTextStroke: '2px rgba(255,255,255,0.045)',
        }}
      >
        STRONG
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.55)',
        }}
      />
    </div>
  )
}

// FEATURE STRIP
function FeatureStrip() {
  const features = [
    {
      Icon: Dumbbell,
      title: 'Strength',
      description: 'Build power',
    },
    {
      Icon: Activity,
      title: 'Functional',
      description: 'Move better',
    },
    {
      Icon: HeartPulse,
      title: 'Cardio',
      description: 'Push limits',
    },
  ]

  return (
    <div className="mt-10 flex flex-wrap items-center gap-y-5 border-t border-white/15 pt-7 sm:mt-12 sm:pt-8">
      {features.map(({ Icon, title, description }, index) => (
        <div
          key={title}
          className={`flex items-center gap-3 pr-5 sm:pr-8 ${
            index !== features.length - 1
              ? 'mr-5 border-r border-white/20 sm:mr-8'
              : ''
          }`}
        >
          <Icon
            size={27}
            strokeWidth={1.7}
            className="shrink-0 text-accent"
          />

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white sm:text-sm">
              {title}
            </p>

            <p className="mt-1 text-[10px] text-white/50 sm:text-xs">
              {description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// GYM HOURS
function GymHours() {
  const hours = gym.hours?.[0]
  const sunday = gym.hours?.[1]

  return (
    <div className="mt-6 flex flex-col gap-3 text-xs text-white/55 sm:flex-row sm:flex-wrap sm:gap-x-7">
      {hours && (
        <div className="flex items-center gap-2">
          <Clock size={15} className="shrink-0 text-accent" />

          <span>
            {hours.days}: {hours.time}
          </span>
        </div>
      )}

      {sunday && (
        <div className="flex items-center gap-2">
          <Clock size={15} className="shrink-0 text-accent" />

          <span>
            Sunday: {sunday.time}
          </span>
        </div>
      )}
    </div>
  )
}

// MAIN HERO
export default function Hero() {
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      delay: reduceMotion ? 0 : delay,
    },
  })

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[720px] items-center overflow-hidden bg-black pt-20 sm:min-h-[760px] lg:min-h-[850px]"
    >
      <Background />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-28 lg:pt-20">

        <div className="flex items-center">
          <div className="w-full max-w-5xl">

            {/* EYEBROW */}
            <motion.div
              {...fadeUp(0)}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-[2px] w-8 bg-accent" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent sm:text-xs">
                Fitness. Community. Progress.
              </p>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-display text-[clamp(4rem,10vw,9rem)] font-black uppercase leading-[0.84] tracking-[-0.045em] text-white"
            >
              Stronger

              <span className="block text-accent">
                Better.
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.div
              {...fadeUp(0.2)}
              className="mt-7 max-w-xl"
            >
              <p className="text-base font-bold text-white sm:text-lg">
                More than a gym.
              </p>

              <p className="mt-2 text-sm leading-7 text-white/70 sm:text-base">
                It’s a playground for your discipline, your strength,
                and your transformation. Train with purpose and become
                a stronger version of yourself.
              </p>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => go('membership')}
                className="btn btn-primary group min-h-12"
              >
                Join Now

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              <button
                type="button"
                onClick={() => go('contact')}
                className="btn btn-ghost min-h-12"
              >
                Book a Visit

                <ArrowUpRight size={17} />
              </button>
            </motion.div>

            {/* FEATURES */}
            <motion.div {...fadeUp(0.4)}>
              <FeatureStrip />
            </motion.div>

            {/* LOCATION */}
            <motion.div
              {...fadeUp(0.5)}
              className="mt-6 flex items-start gap-2 text-white/50"
            >
              <MapPin
                size={15}
                className="mt-0.5 shrink-0 text-accent"
              />

              <p className="text-xs leading-relaxed">
                {gym.address}
              </p>
            </motion.div>

            {/* HOURS */}
            <motion.div {...fadeUp(0.55)}>
              <GymHours />
            </motion.div>

          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <button
        type="button"
        onClick={() => go('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/45 transition-colors hover:text-accent"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">
          Scroll
        </span>

        <ChevronDown
          size={21}
          className={reduceMotion ? '' : 'animate-bounce'}
        />
      </button>
    </section>
  )
}
