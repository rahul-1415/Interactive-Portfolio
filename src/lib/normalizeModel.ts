import * as THREE from 'three'

/**
 * Clone a loaded GLTF scene, recenter it horizontally with its keel at y=0, and
 * scale it so its longest horizontal axis equals `targetSize`. Returns a group
 * whose local origin sits at the waterline center — ready to position/rotate.
 *
 * Shared by the ship, island bases, and landmark models so the normalization
 * lives in one place.
 */
export function normalizeModel(
  source: THREE.Object3D,
  targetSize: number,
  { axis = 'max' }: { axis?: 'x' | 'z' | 'max' } = {}
): THREE.Group {
  const clone = source.clone(true)
  const box = new THREE.Box3().setFromObject(clone)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  const denom = axis === 'x' ? size.x : axis === 'z' ? size.z : Math.max(size.x, size.z)

  const group = new THREE.Group()
  group.add(clone)
  clone.position.set(-center.x, -box.min.y, -center.z)
  group.scale.setScalar(targetSize / denom)
  return group
}
