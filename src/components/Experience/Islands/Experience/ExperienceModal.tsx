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
          <h2 className={styles.experience__company}>BlackRock</h2>
          <p style={{ margin: 0, fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>USA</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>Software Engineer</p>
          <time className={styles.experience__time}>July 2024 - Present</time>
        </div>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.7rem', fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>
          <li>Engineered Python RESTful APIs (FastAPI) to deliver real-time portfolio and risk data; processed 5M+ daily records with optimized queries, cutting average response time from 8s to 2s during trading hours.</li>
          <li>Built an LLM-powered research assistant using LangChain + OpenAI models to summarize earnings transcripts and analyst notes; reduced manual review effort for portfolio managers by ~15 hours each week.</li>
          <li>Designed a React.js dashboard that integrated live fund inflow/outflow trends, anomaly alerts, and LLM-generated market insights; adoption by 20+ analysts replaced static Excel workflows.</li>
          <li>Automated ingestion and enrichment of Bloomberg/Refinitiv feeds through AWS Glue, S3, and Lambda triggers; ensured 100% SLA adherence and eliminated manual data preparation steps.</li>
          <li>Deployed containerized microservices with Docker + AWS ECS, wired CI/CD via GitHub Actions, and introduced monitoring through CloudWatch; achieved less than 10 min release cycles with zero downtime.</li>
          <li>Implemented an NLP + LangGraph pipeline for entity extraction and context mapping across 100K+ SEC filings; compliance teams accelerated audit prep by 40% while cutting false positives in alerts.</li>
        </ul>
      </article>

      <article className={styles.experience__container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2 className={styles.experience__company}>Vivma Software Inc.</h2>
          <p style={{ margin: 0, fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>India</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>Software Engineer</p>
          <time className={styles.experience__time}>June 2021 - July 2023</time>
        </div>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.7rem', fontFamily: '"Gochi Hand", cursive', fontSize: '1.25rem' }}>
          <li>Designed hybrid storage using PostgreSQL for transactions and MongoDB for product metadata and user reviews; reduced schema-change overhead while keeping financial data ACID-compliant.</li>
          <li>Built Flask APIs for checkout, refunds, and shipment events; wrapped 200+ test cases in pytest, reaching 85% coverage and minimizing regression bugs.</li>
          <li>Orchestrated ETL pipelines in Python (pandas + SQLAlchemy + PyMongo) to merge order history with review sentiment data; optimized pipeline runtime by 40% on 20M+ rows + 5M+ docs.</li>
          <li>Developed a Django admin panel for managing promotions, vendors, and warehouse sync, replacing manual spreadsheet workflows and cutting ops team effort by 12 hours/week.</li>
          <li>Created a React.js customer portal for browsing catalogs and personalized deals; integrated cache + lazy loading to reduce page load time by 35%.</li>
          <li>Trained a scikit-learn recommendation engine combining transactional (Postgres) and behavioral (MongoDB) data; boosted upsell conversion rate by 11% in pilot.</li>
          <li>Containerized services with Docker, deployed on AWS (EC2, RDS, S3, DocumentDB for Mongo), and configured monitoring via CloudWatch for stable performance under seasonal traffic spikes.</li>
        </ul>
      </article>
    </section>
  )
}
