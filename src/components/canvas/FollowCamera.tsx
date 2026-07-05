'use client'

import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useShipStore } from '@/stores/ship'
import { useWorldStore } from '@/stores/world'
import { useSettings } from '@/stores/settings'
import { resolveCollision } from '@/lib/collision'
import { LAUNCH_TO } from './Ship'

/**
 * Damped follow camera, never parented. Two rigs, switchable in Settings:
 * - straight: dead astern — works because the player boat is the Mini Merry,
 *   small enough to see over her sails
 * - cinematic: 3/4 trailing view (behind + side + above)
 */
const RIGS = {
  straight: { back: 24, side: 0, height: 10, lookAhead: 10, lookHeight: 2 },
  cinematic: { back: 30, side: 15, height: 13, lookAhead: 4, lookHeight: 2.5 },
} as const

const LAMBDA = 3

const _desired = new THREE.Vector3()
const _look = new THREE.Vector3()

export function FollowCamera() {
  useFrame(({ camera }, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30)
    const { position, heading } = useShipStore.getState()
    const rig = RIGS[useSettings.getState().cameraMode]

    const fx = Math.sin(heading)
    const fz = Math.cos(heading)
    const rx = Math.cos(heading)
    const rz = -Math.sin(heading)

    if (useWorldStore.getState().launching) {
      // Fixed dolly during the soldier-dock launch: glide straight to the
      // post-launch mark (clear of the Sunny's hull) while tracking the ship.
      _desired.set(LAUNCH_TO.x, rig.height, LAUNCH_TO.z - rig.back)
    } else {
      _desired.set(
        position.x - fx * rig.back + rx * rig.side,
        rig.height + position.y * 0.4,
        position.z - fz * rig.back + rz * rig.side
      )
    }

    // Keep the rig itself out of solid geometry (e.g. backing toward the
    // Sunny would otherwise swing the camera inside her hull).
    const clamped = resolveCollision(_desired.x, _desired.z, 2)
    _desired.x = clamped.x
    _desired.z = clamped.z

    camera.position.x = THREE.MathUtils.damp(camera.position.x, _desired.x, LAMBDA, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, _desired.y, LAMBDA, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, _desired.z, LAMBDA, delta)

    // The damped path can still cut a corner through an obstacle while the
    // target swings around it — hard-resolve the final position too.
    const solid = resolveCollision(camera.position.x, camera.position.z, 1.5)
    camera.position.x = solid.x
    camera.position.z = solid.z

    _look.set(
      position.x + fx * rig.lookAhead,
      position.y + rig.lookHeight,
      position.z + fz * rig.lookAhead
    )
    camera.lookAt(_look)
  })
  return null
}
