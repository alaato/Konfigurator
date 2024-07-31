// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  vite: {
    server: {
      hmr: {
        protocol: "http",
        host: 'localhost',
        clientPort: 3000,
        port: 3000,
        },
    }
  },
  extends: [
    "@shopware-pwa/composables-next/nuxt-layer",
    "@shopware-pwa/cms-base",
  ],
  shopware: {
    endpoint: "https://save-air.de/store-api/",
    accessToken: "SWSCUTJJOVFPZ1UXOUTQEVDVBG",
  },
  modules: [
    "@shopware-pwa/nuxt3-module",
    "@nuxt/ui",
    '@pinia/nuxt',
    "shadcn-nuxt",
    '@formkit/nuxt',
    "@nuxt/image",
    '@nuxtjs/apollo'
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://devpim.tcs-apps.de/pimcore-graphql-webservices/konfigurator?apikey=90b00841d18f9f914d5584ae8d0e7793'
      }
    },
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true
  },
  /**
   * Commented because of the StackBlitz error
   * Issue: https://github.com/shopware/frontends/issues/88
   */
  typescript: {
    // typeCheck: true,
    strict: false,
  },
  telemetry: false,
});