import Image from 'next/image'
import { aboutHero } from '@App/core/content/indexHtmlContent'
import styles from './styles.module.css'

export const AboutModal = () => {
  return (
    <section className={styles.layout}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>About</p>
        <h1 className={styles.title}>{aboutHero.name}</h1>
        <p className={styles.role}>{aboutHero.title}</p>

        <div className={styles.links}>
          {aboutHero.links.map(link => (
            <a
              key={link.href}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <section className={styles.heroGrid}>
        <div className={styles.textColumn}>
          {aboutHero.introParagraphs.map(paragraph => (
            <p key={paragraph} className={styles.intro}>
              {paragraph}
            </p>
          ))}
        </div>

        <aside className={styles.sideColumn}>
          <div className={styles.statsGrid}>
            {aboutHero.stats.map(stat => (
              <article key={stat.label} className={styles.stat}>
                <p className={styles.statLabel}>{stat.label}</p>
                <p className={styles.statValue}>{stat.value}</p>
              </article>
            ))}
          </div>

          <article className={styles.profileCard}>
            <div className={styles.profileShell}>
              <Image
                className={styles.profileImage}
                src={aboutHero.profileImage.src}
                alt={aboutHero.profileImage.alt}
                width={1000}
                height={1000}
                priority
              />
            </div>
          </article>
        </aside>
      </section>
    </section>
  )
}
