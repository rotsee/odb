import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { sv } from 'vuetify/locale'
import { VDataTable } from 'vuetify/labs/VDataTable'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    directives,
    locale: {
      locale: "sv",
      messages: { sv },
    },
    components: {
      ...components,
      VDataTable,
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
