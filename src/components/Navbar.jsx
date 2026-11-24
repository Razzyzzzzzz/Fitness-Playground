
import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { gym, images, nav } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const menuButtonRef = useRef(null)
  const panelRef = useRef(null)

  // NAVIGATION
  const go = (id) => {
    const sectionId = id.toLowerCase()

    setActiveSection(sectionId)
    setOpen(false)

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    menuButtonRef.current?.focus()
  }

  // SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // ACTIVE SECTION DETECTION
  useEffect(() => {
    const sectionIds = ['home', ...nav.map((item) => item.toLowerCase())]
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id)
        }
      },
      {
        rootMargin: '-25% 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // MOBILE MENU: BODY LOCK + KEYBOARD ACCESSIBILITY
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus the first navigation button
    const firstButton = panelRef.current?.querySelector('button')

    requestAnimationFrame(() => {
      firstButton?.focus()
    })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      // Keep keyboard focus inside the open menu
      if (event.key === 'Tab') {
        const focusableElements =
          panelRef.current?.querySelectorAll(
            'button:not([disabled])'
          )

        if (!focusableElements?.length) return

        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const isActive = (item) =>
    activeSection === item.toLowerCase()

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-300 ${
          scrolled || open
            ? 'bg-ink/95 shadow-xl backdrop-blur-xl'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => go('home')}
            className={`flex items-center gap-3 transition-opacity duration-300 ${
              open ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label="Go to homepage"
            tabIndex={open ? -1 : 0}
          >
            <img
              src={images.logo}
              alt=""
              className="h-11 w-11 rounded-lg bg-white object-contain p-1 sm:h-12 sm:w-12"
            />

            <span className="font-display text-lg font-bold uppercase tracking-wider text-white sm:text-xl">
              {gym.name}
            </span>
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 lg:flex xl:gap-9"
          >
            {nav.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => go(item)}
                aria-current={isActive(item) ? 'location' : undefined}
                className={`group relative py-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300 xl:text-sm ${
                  isActive(item)
                    ? 'text-accent'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {item}

                <span
                  className={`absolute bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${
                    isActive(item)
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}

            <button
              type="button"
              onClick={() => go('membership')}
              className="btn btn-primary inline-flex items-center gap-2"
            >
              Join Now
              <ArrowUpRight size={16} />
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            className="flex h-11 w-11 items-center justify-center border border-white/20 bg-black/30 text-white transition-all duration-300 hover:border-accent hover:bg-accent lg:hidden"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE BACKDROP */}
      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={open ? 0 : -1}
        onClick={() => {
          setOpen(false)
          menuButtonRef.current?.focus()
        }}
        className={`fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open
            ? 'visible opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
      />

      {/* MOBILE SLIDE-OUT MENU */}
      <aside
        ref={panelRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[65] flex h-[100dvh] w-[88%] max-w-[390px] flex-col overflow-y-auto border-l border-white/10 bg-[#090909] px-6 pb-8 pt-28 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* DECORATIVE RED LIGHT */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-20 blur-[100px]"
          style={{ background: '#dc2626' }}
        />

        {/* MENU HEADER */}
        <div className="relative mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-white p-1">
              <img
                src={images.logo}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <p className="font-display text-lg font-bold uppercase text-white">
                {gym.name}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[3px] text-accent">
                Train. Build. Repeat.
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="relative flex flex-col" aria-label="Mobile navigation links">
          {nav.map((item, index) => {
            const active = isActive(item)

            return (
              <button
                key={item}
                type="button"
                onClick={() => go(item)}
                tabIndex={open ? 0 : -1}
                aria-current={active ? 'location' : undefined}
                className={`group flex items-center justify-between border-b border-white/10 py-5 text-left transition-all duration-300 hover:pl-2 ${
                  active ? 'text-white' : 'text-white/65 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-4">
                  <span className={`text-xs font-bold ${
                    active ? 'text-accent' : 'text-white/30'
                  }`}>
                    0{index + 1}
                  </span>

                  <span className="text-sm font-bold uppercase tracking-[0.16em]">
                    {item}
                  </span>
                </span>

                <ArrowUpRight
                  size={18}
                  className={`transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${
                    active
                      ? 'text-accent opacity-100'
                      : 'text-white/30 opacity-50 group-hover:text-accent group-hover:opacity-100'
                  }`}
                />
              </button>
            )
          })}
        </nav>

        {/* JOIN NOW */}
        <div className="relative mt-auto pt-10">
          <p className="mb-4 text-sm leading-relaxed text-white/50">
            Ready to transform your fitness journey?
          </p>

          <button
            type="button"
            onClick={() => go('membership')}
            tabIndex={open ? 0 : -1}
            className="group flex w-full items-center justify-between bg-accent px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-red-700"
          >
            Join Now

            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>

          <p className="mt-7 text-center text-[10px] uppercase tracking-[0.2em] text-white/30">
            {gym.tagline}
          </p>
        </div>
      </aside>
    </>
  )
}
