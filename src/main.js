import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import * as ElIconModules from '@element-plus/icons-vue'
import "tailwindcss/tailwind.css"
// Import quasar info
import { Quasar,Dialog,Notify } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

const app = createApp(App)

// 全局引入ElIcon
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}

app.use(Quasar, {
    plugins: {Dialog,Notify}, // import Quasar plugins and add here
    lang: quasarLang,
  })

app.use(router).use(store)
app.mount('#app')


