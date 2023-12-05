import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import { createVuetify } from "vuetify"
import { sv } from "vuetify/locale"

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    locale: {
      locale: "sv",
      messages: { sv },
    },
  })
  app.vueApp.use(vuetify)
})
