// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/index.css'],
  runtimeConfig: {
    cookieName: process.env.COOKIE_NAME,
    cookieSecret: process.env.COOKIE_SECRET,
    cookieExpires: process.env.COOKIE_EXPIRES,
    cookieRememberMeExpires: process.env.COOKIE_REMEMBER_ME_EXPIRES,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    socketUrl: process.env.SOCKET_URL,
  },
  mongoose: {
    uri: process.env.MONGO_URI,
    options: {},
    modelsDir: 'models',
    devtools: true,
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
        name: 'MAutotune',
        src: '/fonts/Saans-Medium.woff2'
      }
    ],
    fallbacks: {
      'serif': ['Times New Roman'],
      'sans-serif': ['MAutotune'],
    },
  },
  modules: ['@nuxt/fonts', '@nuxt/image', 'nuxt-mongoose', '@nuxtjs/color-mode'],
})