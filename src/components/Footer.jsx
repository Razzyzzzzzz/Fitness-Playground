
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
  ChevronRight,
} from 'lucide-react'

import { gym, images, nav } from '../data'

const PHONE = gym.phone || '09652487821'

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

// NORMALIZE NAVIGATION
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

// SCROLL TO TOP
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// FOOTER TITLE
function FooterHeading({ children }) {
  return (
    <div className="mb-7">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">
        {children}
      </h3>
      <div className="mt-4 h-[2px] w-9 bg-red-600" />
    </div>
  )
}

// SOCIAL LINKS
function SocialLinks() {
  return (
    <div className="flex gap-3">
      {socials.map(({ Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit our ${label} page`}
          className="flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.03] text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  )
}

// CONTACT ITEM
function ContactItem({ Icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-red-500/20 bg-red-500/10 text-red-500">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <h4 className="text-xs font-bold uppercase tracking-wider text-white">
          {title}
        </h4>

        <div className="mt-2 text-sm leading-6 text-white/50">
          {children}
        </div>
      </div>
    </div>
  )
}

// MAIN FOOTER
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#070707]">

      {/* BACKGROUND ACCENTS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[450px] w-[450px] rounded-full bg-red-600/[0.06] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-red-600/[0.04] blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_1fr_1fr] lg:gap-12 lg:py-20">

          {/* BRAND COLUMN */}
          <div>
            <a
              href="#home"
              aria-label="Fitness Playground homepage"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-14 w-14 items-center justify-center bg-white p-1">
                <img
                  src={images.logo}
                  alt="Fitness Playground logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h2 className="font-display text-lg font-black uppercase leading-tight tracking-wide text-white">
                  Fitness
                  <br />
                  Playground
                </h2>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-red-500">
                  Train. Build. Repeat.
                </p>
              </div>
            </a>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/45">
              More than a gym. A place to challenge yourself,
              build strength, and become a better version of
              yourself. Your goals. Your journey. Your playground.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-8">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                Follow Our Journey
              </p>

              <SocialLinks />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <FooterHeading>Explore</FooterHeading>

            <ul className="space-y-4">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex w-fit items-center gap-2 text-sm text-white/45 transition-all duration-300 hover:translate-x-1 hover:text-red-500"
                  >
                    <ChevronRight
                      size={14}
                      className="text-red-600 opacity-0 transition-opacity group-hover:opacity-100"
                    />

                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <FooterHeading>Visit Us</FooterHeading>

            <div className="space-y-6">

              <ContactItem
                Icon={MapPin}
                title="Our Location"
              >
                <p>{gym.address}</p>

                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-red-500 transition-colors hover:text-white"
                >
                  Get Directions
                  <Navigation size={13} />
                </a>
              </ContactItem>

              <ContactItem
                Icon={Phone}
                title="Contact Number"
              >
                <a
                  href={`tel:${PHONE}`}
                  className="transition-colors hover:text-red-500"
                >
                  {PHONE.replace(
                    /^(\d{4})(\d{3})(\d{4})$/,
                    '$1 $2 $3'
                  )}
                </a>

                <p className="mt-1 text-xs text-white/30">
                  We're ready to assist you.
                </p>
              </ContactItem>

            </div>
          </div>

          {/* OPERATING HOURS */}
          <div>
            <FooterHeading>Opening Hours</FooterHeading>

            <div className="space-y-5">
              {gym.hours?.map((item) => (
                <div key={item.days}>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-red-500" />

                    <p className="text-xs font-bold uppercase tracking-wider text-white">
                      {item.days}
                    </p>
                  </div>

                  <p className="mt-2 pl-[22px] text-sm text-white/60">
                    {item.time}
                  </p>

                  <p className="mt-1 pl-[22px] text-[10px] text-white/30">
                    {item.last}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 border border-red-500/15 bg-red-500/[0.05] px-3 py-3">
              <span className="h-2 w-2 rounded-full bg-red-500" />

              <p className="text-[10px] font-bold uppercase tracking-wider text-white/65">
                Train on your schedule
              </p>
            </div>
          </div>

        </div>

        {/* MEMBERSHIP CTA */}
        <div className="relative mb-14 overflow-hidden border border-white/10 bg-[#101010]">

          {/* Red accent */}
          <div className="absolute bottom-0 left-0 top-0 w-1 bg-red-600" />

          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-red-600/[0.09] blur-[90px]" />

          <div className="relative flex flex-col items-start justify-between gap-7 p-6 sm:p-9 lg:flex-row lg:items-center lg:p-11">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-7 bg-red-500" />

                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500">
                  Your Fitness Journey Starts Here
                </p>
              </div>

              <h3 className="mt-4 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
                Ready to Get
                <span className="text-red-600"> Stronger?</span>
              </h3>

              <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
                Take the first step toward your fitness goals.
                Come visit Fitness Playground and start training today.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">

              <a
                href="#membership"
                className="group flex min-h-[52px] items-center justify-center gap-3 bg-red-600 px-7 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-red-700"
              >
                View Membership

                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href={`tel:${PHONE}`}
                className="flex min-h-[52px] items-center justify-center gap-3 border border-white/20 px-7 text-xs font-black uppercase tracking-wider text-white transition-all hover:border-red-500 hover:bg-white/[0.05]"
              >
                <Phone size={16} />
                Call Us
              </a>

            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 py-8 sm:flex-row">

          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="flex items-center gap-2 text-white/40">
              <Dumbbell size={16} className="text-red-500" />

              <p className="text-[10px] font-bold uppercase tracking-[0.16em]">
                Your Goals. Your Journey. Your Playground.
              </p>
            </div>

            <p className="text-[10px] text-white/25">
              © {new Date().getFullYear()} {gym.name}. All rights reserved.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-red-500"
          >
            Back to Top

            <span className="flex h-9 w-9 items-center justify-center border border-white/15 transition-all group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white">
              <ArrowUp size={16} />
            </span>
          </button>

        </div>
      </div>
    </footer>
  )
}
