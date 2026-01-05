import React from 'react';
import { ButtonVariant, ButtonSize } from '@/app/types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  children,
  fullWidth = false,
  disabled,
  className = '',
  style,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const variantStyleObjects: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-primary-500)',
      color: 'white',
      boxShadow: 'var(--shadow-md)',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'white',
      color: 'var(--color-primary-500)',
      border: '2px solid var(--color-primary-500)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary-500)',
      border: 'none',
    },
    accent: {
      backgroundColor: 'var(--color-accent-500)',
      color: 'white',
      boxShadow: 'var(--shadow-md)',
      border: 'none',
    },
  };

  const disabledStyle: React.CSSProperties = disabled
    ? {
        backgroundColor: 'var(--color-text-disabled)',
        color: 'var(--color-text-inverse)',
        cursor: 'not-allowed',
        opacity: 0.6,
      }
    : {};

  return (
    <button
      className={`font-semibold rounded-lg transition-all inline-flex items-center justify-center ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{
        ...variantStyleObjects[variant],
        ...disabledStyle,
        ...style,
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
