import { createApp } from "vue"
import { createPinia } from "pinia"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"

import App from "./App.vue"
import router from "./router"

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
  },
})

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(vuetify).mount("#app")
