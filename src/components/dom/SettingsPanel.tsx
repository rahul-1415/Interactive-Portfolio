'use client'

import { useState } from 'react'
import { primeAudio } from '@/lib/audio'
import { useSettings, type CameraMode, type Quality } from '@/stores/settings'

/** Ship's-wheel settings: camera rig, render quality, controls reference. */
export function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const quality = useSettings((s) => s.quality)
  const cameraMode = useSettings((s) => s.cameraMode)
  const music = useSettings((s) => s.music)
  const sound = useSettings((s) => s.sound)

  return (
    <>
      <button
        className="settings-toggle"
        aria-label="Settings"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        ☸
      </button>
      {open && (
        <div className="settings-panel" role="dialog" aria-label="Settings">
          <h3>Ship&apos;s Wheel</h3>

          <fieldset>
            <legend>Camera</legend>
            {(
              [
                ['straight', 'Straight — dead astern'],
                ['cinematic', 'Cinematic — ¾ trailing'],
              ] as [CameraMode, string][]
            ).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="camera"
                  checked={cameraMode === value}
                  onChange={() => useSettings.getState().setCameraMode(value)}
                />
                {label}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Quality</legend>
            {(
              [
                ['low', 'Swift — fastest, calm seas (default)'],
                ['auto', 'Auto — adapts to your rig'],
                ['high', 'Grand — full effects'],
              ] as [Quality, string][]
            ).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="quality"
                  checked={quality === value}
                  onChange={() => useSettings.getState().setQuality(value)}
                />
                {label}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Audio</legend>
            <label>
              <input
                type="checkbox"
                checked={music}
                onChange={(e) => {
                  // Prime the AudioContext inside the click gesture
                  // (browser autoplay policy) before flipping the setting.
                  if (e.target.checked) primeAudio()
                  useSettings.getState().setMusic(e.target.checked)
                }}
              />
              Music — a crew&apos;s sea shanty
            </label>
            <label>
              <input
                type="checkbox"
                checked={sound}
                onChange={(e) => {
                  if (e.target.checked) primeAudio()
                  useSettings.getState().setSound(e.target.checked)
                }}
              />
              Sound — waves & reward chimes
            </label>
          </fieldset>

          <div className="settings-help">
            <p>
              <kbd>W A S D</kbd> / arrows — sail · <kbd>Shift</kbd> — Coup de Burst ·{' '}
              <kbd>Space</kbd> — dock · <kbd>Esc</kbd> — set sail · click sea or island — set course
            </p>
            <a href="/log">Prefer plain sailing? Read the ship&apos;s log →</a>
          </div>

          <button className="settings-close" onClick={() => setOpen(false)}>
            Back to the helm
          </button>
        </div>
      )}
    </>
  )
}
