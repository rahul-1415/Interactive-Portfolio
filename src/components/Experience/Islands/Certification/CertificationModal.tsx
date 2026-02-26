import { certifications } from '@App/core/content/indexHtmlContent'
import sharedStyles from '../sharedSectionModal.module.css'

export const CertificationModal = () => {
  return (
    <section className={sharedStyles.container}>
      <header className={sharedStyles.header}>
        <p className={sharedStyles.eyebrow}>Certification</p>
        <h1 className={sharedStyles.title}>Credentials</h1>
        <p className={sharedStyles.subtitle}>
          Certifications and credential links migrated from the source portfolio.
        </p>
      </header>

      <div className={sharedStyles.grid}>
        {certifications.map(certification => (
          <article key={certification.name} className={sharedStyles.card}>
            <h2 className={sharedStyles.cardTitle}>{certification.name}</h2>
            <p className={sharedStyles.meta}>{certification.issuer}</p>
            <p className={sharedStyles.text}>{certification.date}</p>

            {certification.credentialId && (
              <p className={sharedStyles.text}>Credential ID: {certification.credentialId}</p>
            )}

            {certification.skills && certification.skills.length > 0 && (
              <div className={sharedStyles.tags}>
                {certification.skills.map(skill => (
                  <span key={skill} className={sharedStyles.tag}>
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {certification.link && (
              <div className={sharedStyles.links}>
                <a
                  href={certification.link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={sharedStyles.link}
                >
                  {certification.link.label}
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
