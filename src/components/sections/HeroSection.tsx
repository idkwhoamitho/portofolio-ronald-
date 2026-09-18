'use client';

import { motion, type Variants } from 'framer-motion';
import HUDLine from '@/src/components/ui/HUDLine';
import DynamicButton from '@/src/components/ui/DynamicButton';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 2rem',
        paddingTop: '64px', // navbar offset
      }}
    >
      {/* Grid coordinate decoration */}
      <div
        style={{
          position: 'absolute',
          top: '5rem',
          right: '2rem',
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.1em',
          color: 'rgba(160, 170, 169, 0.35)',
          textAlign: 'right',
          lineHeight: 1.8,
        }}
      >
        <div>LAT: 06°12′S</div>
        <div>LON: 106°49′E</div>
        <div>UNIT: MAXR-01</div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '760px' }}
      >
        {/* HUD telemetry */}
        <motion.div variants={itemVariants}>
          <HUDLine
            text="SYS.LOC // BINUS_UNIVERSITY — INTELLIGENT_SYSTEMS"
            pulsing
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          style={{
            marginTop: '1.5rem',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#ffffff',
            lineHeight: 1.05,
          }}
        >
          MAXIMILIANUS{' '}
          <span style={{ color: '#f8f546' }}>RONALD</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          style={{
            marginTop: '1.25rem',
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            fontFamily: 'var(--font-outfit), sans-serif',
            fontWeight: 300,
            color: '#a0aaa9',
            maxWidth: '540px',
            lineHeight: 1.7,
          }}
        >
          Specialist in Intelligent Systems, Robotics, Game Development, and
          High-Frequency Quantitative Trading Systems.
        </motion.p>

        {/* Spec line */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {['Robotics', 'Game Dev', 'Quant Trading', 'Embedded Systems'].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-space-mono), monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#657136',
                borderBottom: '1px solid #657136',
                paddingBottom: '1px',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <DynamicButton
            id="hero-cta-projects"
            variant="primary"
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            View Projects →
          </DynamicButton>

          {/* Download CV Link Button */}
          <a
            href="/MaximilianusRonald_CV.pdf"
            download="MaximilianusRonald_CV.pdf"
            style={{ textDecoration: 'none' }}
          >
            <DynamicButton
              id="hero-cta-cv"
              variant="secondary"
            >
              Download CV [PDF] ⬇
            </DynamicButton>
          </a>

          <DynamicButton
            id="hero-cta-contact"
            variant="ghost"
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Open Channel
          </DynamicButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(160, 170, 169, 0.4)',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, #a0aaa9, transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}