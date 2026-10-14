import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, List, LoaderCircle, Mail, MessageCircle, MessageSquareText, Send, ShieldCheck, UserRound } from 'lucide-react'
import contact from '../../data/contact.json'
import { contactAction, contactFormUrl, createContactPayload, submitContactMessage } from '../../utils/contactSubmission'

const fieldDefinitions = [
  { name: 'name', label: 'Your Name', placeholder: 'Enter your name', type: 'text', autoComplete: 'name', maxLength: 100, Icon: UserRound },
  { name: 'email', label: 'Your Email', placeholder: 'example@gmail.com', type: 'email', autoComplete: 'email', maxLength: 254, Icon: Mail },
  { name: 'subject', label: 'Subject', placeholder: 'Project, job opportunity, etc.', type: 'text', maxLength: 150, Icon: List },
]

function validateForm(form) {
  for (const name of ['name', 'email', 'subject', 'message']) {
    const input = form.elements.namedItem(name)
    input.setCustomValidity(input.value.trim() ? '' : 'Please fill out this field.')
  }
  return form.reportValidity()
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const request = useRef(null)
  const inFlight = useRef(false)
  const isSending = status === 'sending'

  useEffect(() => () => request.current?.abort(), [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (inFlight.current) return
    const form = event.currentTarget
    if (!validateForm(form)) return
    const fields = Object.fromEntries(new FormData(form))
    if (fields._honey) { setStatus('error'); return }

    inFlight.current = true
    setStatus('sending')
    const controller = new AbortController()
    request.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 45_000)

    try {
      await submitContactMessage(fields, controller.signal)
      form.reset()
      setStatus('success')
    } catch (error) {
      if (!form.isConnected) return
      setStatus(error.message === 'DELIVERY_NOT_ACTIVATED' ? 'unavailable' : error.message === 'RATE_LIMITED' ? 'rate-limited' : error.name === 'AbortError' ? 'timeout' : 'error')
    } finally {
      window.clearTimeout(timeout)
      request.current = null
      inFlight.current = false
    }
  }

  function handleVerifiedSubmit(event) {
    const form = event.currentTarget.form
    if (inFlight.current || !validateForm(form)) return
    const fields = Object.fromEntries(new FormData(form))
    if (fields._honey) return
    for (const [name, value] of Object.entries(createContactPayload(fields))) {
      const input = form.elements.namedItem(name)
      if (input) input.value = value
    }
    // An explicit fallback lets visitors complete the provider's verification.
    // Never automatically repeat an uncertain AJAX submission.
    HTMLFormElement.prototype.submit.call(form)
  }

  return (
    <section aria-labelledby="contact-form-heading" data-glass data-reveal="rise" data-reveal-delay="140" className="motion-form relative w-full rounded-3xl border border-border bg-surface/95 p-5 shadow-card sm:p-7 lg:p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-accent lg:size-9"><MessageSquareText size={24} strokeWidth={1.7} aria-hidden="true" /></span>
        <div className="min-w-0 flex-1"><h2 id="contact-form-heading" className="text-lg font-extrabold tracking-[-0.025em] sm:text-xl lg:text-lg">Send Me a Message</h2><p className="mt-1 text-xs leading-6 text-muted sm:text-sm lg:mt-0.5 lg:text-xs lg:leading-5">Fill out the form and I’ll get back to you as soon as possible.</p></div>
        <Send size={30} strokeWidth={1.5} className="motion-paperplane hidden shrink-0 -rotate-12 text-accent sm:block" aria-hidden="true" />
      </div>

      <form action={contactAction} method="POST" onSubmit={handleSubmit} aria-busy={isSending} className="mt-5 lg:mt-3" onInput={event => { event.target.setCustomValidity?.(''); if (!inFlight.current && status !== 'idle') setStatus('idle') }}>
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <input type="hidden" name="_url" value={contactFormUrl} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_subject" defaultValue="Portfolio inquiry" />
        <input type="hidden" name="_replyto" defaultValue="" />
        <fieldset disabled={isSending} className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <legend className="sr-only">Your contact details and message</legend>
          {fieldDefinitions.map(({ name, label, placeholder, type, autoComplete, maxLength, Icon }) => (
            <label key={name} className={`flex min-w-0 items-start gap-3 rounded-2xl border border-border bg-surface-soft px-4 py-3 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-primary/15 lg:py-2 ${name === 'subject' ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
              <Icon size={19} className="mt-1 shrink-0 text-muted" strokeWidth={1.7} aria-hidden="true" />
              <span className="min-w-0 flex-1"><span className="block text-xs font-bold">{label} <span aria-hidden="true" className="text-error">*</span></span><input name={name} type={type} autoComplete={autoComplete} maxLength={maxLength} required placeholder={placeholder} className="mt-1 w-full min-w-0 border-0 bg-transparent py-1 text-sm text-ink outline-none placeholder:text-muted focus-visible:outline-none disabled:opacity-60" /></span>
            </label>
          ))}
          <label className="flex min-w-0 items-start gap-3 rounded-2xl border border-border bg-surface-soft px-4 py-3 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-primary/15 sm:col-span-2 lg:col-span-3 lg:py-2">
            <MessageCircle size={19} className="mt-1 shrink-0 text-muted" strokeWidth={1.7} aria-hidden="true" />
            <span className="min-w-0 flex-1"><span className="block text-xs font-bold">Your Message <span aria-hidden="true" className="text-error">*</span></span><textarea name="message" rows={4} maxLength={5000} required placeholder="Tell me more about your idea…" className="mt-1 w-full min-w-0 resize-y border-0 bg-transparent py-1 text-sm leading-6 text-ink outline-none placeholder:text-muted focus-visible:outline-none disabled:opacity-60 lg:h-16 lg:min-h-16" /></span>
          </label>
        </fieldset>

        {status === 'success' && <p role="status" data-reveal="rise" className="mt-4 flex items-start gap-2 rounded-xl bg-success-soft p-3 text-sm leading-6 text-success"><CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" />Your message was submitted. Thank you for reaching out!</p>}
        {['error', 'unavailable', 'timeout', 'rate-limited'].includes(status) && <div role="alert" data-reveal="rise" className="mt-4 rounded-xl bg-error-soft p-3 text-sm leading-6 text-error">
          <p>{status === 'unavailable' ? 'Message delivery is waiting for email verification. Your draft is still here.' : status === 'rate-limited' ? 'Too many messages were sent recently. Please wait a little before trying again. Your draft is still here.' : status === 'timeout' ? 'The service took too long to confirm your submission. Your draft is still here.' : 'We couldn’t confirm your submission. Your draft is still here.'} You can <a href={`mailto:${contact.email}`} className="font-bold underline underline-offset-2">email me directly</a>.</p>
          {status === 'error' && <button type="button" onClick={handleVerifiedSubmit} className="mt-2 font-bold underline underline-offset-2">Continue to secure submission <span className="font-normal">(opens a verification page)</span></button>}
        </div>}

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-3">
          <button type="submit" disabled={isSending} className="button-primary w-full shrink-0 rounded-full px-5 py-3 text-sm disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto sm:text-sm">{isSending ? <LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}{isSending ? 'Sending…' : 'Send Message'}{!isSending && <ArrowRight size={17} aria-hidden="true" />}</button>
          <p className="flex max-w-[230px] items-start gap-2 text-[11px] leading-5 text-muted"><ShieldCheck size={17} className="mt-0.5 shrink-0" aria-hidden="true" />Your contact details are used to respond to your message.</p>
        </div>
      </form>
    </section>
  )
}
