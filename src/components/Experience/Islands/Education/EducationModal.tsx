import { education } from '@App/core/content/indexHtmlContent'
import sharedStyles from '../sharedSectionModal.module.css'

export const EducationModal = () => {
  return (
    <section className={sharedStyles.container}>
      <header className={sharedStyles.header}>
        <p className={sharedStyles.eyebrow}>Education</p>
        <h1 className={sharedStyles.title}>Academic Timeline</h1>
        <p className={sharedStyles.subtitle}>
          Education details migrated from the source profile.
        </p>
      </header>

      <div className={sharedStyles.grid}>
        {education.map(item => (
          <article key={item.institution} className={sharedStyles.card}>
            <h2 className={sharedStyles.cardTitle}>{item.institution}</h2>
            <p className={sharedStyles.meta}>{item.location}</p>
            <p className={sharedStyles.text}><strong>{item.degree}</strong></p>
            <p className={sharedStyles.text}>{item.period}</p>
            <ul className={sharedStyles.list}>
              {item.notes.map(note => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
