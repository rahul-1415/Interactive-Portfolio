'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { getShipAttitude } from '@/lib/waves'
import { useShipStore } from '@/stores/ship'
import { useWorldStore } from '@/stores/world'
import { ISLANDS } from '@/content/islands'
import { bindKeys, isDown } from '@/lib/input'

const MODEL_URL = '/models/going-merry.glb'
const TARGET_LENGTH = 9
const MAX_SPEED = 17
const REVERSE_SPEED = -4
const ACCEL_DAMP = 0.8
const TURN_RATE = 0.9
const WATERLINE = -1.0

export function Ship() {
  const groupRef = useRef<THREE.Group>(null)
  const shadowRef = useRef<THREE.Mesh>(null)
  const { scene } = useGLTF(MODEL_URL)

  // Normalize the source model deterministically: hull length runs along the
  // model's X axis and its origin sits at the keel (measured via gltf-transform
  // inspect). Rotate so the bow faces +Z, center horizontally, keel at y=0.
  const model = useMemo(() => {
    const clone = scene.clone(true)
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const inner = new THREE.Group()
    inner.add(clone)
    clone.position.set(-center.x, -box.min.y, -center.z)
    inner.scale.setScalar(TARGET_LENGTH / size.x)
    inner.rotation.y = Math.PI / 2
    return inner
  }, [scene])

  useEffect(() => bindKeys(), [])

  const state = useRef({ angularVelocity: 0 })

  useFrame(({ clock }, rawDelta) => {
    const group = groupRef.current
    if (!group) return
    const delta = Math.min(rawDelta, 1 / 30)
    const time = clock.getElapsedTime()
    const store = useShipStore.getState()

    // Helm is locked while docked; the ship coasts to a stop
    const docked = useWorldStore.getState().docked !== null

    // Throttle with inertia
    const throttleTarget =
      !docked && isDown('KeyW', 'ArrowUp')
        ? MAX_SPEED
        : !docked && isDown('KeyS', 'ArrowDown')
          ? REVERSE_SPEED
          : 0
    const speed = THREE.MathUtils.damp(store.speed, throttleTarget, ACCEL_DAMP, delta)

    // Rudder authority scales with speed so the ship can't spin in place
    const rudder = (isDown('KeyA', 'ArrowLeft') ? 1 : 0) - (isDown('KeyD', 'ArrowRight') ? 1 : 0)
    const authority = THREE.MathUtils.clamp(Math.abs(speed) / MAX_SPEED, 0.15, 1)
    state.current.angularVelocity = THREE.MathUtils.damp(
      state.current.angularVelocity,
      rudder * TURN_RATE * authority * Math.sign(speed || 1),
      2.2,
      delta
    )
    const heading = store.heading + state.current.angularVelocity * delta

    // Kinematic advance
    let px = store.position.x + Math.sin(heading) * speed * delta
    let pz = store.position.z + Math.cos(heading) * speed * delta

    // Soft collision: islands push the hull back out along the contact normal
    for (const island of ISLANDS) {
      const dx = px - island.position[0]
      const dz = pz - island.position[1]
      const dist = Math.hypot(dx, dz)
      const minDist = island.landRadius + 4
      if (dist < minDist && dist > 0.001) {
        px = island.position[0] + (dx / dist) * minDist
        pz = island.position[1] + (dz / dist) * minDist
      }
    }

    // Ride the same waves the shader renders
    const attitude = getShipAttitude(px, pz, heading, time)

    store.position.set(px, attitude.height, pz)
    useShipStore.setState({ heading, speed })

    group.position.set(px, attitude.height + WATERLINE, pz)
    group.rotation.set(
      THREE.MathUtils.damp(group.rotation.x, -attitude.pitch, 4, delta),
      heading,
      THREE.MathUtils.damp(group.rotation.z, attitude.roll * 0.7, 4, delta),
      'YXZ'
    )

    // Blob shadow hugs the surface just above the waterline
    const shadow = shadowRef.current
    if (shadow) {
      shadow.position.set(px, attitude.height + 0.06, pz)
      shadow.rotation.z = heading
    }
  })

  return (
    <>
      <group ref={groupRef}>
        <primitive object={model} />
      </group>
      <mesh ref={shadowRef} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[5, 24]} />
        <meshBasicMaterial color="#0a2540" transparent opacity={0.16} depthWrite={false} />
      </mesh>
    </>
  )
}

useGLTF.preload(MODEL_URL)
