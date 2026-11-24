
import { motion, useReducedMotion } from 'framer-motion'
import {
  Clock,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  Dumbbell,
  Activity,
  HeartPulse,
  Play,
} from 'lucide-react'

import { gym, images } from '../data'

const go = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

// BACKGROUND
function Background() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#050505]">
      <img
        src={images.banner}
        alt=""
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/50" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 85% 35%, rgba(220,38,38,.22), transparent 55%)',
        }}
      />

      <div className="absolute right-[-10%] top-0 h-full w-[35%] -skew-x-12 bg-red-600/[0.06]" />
    </div>
  )
}

// FEATURE ITEM
function Feature({ Icon, title, description }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-red-500/20 bg-red-500/10">
        <Icon size={21} className="text-red-500" />
      </div>

      <div>
        <p className="text-xs font-black uppercase tracking-wider text-white">
          {title}
        </p>
        <p className="mt-1 text-[11px] text-white/50">
          {description}
        </p>
      </div>
    </div>
  )
}

// FEATURE STRIP
function FeatureStrip() {
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 sm:gap-6">
      <Feature
        Icon={Dumbbell}
        title="Strength"
        description="Build power"
      />

      <Feature
        Icon={Activity}
        title="Functional"
        description="Move better"
      />

      <Feature
        Icon={HeartPulse}
        title="Cardio"
        description="Push limits"
      />
    </div>
  )
}

// GYM INFORMATION
function GymInformation() {
  return (
    <div className="mt-6 space-y-3 text-[11px] text-white/55">
      <div className="flex items-start gap-2">
        <MapPin size={14} className="mt-0.5 shrink-0 text-red-500" />
        <span>{gym.address}</span>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {gym.hours?.map((item) => (
          <div key={item.days} className="flex items-center gap-2">
            <Clock size={14} className="shrink-0 text-red-500" />
            <span>
              {item.days}: {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// GYM IMAGE SHOWCASE
function GymShowcase({ reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.3 }}
      className="relative mx-auto w-full max-w-[490px] lg:ml-auto lg:mr-0"
    >
      <div className="relative aspect-[5/4] overflow-hidden border border-white/10 bg-[#111]">
        <img
          src={images.hero}
          alt="Fitness Playground gym interior"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-7 bg-red-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">
              Fitness Playground
            </span>
          </div>

          <h3 className="mt-3 font-display text-2xl font-black uppercase text-white sm:text-3xl">
            Built for <span className="text-red-500">Progress.</span>
          </h3>

          <p className="mt-2 max-w-xs text-xs leading-5 text-white/65">
            Train with purpose. Push your limits. Become stronger.
          </p>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-3 flex items-center gap-3 border border-white/10 bg-[#111] px-4 py-3 shadow-2xl sm:-left-6">
        <div className="flex h-9 w-9 items-center justify-center bg-red-600">
          <Dumbbell size={19} className="text-white" />
        </div>

        <div>
          <p className="text-[10px] font-black uppercase tracking-wider text-white">
            Your Fitness Journey
          </p>
          <p className="mt-1 text-[9px] text-white/45">
            Starts Here
          </p>
        </div>
      </div>

      <div className="absolute -right-3 -top-3 -z-10 h-24 w-24 border-r-2 border-t-2 border-red-600/70" />
    </motion.div>
  )
}

// MAIN HERO
export default function Hero() {
  const reduceMotion = useReducedMotion()

  const reveal = (delay = 0, direction = 25) => ({
    initial: reduceMotion
      ? false
      : { opacity: 0, y: direction },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.7,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  })

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[780px] items-center overflow-hidden bg-[#050505] pb-20 pt-28 sm:min-h-[850px] lg:min-h-[900px] lg:pt-28"
    >
      <Background />

      {/* BACKGROUND TYPOGRAPHY */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20px] right-[-30px] hidden select-none font-display text-[clamp(140px,19vw,300px)] font-black uppercase leading-none text-transparent lg:block"
        style={{
          WebkitTextStroke: '1px rgba(255,255,255,0.055)',
        }}
      >
        STRONG
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* LEFT CONTENT */}
          <div className="max-w-2xl">

            <motion.div
              {...reveal(0)}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-[2px] w-9 bg-red-500" />

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 sm:text-xs">
                Fitness. Community. Progress.
              </p>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              {...reveal(0.1)}
              className="font-display text-[clamp(4.5rem,9vw,8.5rem)] font-black uppercase leading-[0.83] tracking-[-0.055em] text-white"
            >
              Stronger

              <span className="mt-2 block text-red-600">
                Better.
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.div
              {...reveal(0.2)}
              className="mt-8 max-w-lg"
            >
              <h2 className="text-base font-black text-white sm:text-lg">
                More than a gym.
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/60 sm:text-base">
                It’s a playground for your discipline, your strength,
                and your transformation. Train with purpose and become
                a stronger version of yourself.
              </p>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              {...reveal(0.3)}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={() => go('membership')}
                className="group inline-flex min-h-[52px] items-center justify-center gap-4 bg-red-600 px-7 text-xs font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-red-700"
              >
                Join Now

                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={() => go('contact')}
                className="group inline-flex min-h-[52px] items-center justify-center gap-4 border border-white/30 px-7 text-xs font-black uppercase tracking-wider text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600"
              >
                <Play size={15} />
                Book a Visit
                <ArrowUpRight size={16} />
              </button>
            </motion.div>

            {/* FEATURES */}
            <motion.div
              {...reveal(0.4)}
              className="mt-12"
            >
              <FeatureStrip />
            </motion.div>

            {/* LOCATION AND HOURS */}
            <motion.div {...reveal(0.5)}>
              <GymInformation />
            </motion.div>

          </div>

          {/* RIGHT IMAGE SHOWCASE */}
          <div className="hidden lg:block">
            <GymShowcase reduceMotion={reduceMotion} />
          </div>

          {/* MOBILE IMAGE */}
          <div className="lg:hidden">
            <GymShowcase reduceMotion={reduceMotion} />
          </div>

        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <button
        type="button"
        onClick={() => go('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-red-500"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
          Scroll to Explore
        </span>

        <ChevronDown
          size={20}
          className={reduceMotion ? '' : 'animate-bounce'}
        />
      </button>
    </section>
  )
}
