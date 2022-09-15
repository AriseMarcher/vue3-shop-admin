import { createApp } from 'vue'
import router from './router/index'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'

import './styles/index.scss'
import App from './App.vue'

const app = createApp(App)

// 自动注册全局组件
const modules = import.meta.globEager('./components/**/index.ts')
console.log('this is the modules')
console.log(modules)
for (const path in modules) {
  app.use(modules[path].default)
}

app.use(router)
app.use(store, key)
app.use(elementPlus)

app.mount('#app')
