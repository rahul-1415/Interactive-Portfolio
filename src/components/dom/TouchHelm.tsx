'use client'

import { useEffect, useState } from 'react'
import { useTouchInput } from '@/stores/input'
import { useWorldStore } from '@/stores/world'

/**
 * On-screen helm for touch devices: a left/right steer rocker and a hold-to-sail
 * throttle. Only mounts when a coarse pointer (touch) is the primary input.
 */
export function TouchHelm() {
  const [isTouch, setIsTouch] = useState(false)
  const docked = useWorldStore((s) => s.docked)

  useEffect(() => {
    // Client-only capability check — intentionally sets state post-mount to
    // avoid an SSR/hydration mismatch on the touch affordance.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    return () => useTouchInput.getState().set({ steer: 0, throttle: 0 })
  }, [])

  if (!isTouch || docked) return null

  const steerStart = (dir: number) => useTouchInput.getState().set({ steer: dir })
  const steerEnd = () => useTouchInput.getState().set({ steer: 0 })
  const sailStart = () => useTouchInput.getState().set({ throttle: 1 })
  const sailEnd = () => useTouchInput.getState().set({ throttle: 0 })

  return (
    <div className="touch-helm">
      <div className="touch-steer">
        <button
          aria-label="Steer left"
          onPointerDown={() => steerStart(-1)}
          onPointerUp={steerEnd}
          onPointerLeave={steerEnd}
          onPointerCancel={steerEnd}
        >
          ◀
        </button>
        <button
          aria-label="Steer right"
          onPointerDown={() => steerStart(1)}
          onPointerUp={steerEnd}
          onPointerLeave={steerEnd}
          onPointerCancel={steerEnd}
        >
          ▶
        </button>
      </div>
      <button
        className="touch-throttle"
        aria-label="Hold to sail forward"
        onPointerDown={sailStart}
        onPointerUp={sailEnd}
        onPointerLeave={sailEnd}
        onPointerCancel={sailEnd}
      >
        ⛵ Sail
      </button>
    </div>
  )
}
