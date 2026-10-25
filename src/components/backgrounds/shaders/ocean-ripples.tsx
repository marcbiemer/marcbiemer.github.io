"use client";

import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./glsl/ocean-ripples/ocean-ripples-material";
import { MAX_RIPPLES } from "./glsl/ocean-ripples/ocean-ripples-material";

const RAINDROP_STRENGTH = 0.35;
const RAINDROP_MIN_INTERVAL = 0.25;
const RAINDROP_MAX_INTERVAL = 0.9;
const CLICK_STRENGTH = 1.0;

type OceanRippleProps = {
  waterColor?: string;
  highlightColor?: string;
  rainEnabled?: boolean;
};

function Plane({
  waterColor,
  highlightColor,
  rainEnabled = true,
}: OceanRippleProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const rippleIndex = useRef(0);
  const currentTime = useRef(0);
  const nextRaindropAt = useRef(0);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;
    if (waterColor)
      (material.uniforms.u_waterColor.value as THREE.Color).set(waterColor);
    if (highlightColor)
      (material.uniforms.u_highlightColor.value as THREE.Color).set(
        highlightColor,
      );
  }, [waterColor, highlightColor]);

  function spawnRipple(x: number, y: number, strength: number) {
    const material = materialRef.current;
    if (!material) return;

    const ripples = material.uniforms.u_ripples.value as THREE.Vector4[];
    const slot = ripples[rippleIndex.current];
    slot.set(x, y, currentTime.current, strength);

    rippleIndex.current = (rippleIndex.current + 1) % MAX_RIPPLES;
  }

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (!e.uv) return;
    spawnRipple(e.uv.x, e.uv.y, CLICK_STRENGTH);
  };

  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.u_time.value = time.current;
    material.uniforms.u_aspect.value = viewport.width / viewport.height;

    if (rainEnabled && time.current >= nextRaindropAt.current) {
      spawnRipple(Math.random(), Math.random(), RAINDROP_STRENGTH);
      const interval =
        RAINDROP_MIN_INTERVAL +
        Math.random() * (RAINDROP_MAX_INTERVAL - RAINDROP_MIN_INTERVAL);
      nextRaindropAt.current = time.current + interval;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]} onClick={handleClick}>
      <planeGeometry />
      <oceanRippleMaterial ref={materialRef} />
    </mesh>
  );
}

export default function OceanRipples({
  waterColor,
  highlightColor,
  rainEnabled,
}: OceanRippleProps) {
  return (
    <div
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <Canvas>
        <Plane
          waterColor={waterColor}
          highlightColor={highlightColor}
          rainEnabled={rainEnabled}
        />
      </Canvas>
    </div>
  );
}
