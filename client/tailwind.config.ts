import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'option-1': '#E2E8F0',
        'option-2': '#7E8CA1',
        'option-3': '#252039',
        'option-4': '#403179',
        'option-5': '#52CBBB',
        'option-6': '#CC0000',
        'option-7': '#FF3333',
      },
      boxShadow: {
        '3xl': '0 5px 55px -15px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
};
export default config;

