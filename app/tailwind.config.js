/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    '../components-library/packages/ui/src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          peach: '#FBC7B2',
          cocoa: '#55362A',
          blush: '#FDD4DC',
        },
      },
      fontFamily: {
        heading: ['"The Seasons"', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(251, 199, 178, 0.35)',
      },
    },
  },
  plugins: [],
}
