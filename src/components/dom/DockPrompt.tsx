'use client'

import { useEffect } from 'react'
import { ISLANDS, type SectionId } from '@/content/islands'
import { useWorldStore } from '@/stores/world'

export function DockPrompt() {
  const nearIsland = useWorldStore((s) => s.nearIsland)
  const docked = useWorldStore((s) => s.docked)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== 'KeyE') return
      const { nearIsland: near, docked: isDocked, dock } = useWorldStore.getState()
      if (near && !isDocked) dock(near)
    }
    window.addEventListener('keydown', onKey)
    if (process.env.NODE_ENV !== 'production') {
      // Dev-only: open any island modal directly (used by visual QA scripts)
      ;(window as unknown as Record<string, unknown>).__dock = (id: string) =>
        useWorldStore.getState().dock(id as SectionId)
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!nearIsland || docked) return null
  const island = ISLANDS.find((i) => i.id === nearIsland)
  if (!island) return null

  return (
    <button
      className="dock-prompt"
      onClick={() => useWorldStore.getState().dock(island.id)}
      style={{ '--accent': island.accent } as React.CSSProperties}
    >
      <span className="dock-prompt-anchor">⚓</span>
      <span>
        <strong>{island.name}</strong>
        <em>{island.tagline}</em>
      </span>
      <kbd>E</kbd>
    </button>
  )
}
