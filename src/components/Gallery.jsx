
import { useState, useEffect, useCallback, useRef } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Images,
  ArrowUpRight,
} from 'lucide-react'

import Reveal from './Reveal'
import { gallery } from '../data'

const INITIAL_COUNT = 9

function GalleryItem({ item, index, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <button
      type="button"
      onClick={(event) => onOpen(index, event)}
      aria-label={`View photo ${index + 1}: ${item.alt || 'Gym photo'}`}
      className="
        group relative w-full overflow-hidden
        bg-[#171717] text-left
        border border-white/[0.07]
        transition-all duration-500
        hover:border-red-500/60
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-red-500
      "
    >
      <div className="relative aspect-[4/3] overflow-hidden">

        {!error && (
          <img
            src={item.src}
            alt={item.alt || 'Fitness Playground gym'}
            loading={index < 3 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`
              absolute inset-0 h-full w-full object-cover
              transition-all duration-700 ease-out
              group-hover:scale-110
              ${loaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
        )}

        {!loaded && !error && (
          <div className="absolute inset-0 animate-pulse bg-white/[0.06]" />
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/40">
            <Images size={28} />
            <span className="text-xs">Image unavailable</span>
          </div>
        )}

        {/* Image overlay */}
        <div className="
          absolute inset-0
          bg-gradient-to-t
          from-black/90 via-black/10 to-black/5
          opacity-80 transition-all duration-500
          group-hover:opacity-100
        " />

        {/* Red corner accent */}
        <div className="
          absolute left-0 top-0 h-1 w-0
          bg-red-600 transition-all duration-500
          group-hover:w-full
        " />

        {/* Expand icon */}
        <div className="
          absolute right-4 top-4
          flex h-10 w-10 items-center justify-center
          bg-red-600 text-white
          opacity-0 scale-75
          transition-all duration-300
          group-hover:scale-100 group-hover:opacity-100
        ">
          <Maximize2 size={17} />
        </div>

        {/* Caption */}
        <div className="
          absolute bottom-0 left-0 right-0
          translate-y-2 p-5
          transition-transform duration-500
          group-hover:translate-y-0
        ">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[3px] text-red-500">
            FITNESS PLAYGROUND
          </p>

          <p className="text-sm font-bold uppercase tracking-wide text-white sm:text-base">
            {item.alt || `Gym Photo ${index + 1}`}
          </p>

          <div className="
            mt-3 h-[2px] w-0 bg-red-600
            transition-all duration-500
            group-hover:w-12
          " />
        </div>
      </div>
    </button>
  )
}

export default function Gallery() {
  const [active, setActive] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const sectionRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lastTriggerRef = useRef(null)
  const touchX = useRef(null)

  const total = gallery.length
  const current = active !== null ? gallery[active] : null

  const visible = showAll
    ? gallery
    : gallery.slice(0, INITIAL_COUNT)

  // Open image viewer
  const openPhoto = useCallback((index, event) => {
    lastTriggerRef.current = event.currentTarget
    setActive(index)
  }, [])

  // Close image viewer
  const close = useCallback(() => {
    setActive(null)
  }, [])

  // Navigate next
  const next = useCallback(() => {
    setActive((index) =>
      index === null ? null : (index + 1) % total
    )
  }, [total])

  // Navigate previous
  const prev = useCallback(() => {
    setActive((index) =>
      index === null ? null : (index - 1 + total) % total
    )
  }, [total])

  // Keyboard navigation and background scroll lock
  useEffect(() => {
    if (active === null) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      lastTriggerRef.current?.focus?.()
    }
  }, [active, close, next, prev])

  // Preload adjacent images
  useEffect(() => {
    if (active === null || total < 2) return

    const indexes = [
      (active + 1) % total,
      (active - 1 + total) % total,
    ]

    indexes.forEach((index) => {
      const img = new Image()
      img.src = gallery[index].src
    })
  }, [active, total])

  // Toggle gallery
  const toggleAll = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    setShowAll((value) => !value)
  }

  // Mobile swipe
  const onTouchStart = (event) => {
    touchX.current = event.touches[0].clientX
  }

  const onTouchEnd = (event) => {
    if (touchX.current === null) return

    const distance =
      event.changedTouches[0].clientX - touchX.current

    touchX.current = null

    if (Math.abs(distance) > 50) {
      distance < 0 ? next() : prev()
    }
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="
        relative overflow-hidden
        bg-[#090909]
        py-20 sm:py-24 lg:py-28
        scroll-mt-20
      "
    >
      {/* Background decoration */}
      <div className="
        pointer-events-none absolute
        -right-40 top-20
        h-96 w-96 rounded-full
        bg-red-600/[0.07] blur-[130px]
      " />

      <div className="section relative z-10">

        {/* HEADER */}
        <Reveal>
          <div className="
            mb-12 flex flex-col justify-between gap-8
            border-b border-white/10 pb-8
            md:mb-14 md:flex-row md:items-end
          ">

            <div>
              <div className="eyebrow mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-accent" />
                <Images size={16} />
                OUR GALLERY
              </div>

              <h2 className="
                h-display text-5xl font-black
                uppercase leading-[0.9]
                text-white sm:text-6xl md:text-7xl
              ">
                Inside The
                <span className="block text-accent">
                  Playground.
                </span>
              </h2>
            </div>

            <div className="max-w-sm">
              <p className="
                text-sm leading-7 text-white/55
                sm:text-base
              ">
                Take a closer look at our training
                environment, equipment, and workout
                spaces. This is where your journey
                towards a stronger version of yourself begins.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <span className="
                  font-display text-4xl
                  font-black text-white
                ">
                  {String(total).padStart(2, '0')}
                </span>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[2px] text-white">
                    Gym Photos
                  </p>
                  <p className="mt-1 text-[10px] text-white/40">
                    FITNESS PLAYGROUND
                  </p>
                </div>
              </div>
            </div>

          </div>
        </Reveal>

        {/* GALLERY GRID */}
        <Reveal>
          <div className="
            grid grid-cols-1 gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-5
          ">
            {visible.map((item, index) => (
              <GalleryItem
                key={`${item.src}-${index}`}
                item={item}
                index={index}
                onOpen={openPhoto}
              />
            ))}
          </div>
        </Reveal>

        {/* VIEW ALL */}
        {total > INITIAL_COUNT && (
          <Reveal>
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={toggleAll}
                className="
                  group inline-flex items-center gap-4
                  border border-white/20
                  px-8 py-4
                  text-xs font-bold uppercase
                  tracking-[2px] text-white
                  transition-all duration-300
                  hover:border-accent
                  hover:bg-accent
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent
                "
              >
                {showAll
                  ? 'Show Less'
                  : `View All ${total} Photos`
                }

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </button>
            </div>
          </Reveal>
        )}

        {/* FULLSCREEN IMAGE VIEWER */}
        {current && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Gym photo viewer"
            onClick={(event) => {
              if (event.target === event.currentTarget) close()
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="
              fixed inset-0 z-[100]
              flex flex-col items-center justify-center
              bg-black/95 p-4
              backdrop-blur-md
              sm:p-8
            "
          >

            {/* TOP BAR */}
            <div className="
              absolute left-5 top-5
              text-xs font-bold uppercase
              tracking-[3px] text-white/50
              sm:left-8 sm:top-8
            ">
              FITNESS PLAYGROUND

              <span className="mx-3 text-accent">
                {String(active + 1).padStart(2, '0')}
                /
                {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* CLOSE */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="
                absolute right-5 top-5 z-20
                flex h-11 w-11 items-center justify-center
                border border-white/20
                bg-white/10 text-white
                transition-all duration-300
                hover:border-accent hover:bg-accent
                sm:right-8 sm:top-8
              "
            >
              <X size={22} />
            </button>

            {/* PREVIOUS */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="
                absolute left-2 top-1/2 z-20
                flex h-11 w-11 -translate-y-1/2
                items-center justify-center
                border border-white/20
                bg-black/60 text-white
                transition-all duration-300
                hover:border-accent hover:bg-accent
                sm:left-8 sm:h-14 sm:w-14
              "
            >
              <ChevronLeft size={26} />
            </button>

            {/* MAIN IMAGE */}
            <img
              key={current.src}
              src={current.src}
              alt={current.alt || 'Fitness Playground gym'}
              draggable={false}
              className="
                max-h-[62vh] max-w-[85vw]
                select-none object-contain
                shadow-2xl
                sm:max-h-[70vh]
              "
            />

            {/* NEXT */}
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="
                absolute right-2 top-1/2 z-20
                flex h-11 w-11 -translate-y-1/2
                items-center justify-center
                border border-white/20
                bg-black/60 text-white
                transition-all duration-300
                hover:border-accent hover:bg-accent
                sm:right-8 sm:h-14 sm:w-14
              "
            >
              <ChevronRight size={26} />
            </button>

            {/* IMAGE DESCRIPTION */}
            <div className="mt-5 text-center">
              <p className="
                text-sm font-bold uppercase
                tracking-[2px] text-white
              ">
                {current.alt || 'Gym Photo'}
              </p>

              <p className="
                mt-2 text-[10px] uppercase
                tracking-[3px] text-accent
              ">
                Fitness Playground
              </p>
            </div>

            {/* THUMBNAILS */}
            <div className="
              mt-5 flex max-w-[90vw]
              gap-2 overflow-x-auto pb-2
            ">
              {gallery.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View photo ${index + 1}`}
                  aria-current={index === active ? 'true' : undefined}
                  className={`
                    h-12 w-16 shrink-0 overflow-hidden
                    border-2 transition-all duration-300
                    sm:h-14 sm:w-20
                    ${
                      index === active
                        ? 'border-accent opacity-100'
                        : 'border-transparent opacity-40 hover:opacity-100'
                    }
                  `}
                >
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <p className="mt-3 text-[9px] uppercase tracking-[2px] text-white/30">
              Use arrow keys or swipe to navigate
            </p>

          </div>
        )}

      </div>
    </section>
  )
}
