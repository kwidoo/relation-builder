/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#0184BC',  // a bright blue
          success: '#C792EA',  // a soft purple
          info: '#FFCB6B',     // a soft yellow
          error: '#FF5370',    // a soft red
          warning: '#F78C6C',  // a soft orange
          anchor: '#82AAFF',   // link color, a lighter blue
          background: '#011627' // N
        },
      },
    },
  },
})
