/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#090A0F',
          cream: '#FCFAF7',
          sand: '#F3EFE9',
          charcoal: '#1A1C23',
          purple: '#7C3AED',
          pink: '#DB2777',
          amber: '#D97706',
          emerald: '#3ECF8E', // Supabase emerald
          'dark-obsidian': '#0C0C0D', // Supabase page dark
          'dark-card': '#161618', // Supabase card dark
          'dark-border': '#2E2E33', // Supabase border dark
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(219, 39, 119, 0.15)',
        'elevation': '0 20px 40px -15px rgba(9, 10, 15, 0.05)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};

