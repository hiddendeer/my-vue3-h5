import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import "tailwindcss/tailwind.css"
// import Vant from 'vant';
// import 'vant/lib/index.css';
import { Quasar,Dialog,Notify } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
// lang: quasarLang,
// Import Quasar css
// import 'quasar/src/css/index.sass'
import 'quasar/dist/quasar.css'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

const app = createApp(App)


app.use(Quasar, {
    plugins: {Dialog,Notify}, // import Quasar plugins and add here
    lang: quasarLang,
  })
// app.use(Vant)
app.use(router)
app.use(store)
app.mount('#app')


