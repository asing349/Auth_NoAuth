import React from 'react';
import { BadgeVariant } from '@/app/types';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant, children, className = '' }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    oauth: {
      backgroundColor: 'var(--color-primary-100)',
      color: 'var(--color-primary-700)',
    },
    traditional: {
      backgroundColor: 'var(--color-accent-100)',
      color: 'var(--color-accent-600)',
    },
    none: {
      backgroundColor: 'var(--color-bg-elevated)',
      color: 'var(--color-text-secondary)',
    },
    success: {
      backgroundColor: 'var(--color-success-light)',
      color: 'var(--color-success-dark)',
    },
    error: {
      backgroundColor: 'var(--color-error-light)',
      color: 'var(--color-error-dark)',
    },
    warning: {
      backgroundColor: 'var(--color-warning-light)',
      color: 'var(--color-warning-dark)',
    },
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}
