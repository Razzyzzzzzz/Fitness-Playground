
import { Target, Eye, ArrowUpRight, Dumbbell } from 'lucide-react'
import Reveal from './Reveal'
import { images } from '../data'

const pillars = [
  {
    Icon: Target,
    title: 'Our Mission',
    text: 'Make strength training affordable and welcoming, in a clean space where everyone can train with confidence.',
  },
  {
    Icon: Eye,
    title: 'Our Vision',
    text: 'Build a community where every member trains with purpose and leaves stronger than they arrived.',
  },
]

export default function About() {
  const scrollToPrograms = () => {
    document.getElementById('programs')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      id="about"
      className="section scroll-mt-24 py-16 sm:py-20 lg:py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">

        {/* LEFT: Image */}
        <Reveal className="relative w-full">
          <div className="relative overflow-hidden bg-coal">
            <img
              src={images.about}
              alt="Strength training equipment inside Fitness Playground"
              loading="lazy"
              className="w-full aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Image caption */}
            <div className="absolute bottom-0 left-0 p-5 sm:p-7">
              <div className="flex items-center gap-2 text-accent mb-2">
                <Dumbbell size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Fitness Playground
                </span>
              </div>

              <h3 className="text-white text-2xl sm:text-3xl font-bold uppercase">
                Built for Strength.
              </h3>
              <p className="text-white/70 text-sm mt-1">
                Your journey starts here.
              </p>
            </div>
          </div>

          {/* Decorative accent */}
          <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-4 border-r-4 border-accent -z-10" />
        </Reveal>

        {/* RIGHT: Content */}
        <Reveal delay={0.15} className="min-w-0">

          {/* Section heading */}
          <div className="mb-5">
            <p className="eyebrow flex items-center gap-2">
              <span className="w-7 h-[2px] bg-accent" />
              ABOUT OUR GYM
            </p>

            <h2 className="h-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mt-4">
              Lift Heavy.
              <br />
              <span className="text-accent">Live Strong.</span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-muted leading-relaxed text-sm sm:text-base max-w-xl">
            Fitness Playground is a strength-first gym designed for people
            who want to push their limits. Plate-loaded machines, cable
            stations, free weights, and a full cardio zone come together
            in an environment built to make every workout count.
          </p>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

            {pillars.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="group bg-coal border border-white/10 border-l-2 border-l-accent p-5 sm:p-6 transition-all duration-300 hover:border-accent hover:-translate-y-1"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-accent/10 text-accent mb-4">
                  <Icon size={22} aria-hidden="true" />
                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  {title}
                </h3>

                <p className="text-muted text-sm leading-relaxed">
                  {text}
                </p>
              </div>
            ))}

          </div>

          {/* CTA */}
          <div className="mt-8 sm:mt-10">
            <button
              type="button"
              onClick={scrollToPrograms}
              className="btn btn-primary inline-flex items-center gap-3 group"
            >
              Explore Our Programs
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>

        </Reveal>
      </div>
    </section>
  )
}
