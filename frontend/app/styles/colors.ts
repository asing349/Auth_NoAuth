/**
 * Warm Neutral Color System
 * A comfortable, inviting color palette with warm undertones
 */

export const colors = {
  // Background layers (for depth)
  background: {
    base: '#FBF8F3',      // Main page background (warm off-white with beige undertone)
    surface: '#FFFFFF',    // Elevated cards, primary surfaces
    elevated: '#F5F1E8',   // Inputs, hover states, secondary surfaces
    subtle: '#FAF8F5',     // Code blocks, very light emphasis
  },

  // Primary brand colors (Teal)
  primary: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',        // Main primary color
    600: '#0D9488',
    700: '#0F766E',        // Darker variant for text
    800: '#115E59',
    900: '#134E4A',
  },

  // Accent colors (Amber)
  accent: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',        // Main accent color
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Semantic colors
  success: {
    light: '#DCFCE7',
    main: '#22C55E',
    dark: '#15803D',
  },

  error: {
    light: '#FEE2E2',
    main: '#F87171',
    dark: '#DC2626',
  },

  warning: {
    light: '#FED7AA',
    main: '#FB923C',
    dark: '#EA580C',
  },

  info: {
    light: '#CCFBF1',
    main: '#14B8A6',
    dark: '#0F766E',
  },

  // Text colors (warm undertones)
  text: {
    primary: '#1C1917',    // Warm black
    secondary: '#78716C',  // Brown-gray
    tertiary: '#A8A29E',   // Light brown
    inverse: '#FAFAF9',    // Text on dark backgrounds
    disabled: '#D6D3D1',   // Disabled state
  },

  // Border colors
  border: {
    subtle: '#F5F5F4',     // Very light dividers
    default: '#E7E5E4',    // Warm gray, subtle separation
    strong: '#D6D3D1',     // More visible borders
    focus: '#14B8A6',      // Focus state (primary teal)
  },

  // Code syntax highlighting (earthy palette)
  syntax: {
    tag: '#0F766E',        // Dark teal for HTML tags
    attribute: '#B45309',  // Warm brown for attributes
    string: '#15803D',     // Forest green for strings
    keyword: '#9333EA',    // Purple for keywords
    comment: '#A8A29E',    // Light brown for comments
    function: '#1E40AF',   // Deep blue for functions
    number: '#DC2626',     // Red for numbers
    operator: '#78716C',   // Gray for operators
    punctuation: '#A8A29E', // Light brown for punctuation
  },

  // Badge colors
  badge: {
    oauth: {
      bg: '#CCFBF1',
      text: '#0F766E',
    },
    traditional: {
      bg: '#FEF3C7',
      text: '#D97706',
    },
    none: {
      bg: '#F5F5F4',
      text: '#78716C',
    },
    success: {
      bg: '#DCFCE7',
      text: '#15803D',
    },
    error: {
      bg: '#FEE2E2',
      text: '#DC2626',
    },
  },
} as const;

// CSS variable names for use in Tailwind config
export const cssVariables = {
  // Backgrounds
  '--color-bg-base': colors.background.base,
  '--color-bg-surface': colors.background.surface,
  '--color-bg-elevated': colors.background.elevated,
  '--color-bg-subtle': colors.background.subtle,

  // Primary
  '--color-primary-50': colors.primary[50],
  '--color-primary-100': colors.primary[100],
  '--color-primary-500': colors.primary[500],
  '--color-primary-700': colors.primary[700],

  // Accent
  '--color-accent-100': colors.accent[100],
  '--color-accent-500': colors.accent[500],
  '--color-accent-600': colors.accent[600],

  // Text
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
  '--color-text-tertiary': colors.text.tertiary,

  // Borders
  '--color-border-default': colors.border.default,
  '--color-border-strong': colors.border.strong,
} as const;

// Type exports for TypeScript
export type ColorPalette = typeof colors;
export type ColorKey = keyof typeof colors;
