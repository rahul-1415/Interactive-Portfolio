import { useKeyboardControls } from '@react-three/drei'
import { RigidBodyApi } from '@react-three/rapier'
import { useRef } from 'react'
import { Quaternion, Vector3 } from 'three'

export const useMoveShip = () => {
  const body = useRef<RigidBodyApi>(null!)
  const [, getKeys] = useKeyboardControls()
  const shipRotation = useRef(new Quaternion())
  const forwardVector = useRef(new Vector3())
  const rightVector = useRef(new Vector3())
  const impulseVector = useRef(new Vector3())

  const move = (delta: number, controlsEnabled: boolean) => {
    if (!body.current) return

    const { forward, backward, leftward, rightward, boost } = getKeys()

    if (!controlsEnabled) {
      body.current.setLinvel(
        {
          x: 0,
          y: 0,
          z: 0
        },
        true
      )
      body.current.setAngvel({ x: 0, y: 0, z: 0 }, true)

      return
    }

    const rotation = body.current.rotation()
    shipRotation.current.set(rotation.x, rotation.y, rotation.z, rotation.w)

    forwardVector.current
      .set(0, 0, -1)
      .applyQuaternion(shipRotation.current)
      .normalize()

    rightVector.current
      .set(1, 0, 0)
      .applyQuaternion(shipRotation.current)
      .normalize()

    const forwardInput = (forward ? 1 : 0) + (backward ? -1 : 0)
    const strafeInput = (rightward ? 1 : 0) + (leftward ? -1 : 0)

    const boostMultiplier = boost ? 2.2 : 1
    const forwardThrust = 16.2 * delta * 3600 * boostMultiplier
    const strafeThrust = 13.5 * delta * 3200
    const steeringTorque = 4.2 * delta * 2500

    impulseVector.current
      .set(0, 0, 0)
      .addScaledVector(forwardVector.current, forwardInput * forwardThrust)
      .addScaledVector(rightVector.current, strafeInput * strafeThrust)

    body.current.applyImpulse(
      {
        x: impulseVector.current.x,
        y: 0,
        z: impulseVector.current.z
      },
      true
    )

    body.current.applyTorqueImpulse(
      {
        x: 0,
        y: -strafeInput * steeringTorque,
        z: 0
      },
      true
    )

    const velocity = body.current.linvel()
    const horizontalSpeed = Math.hypot(velocity.x, velocity.z)
    const maxSpeed = boost ? 195 : 122

    if (horizontalSpeed > maxSpeed) {
      const ratio = maxSpeed / horizontalSpeed

      body.current.setLinvel(
        {
          x: velocity.x * ratio,
          y: 0,
          z: velocity.z * ratio
        },
        true
      )
    }
  }

  return { body, move }
}
