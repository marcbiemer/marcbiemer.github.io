import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./vertex-shader.glsl";
import fragmentShader from "./fragment-shader.glsl";

export const RippleDistortionMaterial = shaderMaterial(
	{
		u_texture: null as THREE.Texture | null,
		u_mouse: new THREE.Vector2(0.5, 0.5),
		u_time: 0,
		u_rippleStrength: 0,
		u_aspect: 1,
	},
	vertexShader,
	fragmentShader
);

extend({ RippleDistortionMaterial });

declare module "@react-three/fiber" {
	interface ThreeElements {
		rippleDistortionMaterial: import("@react-three/fiber").ThreeElement<typeof RippleDistortionMaterial>;
	}
}