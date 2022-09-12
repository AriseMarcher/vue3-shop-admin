import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import appLayout from '@/layout/app-layout.vue'

import productRoutes from './modules/product'
import orderRoutes from './modules/order'
import mediaRoutes from './modules/media'
import permissionRoutes from './modules/permission'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: appLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      productRoutes,
      orderRoutes,
      mediaRoutes,
      permissionRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
