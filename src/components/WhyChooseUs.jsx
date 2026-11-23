
import { useState, useEffect } from 'react'
import {
  Dumbbell,
  ArrowUpRight,
  X,
  CheckCircle2,
  Target,
  Users,
  ShieldCheck,
  Zap,
  HeartPulse,
  Trophy
} from 'lucide-react'

import Reveal from './Reveal'
import { why } from '../data'

// FEATURE DETAILS
const featureDetails = [
  {
    subtitle: 'TRAIN WITH CONFIDENCE',
    description:
      'Get access to quality gym equipment designed to support different types of workouts. Whether you are building strength, improving endurance, or working on your physique, you have the tools to make every training session count.',
    benefits: [
      'Equipment for different muscle groups',
      'Options for beginners and experienced lifters',
      'A training environment built for progress'
    ],
    reason:
      'The right equipment helps you train more effectively and gives you more ways to reach your fitness goals.',
    icon: Dumbbell
  },
  {
    subtitle: 'YOUR FITNESS, YOUR PACE',
    description:
      'Everyone starts somewhere. Fitness Playground welcomes members with different fitness levels and goals. Whether you are taking your first steps into fitness or pushing for a new personal record, you can work at your own pace.',
    benefits: [
      'Welcoming environment for all fitness levels',
      'Room to develop your own training routine',
      'A space to challenge yourself every day'
    ],
    reason:
      'Your fitness journey should be about your own progress, not comparing yourself with others.',
    icon: Target
  },
  {
    subtitle: 'STRONGER TOGETHER',
    description:
      'A motivating gym environment can make a big difference. Surround yourself with people who share an interest in fitness, discipline, and self-improvement.',
    benefits: [
      'Motivating workout atmosphere',
      'Connect with fellow fitness enthusiasts',
      'Build consistency through a positive environment'
    ],
    reason:
      'Having a supportive fitness community can help you stay motivated and committed to your routine.',
    icon: Users
  },
  {
    subtitle: 'YOUR SPACE TO FOCUS',
    description:
      'Make your workout time count in a space dedicated to training. Fitness Playground provides an environment where you can focus on your exercises and work toward becoming stronger.',
    benefits: [
      'Dedicated workout environment',
      'Space for strength and fitness activities',
      'A place to focus on your personal goals'
    ],
    reason:
      'A dedicated training space helps you build a routine and make fitness part of your lifestyle.',
    icon: ShieldCheck
  },
  {
    subtitle: 'MAKE EVERY SESSION COUNT',
    description:
      'Consistency is one of the most important parts of fitness. Build your routine, challenge yourself, and keep showing up. Every workout is another opportunity to improve.',
    benefits: [
      'Build a consistent workout routine',
      'Challenge yourself with new goals',
      'Track your personal improvements'
    ],
    reason:
      'Small improvements over time can lead to meaningful long-term fitness progress.',
    icon: Zap
  },
  {
    subtitle: 'INVEST IN YOUR WELL-BEING',
    description:
      'Fitness is more than appearance. Regular physical activity can support strength, endurance, mobility, and overall well-being. Make time for yourself and develop healthier habits.',
    benefits: [
      'Support your physical fitness',
      'Improve strength and endurance',
      'Develop healthier everyday habits'
    ],
    reason:
      'Taking care of your fitness is an investment in your health, confidence, and quality of life.',
    icon: HeartPulse
  }
]

