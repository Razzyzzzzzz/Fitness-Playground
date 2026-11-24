
import { ArrowUpRight, Dumbbell } from 'lucide-react'
import Reveal from './Reveal'
import { programs } from '../data'

const scrollToMembership = () => {
  document.getElementById('membership')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export default function Programs() {
  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-coal py-20 md:py-28"
    >
      <div className="section">

        {/* SECTION HEADER */}
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <span className="h-[2px] w-7 bg-accent" />
                What We Offer
              </p>

              <h2 className="h-display mt-3 text-4xl sm:text-5xl md:text-7xl">
                Fitness <span className="text-accent">Programs.</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                Find the right training program for your goals.
                Build strength, improve endurance, and become
                a stronger version of yourself.
              </p>
            </div>

            <div className="hidden items-center gap-3 text-white/40 md:flex">
              <Dumbbell size={22} className="text-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Train Your Way
              </span>
            </div>
          </div>
        </Reveal>

        {/* PROGRAM CARDS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {programs.map((program, index) => (
            <Reveal key={program.title} delay={index * 0.07}>
              <article className="group relative flex h-[390px] flex-col justify-end overflow-hidden border border-white/10 bg-ink transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 sm:h-[420px]">

                {/* PROGRAM IMAGE */}
                <img
                  src={program.img}
                  alt={program.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* IMAGE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/5 transition-opacity duration-500 group-hover:from-black" />

                {/* TOP LABEL */}
                <div className="absolute left-5 top-5">
                  <span className="border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                    Program {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* RED ACCENT */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />

                {/* CONTENT */}
                <div className="relative z-10 p-5 sm:p-6">

                  <div className="mb-3 flex h-10 w-10 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
                    <Dumbbell size={20} />
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">
                    {program.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
                    {program.text}
                  </p>

                  <button
                    type="button"
                    onClick={scrollToMembership}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-accent transition-all duration-300 hover:gap-4"
                  >
                    Explore Program
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <Reveal>
          <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-display text-xl font-bold uppercase text-white sm:text-2xl">
                Ready to start training?
              </h3>

              <p className="mt-2 text-sm text-white/50">
                Choose your membership and start your fitness journey.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToMembership}
              className="btn btn-primary group"
            >
              View Membership
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
