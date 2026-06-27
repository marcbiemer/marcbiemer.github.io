"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import "./glsl/wave-gradient/wave-gradient-material";

function Plane() {
  const ref = useRef<THREE.ShaderMaterial & { u_time: number }>(null);
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.u_time = clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <waveGradientMaterial ref={ref} />
    </mesh>
  );
}

export default function WaveGradient() {
  return (
    <div
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <Canvas>
        <Plane />
      </Canvas>
    </div>
  );
}
