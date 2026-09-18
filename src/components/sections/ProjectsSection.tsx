'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import HUDLine from '@/src/components/ui/HUDLine';
import GlassCard from '@/src/components/ui/GlassCard';
import TechTag from '@/src/components/ui/TechTag';
import DynamicButton from '@/src/components/ui/DynamicButton';
import ProjectModal, { ProjectDetail } from '@/src/components/ui/ProjectModal';

const PROJECTS: ProjectDetail[] = [
  {
    id: 'proj-browsing-intention',
    name: 'Prediction Model for Browsing Intention',
    type: 'GROUP',
    systemCode: '0x8F-ML-BEHAVIOR',
    techStack: ['Python', 'scikit-learn', 'Streamlit', 'Pandas', 'ML'],
    visualFocus: 'Heatmap analysis & predictive metrics HUD',
    repoUrl: 'https://github.com/Ws995566/Prediction-Model-for-Analyzing-Users-Behaviour',
    fullDescription:
      'Predictive machine learning pipeline designed to analyze web navigation behavior and model e-commerce user purchase intention in real time. Features interactive feature-importance heatmaps and streamable classification inference.',
  },
  {
    id: 'proj-air-writing',
    name: 'Air-Writing-Hangul',
    type: 'GROUP',
    systemCode: '0x90-CV-HANGUL',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'ML', 'PyTorch'],
    visualFocus: 'Real-time hand-tracking 3D trajectory visualization',
    repoUrl: 'https://github.com/Ws995566/Air-Writing-Hangul',
    fullDescription:
      'Real-time computer vision system using MediaPipe hand-landmark tracking and PyTorch CNN models to capture in-air gesture trajectories and recognize handwritten Hangul characters without touch interfaces.',
  },
  {
    id: 'proj-diabetes',
    name: 'Diabetes Prediction Model',
    type: 'GROUP',
    systemCode: '0x91-MED-PREDICT',
    techStack: ['Python', 'scikit-learn', 'Data Analytics', 'Predictive Modeling'],
    visualFocus: 'Medical telemetry grid & risk rating cards',
    repoUrl: 'https://github.com/idkwhoamitho/MachineLearning_Assignment_LC01_Kelompok4',
    fullDescription:
      'Clinical data analytics and risk rating system using decision tree classification to compute diabetes probability metrics based on patient diagnostic markers and physiological parameters.',
  },
  {
    id: 'proj-openquant',
    name: 'OpenQuant Automatic Trading Engine',
    type: 'SOLO',
    systemCode: '0x92-QUANT-[#]',
    techStack: ['C++', 'Python', 'PyTorch', 'Hugging Face', 'Quant Finance'],
    visualFocus: 'High-frequency financial candlestick visualizer',
    repoUrl: 'https://github.com/idkwhoamitho/Crypto-Terminal',
    fullDescription:
      'Low-latency automated trading engine built in C++ and Python. Leverages PyTorch deep learning models and sentiment analysis transformers from Hugging Face for high-frequency market order execution and live technical candlestick evaluation.',
  },
  {
    id: 'proj-finance',
    name: 'Personal Finance Software',
    type: 'GROUP',
    systemCode: '0x93-LEDGER-SYS',
    techStack: ['C#', 'TypeScript', 'PostgreSQL', 'Web Dev'],
    visualFocus: 'Tactical ledger & asset allocation dashboard',
    repoUrl: 'https://github.com/KenHoH/Finance',
    fullDescription:
      'Full-stack tactical finance management application featuring real-time ledger accounting, PostgreSQL database backends, asset allocation breakdowns, and modular interactive data grids.',
  },
  {
    id: 'proj-makers-os',
    name: 'Makers-OS',
    type: 'SOLO',
    systemCode: '0x94-KERNEL-BARE',
    techStack: ['C/C++', 'Assembly', 'Bare-Metal OS', 'Memory Mgmt'],
    visualFocus: 'Bare-metal low-level kernel monitor',
    repoUrl: 'https://github.com/idkwhoamitho/MakersOS',
    fullDescription:
      'Custom bare-metal operating system kernel written in C/C++ and Assembly. Implements core low-level interrupt handling, custom memory management units (MMU), system call interfaces, and a hardware monitor shell.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-80px' });

  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section
      id="projects"
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
        {/* Header telemetry */}
        <motion.div variants={itemVariants} style={{ marginBottom: '0.6rem' }}>
          <HUDLine text="MISSION ARCHIVE // PROJECT DOSSIERS" />
        </motion.div>

        {/* Section title */}
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
          Field <span style={{ color: '#f8f546' }}>Operations</span>
        </motion.h2>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.id} variants={itemVariants} style={{ display: 'flex' }}>
              <GlassCard
                badgeText={project.type}
                badgeVariant={project.type === 'SOLO' ? 'yellow' : 'default'}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    paddingTop: '0.5rem',
                  }}
                >
                  {/* Top content */}
                  <div>
                    {/* Project Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-outfit), sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        lineHeight: 1.3,
                        marginBottom: '0.85rem',
                      }}
                    >
                      {project.name}
                    </h3>

                    {/* Tech Stack Pills */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.4rem',
                        marginBottom: '1rem',
                      }}
                    >
                      {project.techStack.map((tech) => (
                        <TechTag key={tech} label={tech} variant="olive" />
                      ))}
                    </div>
                  </div>

                  {/* Bottom pinned content */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(160, 170, 169, 0.1)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-outfit), sans-serif',
                        fontSize: '0.78rem',
                        color: '#7e807c',
                        fontStyle: 'italic',
                        lineHeight: 1.5,
                        marginBottom: '1.25rem',
                      }}
                    >
                      {project.visualFocus}
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <DynamicButton
                        variant="primary"
                        id={`${project.id}-detail`}
                        onClick={() => setSelectedProject(project)}
                      >
                        Inspect Dossier
                      </DynamicButton>
                      <DynamicButton
                        href={project.repoUrl}
                        variant="ghost"
                        external
                        id={`${project.id}-github`}
                      >
                        Repo ↗
                      </DynamicButton>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ProjectModal project={selectedProject} onClose={handleClose} />
    </section>
  );
}