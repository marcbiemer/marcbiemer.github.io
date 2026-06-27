const fragmentShader = `
  uniform float u_time;
  varying vec2 vUv;

  void main() {
    vec3 c1 = vec3(0.03529, 0.03529, 0.47451);
    vec3 c2 = vec3(0.29411764705882354, 0.4235294117647059, 0.7176470588235294);
    vec3 c3  = vec3(0.09411764705882353, 0.1568627450980392, 0.2823529411764706);

    float t = sin(vUv.x * 3.14159 + u_time * 0.5) * 0.5 + 0.5;
    float s = cos(vUv.y * 3.14159 + u_time * 0.3) * 0.5 + 0.5;

    vec3 color = mix(c1, c3, t);
    color = mix(color, c2, s * 0.5);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default fragmentShader;