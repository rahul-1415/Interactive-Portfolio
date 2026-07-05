'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { WAVE_AMPLITUDE, wavesGLSL } from '@/lib/waves'
import { useShipStore } from '@/stores/ship'
import { useSettings } from '@/stores/settings'

const OCEAN_SIZE = 700

const vertexShader = /* glsl */ `
uniform float uTime;
varying float vHeight;
varying vec3 vNormal;
varying vec3 vWorldPos;

${''}
WAVES_GLSL

void main() {
  vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vec3 normal;
  vec3 displaced = gerstner(worldPos, normal);
  vHeight = displaced.y;
  vNormal = normal;
  vWorldPos = displaced;
  gl_Position = projectionMatrix * viewMatrix * vec4(displaced, 1.0);
}
`

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uDeep;
uniform vec3 uCrest;
uniform vec3 uFoam;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
varying float vHeight;
varying vec3 vNormal;
varying vec3 vWorldPos;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  // Normalized height across the true wave range
  float t = clamp((vHeight + uAmplitude) / (2.0 * uAmplitude), 0.0, 1.0);

  // Posterized toon bands — anime water, not photoreal gradient
  float bands = 5.0;
  float tq = floor(t * bands) / (bands - 1.0);
  vec3 color = mix(uDeep, uCrest, tq * 0.72);

  // Banded sun glint (re-normalize the interpolated normal)
  vec3 nrm = normalize(vNormal);
  vec3 viewDir = normalize(vWorldPos - cameraPosition);
  vec3 sunDir = normalize(vec3(0.45, 0.7, -0.35));
  float spec = pow(max(dot(reflect(viewDir, nrm), sunDir), 0.0), 90.0);
  color += vec3(1.0, 0.96, 0.82) * step(0.55, spec) * 0.28;

  // Crest foam, broken up by scrolling noise
  float n = vnoise(vWorldPos.xz * 0.32 + uTime * 0.28) * 0.6
          + vnoise(vWorldPos.xz * 1.15 - uTime * 0.18) * 0.4;
  float foam = smoothstep(0.94, 1.04, t + (n - 0.5) * 0.22);
  color = mix(color, uFoam, foam);

  // Manual fog matched to the scene fog
  float dist = distance(vWorldPos, cameraPosition);
  float fogFactor = smoothstep(uFogNear, uFogFar, dist);
  color = mix(color, uFogColor, fogFactor);

  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

/** Stylized toon ocean: GPU Gerstner waves + banded ramp + crest foam. */
export function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null)
  // Low quality halves the wave tessellation — the toon bands hide it well.
  const quality = useSettings((s) => s.quality)
  const segments = quality === 'low' ? 144 : 256

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: WAVE_AMPLITUDE },
      uDeep: { value: new THREE.Color('#2E63A4') },
      uCrest: { value: new THREE.Color('#60BFF5') },
      uFoam: { value: new THREE.Color('#F2F9FF') },
      uFogColor: { value: new THREE.Color('#cfeaf7') },
      uFogNear: { value: 70 },
      uFogFar: { value: 240 },
    }),
    []
  )

  const shaders = useMemo(
    () => ({
      vertexShader: vertexShader.replace('WAVES_GLSL', wavesGLSL()),
      fragmentShader,
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    // Endless ocean: the plane trails the ship; waves are world-space so the
    // surface stays continuous.
    const ship = useShipStore.getState().position
    meshRef.current?.position.set(ship.x, 0, ship.z)
  })

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2} frustumCulled={false}>
      <planeGeometry args={[OCEAN_SIZE, OCEAN_SIZE, segments, segments]} />
      <shaderMaterial
        vertexShader={shaders.vertexShader}
        fragmentShader={shaders.fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}
