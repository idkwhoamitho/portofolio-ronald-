'use client';

import { useRef, useState } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import HUDLine from '@/src/components/ui/HUDLine';
import GlassCard from '@/src/components/ui/GlassCard';

interface ContactItem {
  id: string;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}

const CONTACTS: ContactItem[] = [
  {
    id: 'contact-github',
    label: 'GITHUB',
    value: 'github.com/idkwhoamitho',
    href: 'https://github.com/idkwhoamitho',
  },
  {
    id: 'contact-email',
    label: 'EMAIL',
    value: 'maximilianusronald82@gmail.com',
    href: 'maximilianusronald82@gmail.com',
  },
  {
    id: 'contact-affiliation',
    label: 'AFFILIATION',
    value: 'BINUS University — Computer Science (Intelligent Systems)',
  },
  {
    id: 'contact-location',
    label: 'LOC',
    value: 'Jakarta, Indonesia // UTC+7',
  },
];

function ContactRow({ item }: { item: ContactItem }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={item.id}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1.5rem',
        padding: '0.85rem 0',
        borderBottom: '1px solid rgba(160, 170, 169, 0.1)',
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#657136',
          minWidth: '100px',
          paddingTop: '2px',
        }}
      >
        {item.label}
      </span>

      {/* Value */}
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.78rem',
            color: '#a0aaa9',
            textDecoration: 'none',
            transition: 'color 0.2s',
            flex: 1,
          }}
          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#f8f546')}
          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#a0aaa9')}
        >
          {item.value} ↗
        </a>
      ) : (
        <span
          style={{
            fontFamily: 'var(--font-space-mono), monospace',
            fontSize: '0.78rem',
            color: '#a0aaa9',
            flex: 1,
          }}
        >
          {item.value}
        </span>
      )}

      {/* Copy button */}
      <button
        onClick={handleCopy}
        title="Copy to clipboard"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-space-mono), monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: copied ? '#f8f546' : 'rgba(160,170,169,0.35)',
          transition: 'color 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        {copied ? 'COPIED ✓' : 'COPY'}
      </button>
    </div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-80px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '8rem 2rem 10rem',
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
        {/* Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '0.6rem' }}>
          <HUDLine text="TRANSMISSION // OPEN CHANNEL" />
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
          Establish <span style={{ color: '#f8f546' }}>Contact</span>
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
          }}
        >
          {/* Terminal card */}
          <motion.div variants={itemVariants}>
            <GlassCard badgeText="UPLINK // ACTIVE">
              {/* Terminal header bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(160,170,169,0.15)',
                }}
              >
                {['#f8f546', '#657136', '#7e807c'].map((c) => (
                  <span
                    key={c}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: c,
                      display: 'inline-block',
                    }}
                  />
                ))}
                <span
                  style={{
                    marginLeft: '8px',
                    fontFamily: 'var(--font-space-mono), monospace',
                    fontSize: '0.58rem',
                    color: '#7e807c',
                    letterSpacing: '0.1em',
                  }}
                >
                  TERMINAL — MAXR-01.sh
                </span>
              </div>

              {/* Prompt lines */}
              <div
                style={{
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.72rem',
                  lineHeight: 2,
                  color: '#a0aaa9',
                }}
              >
                <div>
                  <span style={{ color: '#657136' }}>$ </span>
                  <span>whoami</span>
                </div>
                <div style={{ paddingLeft: '1rem', color: '#f8f546' }}>
                  maximilianus_ronald
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span style={{ color: '#657136' }}>$ </span>
                  <span>status --check</span>
                </div>
                <div style={{ paddingLeft: '1rem' }}>
                  <span style={{ color: '#f8f546' }}>●</span>{' '}
                  <span>ONLINE — accepting transmissions</span>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span style={{ color: '#657136' }}>$ </span>
                  <span style={{ borderRight: '2px solid #f8f546', animation: 'cursor-blink 1s step-end infinite' }}>
                    _
                  </span>
                </div>
              </div>

              <style jsx>{`
                @keyframes cursor-blink {
                  0%, 100% { opacity: 1; }
                  50%       { opacity: 0; }
                }
              `}</style>
            </GlassCard>
          </motion.div>

          {/* Contact links */}
          <motion.div variants={itemVariants}>
            <GlassCard badgeText="CONTACT CHANNELS">
              <div>
                {CONTACTS.map((item) => (
                  <ContactRow key={item.id} item={item} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Footer sig */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: '4rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(160,170,169,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(160,170,169,0.35)',
            }}
          >
            © 2026 Maximilianus Ronald — All Systems Nominal
          </span>
          <span
            style={{
              fontFamily: 'var(--font-space-mono), monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              color: '#657136',
            }}
          >
            BINUS University // CS-IS
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}