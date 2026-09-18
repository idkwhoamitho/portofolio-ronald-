'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import HUDLine from '@/src/components/ui/HUDLine';
import GlassCard from '@/src/components/ui/GlassCard';

interface TechTag {
  name: string;
  detail?: string;
  highlight?: boolean;
}

interface SkillCategory {
  title: string;
  subCode: string;
  badgeText: string;
  badgeVariant?: 'yellow' | 'olive' | 'default';
  description: string;
  tags: TechTag[];
}

const SKILL_MODULES: SkillCategory[] = [
  {
    title: 'Game Development & Interactive AI',
    subCode: 'MODULE_01 // SIMULATION & AGENTS',
    badgeText: 'Primary Core',
    badgeVariant: 'yellow',
    description:
      'Designing autonomous NPC behaviors via finite state machines & behavior trees in Unity, paired with custom skeletal/keyframe animation setups.',
    tags: [
      { name: 'Unity Engine', highlight: true },
      { name: 'C# Architecture', highlight: true },
      { name: 'NPC AI Logic', detail: 'FSM / NavMesh / Utility AI' },
      { name: 'Keyframe & Rig Animation' },
      { name: 'Physics Simulation' },
    ],
  },
  {
    title: 'Intelligent Systems & Quant Trading',
    subCode: 'MODULE_02 // ML & FINANCIAL ARCHITECTURE',
    badgeText: 'High Mastery',
    badgeVariant: 'yellow',
    description:
      'Building predictive ML pipelines and quantitative trading engines for market data analysis and intelligent system modeling.',
    tags: [
      { name: 'Python', highlight: true },
      { name: 'PyTorch', detail: 'Neural Networks' },
      { name: 'NumPy & Pandas', detail: 'Data Pipelines' },
      { name: 'scikit-learn', detail: 'ML Modeling' },
      { name: 'Algorithmic Trading' },
    ],
  },
  {
    title: 'Low-Level Engine & Graphics',
    subCode: 'MODULE_03 // BARE-METAL & GRAPHICS',
    badgeText: 'Systems Level',
    badgeVariant: 'default',
    description:
      'Engineered memory-safe systems and lightweight graphics engines targeting native rendering pipelines and real-time interactive loops.',
    tags: [
      { name: 'C / C++', highlight: true },
      { name: 'SFML', detail: '2D Game Framework' },
      { name: 'OpenGL (Core)', detail: 'Shader Pipelines' },
      { name: 'Memory Management' },
      { name: 'Linux Subsystems' },
    ],
  },
  {
    title: 'Infrastructure & Web Systems',
    subCode: 'MODULE_04 // PERSISTENCE & FULL-STACK',
    badgeText: 'Operational',
    badgeVariant: 'olive',
    description:
      'Scalable database storage and robust type-safe web interfaces built for high-throughput network applications.',
    tags: [
      { name: 'PostgreSQL', highlight: true },
      { name: 'TypeScript', highlight: true },
      { name: 'Web Dev Ecosystem' },
      { name: 'Relational Schema Design' },
    ],
  },
  {
    title: 'Formal Verification & Proofs',
    subCode: 'MODULE_05 // THEORETICAL RESEARCH',
    badgeText: 'Active Learning',
    badgeVariant: 'olive',
    description:
      'Exploring formal theorem proving, mathematical logic, and structural proofs inside computational interactive theorem provers.',
    tags: [
      { name: 'Lean 4', highlight: true, detail: 'Theorem Prover' },
      { name: 'Formal Verification' },
      { name: 'Mathematical Logic' },
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '8rem 2rem',
        maxWidth: '1280px',
        margin: '0 auto',
        scrollMarginTop: '80px',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Header HUD */}
        <motion.div variants={itemVariants} style={{ marginBottom: '0.6rem' }}>
          <HUDLine text="OPERATOR CAPABILITIES // TECHNICAL LOADOUT" />
        </motion.div>
        
        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-outfit), sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#ffffff',
            marginBottom: '3rem',
            letterSpacing: '-0.01em',
          }}
        >
          System <span style={{ color: '#f8f546' }}>Capabilities</span>
        </motion.h2>

        {/* Tactical Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {SKILL_MODULES.map((module) => (
            <motion.div key={module.title} variants={itemVariants}>
              <GlassCard badgeText={module.badgeText} badgeVariant={module.badgeVariant}>
                <div style={{ padding: '0.5rem 0' }}>
                  {/* Category Header */}
                  <div
                    style={{
                      fontFamily: 'var(--font-space-mono), monospace',
                      fontSize: '0.62rem',
                      color: '#657136',
                      letterSpacing: '0.1em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {module.subCode}
                  </div>
                  
                  <h3
                    style={{
                      fontFamily: 'var(--font-outfit), sans-serif',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {module.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'sans-serif',
                      fontSize: '0.8rem',
                      color: '#a0aaa9',
                      lineHeight: '1.4',
                      marginBottom: '1rem',
                    }}
                  >
                    {module.description}
                  </p>

                  {/* Tech Tags Container */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {module.tags.map((tag) => (
                      <span
                        key={tag.name}
                        style={{
                          fontFamily: 'var(--font-space-mono), monospace',
                          fontSize: '0.68rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          border: tag.highlight
                            ? '1px solid rgba(248, 245, 70, 0.4)'
                            : '1px solid rgba(160, 170, 169, 0.2)',
                          backgroundColor: tag.highlight
                            ? 'rgba(248, 245, 70, 0.08)'
                            : 'rgba(20, 24, 26, 0.6)',
                          color: tag.highlight ? '#f8f546' : '#d0d8d7',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        {tag.name}
                        {tag.detail && (
                          <span style={{ color: '#7e807c', fontSize: '0.58rem' }}>
                            [{tag.detail}]
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}