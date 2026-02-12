import { RichText } from '@graphcms/rich-text-react-renderer'
import { Tags } from '@App/components/Tags'
import { GetExperiencesQuery } from '@App/core/graphql/queries.generated'
import styles from './styles.module.css'

type ExperienceModalProps = {
  experiences: GetExperiencesQuery['experiences']
}

type StaticExperience = {
  company: string
  location: string
  role: string
  period: string
  points: string[]
  tags: string[]
}

const staticExperiences: StaticExperience[] = [
  {
    company: 'Hovian Inc.',
    location: 'Cucamonga, California, USA',
    role: 'Software Engineer',
    period: 'Jul 2025 - Dec 2025',
    points: [
      'Built and maintained an Electron + React desktop application with multi-view workflows and notification systems.',
      'Shipped 20+ modular UI components across chat, prompts, settings, and navigation surfaces.',
      'Integrated frontend modules with backend REST services and resilient loading/error states.',
      'Developed Python image-processing utilities powering AI GIF generation features.',
      'Implemented user-preference persistence, dark mode sync, and reliable desktop notifications.'
    ],
    tags: ['React', 'Electron', 'TypeScript', 'Python', 'REST APIs']
  },
  {
    company: 'ASU Decision Theater',
    location: 'Tempe, Arizona, USA',
    role: 'Software Engineer',
    period: 'May 2024 - May 2025',
    points: [
      'Designed machine-learning pipelines across 50K+ census and public-health records.',
      'Trained interpretable predictive models with XGBoost and ensemble approaches.',
      'Built a real-time risk dashboard using React + TypeScript, served through FastAPI.',
      'Automated large-scale data collection via Python and Selenium for LLM resilience studies.',
      'Deployed RAG workflows on Jetstream2 HPC for climate-policy and interview-transcript summarization.'
    ],
    tags: ['Python', 'FastAPI', 'React', 'XGBoost', 'RAG']
  }
]

export const ExperienceModal = ({ experiences }: ExperienceModalProps) => {
  return (
    <section className={styles.experiences__container}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Experience Timeline</p>
        <h1 className={styles.title}>Roles, Outcomes, and Engineering Scope</h1>
      </header>

      {experiences.length > 0 && experiences.map(experience => (
        <article key={experience.company} className={styles.experience__container}>
          <div className={styles.experience__topRow}>
            <div>
              <h2 className={styles.experience__company}>{experience.company}</h2>
              <p className={styles.experience__position}>{experience.position}</p>
            </div>
            <time className={styles.experience__time}>
              {experience.initialDate} - {experience.finishDate || 'Present'}
            </time>
          </div>

          <div className={styles.experience__description}>
            <RichText
              content={experience.description?.raw}
              renderers={{
                a: ({ children, ...rest }) => (
                  <a className={styles.experience__link} {...rest}>
                    {children}
                  </a>
                )
              }}
            />
          </div>

          <Tags tags={experience.tags} />
        </article>
      ))}

      {staticExperiences.map(experience => (
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
            {experience.points.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <Tags tags={experience.tags} />
        </article>
      ))}
    </section>
  )
}
