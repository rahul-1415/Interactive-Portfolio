import { skillGroups } from '@App/core/content/indexHtmlContent'
import sharedStyles from '../sharedSectionModal.module.css'

export const SkillsModal = () => {
  return (
    <section className={sharedStyles.container}>
      <header className={sharedStyles.header}>
        <p className={sharedStyles.eyebrow}>Skills</p>
        <h1 className={sharedStyles.title}>Engineering Stack</h1>
        <p className={sharedStyles.subtitle}>
          Full migration from the source profile grouped into backend, frontend, AI/ML, and cloud delivery capabilities.
        </p>
      </header>

      <div className={sharedStyles.grid}>
        {skillGroups.map(group => (
          <article key={group.title} className={sharedStyles.card}>
            <h2 className={sharedStyles.cardTitle}>{group.title}</h2>
            <div className={sharedStyles.tags}>
              {group.items.map(skill => (
                <span key={skill} className={sharedStyles.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
