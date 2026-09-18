'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_LOGS = [
  'PRTS_SYS_KERNEL // INITIALIZING PROTOCOL...',
  'NEURAL_LINK // ESTABLISHING HANDSHAKE',
  'DECRYPTION_KEYS // VERIFIED [256-BIT]',
  'ENVIRONMENT // N4CHZ3HRER_OPERATIONAL_MATRIX',
  'CLEARANCE LEVEL // OPERATOR AUTHORIZED',
];

interface Props {
  onComplete?: () => void;
}

export default function AccessGrantedOverlay({ onComplete }: Props) {
  const [visible, setVisible] = useState(true);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (logIndex < SYSTEM_LOGS.length - 1) {
      const timer = setTimeout(() => {
        setLogIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [logIndex]);

  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      handleComplete();
    }, 2600);

    return () => clearTimeout(dismissTimer);
  }, []);

  function handleComplete() {
    setVisible(false);
    if (onComplete) onComplete();
  }

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[10000] overflow-hidden pointer-events-auto select-none font-mono">
          {/* Top Tactical Shutter Gate */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#040607] border-b border-[#f8f546]/40 z-20 shadow-[0_10px_30px_rgba(248,245,70,0.15)]"
          />

          {/* Bottom Tactical Shutter Gate */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#040607] border-t border-[#f8f546]/40 z-20 shadow-[0_-10px_30px_rgba(248,245,70,0.15)]"
          />

          {/* Sci-Fi Center Hologram Interface */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.25, filter: 'blur(12px)' }}
            transition={{ duration: 0.45, ease: 'easeIn' }}
            className="relative z-30 flex flex-col items-center justify-between h-full p-8 sm:p-12 text-[#f8f546]"
          >
            {/* Holographic Matrix Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,245,70,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(248, 245, 70, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(248, 245, 70, 0.2) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Sci-Fi Scan Beam */}
            <motion.div
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-[2px] bg-[#f8f546] shadow-[0_0_20px_#f8f546] pointer-events-none z-10"
            />

            {/* Top Telemetry Header */}
            <div className="w-full max-w-6xl flex justify-between items-center text-xs tracking-widest text-[#a0aaa9] border-b border-[#a0aaa9]/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f8f546] animate-ping" />
                <span className="text-[#f8f546] font-bold">SYSTEM // PRTS_UNIX_OS</span>
              </div>
              <button
                type="button"
                onClick={handleComplete}
                className="hover:bg-[#f8f546] hover:text-[#040607] transition-all cursor-pointer text-[10px] tracking-widest uppercase border border-[#f8f546]/40 px-3 py-1 rounded"
              >
                [OVERRIDE_INIT ↗]
              </button>
            </div>

            {/* Central Target Reticle & Access Text */}
            <div className="my-auto flex flex-col items-center text-center space-y-6">
              {/* Sci-Fi Diamond Reticle */}
              <motion.div
                initial={{ scale: 0.2, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 2.2, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-20 h-20 flex items-center justify-center border-2 border-[#f8f546] rounded-lg shadow-[0_0_40px_rgba(248,245,70,0.5)] bg-[#040607]/60 backdrop-blur-md"
              >
                <div className="w-8 h-8 bg-[#f8f546] animate-pulse" />
                <span className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#f8f546]" />
                <span className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-[#f8f546]" />
                <span className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-[#f8f546]" />
                <span className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[#f8f546]" />
              </motion.div>

              {/* Glitch Animated Banner */}
              <div className="space-y-2 relative">
                <motion.h1
                  initial={{ letterSpacing: '0.05em', opacity: 0 }}
                  animate={{ letterSpacing: '0.4em', opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-[#f8f546] drop-shadow-[0_0_30px_rgba(248,245,70,0.7)] tracking-widest"
                >
                  ACCESS GRANTED
                </motion.h1>
                <div className="text-xs sm:text-sm text-[#a0aaa9] tracking-widest uppercase font-sans font-semibold flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#657136] rounded-full" />
                  OPERATOR CLEARANCE VERIFIED // N4CHZ3HRER CORE
                </div>
              </div>

              {/* System Diagnostic Terminal */}
              <div className="w-80 sm:w-96 flex flex-col items-center gap-2 pt-2">
                <div className="w-full h-1.5 bg-[#0d1012] border border-[#f8f546]/30 rounded-full overflow-hidden p-[1px]">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.1, ease: 'easeInOut' }}
                    className="h-full bg-[#f8f546] shadow-[0_0_12px_#f8f546]"
                  />
                </div>
                <div className="h-5 text-[11px] text-[#657136] tracking-wider">
                  {SYSTEM_LOGS[logIndex]}
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="w-full max-w-6xl flex justify-between items-center text-[10px] text-[#a0aaa9]/60 tracking-widest uppercase border-t border-[#a0aaa9]/20 pt-4">
              <span>SECURITY LEVEL: OMEGA</span>
              <span>N4CHZ TECHNICAL CORE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}