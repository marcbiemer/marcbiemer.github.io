import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import fragmentShader from "./fragement-shader.glsl";
import vertexShader from "./vertex-shader.glsl";

export const InteractiveGradientMaterial = shaderMaterial(
    {
        u_time: 0,
        u_gradientPos: new THREE.Vector2(0.0, 0.0), // default: bottom-center
        u_aspect: 1,
        u_colorA: new THREE.Color("#1a0d59"),
        u_colorB: new THREE.Color("#73119f"),
        u_bgColor: new THREE.Color("#141218"),
    },
    vertexShader,
    fragmentShader,
);

extend({ InteractiveGradientMaterial });

declare module "@react-three/fiber" {
    interface ThreeElements {
        interactiveGradientMaterial: import("@react-three/fiber").ThreeElement<
            typeof InteractiveGradientMaterial
        >;
    }
}
