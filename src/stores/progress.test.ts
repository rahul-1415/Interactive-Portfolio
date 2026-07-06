import { describe, expect, it } from 'vitest'
import { ISLANDS } from '@/content/islands'
import { TREASURE_SPOTS } from '@/content/treasures'
import { SUNNY_HULL } from '@/lib/collision'
import {
  ISLAND_BOUNTY,
  TREASURE_BOUNTY,
  bountyOf,
  formatBounty,
  isComplete,
  titleFor,
} from './progress'

describe('voyage progress', () => {
  it('a full log totals exactly an Emperor bounty of ฿3B', () => {
    expect(bountyOf(ISLANDS.length, TREASURE_SPOTS.length)).toBe(3_000_000_000)
  })

  it('climbs the epithet ladder to Pirate King', () => {
    expect(titleFor(0, false)).toBe('Rookie of the East Blue')
    expect(titleFor(ISLAND_BOUNTY, false)).toBe('Supernova')
    expect(titleFor(3 * ISLAND_BOUNTY, false)).toBe('Worst Generation')
    expect(titleFor(5 * ISLAND_BOUNTY, false)).toBe('Yonko Commander')
    expect(titleFor(8 * ISLAND_BOUNTY, false)).toBe('Emperor of the Sea')
    expect(titleFor(3_000_000_000, true)).toBe('Pirate King')
  })

  it('completion needs every island and every barrel', () => {
    expect(isComplete(ISLANDS.length, TREASURE_SPOTS.length - 1)).toBe(false)
    expect(isComplete(ISLANDS.length - 1, TREASURE_SPOTS.length)).toBe(false)
    expect(isComplete(ISLANDS.length, TREASURE_SPOTS.length)).toBe(true)
  })

  it('formats bounty with the berry sign', () => {
    expect(formatBounty(TREASURE_BOUNTY)).toBe('฿60,000,000')
  })

  it('places every treasure in open water, clear of land and hull', () => {
    for (const spot of TREASURE_SPOTS) {
      const [x, z] = spot.position
      // World bounds
      expect(Math.hypot(x, z)).toBeLessThan(250)
      // Clear of island collision circles (landRadius * 1.3 + ship body)
      for (const island of ISLANDS) {
        if (island.landRadius <= 0) continue
        const d = Math.hypot(x - island.position[0], z - island.position[1])
        expect(d, `${spot.id} vs ${island.id}`).toBeGreaterThan(island.landRadius * 1.3 + 6)
      }
      // Clear of the Sunny's hull capsule
      const abx = SUNNY_HULL.bx - SUNNY_HULL.ax
      const abz = SUNNY_HULL.bz - SUNNY_HULL.az
      const t = Math.min(
        1,
        Math.max(
          0,
          ((x - SUNNY_HULL.ax) * abx + (z - SUNNY_HULL.az) * abz) / (abx * abx + abz * abz)
        )
      )
      const d = Math.hypot(x - (SUNNY_HULL.ax + abx * t), z - (SUNNY_HULL.az + abz * t))
      expect(d, `${spot.id} vs Sunny hull`).toBeGreaterThan(SUNNY_HULL.r + 6)
    }
  })
})
