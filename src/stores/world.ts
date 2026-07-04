import { create } from 'zustand'
import type { SectionId } from '@/content/islands'

interface WorldState {
  /** Island the ship is close enough to dock at (null = open sea). */
  nearIsland: SectionId | null
  /** Island whose modal is open. Controls lock while docked. */
  docked: SectionId | null
  setNearIsland: (id: SectionId | null) => void
  dock: (id: SectionId) => void
  undock: () => void
}

export const useWorldStore = create<WorldState>((set) => ({
  nearIsland: null,
  docked: null,
  setNearIsland: (id) => set({ nearIsland: id }),
  dock: (id) => set({ docked: id }),
  undock: () => set({ docked: null }),
}))
