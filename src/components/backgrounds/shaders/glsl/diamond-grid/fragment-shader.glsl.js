const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_bgColor;
    uniform vec3 u_shapeColor;
    uniform vec2 u_mouse;
    uniform float u_mouseInfluence; // eases in/out on enter/leave
    uniform float u_aspect;
    uniform float u_gridDensity;
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
        for (int i = 0; i < 3; i++) {
            value += amplitude * valueNoise(p);
            p *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    // Diamond (rotated square) signed distance — 0 at center, grows outward
    float diamondSDF(vec2 p, float size) {
        return (abs(p.x) + abs(p.y)) - size;
    }

    void main() {
        vec2 uv = vUv;
        uv.x *= u_aspect;

        vec2 grid = uv * u_gridDensity;
        vec2 cellId = floor(grid);
        vec2 cellUv = fract(grid) - 0.5;

        // Base size field: slow drifting fbm, similar to the dot-matrix shader
        float baseSize = fbm(cellId * 0.15 + vec2(u_time * 0.03, -u_time * 0.02));
        baseSize = pow(baseSize, 1.6);

        // Cursor boost: cells near the mouse grow larger, creating a denser
        // "checkerboard" cluster right where the user is hovering
        vec2 mouseUv = vec2(u_mouse.x * u_aspect, u_mouse.y);
        vec2 cellCenterUv = (cellId + 0.5) / u_gridDensity;
        float distToMouse = length(cellCenterUv - mouseUv);
        float mouseBoost = exp(-(distToMouse * distToMouse) / 0.05) * u_mouseInfluence;

        float size = clamp(baseSize + mouseBoost * 0.6, 0.0, 0.5);

        float dist = diamondSDF(cellUv, size);
        float shape = 1.0 - smoothstep(0.0, 0.04, dist);

        vec3 color = mix(u_bgColor, u_shapeColor, shape);

        gl_FragColor = vec4(color, 1.0);
    }
`;

export default fragmentShader