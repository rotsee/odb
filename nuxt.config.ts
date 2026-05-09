import { sv } from "vuetify/locale"

export default defineNuxtConfig({
  modules: ["vuetify-nuxt-module", "@nuxt/eslint"],

  css: [
    "@mdi/font/css/materialdesignicons.css",
    "@/assets/css/typography.css",
  ],

  build: {
    transpile: ["chart.js"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    base: "/odb/",
  },

  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      theme: { defaultTheme: "light" },
      locale: {
        locale: "sv",
        messages: { sv },
      },
    },
  },

  runtimeConfig: {
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
    baseURL: "/odb/",
  },

  compatibilityDate: "2026-05-01",
})
