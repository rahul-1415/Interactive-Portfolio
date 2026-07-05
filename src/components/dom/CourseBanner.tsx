'use client'

import { useShipStore } from '@/stores/ship'

/** Small HUD chip while the autopilot holds a tap-to-sail course. */
export function CourseBanner() {
  const autopilot = useShipStore((s) => s.autopilot)
  if (!autopilot) return null
  return (
    <div className="course-banner" role="status">
      ⛵ Course set — <strong>{autopilot.name}</strong>
      <em>take the helm to cancel</em>
    </div>
  )
}
