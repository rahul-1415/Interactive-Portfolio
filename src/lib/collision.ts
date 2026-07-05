import { ISLANDS } from '@/content/islands'

/**
 * Waterline collision field shared by the ship and the follow camera.
 *
 * Solid islands are circles slightly larger than their visual beach
 * (IslandBase renders at ~1.2 × landRadius). The Thousand Sunny — rendered
 * verbatim from the baked GLB near the world origin — gets an oriented
 * capsule fitted to her measured hull (52.2 × 26 at yaw ≈ 4°, see
 * scripts/bake-skins.mjs).
 */

interface CircleCollider {
  kind: 'circle'
  x: number
  z: number
  r: number
}

interface CapsuleCollider {
  kind: 'capsule'
  ax: number
  az: number
  bx: number
  bz: number
  r: number
}

type Collider = CircleCollider | CapsuleCollider

/** The Sunny's hull segment: center (0.3, 2.3), axis ~4° off +z, half-beam 13. */
export const SUNNY_HULL: CapsuleCollider = {
  kind: 'capsule',
  ax: 1.2,
  az: 15.4,
  bx: -0.6,
  bz: -10.8,
  r: 13,
}

const COLLIDERS: Collider[] = [
  SUNNY_HULL,
  ...ISLANDS.filter((i) => i.landRadius > 0).map((i): CircleCollider => ({
    kind: 'circle',
    x: i.position[0],
    z: i.position[1],
    r: i.landRadius * 1.3,
  })),
]

export interface CollisionResult {
  x: number
  z: number
  hit: boolean
}

/**
 * Push a point of the given body radius out of every collider it penetrates.
 * Resolution is radial (positions slide along the surface), so a moving body
 * naturally skims the obstacle instead of sticking to it.
 */
export function resolveCollision(x: number, z: number, bodyRadius: number): CollisionResult {
  let hit = false
  for (const c of COLLIDERS) {
    let cx: number
    let cz: number
    if (c.kind === 'circle') {
      cx = c.x
      cz = c.z
    } else {
      // Closest point on the capsule's core segment
      const abx = c.bx - c.ax
      const abz = c.bz - c.az
      const t = Math.min(
        1,
        Math.max(0, ((x - c.ax) * abx + (z - c.az) * abz) / (abx * abx + abz * abz))
      )
      cx = c.ax + abx * t
      cz = c.az + abz * t
    }
    const dx = x - cx
    const dz = z - cz
    const dist = Math.hypot(dx, dz)
    const minDist = c.r + bodyRadius
    if (dist < minDist && dist > 0.001) {
      x = cx + (dx / dist) * minDist
      z = cz + (dz / dist) * minDist
      hit = true
    }
  }
  return { x, z, hit }
}
