"use client";

import { Canvas, type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./glsl/interactive-gradient/interactive-gradient-material";

const DEFAULT_POS = new THREE.Vector2(1, 1);

type InteractiveGradientProps = {
    colorA?: string;
    colorB?: string;
    bgColor?: string;
};

function Plane({ colorA, colorB, bgColor }: InteractiveGradientProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const targetPos = useRef(new THREE.Vector2().copy(DEFAULT_POS));
    const { viewport } = useThree();

    // Update colors whenever the props change, not every frame
    useEffect(() => {
        const material = materialRef.current;
        if (!material) return;
        if (colorA) (material.uniforms.u_colorA.value as THREE.Color).set(colorA);
        if (colorB) (material.uniforms.u_colorB.value as THREE.Color).set(colorB);
        if (bgColor) (material.uniforms.u_bgColor.value as THREE.Color).set(bgColor);
    }, [colorA, colorB, bgColor]);

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (e.uv) targetPos.current.set(e.uv.x, e.uv.y);
    };

    const handlePointerLeave = () => {
        targetPos.current.copy(DEFAULT_POS);
    };

    const time = useRef(0);

    useFrame((_, delta) => {
        time.current += delta;
        const material = materialRef.current;
        if (!material) return;

        material.uniforms.u_time.value = time.current;
        material.uniforms.u_aspect.value = viewport.width / viewport.height;

        const gradientPos = material.uniforms.u_gradientPos.value as THREE.Vector2;
        gradientPos.x = THREE.MathUtils.damp(gradientPos.x, targetPos.current.x, 6, delta);
        gradientPos.y = THREE.MathUtils.damp(gradientPos.y, targetPos.current.y, 6, delta);
    });

    return (
        <mesh
            scale={[viewport.width, viewport.height, 1]}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <planeGeometry />
            <interactiveGradientMaterial ref={materialRef} />
        </mesh>
    );
}

export default function InteractiveGradient({ colorA, colorB, bgColor }: InteractiveGradientProps) {
    return (
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <Canvas>
                <Plane colorA={colorA} colorB={colorB} bgColor={bgColor} />
            </Canvas>
        </div>
    );
}
