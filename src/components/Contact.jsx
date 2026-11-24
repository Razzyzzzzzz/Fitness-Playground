
import { useEffect, useId, useState } from 'react'
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react'

import Reveal from './Reveal'
import { gym } from '../data'

const MAP_QUERY = encodeURIComponent(
  `Fitness Playground, ${gym.address}`
)

const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`

const EMPTY = {
  name: '',
  phone: '',
  message: '',
}

const FIELDS = [
  {
    key: 'name',
    label: 'Full name',
    type: 'text',
    placeholder: 'Juan Dela Cruz',
    autoComplete: 'name',
  },
  {
    key: 'phone',
    label: 'Phone number',
    type: 'tel',
    placeholder: '09XX XXX XXXX',
    autoComplete: 'tel',
  },
]

const inputClass = (hasError) =>
  `mt-2 w-full border bg-[#111111] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-300 ${
    hasError
      ? 'border-red-500 focus:border-red-500'
      : 'border-white/10 hover:border-white/25 focus:border-red-500'
  }`

// FORM VALIDATION
function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }

  if (!/^[+\d][\d\s-]{6,}$/.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}

// CONTACT INFORMATION ITEM
function ContactRow({ Icon, title, children }) {
  return (
    <div className="group flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-red-500/20 bg-red-500/[0.07] text-red-500 transition-all duration-300 group-hover:border-red-500 group-hover:bg-red-600 group-hover:text-white">
        <Icon size={21} strokeWidth={1.7} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-xs font-black uppercase tracking-[0.15em] text-white">
          {title}
        </h3>

        <div className="mt-2 text-sm leading-6 text-white/50">
          {children}
        </div>
      </div>
    </div>
  )
}

// MAIN CONTACT SECTION
export default function Contact() {
  const uid = useId()

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  // LISTEN FOR MEMBERSHIP PLAN SELECTION
  useEffect(() => {
    const onPlan = (e) => {
      setValues((s) => ({
        ...s,
        message: s.message || `I'd like to join the ${e.detail} plan.`,
      }))
    }

    window.addEventListener('plan', onPlan)

    return () => {
      window.removeEventListener('plan', onPlan)
    }
  }, [])

  // UPDATE INPUT VALUES
  const update = (key) => (e) => {
    setValues((s) => ({
      ...s,
      [key]: e.target.value,
    }))

    if (errors[key]) {
      setErrors((s) => ({
        ...s,
        [key]: undefined,
      }))
    }
  }

  // SUBMIT FORM
  const submit = (e) => {
    e.preventDefault()

    const found = validate(values)

    setErrors(found)

    if (Object.keys(found).length > 0) {
      return
    }

    const message = [
      'Fitness Playground Inquiry',
      '',
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      `Message: ${values.message.trim()}`,
    ].join('\n')

    const smsLink = `sms:${gym.phone.replace(/\D/g, '')}?body=${encodeURIComponent(message)}`

    setSent(true)

    window.location.href = smsLink
  }

  const fieldId = (key) => `${uid}-${key}`
  const errId = (key) => `${uid}-${key}-error`

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-[#080808] text-white"
    >
      {/* BACKGROUND ACCENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-red-600/[0.06] blur-[130px]"
      />

      <div className="section relative z-10">

        {/* SECTION HEADER */}
        <Reveal>
          <div className="mb-14 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-red-600" />

              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 sm:text-xs">
                Get In Touch
              </p>
            </div>

            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Visit The
              <span className="block text-red-600">
                Playground.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/45 sm:text-base">
              Have questions about membership or want to start
              your fitness journey? Get in touch with us.
            </p>
          </div>
        </Reveal>

        {/* MAIN CONTENT */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* LEFT: CONTACT INFORMATION */}
          <Reveal>
            <div className="h-full">

              <div className="mb-9">
                <h3 className="font-display text-2xl font-black uppercase tracking-wide">
                  Let's Connect
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Find us, give us a call, or check our operating hours.
                </p>
              </div>

              <div className="space-y-8">

                <ContactRow
                  Icon={MapPin}
                  title="Our Location"
                >
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-red-500"
                  >
                    {gym.address}
                  </a>
                </ContactRow>

                <ContactRow
                  Icon={Phone}
                  title="Phone Number"
                >
                  <a
                    href={`tel:${gym.phone}`}
                    className="transition-colors hover:text-red-500"
                  >
                    {gym.phone}
                  </a>
                </ContactRow>

                <ContactRow
                  Icon={Clock}
                  title="Operating Hours"
                >
                  <ul className="space-y-4">
                    {gym.hours.map((h) => (
                      <li key={h.days}>
                        <p className="font-semibold text-white/75">
                          {h.days}
                        </p>

                        <p className="mt-1 text-white">
                          {h.time}
                        </p>

                        <p className="mt-1 text-xs text-white/35">
                          {h.last}
                        </p>
                      </li>
                    ))}
                  </ul>
                </ContactRow>

              </div>

              {/* CALL BUTTON */}
              <a
                href={`tel:${gym.phone}`}
                className="group mt-10 inline-flex min-h-[54px] items-center justify-center gap-4 bg-red-600 px-7 text-xs font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-red-700"
              >
                <Phone size={17} />

                Call Fitness Playground

                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

            </div>
          </Reveal>

          {/* RIGHT: CONTACT FORM */}
          <Reveal delay={0.1}>
            {sent ? (
              <div
                role="status"
                className="flex min-h-[520px] flex-col items-center justify-center border border-white/10 bg-[#101010] p-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center border border-red-500/20 bg-red-500/10">
                  <CheckCircle2
                    size={34}
                    className="text-red-500"
                  />
                </div>

                <h3 className="mt-6 font-display text-3xl font-black uppercase">
                  Ready To Send
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/45">
                  Your messaging app should open with your inquiry.
                  If it doesn't, call us directly.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSent(false)
                    setValues(EMPTY)
                    setErrors({})
                  }}
                  className="mt-7 border border-white/20 px-7 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:border-red-500 hover:bg-red-600"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                noValidate
                className="border border-white/10 bg-[#101010] p-6 sm:p-9"
              >

                {/* FORM HEADER */}
                <div className="mb-8 border-b border-white/10 pb-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-[2px] w-7 bg-red-600" />

                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500">
                      Contact Form
                    </p>
                  </div>

                  <h3 className="font-display text-3xl font-black uppercase sm:text-4xl">
                    Send An Inquiry
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    Fill out your details and send your inquiry through your messaging app.
                  </p>
                </div>

                {/* INPUT FIELDS */}
                <div className="space-y-6">
                  {FIELDS.map(({ key, label, ...props }) => (
                    <div key={key}>
                      <label
                        htmlFor={fieldId(key)}
                        className="text-xs font-bold uppercase tracking-wider text-white/65"
                      >
                        {label}
                      </label>

                      <input
                        id={fieldId(key)}
                        value={values[key]}
                        onChange={update(key)}
                        aria-invalid={Boolean(errors[key])}
                        aria-describedby={
                          errors[key] ? errId(key) : undefined
                        }
                        className={inputClass(errors[key])}
                        {...props}
                      />

                      {errors[key] && (
                        <p
                          id={errId(key)}
                          className="mt-2 text-xs text-red-500"
                        >
                          {errors[key]}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* MESSAGE */}
                  <div>
                    <label
                      htmlFor={fieldId('message')}
                      className="text-xs font-bold uppercase tracking-wider text-white/65"
                    >
                      Message
                    </label>

                    <textarea
                      id={fieldId('message')}
                      rows={5}
                      value={values.message}
                      onChange={update('message')}
                      placeholder="Tell us what you're looking for..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? errId('message') : undefined
                      }
                      className={`${inputClass(errors.message)} min-h-[140px] resize-y`}
                    />

                    {errors.message && (
                      <p
                        id={errId('message')}
                        className="mt-2 text-xs text-red-500"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="group flex min-h-[54px] w-full items-center justify-center gap-3 bg-red-600 px-6 text-xs font-black uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-red-700"
                  >
                    Continue To SMS

                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </button>
                </div>

              </form>
            )}
          </Reveal>

        </div>

       
{/* GOOGLE MAP */}
<Reveal delay={0.1}>
  <div className="mt-16">

    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="h-[2px] w-8 bg-red-600" />

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500">
            Find Us Here
          </p>
        </div>

        <h3 className="font-display text-2xl font-black uppercase sm:text-3xl">
          Find Your Way To Us
        </h3>

        <p className="mt-2 text-sm text-white/40">
          {gym.address}
        </p>
      </div>

      <a
        href={MAP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-wider text-white/60 transition-colors hover:text-red-500"
      >
        Get Directions

        <ArrowUpRight
          size={17}
          className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </a>
    </div>

    <div className="group relative h-72 overflow-hidden border border-white/10 bg-[#111111] sm:h-96 lg:h-[430px]">

      <iframe
        title="Fitness Playground location"
        src={MAP_EMBED}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full w-full border-0"
      />

      <a
        href={MAP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 left-5 inline-flex min-h-[46px] items-center gap-3 bg-red-600 px-5 text-[10px] font-black uppercase tracking-wider text-white transition-colors hover:bg-red-700"
      >
        <Navigation size={16} />

        Open In Google Maps

        <ArrowUpRight size={15} />
      </a>

    </div>
  </div>
</Reveal>


      </div>
    </section>
  )
}
