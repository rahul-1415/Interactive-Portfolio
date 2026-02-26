import { publications } from '@App/core/content/indexHtmlContent'
import sharedStyles from '../sharedSectionModal.module.css'

export const PublicationModal = () => {
  return (
    <section className={sharedStyles.container}>
      <header className={sharedStyles.header}>
        <p className={sharedStyles.eyebrow}>Publication</p>
        <h1 className={sharedStyles.title}>Research and Papers</h1>
        <p className={sharedStyles.subtitle}>
          Publication section migrated from the source portfolio, including submitted and published work.
        </p>
      </header>

      <div className={sharedStyles.grid}>
        {publications.map(item => (
          <article key={item.title} className={sharedStyles.card}>
            <h2 className={sharedStyles.cardTitle}>{item.title}</h2>
            <p className={sharedStyles.meta}>{item.date}</p>
            <p className={sharedStyles.text}><strong>{item.venue}</strong></p>
            <p className={sharedStyles.text}>{item.summary}</p>

            {item.links.length > 0 && (
              <div className={sharedStyles.links}>
                {item.links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={sharedStyles.link}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
