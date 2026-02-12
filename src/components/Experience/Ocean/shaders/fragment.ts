export default `
uniform float uTime;
uniform float uWaveAmp;
uniform float uFoamStrength;
uniform float uHighlightStrength;
uniform vec3 uColorStart;
uniform vec3 uColorMid;
uniform vec3 uColorEnd;

varying vec2 vUv;
varying float vElevation;
varying float vViewDistance;
varying vec2 vWorldXZ;

void main()
{
    float rippleA = sin((vUv.x * 30.0) + uTime * 0.34) * 0.5 + 0.5;
    float rippleB = cos((vUv.y * 23.0) - uTime * 0.4) * 0.5 + 0.5;
    float rippleMask = rippleA * rippleB;

    float slope = clamp(length(vec2(dFdx(vElevation), dFdy(vElevation))) * 4.3, 0.0, 1.0);
    float crest = smoothstep(0.24 * uWaveAmp, 1.62 * uWaveAmp, vElevation + slope * 0.35);

    float foamSoft = smoothstep(0.56, 1.0, crest) * (0.35 + rippleMask * 0.33);
    float foamBright = smoothstep(0.78, 1.0, crest + rippleMask * 0.16);
    float foam = (foamSoft * 0.78 + foamBright * 0.62) * uFoamStrength;

    float depthGradient = smoothstep(65.0, 380.0, vViewDistance);
    float horizonMix = smoothstep(0.0, 1.0, vUv.y);

    vec3 colorNear = mix(uColorStart, uColorMid, horizonMix);
    vec3 baseColor = mix(colorNear, uColorEnd, depthGradient);

    float streakAxis = abs(dot(normalize(vWorldXZ + vec2(0.001)), normalize(vec2(0.78, -0.44))));
    float streak = pow(1.0 - clamp(streakAxis, 0.0, 1.0), 5.8);
    float highlight = streak * (0.3 + rippleMask * 0.7) * uHighlightStrength;

    vec3 color = baseColor;
    color += vec3(foam * 0.6, foam * 0.68, foam * 0.74);
    color += vec3(1.0, 0.86, 0.62) * highlight;

    gl_FragColor = vec4(color, 1.0);
}
`
