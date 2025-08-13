// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/util/colors'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            background: colors.amber.lighten5,
            surface: colors.amber.lighten5,
            primary: colors.green.darken4
          }
        }
      }
    }
  })
  app.vueApp.use(vuetify)
})
