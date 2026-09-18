# AGENTS.md — Portfolio System Architecture & Technical Guidelines

**Target Unit / Operator:** Maximilianus Ronald  
**Affiliation:** BINUS University — Computer Science (Intelligent Systems)  
**Specializations:** Robotics, Game Development, Quantitative Trading, Embedded Systems  
**Visual & Tactical Aesthetic:** Arknights: Endfield (Tech-Industrial, Minimalist UI, High Contrast Accent Highlights)

---

## 1. System Color Palette & Design Tokens

Inspired by Arknights: Endfield industrial UI aesthetic paired with high-contrast UI highlights (Velo-Lime & Deep Obsidian slate).

```scss
// Brand Color Palette (CSS Variables)
:root {
  --color-dark-bg: #313739;        /* Main dark industrial ground */
  --color-slate-grey: #7E807C;     /* Mid-tone slate border & muted UI */
  --color-olive-drab: #657136;     /* Endfield tactical green accent */
  --color-neon-yellow: #F8F546;    /* High-contrast highlight yellow/lime */
  --color-light-grey: #A0AAA9;     /* Secondary text & cool gray element */
  --color-panel-bg: rgba(49, 55, 57, 0.75);
  --color-glass-border: rgba(160, 170, 169, 0.25);
}
```

---

## 2. Technical Stack & Component Architecture

- **Framework:** Next.js (App Router, Server-Driven Architecture with Client-Side 3D Canvas)
- **Styling:** Tailwind CSS + CSS Modules / Framer Motion
- **3D & Graphics:** Three.js / React Three Fiber (`@react-three/fiber`), `@react-three/drei`, WebGL Shaders
- **Animations:** Framer Motion, GSAP (ScrollTrigger for smooth 3D transformations)

---

## 3. Structural Rules & Component Separation

To maintain strict industrial modularity, **every element must be isolated into single-responsibility components**. No monolithic files.

```
src/
├── app/
│   ├── layout.tsx             # Root layout & canvas container overlay
│   ├── page.tsx               # Main portfolio landing page
│   └── globals.css            # Custom CSS variables & global utility styles
├── components/
│   ├── ui/                    # Atomic Endfield UI components
│   │   ├── DynamicButton.tsx  # Interactive neon tactical button
│   │   ├── TechTag.tsx        # Styled tech stack badge
│   │   └── GlassCard.tsx      # Dark frosted glass UI panel
│   ├── canvas/                # 3D Scene Components (R3F)
│   │   ├── SceneContainer.tsx # Main canvas context
│   │   ├── InteractiveGlobe.tsx # 3D Tactical Wireframe / Globe
│   │   └── ParticleField.tsx  # Ambient floating particle background
│   └── sections/              # Page Sections
│       ├── HeroSection.tsx    # Operator Identity & Intro
│       ├── SkillsSection.tsx  # Skill Matrix & Proficiency Meters
│       ├── ProjectsSection.tsx# Project Showcase Grid with 3D Preview
│       └── ContactSection.tsx # Tactical Terminal & Contact
└── styles/
    └── tokens.module.scss     # Design tokens and Endfield HUD motifs
```

---

## 4. Section & UI Guidelines

### 4.1 Layout Philosophy
- **Minimal Text, Maximum Aesthetic:** High visual density, UI HUD elements (e.g., status indicators `STATUS: ONLINE`, grid coordinates, telemetry overlays).
- **Responsive 3D Integration:** The 3D scene responds directly to pointer movement and scroll events, keeping the background live while rendering fast on high-DPI displays.
- **Glassmorphism & Neon Accenting:** Sleek dark panel backgrounds (`#313739`) bordered with light gray translucent lines (`#A0AAA9`) and key call-to-action triggers colored in vibrant neon yellow (`#F8F546`) or tactical olive (`#657136`).

---

## 5. Showcase Projects Matrix

