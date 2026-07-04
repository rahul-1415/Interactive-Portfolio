'use client'

import { useEffect } from 'react'
import { ISLANDS, type SectionId } from '@/content/islands'
import { portfolio } from '@/content'
import { useWorldStore } from '@/stores/world'

function bounty(rank: number, total: number): string {
  return `฿${((total - rank) * 100_000_000).toLocaleString('en-US')}`
}

function ExperienceMenu() {
  return (
    <div className="menu-card">
      <p className="menu-subtitle">
        — Today&apos;s Service, {portfolio.stats.years_experience} Years at Sea —
      </p>
      {portfolio.experience.map((job, i) => (
        <article key={i} className="menu-course">
          <header>
            <h3>{job.role}</h3>
            <span className="menu-dots" />
            <span className="menu-tenure">
              {job.start} – {job.end}
            </span>
          </header>
          <p className="menu-house">
            {job.company} · {job.location}
          </p>
          <ul>
            {job.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function ProjectPosters() {
  return (
    <div className="poster-grid">
      {portfolio.projects.map((project, i) => (
        <article key={project.name} className="wanted-poster">
          <p className="wanted-header">Wanted</p>
          <p className="wanted-sub">Live or Repo</p>
          <h3>{project.name}</h3>
          <p className="wanted-desc">{project.description ?? project.bullets[0]}</p>
          <ul className="tech-chips">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="wanted-bounty">{bounty(i, portfolio.projects.length)}</p>
          <div className="wanted-links">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noreferrer">
                ⚓ Live
              </a>
            )}
            {project.code_url && (
              <a href={project.code_url} target="_blank" rel="noreferrer">
                ⌘ Code
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

function EducationTomes() {
  return (
    <div className="tome-list">
      {portfolio.education.map((edu, i) => (
        <article key={i} className="tome">
          <h3>{edu.degree}</h3>
          <p className="tome-house">
            {edu.institution} · {edu.location}
          </p>
          <p className="tome-meta">
            {edu.start && edu.end ? `${edu.start} – ${edu.end}` : ''}
            {edu.gpa ? ` · GPA ${edu.gpa}` : ''}
          </p>
        </article>
      ))}
    </div>
  )
}

function PublicationsPaper() {
  return (
    <div className="broadsheet">
      <p className="broadsheet-masthead">The Grand Line Times</p>
      {portfolio.publications.map((pub, i) => (
        <article key={i} className="broadsheet-story">
          {pub.status.toLowerCase().includes('publish') ? (
            <span className="stamp stamp-published">Published</span>
          ) : (
            <span className="stamp stamp-extra">Extra!</span>
          )}
          <h3>{pub.title}</h3>
          <p className="broadsheet-meta">
            {pub.type} · {pub.date}
            {pub.venue ? ` · ${pub.venue}` : ''}
          </p>
          <p>{pub.description}</p>
        </article>
      ))}
      <div className="broadsheet-story">
        <h3>Dispatches from the Field</h3>
        {portfolio.blogs.map((blog, i) => (
          <p key={i} className="dispatch">
            <a href={blog.medium_url} target="_blank" rel="noreferrer">
              {blog.title}
            </a>{' '}
            — {blog.description}
          </p>
        ))}
      </div>
    </div>
  )
}

function CertificationBoard() {
  return (
    <div className="commendation-list">
      {portfolio.certifications.map((cert, i) => (
        <article key={i} className="commendation">
          <span className="wax-seal" aria-hidden />
          <div>
            <h3>{cert.name}</h3>
            <p className="commendation-meta">
              {cert.issuer} · commissioned {cert.issued}
              {cert.expires ? ` · holds until ${cert.expires}` : ''}
            </p>
          </div>
          <a className="verify-stamp" href={cert.url} target="_blank" rel="noreferrer">
            Verify
          </a>
        </article>
      ))}
    </div>
  )
}

function ContactCape() {
  const { personal, social_links } = portfolio
  return (
    <div className="contact-cape">
      <p className="contact-lead">Light the beacon — the crew answers on every channel.</p>
      <div className="signal-flags">
        <a href={`mailto:${personal.email}`}>✉ {personal.email}</a>
        <a href={social_links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={social_links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={social_links.medium} target="_blank" rel="noreferrer">
          Medium
        </a>
        <a href={social_links.twitter_x} target="_blank" rel="noreferrer">
          X
        </a>
      </div>
      <a className="vivre-card" href="/resume/Rahul-Babu-Resume.pdf" download>
        ⎙ Take my Vivre Card — Résumé (PDF)
      </a>
    </div>
  )
}

const SECTION_RENDERERS: Record<SectionId, () => React.JSX.Element> = {
  experience: ExperienceMenu,
  projects: ProjectPosters,
  education: EducationTomes,
  publications: PublicationsPaper,
  certifications: CertificationBoard,
  contact: ContactCape,
}

export function IslandModal() {
  const docked = useWorldStore((s) => s.docked)

  useEffect(() => {
    if (!docked) return
    const onKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape') useWorldStore.getState().undock()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [docked])

  if (!docked) return null
  const island = ISLANDS.find((i) => i.id === docked)
  if (!island) return null
  const Section = SECTION_RENDERERS[island.id]

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={island.name}>
      <div className="modal-panel" style={{ '--accent': island.accent } as React.CSSProperties}>
        <header className="modal-header">
          <div>
            <h2>{island.name}</h2>
            <p>
              {island.tagline} · inspired by {island.inspiredBy}
            </p>
          </div>
          <button className="modal-close" onClick={() => useWorldStore.getState().undock()}>
            Set Sail ⛵
          </button>
        </header>
        <div className="modal-body">
          <Section />
        </div>
      </div>
    </div>
  )
}
