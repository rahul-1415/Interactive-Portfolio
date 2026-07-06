/**
 * Procedural ship's audio — no audio assets, everything synthesized with the
 * Web Audio API:
 *  - a gentle sea bed (soft-filtered brown noise breathing on a slow swell)
 *  - an original 6/8 sea-shanty loop in D major (detuned squares for an
 *    accordion feel over a triangle bass) — Grand-Line spirit, original tune
 *  - tiny pentatonic reward chimes
 * The context is created lazily inside a user gesture (autoplay policy).
 */

let ctx: AudioContext | null = null
let ocean: { stop: () => void } | null = null
let shanty: { stop: () => void } | null = null

function context(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/**
 * Create/resume the context synchronously inside a user gesture (autoplay
 * policy) — call from the Set Sail button and the audio toggles.
 */
export function primeAudio(): void {
  context()
}

/** Looped brown-noise buffer — the deep wash of open water. */
function brownNoiseBuffer(ac: AudioContext, seconds = 4): AudioBuffer {
  const rate = ac.sampleRate
  const buffer = ac.createBuffer(1, rate * seconds, rate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    last = (last + 0.02 * white) / 1.02
    data[i] = last * 3.5
  }
  return buffer
}

export function startOcean(): void {
  if (ocean) return
  const ac = context()

  const src = ac.createBufferSource()
  src.buffer = brownNoiseBuffer(ac)
  src.loop = true

  // Softer than surf: low rumble only, breathing slowly
  const filter = ac.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 280
  filter.Q.value = 0.3

  const gain = ac.createGain()
  gain.gain.value = 0
  gain.gain.linearRampToValueAtTime(0.06, ac.currentTime + 2)

  const lfo = ac.createOscillator()
  lfo.frequency.value = 0.07
  const lfoDepth = ac.createGain()
  lfoDepth.gain.value = 0.025
  lfo.connect(lfoDepth)
  lfoDepth.connect(gain.gain)

  src.connect(filter)
  filter.connect(gain)
  gain.connect(ac.destination)
  src.start()
  lfo.start()

  ocean = {
    stop: () => {
      // Anchor at the current value first — a bare linearRamp interpolates
      // from the LAST scheduled event (the fade-in), i.e. a hard cut.
      const now = ac.currentTime
      gain.gain.cancelScheduledValues(now)
      gain.gain.setValueAtTime(gain.gain.value, now)
      gain.gain.linearRampToValueAtTime(0, now + 0.4)
      setTimeout(() => {
        src.stop()
        lfo.stop()
      }, 500)
    },
  }
}

export function stopOcean(): void {
  ocean?.stop()
  ocean = null
}

// ---------------------------------------------------------------------------
// The shanty. 6/8, D major, two 8-bar strains — an original tune in the
// spirit of a crew's drinking song. Notes are [midi, eighths].
// ---------------------------------------------------------------------------

const EIGHTH = 0.27 // ≈ dotted-quarter 74 bpm

type Note = [number, number]

const MELODY: Note[] = [
  // A strain
  [62, 1],
  [64, 1],
  [66, 1],
  [69, 2],
  [66, 1],
  [67, 1],
  [66, 1],
  [64, 1],
  [66, 3],
  [71, 1],
  [69, 1],
  [67, 1],
  [71, 2],
  [67, 1],
  [69, 2],
  [64, 1],
  [61, 3],
  [62, 1],
  [64, 1],
  [66, 1],
  [69, 2],
  [71, 1],
  [74, 2],
  [71, 1],
  [67, 3],
  [69, 1],
  [71, 1],
  [69, 1],
  [64, 2],
  [66, 1],
  [62, 6],
  // B strain
  [66, 1],
  [69, 1],
  [74, 1],
  [74, 2],
  [73, 1],
  [71, 1],
  [74, 1],
  [71, 1],
  [67, 3],
  [69, 1],
  [73, 1],
  [76, 1],
  [76, 2],
  [74, 1],
  [74, 2],
  [69, 1],
  [66, 3],
  [67, 1],
  [69, 1],
  [71, 1],
  [74, 2],
  [71, 1],
  [69, 2],
  [66, 1],
  [62, 3],
  [64, 1],
  [66, 1],
  [64, 1],
  [61, 2],
  [64, 1],
  [62, 6],
]

/** Bass roots per bar (two dotted-quarter pulses each). */
const BASS_BARS = [50, 50, 55, 57, 50, 55, 57, 50, 50, 55, 57, 50, 55, 50, 57, 50]

const midiHz = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

function scheduleShantyPhrase(ac: AudioContext, out: GainNode, t0: number): number {
  // Melody: two detuned squares through a lowpass = squeezebox
  let t = t0
  for (const [midi, eighths] of MELODY) {
    const dur = eighths * EIGHTH
    for (const detune of [-5, 5]) {
      const osc = ac.createOscillator()
      osc.type = 'square'
      osc.frequency.value = midiHz(midi)
      osc.detune.value = detune

      const vibrato = ac.createOscillator()
      vibrato.frequency.value = 5.4
      const vibratoDepth = ac.createGain()
      vibratoDepth.gain.value = 3.5
      vibrato.connect(vibratoDepth)
      vibratoDepth.connect(osc.detune)

      const lp = ac.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 2200

      const g = ac.createGain()
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.028, t + 0.02)
      g.gain.setValueAtTime(0.028, t + dur * 0.72)
      g.gain.linearRampToValueAtTime(0.0001, t + dur * 0.95)

      osc.connect(lp)
      lp.connect(g)
      g.connect(out)
      osc.start(t)
      osc.stop(t + dur)
      vibrato.start(t)
      vibrato.stop(t + dur)
    }
    t += dur
  }

  // Bass: root pulses on the two big beats of each 6/8 bar
  const barLen = 6 * EIGHTH
  BASS_BARS.forEach((midi, bar) => {
    for (const beat of [0, 3]) {
      const start = t0 + bar * barLen + beat * EIGHTH
      const osc = ac.createOscillator()
      osc.type = 'triangle'
      osc.frequency.value = midiHz(midi)
      const g = ac.createGain()
      g.gain.setValueAtTime(0, start)
      g.gain.linearRampToValueAtTime(0.07, start + 0.02)
      g.gain.exponentialRampToValueAtTime(0.001, start + EIGHTH * 2.6)
      osc.connect(g)
      g.connect(out)
      osc.start(start)
      osc.stop(start + EIGHTH * 2.8)
    }
  })

  return MELODY.reduce((sum, [, e]) => sum + e, 0) * EIGHTH
}

