/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#004ac6',
        'primary-container': '#2563eb',
        'primary-fixed': '#dbe1ff',
        'primary-fixed-dim': '#b4c5ff',
        'on-primary': '#ffffff',
        'on-primary-container': '#eeefff',
        'on-primary-fixed': '#00174b',
        'on-primary-fixed-variant': '#003ea8',
        'inverse-primary': '#b4c5ff',

        secondary: '#006c49',
        'secondary-container': '#6cf8bb',
        'secondary-fixed': '#6ffbbe',
        'secondary-fixed-dim': '#4edea3',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#00714d',
        'on-secondary-fixed': '#002113',
        'on-secondary-fixed-variant': '#005236',

        tertiary: '#784b00',
        'tertiary-container': '#996100',
        'tertiary-fixed': '#ffddb8',
        'tertiary-fixed-dim': '#ffb95f',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#ffeedd',
        'on-tertiary-fixed': '#2a1700',
        'on-tertiary-fixed-variant': '#653e00',

        error: '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',

        background: '#faf8ff',
        'on-background': '#131b2e',
        surface: '#faf8ff',
        'on-surface': '#131b2e',
        'surface-dim': '#d2d9f4',
        'surface-bright': '#faf8ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f3ff',
        'surface-container': '#eaedff',
        'surface-container-high': '#e2e7ff',
        'surface-container-highest': '#dae2fd',
        'surface-variant': '#dae2fd',
        'on-surface-variant': '#434655',
        'inverse-surface': '#283044',
        'inverse-on-surface': '#eef0ff',
        'surface-tint': '#0053db',

        outline: '#737686',
        'outline-variant': '#c3c6d7'
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px'
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        gutter: '1rem',
        'gutter-md': '1.5rem',
        'gutter-lg': '2rem',
        margin: '1rem',
        'margin-md': '2rem',
        'margin-lg': '3rem'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        label: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
