import { createApp } from 'vue'
import router from './router'
import { store, key } from './store'
import './styles/index.scss'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app')
