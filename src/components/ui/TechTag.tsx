'use client';

interface TechTagProps {
  label: string;
  variant?: 'olive' | 'slate' | 'yellow';
}

export default function TechTag({ label, variant = 'olive' }: TechTagProps) {
  const styles: Record<string, React.CSSProperties> = {
    olive: {
      background: 'rgba(101, 113, 54, 0.25)',
      color: '#a0aaa9',
      border: '1px solid rgba(101, 113, 54, 0.55)',
    },
    slate: {
      background: 'rgba(126, 128, 124, 0.15)',
      color: '#a0aaa9',
      border: '1px solid rgba(126, 128, 124, 0.35)',
    },
    yellow: {
      background: 'rgba(248, 245, 70, 0.12)',
      color: '#f8f546',
      border: '1px solid rgba(248, 245, 70, 0.35)',
    },
  };

  return (
    <span
      style={{
        ...styles[variant],
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '0.62rem',
        fontFamily: 'var(--font-space-mono), monospace',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
