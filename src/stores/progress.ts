import { create } from 'zustand'
import { ISLANDS, type SectionId } from '@/content/islands'
import { TREASURE_SPOTS } from '@/content/treasures'

/**
 * Voyage progress — the game layer. Charting an island earns ฿300,000,000,
 * hauling a treasure barrel ฿90,000,000; a full log (7 islands + 10 barrels)
 * totals exactly ฿3,000,000,000 — an Emperor's bounty — and crowns the
 * visitor PIRATE KING. Persisted so the hunt survives reloads.
 */

export const ISLAND_BOUNTY = 300_000_000
export const TREASURE_BOUNTY = 90_000_000

export function bountyOf(visitedCount: number, treasureCount: number): number {
  return visitedCount * ISLAND_BOUNTY + treasureCount * TREASURE_BOUNTY
}

export function isComplete(visitedCount: number, treasureCount: number): boolean {
  return visitedCount >= ISLANDS.length && treasureCount >= TREASURE_SPOTS.length
}

/** Epithet for the current bounty — the ladder every rookie dreams of. */
export function titleFor(bounty: number, complete: boolean): string {
  if (complete) return 'Pirate King'
  if (bounty >= 2_400_000_000) return 'Emperor of the Sea'
  if (bounty >= 1_500_000_000) return 'Yonko Commander'
  if (bounty >= 900_000_000) return 'Worst Generation'
  if (bounty >= 300_000_000) return 'Supernova'
  return 'Rookie of the East Blue'
}

export function formatBounty(bounty: number): string {
  return `฿${bounty.toLocaleString('en-US')}`
}

interface ProgressEvent {
  label: string
  amount: number
  at: number
}

interface ProgressState {
  visited: SectionId[]
  treasures: string[]
  /** Pirate King banner acknowledged — shown once. */
  crowned: boolean
  /** Last reward, for the HUD toast. */
  lastEvent: ProgressEvent | null
  markVisited: (id: SectionId) => void
  collectTreasure: (id: string) => void
  dismissCrown: () => void
}

const STORAGE_KEY = 'grand-log-progress'

function load(): Pick<ProgressState, 'visited' | 'treasures' | 'crowned'> {
  const empty = { visited: [] as SectionId[], treasures: [] as string[], crowned: false }
  if (typeof window === 'undefined') return empty
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw)
    const ids = new Set(ISLANDS.map((i) => i.id))
    const spots = new Set(TREASURE_SPOTS.map((t) => t.id))
    return {
      visited: Array.isArray(parsed.visited)
        ? parsed.visited.filter((v: SectionId) => ids.has(v))
        : [],
      treasures: Array.isArray(parsed.treasures)
        ? parsed.treasures.filter((t: string) => spots.has(t))
        : [],
      crowned: parsed.crowned === true,
    }
  } catch {
    return empty
  }
}

export const useProgress = create<ProgressState>((set, get) => ({
  ...load(),
  lastEvent: null,
  markVisited: (id) => {
    if (get().visited.includes(id)) return
    set((s) => ({
      visited: [...s.visited, id],
      lastEvent: { label: 'Island charted', amount: ISLAND_BOUNTY, at: Date.now() },
    }))
  },
  collectTreasure: (id) => {
    if (get().treasures.includes(id)) return
    set((s) => ({
      treasures: [...s.treasures, id],
      lastEvent: { label: 'Treasure hauled', amount: TREASURE_BOUNTY, at: Date.now() },
    }))
  },
  dismissCrown: () => set({ crowned: true }),
}))

if (typeof window !== 'undefined') {
  useProgress.subscribe((s) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ visited: s.visited, treasures: s.treasures, crowned: s.crowned })
      )
    } catch {
      // storage full/blocked — progress just won't persist
    }
  })
}
