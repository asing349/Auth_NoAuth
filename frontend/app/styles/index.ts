/**
 * Design System
 * Central export for all design tokens
 */

import { colors, cssVariables } from './colors';
import { typography } from './typography';
import { spacing, containerWidth, borderRadius } from './spacing';
import { shadows } from './shadows';

// Re-export everything
export { colors, cssVariables, type ColorPalette, type ColorKey } from './colors';
export { typography, type Typography, type TextStyle } from './typography';
export { spacing, containerWidth, borderRadius, type Spacing, type SpacingKey, type BorderRadius } from './spacing';
export { shadows, type Shadows, type ShadowKey } from './shadows';

// Complete theme object
export const theme = {
  colors,
  typography,
  spacing,
  containerWidth,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;
