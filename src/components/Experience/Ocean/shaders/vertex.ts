export default `
uniform float uTime;
uniform float uWaveAmp;
uniform float uWaveFreq;
uniform float uWaveSpeed;

varying vec2 vUv;
varying float vElevation;
varying float vViewDistance;
varying vec2 vWorldXZ;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float baseSwell = sin(modelPosition.x * (0.0042 * uWaveFreq) + uTime * (0.32 * uWaveSpeed)) * (1.42 * uWaveAmp);
    float secondaryChop = cos(modelPosition.z * (0.0118 * uWaveFreq) - uTime * (0.64 * uWaveSpeed)) * (0.76 * uWaveAmp);
    float microJitter = sin((modelPosition.x + modelPosition.z) * (0.043 * uWaveFreq) + uTime * (1.2 * uWaveSpeed)) * (0.18 * uWaveAmp);

    vElevation = baseSwell + secondaryChop + microJitter;
    modelPosition.y += vElevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
    vViewDistance = length(viewPosition.xyz);
    vWorldXZ = modelPosition.xz;
}
`
