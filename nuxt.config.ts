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