"use client";

import { Canvas, type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./glsl/diamond-grid/diamond-grid-material";

const POSITION_DAMP = 8;
const INFLUENCE_IN_SPEED = 6;
const INFLUENCE_OUT_SPEED = 3;

type DiamondGridProps = {
    bgColor?: string;
    shapeColor?: string;
    gridDensity?: number;
};

function Plane({ bgColor, shapeColor, gridDensity }: DiamondGridProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    const targetUv = useRef(new THREE.Vector2(0.5, 0.5));
    const isHovering = useRef(false);

    useEffect(() => {
        const material = materialRef.current;
        if (!material) return;
        if (bgColor) (material.uniforms.u_bgColor.value as THREE.Color).set(bgColor);
        if (shapeColor) (material.uniforms.u_shapeColor.value as THREE.Color).set(shapeColor);
        if (gridDensity) material.uniforms.u_gridDensity.value = gridDensity;
    }, [bgColor, shapeColor, gridDensity]);

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

        const influence = material.uniforms.u_mouseInfluence;
        const target = isHovering.current ? 1 : 0;
        const speed = isHovering.current ? INFLUENCE_IN_SPEED : INFLUENCE_OUT_SPEED;
        influence.value = THREE.MathUtils.damp(influence.value, target, speed, delta);
    });

    return (
        <mesh
            scale={[viewport.width, viewport.height, 1]}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <planeGeometry />
            <diamondGridMaterial ref={materialRef} />
        </mesh>
    );
}

export default function DiamondGridBackground(props: DiamondGridProps) {
    return (
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <Canvas>
                <Plane {...props} />
            </Canvas>
        </div>
    );
}
