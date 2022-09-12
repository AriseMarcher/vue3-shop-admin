import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import appLayout from '@/layout/app-layout.vue'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: appLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      }
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
