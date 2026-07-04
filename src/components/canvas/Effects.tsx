'use client'

import { Bloom, EffectComposer, SMAA, Vignette } from '@react-three/postprocessing'

/**
 * The composer owns the scene's render/output pipeline, so it must be mounted on
 * every device — rendering without it leaves the scene mis-toned and dark. On
 * mobile we keep the composer (identical color path) but skip the costly Bloom
 * and SMAA passes.
 *
 * Children must be real Effect elements only — a fragment/false child corrupts
 * the merged effect pass, so we build the list explicitly.
 */
export function Effects({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    return (
      <EffectComposer multisampling={0}>
        <Vignette eskil={false} offset={0.22} darkness={0.5} />
      </EffectComposer>
    )
  }
  return (
    <EffectComposer multisampling={4}>
      <Bloom luminanceThreshold={1.1} mipmapBlur intensity={0.55} />
      <Vignette eskil={false} offset={0.22} darkness={0.5} />
      <SMAA />
    </EffectComposer>
  )
}
