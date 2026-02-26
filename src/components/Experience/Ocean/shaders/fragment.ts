export default `
uniform float uTime;
uniform float uFoamStrength;
uniform float uHighlightStrength;
uniform vec3 uColorStart;
uniform vec3 uColorMid;
uniform vec3 uColorEnd;
uniform vec3 uSunDirection;
uniform vec3 uSunColor;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying float vElevation;
varying float vChoppiness;

float hash(vec2 p)
{
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
}

float noise(vec2 p)
{
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

float fbm(vec2 p)
{
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 4; i++)
    {
        value += noise(p * frequency) * amplitude;
        frequency *= 2.02;
        amplitude *= 0.5;
    }

    return value;
}

void main()
{
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPosition);
    vec3 L = normalize(uSunDirection);

    float cameraDistance = length(cameraPosition.xz - vWorldPosition.xz);
    float depthFactor = smoothstep(55.0, 850.0, cameraDistance);

    vec3 shallowColor = mix(uColorStart, uColorMid, 0.35);
    vec3 deepColor = mix(uColorMid, uColorEnd, 0.72);
    vec3 color = mix(shallowColor, deepColor, depthFactor);

    float diffuse = clamp(dot(N, L), 0.0, 1.0);

    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.4);
    color += fresnel * vec3(0.18, 0.25, 0.34);

    vec2 rippleUv = vWorldPosition.xz * 0.032;
    float ripple = fbm(rippleUv + vec2(uTime * 0.08, -uTime * 0.05));
    float rippleFine = fbm(rippleUv * 2.8 + vec2(-uTime * 0.11, uTime * 0.14));

    float crest = smoothstep(0.35, 1.45, vElevation + vChoppiness * 1.1);
    float foamMask = clamp((crest * 0.72 + vChoppiness * 0.42) * (0.45 + ripple * 0.85), 0.0, 1.0);
    float foam = foamMask * uFoamStrength;
    vec3 foamColor = mix(vec3(0.76, 0.84, 0.9), vec3(0.97, 0.99, 1.0), rippleFine);
    color = mix(color, foamColor, foam * 0.67);

    vec3 H = normalize(L + V);
    float glint = pow(max(dot(N, H), 0.0), 90.0) * (0.45 + rippleFine * 0.8);
    float sunReflect = pow(max(dot(reflect(-L, N), V), 0.0), 180.0) * (0.35 + ripple * 0.7);
    float highlight = (glint * 0.58 + sunReflect * 0.9) * uHighlightStrength;

    color *= 0.67 + diffuse * 0.33;
    color += uSunColor * highlight;

    gl_FragColor = vec4(color, 1.0);
}
`
