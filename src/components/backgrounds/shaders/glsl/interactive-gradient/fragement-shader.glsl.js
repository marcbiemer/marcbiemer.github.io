const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_gradientPos;   // animated center of the glow, in UV space
    uniform float u_aspect;       // plane width / height, for circular (not oval) falloff
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;
    uniform vec3 u_bgColor;
    varying vec2 vUv;

    void main() {
        vec2 diff = vUv - u_gradientPos;
        diff.x *= u_aspect; // correct for non-square planes so the glow stays circular

        float dist = length(diff);
        float glow = smoothstep(0.6, 0.0, dist);

        vec3 gradientColor = mix(u_colorA, u_colorB, vUv.y);
        vec3 color = mix(u_bgColor, gradientColor, glow);

        gl_FragColor = vec4(color, 1.0);
    }
`;

export default fragmentShader