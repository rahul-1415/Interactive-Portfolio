'use client'

import { useEffect, useRef } from 'react'
import { chime, startMusic, startOcean, stopMusic, stopOcean } from '@/lib/audio'
import { ISLAND_BOUNTY, useProgress } from '@/stores/progress'
import { useSettings } from '@/stores/settings'
import { useWorldStore } from '@/stores/world'

/**
 * Bridges the settings/progress stores to the Web Audio layer: sea shanty
 * while music is on, waves + reward chimes while sound is on — both only
 * once the voyage is under way (the Set Sail gesture primes the context).
 * Renders nothing.
 */
export function AudioController() {
  const music = useSettings((s) => s.music)
  const sound = useSettings((s) => s.sound)
  const voyageStarted = useWorldStore((s) => s.voyageStarted)
  const lastEvent = useProgress((s) => s.lastEvent)
  const seenEvent = useRef(lastEvent)

  useEffect(() => {
    if (music !== 'off' && voyageStarted) startMusic(music)
    else stopMusic()
    return stopMusic
  }, [music, voyageStarted])

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
