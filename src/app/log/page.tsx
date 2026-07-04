import type { Metadata } from 'next'
import Link from 'next/link'
import { portfolio } from '@/content'
import { LogBody } from '@/components/dom/LogBody'

export const metadata: Metadata = {
  title: "Ship's Log — Rahul Babu",
  description:
    'The complete log of Rahul Babu, software engineer: experience, projects, education, publications, certifications, and contact — the plain-sailing version of the interactive portfolio.',
}

export default function ShipsLog() {
  return (
    <div className="log-page">
      <header className="log-header">
        <p className="loading-eyebrow">The Ship&apos;s Log · plain-sailing edition</p>
        <h1>{portfolio.personal.name}</h1>
        <p className="log-title-line">{portfolio.personal.title}</p>
        <p className="log-summary">{portfolio.summary}</p>
        <p className="log-back">
          <Link href="/">⛵ Board the interactive voyage instead</Link>
        </p>
      </header>

      <LogBody />

      <footer className="log-footer">
        <p>
          An original fan-inspired work. Not affiliated with Shueisha, Toei Animation, or Eiichiro
          Oda.
        </p>
        <p>
          Ship models: &quot;One Piece -Going Merry&quot; by{' '}
          <a href="https://sketchfab.com/anex">Anex</a> and &quot;Thusand Sunny&quot; by{' '}
          <a href="https://sketchfab.com/hobianimasi">Bagus Sujiwa</a>, both CC-BY-4.0 via
          Sketchfab.
        </p>
        <p>
          Built with Next.js, three.js, and React Three Fiber ·{' '}
          <a href={portfolio.social_links.github}>Source on GitHub</a>
        </p>
      </footer>
    </div>
  )
}
