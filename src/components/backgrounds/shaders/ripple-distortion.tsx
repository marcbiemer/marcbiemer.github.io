"use client";

import { useTexture } from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import "./glsl/ripple-distortion/ripple-distortion-material";

const VELOCITY_TO_STRENGTH = 8; // tune how much motion amplifies the ripple
const MAX_STRENGTH = 2.5; // clamp so very fast flicks don't blow out the effect
const STRENGTH_DECAY = 0.9; // per-frame decay; lower = fades faster
const POSITION_DAMP = 10; // how quickly u_mouse eases toward the real cursor uv

function Plane({ imageUrl }: { imageUrl: string }) {
    const texture = useTexture(imageUrl);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport } = useThree();

    const targetUv = useRef(new THREE.Vector2(0.5, 0.5));
    const lastUv = useRef(new THREE.Vector2(0.5, 0.5));
    const lastMoveTime = useRef<number | null>(null);
    const velocityStrength = useRef(0);

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!e.uv) return;

        const now = performance.now();
        targetUv.current.copy(e.uv);

        if (lastMoveTime.current !== null) {
            const dt = Math.max((now - lastMoveTime.current) / 1000, 0.001);
            const dist = e.uv.distanceTo(lastUv.current);
            const velocity = dist / dt;

            const impulse = Math.min(velocity * VELOCITY_TO_STRENGTH, MAX_STRENGTH);
            // Take the stronger of "new burst" vs "still-decaying strength" so fast flicks
            // don't get immediately overwritten by a smaller subsequent delta
            velocityStrength.current = Math.max(velocityStrength.current, impulse);
        }

        lastUv.current.copy(e.uv);
        lastMoveTime.current = now;
    };

    const handlePointerLeave = () => {
        lastMoveTime.current = null;
        // let it decay naturally rather than snapping to 0, for a smoother exit
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

        // Exponential decay every frame — this is what makes the ripple stop
        // automatically once the cursor stops moving (or leaves), no idle-check needed
        velocityStrength.current *= STRENGTH_DECAY;
        material.uniforms.u_rippleStrength.value = velocityStrength.current;
    });

    return (
        <mesh
            scale={[viewport.width, viewport.height, 1]}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <planeGeometry />
            <rippleDistortionMaterial ref={materialRef} u_texture={texture} />
        </mesh>
    );
}

export default function RippleDistortion({ imageUrl }: { imageUrl: string }) {
    return (
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <Canvas>
                <Plane imageUrl={imageUrl} />
            </Canvas>
        </div>
    );
}
