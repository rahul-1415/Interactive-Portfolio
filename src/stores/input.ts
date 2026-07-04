import { create } from 'zustand'

interface TouchInputState {
  /** -1..1 steer (left/right), set by the on-screen wheel. */
  steer: number
  /** 0..1 throttle, set by the on-screen throttle. */
  throttle: number
  set: (partial: Partial<Pick<TouchInputState, 'steer' | 'throttle'>>) => void
}

/** On-screen (touch) helm state, read by the Ship each frame. */
export const useTouchInput = create<TouchInputState>((set) => ({
  steer: 0,
  throttle: 0,
  set: (partial) => set(partial),
}))
