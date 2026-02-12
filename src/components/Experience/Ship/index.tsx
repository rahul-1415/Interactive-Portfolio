import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { Quaternion, Vector3 } from 'three'
import { useMoveShip } from './hooks/useMoveShip'

type ShipProps = {
  isModalOpen: boolean
  onPositionChange?: (position: [number, number, number]) => void
}

export const Ship = ({ isModalOpen, onPositionChange }: ShipProps) => {
  const { body, move } = useMoveShip()

  const shipModel = useGLTF('/assets/ship.gltf')

  const shipPosition = useRef(new Vector3())
  const cameraOffset = useRef(new Vector3())
  const cameraTargetPosition = useRef(new Vector3())
  const cameraLookAt = useRef(new Vector3())
  const shipQuaternion = useRef(new Quaternion())
  const forwardVector = useRef(new Vector3())

  useFrame((state, delta) => {
    if (!body.current) return

    move(delta, !isModalOpen)

    if (isModalOpen) return

    const translation = body.current.translation()
    const rotation = body.current.rotation()

    shipPosition.current.set(translation.x, translation.y, translation.z)
    shipQuaternion.current.set(rotation.x, rotation.y, rotation.z, rotation.w)

    forwardVector.current
      .set(0, 0, -1)
      .applyQuaternion(shipQuaternion.current)
      .normalize()

    cameraOffset.current
      .copy(forwardVector.current)
      .multiplyScalar(-95)
      .setY(44)

    cameraTargetPosition.current
      .copy(shipPosition.current)
      .add(cameraOffset.current)

    cameraLookAt.current
      .copy(shipPosition.current)
      .addScaledVector(forwardVector.current, 26)
      .setY(shipPosition.current.y + 8)

    state.camera.position.lerp(
      cameraTargetPosition.current,
      1 - Math.exp(-delta * 4.8)
    )

    state.camera.lookAt(cameraLookAt.current)

    onPositionChange?.([translation.x, translation.y, translation.z])
  })

  return (
    <RigidBody
      ref={body}
      position={[0, 1.5, 40]}
      restitution={0.15}
      friction={0.2}
      linearDamping={0.62}
      angularDamping={0.78}
      mass={100}
    >
      <group>
        <primitive
          object={shipModel.scene}
          castShadow
          receiveShadow
        />
      </group>
    </RigidBody>
  )
}
