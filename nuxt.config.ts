// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      PLACE_HOLDER_IMAGE: "",
    },
  },
  vite: {
    server: {
      hmr: {
        protocol: "http",
        host: "localhost",
        clientPort: 3000,
        port: 3000,
      },
    },
  },

  css: ["@/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "shadcn-nuxt",
    "@nuxt/image",
    "@nuxtjs/apollo",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/content",
  ],

  colorMode: {
    classSuffix: "",
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint:
          "https://pim.tcsapps.de/pimcore-graphql-webservices/konfigurator?apikey=90b00841d18f9f914d5584ae8d0e7793",
      },
    },
  },

  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
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
  compatibilityDate: "2024-09-09",
});
