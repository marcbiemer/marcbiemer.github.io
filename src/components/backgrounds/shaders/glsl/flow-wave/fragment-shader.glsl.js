const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_bgColor;
    uniform vec3 u_highlightColor;
    uniform float u_aspect;
    uniform float u_speed;     // how fast bands drift right -> left
    uniform float u_scale;     // overall noise scale — lower = bigger, wider bands
    varying vec2 vUv;

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

    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        mat2 rot = mat2(0.8, -0.6, 0.6, 0.8); // rotate each octave so bands don't look grid-aligned
        for (int i = 0; i < 5; i++) {
            value += amplitude * valueNoise(p);
            p = rot * p * 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
        vec2 uv = vUv;
        uv.x *= u_aspect;

        // Stretch X so features elongate into horizontal bands, then scroll them
        // leftward over time by subtracting from x (negative = moves right -> left)
        vec2 flowUv = vec2(uv.x * 0.35, uv.y * 1.4) * u_scale;
        flowUv.x -= u_time * u_speed;

        // Domain warping: use one fbm field to distort the coordinates fed into a second,
        // which is what gives the smooth, organic "flowing liquid" look rather than static noise
        vec2 warp = vec2(
            fbm(flowUv + vec2(0.0, 1.7)),
            fbm(flowUv + vec2(5.2, 1.3))
        );

        float n = fbm(flowUv + warp * 1.2);

        // Push contrast so bands read as distinct streaks, not an even blur
        float bands = smoothstep(0.25, 0.85, n);

        vec3 color = mix(u_bgColor, u_highlightColor, bands);

        // Subtle vertical vignette, similar to the reference image's top/bottom darkening
        float vignette = 1.0 - pow(abs(vUv.y - 0.5) * 2.0, 2.0) * 0.35;
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
    }
`;

export default fragmentShader;
