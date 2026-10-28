/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        /* Exact Brand Palette mappings */
        text: 'var(--text)',
        background: 'var(--background)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-container': 'rgb(var(--color-primary-container) / <alpha-value>)',
        'on-primary': 'rgb(var(--color-on-primary) / <alpha-value>)',

        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'secondary-container': 'rgb(var(--color-secondary-container) / <alpha-value>)',
        'on-secondary': 'rgb(var(--color-on-secondary) / <alpha-value>)',
        'on-secondary-container': 'rgb(var(--color-on-secondary-container) / <alpha-value>)',

        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-container': 'rgb(var(--color-accent-container) / <alpha-value>)',
        'on-accent': 'rgb(var(--color-on-accent) / <alpha-value>)',

        /* Surface Semantic Tokens */
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'on-surface': 'rgb(var(--color-on-surface) / <alpha-value>)',
        'surface-dim': 'rgb(var(--color-surface-dim) / <alpha-value>)',
        'surface-bright': 'rgb(var(--color-surface-bright) / <alpha-value>)',
        'surface-container-lowest': 'rgb(var(--color-surface-container-lowest) / <alpha-value>)',
        'surface-container-low': 'rgb(var(--color-surface-container-low) / <alpha-value>)',
        'surface-container': 'rgb(var(--color-surface-container) / <alpha-value>)',
        'surface-container-high': 'rgb(var(--color-surface-container-high) / <alpha-value>)',
        'surface-container-highest': 'rgb(var(--color-surface-container-highest) / <alpha-value>)',
        'surface-variant': 'rgb(var(--color-surface-variant) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--color-on-surface-variant) / <alpha-value>)',

        outline: 'rgb(var(--color-outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--color-outline-variant) / <alpha-value>)',

        /* Semantic Functional Colors */
        error: 'rgb(var(--color-error) / <alpha-value>)',
        'error-container': 'rgb(var(--color-error-container) / <alpha-value>)',
        'on-error': 'rgb(var(--color-on-error) / <alpha-value>)',
        'on-error-container': 'rgb(var(--color-on-error-container) / <alpha-value>)',

        success: 'rgb(var(--color-success) / <alpha-value>)',
        'success-container': 'rgb(var(--color-success-container) / <alpha-value>)',
        'on-success': 'rgb(var(--color-on-success) / <alpha-value>)',
        'on-success-container': 'rgb(var(--color-on-success-container) / <alpha-value>)',

        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        'warning-container': 'rgb(var(--color-warning-container) / <alpha-value>)',
        'on-warning': 'rgb(var(--color-on-warning) / <alpha-value>)',
        'on-warning-container': 'rgb(var(--color-on-warning-container) / <alpha-value>)',

        /* Legacy backward compatibility aliases if needed by existing templates */
        'tertiary-fixed': 'rgb(var(--color-surface-container-high) / <alpha-value>)',
        'on-tertiary-fixed': 'rgb(var(--color-on-surface) / <alpha-value>)'
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        full: '9999px'
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
