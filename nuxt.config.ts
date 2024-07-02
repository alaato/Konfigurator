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
  modules: ["@shopware-pwa/nuxt3-module", "@nuxt/ui", '@pinia/nuxt',  ],
  /**
   * Commented because of the StackBlitz error
   * Issue: https://github.com/shopware/frontends/issues/88
   */
  typescript: {
    // typeCheck: true,
    strict: true,
  },
  telemetry: false,
});