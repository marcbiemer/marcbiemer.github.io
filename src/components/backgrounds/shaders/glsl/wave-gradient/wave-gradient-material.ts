import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertexShader from './vertex-shader.glsl'
import fragmentShader from './fragment-shader.glsl'

export const WaveGradientMaterial = shaderMaterial(
	{ u_time: 0 },
	vertexShader,
	fragmentShader
);

extend({ WaveGradientMaterial });

declare module "@react-three/fiber" {
	interface ThreeElements {
		waveGradientMaterial: import("@react-three/fiber").ThreeElement<typeof WaveGradientMaterial>;
	}
}