
import {
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react'

import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Images,
  ArrowUpRight
} from 'lucide-react'

import Reveal from './Reveal'
import { gallery } from '../data'

const INITIAL_COUNT = 9

// GALLERY IMAGE CARD
function GalleryItem({ item, index, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`View photo ${index + 1}: ${item.alt || 'Gym photo'}`}
      className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg bg-[#1a1a1a] text-left"
    >
      {/* Image */}
      {!error && (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`block h-auto w-full transition-all duration-700 ease-out
            group-hover:scale-[1.04]
            ${loaded ? 'opacity-100' : 'min-h-[180px] opacity-0'}
          `}
        />
      )}

      {/* Image error fallback */}
      {error && (
        <div className="flex aspect-[4/3] items-center justify-center text-sm text-white/40">
          Image unavailable
        </div>
      )}

      {/* Loading background */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-white/5" />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Expand icon */}
      <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#e50914] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Maximize2 size={17} />
      </div>

      {/* Photo caption */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#ff303a]">
          Fitness Playground
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          {item.alt || `Gym Photo ${index + 1}`}
        </p>
      </div>
    </button>
  )
}

// MAIN GALLERY
export default function Gallery() {
  const [active, setActive] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const touchX = useRef(null)
  const sectionRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lastTriggerRef = useRef(null)

  const total = gallery.length

  const visible = showAll
    ? gallery
    : gallery.slice(0, INITIAL_COUNT)

  const current = active !== null
    ? gallery[active]
    : null

  // OPEN PHOTO
  const openPhoto = (index, event) => {
    lastTriggerRef.current = event?.currentTarget || document.activeElement
    setActive(index)
  }

  // CLOSE VIEWER
  const close = useCallback(() => {
    setActive(null)
  }, [])

  // NEXT PHOTO
  const next = useCallback(() => {
    setActive((index) =>
      index === null ? null : (index + 1) % total
    )
  }, [total])

  // PREVIOUS PHOTO
  const prev = useCallback(() => {
    setActive((index) =>
      index === null ? null : (index - 1 + total) % total
    )
  }, [total])

  // VIEWER KEYBOARD AND FOCUS MANAGEMENT
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

      // Restore focus after the viewer closes
      if (document.activeElement === closeButtonRef.current) {
        lastTriggerRef.current?.focus?.()
      }
    }
  }, [active, close, next, prev])

  // PRELOAD NEXT AND PREVIOUS IMAGES
  useEffect(() => {
    if (active === null || total === 0) return

    const indexes = [
      (active + 1) % total,
      (active - 1 + total) % total
    ]

    indexes.forEach((index) => {
      const img = new Image()
      img.src = gallery[index].src
    })
  }, [active, total])

  // SHOW MORE / LESS
  const toggleAll = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    setShowAll((value) => !value)
  }

  // MOBILE SWIPE
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
      className="relative overflow-hidden bg-[#101010] py-20 sm:py-24"
    >
      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-red-600/[0.06] blur-[120px]" />

      <div className="section relative z-10">

        {/* SECTION HEADER */}
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:mb-12 md:flex-row md:items-end">

            <div>
              <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[3px] text-[#e50914]">
                <span className="h-[2px] w-7 bg-[#e50914]" />
                <Images size={15} />
                Our Gallery
              </div>

              <h2 className="h-display text-5xl uppercase leading-none text-white sm:text-6xl md:text-7xl">
                Inside The
                <span className="block text-[#e50914]">
                  Gym.
                </span>
              </h2>
            </div>

            <div className="max-w-sm">
              <p className="text-sm leading-7 text-white/55">
                Explore our training floor, modern equipment
                and workout spaces. See where your fitness
                journey begins.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-2xl font-black text-white">
                  {total}
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[2px] text-white/40">
                  Real Gym Photos
                </span>
              </div>
            </div>

          </div>
        </Reveal>

        {/* MASONRY GALLERY */}
        <Reveal>
          <div className="columns-2 gap-3 md:columns-3 md:gap-4">

            {visible.map((item, index) => (
              <GalleryItem
                key={item.src}
                item={item}
                index={index}
                onOpen={(i) => openPhoto(i)}
              />
            ))}

          </div>
        </Reveal>

        {/* VIEW ALL BUTTON */}
        {total > INITIAL_COUNT && (
          <div className="mt-12 flex justify-center">

            <button
              type="button"
              onClick={toggleAll}
              className="group inline-flex items-center gap-4 border border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-[2px] text-white transition-all duration-300 hover:border-[#e50914] hover:bg-[#e50914]"
            >
              {showAll
                ? 'Show Less'
                : `View All ${total} Photos`
              }

              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

          </div>
        )}

        {/* FULLSCREEN IMAGE VIEWER */}
        {current && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Gym photo viewer"
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
          >

            {/* TOP BAR */}
            <div className="absolute left-5 top-5 text-xs font-bold uppercase tracking-[3px] text-white/50 sm:left-8 sm:top-8">
              PHOTO
              <span className="mx-3 text-[#e50914]">
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
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-[#e50914] sm:right-8 sm:top-8"
            >
              <X size={22} />
            </button>

            {/* PREVIOUS */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:bg-[#e50914] sm:left-8 sm:h-14 sm:w-14"
            >
              <ChevronLeft size={26} />
            </button>

            {/* MAIN IMAGE */}
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              draggable={false}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[72vh] max-w-[85vw] select-none rounded-lg object-contain shadow-2xl sm:max-h-[76vh]"
            />

            {/* NEXT */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                next()
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition hover:bg-[#e50914] sm:right-8 sm:h-14 sm:w-14"
            >
              <ChevronRight size={26} />
            </button>

            {/* IMAGE DESCRIPTION */}
            <div className="mt-5 text-center">
              <p className="text-sm font-bold uppercase tracking-[2px] text-white">
                {current.alt}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[3px] text-[#e50914]">
                Fitness Playground
              </p>
            </div>

            {/* THUMBNAILS */}
            <div
              className="mt-5 flex max-w-[90vw] gap-2 overflow-x-auto pb-2"
              onClick={(event) => event.stopPropagation()}
            >
              {gallery.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View photo ${index + 1}`}
                  aria-current={index === active ? 'true' : undefined}
                  className={`h-12 w-16 shrink-0 overflow-hidden rounded border-2 transition sm:h-14 sm:w-20 ${
                    index === active
                      ? 'border-[#e50914] opacity-100'
                      : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  )
}
