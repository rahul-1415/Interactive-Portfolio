import { create } from 'zustand'
import type { SectionId } from '@/content/islands'
import { useProgress } from './progress'

interface WorldState {
  /** True once the player clicks "Set Sail" — gates all ship input. */
  voyageStarted: boolean
  /**
   * True while the Mini Merry is sliding out of the Thousand Sunny's soldier
   * dock. Helm and collision are suspended; cleared by the Ship when the
   * launch path completes.
   */
  launching: boolean
  /** Island the ship is close enough to dock at (null = open sea). */
  nearIsland: SectionId | null
  /** Island whose modal is open. Controls lock while docked. */
  docked: SectionId | null
  startVoyage: () => void
  finishLaunch: () => void
  setNearIsland: (id: SectionId | null) => void
  dock: (id: SectionId) => void
  undock: () => void
}

export const useWorldStore = create<WorldState>((set) => ({
  voyageStarted: false,
  launching: false,
  nearIsland: null,
  docked: null,
  startVoyage: () => set({ voyageStarted: true, launching: true }),
  finishLaunch: () => set({ launching: false }),
  setNearIsland: (id) => set({ nearIsland: id }),
  dock: (id) => {
    set({ docked: id })
    // Every dock — key, click, or dashboard course — charts the island.
    useProgress.getState().markVisited(id)
  },
  undock: () => set({ docked: null }),
}))
