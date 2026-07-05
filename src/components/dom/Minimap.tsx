'use client'

import { useEffect, useState } from 'react'
import { ISLANDS } from '@/content/islands'
import { TREASURE_SPOTS } from '@/content/treasures'
import { useShipStore } from '@/stores/ship'
import { useWorldStore } from '@/stores/world'
import { useProgress } from '@/stores/progress'

// World window the chart covers, chosen to fit all islands with margin.
const CENTER_X = 10
const CENTER_Z = 100
const HALF_EXTENT = 135
const SIZE = 148

function toMap(x: number, z: number): { left: number; top: number } {
  const s = SIZE / (HALF_EXTENT * 2)
  return {
    left: SIZE / 2 + (x - CENTER_X) * s,
    top: SIZE / 2 - (z - CENTER_Z) * s,
  }
}

/** Parchment sea-chart minimap: island dots + live ship arrow. */
export function Minimap() {
  const [ship, setShip] = useState({ left: SIZE / 2, top: SIZE / 2, deg: 0 })
  const nearIsland = useWorldStore((s) => s.nearIsland)
  const voyageStarted = useWorldStore((s) => s.voyageStarted)
  const visited = useProgress((s) => s.visited)
  const collected = useProgress((s) => s.treasures)

  useEffect(() => {
    const tick = setInterval(() => {
      const { position, heading } = useShipStore.getState()
      const p = toMap(position.x, position.z)
      setShip({ left: p.left, top: p.top, deg: (heading * 180) / Math.PI })
    }, 120)
    return () => clearInterval(tick)
  }, [])

  if (!voyageStarted) return null

  return (
    <div className="minimap" aria-label="Sea chart">
      <span className="minimap-compass" aria-hidden>
        N
      </span>
      {ISLANDS.map((island) => {
        const p = toMap(island.position[0], island.position[1])
        const classes = [
          'minimap-dot',
          island.id === nearIsland ? 'minimap-dot-near' : '',
          visited.includes(island.id) ? 'minimap-dot-visited' : '',
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <span
            key={island.id}
            className={classes}
            style={{ left: p.left, top: p.top, background: island.accent }}
            title={island.name}
          />
        )
      })}
      {TREASURE_SPOTS.filter((t) => !collected.includes(t.id)).map((t) => {
        const p = toMap(t.position[0], t.position[1])
        return (
          <span key={t.id} className="minimap-x" style={{ left: p.left, top: p.top }} aria-hidden>
            ✕
          </span>
        )
      })}
      <span
        className="minimap-ship"
        aria-hidden
        style={{
          left: ship.left,
          top: ship.top,
          transform: `translate(-50%, -50%) rotate(${ship.deg}deg)`,
        }}
      />
    </div>
  )
}
