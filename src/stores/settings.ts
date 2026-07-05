import { create } from 'zustand'

export type Quality = 'auto' | 'high' | 'low'
export type CameraMode = 'straight' | 'cinematic'

interface SettingsState {
  quality: Quality
  cameraMode: CameraMode
  setQuality: (q: Quality) => void
  setCameraMode: (m: CameraMode) => void
}

const STORAGE_KEY = 'grand-log-settings'

function load(): Pick<SettingsState, 'quality' | 'cameraMode'> {
  if (typeof window === 'undefined') return { quality: 'low', cameraMode: 'straight' }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        quality: ['auto', 'high', 'low'].includes(parsed.quality) ? parsed.quality : 'low',
        cameraMode: ['straight', 'cinematic'].includes(parsed.cameraMode)
          ? parsed.cameraMode
          : 'straight',
      }
    }
  } catch {
    // corrupted storage — fall through to defaults
  }
  // Speed-first default: 'low' keeps the voyage at full frame rate on any
  // rig; Auto/High are one click away in the Ship's Wheel.
  return { quality: 'low', cameraMode: 'straight' }
}

export const useSettings = create<SettingsState>((set) => ({
  ...load(),
  setQuality: (quality) => set({ quality }),
  setCameraMode: (cameraMode) => set({ cameraMode }),
}))

if (typeof window !== 'undefined') {
  useSettings.subscribe((s) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ quality: s.quality, cameraMode: s.cameraMode })
      )
    } catch {
      // storage full/blocked — settings just won't persist
    }
  })
}
