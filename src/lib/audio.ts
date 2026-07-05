/**
 * Procedural ship's audio — no audio assets, everything synthesized with the
 * Web Audio API. An ocean bed (looped brown noise through a low-pass filter,
 * swelling with a slow LFO) plus tiny reward chimes. The context is created
 * lazily on the first user gesture (the sound toggle).
 */

let ctx: AudioContext | null = null
let ocean: { gain: GainNode; stop: () => void } | null = null

function context(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/**
 * Create/resume the context synchronously inside a user gesture (autoplay
 * policy) — call from the sound toggle's event handler.
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

  const filter = ac.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 420
  filter.Q.value = 0.4

  const gain = ac.createGain()
  gain.gain.value = 0.0
  // Fade in gently
  gain.gain.linearRampToValueAtTime(0.14, ac.currentTime + 1.5)

  // Slow swell so the sea breathes
  const lfo = ac.createOscillator()
  lfo.frequency.value = 0.09
  const lfoDepth = ac.createGain()
  lfoDepth.gain.value = 0.05
  lfo.connect(lfoDepth)
  lfoDepth.connect(gain.gain)

  src.connect(filter)
  filter.connect(gain)
  gain.connect(ac.destination)
  src.start()
  lfo.start()

  ocean = {
    gain,
    stop: () => {
      gain.gain.linearRampToValueAtTime(0, ac.currentTime + 0.4)
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
