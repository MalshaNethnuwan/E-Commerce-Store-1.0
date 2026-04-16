import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top right, rgba(236,72,153,0.12), transparent 30%), radial-gradient(circle at bottom left, rgba(99,102,241,0.12), transparent 35%)',
      },
    },
  },
  plugins: [forms],
}
