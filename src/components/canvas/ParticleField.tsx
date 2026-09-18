'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 600;

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const scrollOffset = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollOffset.current = window.scrollY / (totalScroll || 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const yellowColor = new THREE.Color('#f8f546');
    const oliveColor = new THREE.Color('#657136');
    const slateColor = new THREE.Color('#a0aaa9');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 22;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Vertical drift velocity for tech upward streaming
      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = Math.random() * 0.008 + 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.003;

      // Color distribution: Yellow, Olive, Slate HUD themes
      const rand = Math.random();
      const chosenColor = rand > 0.85 ? yellowColor : rand > 0.5 ? oliveColor : slateColor;
      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;
    }
    return { positions, velocities, colors };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;

    const scrollSpeedBoost = scrollOffset.current * 0.015;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1] + scrollSpeedBoost; // Stream faster on scroll
      pos[i3 + 2] += velocities[i3 + 2];

      // Vertical loop reset
      if (pos[i3 + 1] > 7) pos[i3 + 1] = -7;
      if (pos[i3] > 11) pos[i3] = -11;
      if (pos[i3] < -11) pos[i3] = 11;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}