export default function WhyChooseUs() {
  const [selected, setSelected] = useState(null)

  // CLOSE MODAL WITH ESCAPE
  useEffect(() => {
    if (selected === null) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelected(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [selected])

  const closeModal = () => setSelected(null)

  const handleJoin = () => {
    closeModal()

    setTimeout(() => {
      document.getElementById('membership')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 150)
  }

  return (
    <section className="relative overflow-hidden bg-[#0b0b0b] py-20 sm:py-24">

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-600/[0.06] blur-[120px]" />

      <div className="section relative z-10">

        {/* HEADER */}
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:mb-16 md:flex-row md:items-end">

            <div>
              <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-[#e50914]">
                <span className="h-[2px] w-8 bg-[#e50914]" />
                Why Choose Us
              </div>

              <h2 className="h-display max-w-3xl text-5xl uppercase leading-[0.95] text-white sm:text-6xl md:text-7xl">
                Built For
                <span className="block text-[#e50914]">
                  Results.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/50">
              More than just a gym. Discover what makes
              Fitness Playground the right place to start
              and continue your fitness journey.
            </p>

          </div>
        </Reveal>

        {/* FEATURE CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {why.map(([icon, title, text], index) => {
            const Icon = featureDetails[index]?.icon || Dumbbell

            return (
              <Reveal key={title} delay={index * 0.07}>

                <button
                  type="button"
                  onClick={() => setSelected(index)}
                  aria-label={`Learn more about ${title}`}
                  className="group relative flex min-h-[255px] w-full flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-[#151515] p-7 text-left transition-all duration-500 hover:-translate-y-2 hover:border-[#e50914]/60 hover:bg-[#1b1b1b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e50914] sm:p-8"
                >

                  {/* NUMBER */}
                  <span className="absolute right-6 top-5 font-display text-5xl font-black text-white/[0.035] transition-colors group-hover:text-[#e50914]/10">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* ICON */}
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-[#e50914] transition-all duration-500 group-hover:border-[#e50914] group-hover:bg-[#e50914] group-hover:text-white">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  {/* TEXT */}
                  <h3 className="mb-3 text-xl font-bold uppercase tracking-wide text-white transition-colors group-hover:text-[#ff303a]">
                    {title}
                  </h3>

                  <p className="max-w-sm text-sm leading-7 text-white/45 group-hover:text-white/65">
                    {text}
                  </p>

                  {/* LEARN MORE */}
                  <div className="mt-auto flex items-center gap-2 pt-6 text-[10px] font-bold uppercase tracking-[2px] text-[#e50914]">
                    Discover More
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>

                  {/* BOTTOM ACCENT */}
                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#e50914] transition-all duration-500 group-hover:w-full" />

                </button>

              </Reveal>
            )
          })}

        </div>

        {/* BOTTOM STATEMENT */}
        <Reveal>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row">

            <div className="flex items-center gap-3">
              <Dumbbell className="text-[#e50914]" size={22} />

              <p className="text-xs font-bold uppercase tracking-[2px] text-white/60">
                Your Goals. Your Journey. Your Playground.
              </p>
            </div>

            <p className="text-xs uppercase tracking-wider text-white/30">
              FITNESS PLAYGROUND
            </p>

          </div>
        </Reveal>

      </div>

      {/* FEATURE MODAL */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md sm:p-6"
          onClick={closeModal}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="feature-modal-title"
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#151515] shadow-2xl animate-in fade-in zoom-in-95 duration-300"
            onClick={(event) => event.stopPropagation()}
          >

            {/* RED TOP ACCENT */}
            <div className="h-1 w-full bg-[#e50914]" />

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-[#e50914]"
            >
              <X size={20} />
            </button>

            <div className="p-6 sm:p-10">

              {/* MODAL HEADER */}
              <div className="mb-8 flex items-center gap-5">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#e50914] text-white shadow-lg shadow-red-600/20">
                  {(() => {
                    const Icon = featureDetails[selected]?.icon || Dumbbell
                    return <Icon size={32} />
                  })()}
                </div>

                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[3px] text-[#e50914]">
                    Why Fitness Playground
                  </p>

                  <h3
                    id="feature-modal-title"
                    className="pr-8 text-xl font-black uppercase leading-tight text-white sm:text-3xl"
                  >
                    {why[selected][1]}
                  </h3>
                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="mb-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-white/40">
                  {featureDetails[selected]?.subtitle}
                </p>

                <p className="text-sm leading-8 text-white/65">
                  {featureDetails[selected]?.description || why[selected][2]}
                </p>
              </div>

              {/* BENEFITS */}
              <div className="mb-8 rounded-lg border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">

                <h4 className="mb-5 text-xs font-bold uppercase tracking-[2px] text-white">
                  What makes it special?
                </h4>

                <div className="space-y-4">
                  {(featureDetails[selected]?.benefits || []).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">

                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-[#e50914]"
                      />

                      <p className="text-sm leading-relaxed text-white/65">
                        {benefit}
                      </p>

                    </div>
                  ))}
                </div>

              </div>

              {/* WHY IT MATTERS */}
              <div className="mb-8 border-l-2 border-[#e50914] pl-5">

                <p className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[#e50914]">
                  Why it matters to you
                </p>

                <p className="text-sm leading-7 text-white/70">
                  {featureDetails[selected]?.reason}
                </p>

              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={handleJoin}
                  className="flex flex-1 items-center justify-center gap-3 bg-[#e50914] px-6 py-4 text-xs font-bold uppercase tracking-[2px] text-white transition hover:bg-red-700"
                >
                  Start Your Journey
                  <ArrowUpRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-white/15 px-6 py-4 text-xs font-bold uppercase tracking-[2px] text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Close
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  )
}
