import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { programs } from '../data'
export default function Programs() {
  const [active, setActive] = useState(null)
  return (
    <section id="programs" className="bg-coal"><div className="section">
      <Reveal><p className="eyebrow">What we offer</p><h2 className="h-display text-5xl md:text-7xl mb-12">Fitness programs</h2></Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <article onClick={() => setActive(active === i ? null : i)} className="group relative h-96 overflow-hidden cursor-pointer bg-ink">
              <img src={p.img} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="h-display text-3xl">{p.title}</h3>
                <p className={`text-sm text-white/80 mt-2 transition-all duration-300 overflow-hidden ${active === i ? 'max-h-32' : 'max-h-0 group-hover:max-h-32'}`}>{p.text}</p>
                <button onClick={(e) => { e.stopPropagation(); document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' }) }} className="mt-3 flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider">Explore Program <ArrowRight size={16} className="transition group-hover:translate-x-1" /></button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div></section>
  )
}
