'use client'

import { useState } from 'react'
import { useSettings, type CameraMode, type Quality } from '@/stores/settings'

/** Ship's-wheel settings: camera rig, render quality, controls reference. */
export function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const quality = useSettings((s) => s.quality)
  const cameraMode = useSettings((s) => s.cameraMode)

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
                ['auto', 'Auto — adapts to your ship'],
                ['high', 'High'],
                ['low', 'Low — calm seas for old rigs'],
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

          <div className="settings-help">
            <p>
              <kbd>W A S D</kbd> / arrows — sail · <kbd>E</kbd> — dock · <kbd>Esc</kbd> — set sail
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
