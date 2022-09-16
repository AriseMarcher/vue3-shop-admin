import { createApp } from 'vue'
import router from './router/index'
import { store, key } from './store'
import App from './App.vue'
import elementPlus from './plugins/element-plus'
import VXETable from 'vxe-table'
import './styles/index.scss'
import 'vxe-table/lib/style.css'

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
app.use(VXETable)

app.mount('#app')
