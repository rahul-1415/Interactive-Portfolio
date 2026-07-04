'use client'

import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useShipStore } from '@/stores/ship'

const vertexShader = /* glsl */ `
  varying vec3 vWorldDirection;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldDirection = normalize(worldPosition.xyz - cameraPosition);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vWorldDirection;
  uniform vec3 uZenith;
  uniform vec3 uHorizon;
  void main() {
    float elevation = clamp(vWorldDirection.y, 0.0, 1.0);
    // Anime-flat sky: quick falloff keeps saturated blue overhead,
    // soft warm-white band hugging the horizon.
    vec3 color = mix(uHorizon, uZenith, pow(elevation, 0.55));
    gl_FragColor = vec4(color, 1.0);
  }
`

/**
 * Flat, saturated anime sky gradient — One Piece blue, not physical haze.
 * Recenters on the ship each frame so the dome is effectively infinite; the
 * player can never sail out of it.
 */
export function SkyDome() {
  const ref = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(
    () => ({
      uZenith: { value: new THREE.Color('#3D9BE9') },
      uHorizon: { value: new THREE.Color('#DFF3FB') },
    }),
    []
  )

  useFrame(() => {
    const ship = useShipStore.getState().position
    ref.current?.position.set(ship.x, 0, ship.z)
  })

  return (
    <mesh ref={ref} frustumCulled={false}>
      <sphereGeometry args={[320, 32, 16]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
