"use client";

import { Canvas, type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./glsl/swirl-gradient/swirl-gradient-material";

const POSITION_DAMP = 8;
const SWIRL_IN_SPEED = 5;
const SWIRL_OUT_SPEED = 3;

type SwirlGradientProps = {
    darkColor?: string;
    midColor?: string;
    highlightColor?: string;
};

function Plane({ darkColor, midColor, highlightColor }: SwirlGradientProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    const targetUv = useRef(new THREE.Vector2(0.5, 0.5));
    const isHovering = useRef(false);

    useEffect(() => {
        const material = materialRef.current;
        if (!material) return;
        if (darkColor) (material.uniforms.u_darkColor.value as THREE.Color).set(darkColor);
        if (midColor) (material.uniforms.u_midColor.value as THREE.Color).set(midColor);
        if (highlightColor)
            (material.uniforms.u_highlightColor.value as THREE.Color).set(highlightColor);
    }, [darkColor, midColor, highlightColor]);

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!e.uv) return;
        targetUv.current.copy(e.uv);
        isHovering.current = true;
    };

    const handlePointerLeave = () => {
        isHovering.current = false;
    };

    const time = useRef(0);

    useFrame((_, delta) => {
        time.current += delta;
        const material = materialRef.current;
        if (!material) return;

        material.uniforms.u_time.value = time.current;
        material.uniforms.u_aspect.value = viewport.width / viewport.height;

        const mouseUv = material.uniforms.u_mouse.value as THREE.Vector2;
        mouseUv.x = THREE.MathUtils.damp(mouseUv.x, targetUv.current.x, POSITION_DAMP, delta);
        mouseUv.y = THREE.MathUtils.damp(mouseUv.y, targetUv.current.y, POSITION_DAMP, delta);

        const swirl = material.uniforms.u_swirlAmount;
        const target = isHovering.current ? 1 : 0;
        const speed = isHovering.current ? SWIRL_IN_SPEED : SWIRL_OUT_SPEED;
        swirl.value = THREE.MathUtils.damp(swirl.value, target, speed, delta);
    });

    return (
        <mesh
            scale={[viewport.width, viewport.height, 1]}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <planeGeometry />
            <swirlGradientMaterial ref={materialRef} />
        </mesh>
    );
}

export default function SwirlGradientBackground(props: SwirlGradientProps) {
    return (
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <Canvas>
                <Plane {...props} />
            </Canvas>
        </div>
    );
}
