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
        httpEndpoint: 'https://devpim.tcs-apps.de/pimcore-graphql-webservices/outdoor?apikey=c179b60860474aa335a9d82c8c985f84'
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