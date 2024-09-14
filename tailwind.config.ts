import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    ".error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        light: {
          '100': '#EEF0F2',
          '200': '#D6D6D6',
          '300': '#B8B8B8',
        },
        dark: {
          '100': '#1C1C1C',
          '200': '#141414',
          '300': '#0D0D0D',
        },
      },
    },
  },
};

export default config;
