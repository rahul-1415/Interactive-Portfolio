'use client'

import { Bloom, EffectComposer, SMAA, Vignette } from '@react-three/postprocessing'

/** Lean, motivated post stack per DESIGN.md: emissive-only bloom, subtle vignette, SMAA. */
export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.55} />
      <Vignette eskil={false} offset={0.22} darkness={0.5} />
      <SMAA />
    </EffectComposer>
  )
}
