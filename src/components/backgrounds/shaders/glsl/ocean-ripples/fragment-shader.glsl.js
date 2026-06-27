const fragmentShader = `
    #define MAX_RIPPLES 32

    uniform float u_time;
    uniform vec3 u_waterColor;
    uniform vec3 u_highlightColor;
    uniform float u_aspect;
    uniform vec4 u_ripples[MAX_RIPPLES]; // xy = origin (uv), z = startTime, w = strength

    varying vec2 vUv;

    const float RIPPLE_LIFESPAN = 10.0;
    const float RIPPLE_SPEED = 0.15;   // how fast the ring expands, in uv units/sec
    const float RIPPLE_WIDTH = 0.0015;  // base ring thickness

    float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
    }

    float valueNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    void main() {
        vec2 uv = vUv;
        vec2 aspectUv = vec2(uv.x * u_aspect, uv.y);

        // Slow-moving surface texture so the water doesn't look static even with no ripples
        float surfaceNoise = valueNoise(aspectUv * 5.0 + vec2(u_time * 0.015, u_time * 0.01));
        vec3 water = mix(u_waterColor, u_waterColor * 1.25, surfaceNoise);

        float totalRing = 0.0;

        for (int i = 0; i < MAX_RIPPLES; i++) {
            vec4 ripple = u_ripples[i];
            float age = u_time - ripple.z;
            if (age < 0.0 || age > RIPPLE_LIFESPAN) continue;

            vec2 origin = vec2(ripple.x * u_aspect, ripple.y);
            float dist = length(aspectUv - origin);

            float ringRadius = age * RIPPLE_SPEED;
            float ringWidth = RIPPLE_WIDTH + age * 0.01; // widens slightly as it travels outward
            float ringDist = abs(dist - ringRadius);

            // Fades out over the ripple's lifetime, scaled by its strength
            float envelope = (1.0 - age / RIPPLE_LIFESPAN) * ripple.w;
            float ring = (1.0 - smoothstep(0.0, ringWidth, ringDist)) * envelope;

            totalRing += ring;
        }

        totalRing = clamp(totalRing, 0.0, 1.0);
        vec3 color = mix(water, u_highlightColor, totalRing);

        gl_FragColor = vec4(color, 1.0);
    }
`;

export default fragmentShader;