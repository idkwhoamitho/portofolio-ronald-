'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Hero', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const id = href.slice(1);
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    },
    []
  );

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        background: scrolled
          ? 'rgba(49, 55, 57, 0.88)'
          : 'rgba(49, 55, 57, 0.4)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: scrolled
          ? '1px solid rgba(160, 170, 169, 0.2)'
          : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
        style={{
          fontFamily: 'var(--font-space-mono), monospace',
          fontWeight: 700,
          fontSize: '1.05rem',
          letterSpacing: '0.08em',
          color: '#f8f546',
          textDecoration: 'none',
          userSelect: 'none',
        }}
      >
        MR<span style={{ color: '#7e807c' }}>//</span>
      </a>

      {/* Desktop Links */}
      <ul
        style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
        className="hidden md:flex"
      >
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = active === href.slice(1);
          return (
            <li key={href}>
              <button
                onClick={() => handleNavClick(href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive ? '#f8f546' : '#a0aaa9',
                  borderBottom: isActive
                    ? '1px solid #f8f546'
                    : '1px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLButtonElement).style.color = '#f8f546')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLButtonElement).style.color = isActive
                    ? '#f8f546'
                    : '#a0aaa9')
                }
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="flex md:hidden"
        onClick={() => setMobileOpen((p) => !p)}
        style={{
          background: 'none',
          border: '1px solid rgba(160,170,169,0.35)',
          borderRadius: '4px',
          padding: '6px 10px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '20px',
              height: '2px',
              background: mobileOpen ? '#f8f546' : '#a0aaa9',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </button>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              background: 'rgba(49, 55, 57, 0.96)',
              backdropFilter: 'blur(14px)',
              borderBottom: '1px solid rgba(160, 170, 169, 0.2)',
              padding: '1rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNavClick(href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-space-mono), monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: active === href.slice(1) ? '#f8f546' : '#a0aaa9',
                  padding: '0.25rem 0',
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
