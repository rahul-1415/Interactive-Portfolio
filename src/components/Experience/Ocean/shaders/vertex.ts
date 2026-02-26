export default `
uniform float uTime;
uniform float uWaveAmp;
uniform float uWaveFreq;
uniform float uWaveSpeed;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying float vElevation;
varying float vChoppiness;

const float PI = 3.141592653589793;

vec3 gerstnerDisplacement(vec2 positionXZ, float time)
{
    vec2 dirA = normalize(vec2(1.0, 0.3));
    vec2 dirB = normalize(vec2(0.2, 1.0));
    vec2 dirC = normalize(vec2(-0.8, 0.6));
    vec2 dirD = normalize(vec2(-0.35, -1.0));

    float wavelengthA = 115.0 / max(uWaveFreq, 0.01);
    float wavelengthB = 68.0 / max(uWaveFreq, 0.01);
    float wavelengthC = 34.0 / max(uWaveFreq, 0.01);
    float wavelengthD = 16.0 / max(uWaveFreq, 0.01);

    float ampA = uWaveAmp * 1.35;
    float ampB = uWaveAmp * 0.75;
    float ampC = uWaveAmp * 0.4;
    float ampD = uWaveAmp * 0.2;

    float steepA = 0.42;
    float steepB = 0.36;
    float steepC = 0.28;
    float steepD = 0.22;

    float kA = 2.0 * PI / wavelengthA;
    float kB = 2.0 * PI / wavelengthB;
    float kC = 2.0 * PI / wavelengthC;
    float kD = 2.0 * PI / wavelengthD;

    float speedA = sqrt(9.8 / kA) * (0.5 * uWaveSpeed);
    float speedB = sqrt(9.8 / kB) * (0.7 * uWaveSpeed);
    float speedC = sqrt(9.8 / kC) * (0.95 * uWaveSpeed);
    float speedD = sqrt(9.8 / kD) * (1.25 * uWaveSpeed);

    float phaseA = kA * dot(dirA, positionXZ) - speedA * time;
    float phaseB = kB * dot(dirB, positionXZ) - speedB * time;
    float phaseC = kC * dot(dirC, positionXZ) - speedC * time;
    float phaseD = kD * dot(dirD, positionXZ) - speedD * time;

    vec3 displacement = vec3(0.0);

    displacement.x += dirA.x * (steepA * ampA) * cos(phaseA);
    displacement.z += dirA.y * (steepA * ampA) * cos(phaseA);
    displacement.y += ampA * sin(phaseA);

    displacement.x += dirB.x * (steepB * ampB) * cos(phaseB);
    displacement.z += dirB.y * (steepB * ampB) * cos(phaseB);
    displacement.y += ampB * sin(phaseB);

    displacement.x += dirC.x * (steepC * ampC) * cos(phaseC);
    displacement.z += dirC.y * (steepC * ampC) * cos(phaseC);
    displacement.y += ampC * sin(phaseC);

    displacement.x += dirD.x * (steepD * ampD) * cos(phaseD);
    displacement.z += dirD.y * (steepD * ampD) * cos(phaseD);
    displacement.y += ampD * sin(phaseD);

    float micro = sin((positionXZ.x + positionXZ.y) * (0.09 * uWaveFreq) + time * (1.6 * uWaveSpeed)) * (0.08 * uWaveAmp);
    displacement.y += micro;

    return displacement;
}

void main()
{
    vec3 baseWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 displacement = gerstnerDisplacement(baseWorld.xz, uTime);
    vec3 worldPosition = baseWorld + displacement;

    float eps = 0.35;
    vec3 pxBase = baseWorld + vec3(eps, 0.0, 0.0);
    vec3 pzBase = baseWorld + vec3(0.0, 0.0, eps);

    vec3 px = pxBase + gerstnerDisplacement(pxBase.xz, uTime);
    vec3 pz = pzBase + gerstnerDisplacement(pzBase.xz, uTime);

    vec3 normal = normalize(cross(pz - worldPosition, px - worldPosition));

    gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition, 1.0);

    vUv = uv;
    vWorldPosition = worldPosition;
    vWorldNormal = normal;
    vElevation = displacement.y;
    vChoppiness = 1.0 - clamp(normal.y, 0.0, 1.0);
}
`
