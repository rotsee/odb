import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import { createVuetify } from "vuetify"
import { sv } from "vuetify/locale"
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    locale: {
      locale: "sv",
      messages: { sv },
    },
  })
  app.vueApp.use(vuetify)
})
