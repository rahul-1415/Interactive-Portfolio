'use client'

import { useEffect, useRef } from 'react'
import { chime, startOcean, stopOcean } from '@/lib/audio'
import { ISLAND_BOUNTY, useProgress } from '@/stores/progress'
import { useSettings } from '@/stores/settings'
import { useWorldStore } from '@/stores/world'

/**
 * Bridges the settings/progress stores to the Web Audio layer: runs the sea
 * ambience while sound is on and the voyage is under way, and plays a chime
 * on each reward. Renders nothing.
 */
export function AudioController() {
  const sound = useSettings((s) => s.sound)
  const voyageStarted = useWorldStore((s) => s.voyageStarted)
  const lastEvent = useProgress((s) => s.lastEvent)
  const seenEvent = useRef(lastEvent)

  useEffect(() => {
    if (sound && voyageStarted) startOcean()
    else stopOcean()
    return stopOcean
  }, [sound, voyageStarted])

  useEffect(() => {
    if (lastEvent && lastEvent !== seenEvent.current && useSettings.getState().sound) {
      chime(lastEvent.amount >= ISLAND_BOUNTY ? 'island' : 'treasure')
    }
    seenEvent.current = lastEvent
  }, [lastEvent])

  return null
}
