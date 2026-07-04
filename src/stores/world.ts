import { create } from 'zustand'
import type { SectionId } from '@/content/islands'

interface WorldState {
  /** True once the player clicks "Set Sail" — gates all ship input. */
  voyageStarted: boolean
  /** Island the ship is close enough to dock at (null = open sea). */
  nearIsland: SectionId | null
  /** Island whose modal is open. Controls lock while docked. */
  docked: SectionId | null
  startVoyage: () => void
  setNearIsland: (id: SectionId | null) => void
  dock: (id: SectionId) => void
  undock: () => void
}

export const useWorldStore = create<WorldState>((set) => ({
  voyageStarted: false,
  nearIsland: null,
  docked: null,
  startVoyage: () => set({ voyageStarted: true }),
  setNearIsland: (id) => set({ nearIsland: id }),
  dock: (id) => set({ docked: id }),
  undock: () => set({ docked: null }),
}))
