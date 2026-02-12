import * as THREE from 'three'

export type SurfaceCategory = 'land' | 'prop' | 'accent'

export type ExperienceStyleConfig = {
  palette: {
    landLow: string
    landHigh: string
    rock: string
    wood: string
    foliage: string
    accentWarm: string
    accentCool: string
    foam: string
    hudTint: string
  }
  material: {
    roughness: {
      min: number
      max: number
    }
    metalness: {
      min: number
      max: number
    }
    saturationScale: number
    lightnessShift: number
    emissiveIntensity: number
  }
  water: {
    colorStart: string
    colorMid: string
    colorEnd: string
    waveAmp: number
    waveFreq: number
    waveSpeed: number
    foamStrength: number
    highlightStrength: number
  }
  waterReduced: {
    waveAmp: number
    waveFreq: number
    waveSpeed: number
    foamStrength: number
    highlightStrength: number
    segments: number
  }
  waterDefaultSegments: number
  hud: {
    panelAlpha: number
    borderAlpha: number
    shadowAlpha: number
  }
}

export const experienceStyleConfig: ExperienceStyleConfig = {
  palette: {
    landLow: '#d69a6a',
    landHigh: '#f2c28c',
    rock: '#72554a',
    wood: '#9f6f4e',
    foliage: '#72985c',
    accentWarm: '#f08f53',
    accentCool: '#86c2f5',
    foam: '#f4edd8',
    hudTint: '#f7c99b'
  },
  material: {
    roughness: {
      min: 0.5,
      max: 0.86
    },
    metalness: {
      min: 0,
      max: 0.12
    },
    saturationScale: 0.84,
    lightnessShift: 0.05,
    emissiveIntensity: 0.05
  },
  water: {
    colorStart: '#4f92ba',
    colorMid: '#236389',
    colorEnd: '#0b3551',
    waveAmp: 0.54,
    waveFreq: 1,
    waveSpeed: 1,
    foamStrength: 0.55,
    highlightStrength: 0.28
  },
  waterReduced: {
    waveAmp: 0.46,
    waveFreq: 0.92,
    waveSpeed: 0.9,
    foamStrength: 0.44,
    highlightStrength: 0.22,
    segments: 220
  },
  waterDefaultSegments: 320,
  hud: {
    panelAlpha: 0.56,
    borderAlpha: 0.18,
    shadowAlpha: 0.25
  }
}

export const surfaceColorByCategory: Record<SurfaceCategory, THREE.Color> = {
  land: new THREE.Color(experienceStyleConfig.palette.landHigh),
  prop: new THREE.Color(experienceStyleConfig.palette.wood),
  accent: new THREE.Color(experienceStyleConfig.palette.accentWarm)
}
