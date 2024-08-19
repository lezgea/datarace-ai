import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/constants/**/*.{js,ts,jsx,tsx,mdx,scss}",
    "./src/api/**/*.{js,ts,jsx,tsx,mdx,scss}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customBlue: {
          50: '#ebf5ff',
          100: '#e1effe',
          200: '#c3ddfd',
          300: '#a4cafe',
          400: '#76a9fa',
          500: '#3f83f8',
          600: '#1c64f2',
          700: '#1a56db',
          800: '#1e429f',
          900: '#282732',
        },
        dark: '#000',
        custom_gray: '#EFEFF2',
        foreground: 'var(--foreground-rgb)',
        backgroundStart: 'var(--background-start-rgb)',
        backgroundEnd: 'var(--background-end-rgb)',
      },
      borderRadius: {
        custom_md: '24px',
      },
      fontWeight: {
        medium: '600',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;