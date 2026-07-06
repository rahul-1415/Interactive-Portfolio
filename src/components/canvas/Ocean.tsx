'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { WAVE_AMPLITUDE, wavesGLSL } from '@/lib/waves'
import { resolveCollision } from '@/lib/collision'
import { useShipStore } from '@/stores/ship'
import { useWorldStore } from '@/stores/world'
import { useSettings } from '@/stores/settings'
import { MAX_SPEED } from './Ship'

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
uniform vec2 uShipPos;
uniform vec2 uShipDir;
uniform float uShipSpeed;
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

// Churned water the hull leaves behind: a spreading V of stern wash plus a
// bright spray collar at the stem, all scaled by throttle.
float shipWake(vec2 world, float t) {
  vec2 rel = world - uShipPos;
  float fwd = dot(rel, uShipDir);
  float side = dot(rel, vec2(uShipDir.y, -uShipDir.x));

  float behind = -fwd - 1.5;
  float len = 8.0 + 26.0 * uShipSpeed;
  float fade = step(0.0, behind) * (1.0 - smoothstep(0.0, len, behind));
  float width = 1.1 + behind * 0.34;
  float lateral = 1.0 - smoothstep(width * 0.45, width, abs(side));
  float edges = smoothstep(width * 0.5, width * 0.85, abs(side));
  float churn = 0.6 + 0.4 * vnoise(vec2(side * 1.6, behind * 0.7 - t * 2.2));
  float stern = fade * lateral * (0.35 + 0.65 * edges) * churn;

  float bow = (1.0 - smoothstep(0.4, 2.4, abs(fwd - 2.4))) *
              (1.0 - smoothstep(0.6, 1.7, abs(side)));

  return clamp((stern + bow * 1.2) * uShipSpeed, 0.0, 1.0);
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
  float wake = shipWake(vWorldPos.xz, uTime);
  color = mix(color, uFoam, clamp(foam + wake, 0.0, 1.0));

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
  const clickPlaneRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
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
      uShipPos: { value: new THREE.Vector2() },
      uShipDir: { value: new THREE.Vector2(0, 1) },
      uShipSpeed: { value: 0 },
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
    // IMPORTANT: update the uniforms object the material actually renders
    // with (via ref), NOT the memoized `uniforms` — React 19 StrictMode
    // double-invokes useMemo and the material can end up holding the twin
    // object, freezing uTime at 0 (static sea, no wake, buoyancy mismatch).
    const u = materialRef.current?.uniforms as typeof uniforms | undefined
    if (!u) return
    u.uTime.value = clock.getElapsedTime()
    // Endless ocean: the plane trails the ship; waves are world-space so the
    // surface stays continuous.
    const { position, heading, speed } = useShipStore.getState()
    meshRef.current?.position.set(position.x, 0, position.z)
    clickPlaneRef.current?.position.set(position.x, 0.02, position.z)
    u.uShipPos.value.set(position.x, position.z)
    u.uShipDir.value.set(Math.sin(heading), Math.cos(heading))
    // Allowed past 1 during Coup de Burst — the wake shader stretches with it
    u.uShipSpeed.value = THREE.MathUtils.clamp(Math.abs(speed) / MAX_SPEED, 0, 2)
    if (process.env.NODE_ENV !== 'production') {
      // Dev-only: expose the live (rendered) uniforms for visual QA scripts
      ;(window as unknown as Record<string, unknown>).__oceanUniforms = u
    }
  })

  return (
    <>
      <mesh ref={meshRef} rotation-x={-Math.PI / 2} frustumCulled={false}>
        <planeGeometry args={[OCEAN_SIZE, OCEAN_SIZE, segments, segments]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={shaders.vertexShader}
          fragmentShader={shaders.fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      {/* Tap-to-sail hit plane: 2 triangles, so click raycasts never touch the
          tessellated wave mesh. Trails the ship alongside the ocean. */}
      <mesh
        ref={clickPlaneRef}
        rotation-x={-Math.PI / 2}
        frustumCulled={false}
        onClick={(event) => {
          // Island clicks stopPropagation upstream, so they win over the sea.
          // A drag that ends on water is a gesture, not a course order.
          if (event.delta > 6) return
          const world = useWorldStore.getState()
          if (!world.voyageStarted || world.launching || world.docked) return
          // Keep the target reachable: inside the charted world and out of
          // any island/hull collider the ship could never enter.
          let x = event.point.x
          let z = event.point.z
          const fromCenter = Math.hypot(x, z)
          if (fromCenter > 240) {
            x = (x / fromCenter) * 240
            z = (z / fromCenter) * 240
          }
          const clear = resolveCollision(x, z, 5)
          useShipStore.setState({
            autopilot: { x: clear.x, z: clear.z, name: 'open waters', arriveRadius: 5 },
          })
        }}
      >
        <planeGeometry args={[OCEAN_SIZE, OCEAN_SIZE, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  )
}
