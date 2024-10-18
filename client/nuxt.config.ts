// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/index.css'],
  runtimeConfig: {
    cookieName: '',
    cookieSecret: ''
  },
  pinia: {
    storeDirs: ['./stores/**']
  },
  fonts: {
    defaults: {
      weights: [400],
      preload: true,
    },

    families: [
      {
        name: 'Satoshi',
        src: '/fonts/Satoshi-Variable.woff2',
      },
      {
        name: 'Satoshi',
        src: '/fonts/Satoshi-Variable.ttf',
      },
      {
        name: 'Satoshi',
        src: '/fonts/Satoshi-Variable.woff',
      },
      {
        name: 'Satoshi',
        src: '/fonts/Satoshi-Variable.eot',
      }
    ],
    fallbacks: {
      'serif': ['Times New Roman'],
      'sans-serif': ['Arial'],
    },
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  modules: ['@nuxt/fonts', '@nuxt/image', '@pinia/nuxt'],
})