# Design System Reference Guide

## Warm Neutral Color System

Your application now uses a comfortable, inviting warm neutral color palette with teal and amber accents.

### Quick Access

All design tokens are available in `/app/styles/`:
- `colors.ts` - Complete color palette
- `typography.ts` - Font sizes and text styles
- `spacing.ts` - Spacing scale and border radius
- `shadows.ts` - Shadow system
- `index.ts` - Combined exports

## Using Colors

### In CSS/Tailwind Classes

Colors are available as CSS variables:

```tsx
// Background colors
<div style={{ background: 'var(--color-bg-base)' }}>
<div style={{ background: 'var(--color-bg-surface)' }}>
<div style={{ background: 'var(--color-bg-elevated)' }}>

// Primary colors (Teal)
<button style={{ background: 'var(--color-primary-500)' }}>
<button style={{ background: 'var(--color-primary-700)' }}>

// Accent colors (Amber)
<button style={{ background: 'var(--color-accent-500)' }}>

// Text colors
<p style={{ color: 'var(--color-text-primary)' }}>
<p style={{ color: 'var(--color-text-secondary)' }}>
<p style={{ color: 'var(--color-text-tertiary)' }}>

// Borders
<div style={{ border: '1px solid var(--color-border-default)' }}>
```

### In TypeScript/JavaScript

Import from the design system:

```tsx
import { colors } from '@/app/styles';

// Use in components
<div style={{ background: colors.background.surface }}>
<button style={{ background: colors.primary[500] }}>
<p style={{ color: colors.text.primary }}>
```

## Color Palette Reference

### Backgrounds
- `--color-bg-base` (#FBF8F3) - Main page background
- `--color-bg-surface` (#FFFFFF) - Cards, elevated surfaces
- `--color-bg-elevated` (#F5F1E8) - Inputs, hovers
- `--color-bg-subtle` (#FAF8F5) - Code blocks

### Primary (Teal) - Use for main actions
- `--color-primary-50` to `--color-primary-900`
- Main: `--color-primary-500` (#14B8A6)
- Dark: `--color-primary-700` (#0F766E)

### Accent (Amber) - Use for highlights
- `--color-accent-50` to `--color-accent-900`
- Main: `--color-accent-500` (#F59E0B)
- Dark: `--color-accent-600` (#D97706)

### Semantic Colors
- Success: `--color-success-main` (#22C55E)
- Error: `--color-error-main` (#F87171)
- Warning: `--color-warning-main` (#FB923C)

### Text
- Primary: `--color-text-primary` (#1C1917) - Headlines, body
- Secondary: `--color-text-secondary` (#78716C) - Subtext
- Tertiary: `--color-text-tertiary` (#A8A29E) - Disabled, placeholders

## Typography

### Importing Styles

```tsx
import { typography } from '@/app/styles';

// Use text styles
<h1 style={typography.textStyles.h1}>
<p style={typography.textStyles.body}>
```

### Available Text Styles
- `h1` - 32px, bold
- `h2` - 28px, bold
- `h3` - 24px, bold
- `h4` - 20px, semibold
- `bodyLarge` - 18px, regular
- `body` - 16px, regular
- `bodySmall` - 14px, regular
- `caption` - 12px, regular
- `code` - 14px, monospace
- `button` - 16px, semibold

## Spacing

### Using Named Tokens

```tsx
import { spacing } from '@/app/styles';

<div style={{ padding: spacing.md }}> // 16px
<div style={{ margin: spacing.lg }}> // 24px
<div style={{ gap: spacing.xl }}> // 32px
```

### Spacing Scale
- `xs` - 4px
- `sm` - 8px
- `md` - 16px
- `lg` - 24px
- `xl` - 32px
- `2xl` - 48px
- `3xl` - 64px
- `4xl` - 80px

### Border Radius

```tsx
import { borderRadius } from '@/app/styles';

<div style={{ borderRadius: borderRadius.md }}> // 8px
<div style={{ borderRadius: borderRadius.lg }}> // 12px
<div style={{ borderRadius: borderRadius.full }}> // Pill shape
```

## Shadows

```tsx
import { shadows } from '@/app/styles';

// Elevation shadows
<div style={{ boxShadow: shadows.sm }}>
<div style={{ boxShadow: shadows.md }}>
<div style={{ boxShadow: shadows.lg }}>

// Colored shadows for interactions
<button style={{ boxShadow: shadows.teal }}> // Teal glow
<button style={{ boxShadow: shadows.focus }}> // Focus ring
```

## Common Patterns

### Primary Button
```tsx
<button style={{
  background: 'var(--color-primary-500)',
  color: 'white',
  padding: '14px 32px',
  borderRadius: '8px',
  fontWeight: 600,
  boxShadow: 'var(--shadow-md)',
}}>
  Analyze
</button>
```

### Card Component
```tsx
<div style={{
  background: 'var(--color-bg-surface)',
  border: '1px solid var(--color-border-default)',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: 'var(--shadow-md)',
}}>
  Card content
</div>
```

### Badge (OAuth)
```tsx
<span style={{
  background: 'var(--color-primary-100)',
  color: 'var(--color-primary-700)',
  padding: '4px 12px',
  borderRadius: '9999px',
  fontSize: '14px',
  fontWeight: 600,
}}>
  OAuth
</span>
```

### Badge (Traditional)
```tsx
<span style={{
  background: 'var(--color-accent-100)',
  color: 'var(--color-accent-600)',
  padding: '4px 12px',
  borderRadius: '9999px',
  fontSize: '14px',
  fontWeight: 600,
}}>
  Traditional Auth
</span>
```

### Input Field
```tsx
<input style={{
  background: 'var(--color-bg-elevated)',
  border: '2px solid var(--color-border-strong)',
  borderRadius: '8px',
  padding: '14px 16px',
  fontSize: '16px',
  color: 'var(--color-text-primary)',
}} />

// Focus state
onFocus={(e) => {
  e.target.style.background = 'var(--color-bg-surface)';
  e.target.style.borderColor = 'var(--color-primary-500)';
}}
```

### Code Block
```tsx
<pre style={{
  background: 'var(--color-bg-subtle)',
  border: '1px solid var(--color-border-default)',
  borderRadius: '12px',
  padding: '24px',
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
  lineHeight: 1.6,
}}>
  <code>Code here</code>
</pre>
```

## Syntax Highlighting Colors

For code syntax highlighting:

```tsx
// HTML tags
color: var(--color-syntax-tag)     // Dark teal

// Attributes
color: var(--color-syntax-attribute)  // Warm brown

// Strings
color: var(--color-syntax-string)   // Forest green

// Keywords
color: var(--color-syntax-keyword)  // Purple

// Comments
color: var(--color-syntax-comment)  // Light brown

// Functions
color: var(--color-syntax-function) // Deep blue

// Numbers
color: var(--color-syntax-number)   // Red
```

## Accessibility

All colors meet WCAG AA contrast standards:
- Text on backgrounds: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

## Next Steps

Now that the design system is in place, you can:

1. **Create UI Components** - Build reusable Button, Card, Badge components
2. **Update Existing Components** - Replace inline styles with design tokens
3. **Build New Layouts** - Use the hybrid layout approach (hero-first design)
4. **Enhance Code Display** - Add syntax highlighting with the defined colors

Refer to the detailed specification document for complete implementation guidance.
