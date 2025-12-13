/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand Colors - AlanaDolls Lavender Premium Theme
        'cr-base': '#1a1025',
        'cr-dark': '#251535',
        'cr-card': '#2d1f3d',
        'cr-sand': '#3d2d4d',
        'cr-text': '#fdf2f8',
        'cr-muted': '#c4b5d8',
        'cr-gold': '#e8b4d0',
        'cr-gold-light': '#f5d5e8',
        'cr-pink': '#ec4899',
        'cr-pink-light': '#f472b6',
        'cr-purple': '#a855f7',
        'cr-purple-dark': '#7c3aed',
        'cr-lavender': '#c4b5fd',
        'cr-lavender-dark': '#a78bfa',
        'cr-magenta': '#db2777',
        'cr-green': '#10b981',
        'cr-cream': '#fce7f3',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      animation: {
        'typing': 'typing 1.4s infinite ease-in-out both',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'twinkle-delayed': 'twinkle 3s ease-in-out 1.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-x': 'gradientX 3s ease infinite',
      },
      keyframes: {
        typing: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
