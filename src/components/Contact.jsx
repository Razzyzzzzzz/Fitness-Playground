import { useEffect, useId, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Navigation, CheckCircle2 } from 'lucide-react'
import Reveal from './Reveal'
import { gym } from '../data'

// Map search text. For an exact pin, replace with the gym's exact coordinates
// copied from Google Maps (latitude,longitude).
const MAP_QUERY = encodeURIComponent(`Fitness Playground, ${gym.address}`)
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`

const EMPTY = { name: '', email: '', phone: '', message: '' }

const FIELDS = [
  { key: 'name', label: 'Full name', type: 'text', autoComplete: 'name', placeholder: 'Juan Dela Cruz' },
  { key: 'email', label: 'Email address', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
  { key: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '+63 900 000 0000' },
]

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (!/^[+\d][\d\s-]{6,}$/.test(v.phone)) e.phone = 'Enter a valid phone number.'
  if (v.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
  return e
}

const inputClass = (hasError) =>
  `mt-1.5 w-full bg-coal border p-3 text-white placeholder:text-white/30 outline-none transition-colors ${
    hasError ? 'border-accent' : 'border-white/15 hover:border-white/30 focus:border-accent'
  }`

function ContactRow({ Icon, title, children }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-0.5 shrink-0 text-accent" size={22} aria-hidden="true" />
      <div>
        <div className="font-semibold">{title}</div>
        <div className="mt-0.5 text-sm text-muted">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const uid = useId()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  // Pre-fill the message when someone clicks a membership plan
  useEffect(() => {
    const onPlan = (e) =>
      setValues((s) => ({ ...s, message: s.message || `I'd like to join the ${e.detail} plan.` }))
    window.addEventListener('plan', onPlan)
    return () => window.removeEventListener('plan', onPlan)
  }, [])

  const update = (key) => (e) => {
    setValues((s) => ({ ...s, [key]: e.target.value }))
    // Clear that field's error as soon as the person starts fixing it
    if (errors[key]) setErrors((s) => ({ ...s, [key]: undefined }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      // Move focus to the first invalid field
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setSending(true)
    try {
      // TODO: wire to your API, e.g. await fetch('/api/contact', { method: 'POST', body: JSON.stringify(values) })
      await new Promise((r) => setTimeout(r, 600))
      setSent(true)
      setValues(EMPTY)
    } finally {
      setSending(false)
    }
  }

  const fieldId = (k) => `${uid}-${k}`
  const errId = (k) => `${uid}-${k}-error`

  return (
    <section id="contact" className="bg-coal">
      <div className="section">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: who/where/when */}
          <Reveal>
            <p className="eyebrow">Get in touch</p>
            <h2 className="h-display mb-8 text-5xl md:text-7xl">Visit the playground</h2>

            <div className="space-y-6">
              <ContactRow Icon={MapPin} title="Address">
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  {gym.address}
                </a>
              </ContactRow>

              <ContactRow Icon={Phone} title="Phone">
                <a href={`tel:${String(gym.phone).replace(/[^\d+]/g, '')}`} className="transition hover:text-white">
                  {gym.phone}
                </a>
              </ContactRow>

              <ContactRow Icon={Mail} title="Email">
                <a href={`mailto:${gym.email}`} className="transition hover:text-white">
                  {gym.email}
                </a>
              </ContactRow>

              <ContactRow Icon={Clock} title="Operating hours">
                <ul className="space-y-2">
                  {gym.hours.map((h) => (
                    <li key={h.days}>
                      <span>{h.days}</span>
                      <span className="block text-white">
                        {h.time} <span className="text-sm text-muted">· {h.last}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </ContactRow>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.1}>
            {sent ? (
              <div
                role="status"
                className="flex h-full min-h-[24rem] flex-col items-center justify-center gap-4 border border-white/10 bg-ink p-8 text-center"
              >
                <CheckCircle2 size={48} className="text-accent" aria-hidden="true" />
                <h3 className="font-display text-3xl uppercase tracking-wide">Message sent</h3>
                <p className="max-w-xs text-muted">
                  Thanks for reaching out. We'll reply to your email or phone as soon as we can.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn btn-ghost mt-2">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5 border border-white/10 bg-ink p-6 md:p-8">
                <div>
                  <h3 className="font-display text-3xl uppercase tracking-wide">Send us a message</h3>
                  <p className="mt-1 text-sm text-muted">Questions about plans, trials or hours? We'll get back to you.</p>
                </div>

                {FIELDS.map(({ key, label, ...props }) => (
                  <div key={key}>
                    <label htmlFor={fieldId(key)} className="text-sm text-muted">
                      {label}
                    </label>
                    <input
                      id={fieldId(key)}
                      value={values[key]}
                      onChange={update(key)}
                      aria-invalid={Boolean(errors[key])}
                      aria-describedby={errors[key] ? errId(key) : undefined}
                      className={inputClass(errors[key])}
                      {...props}
                    />
                    {errors[key] && (
                      <p id={errId(key)} className="mt-1 text-xs text-accent">
                        {errors[key]}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <label htmlFor={fieldId('message')} className="text-sm text-muted">
                    Message
                  </label>
                  <textarea
                    id={fieldId('message')}
                    rows={5}
                    value={values.message}
                    onChange={update('message')}
                    placeholder="Tell us what you're looking for."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? errId('message') : undefined}
                    className={`${inputClass(errors.message)} resize-y`}
                  />
                  {errors.message && (
                    <p id={errId('message')} className="mt-1 text-xs text-accent">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button type="submit" disabled={sending} className="btn btn-primary w-full">
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </Reveal>
        </div>

        {/* Full-width map: balances the two columns and is easier to use */}
        <Reveal delay={0.1}>
          <div className="relative mt-14 h-72 overflow-hidden border border-white/10 bg-ink md:h-96">
            <iframe
              title="Fitness Playground location"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0"
              style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(0.9)' }}
            />
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary absolute bottom-4 left-4"
            >
              <Navigation size={16} aria-hidden="true" /> Get directions
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}