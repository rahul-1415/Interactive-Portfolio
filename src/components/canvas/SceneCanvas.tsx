'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => <div className="scene-loading">Setting sail…</div>,
})

export function SceneCanvas() {
  return <Scene />
}
