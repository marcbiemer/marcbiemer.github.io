"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./glsl/halftone-matrix/halftone-matrix-material";

type HalftoneMatrixProps = {
  bgColor?: string;
  highlightColor?: string;
  gridDensity?: number;
};

function Plane({ bgColor, highlightColor, gridDensity }: HalftoneMatrixProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    if (bgColor)
      (material.uniforms.u_bgColor.value as THREE.Color).set(bgColor);
    if (highlightColor)
      (material.uniforms.u_highlightColor.value as THREE.Color).set(
        highlightColor,
      );
    if (gridDensity) material.uniforms.u_gridDensity.value = gridDensity;
  }, [bgColor, highlightColor, gridDensity]);

  useFrame(({ clock }) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.u_time.value = clock.elapsedTime;
    material.uniforms.u_aspect.value = viewport.width / viewport.height;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <halftoneMatrixMaterial ref={materialRef} />
    </mesh>
  );
}

export default function HalftoneMatrix({
  bgColor,
  highlightColor,
  gridDensity,
}: HalftoneMatrixProps) {
  return (
    <div
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <Canvas>
        <Plane
          bgColor={bgColor}
          highlightColor={highlightColor}
          gridDensity={gridDensity}
        />
      </Canvas>
    </div>
  );
}
