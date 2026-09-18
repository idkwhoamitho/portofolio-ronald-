'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import InteractiveGlobe from './InteractiveGlobe';
import ParticleField from './ParticleField';
import TechOrnaments from '@/src/components/ui/TechOrnaments';

export type ActiveSection = 'hero' | 'skills' | 'projects' | 'contact';

export default function SceneContainer() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const height = window.innerHeight;

      if (scrollY < height * 0.8) {
        setActiveSection('hero');
      } else if (scrollY < height * 1.8) {
        setActiveSection('skills');
      } else if (scrollY < height * 2.8) {
        setActiveSection('projects');
      } else {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 45, position: [0, 0, 6] }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <Suspense fallback={null}>
        <ParticleField activeSection={activeSection} />
        <InteractiveGlobe activeSection={activeSection} />
        <TechOrnaments activeSection={activeSection} />
      </Suspense>
    </Canvas>
  );
}