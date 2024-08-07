import path from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-echarts"],
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  // vite: {
  //   resolve: {
  //     alias: {
  //       '@': path.resolve(__dirname, './'),
  //     },
  //   },
  //   tailwindcss: {
  //     exposeConfig: true,
  //     viewer: true,
  //   }
  // },
  // app: {
  //   pageTransition: {
  //     name: 'fade',
  //     mode: 'out-in' // default
  //   },
  // },
  plugins: ["~/plugins/lodash.js"],

  // build: {
  //   // Other build options...
  //   postcss: {
  //     // PostCSS configurations here
  //     plugins: {
  //       // Your PostCSS plugins here
  //     },
  //     preset: {
  //       // Your PostCSS preset options here
  //     },
  //   },
  // },
  // echarts: {
  //   renderer: ['svg', 'canvas'],
  //   charts: ['BarChart', 'LineChart', 'PieChart'],
  //   components: ['DatasetComponent', 'GridComponent', 'TooltipComponent'],
  // },
  echarts: {
    // ssr: true,
    renderer: ['canvas', 'svg'],
    charts: ['BarChart', 'LineChart', 'PieChart'],
    components: [
      'DatasetComponent',
      'GridComponent',
      'TooltipComponent',
      'ToolboxComponent',
    ],
    features: ['LabelLayout', 'UniversalTransition'],
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiProtocol: "http",
      apiBase: "localhost",
      apiPort: "8080",
      apiBaseUrl: "api"
    },
  },

  compatibilityDate: "2024-07-12",
});
