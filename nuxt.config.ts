// import redirectSSL from "redirect-ssl"

// import vuetify from 'vite-plugin-vuetify'
// Ev borde vi använde denna, för bättre tree-shaking, istf att importera allt i pluginen?
// https://next.vuetifyjs.com/en/features/treeshaking/

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/css/typography.css",
  ],
  build: {
    transpile: ["chart.js", "vuetify"],
  },
  vite: {
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
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/image-edge",
  ],
  /* MODUL-CONFIG */
  content: {
    // https://content.nuxtjs.org/api/configuration
    defaultLocale: "sv-SE",
  },
  // serverMiddleware: [redirectSSL],
})
