'use client'

import { useEffect, useState } from 'react'
import { ISLANDS } from '@/content/islands'
import { TREASURE_SPOTS } from '@/content/treasures'
import { bountyOf, formatBounty, isComplete, useProgress } from '@/stores/progress'
import { useWorldStore } from '@/stores/world'

/**
 * Skypiea is not an island on the log — it's the sea above the sea. Sailing
 * under the cloud bank offers an ascent (Space); the card recaps the voyage
 * and, for a completed log, rings the golden bell.
 */
export function SkypieaCard() {
  const atSkypiea = useWorldStore((s) => s.atSkypiea)
  const docked = useWorldStore((s) => s.docked)
  const nearIsland = useWorldStore((s) => s.nearIsland)
  const [open, setOpen] = useState(false)
  const visited = useProgress((s) => s.visited)
  const treasures = useProgress((s) => s.treasures)

  useEffect(() => {
    // Capture phase: while the card is open it owns Space/Escape outright —
    // stopImmediatePropagation keeps the same press from also docking or
    // undocking via the other window listeners.
    const onKey = (event: KeyboardEvent) => {
      if (event.repeat) return
      const target = event.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName)) return
      if (open && (event.code === 'Space' || event.code === 'Escape')) {
        event.preventDefault()
        event.stopImmediatePropagation()
        setOpen(false)
        return
      }
      if (event.code !== 'Space') return
      const world = useWorldStore.getState()
      // A dockable island wins the prompt AND the key in overlap zones.
      if (
        !world.atSkypiea ||
        world.nearIsland ||
        world.docked ||
        world.launching ||
        !world.voyageStarted
      )
        return
      event.preventDefault()
      setOpen(true)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open])

  const crowned = isComplete(visited.length, treasures.length)

  if (open) {
    return (
      <div className="skypiea-overlay" role="dialog" aria-modal="true" aria-label="Skypiea">
        <div className="skypiea-card">
          <p className="skypiea-eyebrow">the sea above the sea</p>
          <h2>Skypiea</h2>
          {crowned ? (
            <p>
              The golden bell rings for you, Pirate King — every island charted, every barrel
              hauled, a full log worth {formatBounty(bountyOf(visited.length, treasures.length))}.
            </p>
          ) : (
            <p>
              The bell of Shandora waits in silence. Chart every island and haul every barrel to
              ring it — the log stands at {visited.length}/{ISLANDS.length} islands and{' '}
              {treasures.length}/{TREASURE_SPOTS.length} treasures.
            </p>
          )}
          <button onClick={() => setOpen(false)}>
            Descend to the blue sea <kbd>Space</kbd>
          </button>
        </div>
      </div>
    )
  }

  // The dock prompt takes precedence where an island's radius overlaps the
  // cloud bank (Publications/Education) — never stack the two prompts.
  if (!atSkypiea || docked || nearIsland) return null

  return (
    <button className="dock-prompt skypiea-prompt" onClick={() => setOpen(true)}>
      <span className="dock-prompt-anchor">☁️</span>
      <span>
        <strong>Skypiea</strong>
        <em>the sea above the sea · ascend for the bell</em>
      </span>
      <kbd>Space</kbd>
    </button>
  )
}
