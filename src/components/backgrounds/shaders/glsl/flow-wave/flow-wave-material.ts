import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import fragmentShader from "./fragment-shader.glsl";
import vertexShader from "./vertex-shader.glsl";

export const FlowWaveMaterial = shaderMaterial(
    {
        u_time: 0,
        u_bgColor: new THREE.Color("#0a0620"),
        u_highlightColor: new THREE.Color("#3a1fe0"),
        u_aspect: 1,
        u_speed: 0.05,
        u_scale: 1.4,
    },
    vertexShader,
    fragmentShader,
);

extend({ FlowWaveMaterial });

declare module "@react-three/fiber" {
    interface ThreeElements {
        flowWaveMaterial: import("@react-three/fiber").ThreeElement<typeof FlowWaveMaterial>;
    }
}
