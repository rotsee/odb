import { transformAssetUrls } from 'vite-plugin-vuetify'

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
    base: '/odb/',
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
        { src: "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.9/iframeResizer.contentWindow.min.js" },
      ],
    },
    baseURL: '/odb/',
  },

  compatibilityDate: "2026-05-01",
})