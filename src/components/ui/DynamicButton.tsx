'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface DynamicButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  href?: string;
  onClick?: () => void;
  external?: boolean;
  className?: string;
  id?: string;
}

export default function DynamicButton({
  children,
  variant = 'primary',
  href,
  onClick,
  external = false,
  className = '',
  id,
}: DynamicButtonProps) {
  const baseStyle: React.CSSProperties =
    variant === 'primary'
      ? {
          background: '#f8f546',
          color: '#313739',
          border: '1px solid #f8f546',
          fontWeight: 700,
        }
      : {
          background: 'transparent',
          color: '#a0aaa9',
          border: '1px solid #7e807c',
        };

  const sharedStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.65rem 1.4rem',
    fontFamily: 'var(--font-space-mono), monospace',
    fontSize: '0.72rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s',
    ...baseStyle,
  };

  const hoverClass =
    variant === 'primary'
      ? 'hover:bg-white hover:border-white hover:shadow-[0_0_16px_rgba(248,245,70,0.5)]'
      : 'hover:border-[#f8f546] hover:text-[#f8f546]';

  const content = (
    <motion.span
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.1 }}
      style={{ display: 'contents' }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (external) {
      return (
        <a
          id={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={sharedStyle}
          className={`${hoverClass} ${className}`}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        id={id}
        href={href}
        style={sharedStyle}
        className={`${hoverClass} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      id={id}
      onClick={onClick}
      style={sharedStyle}
      className={`${hoverClass} ${className}`}
    >
      {content}
    </button>
  );
}
