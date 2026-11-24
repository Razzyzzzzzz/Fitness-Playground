
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  ArrowUpRight,
  Dumbbell,
  ArrowUp,
  Clock,
  Navigation,
} from 'lucide-react'

import { gym, images, nav } from '../data'

const PHONE = '09652487821'

const socials = [
  {
    Icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/Fitplayph',
  },
  {
    Icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/fitplay.ph',
  },
]

const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Fitness Playground, ${gym.address}`
)}`

export default function Footer() {
  const quickLinks = nav.map((item) => {
    if (typeof item === 'string') {
      return {
        label: item,
        href: `#${item.toLowerCase().replace(/\s+/g, '-')}`,
      }
    }

    return {
      label: item.label,
      href: item.href || `#${item.id}`,
    }
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="relative overflow-hidden bg-black border-t border-white/10">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent/5 blur-[100px]" />

      {/* MAIN FOOTER */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16 lg:py-20">

          {/* BRAND */}
          <div>
            <a href="#" className="mb-6 flex items-center gap-3">
              <img
                src={images.logo}
                alt={`${gym.name} logo`}
                className="h-14 w-14 rounded object-contain"
              />

              <div>
                <h3 className="font-display text-xl text-white uppercase sm:text-2xl">
                  {gym.name}
                </h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                  Train Hard. Stay Strong.
                </p>
              </div>
            </a>

            <p className="max-w-sm text-sm leading-7 text-muted">
              Weights, functional training and cardio in a space
              built to make you stronger and better. Your goals.
              Your journey. Your playground.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">
                Follow Our Journey
              </p>

              <div className="flex gap-3">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${label} page`}
                    className="
                      flex h-11 w-11 items-center justify-center
                      border border-white/15 text-white
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-accent hover:bg-accent hover:text-black
                    "
                  >
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
              Explore
            </h4>

            <div className="mb-7 mt-4 h-[2px] w-10 bg-accent" />

            <ul className="space-y-4">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="
                      group flex w-fit items-center gap-2
                      text-sm text-muted
                      transition-colors duration-300
                      hover:text-accent
                    "
                  >
                    <ArrowUpRight
                      size={15}
                      className="text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFORMATION */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
              Get In Touch
            </h4>

            <div className="mb-7 mt-4 h-[2px] w-10 bg-accent" />

            <div className="space-y-6">

              {/* ADDRESS */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent/10 text-accent">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Visit Our Gym
                  </p>

                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm leading-6 text-muted transition-colors hover:text-accent"
                  >
                    {gym.address || 'Contact us for our gym location.'}
                  </a>

                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent hover:text-white"
                  >
                    Get Directions
                    <Navigation size={13} />
                  </a>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent/10 text-accent">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Call Us
                  </p>

                  <a
                    href={`tel:${PHONE}`}
                    className="mt-1 block text-sm text-muted transition-colors hover:text-accent"
                  >
                    0965 248 7821
                  </a>

                  <p className="mt-1 text-xs text-white/35">
                    We're ready to assist you.
                  </p>
                </div>
              </div>

              {/* HOURS */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent/10 text-accent">
                  <Clock size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Operating Hours
                  </p>

                  <div className="mt-2 space-y-3">
                    {gym.hours.map((h) => (
                      <div key={h.days}>
                        <p className="text-xs text-muted">
                          {h.days}
                        </p>
                        <p className="text-sm text-white">
                          {h.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* CALL TO ACTION */}
        <div className="relative mb-12 overflow-hidden border border-white/10 bg-[#111111] p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-[70px]" />

          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                Your Fitness Journey Starts Here
              </p>

              <h3 className="mt-3 font-display text-3xl uppercase text-white sm:text-4xl">
                Ready to get stronger?
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                Take the first step toward your fitness goals.
                Visit us or give us a call today.
              </p>
            </div>

            <a
              href={`tel:${PHONE}`}
              className="btn btn-primary flex shrink-0 items-center gap-2"
            >
              <Phone size={17} />
              Call Us Now
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="
          flex flex-col items-center justify-between gap-5
          border-t border-white/10 py-8
          sm:flex-row
        ">
          <div className="flex items-center gap-2 text-white/40">
            <Dumbbell size={17} className="text-accent" />
            <span className="text-[10px] uppercase tracking-[0.15em] sm:text-xs">
              Your goals. Your journey. Your playground.
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="
              group flex items-center gap-2
              text-xs font-bold uppercase tracking-widest
              text-muted transition-colors hover:text-accent
            "
          >
            Back to Top

            <span className="flex h-8 w-8 items-center justify-center border border-white/15 transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-black">
              <ArrowUp size={15} />
            </span>
          </button>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 px-5 py-6 text-center">
        <p className="text-xs leading-relaxed text-muted">
          © {new Date().getFullYear()} {gym.name}. All rights reserved.
        </p>

        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
          Designed for strength. Built for everyone.
        </p>
      </div>

    </footer>
  )
}
