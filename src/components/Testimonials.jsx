import { useEffect, useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials } from '../data'
export default function Testimonials() {
  const [i, setI] = useState(0); const n = testimonials.length
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % n), 6000); return () => clearInterval(t) }, [n])
  const t = testimonials[i]
  return (
    <section className="section text-center">
      <p className="eyebrow">Member stories</p><h2 className="h-display text-5xl md:text-7xl mb-12">What members say</h2>
      <div className="max-w-2xl mx-auto min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
            <div className="mx-auto h-20 w-20 rounded-full bg-accent flex items-center justify-center font-display text-4xl">{t.name[0]}</div>
            <div className="flex justify-center gap-1 my-4 text-accent">{Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={18} fill="currentColor" />)}</div>
            <p className="text-xl text-white/90">“{t.text}”</p><p className="mt-4 font-semibold">{t.name}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous" className="p-2 border border-white/20 hover:border-accent"><ChevronLeft /></button>
        {testimonials.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Review ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-accent' : 'w-2 bg-white/30'}`} />)}
        <button onClick={() => setI((i + 1) % n)} aria-label="Next" className="p-2 border border-white/20 hover:border-accent"><ChevronRight /></button>
      </div>
    </section>
  )
}
