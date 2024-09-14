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
        primary: {
          "100": "#1e2749",
          "200": "#1e2749",
          "300": "#1e2749",
        },
        light: {
          "100": "#f2f2f2",
          "200": "#e6e6e6",
          "300": "#d9d9d9",
        },
        dark: {
          "100": "#0d0d0d",
          "200": "#191919",
          "300": "#262626",
        },
        success: {
          "100": "#2e7d32",
          "200": "#388e3c",
          "300": "#43a047",
        },
        warning: {
          "100": "#f57c00",
          "200": "#fb8c00",
          "300": "#ff9800",
        },
        danger: {
          "100": "#c62828",
          "200": "#d32f2f",
          "300": "#e53935",
        },
        info: {
          "100": "#1976d2",
          "200": "#2196f3",
          "300": "#42a5f5",
        },
        
      },
    },
  },
};

export default config;
