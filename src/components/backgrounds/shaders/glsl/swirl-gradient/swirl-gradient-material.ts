import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./vertex-shader.glsl";
import fragmentShader from "./fragment-shader.glsl";

export const SwirlGradientMaterial = shaderMaterial(
	{
		u_time: 0,
		u_darkColor: new THREE.Color("#03060d"),
		u_midColor: new THREE.Color("#0d4fa8"),
		u_highlightColor: new THREE.Color("#bfe0ff"),
		u_mouse: new THREE.Vector2(0.5, 0.5),
		u_swirlAmount: 0,
		u_aspect: 1,
	},
	vertexShader,
	fragmentShader
);

extend({ SwirlGradientMaterial });

declare module "@react-three/fiber" {
	interface ThreeElements {
		swirlGradientMaterial: import("@react-three/fiber").ThreeElement<typeof SwirlGradientMaterial>;
	}
}