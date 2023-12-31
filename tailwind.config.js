/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue: '#3FA9F5',
        'light-blue': '#F2FAFF',
        darkblue: '#140D31',
        secondaryDarkBlue: '#1A4767',
        gray: '#726E83',
        whilte: '#FFFFFF',
        yellow: '#FFBB0B',
        red: '#D10002',
        primary: '#F2FAFF',
        green: '#4CAF50',
      },
      boxShadow: {
        disclosure: '0px 4px 20px 0px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        fade: 'fadeOut infinite 1s ease-in-out',
      },
      keyframes: (theme) => ({
        fadeOut: {
          '0%': { background: 'rgba(0, 0, 0, 0)' },
          '100%': { background: 'rgba(0, 0, 0, 0)' },
        },
      }),
    },
  },
  plugins: [],
}
