
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Dumbbell,
  ArrowUp,
} from 'lucide-react'

import { gym, images, nav } from '../data'

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
    <footer className="bg-black border-t border-white/10">

      {/* MAIN FOOTER */}
      <div className="
        max-w-7xl mx-auto
        px-5 sm:px-8 lg:px-10
        pt-14 sm:pt-20 pb-12
      ">

        <div className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-10 lg:gap-16
        ">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={images.logo}
                alt={`${gym.name} logo`}
                className="h-12 w-12 object-contain rounded"
              />

              <div>
                <h3 className="font-display text-xl sm:text-2xl text-white uppercase">
                  {gym.name}
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-accent uppercase">
                  Train Hard. Stay Strong.
                </p>
              </div>
            </div>

            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Weights, functional training and cardio in a space
              built to make you stronger and better. Your goals.
              Your journey. Your playground.
            </p>

            {/* SOCIAL LINKS */}
            <div className="flex gap-3 mt-7">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${label} page`}
                  className="
                    w-11 h-11
                    flex items-center justify-center
                    border border-white/15
                    text-white
                    hover:bg-accent hover:border-accent
                    transition-all duration-300
                  "
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="
              text-white font-bold text-sm
              uppercase tracking-widest mb-6
            ">
              Quick Links
            </h4>

            <div className="w-9 h-[2px] bg-accent mb-6" />

            <ul className="space-y-4">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="
                      group flex items-center gap-2
                      text-muted text-sm
                      hover:text-accent
                      transition-colors duration-300
                    "
                  >
                    <ArrowUpRight
                      size={14}
                      className="text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFORMATION */}
          <div>
            <h4 className="
              text-white font-bold text-sm
              uppercase tracking-widest mb-6
            ">
              Get In Touch
            </h4>

            <div className="w-9 h-[2px] bg-accent mb-6" />

            <div className="space-y-5">

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-accent/10 text-accent">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-white text-sm font-semibold">
                    Visit Us
                  </p>
                  <p className="text-muted text-sm mt-1">
                    {gym.address || 'Contact us for our gym location.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-accent/10 text-accent">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-white text-sm font-semibold">
                    Call Us
                  </p>
                  <a
                    href={`tel:${gym.phone}`}
                    className="text-muted text-sm mt-1 block hover:text-accent transition-colors"
                  >
                    {gym.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-accent/10 text-accent">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-white text-sm font-semibold">
                    Email Us
                  </p>
                  <a
                    href={`mailto:${gym.email}`}
                    className="text-muted text-sm mt-1 block hover:text-accent transition-colors break-all"
                  >
                    {gym.email}
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* FOOTER BRAND MESSAGE */}
        <div className="
          mt-14 sm:mt-20
          border-t border-white/10
          pt-8
          flex flex-col sm:flex-row
          items-center justify-between
          gap-5
        ">
          <div className="flex items-center gap-2 text-white/50">
            <Dumbbell size={17} className="text-accent" />
            <span className="text-xs uppercase tracking-widest">
              Your goals. Your journey. Your playground.
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="
              flex items-center gap-2
              text-xs font-bold uppercase tracking-widest
              text-muted hover:text-accent
              transition-colors
            "
          >
            Back to Top
            <ArrowUp size={16} />
          </button>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="
        border-t border-white/10
        px-5 py-6
        text-center
      ">
        <p className="text-muted text-xs leading-relaxed">
          © {new Date().getFullYear()} {gym.name}. All rights reserved.
        </p>

        <p className="text-white/30 text-[10px] mt-2 uppercase tracking-widest">
          Designed for strength. Built for everyone.
        </p>
      </div>

    </footer>
  )
}
