"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type * as THREE from "three";
import "./glsl/flow-wave/flow-wave-material";

type FlowWaveProps = {
    bgColor?: string;
    highlightColor?: string;
    speed?: number;
    scale?: number;
};

function Plane({ bgColor, highlightColor, speed, scale }: FlowWaveProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    useEffect(() => {
        const material = materialRef.current;
        if (!material) return;
        if (bgColor) (material.uniforms.u_bgColor.value as THREE.Color).set(bgColor);
        if (highlightColor)
            (material.uniforms.u_highlightColor.value as THREE.Color).set(highlightColor);
        if (speed !== undefined) material.uniforms.u_speed.value = speed;
        if (scale !== undefined) material.uniforms.u_scale.value = scale;
    }, [bgColor, highlightColor, speed, scale]);

    const time = useRef(0);

    useFrame((_, delta) => {
        time.current += delta;
        const material = materialRef.current;
        if (!material) return;
        material.uniforms.u_time.value = time.current;
        material.uniforms.u_aspect.value = viewport.width / viewport.height;
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry />
            <flowWaveMaterial ref={materialRef} />
        </mesh>
    );
}

export default function FlowWaveBackground({
    bgColor,
    highlightColor,
    speed,
    scale,
}: FlowWaveProps) {
    return (
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <Canvas>
                <Plane
                    bgColor={bgColor}
                    highlightColor={highlightColor}
                    speed={speed}
                    scale={scale}
                />
            </Canvas>
        </div>
    );
}