export function startShanty(): void {
  if (shanty) return
  const ac = context()
  const master = ac.createGain()
  master.gain.value = 0
  master.gain.linearRampToValueAtTime(1, ac.currentTime + 1.2)
  master.connect(ac.destination)

  let timer: ReturnType<typeof setTimeout> | null = null
  let stopped = false
  const loop = (start: number) => {
    if (stopped) return
    // Fast-forward if a throttled background-tab timer woke us late — never
    // schedule a phrase in the past (it would sound all at once).
    if (start < ac.currentTime) start = ac.currentTime + 0.1
    const phraseLen = scheduleShantyPhrase(ac, master, start)
    timer = setTimeout(
      () => loop(start + phraseLen),
      Math.max(250, (start + phraseLen - ac.currentTime - 1) * 1000)
    )
  }
  loop(ac.currentTime + 0.15)

  shanty = {
    stop: () => {
      stopped = true
      if (timer) clearTimeout(timer)
      const now = ac.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + 0.5)
      setTimeout(() => master.disconnect(), 700)
    },
  }
}

export function stopShanty(): void {
  shanty?.stop()
  shanty = null
}

/** Short pentatonic chime for rewards: brighter run for bigger hauls. */
export function chime(kind: 'treasure' | 'island'): void {
  const ac = context()
  const notes = kind === 'island' ? [523.25, 659.25, 783.99] : [659.25, 880]
  notes.forEach((freq, i) => {
    const osc = ac.createOscillator()
    osc.type = 'triangle'
    osc.frequency.value = freq
    const gain = ac.createGain()
    const t0 = ac.currentTime + i * 0.11
    gain.gain.setValueAtTime(0, t0)
    gain.gain.linearRampToValueAtTime(0.12, t0 + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5)
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.start(t0)
    osc.stop(t0 + 0.55)
  })
}
