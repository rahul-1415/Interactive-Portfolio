export default `
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float waveA = sin(modelPosition.x * 0.015 + uTime * 0.62) * 0.35;
    float waveB = cos(modelPosition.z * 0.012 - uTime * 0.44) * 0.25;

    vElevation = waveA + waveB;
    modelPosition.y += vElevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}
`
