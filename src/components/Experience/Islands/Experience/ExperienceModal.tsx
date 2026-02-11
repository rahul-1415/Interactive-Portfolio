import { RichText } from '@graphcms/rich-text-react-renderer'
import { Tags } from '@App/components/Tags'
import { GetExperiencesQuery } from '@App/core/graphql/queries.generated'
import styles from './styles.module.css'

type ExperienceModalProps = {
  experiences: GetExperiencesQuery['experiences']
}

export const ExperienceModal = ({ experiences }: ExperienceModalProps) => {
  return (
    <section className={styles.experiences__container}>
      {experiences.length > 0 && experiences.map(experience => (
        <article key={experience.company} className={styles.experience__container}>
          <time className={styles.experience__time}>
            {experience.initialDate} | {experience.finishDate || 'now'}
          </time>

          <h1 className={styles.experience__position}>{experience.position}</h1>
          <h2 className={styles.experience__company}>{experience.company}</h2>

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

          <Tags tags={experience.tags} />
        </article>
      ))}

      <article className={styles.experience__container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2 className={styles.experience__company}>Hovian Inc.</h2>
          <p style={{ margin: 0, fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>Cucamanga, California, USA</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>Software Engineer</p>
          <time className={styles.experience__time}>July 2025 - Dec 2025</time>
        </div>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.7rem', fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>
            <li>Built and maintained an Electron + React single-page desktop application using React, JavaScript/TypeScript, HTML5, and CSS3, supporting multiple interactive UI views for notification and workflow management.</li>
            <li>Designed and shipped 20+ modular, reusable React components (chat UI, prompt inputs, settings panels, toggles) to support dynamic features such as AI chat, theme switching, and workflow navigation.</li>
            <li>Managed client-side state and UI transitions (component-level state + shared app state), reducing UI-related bugs and improving interaction responsiveness and UX consistency.</li>
            <li>Integrated frontend modules with backend services via RESTful APIs, implementing reliable data fetching, loading states, and error handling for daily user workflows.</li>
            <li>Developed Python-based image processing utilities to power an AI “Animated GIF” feature (sprite sheet slicing, pixelation with PIL, GIF assembly with imageio), delivering animated outputs from text prompts.</li>
            <li>Implemented dark mode with persisted user preferences and OS theme sync, and integrated native desktop notifications via Electron APIs to ensure alerts triggered reliably even when the app was minimized.</li>
        </ul>
      </article>

      <article className={styles.experience__container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2 className={styles.experience__company}>ASU Decision Theater</h2>
          <p style={{ margin: 0, fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>Tempe, Arizona, USA</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>Software Engineer</p>
          <time className={styles.experience__time}>May 2024 - May 2025</time>
        </div>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.7rem', fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>
          <li>Designed and implemented a machine learning pipeline using Python and R to analyze 50K+ census and public healthdatasets for regional risk prediction.</li>
          <li>Trained and evaluated predictive models using XGBoost and ensemble techniques, focusing on accuracy and interpretability.</li>
          <li>Built a real-time interactive risk dashboard using React and TypeScript, supporting 10+ dynamic visual components and deployed with FastAPI and Docker on Google Cloud Run.</li>
          <li>Developed backend API services using FastAPI to serve dashboard data, enabling low-latency access for real-time filtering and visualization.</li>
          <li>Automated large-scale data collection using Python and Selenium, gathering 1,000+ healthcare survey responses and 795 climate policy documents, followed by structured analysis and evaluation to measure LLM resilience on heat and healthcare prompts.</li>
          <li>Deployed a RAG-based chatbot using Llama 3, LangChain, and Chroma on Jetstream2 HPC to summarize 100+ interview transcripts for the Maricopa Association of Governments and support ASU’s LLM resilience research with climate policy recommendations.</li><
        </ul>
      </article>
    </section>
  )
}
