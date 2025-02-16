import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        assacom: ['AssacomFreeGothicTTF-Regular', 'sans-serif'],
      },
      colors: {
        primary: '#112211',
      },
    },
  },
  plugins: [],
} satisfies Config;