| Project Identifier | Type | Tech Stack | Repository | Visual Focus |
| :--- | :--- | :--- | :--- | :--- |
| **Prediction Model for Browsing Intention** | Group | Python, scikit-learn, Streamlit, Pandas, ML | [GitHub Link](https://github.com/Ws995566/Prediction-Model-for-Analyzing-Users-Behaviour) | Heatmap analysis & predictive metrics HUD |
| **Air-Writing-Hangul** | Group | Python, OpenCV, MediaPipe, ML, PyTorch | [GitHub Link](https://github.com/Ws995566/Air-Writing-Hangul) | Real-time hand-tracking 3D trajectory visualization |
| **Diabetes Prediction Model** | Group | Python, scikit-learn, Data Analytics, Predictive Modeling | [GitHub Link](https://github.com/idkwhoamitho/MachineLearning_Assignment_LC01_Kelompok4) | Medical telemetry grid & risk rating cards |
| **OpenQuant Automatic Trading Engine** | Solo | C++, Python, PyTorch, Hugging Face, Quant Finance | [GitHub Link](https://github.com/idkwhoamitho/Crypto-Terminal) | High-frequency financial candlestick visualizer |
| **Personal Finance Software** | Group | C#, TypeScript, PostgreSQL, Web Dev | [GitHub Link](https://github.com/KenHoH/Finance) | Tactical ledger & asset allocation dashboard |
| **Makers-OS** | Solo | C/C++, Assembly, Bare-Metal OS, Memory Mgmt | [GitHub Link](https://github.com/idkwhoamitho/MakersOS) | Bare-metal low-level kernel monitor |

---

## 6. Code Style Standards & Component Snippets

### 6.1 Separated 3D Scene Component (`src/components/canvas/InteractiveGlobe.tsx`)

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function InteractiveGlobe() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.4}>
      <MeshDistortMaterial
        color="#657136"
        attach="material"
        distort={0.3}
        speed={1.5}
        wireframe={true}
        roughness={0.2}
      />
    </Sphere>
  );
}
```

### 6.2 Modular Glass Card UI Component (`src/components/ui/GlassCard.tsx`)

```tsx
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  badgeText?: string;
}

export default function GlassCard({ children, className = '', badgeText }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-xl border border-[#A0AAA9]/30 bg-[#313739]/80 backdrop-blur-md p-6 shadow-2xl ${className}`}
    >
      {/* Decorative Endfield UI Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#F8F546]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#F8F546]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#F8F546]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#F8F546]" />

      {badgeText && (
        <span className="inline-block px-2 py-0.5 mb-3 text-[10px] font-mono tracking-widest uppercase bg-[#657136] text-[#F8F546] rounded">
          {badgeText}
        </span>
      )}

      {children}
    </motion.div>
  );
}
```

### 6.3 Hero Section Layout (`src/components/sections/HeroSection.tsx`)

```tsx
'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-8 md:px-24">
      {/* HUD Telemetry Line */}
      <div className="flex items-center gap-3 text-xs font-mono text-[#A0AAA9] mb-4">
        <span className="w-2 h-2 rounded-full bg-[#F8F546] animate-pulse" />
        <span>SYS.LOC // BINUS_UNIVERSITY_INTELLIGENT_SYSTEMS</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 uppercase">
        MAXIMILIANUS <span className="text-[#F8F546]">RONALD</span>
      </h1>

      <p className="text-lg md:text-xl text-[#A0AAA9] max-w-xl font-light mb-8">
        Specialist in Intelligent Systems, Robotics, Game Development, and High-Frequency Quantitative Trading Systems.
      </p>

      <div className="flex flex-wrap gap-4">
        <button className="px-6 py-3 font-mono font-bold text-[#313739] bg-[#F8F546] hover:bg-white transition-all rounded shadow-lg uppercase tracking-wider text-sm flex items-center gap-2">
          Initialize Data <span>→</span>
        </button>
        <button className="px-6 py-3 font-mono text-[#A0AAA9] border border-[#7E807C] hover:border-[#F8F546] hover:text-[#F8F546] transition-all rounded text-sm uppercase">
          View Projects
        </button>
      </div>
    </section>
  );
}
```

---

## 7. Skill Matrix & Tactical System Loadout

```yaml
Operator Capabilities:
  High Proficiency:
    - Language / Runtime: C# (Unity Architecture), Python (PyTorch, NumPy, Pandas), C / C++ (Bare-Metal / Low-Level Performance)
    - Domain Focus: Intelligent Systems, Robotics Kinematics, Quant Trading Engine Logic
  Intermediate Proficiency:
    - Relational Storage: MySQL, PostgreSQL
    - General Runtimes: Java
```

---

## 8. Deployment & Performance Optimization

- **3D Asset Loading:** Utilize Draco compression for GLTF models.
- **Framerate Target:** 60 FPS across desktop & mobile viewport with dynamic dpr resolution scaling (`dpr={[1, 2]}`).
- **State Management:** Keep React State decapped from Three.js rendering loops to prevent frame drops.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
