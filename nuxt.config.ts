import path from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    tailwindcss: {
      exposeConfig: true,
      viewer: true,
    }
  },
  plugins: ['~/plugins/lodash.js'],
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
      // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  }
  
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
})
