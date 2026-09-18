'use client';

interface HUDLineProps {
  text: string;
  pulsing?: boolean;
  className?: string;
}

export default function HUDLine({ text, pulsing = true, className = '' }: HUDLineProps) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      style={{
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: '0.68rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#a0aaa9',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#f8f546',
          flexShrink: 0,
          animation: pulsing ? 'hud-pulse 2s ease-in-out infinite' : 'none',
        }}
      />
      <span>{text}</span>

      <style jsx>{`
        @keyframes hud-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(248,245,70,0.6); }
          50%       { opacity: 0.6; box-shadow: 0 0 0 4px rgba(248,245,70,0); }
        }
      `}</style>
    </div>
  );
}
