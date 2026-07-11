// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Primary palette
        'toasted-orange': '#D35400',
        'deep-aubergine': '#2D1B33',
        'cream-white': '#FDFBF7',
        // Neutral
        'warm-gray': '#9C908A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
