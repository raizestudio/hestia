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
          "100": "#355bf5",
          "200": "#9aadfa",
          "300": "#aebdfb",
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
      fontSize: {
        'xs-50': '0.625rem',
        'xxs': '0.5rem',
      },
      boxShadow: {
        soft: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        softLight: "2px 2px 4px rgba(0, 0, 0, 0.25)",
        hard: "1px 1px 1px rgba(0, 0, 0, 0.5)",
        hardLight: "1px 1px 1px rgba(0, 0, 0, 0.25)",
      },
      dropShadow: {
        hard: '1px 1px 1px rgba(0, 0, 0, 0.5)',
        hardLight: '1px 1px 1px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        "progress": "progress 2s infinite linear",
      },
      keyframes: {
        progress: {
          '0%': { transform: ' translateX(-100%) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.2)' },
          '100%': { transform: 'translateX(100%) scaleX(0.8)' },
        },
      },
      transformOrigin: {
        'left-right': '0% 50%',
      }
    },
  },
};

export default config;
