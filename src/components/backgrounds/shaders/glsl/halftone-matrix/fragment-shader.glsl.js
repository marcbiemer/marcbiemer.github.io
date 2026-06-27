const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_bgColor;
    uniform vec3 u_highlightColor;
    uniform float u_aspect;
    uniform float u_gridDensity; // dots per unit — higher = smaller/more dots
    varying vec2 vUv;

    float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
    }

    float valueNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f); // smoothstep interpolation

        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));

        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
            value += amplitude * valueNoise(p);
            p *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
        vec2 uv = vUv;
        uv.x *= u_aspect;

        vec2 grid = uv * u_gridDensity;
        vec2 cellId = floor(grid);
        vec2 cellUv = fract(grid) - 0.5; // centered -0.5 to 0.5 within each cell

        // Slowly drifting noise field — the time offset is what makes dots
        // grow/shrink and the pattern reorganize gradually rather than being static
        float brightness = fbm(cellId * 0.2 + vec2(u_time * 0.5, u_time * 0.2));
        brightness = pow(brightness, 1.4); // push contrast so dark areas stay darker

        float dotRadius = brightness * 0.48; // max radius stays inside the cell
        float dist = length(cellUv);

        float dot = 1.0 - smoothstep(dotRadius - 0.06, dotRadius, dist);
        float glow = (1.0 - smoothstep(dotRadius, dotRadius + 0.35, dist)) * brightness * 0.4;

        vec3 color = mix(u_bgColor, u_highlightColor, dot);
        color += u_highlightColor * glow;

        gl_FragColor = vec4(color, 1.0);
    }
`;

export default fragmentShader