/**
 * Design Tokens - Main Export
 */

export { colors } from './colors'
export { typography } from './typography'
export { spacing, borderRadius, shadows } from './spacing'

import { colors } from './colors'
import { typography } from './typography'
import { spacing, borderRadius, shadows } from './spacing'

export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1100,
    popover: 1200,
    tooltip: 1300,
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
} as const
