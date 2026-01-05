/**
 * Shadow System
 * Warm shadows with brown undertones for elevation
 */

export const shadows = {
  // Elevation shadows (warm undertones)
  sm: '0 1px 2px rgba(120, 113, 108, 0.1)',
  DEFAULT: '0 2px 8px rgba(120, 113, 108, 0.08)',
  md: '0 2px 8px rgba(120, 113, 108, 0.08)',
  lg: '0 4px 16px rgba(120, 113, 108, 0.12)',
  xl: '0 8px 24px rgba(120, 113, 108, 0.15)',
  '2xl': '0 12px 32px rgba(120, 113, 108, 0.18)',

  // Special shadows
  inner: 'inset 0 2px 4px rgba(120, 113, 108, 0.06)',
  none: 'none',

  // Colored shadows for interactions
  teal: '0 4px 16px rgba(20, 184, 166, 0.2)',      // Teal glow for primary elements
  amber: '0 4px 16px rgba(245, 158, 11, 0.2)',     // Amber glow for accent elements

  // Focus ring
  focus: '0 0 0 3px rgba(20, 184, 166, 0.2)',      // Teal focus ring
} as const;

// Type exports
export type Shadows = typeof shadows;
export type ShadowKey = keyof typeof shadows;
