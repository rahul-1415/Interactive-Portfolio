import * as THREE from 'three'

/**
 * Single source of truth for the ocean's Gerstner waves.
 * The GPU vertex shader (Ocean) and CPU sampling (Ship buoyancy) both derive
 * from WAVES, so the ship rides exactly the surface the player sees.
 */
export interface GerstnerWave {
  /** Normalized horizontal direction the wave travels. */
  direction: [number, number]
  /** 0..1 — how pointed the crests are. Sum across waves must stay < 1. */
  steepness: number
  /** Distance between crests, world units. */
  wavelength: number
}

export const WAVES: GerstnerWave[] = [
  { direction: [1, 0.3], steepness: 0.16, wavelength: 42 },
  { direction: [0.5, 0.86], steepness: 0.14, wavelength: 21 },
  { direction: [-0.72, 0.55], steepness: 0.1, wavelength: 11 },
]

const GRAVITY = 9.8

/** Peak vertical amplitude of the summed wave field (Σ steepness/k). */
export const WAVE_AMPLITUDE = WAVES.reduce(
  (sum, wave) => sum + wave.steepness / ((2 * Math.PI) / wave.wavelength),
  0
)

/** Vertical displacement of the ocean surface at world (x, z). */
export function getWaveHeight(x: number, z: number, time: number): number {
  let y = 0
  for (const wave of WAVES) {
    const k = (2 * Math.PI) / wave.wavelength
    const c = Math.sqrt(GRAVITY / k)
    const dx = wave.direction[0]
    const dz = wave.direction[1]
    const len = Math.hypot(dx, dz)
    const f = k * ((dx / len) * x + (dz / len) * z - c * time)
    y += (wave.steepness / k) * Math.sin(f)
  }
  return y
}

const _bow = new THREE.Vector3()
const _stern = new THREE.Vector3()
const _side = new THREE.Vector3()

/**
 * Samples the surface under a ship at heading, returning position + pitch/roll.
 * lengthOffset/widthOffset are half-length and half-beam sampling distances.
 */
export function getShipAttitude(
  x: number,
  z: number,
  heading: number,
  time: number,
  lengthOffset = 3,
  widthOffset = 1.4
): { height: number; pitch: number; roll: number } {
  const fx = Math.sin(heading)
  const fz = Math.cos(heading)

  _bow.set(x + fx * lengthOffset, 0, z + fz * lengthOffset)
  _stern.set(x - fx * lengthOffset, 0, z - fz * lengthOffset)
  _side.set(x + fz * widthOffset, 0, z - fx * widthOffset)

  const hBow = getWaveHeight(_bow.x, _bow.z, time)
  const hStern = getWaveHeight(_stern.x, _stern.z, time)
  const hCenter = getWaveHeight(x, z, time)
  const hSide = getWaveHeight(_side.x, _side.z, time)

  return {
    height: hCenter,
    pitch: Math.atan2(hBow - hStern, lengthOffset * 2),
    roll: Math.atan2(hSide - hCenter, widthOffset),
  }
}

/** GLSL for the same wave field, generated from WAVES so GPU and CPU never drift. */
export function wavesGLSL(): string {
  const body = WAVES.map((wave) => {
    const [dx, dz] = wave.direction
    const len = Math.hypot(dx, dz)
    const k = (2 * Math.PI) / wave.wavelength
    const c = Math.sqrt(GRAVITY / k)
    const a = wave.steepness / k
    return `
  {
    vec2 d = vec2(${(dx / len).toFixed(6)}, ${(dz / len).toFixed(6)});
    float f = ${k.toFixed(6)} * (dot(d, p.xz) - ${c.toFixed(6)} * uTime);
    float cf = cos(f);
    float sf = sin(f);
    p.x += d.x * ${a.toFixed(6)} * cf;
    p.y += ${a.toFixed(6)} * sf;
    p.z += d.y * ${a.toFixed(6)} * cf;
    tangent += vec3(-d.x * d.x * ${wave.steepness.toFixed(6)} * sf, d.x * ${wave.steepness.toFixed(6)} * cf, -d.x * d.y * ${wave.steepness.toFixed(6)} * sf);
    binormal += vec3(-d.x * d.y * ${wave.steepness.toFixed(6)} * sf, d.y * ${wave.steepness.toFixed(6)} * cf, -d.y * d.y * ${wave.steepness.toFixed(6)} * sf);
  }`
  }).join('\n')

  return /* glsl */ `
vec3 gerstner(vec3 p, out vec3 normal) {
  vec3 tangent = vec3(1.0, 0.0, 0.0);
  vec3 binormal = vec3(0.0, 0.0, 1.0);
  ${body}
  normal = normalize(cross(binormal, tangent));
  return p;
}
`
}
