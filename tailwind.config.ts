// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // 🌟 Primary (action, buttons, accents)
        'brand-orange': '#E67E22',
        // 🍂 Secondary (deep but warm – black নয়)
        'rich-brown': '#4A3728',
        // 🤍 Light background (cream)
        'soft-cream': '#FFF1E6',

        // 🎯 Neutral
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
