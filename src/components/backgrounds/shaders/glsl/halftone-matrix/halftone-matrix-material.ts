import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./vertex-shader.glsl";
import fragmentShader from "./fragment-shader.glsl";

export const HalftoneMatrixMaterial = shaderMaterial(
	{
		u_time: 0,
		u_bgColor: new THREE.Color("#0a0620"),
		u_highlightColor: new THREE.Color("#3a1fe0"),
		u_aspect: 1,
		u_gridDensity: 24,
	},
	vertexShader,
	fragmentShader
);

extend({ HalftoneMatrixMaterial });

declare module "@react-three/fiber" {
	interface ThreeElements {
		halftoneMatrixMaterial: import("@react-three/fiber").ThreeElement<typeof HalftoneMatrixMaterial>;
	}
}