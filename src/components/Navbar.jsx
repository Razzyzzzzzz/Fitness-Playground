
import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { gym, images, nav } from '../data'

const getSectionId = (item) =>
  item.toLowerCase().replace(/\s+/g, '-')

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const go = (item) => {
    const id = getSectionId(item)

    setActiveSection(id)
    setOpen(false)

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = [
      'home',
      ...nav.map(getSectionId),
    ]

    const sections = [...new Set(sectionIds)]
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )

        if (visible.length) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const closeOnResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnResize)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnResize)
    }
  }, [])

  const isActive = (item) =>
    activeSection === getSectionId(item)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-[#090909]/95 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-gradient-to-b from-black/75 to-transparent'
      }`}
    >
      {/* MAIN NAVBAR */}
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-24 lg:px-10">

        {/* LOGO */}
        <button
          onClick={() => go('Home')}
          className="flex items-center gap-3"
          aria-label="Go to homepage"
        >
          <img
            src={images.logo}
            alt="Fitness Playground"
            className="h-11 w-11 object-contain"
          />

          <div className="text-left">
            <h1 className="font-display text-sm font-black uppercase tracking-wide text-white sm:text-lg">
              Fitness Playground
            </h1>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-red-500">
              Train. Build. Repeat.
            </p>
          </div>
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <button
              key={item}
              onClick={() => go(item)}
              className={`relative py-3 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
                isActive(item)
                  ? 'text-red-500'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item}

              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-red-500 transition-all duration-300 ${
                  isActive(item) ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <button
          onClick={() => go('Membership')}
          className="hidden items-center gap-3 bg-red-600 px-6 py-3.5 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:bg-red-700 lg:flex"
        >
          Join Now
          <ArrowUpRight size={16} />
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:scale-105 hover:bg-red-700 lg:hidden"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`absolute left-0 right-0 top-full overflow-hidden border-t border-white/10 bg-[#0b0b0b]/[98] shadow-2xl transition-all duration-300 lg:hidden ${
          open
            ? 'visible max-h-[85vh] translate-y-0 opacity-100'
            : 'invisible max-h-0 -translate-y-2 opacity-0'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 py-5 sm:px-8">

          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              Explore Fitness Playground
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase text-white">
              Find Your <span className="text-red-500">Strength.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {nav.map((item, index) => (
              <button
                key={item}
                tabIndex={open ? 0 : -1}
                onClick={() => go(item)}
                className={`group flex min-h-[54px] items-center justify-between border-b border-white/10 px-2 text-left transition-all hover:bg-white/[0.04] ${
                  isActive(item)
                    ? 'text-red-500'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/25">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="text-sm font-bold uppercase tracking-widest">
                    {item}
                  </span>
                </span>

                <ArrowUpRight
                  size={17}
                  className="text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-500"
                />
              </button>
            ))}
          </div>

          <button
            tabIndex={open ? 0 : -1}
            onClick={() => go('Membership')}
            className="mt-6 flex min-h-[54px] w-full items-center justify-between bg-red-600 px-5 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-red-700"
          >
            Become a Member
            <ArrowUpRight size={19} />
          </button>

          <p className="mt-5 text-center text-[9px] uppercase tracking-[0.25em] text-white/30">
            {gym.tagline}
          </p>
        </nav>
      </div>
    </header>
  )
}
