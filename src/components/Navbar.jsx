
import { useEffect, useRef, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { gym, images, nav } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const menuButtonRef = useRef(null)

  // Close menu safely and restore keyboard focus
  const closeMenu = () => {
    menuButtonRef.current?.focus()
    setOpen(false)
  }

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Handle Escape key and background scrolling
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // Smooth navigation
  const go = (id) => {
    closeMenu()

    setTimeout(() => {
      document.getElementById(id.toLowerCase())?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? 'bg-ink/95 shadow-xl backdrop-blur-xl'
            : 'bg-gradient-to-b from-black/70 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => go('home')}
            className="flex items-center gap-3"
            aria-label="Go to homepage"
          >
            <img
              src={images.logo}
              alt="Fitness Playground logo"
              className="h-12 w-12 rounded-lg bg-white object-contain p-1"
            />

            <span className="font-display text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
              {gym.name}
            </span>
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => go(item)}
                className="relative py-2 text-sm font-semibold uppercase tracking-wider text-white/80 transition hover:text-accent"
              >
                {item}
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
            onClick={() => {
              if (open) {
                closeMenu()
              } else {
                setOpen(true)
              }
            }}
            className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white transition hover:border-accent hover:bg-accent lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </header>

      {/* MOBILE BACKDROP */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
        className={`fixed inset-0 z-[55] bg-black/75 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open
            ? 'visible opacity-100'
            : 'invisible pointer-events-none opacity-0'
        }`}
      />

      {/* MOBILE SLIDE-OUT MENU */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[58] flex h-[100dvh] w-[85%] max-w-[380px] flex-col bg-[#090909] px-6 pb-8 pt-24 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* MENU HEADER */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <p className="font-display text-xl font-bold uppercase tracking-wider text-white">
            {gym.name}
          </p>

          <p className="mt-2 text-xs uppercase tracking-[3px] text-accent">
            Train. Build. Repeat.
          </p>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex flex-col">
          {nav.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => go(item)}
              tabIndex={open ? 0 : -1}
              className="group flex items-center justify-between border-b border-white/10 py-5 text-left text-sm font-bold uppercase tracking-widest text-white/75 transition hover:pl-2 hover:text-accent"
            >
              <span className="flex items-center gap-4">
                <span className="text-xs text-accent">
                  0{index + 1}
                </span>
                {item}
              </span>

              <ArrowUpRight
                size={17}
                className="opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100"
              />
            </button>
          ))}
        </nav>

        {/* JOIN NOW */}
        <div className="mt-auto">
          <p className="mb-4 text-sm text-white/50">
            Ready to transform your fitness journey?
          </p>

          <button
            type="button"
            onClick={() => go('membership')}
            tabIndex={open ? 0 : -1}
            className="flex w-full items-center justify-between bg-accent px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
          >
            Join Now
            <ArrowUpRight size={19} />
          </button>

          <p className="mt-6 text-center text-xs text-white/30">
            {gym.tagline}
          </p>
        </div>
      </aside>
    </>
  )
}
