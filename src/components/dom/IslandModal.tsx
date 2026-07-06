'use client'

import { useEffect } from 'react'
import { ISLANDS } from '@/content/islands'
import { useWorldStore } from '@/stores/world'
import { SECTION_RENDERERS } from './sections'

export function IslandModal() {
  const docked = useWorldStore((s) => s.docked)

  useEffect(() => {
    if (!docked) return
    const onKey = (event: KeyboardEvent) => {
      // Space matches the docking key: press it again to set sail. Skip form
      // fields (the contact form needs its spaces) and focused buttons.
      if (event.code === 'Space') {
        if (event.repeat) return
        const target = event.target as HTMLElement | null
        if (target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName)) return
        event.preventDefault()
        useWorldStore.getState().undock()
        return
      }
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
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={island.label}>
      <div className="modal-panel" style={{ '--accent': island.accent } as React.CSSProperties}>
        <header className="modal-header">
          <div>
            <h2>
              {island.label} — {island.name}
            </h2>
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
