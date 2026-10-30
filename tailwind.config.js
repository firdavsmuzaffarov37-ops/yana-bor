/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#065f46', // Rich emerald
          900: '#064e3b',
          950: '#022c22',
        },
        cream: {
          50: '#FCFBF7',
          100: '#F7F5EE',
          200: '#EFECE1',
          300: '#E2DDCF',
          400: '#CBC4B3',
        },
        charcoal: {
          900: '#121619',
          800: '#1E2429',
          700: '#2D3748',
          600: '#4A5568',
        },
        accent: {
          lime: '#84CC16',
          mint: '#10B981',
          terracotta: '#D97706',
          clay: '#C25E00',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 30px -4px rgba(0, 0, 0, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'float': '0 20px 40px -8px rgba(6, 95, 70, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
