const fragmentShader = `
    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_rippleStrength;
    uniform float u_aspect;
    varying vec2 vUv;

    void main() {
        vec2 diff = vUv - u_mouse;
        diff.x *= u_aspect; // keep the ripple circular on non-square planes

        float dist = length(diff);

        // Concentric wave emanating from the cursor
        float wave = sin(dist * 40.0 - u_time * 12.0);

        // Fades out with distance from cursor, and scales with ripple strength
        float falloff = exp(-dist * 6.0) * u_rippleStrength;

        vec2 direction = dist > 0.0001 ? normalize(diff) : vec2(0.0);
        vec2 offset = direction * wave * falloff * 0.04;

        vec2 distortedUv = vUv + offset;
        vec3 color = texture2D(u_texture, distortedUv).rgb;

        gl_FragColor = vec4(color, 1.0);
    }
`;

export default fragmentShader;
