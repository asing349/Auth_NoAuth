/**
 * Typography System
 * Defines font families, sizes, weights, and line heights
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(', '),
    mono: [
      'Monaco',
      'Menlo',
      'Consolas',
      'Courier New',
      'monospace',
    ].join(', '),
  },

  // Font sizes with line heights
  fontSize: {
    xs: {
      size: '0.75rem',    // 12px
      lineHeight: '1.4',
    },
    sm: {
      size: '0.875rem',   // 14px
      lineHeight: '1.5',
    },
    base: {
      size: '1rem',       // 16px
      lineHeight: '1.6',
    },
    lg: {
      size: '1.125rem',   // 18px
      lineHeight: '1.6',
    },
    xl: {
      size: '1.25rem',    // 20px
      lineHeight: '1.4',
    },
    '2xl': {
      size: '1.5rem',     // 24px
      lineHeight: '1.3',
    },
    '3xl': {
      size: '1.75rem',    // 28px
      lineHeight: '1.3',
    },
    '4xl': {
      size: '2rem',       // 32px
      lineHeight: '1.2',
    },
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Predefined text styles
  textStyles: {
    h1: {
      fontSize: '2rem',        // 32px
      fontWeight: '700',
      lineHeight: '1.2',
    },
    h2: {
      fontSize: '1.75rem',     // 28px
      fontWeight: '700',
      lineHeight: '1.3',
    },
    h3: {
      fontSize: '1.5rem',      // 24px
      fontWeight: '700',
      lineHeight: '1.3',
    },
    h4: {
      fontSize: '1.25rem',     // 20px
      fontWeight: '600',
      lineHeight: '1.4',
    },
    bodyLarge: {
      fontSize: '1.125rem',    // 18px
      fontWeight: '400',
      lineHeight: '1.6',
    },
    body: {
      fontSize: '1rem',        // 16px
      fontWeight: '400',
      lineHeight: '1.6',
    },
    bodySmall: {
      fontSize: '0.875rem',    // 14px
      fontWeight: '400',
      lineHeight: '1.5',
    },
    caption: {
      fontSize: '0.75rem',     // 12px
      fontWeight: '400',
      lineHeight: '1.4',
    },
    code: {
      fontSize: '0.875rem',    // 14px
      fontWeight: '400',
      lineHeight: '1.6',
    },
    button: {
      fontSize: '1rem',        // 16px
      fontWeight: '600',
      lineHeight: '1',
    },
  },
} as const;

// Type exports
export type Typography = typeof typography;
export type TextStyle = keyof typeof typography.textStyles;
