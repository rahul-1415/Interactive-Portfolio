/**
 * Bake skinned meshes to static geometry (glTF linear-blend skinning applied
 * to POSITION/NORMAL on the CPU), then strip skins, joints, and animations.
 *
 * Why: three.js renders skinned meshes in the skeleton's world space and
 * ignores the mesh node's transform, so normalizeModel() measured the wrong
 * bounds and the Thousand Sunny rendered detached from her island anchor.
 * Static geometry makes bounds exact and drops per-frame skinning cost.
 *
 * Per the glTF spec, a skinned vertex's world position is
 *   Σ wᵢ · jointWorldᵢ · inverseBindMatrixᵢ · p
 * (the mesh node's own global transform is ignored), so baked vertices are in
 * asset-root space and the baked mesh is re-attached at the scene root with an
 * identity transform. This preserves the exact rendered look.
 *
 * Usage: node scripts/bake-skins.mjs <in.glb> <out.glb> [--strip]
 *   --strip  remove skinned meshes instead of baking them — for models whose
 *            skinned parts are stray/minor and live in a different space than
 *            the static hull (e.g. moby-dick.glb, where baking skews the
 *            combined bounds).
 * Re-compress afterwards: npx gltf-transform meshopt <out.glb> <out.glb>
 */
import { NodeIO, Node } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import { prune, dequantize } from '@gltf-transform/functions'
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer'

const [input, output, flag] = process.argv.slice(2)
const strip = flag === '--strip'
if (!input || !output) {
  console.error('usage: node scripts/bake-skins.mjs <in.glb> <out.glb> [--strip]')
  process.exit(1)
}

// --- minimal mat4/vec3 helpers (column-major, like glTF/three) ---
const mul = (a, b) => {
  const out = new Array(16)
  for (let c = 0; c < 4; c++)
    for (let r = 0; r < 4; r++) {
      let s = 0
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]
      out[c * 4 + r] = s
    }
  return out
}
const xformPoint = (m, v) => [
  m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12],
  m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13],
  m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14],
]
const xformDir = (m, v) => [
  m[0] * v[0] + m[4] * v[1] + m[8] * v[2],
  m[1] * v[0] + m[5] * v[1] + m[9] * v[2],
  m[2] * v[0] + m[6] * v[1] + m[10] * v[2],
]

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder })

const doc = await io.read(input)
// Work in plain float space; meshopt re-quantizes on the way back out.
await doc.transform(dequantize())

const root = doc.getRoot()
const scene = root.getDefaultScene() ?? root.listScenes()[0]
const skinnedNodes = root.listNodes().filter((n) => n.getSkin() && n.getMesh())

for (const node of skinnedNodes) {
  if (strip) {
    node.getMesh().dispose()
    node.setSkin(null)
    continue
  }
  const skin = node.getSkin()
  const joints = skin.listJoints()
  const ibm = skin.getInverseBindMatrices()
  const jointMats = joints.map((joint, j) => mul(joint.getWorldMatrix(), ibm.getElement(j, [])))

  for (const prim of node.getMesh().listPrimitives()) {
    const pos = prim.getAttribute('POSITION')
    const nrm = prim.getAttribute('NORMAL')
    const jnt = prim.getAttribute('JOINTS_0')
    const wgt = prim.getAttribute('WEIGHTS_0')
    if (!pos || !jnt || !wgt) continue

    const p = [],
      n = [],
      j4 = [],
      w4 = []
    for (let i = 0; i < pos.getCount(); i++) {
      pos.getElement(i, p)
      jnt.getElement(i, j4)
      wgt.getElement(i, w4)
      let x = 0,
        y = 0,
        z = 0,
        nx = 0,
        ny = 0,
        nz = 0
      for (let k = 0; k < 4; k++) {
        const w = w4[k]
        if (!w) continue
        const m = jointMats[j4[k]]
        const tp = xformPoint(m, p)
        x += tp[0] * w
        y += tp[1] * w
        z += tp[2] * w
        if (nrm) {
          nrm.getElement(i, n)
          const tn = xformDir(m, n)
          nx += tn[0] * w
          ny += tn[1] * w
          nz += tn[2] * w
        }
      }
      pos.setElement(i, [x, y, z])
      if (nrm) {
        const len = Math.hypot(nx, ny, nz) || 1
        nrm.setElement(i, [nx / len, ny / len, nz / len])
      }
    }
    prim.setAttribute('JOINTS_0', null)
    prim.setAttribute('WEIGHTS_0', null)
  }

  // Re-attach the baked mesh at the scene root with an identity transform —
  // baked vertices are already in asset-root space.
  const baked = new Node(doc.getGraph())
  baked.setName(node.getName() + '_baked')
  baked.setMesh(node.getMesh())
  scene.addChild(baked)
  node.setMesh(null)
  node.setSkin(null)
}

for (const skin of root.listSkins()) skin.dispose()
for (const anim of root.listAnimations()) anim.dispose()
await doc.transform(prune({ keepLeaves: false }))

await io.write(output, doc)
console.log(strip ? 'stripped' : 'baked', skinnedNodes.length, 'skinned nodes →', output)
