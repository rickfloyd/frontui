/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neonPink: '#ff00cc',
        neonCyan: '#00ffff',
        neonOrange: '#ff8c00',
        neonBlue: '#00eaff',
        neonYellow: '#ffff00',
        neonGreen: '#00ff66',
      },
      boxShadow: {
        neonPink: '0 0 10px #ff00cc, 0 0 20px #ff00cc, 0 0 40px #ff33cc',
        neonCyan: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00eaff',
        neonOrange: '0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ffa733',
        neonGreen: '0 0 10px #00ff66, 0 0 20px #00ff66, 0 0 40px #00ff66',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(90deg, #00F7FF, #FF1493, #ffa500, #00F7FF)',
      },
    },
  },
  safelist: [
    'shadow-neonPink',
    'shadow-neonCyan',
    'shadow-neonOrange',
    'shadow-neonGreen',
    'text-neonPink',
    'text-neonCyan',
    'text-neonOrange',
    'text-neonGreen'
  ],
  plugins: [],
};
