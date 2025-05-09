// ✨ Tailwind configuration for Sing7 V1.02
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A86FF',
        secondary: '#8338EC',
        accent: '#FF006E',
        dark: '#212529',
        light: '#F8F9FA',
        background: {
          dark: '#121212',
          light: '#FFFFFF',
        },
        text: {
          dark: '#E1E1E1',
          light: '#212529',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        'mobile-heading': '20px',
        'mobile-body': '14px',
        'desktop-heading': '32px',
        'desktop-body': '16px',
      },
      screens: {
        tablet: '768px',
        desktop: '1200px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}; 