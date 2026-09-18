'use client';

import HeroSection from '@/src/components/sections/HeroSection';
import SkillsSection from '@/src/components/sections/SkillsSection';
import ProjectsSection from '@/src/components/sections/ProjectsSection';
import ContactSection from '@/src/components/sections/ContactSection';
import Navbar from '@/src/components/ui/Navbar';
import CanvasBackground from '@/src/components/canvas/CanvasBackground';
import AccessGrantedOverlay from '@/src/components/AccessGrantedOverlay';

export default function Home() {
  return (
    <>
      <AccessGrantedOverlay />
      <CanvasBackground />
      <Navbar />
      <main className="relative z-10">
        <section id="hero" className="min-h-screen">
          <HeroSection />
        </section>

        <section id="skills" className="min-h-screen scroll-mt-20">
          <SkillsSection />
        </section>

        <section id="projects" className="min-h-screen">
          <ProjectsSection />
        </section>

        <section id="contact" className="min-h-screen">
          <ContactSection />
        </section>
      </main>
    </>
  );
}