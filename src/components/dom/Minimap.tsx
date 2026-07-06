'use client'

import { useEffect, useState } from 'react'
import { ISLANDS } from '@/content/islands'
import { TREASURE_SPOTS } from '@/content/treasures'
import { useShipStore } from '@/stores/ship'
import { useWorldStore } from '@/stores/world'
import { useProgress } from '@/stores/progress'

const SIZE = 148
/** Usable chart radius in px (inside the border). */
const R = SIZE / 2 - 8
/** World distance from the ship to the chart's edge. */
const RANGE = 110

interface ShipFix {
  x: number
  z: number
  fwdX: number
  fwdZ: number
}

/**
 * Project a world point into chart space. The chart is ship-centered and
 * heading-up (like a game minimap): chart-up is the ship's forward, and
 * chart-right matches what's on the right of the 3D view. Points beyond
 * RANGE clamp to the rim as bearing markers.
 */
function project(px: number, pz: number, ship: ShipFix) {
  const dx = px - ship.x
  const dz = pz - ship.z
  // Screen-right when looking along forward=(fwdX,fwdZ) is (-fwdZ, fwdX):
  // the camera looks down +forward, so the view's x-axis is mirrored.
  const u = -dx * ship.fwdZ + dz * ship.fwdX
  const v = dx * ship.fwdX + dz * ship.fwdZ
  const s = R / RANGE
  let mu = u * s
  let mv = v * s
  const d = Math.hypot(mu, mv)
  const clamped = d > R
  if (clamped) {
    mu *= R / d
    mv *= R / d
  }
  return { left: SIZE / 2 + mu, top: SIZE / 2 - mv, clamped }
}

/**
 * Ship-centered rotating sea chart: the Merry sits fixed at the center
 * pointing up, islands and treasure ✕ scroll and rotate around her, and the
 * N marker rides the rim to show true north.
 */
export function Minimap() {
  const [fix, setFix] = useState<ShipFix>({ x: 0, z: 0, fwdX: 0, fwdZ: 1 })
  const nearIsland = useWorldStore((s) => s.nearIsland)
  const voyageStarted = useWorldStore((s) => s.voyageStarted)
  const visited = useProgress((s) => s.visited)
  const collected = useProgress((s) => s.treasures)

  useEffect(() => {
    const tick = setInterval(() => {
      const { position, heading } = useShipStore.getState()
      setFix({ x: position.x, z: position.z, fwdX: Math.sin(heading), fwdZ: Math.cos(heading) })
    }, 100)
    return () => clearInterval(tick)
  }, [])

  if (!voyageStarted) return null

  // North bearing marker on the rim: world north is (0, 1)
  const north = {
    left: SIZE / 2 + fix.fwdX * (R - 2),
    top: SIZE / 2 - fix.fwdZ * (R - 2),
  }

  return (
    <div className="minimap" aria-label="Sea chart">
      <span className="minimap-compass" aria-hidden style={{ left: north.left, top: north.top }}>
        N
      </span>
      {ISLANDS.map((island) => {
        const p = project(island.position[0], island.position[1], fix)
        const classes = [
          'minimap-dot',
          island.id === nearIsland ? 'minimap-dot-near' : '',
          visited.includes(island.id) ? 'minimap-dot-visited' : '',
          p.clamped ? 'minimap-dot-far' : '',
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <span
            key={island.id}
            className={classes}
            style={{ left: p.left, top: p.top, background: island.accent }}
            title={island.label}
          />
        )
      })}
      {TREASURE_SPOTS.filter((t) => !collected.includes(t.id)).map((t) => {
        const p = project(t.position[0], t.position[1], fix)
        if (p.clamped) return null
        return (
          <span key={t.id} className="minimap-x" style={{ left: p.left, top: p.top }} aria-hidden>
            ✕
          </span>
        )
      })}
      <span
        className="minimap-ship"
        aria-hidden
        style={{ left: SIZE / 2, top: SIZE / 2, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  )
}
