'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { getShipAttitude } from '@/lib/waves'
import { normalizeModel } from '@/lib/normalizeModel'
import { useShipStore } from '@/stores/ship'
import { useWorldStore } from '@/stores/world'
import { useTouchInput } from '@/stores/input'
import { resolveCollision } from '@/lib/collision'
import { bindKeys, isDown } from '@/lib/input'

const MODEL_URL = '/models/going-merry.glb'
// Mini Merry: small enough that the straight chase camera sees over her sails.
const TARGET_LENGTH = 5.5
const MAX_SPEED = 17
const REVERSE_SPEED = -4
const ACCEL_DAMP = 0.8
const TURN_RATE = 0.9
const WATERLINE = -0.35
const WORLD_RADIUS = 250
// Hull half-beam plus a fender's worth of margin — collision body radius.
const HULL_RADIUS = 2.5

// Soldier-dock launch: the Mini Merry slides sideways out of the Thousand
// Sunny's hull (home island), from tucked-against-the-hull to open water on
// her port side, then the helm unlocks. Exported so the camera can stage its
// dolly move against the same marks.
export const LAUNCH_FROM = new THREE.Vector3(5, 0, 8)
export const LAUNCH_TO = new THREE.Vector3(-20, 0, 8)
const LAUNCH_SECONDS = 3

const easeInOut = (t: number) => t * t * (3 - 2 * t)

export function Ship() {
  const groupRef = useRef<THREE.Group>(null)
  const shadowRef = useRef<THREE.Mesh>(null)
  const { scene } = useGLTF(MODEL_URL)

  const model = useMemo(() => {
    const group = normalizeModel(scene, TARGET_LENGTH, { axis: 'x' })
    group.rotation.y = Math.PI / 2
    return group
  }, [scene])

  useEffect(() => {
    useShipStore.getState().position.set(LAUNCH_FROM.x, 0, LAUNCH_FROM.z)
    if (process.env.NODE_ENV !== 'production') {
      // Dev-only: teleport/read the ship (used by visual QA scripts)
      ;(window as unknown as Record<string, unknown>).__ship = {
        get pos() {
          const p = useShipStore.getState().position
          return [p.x, p.y, p.z]
        },
        get heading() {
          return useShipStore.getState().heading
        },
        set(x: number, z: number, heading = 0) {
          useShipStore.getState().position.set(x, 0, z)
          useShipStore.setState({ heading, speed: 0 })
        },
      }
    }
    return bindKeys()
  }, [])

  const state = useRef({ angularVelocity: 0, launchT: 0 })

  useFrame(({ clock }, rawDelta) => {
    const group = groupRef.current
    if (!group) return
    const delta = Math.min(rawDelta, 1 / 30)
    const time = clock.getElapsedTime()
    const store = useShipStore.getState()
    const world = useWorldStore.getState()

    let px: number
    let pz: number
    let heading = store.heading
    let speed = store.speed

    if (world.voyageStarted && world.launching) {
      // Scripted soldier-dock slide — no input, no collision.
      state.current.launchT = Math.min(1, state.current.launchT + delta / LAUNCH_SECONDS)
      const t = easeInOut(state.current.launchT)
      px = THREE.MathUtils.lerp(LAUNCH_FROM.x, LAUNCH_TO.x, t)
      pz = THREE.MathUtils.lerp(LAUNCH_FROM.z, LAUNCH_TO.z, t)
      heading = 0
      speed = 0
      if (state.current.launchT >= 1) world.finishLaunch()
    } else {
      // The helm is dead until the voyage begins and while docked.
      const locked = !world.voyageStarted || world.docked !== null
      const touch = useTouchInput.getState()

      const throttleTarget = locked
        ? 0
        : isDown('KeyW', 'ArrowUp')
          ? MAX_SPEED
          : isDown('KeyS', 'ArrowDown')
            ? REVERSE_SPEED
            : touch.throttle * MAX_SPEED
      speed = THREE.MathUtils.damp(store.speed, throttleTarget, ACCEL_DAMP, delta)

      // Rudder authority scales with speed (0 at rest): no spin-in-place.
      const keyRudder =
        (isDown('KeyA', 'ArrowLeft') ? 1 : 0) - (isDown('KeyD', 'ArrowRight') ? 1 : 0)
      const rudder = locked ? 0 : keyRudder !== 0 ? keyRudder : -touch.steer
      const authority = THREE.MathUtils.clamp(Math.abs(speed) / MAX_SPEED, 0, 1)
      state.current.angularVelocity = THREE.MathUtils.damp(
        state.current.angularVelocity,
        rudder * TURN_RATE * authority * Math.sign(speed || 1),
        2.2,
        delta
      )
      heading = store.heading + state.current.angularVelocity * delta

      px = store.position.x + Math.sin(heading) * speed * delta
      pz = store.position.z + Math.cos(heading) * speed * delta

      // Solid world: island beaches and the Sunny's hull push the ship out
      // along the contact normal (radial resolve = natural sliding), and
      // scraping bleeds off speed. Skipped pre-voyage so the parked Merry can
      // sit tucked inside the soldier dock.
      if (world.voyageStarted) {
        const resolved = resolveCollision(px, pz, HULL_RADIUS)
        if (resolved.hit) {
          px = resolved.x
          pz = resolved.z
          speed *= 1 - 1.6 * delta
        }
      }

      // Keep the ship within the charted world
      const fromCenter = Math.hypot(px, pz)
      if (fromCenter > WORLD_RADIUS) {
        px = (px / fromCenter) * WORLD_RADIUS
        pz = (pz / fromCenter) * WORLD_RADIUS
      }
    }

    // Ride the same waves the shader renders (offsets scaled to the mini hull)
    const attitude = getShipAttitude(px, pz, heading, time, 1.9, 0.9)

    store.position.set(px, attitude.height, pz)
    useShipStore.setState({ heading, speed })

    group.position.set(px, attitude.height + WATERLINE, pz)
    group.rotation.set(
      THREE.MathUtils.damp(group.rotation.x, -attitude.pitch, 4, delta),
      heading,
      THREE.MathUtils.damp(group.rotation.z, attitude.roll * 0.7, 4, delta),
      'YXZ'
    )

    const shadow = shadowRef.current
    if (shadow) {
      shadow.position.set(px, attitude.height + 0.06, pz)
      shadow.rotation.z = heading
    }
  })

  return (
    <>
      <group ref={groupRef} position={[LAUNCH_FROM.x, 0, LAUNCH_FROM.z]}>
        <primitive object={model} />
      </group>
      <mesh ref={shadowRef} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[3.2, 24]} />
        <meshBasicMaterial color="#0a2540" transparent opacity={0.16} depthWrite={false} />
      </mesh>
    </>
  )
}

useGLTF.preload(MODEL_URL)
