import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "./vertex-shader.glsl";
import fragmentShader from "./fragment-shader.glsl";

export const MAX_RIPPLES = 32;

export const OceanRippleMaterial = shaderMaterial(
	{
		u_time: 0,
		u_waterColor: new THREE.Color("#0a2a3a"),
		u_highlightColor: new THREE.Color("#bfe9ff"),
		u_aspect: 1,
		// Each ripple starts "dead" — startTime -1000 means `age` is always huge,
		// so the lifespan check in the shader naturally skips it. No active flag needed.
		u_ripples: Array.from({ length: MAX_RIPPLES }, () => new THREE.Vector4(0, 0, -1000, 0)),
	},
	vertexShader,
	fragmentShader
);

extend({ OceanRippleMaterial });

declare module "@react-three/fiber" {
	interface ThreeElements {
		oceanRippleMaterial: import("@react-three/fiber").ThreeElement<typeof OceanRippleMaterial>;
	}
}