'use client'

import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'

/**
 * Chart-loader gate (DESIGN.md §3): real asset progress, then an explicit
 * "Set Sail" click before the voyage begins. The scene never "just appears".
 */
export function LoadingGate() {
  const { progress } = useProgress()
  const [ready, setReady] = useState(false)
  const [gone, setGone] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (ready) return
    // Poll drei's loader state off-render; ready once idle at 100%, or after a
    // grace window (cache-hit reloads may never flip `active`).
    const check = setInterval(() => {
      const { active, progress: p } = useProgress.getState()
      if (!active && p >= 100) setReady(true)
    }, 200)
    const grace = setTimeout(() => {
      if (!useProgress.getState().active) setReady(true)
    }, 4500)
    return () => {
      clearInterval(check)
      clearTimeout(grace)
    }
  }, [ready])

  if (gone) return null

  const shownProgress = ready ? 100 : Math.min(99, Math.round(progress))

  return (
    <div className={`loading-gate${fading ? ' loading-gate-fading' : ''}`}>
      <p className="loading-eyebrow">An Interactive Voyage</p>
      <h2 className="loading-title">The Grand Log</h2>
      <p className="loading-sub">Rahul Babu — Software Engineer</p>

      <div className="loading-track" role="progressbar" aria-valuenow={shownProgress}>
        <div className="loading-fill" style={{ width: `${shownProgress}%` }} />
        <span className="loading-ship" style={{ left: `${shownProgress}%` }}>
          ⛵
        </span>
      </div>

      {ready ? (
        <button
          className="set-sail-btn"
          onClick={() => {
            setFading(true)
            setTimeout(() => setGone(true), 700)
          }}
        >
          Set Sail
        </button>
      ) : (
        <p className="loading-status">Charting course… {shownProgress}%</p>
      )}

      <a className="skip-voyage" href="/log">
        Skip the voyage — read the ship&apos;s log instead
      </a>
    </div>
  )
}
