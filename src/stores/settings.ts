import { create } from 'zustand'
import type { MusicTrack } from '@/lib/audio'

export type Quality = 'auto' | 'high' | 'low'
export type CameraMode = 'straight' | 'cinematic'

interface SettingsState {
  quality: Quality
  cameraMode: CameraMode
  /** Background music track, or 'off'. */
  music: MusicTrack | 'off'
  /** Waves ambience + reward chimes. */
  sound: boolean
  setQuality: (q: Quality) => void
  setCameraMode: (m: CameraMode) => void
  setMusic: (track: MusicTrack | 'off') => void
  setSound: (on: boolean) => void
}

const STORAGE_KEY = 'grand-log-settings'

const DEFAULTS: Pick<SettingsState, 'quality' | 'cameraMode' | 'music' | 'sound'> = {
  // Speed-first default: 'low' keeps the voyage at full frame rate on any
  // rig; Auto/High are one click away in the Ship's Wheel.
  quality: 'low',
  cameraMode: 'straight',
  // Audio is on by default — it starts on the Set Sail gesture, so the
  // autoplay policy is satisfied, and both switches live in the Ship's Wheel.
  music: 'shanty' as MusicTrack | 'off',
  sound: true,
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
        // Older saves stored music as a boolean — migrate to a track id.
        music:
          parsed.music === false || parsed.music === 'off'
            ? 'off'
            : ['shanty', 'adventure', 'lullaby'].includes(parsed.music)
              ? parsed.music
              : 'shanty',
        // Pre-music saves stored sound:false as the old default — treat the
        // missing music key as a schema upgrade and re-default sound to on.
        sound: parsed.music === undefined ? true : parsed.sound !== false,
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
  setMusic: (music) => set({ music }),
  setSound: (sound) => set({ sound }),
}))

if (typeof window !== 'undefined') {
  useSettings.subscribe((s) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          quality: s.quality,
          cameraMode: s.cameraMode,
          music: s.music,
          sound: s.sound,
        })
      )
    } catch {
      // storage full/blocked — settings just won't persist
    }
  })
}
