'use client';

import { useEffect, useState, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import TechTag from './TechTag';
import DynamicButton from './DynamicButton';

export interface ProjectDetail {
  id: string;
  name: string;
  type: 'SOLO' | 'GROUP';
  techStack: string[];
  visualFocus: string;
  repoUrl: string;
  fullDescription: string;
  systemCode: string;
}

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // 1. All standard React hooks must come first
  const [mounted, setMounted] = useState(false);

  // 2. Framer Motion values & transforms must run unconditionally in the exact same order
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
    stiffness: 300,
    damping: 25,
  });

  const spotX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const spotY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  // Mask string transform defined at top-level
  const maskImage = useTransform(
    [spotX, spotY],
    ([sx, sy]) => `radial-gradient(380px circle at ${sx} ${sy}, black 20%, transparent 80%)`
  );

  // 3. Effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  // Handlers
  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  // Early return ONLY after all hooks have executed
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden perspective-[1200px]">
          {/* Dark Blurred Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040607]/85 backdrop-blur-md cursor-pointer"
          />

          {/* Hologram Bottom Light Projector Emitter Beam */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.8 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-[3px] bg-[#f8f546] shadow-[0_0_35px_12px_rgba(248,245,70,0.5)] z-0 pointer-events-none rounded-full"
          />

          {/* Holographic 3D Dossier Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 35, y: 60 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotateX: -20, y: 40 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative z-10 w-full max-w-5xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#0d1012]/90 border border-[#f8f546]/30 p-8 sm:p-10 md:p-12 text-left shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(248,245,70,0.12)] flex flex-col gap-7 backdrop-blur-xl group"
          >
            {/* Dynamic Holographic Grid & Spotlight Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity duration-500 rounded-2xl z-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(248, 245, 70, 0.12) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(248, 245, 70, 0.12) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
                WebkitMaskImage: maskImage,
                maskImage: maskImage,
              }}
            />

            {/* Holographic Scanline Laser Effect */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] opacity-70 pointer-events-none z-20"
              style={{
                background: 'linear-gradient(90deg, transparent, #f8f546, transparent)',
                boxShadow: '0 0 15px #f8f546, 0 0 30px #f8f546',
              }}
              animate={{
                top: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Techwear Frame Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#f8f546] pointer-events-none rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#f8f546] pointer-events-none rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#f8f546] pointer-events-none rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f8f546] pointer-events-none rounded-br-2xl" />

            {/* Header Status Bar */}
            <div
              style={{ transform: 'translateZ(25px)' }}
              className="flex items-center justify-between pb-5 border-b border-[#a0aaa9]/20 font-mono text-xs text-[#a0aaa9] tracking-widest uppercase relative z-10"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f8f546] animate-pulse shadow-[0_0_10px_#f8f546]" />
                <span className="text-[#f8f546] font-bold tracking-wider">
                  HOLOGRAM_DOSSIER
                </span>
                <span className="text-[#a0aaa9]/30">//</span>
                <span>{project.systemCode}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="hover:bg-[#f8f546] hover:text-[#121618] hover:shadow-[0_0_15px_rgba(248,245,70,0.6)] text-[#f8f546] transition-all font-bold cursor-pointer flex items-center gap-1.5 bg-[#171c1e] px-3.5 py-1.5 rounded-md border border-[#f8f546]/40 text-xs"
              >
                CLOSE [✕]
              </button>
            </div>

            {/* Title & Classification Tag */}
            <div
              style={{ transform: 'translateZ(30px)' }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-sans leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                {project.name}
              </h2>
              <div className="shrink-0 self-start sm:self-auto">
                <TechTag
                  label={project.type}
                  variant={project.type === 'SOLO' ? 'yellow' : 'slate'}
                />
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div
              style={{ transform: 'translateZ(20px)' }}
              className="flex flex-wrap gap-2 relative z-10"
            >
              {project.techStack.map((tech) => (
                <TechTag key={tech} label={tech} variant="olive" />
              ))}
            </div>

            {/* System Overview Box */}
            <div
              style={{ transform: 'translateZ(22px)' }}
              className="flex flex-col gap-2.5 relative z-10"
            >
              <span className="font-mono text-xs text-[#657136] font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-[#657136] rounded-full" />
                // SYSTEM_OVERVIEW & OBJECTIVES
              </span>
              <div className="bg-[#07090a]/80 p-6 sm:p-7 rounded-xl border border-[#a0aaa9]/20 text-white/90 font-sans text-sm sm:text-base leading-relaxed tracking-wide shadow-inner">
                {project.fullDescription}
              </div>
            </div>

            {/* Visual Focus Spotlight Strip */}
            <div
              style={{ transform: 'translateZ(25px)' }}
              className="p-5 rounded-xl bg-[#14181a] border-l-4 border-[#f8f546] flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm text-[#a0aaa9] shadow-md relative z-10"
            >
              <span className="text-[#f8f546] font-bold shrink-0 tracking-wider">
                VISUAL_FOCUS //
              </span>
              <span className="text-white italic tracking-wide">{project.visualFocus}</span>
            </div>

            {/* Action Buttons Footer */}
            <div
              style={{ transform: 'translateZ(28px)' }}
              className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#a0aaa9]/20 relative z-10"
            >
              <DynamicButton
                href={project.repoUrl}
                variant="primary"
                external
                id={`${project.id}-modal-repo`}
              >
                ACCESS SOURCE REPOSITORY ↗
              </DynamicButton>

              <button
                type="button"
                onClick={onClose}
                className="font-mono text-xs text-[#a0aaa9] hover:text-[#f8f546] uppercase tracking-widest transition-colors py-2 px-3 cursor-pointer"
              >
                RETURN TO MATRIX
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}