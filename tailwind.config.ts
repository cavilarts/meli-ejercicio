import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "var(--color-black)",
        turbo: {
          darkest: "var(--color-turbo-900)",
          dark: "var(--color-turbo-700)",
          DEFAULT: "var(--color-turbo-500)",
          light: "var(--color-turbo-300)",
          lightest: "var(--color-turbo-100)",
        },
        stardust: {
          DEFAULT: "var(--color-star-dust)",
        },
        gallery: {
          DEFAULT: "var(--color-gallery)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
