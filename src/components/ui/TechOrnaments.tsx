'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';

export default function TechOrnaments() {
  const heroReticle = useRef<THREE.Group>(null!);
  const skillsHex = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // Fade in Hero Reticle near top, fade out when scrolling down
    const heroTargetOpacity = progress < 0.2 ? 0.7 : 0;
    // Fade in Skills Hexagon around middle section
    const skillsTargetOpacity = progress >= 0.2 && progress < 0.5 ? 0.6 : 0;

    // Apply smooth opacities to materials
    if (heroReticle.current) {
      heroReticle.current.rotation.z = time * 0.15;
      heroReticle.current.children.forEach((child: any) => {
        if (child.material) easing.damp(child.material, 'opacity', heroTargetOpacity, 0.2, delta);
      });
    }

    if (skillsHex.current) {
      skillsHex.current.rotation.z = -time * 0.2;
      skillsHex.current.children.forEach((child: any) => {
        if (child.material) easing.damp(child.material, 'opacity', skillsTargetOpacity, 0.2, delta);
      });
    }
  });

  return (
    <group>
      {/* Hero Crosshair Brackets */}
      <group ref={heroReticle} position={[2.5, 0, 0]}>
        <mesh position={[-1.5, 1.5, 0]}>
          <ringGeometry args={[0.15, 0.18, 4, 1, 0.785, 1.57]} />
          <meshBasicMaterial color="#f8f546" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[1.5, -1.5, 0]}>
          <ringGeometry args={[0.15, 0.18, 4, 1, 3.92, 1.57]} />
          <meshBasicMaterial color="#f8f546" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Skills Hexagon Ring */}
      <group ref={skillsHex} position={[-2.2, 0.2, 0.5]}>
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 0.02, 6]} />
          <meshBasicMaterial color="#f8f546" wireframe transparent opacity={0} />
        </mesh>
      </group>
    </group>
  );
}