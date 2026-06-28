"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdditiveBlending, Group, MathUtils, Points } from "three";

type PointerRef = React.MutableRefObject<{ x: number; y: number }>;

function sphereDistribution(
  count: number,
  rMin: number,
  rMax: number,
): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = rMin + Math.random() * (rMax - rMin);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

interface StarfieldProps {
  pointer: PointerRef;
  baseColor: string;
  accentColor: string;
  density: "low" | "high";
}

function Starfield({
  pointer,
  baseColor,
  accentColor,
  density,
}: StarfieldProps) {
  const farRef = React.useRef<Points>(null);
  const midRef = React.useRef<Points>(null);
  const glowRef = React.useRef<Points>(null);
  const groupRef = React.useRef<Group>(null);

  const counts =
    density === "high" ? { far: 1400, mid: 380, glow: 70 } : { far: 700, mid: 220, glow: 50 };

  const farPositions = React.useMemo(
    () => sphereDistribution(counts.far, 2.4, 6.5),
    [counts.far],
  );
  const midPositions = React.useMemo(
    () => sphereDistribution(counts.mid, 1.6, 3.4),
    [counts.mid],
  );
  const glowPositions = React.useMemo(
    () => sphereDistribution(counts.glow, 1.0, 4.5),
    [counts.glow],
  );

  useFrame((_, dt) => {
    if (farRef.current) farRef.current.rotation.y += dt * 0.018;
    if (midRef.current) {
      midRef.current.rotation.y -= dt * 0.04;
      midRef.current.rotation.x += dt * 0.012;
    }
    if (glowRef.current) glowRef.current.rotation.y += dt * 0.07;

    const g = groupRef.current;
    if (g) {
      const targetY = pointer.current.x * 0.22;
      const targetX = -pointer.current.y * 0.14;
      g.rotation.y = MathUtils.damp(g.rotation.y, targetY, 2.5, dt);
      g.rotation.x = MathUtils.damp(g.rotation.x, targetX, 2.5, dt);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Far dim field */}
      <points ref={farRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[farPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={baseColor}
          size={0.018}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
        />
      </points>

      {/* Mid bright field */}
      <points ref={midRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[midPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={baseColor}
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>

      {/* Teal glow stars */}
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[glowPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={accentColor}
          size={0.075}
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

interface HeroSceneProps {
  isMobile?: boolean;
  prefersReducedMotion?: boolean;
  baseColor?: string;
  accentColor?: string;
}

export default function HeroScene({
  isMobile = false,
  prefersReducedMotion = false,
  baseColor = "#E6FDFA",
  accentColor = "#5EEAD4",
}: HeroSceneProps) {
  const pointer = React.useRef({ x: 0, y: 0 });

  // Track the pointer across the whole window so the parallax responds even
  // when the canvas sits behind the hero content as a full-section background.
  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [prefersReducedMotion]);

  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
      }}
      frameloop={prefersReducedMotion ? "demand" : "always"}
      className="touch-none"
    >
      <Starfield
        pointer={pointer}
        baseColor={baseColor}
        accentColor={accentColor}
        density={isMobile ? "low" : "high"}
      />
    </Canvas>
  );
}
