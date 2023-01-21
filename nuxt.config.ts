// import vuetify from 'vite-plugin-vuetify'
// Ev borde vi använde denna, för bättre tree-shaking, istf att importera allt i pluginen?
// https://next.vuetifyjs.com/en/features/treeshaking/

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/css/typography.css",
    "vuetify/styles",
  ],
  build: {
    transpile: ["vuetify", "chart.js"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    ssr: {
      // Brode vi inte behöva
      // noExternal: ['vuetify'],
    },
  },
  runtimeConfig: {
    // Allt sdom ska plockas med dot-env behöver deklareras här
    googleApiKey: "",
    googleSheetsId: "",
  },
  /*
  modules: [
    // @ts-ignore
    // vite-plugin behöver startas så här för att funka med
    async (options, nuxt) => {
        nuxt.hooks.hook('vite:extendConfig', (config: any) => config.plugins.push(
            vuetify()
        ))
    }
  ]
  */
})
