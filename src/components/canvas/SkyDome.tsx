'use client'

import * as THREE from 'three'
import { useMemo } from 'react'

const vertexShader = /* glsl */ `
  varying vec3 vWorldDirection;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldDirection = normalize(worldPosition.xyz);
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

/** Flat, saturated anime sky gradient — One Piece blue, not physical haze. */
export function SkyDome() {
  const uniforms = useMemo(
    () => ({
      uZenith: { value: new THREE.Color('#3D9BE9') },
      uHorizon: { value: new THREE.Color('#DFF3FB') },
    }),
    []
  )

  return (
    <mesh>
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
