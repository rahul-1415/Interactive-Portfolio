import { FormEvent, useState } from 'react'
import styles from './styles.module.css'

export const ContactModal = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const subject = `Message from ${name || 'Portfolio Visitor'}`
    const body = `Name: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\n\n${message || ''}`

    window.location.href = `mailto:rahulb1407@gmail.com?${new URLSearchParams({
      subject,
      body
    }).toString()}`
  }

  return (
    <section className={styles.contact__container}>
      <h1 className={styles.contact__title}>Contact</h1>
      <p className={styles.contact__subtitle}>Send me a note and I&apos;ll get back to you.</p>

      <form className={styles.contact__form} onSubmit={handleSubmit}>
        <label className={styles.contact__label}>
          <span>Name</span>
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            placeholder="Your name"
            className={styles.contact__input}
          />
        </label>

        <label className={styles.contact__label}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="you@example.com"
            className={styles.contact__input}
            required
          />
        </label>

        <label className={styles.contact__label}>
          <span>Message</span>
          <textarea
            value={message}
            onChange={event => setMessage(event.target.value)}
            placeholder="How can I help?"
            className={styles.contact__textarea}
            rows={5}
            required
          />
        </label>

        <button type="submit" className={styles.contact__button}>
          Send Message
        </button>
      </form>

      <div className={styles.contact__info}>
        <a
          href="mailto:rahulb1407@gmail.com"
          className={styles.contact__link}
        >
          rahulb1407@gmail.com
        </a>

        <a
          href="tel:+16025171962"
          className={styles.contact__link}
        >
          +16025171962
        </a>
      </div>
    </section>
  )
}
