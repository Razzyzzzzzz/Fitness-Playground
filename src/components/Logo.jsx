/**
 * Logo-only brand mark.
 * - No "FITNESS PLAYGROUND" text beside it
 * - Hides the small caption printed inside the logo image itself
 *
 * Usage in Navbar.jsx:
 *   import Logo from './Logo'
 *   import logoSrc from '../assets/logo.png'   // your existing logo path
 *   <Logo src={logoSrc} />
 *
 * If the caption still peeks out (or the icon looks off-center), tune:
 *   coverHeight - % of the tile (from the bottom) painted over to hide the caption
 *   shiftY      - % to nudge the icon down so it sits centered after the cover
 *
 * Best long-term fix: export the logo PNG without the caption and delete the cover.
 */
export default function Logo({ src, coverHeight = 20, shiftY = 4, className = '' }) {
  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault()
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
      }}
      aria-label="Fitness Playground, back to top"
      className={`group inline-flex shrink-0 items-center ${className}`}
    >
      <span
        className="relative block h-11 w-11 md:h-14 md:w-14 overflow-hidden bg-white
                   ring-1 ring-white/10 transition-all duration-300
                   group-hover:ring-accent group-hover:scale-105
                   group-hover:shadow-[0_0_24px_-4px_rgba(220,38,38,0.8)]"
      >
        <img
          src={src}
          alt=""
          className="h-full w-full object-contain"
          style={{ transform: `translateY(${shiftY}%)` }}
        />
        {/* White strip hides the caption text inside the logo image */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 bg-white"
          style={{ height: `${coverHeight}%` }}
        />
      </span>
      <span className="sr-only">Fitness Playground</span>
    </a>
  )
}
