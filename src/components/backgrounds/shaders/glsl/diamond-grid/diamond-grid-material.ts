import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import fragmentShader from "./fragment-shader.glsl";
import vertexShader from "./vertex-shader.glsl";

export const DiamondGridMaterial = shaderMaterial(
    {
        u_time: 0,
        u_bgColor: new THREE.Color("#3f2df5"),
        u_shapeColor: new THREE.Color("#ffffff"),
        u_mouse: new THREE.Vector2(0.5, 0.5),
        u_mouseInfluence: 0,
        u_aspect: 1,
        u_gridDensity: 26,
    },
    vertexShader,
    fragmentShader,
);

extend({ DiamondGridMaterial });

declare module "@react-three/fiber" {
    interface ThreeElements {
        diamondGridMaterial: import("@react-three/fiber").ThreeElement<typeof DiamondGridMaterial>;
    }
}
