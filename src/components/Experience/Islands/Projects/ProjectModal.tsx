import { Tags } from '@App/components/Tags'
import { GetProjectsQuery } from '@App/core/graphql/queries.generated'
import styles from './styles.module.css'

type ProjectModalProps = {
  projects: GetProjectsQuery['projects']
}

type ShowcaseProject = {
  title: string
  date: string
  description: string
  points: string[]
  tags: string[]
  githubUrl?: string
}

const curatedProjects: ShowcaseProject[] = [
  {
    title: 'Forest Monitoring using Hyperspectral Imaging',
    date: 'Nov 2022 - May 2023',
    description: 'Applied hyperspectral imaging with hybrid ML architectures to identify vegetation coverage, man-made structures, and terrain-level risk signatures.',
    points: [
      'Compared SVM, 2D CNN, 3D CNN, M3D-CNN, SSRN, and hybrid variants.',
      'Used Indian Pines dataset to benchmark class-level prediction quality.',
      'Produced interpretable outputs to support hazard identification workflows.'
    ],
    tags: ['Python', 'Scikit-Learn', 'TensorFlow', 'Data Science']
  },
  {
    title: 'IoT Device Manager using Blockchain',
    date: 'Jan 2023 - May 2023',
    description: 'Designed a blockchain-backed system for immutable IoT registration, ownership transfer, and lifecycle updates.',
    points: [
      'Built smart-contract driven transaction recording for device events.',
      'Implemented a React frontend for management and audit workflows.',
      'Focused on transparent and tamper-resistant ownership history.'
    ],
    tags: ['React.js', 'Solidity', 'Truffle', 'MetaMask']
  },
  {
    title: 'Web Phishing Detection',
    date: 'Aug 2022 - Nov 2022',
    description: 'Built and deployed phishing-classification models to IBM Cloud with a usable frontend interface for rapid URL checks.',
    points: [
      'Trained and compared 10 candidate machine learning models.',
      'Deployed the top-performing model to production.',
      'Implemented user-facing workflows for quick threat validation.'
    ],
    tags: ['Python', 'Machine Learning', 'IBM Cloud']
  },
  {
    title: 'Path Navigation using Deep Q Learning',
    date: 'Jan 2022 - Sep 2022',
    description: 'Developed a DQN-based autonomous navigation simulator using custom reward design and obstacle planning.',
    points: [
      'Implemented agent training loops with relu-driven network stacks.',
      'Designed map environments and reward gradients for safer routing.',
      'Project accepted for publication in ADCOM Volume 133.'
    ],
    tags: ['PyTorch', 'Reinforcement Learning', 'Python']
  },
  {
    title: 'Tournament Manager',
    date: 'Jul 2021 - Nov 2021',
    description: 'Created a Java + MySQL application to streamline tournament setup, team registration, and participant tracking.',
    points: [
      'Supported multi-division configuration and event scheduling.',
      'Simplified enrollment and roster management processes.',
      'Improved operational consistency for recurring competitions.'
    ],
    tags: ['Java', 'MySQL']
  },
  {
    title: 'Harmful Comments Classifier',
    date: 'Jan 2021 - Apr 2021',
    description: 'Built an NLP classifier for toxic comment detection with sequence modeling and embedding pipelines.',
    points: [
      'Implemented Bi-LSTM and dense layers for comment classification.',
      'Executed experimentation workflows in Google Colab.',
      'Focused on robust inference for moderation use cases.'
    ],
    tags: ['Python', 'NLP', 'Deep Learning']
  },
  {
    title: 'EATERIO',
    date: 'Jan 2020 - May 2020',
    description: 'Developed an internal food-ordering platform for organizations with clear ordering, management, and status flows.',
    points: [
      'Built an end-to-end ordering workflow with simple UX.',
      'Connected frontend components with MongoDB-backed storage.',
      'Delivered a lightweight dashboard for order operations.'
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'MongoDB']
  }
]

export const ProjectModal = ({ projects }: ProjectModalProps) => {
  const liveProjects: ShowcaseProject[] = projects.map(project => ({
    title: project.title,
    date: 'Featured Build',
    description: project.description || 'Detailed project context is available in the linked repository.',
    points: ['Click GitHub to inspect architecture, implementation details, and usage notes.'],
    tags: project.stack || [],
    githubUrl: project.githubUrl || undefined
  }))

  const combinedProjects = [...liveProjects, ...curatedProjects]

  return (
    <section className={styles.projects__container}>
      <header className={styles.projects__header}>
        <p className={styles.eyebrow}>Project Archive</p>
        <h1 className={styles.title}>Builds and Experiments</h1>
        <p className={styles.subtitle}>
          A mix of production-oriented engineering work and research-heavy prototypes.
        </p>
      </header>

      <div className={styles.projects__grid}>
        {combinedProjects.map((project, index) => (
          <article key={`${project.title}-${index}`} className={styles.project__container}>
            <div className={styles.project__headerRow}>
              <div>
                <p className={styles.project__index}>#{String(index + 1).padStart(2, '0')}</p>
                <h2 className={styles.project__title}>{project.title}</h2>
              </div>

              <div className={styles.project__meta}>
                <p className={styles.project__date}>{project.date}</p>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.project__link}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>

            <p className={styles.project__description}>{project.description}</p>

            <ul className={styles.project__points}>
              {project.points.map(point => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            {project.tags.length > 0 && <Tags tags={project.tags} />}
          </article>
        ))}
      </div>
    </section>
  )
}
