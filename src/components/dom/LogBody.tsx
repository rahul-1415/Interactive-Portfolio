'use client'

import { ISLANDS } from '@/content/islands'
import { SECTION_RENDERERS } from './sections'

/** Client wrapper: renders each portfolio section for the plain /log fallback. */
export function LogBody() {
  return (
    <>
      {ISLANDS.map((island) => {
        const Section = SECTION_RENDERERS[island.id]
        return (
          <section key={island.id} className="log-section" id={island.id}>
            <h2>
              {island.name}
              <span className="log-section-sub">
                {island.tagline} · inspired by {island.inspiredBy}
              </span>
            </h2>
            <Section />
          </section>
        )
      })}
    </>
  )
}
