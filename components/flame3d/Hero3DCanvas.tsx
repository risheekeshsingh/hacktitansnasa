"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function SpaceStationModel() {
  const stationRef = useRef<THREE.Group>(null);
  const solarWingsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (stationRef.current) {
      stationRef.current.rotation.y = time * 0.15;
      stationRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <group ref={stationRef} position={[1.4, 0.2, 0]} scale={0.75}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.12, 0.12]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 1.4, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.24, 0.8, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.42, 0.2]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#00e5ff" emissive="#0097a7" emissiveIntensity={0.5} roughness={0.1} />
      </mesh>
      <group ref={solarWingsRef}>
        <mesh position={[-1.4, 0.5, 0]}>
          <boxGeometry args={[0.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#0284c7" emissiveIntensity={0.25} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-1.4, -0.5, 0]}>
          <boxGeometry args={[0.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#0284c7" emissiveIntensity={0.25} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[1.4, 0.5, 0]}>
          <boxGeometry args={[0.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#0284c7" emissiveIntensity={0.25} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[1.4, -0.5, 0]}>
          <boxGeometry args={[0.4, 1.1, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#0284c7" emissiveIntensity={0.25} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.6, 0.3, 0.15]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.01]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0.6, 0.3, 0.15]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.01]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.3} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function SphericalMicrogravityFlame() {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const coolFlameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      const pulse = Math.sin(time * 2.0) * 0.04;
      coreRef.current.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
    }
    if (haloRef.current) {
      const haloPulse = Math.sin(time * 1.5) * 0.05;
      haloRef.current.scale.set(1.4 + haloPulse, 1.4 + haloPulse, 1.4 + haloPulse);
    }
    if (coolFlameRef.current) {
      const coolPulse = Math.sin(time * 1.0) * 0.06;
      coolFlameRef.current.scale.set(2.0 + coolPulse, 2.0 + coolPulse, 2.0 + coolPulse);
    }
  });

  return (
    <group position={[-1.3, 0, 0]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#fffbeb" emissive="#f59e0b" emissiveIntensity={2.5} roughness={0.1} />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#ea580c"
          emissive="#c2410c"
          emissiveIntensity={1.5}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={coolFlameRef}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.04, 0.08, 0.8, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4.6], fov: 48 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.45} />
      <pointLight position={[-1.3, 0, 0]} intensity={3.5} color="#fb923c" distance={7} />
      <directionalLight position={[4, 5, 3]} intensity={1.2} color="#ffffff" />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.25}>
        <SphericalMicrogravityFlame />
        <SpaceStationModel />
      </Float>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.3}
      />
    </Canvas>
  );
}
