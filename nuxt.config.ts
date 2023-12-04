import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/css/typography.css",
  ],
  build: {
    transpile: ["chart.js", "vuetify"],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    define: {
      "process.env.DEBUG": false,
    },
    ssr: {
      // Brode vi inte behöva
      // noExternal: ["vuetify"],
    },
  },
  runtimeConfig: {
    // Allt sdom ska plockas med dot-env behöver deklareras här
    // googleApiKey: "",
    // googleSheetsId: "",
    NODE_ENV: "",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "sv",
      },
      title: "Öppenhetsdatabasen | Journalistförbundet",
      meta: [
        { name: "description", content: "Jounalistförbundets öppenhetsdatabas." },
      ],
      script: [
        { src: "/js/iframeResizer.contentWindow.min.js" },
      ],
    },
  },
  modules: [
    "@nuxt/image",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
})
