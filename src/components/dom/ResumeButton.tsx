'use client'

import { useEffect, useState } from 'react'

const RESUME_URL = '/resume/Rahul-Babu-Resume.pdf'

/**
 * Always-available résumé: a Vivre Card button under the HUD identity that
 * opens an in-page PDF preview with a download action.
 */
export function ResumeButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== 'Escape') return
      // Capture phase + stopImmediatePropagation so this Escape doesn't ALSO
      // undock the island modal underneath (both listen on window).
      event.stopImmediatePropagation()
      setOpen(false)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [open])

  return (
    <>
      <button
        className="resume-btn"
        onClick={(event) => {
          // Drop focus so a later Space press docks/sails instead of
          // re-activating this button.
          event.currentTarget.blur()
          setOpen(true)
        }}
      >
        📜 Résumé
      </button>
      {open && (
        <div
          className="resume-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Résumé preview"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false)
          }}
        >
          <div className="resume-panel">
            <header className="resume-panel-header">
              <h3>Vivre Card — Résumé</h3>
              <div className="resume-panel-actions">
                <a href={RESUME_URL} download="Rahul-Babu-Resume.pdf">
                  ⤓ Download
                </a>
                <button onClick={() => setOpen(false)} aria-label="Close preview">
                  ✕
                </button>
              </div>
            </header>
            <iframe className="resume-frame" src={RESUME_URL} title="Résumé preview" />
          </div>
        </div>
      )}
    </>
  )
}
