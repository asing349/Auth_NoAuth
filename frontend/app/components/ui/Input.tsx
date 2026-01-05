import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  fullWidth = false,
  className = '',
  style,
  ...props
}: InputProps) {
  const inputStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: 'var(--color-bg-elevated)',
    border: `2px solid ${error ? 'var(--color-error-main)' : 'var(--color-border-strong)'}`,
    color: 'var(--color-text-primary)',
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.2s',
    ...style,
  };

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            marginBottom: '8px',
          }}
        >
          {label}
        </label>
      )}
      <input
        className={className}
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--color-primary-500)';
          e.target.style.backgroundColor = 'white';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? 'var(--color-error-main)' : 'var(--color-border-strong)';
          e.target.style.backgroundColor = 'var(--color-bg-elevated)';
        }}
        {...props}
      />
      {error && (
        <p
          style={{
            marginTop: '8px',
            fontSize: '14px',
            color: 'var(--color-error-main)',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
