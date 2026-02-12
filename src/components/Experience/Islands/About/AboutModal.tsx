import { RichText } from '@graphcms/rich-text-react-renderer'
import Image from 'next/image'
import { GetAboutMeQuery } from '@App/core/graphql/queries.generated'
import styles from './styles.module.css'

type AboutModalProps = {
  sections: GetAboutMeQuery['abouts']
}

const profileHighlights = [
  'Software Engineer focused on AI systems, backend architecture, and scalable product delivery.',
  'Built and deployed RAG + ML pipelines that process large public-health and climate datasets.',
  'Hands-on with Python, FastAPI, React, cloud-native deployment, and production observability.'
]

export const AboutModal = ({ sections }: AboutModalProps) => {
  return (
    <section className={styles.layout}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>About Section</p>
        <h1 className={styles.title}>Rahul Babu</h1>
        <p className={styles.intro}>
          I build practical software systems where product velocity and engineering quality both matter.
        </p>

        <ul className={styles.highlights}>
          {profileHighlights.map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className={styles.links}>
          <a
            href='https://github.com/rahul-1415'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
          >
            GitHub
          </a>
          <a
            href='https://www.linkedin.com/in/rahulb1407/'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
          >
            LinkedIn
          </a>
        </div>
      </header>

      {sections.length > 0 && sections.map(({ title, description, images }) => (
        <article key={title} className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>{title}</h2>

          <div className={styles.sectionText}>
            <RichText content={description?.raw} />
          </div>

          <div className={styles.imageGrid}>
            {images.map(image => (
              <Image
                className={styles.sectionImage}
                key={image.id}
                src={image.url}
                alt={image.fileName}
                width={734}
                height={400}
              />
            ))}
          </div>
        </article>
      ))}
    </section>
  )
}
