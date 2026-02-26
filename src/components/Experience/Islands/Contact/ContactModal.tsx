import { FormEvent, useMemo, useState } from 'react'
import { contactDetails } from '@App/core/content/indexHtmlContent'
import styles from './styles.module.css'

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

const emailJsConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
}

const emailJsConfigured = Object.values(emailJsConfig).every(value => value.trim().length > 0)

export const ContactModal = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const mailToHref = useMemo(() => {
    return `mailto:${contactDetails.fallbackEmail}?${new URLSearchParams({
      subject: subject || `Message from ${name || 'Portfolio Visitor'}`,
      body: `Name: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\n\n${message || ''}`
    }).toString()}`
  }, [name, email, subject, message])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!emailJsConfigured) {
      setSubmitState('error')
      setStatusMessage(
        'EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, NEXT_PUBLIC_EMAILJS_SERVICE_ID, and NEXT_PUBLIC_EMAILJS_TEMPLATE_ID.'
      )
      return
    }

    setSubmitState('sending')
    setStatusMessage('Sending message...')

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: emailJsConfig.serviceId,
          template_id: emailJsConfig.templateId,
          user_id: emailJsConfig.publicKey,
          template_params: {
            from_name: name,
            from_email: email,
            reply_to: email,
            subject,
            message,
            to_email: contactDetails.primaryEmail
          }
        })
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setSubmitState('success')
      setStatusMessage('Message sent successfully.')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch {
      setSubmitState('error')
      setStatusMessage(contactDetails.fallbackMessage)
    }
  }

  return (
    <section className={styles.contact__container}>
      <header className={styles.contact__header}>
        <p className={styles.contact__eyebrow}>Contact</p>
        <h1 className={styles.contact__title}>Let us build something useful.</h1>
        <p className={styles.contact__subtitle}>{contactDetails.heading}</p>
        <p className={styles.contact__subtitle}>{contactDetails.subtitle}</p>
      </header>

      {!emailJsConfigured && (
        <p className={styles.contact__warning}>
          Email service is currently unconfigured. Use the fallback email action below or set the required
          `NEXT_PUBLIC_EMAILJS_*` variables.
        </p>
      )}

      <form className={styles.contact__form} onSubmit={handleSubmit}>
        <label className={styles.contact__label}>
          <span>Name</span>
          <input
            type='text'
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder='Your name'
            className={styles.contact__input}
            required
          />
        </label>

        <label className={styles.contact__label}>
          <span>Email</span>
          <input
            type='email'
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder='you@example.com'
            className={styles.contact__input}
            required
          />
        </label>

        <label className={styles.contact__label}>
          <span>Subject</span>
          <input
            type='text'
            value={subject}
            onChange={event => setSubject(event.target.value)}
            placeholder='Project scope or role'
            className={styles.contact__input}
            required
          />
        </label>

        <label className={styles.contact__label}>
          <span>Message</span>
          <textarea
            value={message}
            onChange={event => setMessage(event.target.value)}
            placeholder='Project brief, timeline, and desired outcomes'
            className={styles.contact__textarea}
            rows={5}
            required
          />
        </label>

        <div className={styles.contact__actions}>
          <button
            type='submit'
            className={styles.contact__button}
            disabled={submitState === 'sending'}
          >
            {submitState === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          <a href={mailToHref} className={styles.contact__fallbackButton}>
            Email via Mail App
          </a>
        </div>

        <p className={styles.contact__status} aria-live='polite'>
          {statusMessage}
        </p>
      </form>

      <div className={styles.contact__info}>
        <a href={`mailto:${contactDetails.primaryEmail}`} className={styles.contact__link}>
          {contactDetails.primaryEmail}
        </a>

        <a href='tel:+16025171962' className={styles.contact__link}>
          {contactDetails.phone}
        </a>

        <a
          href={contactDetails.linkedIn}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.contact__link}
        >
          {contactDetails.linkedInLabel}
        </a>
      </div>
    </section>
  )
}
