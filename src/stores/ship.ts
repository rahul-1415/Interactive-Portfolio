import { create } from 'zustand'
import * as THREE from 'three'

interface ShipState {
  /** World position — mutated in place every frame; read via getState() in loops. */
  position: THREE.Vector3
  /** Radians, 0 = +Z. */
  heading: number
  /** World units / second. */
  speed: number
}

export const useShipStore = create<ShipState>(() => ({
  position: new THREE.Vector3(0, 0, 0),
  heading: 0,
  speed: 0,
}))
