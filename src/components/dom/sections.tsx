'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { portfolio } from '@/content'
import { ISLANDS, type SectionId } from '@/content/islands'
import { useWorldStore } from '@/stores/world'

function bounty(rank: number, total: number): string {
  return `฿${((total - rank) * 100_000_000).toLocaleString('en-US')}`
}

/** Poster mugshot filename — must match scripts that capture into public/posters. */
function posterSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function ExperienceMenu() {
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

export function ProjectPosters() {
  return (
    <div className="poster-grid">
      {portfolio.projects.map((project, i) => (
        <article key={project.name} className="wanted-poster">
          <p className="wanted-header">Wanted</p>
          <p className="wanted-sub">Live or Repo</p>
          {/* Mugshot: live-site capture or repo card, sepia-toned to match the
              poster. Missing images hide themselves (text-only poster). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="wanted-mug"
            src={`/posters/${posterSlug(project.name)}.jpeg`}
            alt=""
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
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

export function EducationTomes() {
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

export function PublicationsPaper() {
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

export function CertificationBoard() {
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

type SnailState = 'sleeping' | 'sending' | 'gatcha' | 'confused'

function DenDenMushiForm() {
  const [state, setState] = useState<SnailState>('sleeping')

  const configured =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY &&
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

  if (!configured) return null

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setState('sending')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: data.get('name'),
          reply_to: data.get('email'),
          message: data.get('message'),
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      )
      form.reset()
      setState('gatcha')
    } catch {
      setState('confused')
    }
  }

  return (
    <form className="denden-form" onSubmit={onSubmit}>
      <p className="denden-snail" aria-hidden>
        {state === 'sending' ? '🐌📞 puru puru puru…' : state === 'gatcha' ? '🐌📞 Gatcha!' : '🐌'}
      </p>
      {state === 'gatcha' ? (
        <p className="denden-status denden-ok">
          Message received — the crew will signal back soon.
        </p>
      ) : (
        <>
          <div className="denden-row">
            <input name="name" placeholder="Your name" required maxLength={80} />
            <input name="email" type="email" placeholder="Your email" required maxLength={120} />
          </div>
          <textarea name="message" placeholder="Your message…" required rows={4} maxLength={2000} />
          {state === 'confused' && (
            <p className="denden-status denden-err">
              The snail got confused — try again, or use the flags below.
            </p>
          )}
          <button type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Calling…' : 'Ring the Den Den Mushi ☎'}
          </button>
        </>
      )}
    </form>
  )
}

export function ContactCape() {
  const { personal, social_links } = portfolio
  return (
    <div className="contact-cape">
      <p className="contact-lead">Light the beacon — the crew answers on every channel.</p>
      <DenDenMushiForm />
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

export function HomeDashboard() {
  const { stats, summary, personal, social_links } = portfolio
  const tiles: [string, number][] = [
    ['Years at sea', stats.years_experience],
    ['Ships launched', stats.projects],
    ['Papers charted', stats.publications],
    ['Commendations', stats.certifications],
  ]
  return (
    <div className="home-dash">
      <p className="home-summary">{summary}</p>

      <div className="home-tiles">
        {tiles.map(([label, value]) => (
          <div key={label} className="home-tile">
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <p className="home-course-lead">Set a course — or sail there yourself:</p>
      <div className="home-courses">
        {ISLANDS.filter((i) => i.id !== 'home').map((island) => (
          <button
            key={island.id}
            style={{ '--accent': island.accent } as React.CSSProperties}
            onClick={() => useWorldStore.getState().dock(island.id)}
          >
            <strong>{island.name}</strong>
            <span>{island.tagline}</span>
          </button>
        ))}
      </div>

      <div className="signal-flags home-flags">
        <a href={`mailto:${personal.email}`}>✉ Email</a>
        <a href={social_links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={social_links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="vivre-card home-vivre" href="/resume/Rahul-Babu-Resume.pdf" download>
          ⎙ Résumé
        </a>
      </div>
    </div>
  )
}

export const SECTION_RENDERERS: Record<SectionId, () => React.JSX.Element> = {
  home: HomeDashboard,
  experience: ExperienceMenu,
  projects: ProjectPosters,
  education: EducationTomes,
  publications: PublicationsPaper,
  certifications: CertificationBoard,
  contact: ContactCape,
}
