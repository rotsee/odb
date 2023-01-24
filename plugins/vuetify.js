import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { sv } from "vuetify/locale"
import { VDataTable } from "vuetify/labs/VDataTable"
import "@mdi/font/css/materialdesignicons.css"

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    locale: {
      locale: "sv",
      messages: { sv },
    },
    components: {
      ...components,
      VDataTable,
    },
    directives,
  })

  nuxtApp.vueApp.use(vuetify)
})
