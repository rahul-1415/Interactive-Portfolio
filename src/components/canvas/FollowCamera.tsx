'use client'

import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShipStore } from '@/stores/ship'

const BACK = 52
const SIDE = 26
const HEIGHT = 24
const LOOK_AHEAD = 6
const LOOK_HEIGHT = 5
const LAMBDA = 3

const _desired = new THREE.Vector3()
const _look = new THREE.Vector3()

/**
 * Damped follow camera — trails the ship from behind, above, and off to one
 * side (never parented). The lateral offset is essential: viewed dead-astern a
 * square-rigged ship's mainsail fills the frame, so the 3/4 angle keeps the sail
 * edge-on and the ocean in view.
 */
export function FollowCamera() {
  useFrame(({ camera }, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30)
    const { position, heading } = useShipStore.getState()

    const fx = Math.sin(heading)
    const fz = Math.cos(heading)
    // Right vector (perpendicular to heading on the water plane)
    const rx = Math.cos(heading)
    const rz = -Math.sin(heading)

    _desired.set(
      position.x - fx * BACK + rx * SIDE,
      HEIGHT + position.y * 0.4,
      position.z - fz * BACK + rz * SIDE
    )

    camera.position.x = THREE.MathUtils.damp(camera.position.x, _desired.x, LAMBDA, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, _desired.y, LAMBDA, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, _desired.z, LAMBDA, delta)

    _look.set(position.x + fx * LOOK_AHEAD, position.y + LOOK_HEIGHT, position.z + fz * LOOK_AHEAD)
    camera.lookAt(_look)
  })
  return null
}
