'use client'

import { useEffect } from 'react'
import { ISLANDS, type SectionId } from '@/content/islands'
import { useWorldStore } from '@/stores/world'

export function DockPrompt() {
  const nearIsland = useWorldStore((s) => s.nearIsland)
  const docked = useWorldStore((s) => s.docked)
  const launching = useWorldStore((s) => s.launching)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== 'Space') return
      // Don't hijack Space from form fields or focused buttons
      const target = event.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName)) return
      const {
        voyageStarted,
        nearIsland: near,
        docked: isDocked,
        launching: isLaunching,
        dock,
      } = useWorldStore.getState()
      // Pre-voyage, Space belongs to the Set Sail gate — never dock from it.
      if (voyageStarted && near && !isDocked && !isLaunching) {
        event.preventDefault()
        dock(near)
      }
    }
    window.addEventListener('keydown', onKey)
    if (process.env.NODE_ENV !== 'production') {
      // Dev-only: open any island modal directly (used by visual QA scripts)
      ;(window as unknown as Record<string, unknown>).__dock = (id: string) =>
        useWorldStore.getState().dock(id as SectionId)
    }
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!nearIsland || docked || launching) return null
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
        <strong>{island.label}</strong>
        <em>
          {island.name} · {island.tagline}
        </em>
      </span>
      <kbd>Space</kbd>
    </button>
  )
}
