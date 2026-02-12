import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { DirectionalLight, Vector3 } from 'three'
import { experienceStyleConfig } from '../Experience/styleConfig'

export const Lights = () => {
  const sunlight = useRef<DirectionalLight>(null!)
  const targetPosition = useRef(new Vector3())
  const lightPosition = useRef(new Vector3())

  useFrame((state) => {
    if (!sunlight.current) return

    lightPosition.current.set(
      state.camera.position.x + 85,
      165,
      state.camera.position.z + 70
    )

    targetPosition.current.set(
      state.camera.position.x,
      0,
      state.camera.position.z - 25
    )

    sunlight.current.position.lerp(lightPosition.current, 0.1)
    sunlight.current.target.position.lerp(targetPosition.current, 0.14)
    sunlight.current.target.updateMatrixWorld()
  })

  return (
    <>
      <hemisphereLight
        intensity={0.42}
        color={experienceStyleConfig.palette.landHigh}
        groundColor='#214266'
      />

      <ambientLight intensity={0.16} color='#e8f0ff' />

      <directionalLight
        ref={sunlight}
        castShadow
        position={[30, 165, 20]}
        intensity={1.16}
        color='#ffddb0'
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={520}
        shadow-camera-top={160}
        shadow-camera-right={160}
        shadow-camera-bottom={-160}
        shadow-camera-left={-160}
      />
    </>
  )
}
