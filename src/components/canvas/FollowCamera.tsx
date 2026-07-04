'use client'

import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShipStore } from '@/stores/ship'

const BACK = 17
const HEIGHT = 9
const LOOK_AHEAD = 6
const LAMBDA = 3

const _desired = new THREE.Vector3()
const _look = new THREE.Vector3()

/** Damped follow camera — trails the ship, never hard-parented. */
export function FollowCamera() {
  useFrame(({ camera }, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30)
    const { position, heading } = useShipStore.getState()

    const fx = Math.sin(heading)
    const fz = Math.cos(heading)

    _desired.set(position.x - fx * BACK, HEIGHT + position.y * 0.4, position.z - fz * BACK)

    camera.position.x = THREE.MathUtils.damp(camera.position.x, _desired.x, LAMBDA, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, _desired.y, LAMBDA, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, _desired.z, LAMBDA, delta)

    _look.set(position.x + fx * LOOK_AHEAD, position.y + 2.2, position.z + fz * LOOK_AHEAD)
    camera.lookAt(_look)
  })
  return null
}
