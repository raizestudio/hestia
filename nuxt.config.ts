// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxt/test-utils/module"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  runtimeConfig: {
    // mySecret: process.env.MY_SECRET,
    public: {
      apiProtocol: process.env.API_PROTOCOL,
      apiHost: process.env.API_HOST,
      apiPort: process.env.API_PORT,
      apiBasePath: process.env.API_BASE_PATH,
    }
  },
});
