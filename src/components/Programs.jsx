
import { useState } from 'react'
import {
  ArrowUpRight,
  Dumbbell,
  Activity,
  Target,
  Zap,
} from 'lucide-react'

import Reveal from './Reveal'
import { programs } from '../data'

const scrollToMembership = () => {
  document.getElementById('membership')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function ProgramCard({ program, index }) {
  const [loaded, setLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const icons = [Dumbbell, Target, Activity, Zap, Activity, Dumbbell]
  const Icon = icons[index % icons.length]

  return (
    <article
      className="
        group relative flex min-h-[400px] flex-col
        justify-end overflow-hidden
        border border-white/10 bg-[#151515]
        transition-all duration-500
        hover:-translate-y-2 hover:border-red-500/50
        sm:min-h-[440px]
      "
    >
      {/* PROGRAM IMAGE */}
      {!imageError && (
        <img
          src={program.img}
          alt={program.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setImageError(true)}
          className={`
            absolute inset-0 h-full w-full
            object-cover object-center
            transition-all duration-700 ease-out
            group-hover:scale-110
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}

      {/* IMAGE LOADING */}
      {!loaded && !imageError && (
        <div className="absolute inset-0 animate-pulse bg-white/5" />
      )}

      {/* IMAGE FALLBACK */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#191919]">
          <Dumbbell size={45} className="text-white/20" />
        </div>
      )}

      {/* DARK OVERLAY */}
      <div className="
        absolute inset-0
        bg-gradient-to-t
        from-black via-black/75 to-black/10
        opacity-90 transition-all duration-500
        group-hover:opacity-100
      " />

      {/* RED AMBIENT EFFECT */}
      <div className="
        absolute inset-0
        bg-gradient-to-br from-red-600/10
        via-transparent to-transparent
        opacity-0 transition-opacity duration-500
        group-hover:opacity-100
      " />

      {/* TOP LABEL */}
      <div className="
        absolute left-5 right-5 top-5
        flex items-center justify-between
      ">
        <span className="
          border border-white/20
          bg-black/50 px-3 py-2
          text-[9px] font-bold uppercase
          tracking-[2px] text-white/80
          backdrop-blur-md
        ">
          PROGRAM {String(index + 1).padStart(2, '0')}
        </span>

        <div className="
          flex h-10 w-10 items-center justify-center
          border border-white/20
          bg-black/40 text-white
          backdrop-blur-md
          transition-all duration-300
          group-hover:border-red-500
          group-hover:bg-red-600
        ">
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* BOTTOM CONTENT */}
      <div className="relative z-10 p-6 sm:p-7">

        {/* ICON */}
        <div className="
          mb-5 flex h-12 w-12 items-center
          justify-center border border-red-500/40
          bg-red-600/15 text-red-500
          transition-all duration-300
          group-hover:bg-red-600
          group-hover:text-white
        ">
          <Icon size={23} />
        </div>

        {/* TITLE */}
        <h3 className="
          max-w-sm font-display
          text-2xl font-black uppercase
          leading-tight text-white
          sm:text-3xl
        ">
          {program.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="
          mt-3 max-w-sm text-sm
          leading-6 text-white/60
          transition-colors duration-300
          group-hover:text-white/80
        ">
          {program.text}
        </p>

        {/* EXPLORE */}
        <button
          type="button"
          onClick={scrollToMembership}
          className="
            mt-6 inline-flex items-center gap-3
            border-t border-white/15 pt-4
            text-[10px] font-bold uppercase
            tracking-[2px] text-red-500
            transition-all duration-300
            hover:gap-5 hover:text-white
          "
        >
          Explore Program
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* BOTTOM RED LINE */}
      <div className="
        absolute bottom-0 left-0
        h-[3px] w-0 bg-red-600
        transition-all duration-500
        group-hover:w-full
      " />
    </article>
  )
}

export default function Programs() {
  return (
    <section
      id="programs"
      className="
        relative overflow-hidden
        bg-[#0b0b0b]
        py-20 sm:py-24 lg:py-28
        scroll-mt-20
      "
    >
      {/* BACKGROUND DECORATION */}
      <div className="
        pointer-events-none absolute
        -left-40 top-20 h-96 w-96
        rounded-full bg-red-600/[0.06]
        blur-[130px]
      " />

      <div className="section relative z-10">

        {/* SECTION HEADER */}
        <Reveal>
          <div className="
            mb-12 flex flex-col
            justify-between gap-8
            border-b border-white/10 pb-9
            md:mb-14 md:flex-row
            md:items-end
          ">

            <div>
              <div className="eyebrow mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-accent" />
                WHAT WE OFFER
              </div>

              <h2 className="
                h-display text-5xl
                uppercase leading-[0.9]
                text-white sm:text-6xl md:text-7xl
              ">
                Train With
                <span className="block text-accent">
                  Purpose.
                </span>
              </h2>

              <p className="
                mt-5 max-w-xl
                text-sm leading-7 text-white/55
                sm:text-base
              ">
                Whatever your fitness goal, we have
                the training environment to help you
                get there. Build strength, improve
                endurance, and push beyond your limits.
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden items-center gap-4 md:flex">
              <div className="
                flex h-14 w-14 items-center
                justify-center border border-red-500/30
                bg-red-500/10 text-red-500
              ">
                <Dumbbell size={27} />
              </div>

              <div>
                <p className="
                  text-xs font-bold uppercase
                  tracking-[2px] text-white
                ">
                  FITNESS PLAYGROUND
                </p>

                <p className="
                  mt-1 text-[10px] uppercase
                  tracking-widest text-white/40
                ">
                  Train. Build. Repeat.
                </p>
              </div>
            </div>

          </div>
        </Reveal>

        {/* PROGRAM COUNT */}
        <Reveal>
          <div className="
            mb-6 flex items-center
            justify-between
          ">
            <p className="
              text-[10px] font-bold
              uppercase tracking-[2px]
              text-white/40
            ">
              OUR TRAINING PROGRAMS
            </p>

            <p className="
              text-[10px] font-bold
              uppercase tracking-[2px]
              text-white/40
            ">
              {String(programs.length).padStart(2, '0')} PROGRAMS
            </p>
          </div>
        </Reveal>

        {/* PROGRAM GRID */}
        <div className="
          grid grid-cols-1 gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          lg:gap-6
        ">
          {programs.map((program, index) => (
            <Reveal
              key={program.title}
              delay={index * 0.07}
              className="h-full"
            >
              <ProgramCard
                program={program}
                index={index}
              />
            </Reveal>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <Reveal>
          <div className="
            relative mt-14 overflow-hidden
            border border-white/10
            bg-[#151515] p-7
            sm:mt-16 sm:p-10
          ">

            {/* RED DECORATION */}
            <div className="
              pointer-events-none absolute
              -right-10 -top-20
              h-64 w-64 rounded-full
              bg-red-600/10 blur-[90px]
            " />

            <div className="
              relative z-10 flex flex-col
              justify-between gap-7
              md:flex-row md:items-center
            ">

              <div>
                <p className="
                  mb-3 text-[10px] font-bold
                  uppercase tracking-[3px]
                  text-red-500
                ">
                  YOUR NEXT STEP STARTS HERE
                </p>

                <h3 className="
                  font-display text-2xl
                  font-black uppercase
                  text-white sm:text-3xl
                ">
                  Ready to start training?
                </h3>

                <p className="
                  mt-3 max-w-lg text-sm
                  leading-6 text-white/50
                ">
                  Find the membership that fits
                  your goals and start building
                  a stronger version of yourself.
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToMembership}
                className="
                  btn btn-primary group
                  flex shrink-0 items-center
                  justify-center gap-3
                  px-7 py-4
                "
              >
                View Membership

                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </button>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
