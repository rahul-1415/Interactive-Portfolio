import { migratedExperiences } from '@App/core/content/indexHtmlContent'
import styles from './styles.module.css'

export const ExperienceModal = () => {
  return (
    <section className={styles.experiences__container}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Experience Timeline</p>
        <h1 className={styles.title}>Work Experience</h1>
      </header>

      {migratedExperiences.map(experience => (
        <article key={experience.company} className={styles.experience__container}>
          <div className={styles.experience__topRow}>
            <div>
              <h2 className={styles.experience__company}>{experience.company}</h2>
              <p className={styles.experience__position}>{experience.role}</p>
            </div>

            <div className={styles.experience__meta}>
              <time className={styles.experience__time}>{experience.period}</time>
              <p className={styles.experience__location}>{experience.location}</p>
            </div>
          </div>

          <ul className={styles.experience__points}>
            {experience.bullets.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}
