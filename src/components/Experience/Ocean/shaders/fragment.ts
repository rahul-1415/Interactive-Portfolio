export default `
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;
varying float vElevation;

void main()
{
    float gradient = smoothstep(-0.4, 0.9, vElevation);

    float rippleA = sin((vUv.x + uTime * 0.04) * 42.0) * 0.5 + 0.5;
    float rippleB = cos((vUv.y - uTime * 0.05) * 30.0) * 0.5 + 0.5;

    float rippleMix = rippleA * rippleB;
    float foam = smoothstep(0.78, 1.0, rippleMix) * 0.13;

    vec3 color = mix(uColorStart, uColorEnd, vUv.y * 0.7 + gradient * 0.42);
    color += foam;

    gl_FragColor = vec4(color, 1.0);
}
`
