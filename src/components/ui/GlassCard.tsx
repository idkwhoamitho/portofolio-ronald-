'use client';

import { ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  badgeText?: string;
  badgeVariant?: 'olive' | 'yellow';
  id?: string;
}

export default function GlassCard({
  children,
  className = '',
  badgeText,
  badgeVariant = 'olive',
  id,
}: GlassCardProps) {
  // Mouse position normalized (0 to 1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Physics springs for 3D pitch/roll tilt
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), {
    stiffness: 350,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), {
    stiffness: 350,
    damping: 25,
  });

  // Dynamic tactical spotlight and grid position
  const spotX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const spotY = useTransform(mouseY, [0, 1], ['0%', '100%']);

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

  return (
    <div style={{ perspective: '1200px' }}>
      <motion.div
        id={id}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(20, 24, 26, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(160, 170, 169, 0.18)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.65), inset 0 0 15px rgba(248, 245, 70, 0.03)',
          padding: '1.5rem',
        }}
        whileHover={{ scale: 1.02, borderColor: 'rgba(248, 245, 70, 0.4)' }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`relative overflow-hidden rounded-lg group ${className}`}
      >
        {/* 1. Tactical Laser Scanline */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(90deg, transparent, #f8f546, transparent)',
            boxShadow: '0 0 12px #f8f546, 0 0 20px #f8f546',
          }}
          animate={{
            top: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* 2. Cybernetic Grid Overlay with Cursor Spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(160, 170, 169, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(160, 170, 169, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '16px 16px',
            WebkitMaskImage: useTransform(
              [spotX, spotY],
              ([sx, sy]) =>
                `radial-gradient(280px circle at ${sx} ${sy}, black 20%, transparent 80%)`
            ),
            maskImage: useTransform(
              [spotX, spotY],
              ([sx, sy]) =>
                `radial-gradient(280px circle at ${sx} ${sy}, black 20%, transparent 80%)`
            ),
          }}
        />

        {/* 3. Techwear Frame Decals / Corner Brackets */}
        <span
          className="absolute top-0 left-0 w-3 h-3 z-10 transition-all duration-200 group-hover:w-5 group-hover:h-5"
          style={{
            borderTop: '2px solid #f8f546',
            borderLeft: '2px solid #f8f546',
          }}
        />
        <span
          className="absolute top-0 right-0 w-3 h-3 z-10 transition-all duration-200 group-hover:w-5 group-hover:h-5"
          style={{
            borderTop: '2px solid #f8f546',
            borderRight: '2px solid #f8f546',
          }}
        />
        <span
          className="absolute bottom-0 left-0 w-3 h-3 z-10 transition-all duration-200 group-hover:w-5 group-hover:h-5"
          style={{
            borderBottom: '2px solid #f8f546',
            borderLeft: '2px solid #f8f546',
          }}
        />
        <span
          className="absolute bottom-0 right-0 w-3 h-3 z-10 transition-all duration-200 group-hover:w-5 group-hover:h-5"
          style={{
            borderBottom: '2px solid #f8f546',
            borderRight: '2px solid #f8f546',
          }}
        />

        {/* 4. Telemetry Coordinates Markings */}
        <div
          className="absolute top-1 right-3 font-mono text-[8px] tracking-widest text-[#a0aaa9]/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none select-none z-10"
          style={{ transform: 'translateZ(10px)' }}
        >
          SYS.CARD // 0x8F
        </div>

        {/* 5. HUD Badge (Pushed forward in 3D space) */}
        {badgeText && (
          <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '2px 8px',
                marginBottom: '0.75rem',
                fontSize: '0.62rem',
                fontFamily: 'var(--font-space-mono), monospace',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: badgeVariant === 'olive' ? '#657136' : '#f8f546',
                color: badgeVariant === 'olive' ? '#f8f546' : '#14181a',
                borderRadius: '2px',
                boxShadow: badgeVariant === 'yellow' ? '0 0 10px rgba(248, 245, 70, 0.4)' : 'none',
              }}
            >
              {badgeText}
            </span>
          </div>
        )}

        {/* 6. Card Inner Content (Pushed forward in 3D space) */}
        <div style={{ transform: 'translateZ(18px)', transformStyle: 'preserve-3d' }} className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}