/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          950: '#020712',
          900: '#050B16',
          800: '#08111F',
        },
        surface: {
          card: '#0B1422',
          raised: '#0E1827',
        },
        border: {
          DEFAULT: '#1D2939',
        },
        brand: {
          DEFAULT: '#FF5A00',
          light: '#FF6500',
          dark: '#CC4800',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#8B95A7',
        },
        success: '#22C55E',
        info: '#3B82F6',
        violet: '#8B5CF6',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(255, 90, 0, 0.25)',
        soft: '0 4px 24px rgba(0, 0, 0, 0.35)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
    },
  },
  plugins: [],
};
