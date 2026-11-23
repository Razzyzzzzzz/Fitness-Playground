
import { motion, useReducedMotion } from 'framer-motion'
import {
  Clock,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  Dumbbell,
} from 'lucide-react'

import { gym } from '../data'

const go = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

// BACKGROUND
function Background() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-ink pointer-events-none"
      aria-hidden="true"
    >
      {/* RED LIGHTING */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 65% at 90% 20%, rgba(220,38,38,0.30), transparent 70%),
            radial-gradient(ellipse 55% 55% at 5% 100%, rgba(127,29,29,0.22), transparent 70%)
          `,
        }}
      />

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to right, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black)',
        }}
      />

      {/* RED GEOMETRIC SHAPES */}
      <motion.div
        initial={reduceMotion ? false : { x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="
          absolute right-[-12%] top-0
          h-full w-[42%]
          -skew-x-12
          bg-gradient-to-b
          from-accent/25 via-accent/10 to-transparent
        "
      />

      <motion.div
        initial={reduceMotion ? false : { x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="
          hidden md:block
          absolute right-[18%] top-0
          h-full w-24 -skew-x-12
          bg-gradient-to-b from-accent/20 to-transparent
        "
      />

      {/* AMBIENT GLOW */}
      {!reduceMotion && (
        <>
          <motion.div
            animate={{ x: [0, 35, 0], y: [0, 25, 0] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              absolute right-[8%] top-[15%]
              h-72 w-72 rounded-full
              bg-accent/25 blur-[110px]
            "
          />

          <motion.div
            animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              absolute bottom-[5%] left-[15%]
              h-64 w-64 rounded-full
              bg-red-900/30 blur-[110px]
            "
          />
        </>
      )}

      {/* BACKGROUND TYPOGRAPHY */}
      <div
        className="
          absolute right-[-2%] bottom-[7%]
          hidden lg:block
          select-none font-display
          text-[clamp(120px,18vw,280px)]
          uppercase leading-none
        "
        style={{
          color: 'transparent',
          WebkitTextStroke: '2px rgba(255,255,255,0.055)',
        }}
      >
        STRONG
      </div>

      {/* FILM GRAIN */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* DARK OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 160px rgba(0,0,0,0.65)',
        }}
      />
    </div>
  )
}

// GYM INFORMATION
function GymInfo() {
  const hours = gym.hours?.[0]

  return (
    <div
      className="
        w-full max-w-sm
        bg-black/65 backdrop-blur-xl
        border border-white/10
        border-l-[3px] border-l-accent
        p-5 sm:p-6
        shadow-2xl
      "
    >
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-accent/10 text-accent">
          <Clock size={19} />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-white font-bold uppercase tracking-wider">
            {hours?.days || 'Monday – Saturday'}
          </p>

          <p className="text-sm text-white/55 mt-1">
            {hours?.time || '6:00 AM – 10:30 PM'}
          </p>
        </div>
      </div>

      <div className="h-px bg-white/10 my-5" />

      <div className="flex items-start gap-4">
        <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-accent/10 text-accent">
          <MapPin size={19} />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-white font-bold uppercase tracking-wider">
            Find Our Gym
          </p>

          <p className="text-sm text-white/55 mt-1 leading-relaxed">
            {gym.address}
          </p>
        </div>
      </div>
    </div>
  )
}

// MAIN HERO
export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="
        relative isolate
        min-h-screen
        flex items-center
        overflow-hidden
        bg-ink
      "
    >
      <Background />

      <div
        className="
          relative z-10
          w-full max-w-7xl mx-auto
          px-5 sm:px-8 lg:px-10
          pt-32 pb-24
          lg:pt-36 lg:pb-28
        "
      >
        <div className="
          grid lg:grid-cols-[1fr_340px]
          gap-12 lg:gap-16
          items-center
        ">

          {/* LEFT CONTENT */}
          <div className="max-w-4xl">

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-[2px] bg-accent" />

              <p className="eyebrow">
                FITNESS. COMMUNITY. PROGRESS.
              </p>
            </motion.div>

            {/* HEADLINE */}
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="
                h-display
                text-[clamp(3.2rem,8vw,7.5rem)]
                leading-[0.91]
                tracking-tight
                uppercase
              "
            >
              Build Your
              <br />
              Body.
              <br />

              <span
                className="text-accent"
                style={{
                  textShadow: '0 0 35px rgba(220,38,38,0.30)',
                }}
              >
                Transform
                <br className="hidden sm:block" />
                Your Life.
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="
                mt-7 max-w-xl
                text-sm sm:text-base lg:text-lg
                text-white/65 leading-relaxed
              "
            >
              Push your limits, build your strength, and become
              the strongest version of yourself. Your journey
              starts at Fitness Playground.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="
                flex flex-col sm:flex-row
                gap-3 sm:gap-4 mt-9
              "
            >
              <button
                type="button"
                onClick={() => go('membership')}
                className="
                  btn btn-primary
                  inline-flex items-center justify-center gap-3
                  group
                "
              >
                JOIN THE GYM

                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </button>

              <button
                type="button"
                onClick={() => go('programs')}
                className="
                  btn btn-ghost
                  inline-flex items-center justify-center gap-3
                "
              >
                EXPLORE PROGRAMS
                <ArrowUpRight size={17} />
              </button>
            </motion.div>

          </div>

          {/* RIGHT INFORMATION PANEL */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex flex-col gap-6"
          >
            <div className="
              border border-white/10
              bg-white/[0.025]
              p-6
            ">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 flex items-center justify-center bg-accent text-white">
                  <Dumbbell size={21} />
                </div>

                <div>
                  <p className="text-white font-bold text-sm uppercase">
                    Fitness Playground
                  </p>

                  <p className="text-white/40 text-xs mt-1">
                    Train with purpose.
                  </p>
                </div>
              </div>

              <p className="
                text-white/55 text-sm leading-relaxed
              ">
                A space designed for strength, discipline,
                fitness and a stronger community.
              </p>

              <button
                type="button"
                onClick={() => go('about')}
                className="
                  mt-5 text-accent text-xs font-bold
                  uppercase tracking-widest
                  flex items-center gap-2
                  hover:gap-4 transition-all
                "
              >
                Discover More
                <ArrowUpRight size={15} />
              </button>
            </div>

            <GymInfo />
          </motion.div>

        </div>

        {/* MOBILE GYM INFORMATION */}
        <div className="lg:hidden mt-10">
          <GymInfo />
        </div>

      </div>

      {/* SCROLL INDICATOR */}
      <button
        type="button"
        onClick={() => go('about')}
        aria-label="Scroll to About section"
        className="
          absolute bottom-5 left-1/2
          -translate-x-1/2
          flex flex-col items-center gap-1
          text-white/40
          hover:text-accent transition-colors
        "
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">
          Scroll
        </span>

        <ChevronDown
          size={22}
          className={reduceMotion ? '' : 'animate-bounce'}
        />
      </button>

    </section>
  )
}
