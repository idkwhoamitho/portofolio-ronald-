'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { easing } from 'maath';
import * as THREE from 'three';

// Target states per scroll depth (0 to 1)
const CONFIGS = {
  hero: { pos: [2.5, 0, 0] as const, distort: 0.35, speed: 2, color: new THREE.Color('#657136') },
  skills: { pos: [-2.2, 0.2, 0.5] as const, distort: 0.65, speed: 3.5, color: new THREE.Color('#f8f546') },
  projects: { pos: [0, -0.8, -1] as const, distort: 0.2, speed: 1.2, color: new THREE.Color('#a0aaa9') },
  contact: { pos: [0, 0, 1] as const, distort: 0.8, speed: 4, color: new THREE.Color('#f8f546') },
};

export default function InteractiveGlobe() {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<any>(null!);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Calculate raw scroll progress (0.0 to 1.0) directly from DOM
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // 2. Select target configuration based on scroll position
    let target = CONFIGS.hero;
    if (progress > 0.75) {
      target = CONFIGS.contact;
    } else if (progress > 0.45) {
      target = CONFIGS.projects;
    } else if (progress > 0.15) {
      target = CONFIGS.skills;
    }

    // 3. Smooth Damp Position (0.25s smooth factor)
    easing.damp3(groupRef.current.position, target.pos, 0.3, delta);

    // 4. Smooth Damp Material Properties (Distortion & Speed)
    if (materialRef.current) {
      easing.damp(materialRef.current, 'distort', target.distort, 0.4, delta);
      easing.damp(materialRef.current, 'speed', target.speed, 0.4, delta);
      easing.dampC(materialRef.current.color, target.color, 0.4, delta);
    }

    // 5. Continuous Rotations + Subtle Parallax
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1 + pointer.y * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.2}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#657136"
          attach="material"
          distort={0.35}
          speed={2}
          wireframe={true}
          roughness={0.1}
          opacity={0.8}
          transparent
        />
      </Sphere>
    </group>
  );
}