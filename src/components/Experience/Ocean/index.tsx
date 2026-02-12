import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { experienceStyleConfig } from '../styleConfig'
import oceanFragmentShader from './shaders/fragment'
import oceanVertexShader from './shaders/vertex'

const WORLD_SIZE = 3200

type OceanUniforms = {
  uTime: number
  uWaveAmp: number
  uWaveFreq: number
  uWaveSpeed: number
  uFoamStrength: number
  uHighlightStrength: number
  uColorStart: THREE.Color
  uColorMid: THREE.Color
  uColorEnd: THREE.Color
}

type OceanQualityProfile = {
  segments: number
  waveAmp: number
  waveFreq: number
  waveSpeed: number
  foamStrength: number
  highlightStrength: number
}

const defaultQuality: OceanQualityProfile = {
  segments: experienceStyleConfig.waterDefaultSegments,
  waveAmp: experienceStyleConfig.water.waveAmp,
  waveFreq: experienceStyleConfig.water.waveFreq,
  waveSpeed: experienceStyleConfig.water.waveSpeed,
  foamStrength: experienceStyleConfig.water.foamStrength,
  highlightStrength: experienceStyleConfig.water.highlightStrength
}

const reducedQuality: OceanQualityProfile = {
  segments: experienceStyleConfig.waterReduced.segments,
  waveAmp: experienceStyleConfig.waterReduced.waveAmp,
  waveFreq: experienceStyleConfig.waterReduced.waveFreq,
  waveSpeed: experienceStyleConfig.waterReduced.waveSpeed,
  foamStrength: experienceStyleConfig.waterReduced.foamStrength,
  highlightStrength: experienceStyleConfig.waterReduced.highlightStrength
}

const oceanMaterialDefaults: OceanUniforms = {
  uTime: 0,
  uWaveAmp: defaultQuality.waveAmp,
  uWaveFreq: defaultQuality.waveFreq,
  uWaveSpeed: defaultQuality.waveSpeed,
  uFoamStrength: defaultQuality.foamStrength,
  uHighlightStrength: defaultQuality.highlightStrength,
  uColorStart: new THREE.Color(experienceStyleConfig.water.colorStart),
  uColorMid: new THREE.Color(experienceStyleConfig.water.colorMid),
  uColorEnd: new THREE.Color(experienceStyleConfig.water.colorEnd)
}

const OceanMaterial = shaderMaterial(
  oceanMaterialDefaults,
  oceanVertexShader,
  oceanFragmentShader
)

extend({ OceanMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    oceanMaterial: any
  }
}

const getQualityProfile = (): OceanQualityProfile => {
  if (typeof window === 'undefined') return defaultQuality

  const isLikelyMobile = window.innerWidth <= 768
  const hasHighDpr = window.devicePixelRatio > 1.5

  return isLikelyMobile && hasHighDpr ? reducedQuality : defaultQuality
}

export const Ocean = () => {
  const oceanMaterial = useRef<OceanUniforms>(null)
  const [qualityProfile, setQualityProfile] = useState<OceanQualityProfile>(defaultQuality)

  useEffect(() => {
    const updateQualityProfile = () => {
      setQualityProfile(getQualityProfile())
    }

    updateQualityProfile()
    window.addEventListener('resize', updateQualityProfile)

    return () => {
      window.removeEventListener('resize', updateQualityProfile)
    }
  }, [])

  useFrame((_, delta) => {
    if (!oceanMaterial.current) return

    oceanMaterial.current.uTime += delta
  })

  const geometrySegments = useMemo(
    () => qualityProfile.segments,
    [qualityProfile.segments]
  )

  return (
    <RigidBody type='fixed'>
      <mesh
        scale={WORLD_SIZE}
        receiveShadow
        rotation-x={-Math.PI * 0.5}
        position-y={0}
      >
        <planeGeometry args={[1, 1, geometrySegments, geometrySegments]} />

        <oceanMaterial
          ref={oceanMaterial}
          uWaveAmp={qualityProfile.waveAmp}
          uWaveFreq={qualityProfile.waveFreq}
          uWaveSpeed={qualityProfile.waveSpeed}
          uFoamStrength={qualityProfile.foamStrength}
          uHighlightStrength={qualityProfile.highlightStrength}
        />
      </mesh>
    </RigidBody>
  )
}
