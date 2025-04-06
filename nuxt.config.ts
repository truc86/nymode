import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image'],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-04-04',

  image: {
    domains: [
      'https://jx-images-test.global.ssl.fastly.net',
      'https://jj-images-test.global.ssl.fastly.net',
      'https://vm-images-test.global.ssl.fastly.net',
    ],
  },
});
