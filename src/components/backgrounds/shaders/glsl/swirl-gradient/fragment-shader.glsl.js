const fragmentShader = `
    uniform float u_time;
    uniform vec3 u_darkColor;
    uniform vec3 u_midColor;
    uniform vec3 u_highlightColor;
    uniform vec2 u_mouse;
    uniform float u_swirlAmount; // 0 -> 1, eases in/out on enter/leave
    uniform float u_aspect;

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
        float amplitude = 0.55;
        for (int i = 0; i < 3; i++) {
            value += amplitude * valueNoise(p);
            p *= 2.05;
            amplitude *= 0.5;
        }
        return value;
    }

    // Soft, large-scale color field — deliberately low frequency so it reads
    // as a blurred gradient rather than visible noise texture
    vec3 getBaseColor(vec2 uv) {
        // Faster, more visible drift through the noise field
        vec2 p = uv * 1.3 + vec2(u_time * 0.15, u_time * 0.2);
        float n = fbm(p);

        // Slowly rotating diagonal bias — this is what makes the bright region
        // itself drift/rotate over time, not just the noise texture underneath it
        float angle = u_time * 0.04;
        vec2 dir = vec2(cos(angle) * 0.75 - sin(angle) * 0.65, sin(angle) * 0.75 + cos(angle) * 0.65);
        float diagonal = dot(uv - 0.5, dir) + 0.5;

        float field = mix(diagonal, n, 0.55);

        vec3 color = mix(u_darkColor, u_midColor, smoothstep(0.15, 0.55, field));
        color = mix(color, u_highlightColor, smoothstep(0.62, 0.95, field));

        return color;
    }

    void main() {
        vec2 uv = vUv;
        vec2 aspectUv = vec2(uv.x * u_aspect, uv.y);
        vec2 mouseUv = vec2(u_mouse.x * u_aspect, u_mouse.y);

        vec2 toCenter = aspectUv - mouseUv;
        float dist = length(toCenter);

        // Swirl strength falls off with distance from the cursor, and is scaled
        // by u_swirlAmount so it eases in/out smoothly on enter/leave
        float radius = 0.45;
        float falloff = exp(-(dist * dist) / (radius * radius));
        float angle = falloff * 2.4 * u_swirlAmount;

        float s = sin(angle);
        float c = cos(angle);
        vec2 rotated = vec2(
            c * toCenter.x - s * toCenter.y,
            s * toCenter.x + c * toCenter.y
        );

        vec2 swirledAspectUv = mouseUv + rotated;
        vec2 swirledUv = vec2(swirledAspectUv.x / u_aspect, swirledAspectUv.y);

        vec3 color = getBaseColor(swirledUv);

        gl_FragColor = vec4(color, 1.0);
    }
`;

export default fragmentShader;
