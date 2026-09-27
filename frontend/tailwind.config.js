import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' } },
    extend: {
      colors: {
        navy: {
          50: '#f1f5fb',
          100: '#e2e9f5',
          200: '#c4d2ea',
          300: '#94acd6',
          400: '#5f7fb9',
          500: '#3d5c9c',
          600: '#2c4580',
          700: '#213566',
          800: '#16244a',
          900: '#0d1733',
          950: '#070d1f',
        },
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdaff',
          300: '#8ec3ff',
          400: '#59a1ff',
          500: '#337dfd',
          600: '#1d5ef2',
          700: '#1549de',
          800: '#183db4',
          900: '#1a388d',
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(13,23,51,.04), 0 8px 24px -8px rgba(13,23,51,.10)',
        lift: '0 2px 4px rgba(13,23,51,.04), 0 20px 40px -12px rgba(13,23,51,.18)',
        glow: '0 0 0 1px rgba(51,125,253,.15), 0 12px 32px -8px rgba(51,125,253,.35)',
      },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'fade-in': 'fade-in .4s ease-out',
      },
    },
  },
  plugins: [forms],
};
