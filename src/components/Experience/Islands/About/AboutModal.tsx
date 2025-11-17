import { RichText } from '@graphcms/rich-text-react-renderer'
import Image from 'next/image'
import { GetAboutMeQuery } from '@App/core/graphql/queries.generated'
import styles from './styles.module.css'

type AboutModalProps = {
  sections: GetAboutMeQuery['abouts']
}

export const AboutModal = ({ sections }: AboutModalProps) => {
  return (
    <>
      {sections.length > 0 && sections.map(({ title, description, images }) => (
        <section key={title} className={styles.container}>
          <h1 className={styles.about__title}>{title}</h1>

          <RichText content={description?.raw}/>

          {images.map(image => (
            <Image
              className={styles.about__image}
              key={image.id}
              src={image.url}
              alt={image.fileName}
              width={734}
              height={400}
            />
          ))}
        </section>
      ))}
      
      <section className={styles.container}>
        <h1 className={styles.about__title}>About Me</h1>
        <p>
          Hello! I am Rahul Babu, Software Engineer with 4+ years of experience in AI/ML engineering, backend development, and cloud-native solutions. Skilled in building LLM-powered research assistants, NLP pipelines, and scalable APIs that process millions of records daily.
        </p>
        <p>
          At BlackRock, I developed FastAPI-based portfolio & risk APIs, an LLM research assistant (LangChain + OpenAI), and AWS Glue/S3 data pipelines, cutting response times by 75% and saving 15+ analyst hours weekly.
        </p>
        <p>
          Previously at Vivma Software, I engineered Flask/Django APIs, optimized ETL pipelines on 20M+ rows, and built a scikit-learn recommendation engine that boosted upsell conversions by 11%.
        </p>
        <p>
          Core Skills: Python, FastAPI, Django, Flask, React.js, LangChain, Hugging Face, Scikit-learn, PostgreSQL, MongoDB, AWS (EC2, RDS, S3, Glue, ECS), Docker, CI/CD. Certification: AWS Solutions Architect – Associate.
        </p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a 
            href="https://github.com/rahul-1415" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#fff',
              color: '#121212',
              border: 'none',
              padding: '0.5rem 1.5rem',
              borderRadius: '15px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              fontFamily: '"Gochi Hand", cursive',
              fontSize: '1.25rem'
            }}
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/rahulb1407/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#fff',
              color: '#121212',
              border: 'none',
              padding: '0.5rem 1.5rem',
              borderRadius: '15px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              fontFamily: '"Gochi Hand", cursive',
              fontSize: '1.25rem'
            }}
          >
            LinkedIn
          </a>
        </div>
      </section>
    </>
  )
}
