import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}',
    './client/index.html', 
    './client/src/**/*.{js,jsx,ts,tsx}',
    './FE/index.html', 
    './FE/src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      // Các cấu hình hiện có
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
