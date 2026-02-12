import { Float, Text, useGLTF } from '@react-three/drei'
import { Object3DProps, useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import { BufferGeometry, DoubleSide, Material, Mesh, MeshBasicMaterial } from 'three'
import { IslandMeta } from '../../islandRegistry'

type GenericIslandProps = {
  objectUrl: string
  islandNumber: number
  title?: string
  position?: Object3DProps['position']
  island: IslandMeta
  rotationY?: number
  onClickObject: () => void
  objectScale?: number
  colliders?: 'hull' | 'trimesh' | false
  onHoverIsland?: (island: IslandMeta) => void
  onBlurIsland?: () => void
}

type Geometry = {
  geometry: BufferGeometry
  material: Material
}

export const GenericIsland = ({
  objectUrl,
  islandNumber = 1,
  island,
  title,
  position,
  rotationY = 0,
  onClickObject,
  objectScale = 2,
  colliders = 'hull',
  onHoverIsland,
  onBlurIsland
}: GenericIslandProps) => {
  const [isHovering, setIsHovering] = useState(false)
  const resolvedObjectScale = objectScale * 1.22

  const object = useGLTF(objectUrl)
  const { nodes } = useGLTF(`/assets/islands/island-${islandNumber}.glb`)
  const beaconRef = useRef<Mesh>(null)
  const beaconMaterialRef = useRef<MeshBasicMaterial>(null)

  useEffect(() => {
    document.body.style.cursor = isHovering ? 'pointer' : 'auto'
  }, [isHovering])

  useFrame((state) => {
    if (!beaconRef.current || !beaconMaterialRef.current) return

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.4 + island.position[0] * 0.05) * 0.08

    beaconRef.current.scale.setScalar(pulse)
    beaconMaterialRef.current.opacity = isHovering ? 0.75 : 0.28
  })

  const handlePointerEnter = () => {
    setIsHovering(true)
    onHoverIsland?.(island)
  }

  const handlePointerLeave = () => {
    setIsHovering(false)
    onBlurIsland?.()
  }

  return (
    <RigidBody
      type='fixed'
      colliders={colliders === false ? 'cuboid' : colliders}
      position={position || island.position}
      restitution={0.15}
    >
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.9}>
        <Text
          font='/fonts/bangers-regular.woff'
          position-y={12.8}
          fontSize={3.6}
          color={island.accent}
          anchorX='center'
          maxWidth={35}
          textAlign='center'
        >
          {title || island.title}
        </Text>
      </Float>

      <mesh
        ref={beaconRef}
        rotation-x={-Math.PI * 0.5}
        position={[0, 0.2, 0]}
        receiveShadow
      >
        <ringGeometry args={[8.2, 9.4, 64]} />
        <meshBasicMaterial
          ref={beaconMaterialRef}
          color={island.accent}
          transparent
          opacity={0.28}
          side={DoubleSide}
        />
      </mesh>

      <group scale={1.4}>
        {nodes.island.children.map(mesh => (
          <mesh
            key={mesh.id}
            position={[10, 0, 0]}
            geometry={(mesh as unknown as Geometry).geometry}
            material={(mesh as unknown as Geometry).material}
            castShadow
            receiveShadow
          />
        ))}
      </group>

      <group position={[0, 1.2, 0]}>
        <primitive
          rotation-y={rotationY}
          scale={resolvedObjectScale}
          object={object.scene}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={onClickObject}
        />
      </group>

      {isHovering && (
        <Float speed={4.5} floatingRange={[0, 0.75]}>
          <mesh
            scale={[10.5, 10.5, 2]}
            position={[0, 2.2, 1]}
            rotation-x={Math.PI / 2}
            receiveShadow
          >
            <torusGeometry args={[1.2, 0.07, 24, 48]} />
            <meshStandardMaterial
              color={island.accent}
              emissive={island.accent}
              emissiveIntensity={0.8}
            />
          </mesh>
        </Float>
      )}
    </RigidBody>
  )
}
