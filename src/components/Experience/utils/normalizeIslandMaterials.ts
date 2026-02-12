import {
  Color,
  Material,
  Mesh,
  MeshStandardMaterial,
  Object3D
} from 'three'
import {
  experienceStyleConfig,
  surfaceColorByCategory,
  SurfaceCategory
} from '../styleConfig'

type NormalizerOptions = {
  category?: SurfaceCategory
}

const normalizeColor = (color: Color): Color => {
  const hsl = { h: 0, s: 0, l: 0 }
  color.getHSL(hsl)

  hsl.s = Math.min(1, Math.max(0.2, hsl.s * experienceStyleConfig.material.saturationScale))
  hsl.l = Math.min(0.84, Math.max(0.26, hsl.l + experienceStyleConfig.material.lightnessShift))

  return new Color().setHSL(hsl.h, hsl.s, hsl.l)
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value))
}

const normalizeStandardMaterial = (
  material: MeshStandardMaterial,
  category: SurfaceCategory
): MeshStandardMaterial => {
  const normalized = material.clone()

  normalized.roughness = clamp(
    normalized.roughness,
    experienceStyleConfig.material.roughness.min,
    experienceStyleConfig.material.roughness.max
  )

  normalized.metalness = clamp(
    normalized.metalness,
    experienceStyleConfig.material.metalness.min,
    experienceStyleConfig.material.metalness.max
  )

  const baseColor = normalized.color ? normalizeColor(normalized.color.clone()) : surfaceColorByCategory[category].clone()
  const blendedColor = baseColor.lerp(surfaceColorByCategory[category], 0.2)

  normalized.color = blendedColor
  normalized.emissive = blendedColor.clone().multiplyScalar(experienceStyleConfig.material.emissiveIntensity)
  normalized.envMapIntensity = 0.42

  return normalized
}

const normalizeMaterial = (
  material: Material,
  category: SurfaceCategory
): Material => {
  if (material instanceof MeshStandardMaterial) {
    return normalizeStandardMaterial(material, category)
  }

  const fallback = new MeshStandardMaterial({
    color: surfaceColorByCategory[category],
    roughness: 0.72,
    metalness: 0.04
  })

  return normalizeStandardMaterial(fallback, category)
}

const normalizeMaterialSet = (
  material: Material | Material[],
  category: SurfaceCategory
): Material | Material[] => {
  if (Array.isArray(material)) {
    return material.map(currentMaterial => normalizeMaterial(currentMaterial, category))
  }

  return normalizeMaterial(material, category)
}

export const normalizeIslandMaterials = (
  object: Object3D,
  options: NormalizerOptions = {}
) => {
  const category = options.category || 'prop'

  object.traverse(child => {
    if (!(child instanceof Mesh)) return

    const normalizedMaterial = normalizeMaterialSet(child.material, category)
    child.material = normalizedMaterial

    child.castShadow = true
    child.receiveShadow = true
  })
}
