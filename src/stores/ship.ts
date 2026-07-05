import { create } from 'zustand'
import * as THREE from 'three'

export interface AutopilotCourse {
  x: number
  z: number
  /** Island name for the HUD banner. */
  name: string
  /** Stop when within this distance (inside the dock radius). */
  arriveRadius: number
}

interface ShipState {
  /** World position — mutated in place every frame; read via getState() in loops. */
  position: THREE.Vector3
  /** Radians, 0 = +Z. */
  heading: number
  /** World units / second. */
  speed: number
  /** Tap-to-sail course (null = manual helm). Any manual input cancels it. */
  autopilot: AutopilotCourse | null
}

export const useShipStore = create<ShipState>(() => ({
  position: new THREE.Vector3(0, 0, 0),
  heading: 0,
  speed: 0,
  autopilot: null,
}))
