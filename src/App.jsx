import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import Navbar from './components/Navbar'; import Hero from './components/Hero'; import About from './components/About'
import Programs from './components/Programs'; import WhyChooseUs from './components/WhyChooseUs'
import Membership from './components/Membership'; import Gallery from './components/Gallery';
import CTA from './components/CTA'; import Contact from './components/Contact'; import Footer from './components/Footer'
export default function App() {
  const [top, setTop] = useState(false)
  useEffect(() => { const on = () => setTop(window.scrollY > 600); window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on) }, [])
  return (
    <>
      <Navbar /><main><Hero /><About /><Programs /><WhyChooseUs /><Membership /><Gallery /><CTA /><Contact /></main><Footer />
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 p-3 bg-accent hover:bg-red-700 transition ${top ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}><ArrowUp /></button>
    </>
  )
}