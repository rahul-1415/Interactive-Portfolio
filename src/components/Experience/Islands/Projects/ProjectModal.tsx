import { useMemo, useState } from 'react'
import { Tags } from '@App/components/Tags'
import {
  migratedProjects,
  projectFilters,
  ProjectFilter
} from '@App/core/content/indexHtmlContent'
import styles from './styles.module.css'

export const ProjectModal = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all')

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'all') return migratedProjects

    return migratedProjects.filter(project => project.filters.includes(activeFilter))
  }, [activeFilter])

  const projectCountLabel = `${visibleProjects.length} project${visibleProjects.length === 1 ? '' : 's'} shown`

  return (
    <section className={styles.projects__container}>
      <header className={styles.projects__header}>
        <p className={styles.eyebrow}>Project Archive</p>
        <h1 className={styles.title}>Builds and Experiments</h1>
        <p className={styles.subtitle}>
          Complete project content migrated from `index.html` with interactive filters.
        </p>
      </header>

      <div className={styles.filterBar} role='group' aria-label='Project filters'>
        {projectFilters.map(filter => (
          <button
            key={filter.id}
            type='button'
            className={styles.filterChip}
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className={styles.projectStatus} aria-live='polite'>
        {projectCountLabel}
      </p>

      {visibleProjects.length === 0 && (
        <p className={styles.emptyState}>No projects match this filter.</p>
      )}

      <div className={styles.projects__grid}>
        {visibleProjects.map((project, index) => (
          <article key={project.title} className={styles.project__container}>
            <div className={styles.project__headerRow}>
              <div>
                <p className={styles.project__index}>#{String(index + 1).padStart(2, '0')}</p>
                <h2 className={styles.project__title}>{project.title}</h2>
              </div>

              <div className={styles.project__meta}>
                <p className={styles.project__date}>{project.meta}</p>
              </div>
            </div>

            {project.summary && <p className={styles.project__description}>{project.summary}</p>}

            <div className={styles.project__links}>
              {project.links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.project__link}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <ul className={styles.project__points}>
              {project.bullets.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            {project.skills.length > 0 && <Tags tags={project.skills} />}
          </article>
        ))}
      </div>
    </section>
  )
}
