/**
 * Design Tokens - Color Palette
 * AlanaDolls Brand Identity: Lavender Premium Theme
 */

export const colors = {
  // Brand Colors - Lavender Premium Theme
  brand: {
    base: '#1a1025',        // Dark purple background
    dark: '#251535',        // Slightly lighter dark
    card: '#2d1f3d',        // Card background
    sand: '#3d2d4d',        // Tertiary dark
    text: '#fdf2f8',        // Light pink text
    muted: '#c4b5d8',       // Muted lavender text
    gold: '#e8b4d0',        // Pink gold accent
    goldLight: '#f5d5e8',   // Light pink gold
  },

  // Accent Colors
  pink: {
    DEFAULT: '#ec4899',
    light: '#f472b6',
    dark: '#db2777',
  },

  purple: {
    DEFAULT: '#a855f7',
    dark: '#7c3aed',
    light: '#c4b5fd',
  },

  lavender: {
    DEFAULT: '#c4b5fd',
    dark: '#a78bfa',
    light: '#e9e3ff',
  },

  // Gray Scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic Colors
  success: {
    light: '#dcfce7',
    DEFAULT: '#10b981',
    dark: '#15803d',
  },

  error: {
    light: '#fee2e2',
    DEFAULT: '#dc2626',
    dark: '#b91c1c',
  },

  warning: {
    light: '#fef3c7',
    DEFAULT: '#d97706',
    dark: '#b45309',
  },

  // Base
  white: '#ffffff',
  black: '#000000',
  cream: '#fce7f3',
  transparent: 'transparent',
} as const

export type ColorToken = typeof colors
export type BrandColor = keyof typeof colors.brand
