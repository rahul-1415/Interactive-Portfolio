import { create } from 'zustand'

export type Quality = 'auto' | 'high' | 'low'
export type CameraMode = 'straight' | 'cinematic'

interface SettingsState {
  quality: Quality
  cameraMode: CameraMode
  /** Sea ambience + reward chimes. Off by default — sound is opt-in. */
  sound: boolean
  setQuality: (q: Quality) => void
  setCameraMode: (m: CameraMode) => void
  setSound: (on: boolean) => void
}

const STORAGE_KEY = 'grand-log-settings'

const DEFAULTS: Pick<SettingsState, 'quality' | 'cameraMode' | 'sound'> = {
  // Speed-first default: 'low' keeps the voyage at full frame rate on any
  // rig; Auto/High are one click away in the Ship's Wheel.
  quality: 'low',
  cameraMode: 'straight',
  sound: false,
}

function load(): typeof DEFAULTS {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        quality: ['auto', 'high', 'low'].includes(parsed.quality) ? parsed.quality : 'low',
        cameraMode: ['straight', 'cinematic'].includes(parsed.cameraMode)
          ? parsed.cameraMode
          : 'straight',
        sound: parsed.sound === true,
      }
    }
  } catch {
    // corrupted storage — fall through to defaults
  }
  return DEFAULTS
}

export const useSettings = create<SettingsState>((set) => ({
  ...load(),
  setQuality: (quality) => set({ quality }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
  setSound: (sound) => set({ sound }),
}))

if (typeof window !== 'undefined') {
  useSettings.subscribe((s) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ quality: s.quality, cameraMode: s.cameraMode, sound: s.sound })
      )
    } catch {
      // storage full/blocked — settings just won't persist
    }
  })
}
