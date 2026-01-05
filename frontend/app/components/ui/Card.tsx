import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  bordered?: boolean;
  elevated?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  noPadding = false,
  bordered = true,
  elevated = true,
  style,
  onClick,
}: CardProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: noPadding ? '0' : '24px',
    border: bordered ? '1px solid var(--color-border-default)' : 'none',
    boxShadow: elevated ? 'var(--shadow-md)' : 'none',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  return (
    <div className={className} style={cardStyle} onClick={onClick}>
      {children}
    </div>
  );
}
